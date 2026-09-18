import type { SleepPrediction } from "@/lib/sleep/model";
import type {
  CareLog,
  FeedWindow,
  Intervention,
  NapTarget,
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
        { at: "06:00", ml: 120 },
        { at: "09:00", ml: 120 },
        { at: "12:00", ml: 120 },
        { at: "15:00", ml: 120 },
        { at: "18:00", ml: 150 },
      ],
      naps: [
        { startAt: "07:30", capMin: 60 },
        { startAt: "10:30", capMin: 90 },
        { startAt: "13:30", capMin: 90 },
        { startAt: "16:00", capMin: 45, hardStopAt: "17:00" },
      ],
      bedtimeAt: "19:30",
    };
  }
  if (ageMonths < 9) {
    return {
      ...base,
      goals: ["consolidate-feeds", "cap-day-sleep"],
      feedWindows: [
        { at: "06:00", ml: 150 },
        { at: "09:30", ml: 150 },
        { at: "13:15", ml: 150 },
        { at: "16:30", ml: 150 },
        { at: "19:00", ml: 180 },
      ],
      naps: [
        { startAt: "07:15", capMin: 60 },
        { startAt: "11:30", capMin: 90 },
        { startAt: "15:15", capMin: 60, hardStopAt: "16:15" },
      ],
      bedtimeAt: "20:00",
      nightCutoffAt: "04:00",
      nightFeedMl: 120,
    };
  }
  return {
    ...base,
    goals: ["consolidate-feeds", "cap-day-sleep"],
    feedWindows: [
      { at: "06:30", ml: 180 },
      { at: "10:30", ml: 180 },
      { at: "14:30", ml: 180 },
      { at: "18:30", ml: 210 },
    ],
    naps: [
      { startAt: "09:00", capMin: 90 },
      { startAt: "13:30", capMin: 90, hardStopAt: "15:30" },
    ],
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

export function nextFeed(plan: Intervention, careLogs: CareLog[], now: Date): FeedAction | null {
  if (plan.feedWindows.length === 0) return null;
  const nowMs = now.getTime();
  const windows = [...plan.feedWindows].sort((a, b) => a.at.localeCompare(b.at));
  const bottles = careLogs
    .filter((l) => l.kind === "formula" && l.amount)
    .sort((a, b) => ms(a.at) - ms(b.at));
  const todays = bottles.filter((l) => sameLocalDay(ms(l.at), nowMs));

  const consumed = new Set<number>();
  for (const b of todays) {
    const i = nearestWindow(windows, ms(b.at));
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
  const idx = windows.findIndex(
    (w, i) => !consumed.has(i) && clockOn(now, w.at) + WINDOW_ASSIGN_MIN * MIN > nowMs,
  );
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
  const windowAt = clockOn(now, windows[idx].at);
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

/** A session that reads as day sleep on `day`: starts 05:00–19:00 and is under 4 h (or still open). */
export function isDaySleepOn(s: SleepSession, day: Date): boolean {
  const start = ms(s.start);
  if (!sameLocalDay(start, day.getTime())) return false;
  const h = new Date(start).getHours();
  if (h < 5 || h >= 19) return false;
  return !s.end || ms(s.end) - start < 4 * HOUR;
}

/** When a nap that started at `start` must end: the cap, or the hard stop if earlier. */
export function predictWakeBy(start: number, nap: NapTarget): number {
  const byCap = start + nap.capMin * MIN;
  if (!nap.hardStopAt) return byCap;
  const hard = clockOn(new Date(start), nap.hardStopAt);
  return Math.min(byCap, hard);
}

/** Skip a nap when it could not run at least this long before its hard stop. */
export const MIN_WORTHWHILE_NAP_MIN = 20;
/** Bedtime moves earlier by this much when the last nap was short or skipped. */
export const SHORT_LAST_NAP_MIN = 30;
export const EARLY_BEDTIME_SHIFT_MIN = 30;

export type SleepAction =
  | {
      kind: "asleep";
      napIndex: number;
      wakeBy: number;
      /** Minutes past wake-by; ≤ 0 while there is still time. */
      overdueMin: number;
      hardStop: boolean;
    }
  | {
      kind: "nap";
      napIndex: number;
      startAt: number;
      capMin: number;
      wakeBy: number;
      state: "waiting" | "open" | "late" | "skip";
      /** Planned start minus the predictor's window start, minutes; null without a prediction. */
      deltaMin: number | null;
    }
  | {
      kind: "bedtime";
      at: number;
      deltaMin: number | null;
      /** Minutes pulled earlier because the last nap was short or skipped (0 or 30). */
      adjustedMin: number;
      reason: "short-last-nap" | "skipped-last-nap" | null;
    }
  | { kind: "none" };

export type PlanEvent = { at: number; event: PlanEventKind };

export function planEvents(careLogs: CareLog[]): PlanEvent[] {
  return careLogs
    .filter((l) => l.kind === "event" && l.event)
    .map((l) => ({ at: ms(l.at), event: l.event as PlanEventKind }));
}

export function nextSleep(
  plan: Intervention,
  sessions: SleepSession[],
  events: PlanEvent[],
  now: Date,
  prediction: SleepPrediction | null = null,
): SleepAction {
  if (plan.naps.length === 0 && !plan.bedtimeAt) return { kind: "none" };
  const nowMs = now.getTime();
  const naps = sessions.filter((s) => isDaySleepOn(s, now)).sort((a, b) => ms(a.start) - ms(b.start));
  const open = naps.find((s) => !s.end) ?? null;
  const skipped = events.filter((e) => e.event === "nap_skipped" && sameLocalDay(e.at, nowMs)).length;

  if (open) {
    const idx = Math.min(naps.indexOf(open) + skipped, Math.max(plan.naps.length - 1, 0));
    const nap = plan.naps[idx];
    if (!nap) return { kind: "none" };
    const start = ms(open.start);
    const wakeBy = predictWakeBy(start, nap);
    return {
      kind: "asleep",
      napIndex: idx,
      wakeBy,
      overdueMin: (nowMs - wakeBy) / MIN,
      hardStop: !!nap.hardStopAt && wakeBy < start + nap.capMin * MIN,
    };
  }

  const idx = naps.length + skipped;
  if (idx >= plan.naps.length) {
    const base = clockOn(now, plan.bedtimeAt ?? "20:00");
    const lastNap = naps[naps.length - 1];
    let reason: "short-last-nap" | "skipped-last-nap" | null = null;
    if (skipped > 0 && naps.length < plan.naps.length) reason = "skipped-last-nap";
    else if (lastNap?.end && (ms(lastNap.end) - ms(lastNap.start)) / MIN < SHORT_LAST_NAP_MIN) {
      reason = "short-last-nap";
    }
    const adjustedMin = reason ? EARLY_BEDTIME_SHIFT_MIN : 0;
    const at = base - adjustedMin * MIN;
    return {
      kind: "bedtime",
      at,
      deltaMin: prediction ? (at - prediction.windowStart) / MIN : null,
      adjustedMin,
      reason,
    };
  }

  const nap = plan.naps[idx];
  const startAt = clockOn(now, nap.startAt);
  const wakeBy = predictWakeBy(startAt, nap);
  const hard = nap.hardStopAt ? clockOn(now, nap.hardStopAt) : null;
  let state: "waiting" | "open" | "late" | "skip";
  if (hard !== null && nowMs + MIN_WORTHWHILE_NAP_MIN * MIN >= hard) state = "skip";
  else if (nowMs < startAt - 15 * MIN) state = "waiting";
  else if (nowMs <= startAt + 45 * MIN) state = "open";
  else state = "late";
  return {
    kind: "nap",
    napIndex: idx,
    startAt,
    capMin: nap.capMin,
    wakeBy,
    state,
    deltaMin: prediction ? (startAt - prediction.windowStart) / MIN : null,
  };
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
