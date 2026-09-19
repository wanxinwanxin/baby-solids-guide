import type { SleepPrediction } from "@/lib/sleep/model";
import type {
  CareLog,
  FeedWindow,
  Intervention,
  PlanEventKind,
  SleepSession,
} from "@/lib/storage/types";

/**
 * Intervention mode — the pure engine behind the plan bands on /care and
 * /sleep (2026-09-18).
 *
 * The existing predictor (lib/sleep/model) learns the family's pattern and
 * mirrors it back. That is the right default and the wrong tool for change:
 * when the pattern is the problem, a mirror can only deepen it. This engine
 * takes a family-set schedule and turns it into the one instruction a
 * caregiver needs right now — "next bottle 13:15, 150 ml", "wake him by
 * 16:15" — and, when a moment goes off plan, into a deterministic next step.
 *
 * Everything here is a pure function of the plan, the day's logs, and an
 * injected `now`, so every branch is unit-testable and every caregiver on
 * the same data gets the same answer. There is no model in the loop.
 */

const MIN = 60 * 1000;
const HOUR = 60 * MIN;

/** Local calendar day of an epoch ms as a Date at 00:00. */
function dayOf(at: number | Date): Date {
  const d = new Date(at);
  d.setHours(0, 0, 0, 0);
  return d;
}

/** "HH:MM" on the local calendar day of `day` → epoch ms. */
export function clockOn(day: Date, hhmm: string): number {
  const [h, m] = hhmm.split(":").map(Number);
  const d = dayOf(day);
  d.setHours(h, m, 0, 0);
  return d.getTime();
}

/** Epoch ms → local "HH:MM". */
export function toClock(at: number): string {
  const d = new Date(at);
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

const sameLocalDay = (a: number, b: number) => dayOf(a).getTime() === dayOf(b).getTime();
const ms = (iso: string) => new Date(iso).getTime();

// ——— Defaults ———

/**
 * A reasonable first plan for the baby's age, meant to be edited. Bottle
 * targets follow the AAP/CDC per-feed ranges; nap caps keep total day sleep
 * inside the typical band so the night gets the rest of it.
 */
export function defaultIntervention(ageMonths: number, startedOn: string): Intervention {
  const base = { enabled: true, startedOn, step: 1, flexMin: 45 } as const;
  if (ageMonths < 6) {
    return {
      ...base,
      goals: ["consolidate-feeds"],
      feedWindows: [
        { at: "06:00", ml: 120, onWake: true },
        { at: "09:00", ml: 120 },
        { at: "12:00", ml: 120 },
        { at: "15:00", ml: 120 },
        { at: "18:00", ml: 150 },
      ],
      naps: [
        { from: "04:00", to: "09:15", capMin: 60 },
        { from: "09:15", to: "12:00", capMin: 90 },
        { from: "12:00", to: "15:00", capMin: 90 },
        { from: "15:00", to: "19:00", capMin: 45, hardStopAt: "17:00" },
      ],
      maxDaySleepMin: 270,
      dayStartAt: "06:30",
      bedtimeAt: "19:30",
    };
  }
  if (ageMonths < 9) {
    return {
      ...base,
      goals: ["consolidate-feeds", "cap-day-sleep"],
      feedWindows: [
        { at: "06:00", ml: 150, onWake: true },
        { at: "09:30", ml: 150 },
        { at: "13:15", ml: 150 },
        { at: "16:30", ml: 150 },
        { at: "19:00", ml: 180 },
      ],
      naps: [
        { from: "04:00", to: "09:30", capMin: 60 },
        { from: "09:30", to: "13:30", capMin: 90 },
        { from: "13:30", to: "19:00", capMin: 60, hardStopAt: "16:15" },
      ],
      maxDaySleepMin: 210,
      dayStartAt: "06:00",
      bedtimeAt: "20:00",
      nightCutoffAt: "04:00",
      nightFeedMl: 120,
    };
  }
  return {
    ...base,
    goals: ["consolidate-feeds", "cap-day-sleep"],
    feedWindows: [
      { at: "06:30", ml: 180, onWake: true },
      { at: "10:30", ml: 180 },
      { at: "14:30", ml: 180 },
      { at: "18:30", ml: 210 },
    ],
    naps: [
      { from: "04:00", to: "11:30", capMin: 90 },
      { from: "11:30", to: "19:00", capMin: 90, hardStopAt: "15:30" },
    ],
    maxDaySleepMin: 180,
    dayStartAt: "06:30",
    bedtimeAt: "19:30",
    nightCutoffAt: "05:00",
    nightFeedMl: 120,
  };
}

// ——— Feeding ———

export type FeedOutcome = "took_full" | "partial" | "refused";

/** Two thirds or more is a full bottle; under a third is a refusal. */
export function bottleOutcome(ml: number, targetMl: number): FeedOutcome {
  if (targetMl <= 0) return "took_full";
  const r = ml / targetMl;
  if (r >= 2 / 3) return "took_full";
  if (r >= 1 / 3) return "partial";
  return "refused";
}

/** A bottle counts toward a window when it falls within this many minutes of it. */
export const WINDOW_ASSIGN_MIN = 120;
/** A started bottle may be re-offered once at +30 and must be discarded at +60 (CDC). */
export const REOFFER_AT_MIN = 30;
export const DISCARD_AT_MIN = 60;

export type FeedAction = {
  /** Planned open time of the window, epoch ms. */
  windowAt: number;
  targetMl: number;
  /** Index into plan.feedWindows; -1 when every window today is done. */
  index: number;
  state: "waiting" | "open" | "late" | "done";
  /** Minutes until the window opens; negative once it has. */
  minutesUntil: number;
  /** The earliest hunger may pull the window forward (windowAt − flexMin). */
  earliestAt: number;
  lastBottle: { at: number; ml: number; targetMl: number | null; outcome: FeedOutcome | null } | null;
  /** Set while a partial/refused bottle can still be re-offered. */
  reoffer: { at: number; discardAt: number } | null;
};

/** The ml of a bottle log, normalized; oz is converted so plans stay in ml. */
export function bottleMl(l: CareLog): number {
  if (!l.amount) return 0;
  return l.amount.unit === "oz" ? l.amount.value * 29.5735 : l.amount.value;
}

/** Index of the plan window a bottle at `at` belongs to, or -1 if none is near. */
export function nearestWindow(windows: FeedWindow[], at: number): number {
  const day = dayOf(at);
  let best = -1;
  let bestGap = Infinity;
  windows.forEach((w, i) => {
    const gap = Math.abs(at - clockOn(day, w.at)) / MIN;
    if (gap <= WINDOW_ASSIGN_MIN && gap < bestGap) {
      best = i;
      bestGap = gap;
    }
  });
  return best;
}

/** Nothing before this counts as the morning bottle; earlier is a night feed. */
const EARLIEST_MORNING_H = 4;

/**
 * Where each window opens today. The first window follows the morning wake
 * when that is known and earlier than its clock — a 04:50 wake after a nine
 * hour stretch is hungry now, not at 05:45.
 */
function windowTimes(windows: FeedWindow[], now: Date, morningWakeMs: number | null): number[] {
  const times = windows.map((w) => clockOn(now, w.at));
  const first = windows[0];
  const onWake = first && (first.onWake ?? true);
  if (onWake && morningWakeMs !== null) {
    const floor = clockOn(now, `${String(EARLIEST_MORNING_H).padStart(2, "0")}:00`);
    if (morningWakeMs >= floor && morningWakeMs < times[0]) times[0] = morningWakeMs;
  }
  return times;
}

export function nextFeed(
  plan: Intervention,
  careLogs: CareLog[],
  now: Date,
  morningWakeMs: number | null = null,
): FeedAction | null {
  if (plan.feedWindows.length === 0) return null;
  const nowMs = now.getTime();
  const windows = [...plan.feedWindows].sort((a, b) => a.at.localeCompare(b.at));
  const times = windowTimes(windows, now, morningWakeMs);
  const bottles = careLogs
    .filter((l) => l.kind === "formula" && l.amount)
    .sort((a, b) => ms(a.at) - ms(b.at));
  const todays = bottles.filter((l) => sameLocalDay(ms(l.at), nowMs));

  const nearestToday = (at: number) => {
    let best = -1;
    let bestGap = Infinity;
    times.forEach((t, i) => {
      const gap = Math.abs(at - t) / MIN;
      if (gap <= WINDOW_ASSIGN_MIN && gap < bestGap) {
        best = i;
        bestGap = gap;
      }
    });
    return best;
  };
  const consumed = new Set<number>();
  for (const b of todays) {
    const i = nearestToday(ms(b.at));
    if (i >= 0) consumed.add(i);
  }

  const last = bottles.length > 0 ? bottles[bottles.length - 1] : null;
  let lastBottle: FeedAction["lastBottle"] = null;
  if (last && nowMs - ms(last.at) <= 12 * HOUR) {
    const targetMl =
      last.plan?.targetMl ??
      (() => {
        const i = nearestWindow(windows, ms(last.at));
        return i >= 0 ? windows[i].ml : null;
      })();
    const ml = bottleMl(last);
    lastBottle = {
      at: ms(last.at),
      ml,
      targetMl,
      outcome: targetMl === null ? null : bottleOutcome(ml, targetMl),
    };
  }
  const reoffer =
    lastBottle &&
    lastBottle.outcome !== null &&
    lastBottle.outcome !== "took_full" &&
    nowMs < lastBottle.at + DISCARD_AT_MIN * MIN
      ? { at: lastBottle.at + REOFFER_AT_MIN * MIN, discardAt: lastBottle.at + DISCARD_AT_MIN * MIN }
      : null;

  // The next window: first one not yet fed that has not gone stale (more than
  // two hours past with nothing logged reads as "skipped", not "late").
  const idx = windows.findIndex((_, i) => !consumed.has(i) && times[i] + WINDOW_ASSIGN_MIN * MIN > nowMs);
  if (idx === -1) {
    const tomorrow = new Date(dayOf(now).getTime() + 24 * HOUR);
    return {
      windowAt: clockOn(tomorrow, windows[0].at),
      targetMl: windows[0].ml,
      index: -1,
      state: "done",
      minutesUntil: (clockOn(tomorrow, windows[0].at) - nowMs) / MIN,
      earliestAt: clockOn(tomorrow, windows[0].at) - plan.flexMin * MIN,
      lastBottle,
      reoffer,
    };
  }
  const windowAt = times[idx];
  const earliestAt = windowAt - plan.flexMin * MIN;
  const state: FeedAction["state"] =
    nowMs < earliestAt ? "waiting" : nowMs <= windowAt + 60 * MIN ? "open" : "late";
  return {
    windowAt,
    targetMl: windows[idx].ml,
    index: idx,
    state,
    minutesUntil: (windowAt - nowMs) / MIN,
    earliestAt,
    lastBottle,
    reoffer,
  };
}

/**
 * What to do when the baby is fussy before the window. The answer depends
 * on how far away the window is — which the app knows and a printed sheet
 * does not — and on whether the last bottle was actually finished.
 */
export type FussyAdvice = "open-now" | "check-other-causes" | "probably-tired" | "feed-if-crying";

export function fussyAdvice(feed: FeedAction, now: Date): FussyAdvice[] {
  const until = (feed.windowAt - now.getTime()) / MIN;
  if (feed.state === "open" || feed.state === "late" || until <= 45) return ["open-now"];
  if (until <= 90) return ["check-other-causes", "feed-if-crying"];
  if (feed.lastBottle?.outcome === "took_full") return ["probably-tired", "feed-if-crying"];
  return ["check-other-causes", "feed-if-crying"];
}

// ——— Sleep ———

/** Minutes after midnight for an epoch ms, local. */
const clockMinOf = (at: number) => {
  const d = new Date(at);
  return d.getHours() * 60 + d.getMinutes();
};
const parseClock = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

/** A nap cap normalized to a clock band in minutes after midnight. */
export type NapBand = { fromMin: number; toMin: number; capMin: number; hardStopAt?: string };

/**
 * The plan's caps as clock bands. A pre-2026-09-19 plan carried `startAt`
 * per nap instead; those are split at the midpoints so the cap that used to
 * belong to "nap 2" now belongs to "a nap that starts around then".
 */
export function napBands(plan: Intervention): NapBand[] {
  const naps = plan.naps;
  if (naps.length === 0) return [];
  if (naps.every((n) => n.from && n.to)) {
    return naps
      .map((n) => ({ fromMin: parseClock(n.from!), toMin: parseClock(n.to!), capMin: n.capMin, hardStopAt: n.hardStopAt }))
      .sort((a, b) => a.fromMin - b.fromMin);
  }
  const legacy = naps
    .filter((n) => n.startAt)
    .map((n) => ({ start: parseClock(n.startAt!), capMin: n.capMin, hardStopAt: n.hardStopAt }))
    .sort((a, b) => a.start - b.start);
  return legacy.map((n, i) => ({
    fromMin: i === 0 ? 4 * 60 : Math.round((legacy[i - 1].start + n.start) / 2),
    toMin: i === legacy.length - 1 ? 19 * 60 : Math.round((n.start + legacy[i + 1].start) / 2),
    capMin: n.capMin,
    hardStopAt: n.hardStopAt,
  }));
}

/** The cap band a nap starting at `at` falls in; the last band past its end. */
export function bandFor(bands: NapBand[], at: number): NapBand | null {
  if (bands.length === 0) return null;
  const m = clockMinOf(at);
  return bands.find((b) => m >= b.fromMin && m < b.toMin) ?? (m >= bands[bands.length - 1].toMin ? bands[bands.length - 1] : bands[0]);
}

/** A wake followed by more sleep inside this gap, before this hour, is still the night. */
export const NIGHT_CONTINUATION_GAP_MIN = 75;
export const NIGHT_CONTINUATION_BEFORE_H = 7.5;
/** Awake this long after a night wake and the day has started, early or not. */
export const UP_FOR_GOOD_MIN = 60;

export type Morning = {
  /** When the night ended for good today (continuations merged); null if unknown. */
  nightEnd: number | null;
  /** He is back asleep on a night continuation right now. */
  stillNight: boolean;
  /** Awake after an early wake, before his usual time, and not yet up for good. */
  earlyAwake: boolean;
};

/**
 * Find this morning's real wake. The night session is the long sleep that
 * ended this morning; any sleep that starts within 75 minutes of it, before
 * 07:30, is a return to sleep — the night continuing — not the first nap.
 */
export function morningWake(sessions: SleepSession[], now: Date, dayStartAt?: string): Morning {
  const nowMs = now.getTime();
  const today = dayOf(now).getTime();
  const sorted = [...sessions].sort((a, b) => ms(a.start) - ms(b.start));
  const night = [...sorted]
    .reverse()
    .find((s) => {
      const st = ms(s.start);
      const en = s.end ? ms(s.end) : null;
      const endsThisMorning = en !== null && sameLocalDay(en, nowMs) && clockMinOf(en) <= 12 * 60;
      const longOrOvernight = en !== null && (en - st >= 4 * HOUR || st < today);
      return endsThisMorning && longOrOvernight;
    });
  if (!night?.end) return { nightEnd: null, stillNight: false, earlyAwake: false };

  let nightEnd = ms(night.end);
  let stillNight = false;
  for (const s of sorted) {
    const st = ms(s.start);
    if (st <= nightEnd) continue;
    const gapOk = st - nightEnd <= NIGHT_CONTINUATION_GAP_MIN * MIN;
    const earlyEnough = clockMinOf(st) < NIGHT_CONTINUATION_BEFORE_H * 60;
    if (!gapOk || !earlyEnough) break;
    if (!s.end) {
      stillNight = true;
      break;
    }
    nightEnd = ms(s.end);
  }
  const usual = clockOn(now, dayStartAt ?? "06:30");
  const earlyAwake = !stillNight && nightEnd < usual && nowMs - nightEnd < UP_FOR_GOOD_MIN * MIN && nowMs < usual;
  return { nightEnd, stillNight, earlyAwake };
}

/** Today's naps: sleeps after the real morning wake, before the evening, under 4 h (or open). */
export function dayNaps(sessions: SleepSession[], now: Date, nightEnd: number | null): SleepSession[] {
  const nowMs = now.getTime();
  const floor = nightEnd ?? clockOn(now, "05:00");
  return sessions
    .filter((s) => {
      const st = ms(s.start);
      if (!sameLocalDay(st, nowMs) || st < floor) return false;
      if (clockMinOf(st) >= 19 * 60) return false;
      return !s.end || ms(s.end) - st < 4 * HOUR;
    })
    .sort((a, b) => ms(a.start) - ms(b.start));
}

/** Kept for the derive step: a session that reads as day sleep on `day`. */
export function isDaySleepOn(s: SleepSession, day: Date): boolean {
  const start = ms(s.start);
  if (!sameLocalDay(start, day.getTime())) return false;
  const h = new Date(start).getHours();
  if (h < 5 || h >= 19) return false;
  return !s.end || ms(s.end) - start < 4 * HOUR;
}

/** When a nap that started at `start` must end: the cap, or the hard stop if earlier. */
export function predictWakeBy(start: number, band: { capMin: number; hardStopAt?: string }): number {
  const byCap = start + band.capMin * MIN;
  if (!band.hardStopAt) return byCap;
  return Math.min(byCap, clockOn(new Date(start), band.hardStopAt));
}

/** Skip a nap when it could not run at least this long. */
export const MIN_WORTHWHILE_NAP_MIN = 20;
/** Bedtime moves earlier by this much when the last nap was short or skipped. */
export const SHORT_LAST_NAP_MIN = 30;
export const EARLY_BEDTIME_SHIFT_MIN = 30;

export type SleepAction =
  | { kind: "night" }
  | { kind: "early"; dayStartAt: string; nightEnd: number }
  | {
      kind: "asleep";
      wakeBy: number;
      /** Minutes past wake-by; ≤ 0 while there is still time. */
      overdueMin: number;
      hardStop: boolean;
      /** Day sleep left after this nap ends at wake-by, minutes. */
      budgetLeftMin: number;
    }
  | {
      kind: "nap";
      /** The predictor's window — his own rhythm — for when to put him down. */
      windowStart: number;
      windowEnd: number;
      capMin: number;
      wakeBy: number;
      hardStop: boolean;
      state: "waiting" | "open" | "late";
      budgetLeftMin: number;
      /** The window came from the plan's band, not the predictor. */
      fromBand: boolean;
    }
  | {
      kind: "bedtime";
      at: number;
      deltaMin: number | null;
      /** Minutes pulled earlier because the last nap was short or skipped (0 or 30). */
      adjustedMin: number;
      reason: "short-last-nap" | "skipped-last-nap" | null;
      /** Why the next sleep is bedtime and not a nap. */
      why: "predictor" | "no-nap-after" | "budget";
    }
  | { kind: "none" };

export type PlanEvent = { at: number; event: PlanEventKind };

export function planEvents(careLogs: CareLog[]): PlanEvent[] {
  return careLogs
    .filter((l) => l.kind === "event" && l.event)
    .map((l) => ({ at: ms(l.at), event: l.event as PlanEventKind }));
}

/**
 * The next sleep instruction. Timing comes from the predictor (his own
 * rhythm); the plan supplies only what the predictor never had — a cap for
 * the band the nap falls in, a hard stop on the last one, a day-sleep budget,
 * and a bedtime target. So an early wake, a stroller catnap, or a skipped nap
 * never shifts the caps onto the wrong sleep: whatever he does, the next
 * instruction is read from the clock and the day so far.
 */
export function nextSleep(
  plan: Intervention,
  sessions: SleepSession[],
  events: PlanEvent[],
  now: Date,
  prediction: SleepPrediction | null = null,
): SleepAction {
  const bands = napBands(plan);
  if (bands.length === 0 && !plan.bedtimeAt) return { kind: "none" };
  const nowMs = now.getTime();

  const morning = morningWake(sessions, now, plan.dayStartAt);
  if (morning.stillNight) return { kind: "night" };
  if (morning.earlyAwake) return { kind: "early", dayStartAt: plan.dayStartAt ?? "06:30", nightEnd: morning.nightEnd! };

  const naps = dayNaps(sessions, now, morning.nightEnd);
  const open = naps.find((s) => !s.end) ?? null;
  const usedMin = naps.filter((s) => s.end).reduce((sum, s) => sum + (ms(s.end!) - ms(s.start)) / MIN, 0);
  const budget = plan.maxDaySleepMin ?? bands.reduce((sum, b) => sum + b.capMin, 0);
  const lastBand = bands[bands.length - 1];
  const noNapAfter = lastBand?.hardStopAt ? clockOn(now, lastBand.hardStopAt) : null;

  if (open) {
    const start = ms(open.start);
    const band: { capMin: number; hardStopAt?: string } = bandFor(bands, start) ?? { capMin: 60 };
    const capMin = Math.max(MIN_WORTHWHILE_NAP_MIN, Math.min(band.capMin, budget - usedMin));
    const wakeBy = predictWakeBy(start, { capMin, hardStopAt: band.hardStopAt });
    return {
      kind: "asleep",
      wakeBy,
      overdueMin: (nowMs - wakeBy) / MIN,
      hardStop: !!band.hardStopAt && wakeBy < start + capMin * MIN,
      budgetLeftMin: Math.max(0, budget - usedMin - (wakeBy - start) / MIN),
    };
  }

  const skippedToday = events.some((e) => e.event === "nap_skipped" && sameLocalDay(e.at, nowMs));
  const lastNap = naps[naps.length - 1];
  const bedtime = (why: "predictor" | "no-nap-after" | "budget"): SleepAction => {
    const base = clockOn(now, plan.bedtimeAt ?? "20:00");
    // A short last nap and a missing last nap both cost the night the same
    // half hour; a long day that simply spent its budget costs nothing.
    const lastWasInLastBand = !!lastNap && !!lastBand && bandFor(bands, ms(lastNap.start)) === lastBand;
    let reason: "short-last-nap" | "skipped-last-nap" | null = null;
    if (lastNap?.end && (ms(lastNap.end) - ms(lastNap.start)) / MIN < SHORT_LAST_NAP_MIN) reason = "short-last-nap";
    else if (skippedToday || (why === "no-nap-after" && !lastWasInLastBand)) reason = "skipped-last-nap";
    const adjustedMin = reason ? EARLY_BEDTIME_SHIFT_MIN : 0;
    const at = base - adjustedMin * MIN;
    return { kind: "bedtime", at, deltaMin: prediction ? (at - prediction.windowStart) / MIN : null, adjustedMin, reason, why };
  };

  const remaining = budget - usedMin;
  if (remaining < MIN_WORTHWHILE_NAP_MIN) return bedtime("budget");
  if (noNapAfter !== null && nowMs + MIN_WORTHWHILE_NAP_MIN * MIN >= noNapAfter) return bedtime("no-nap-after");
  if (prediction?.kind === "bedtime") return bedtime("predictor");

  // Timing: the predictor's window when it has one, else the next band edge.
  let windowStart: number;
  let windowEnd: number;
  let fromBand = false;
  if (prediction) {
    windowStart = prediction.windowStart;
    windowEnd = prediction.windowEnd;
  } else {
    const nextBand = bands.find((b) => clockOn(now, hhmmOf(b.fromMin)) > nowMs) ?? lastBand;
    windowStart = Math.max(nowMs, clockOn(now, hhmmOf(nextBand.fromMin)));
    windowEnd = windowStart + 30 * MIN;
    fromBand = true;
  }
  if (noNapAfter !== null && windowStart + MIN_WORTHWHILE_NAP_MIN * MIN >= noNapAfter) return bedtime("no-nap-after");

  const band: { capMin: number; hardStopAt?: string } = bandFor(bands, windowStart) ?? { capMin: 60 };
  const capMin = Math.max(MIN_WORTHWHILE_NAP_MIN, Math.min(band.capMin, remaining));
  const wakeBy = predictWakeBy(windowStart, { capMin, hardStopAt: band.hardStopAt });
  const state: "waiting" | "open" | "late" =
    nowMs < windowStart - 15 * MIN ? "waiting" : nowMs <= windowEnd ? "open" : "late";
  return {
    kind: "nap",
    windowStart,
    windowEnd,
    capMin,
    wakeBy,
    hardStop: !!band.hardStopAt && wakeBy < windowStart + capMin * MIN,
    state,
    budgetLeftMin: Math.max(0, remaining - (wakeBy - windowStart) / MIN),
    fromBand,
  };
}

function hhmmOf(m: number): string {
  return `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
}

/**
 * Put down and will not sleep. The same moment gets opposite instructions
 * depending on the goal: while the family is consolidating feeds, the crib
 * must not become a fight, so it is twenty calm minutes then up. Only a
 * self-settle goal turns this into graduated checks.
 */
export type WontSleepAdvice = "twenty-then-up" | "graduated";

export function wontSleepAdvice(plan: Intervention): WontSleepAdvice {
  return plan.goals.includes("self-settle") ? "graduated" : "twenty-then-up";
}

// ——— Night ———

export type NightAdvice =
  | "not-in-plan"
  | "wait-5"
  | "comfort-2"
  | "repeat-once"
  | "feed"
  | "after-cutoff-feed";

/** Night hours for the cutoff test: after this evening hour, or before this morning hour. */
const NIGHT_FROM_H = 19;
const NIGHT_TO_H = 10;

/**
 * Before the cutoff, walk the steps by minutes since the wake; at or after
 * it, feed — it is nearly morning and not worth the fight. Twenty minutes of
 * hard crying always ends in a feed, whatever the clock says.
 */
export function nightAdvice(plan: Intervention, now: Date, minutesSinceWake: number): NightAdvice {
  if (!plan.goals.includes("night-wean") || !plan.nightCutoffAt) return "not-in-plan";
  const h = now.getHours();
  if (h >= NIGHT_TO_H && h < NIGHT_FROM_H) return "not-in-plan";
  const clockMin = h * 60 + now.getMinutes();
  const [ch, cm] = plan.nightCutoffAt.split(":").map(Number);
  const cutoffMin = ch * 60 + cm;
  // The cutoff is a morning clock time; the evening hours before midnight
  // are always "before" it.
  const afterCutoff = h < NIGHT_TO_H && clockMin >= cutoffMin;
  if (afterCutoff) return "after-cutoff-feed";
  if (minutesSinceWake < 5) return "wait-5";
  if (minutesSinceWake < 8) return "comfort-2";
  if (minutesSinceWake < 13) return "repeat-once";
  return "feed";
}

/** True when a session reads as the night sleep (started in the evening, still open or ≥ 4 h). */
export function isNightSessionOpenNow(open: SleepSession | null, now: Date): boolean {
  if (!open) return false;
  const h = new Date(open.start).getHours();
  const nowH = now.getHours();
  return (h >= 18 || h < 5) && (nowH >= NIGHT_FROM_H || nowH < NIGHT_TO_H);
}
