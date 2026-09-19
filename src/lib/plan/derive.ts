import { completedSessions, isNightSession, median } from "@/lib/sleep/model";
import type { CareLog, Intervention, InterventionGoal, NapTarget, SleepSession } from "@/lib/storage/types";
import { bottleMl, isDaySleepOn, toClock } from "./engine";

/**
 * Derive an intervention plan from the family's own logs and their goals —
 * the step the engine instructs from, without asking the parent to type a
 * schedule they have already been living.
 *
 * "Where he is now" is read from the last 14 days: bottles per day and
 * total ml, nap count with per-nap start and length, when the last nap
 * ends, when the night starts, how often and how much he feeds at night.
 * "Where this step goes" moves each of those a bounded distance toward
 * the goal's target — sixty minutes of last-nap end per step, thirty of
 * bedtime, twenty ml of night bottle — so a step is always a change a
 * family can actually make in three days. With too little data, the age
 * template stands in and the summary says so.
 */

const MIN = 60 * 1000;
const DAY = 24 * 60 * MIN;
export const LOOKBACK_DAYS = 14;
/** Fewer logged days than this and the age template stands in. */
export const MIN_DAYS = 3;

const ms = (iso: string) => new Date(iso).getTime();
const clockMin = (at: number) => {
  const d = new Date(at);
  return d.getHours() * 60 + d.getMinutes();
};
const round15 = (m: number) => Math.round(m / 15) * 15;
const round5 = (v: number) => Math.round(v / 5) * 5;
const hhmm = (m: number) => {
  const mm = ((Math.round(m) % (24 * 60)) + 24 * 60) % (24 * 60);
  return `${String(Math.floor(mm / 60)).padStart(2, "0")}:${String(mm % 60).padStart(2, "0")}`;
};
const parseHHMM = (s: string) => {
  const [h, m] = s.split(":").map(Number);
  return h * 60 + m;
};
const dayKey = (at: number) => new Date(at).toDateString();

/** Age-band targets the derivation moves toward. */
type AgeBand = {
  bottles: number;
  bottleMin: number;
  bottleMax: number;
  dailyMlMin: number;
  dailyMlMax: number;
  napCaps: number[];
  /** Awake stretch the last nap must leave before the bedtime target. */
  finalWakeMin: number;
  bedtimeMin: number;
  nightCutoff: string;
};
export function ageBand(ageMonths: number): AgeBand {
  if (ageMonths < 6) {
    return { bottles: 6, bottleMin: 90, bottleMax: 180, dailyMlMin: 700, dailyMlMax: 950, napCaps: [60, 90, 90, 45], finalWakeMin: 150, bedtimeMin: 19 * 60 + 30, nightCutoff: "05:00" };
  }
  if (ageMonths < 9) {
    return { bottles: 5, bottleMin: 120, bottleMax: 210, dailyMlMin: 700, dailyMlMax: 950, napCaps: [60, 90, 60], finalWakeMin: 225, bedtimeMin: 20 * 60, nightCutoff: "04:00" };
  }
  return { bottles: 4, bottleMin: 150, bottleMax: 240, dailyMlMin: 600, dailyMlMax: 900, napCaps: [90, 90], finalWakeMin: 240, bedtimeMin: 19 * 60 + 30, nightCutoff: "05:00" };
}

export type Observed = {
  /** Calendar days with at least one bottle in the lookback. */
  bottleDays: number;
  bottlesPerDay: number | null;
  dailyMl: number | null;
  medianBottleMl: number | null;
  /** Nights (night sessions) in the lookback. */
  nights: number;
  napsPerDay: number | null;
  /** Per nap index (0-based): median start and length, minutes. */
  naps: { startMin: number; durMin: number }[];
  lastNapEndMin: number | null;
  /** Median clock of night-sleep onset, minutes after midnight. */
  bedtimeMin: number | null;
  /** Median clock of the final morning wake. */
  wakeMin: number | null;
  nightFeedsPerNight: number | null;
  nightFeedMl: number | null;
};

/** Read the last 14 days off the logs. Every field is null when unobserved. */
export function observe(sessions: SleepSession[], careLogs: CareLog[], now: Date): Observed {
  const since = now.getTime() - LOOKBACK_DAYS * DAY;

  // Bottles per local calendar day, excluding the (partial) current day.
  const bottles = careLogs.filter((l) => l.kind === "formula" && l.amount && ms(l.at) >= since);
  const byDay = new Map<string, number[]>();
  for (const b of bottles) {
    const k = dayKey(ms(b.at));
    if (k === dayKey(now.getTime())) continue;
    byDay.set(k, [...(byDay.get(k) ?? []), bottleMl(b)]);
  }
  const days = [...byDay.values()];
  const bottleDays = days.length;
  const bottlesPerDay = median(days.map((d) => d.length));
  const dailyMl = median(days.map((d) => d.reduce((s, v) => s + v, 0)));
  const medianBottleMl = median(bottles.map(bottleMl));

  // Night bottles: 22:00–05:00.
  const nightBottles = bottles.filter((b) => {
    const h = new Date(ms(b.at)).getHours();
    return h >= 22 || h < 5;
  });
  const nightByNight = new Map<string, number[]>();
  for (const b of nightBottles) {
    // A 01:00 bottle belongs to the night that started the evening before.
    const k = dayKey(ms(b.at) - 12 * 60 * MIN);
    nightByNight.set(k, [...(nightByNight.get(k) ?? []), bottleMl(b)]);
  }

  // Sleep: night onsets, final wakes, and per-day naps.
  const done = completedSessions(sessions).filter((s) => ms(s.start) >= since);
  const nightsList = done.filter(isNightSession).filter((s) => {
    const h = new Date(ms(s.start)).getHours();
    return h >= 17 || h < 2;
  });
  const bedtimeMin = median(nightsList.map((s) => clockMin(ms(s.start))).map((m) => (m < 2 * 60 ? m + 24 * 60 : m)));
  const wakeMin = median(
    nightsList
      .map((s) => clockMin(ms(s.end)))
      .filter((m) => m >= 4 * 60 && m <= 10 * 60),
  );
  const nightFeedsPerNight =
    nightsList.length === 0 ? null : nightBottles.length === 0 ? 0 : median([...nightByNight.values()].map((v) => v.length));
  const nightFeedMl = median(nightBottles.map(bottleMl));

  const napDays = new Map<string, (SleepSession & { end: string })[]>();
  for (const s of done) {
    const day = new Date(ms(s.start));
    if (!isDaySleepOn(s, day)) continue;
    if (dayKey(ms(s.start)) === dayKey(now.getTime())) continue;
    const k = dayKey(ms(s.start));
    napDays.set(k, [...(napDays.get(k) ?? []), s]);
  }
  const napLists = [...napDays.values()].map((l) => l.sort((a, b) => ms(a.start) - ms(b.start)));
  const napsPerDay = median(napLists.map((l) => l.length));
  const napCount = napsPerDay === null ? 0 : Math.round(napsPerDay);
  const naps: Observed["naps"] = [];
  for (let i = 0; i < napCount; i++) {
    const starts = napLists.filter((l) => l[i]).map((l) => clockMin(ms(l[i].start)));
    const durs = napLists.filter((l) => l[i]).map((l) => (ms(l[i].end) - ms(l[i].start)) / MIN);
    const st = median(starts);
    const du = median(durs);
    if (st !== null && du !== null) naps.push({ startMin: st, durMin: du });
  }
  const lastNapEndMin = median(napLists.filter((l) => l.length > 0).map((l) => clockMin(ms(l[l.length - 1].end))));

  return {
    bottleDays,
    bottlesPerDay,
    dailyMl,
    medianBottleMl,
    nights: nightsList.length,
    napsPerDay,
    naps,
    lastNapEndMin,
    bedtimeMin,
    wakeMin,
    nightFeedsPerNight,
    nightFeedMl,
  };
}

export type Derived = {
  plan: Intervention;
  observed: Observed;
  /** Which parts fell back to the age template for lack of data. */
  usedDefaults: ("bottles" | "naps" | "night")[];
};

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

/**
 * Bottles: the age-band count, evenly spaced from his own wake to an hour
 * before bedtime, sized from his own daily total with the last one biggest.
 */
function deriveBottles(o: Observed, band: AgeBand, bedtimeMin: number): { at: string; ml: number }[] {
  const count = band.bottles;
  const first = round15(o.wakeMin ?? 6 * 60);
  const last = round15(bedtimeMin - 60);
  const span = Math.max(last - first, (count - 1) * 120);
  const total = clamp(o.dailyMl ?? (band.dailyMlMin + band.dailyMlMax) / 2, band.dailyMlMin, band.dailyMlMax);
  const per = round5(total / count);
  const lastMl = clamp(per + 20, band.bottleMin, band.bottleMax);
  const otherMl = clamp(per - 5, band.bottleMin, band.bottleMax);
  return Array.from({ length: count }, (_, i) => ({
    at: hhmm(round15(first + (span * i) / (count - 1))),
    ml: i === count - 1 ? lastMl : otherMl,
    ...(i === 0 ? { onWake: true } : {}),
  }));
}

/**
 * Naps: caps by time of day. His own nap count sets how many bands; the
 * bands split the day at the midpoints between where his naps usually
 * start, so "the cap for a nap that starts around noon" is what is stored
 * — never "nap 2". Each cap is his own usual length, capped by age. The
 * last band gets a hard stop that walks 60 minutes per step from where
 * the last nap ends today to where the bedtime target needs it to end.
 */
function deriveNaps(o: Observed, band: AgeBand, bedtimeMin: number, step: number): NapTarget[] {
  const count = clamp(o.naps.length || band.napCaps.length, 2, 4);
  const targetEnd = bedtimeMin - band.finalWakeMin;
  const observedEnd = o.lastNapEndMin ?? targetEnd;
  const hardStop = round15(Math.max(targetEnd, observedEnd - 60 * step));
  const starts = Array.from({ length: count }, (_, i) =>
    o.naps[i] ? o.naps[i].startMin : (o.wakeMin ?? 6 * 60) + 120 + i * 240,
  );
  return starts.map((start, i) => {
    const cap = band.napCaps[Math.min(i, band.napCaps.length - 1)];
    const seen = o.naps[i];
    const capMin = seen ? clamp(round15(Math.min(seen.durMin, cap)), 30, cap) : cap;
    const from = i === 0 ? 4 * 60 : round15((starts[i - 1] + start) / 2);
    const to = i === count - 1 ? 19 * 60 : round15((start + starts[i + 1]) / 2);
    return i === count - 1
      ? { from: hhmm(from), to: hhmm(to), capMin, hardStopAt: hhmm(hardStop) }
      : { from: hhmm(from), to: hhmm(to), capMin };
  });
}

export function deriveIntervention(input: {
  goals: InterventionGoal[];
  ageMonths: number;
  sessions: SleepSession[];
  careLogs: CareLog[];
  now: Date;
  step?: number;
  startedOn?: string;
}): Derived {
  const { goals, ageMonths, sessions, careLogs, now } = input;
  const step = Math.max(1, input.step ?? 1);
  const band = ageBand(ageMonths);
  const o = observe(sessions, careLogs, now);
  const usedDefaults: Derived["usedDefaults"] = [];
  const enoughBottles = o.bottleDays >= MIN_DAYS;
  const enoughNights = o.nights >= MIN_DAYS;

  // Bedtime target: shifted toward the age floor 30 min per step when that
  // is a goal; the age floor outright when shortening day sleep (the point
  // is to move sleep into the night); otherwise his own.
  const observedBed = o.bedtimeMin ?? band.bedtimeMin + 60;
  let bedtimeMin: number | undefined;
  if (goals.includes("shift-bedtime")) bedtimeMin = round15(Math.max(band.bedtimeMin, observedBed - 30 * step));
  else if (goals.includes("cap-day-sleep")) bedtimeMin = band.bedtimeMin;
  else if (goals.includes("consolidate-feeds")) bedtimeMin = round15(Math.min(observedBed, band.bedtimeMin + 90));
  const bedtimeForSpacing = bedtimeMin ?? round15(observedBed);

  let feedWindows: Intervention["feedWindows"] = [];
  if (goals.includes("consolidate-feeds")) {
    if (!enoughBottles) usedDefaults.push("bottles");
    feedWindows = deriveBottles(o, band, bedtimeForSpacing);
  }

  let naps: NapTarget[] = [];
  if (goals.includes("cap-day-sleep") || goals.includes("shift-bedtime")) {
    if (!enoughNights) usedDefaults.push("naps");
    naps = deriveNaps(o, band, bedtimeForSpacing, step);
  }

  let nightCutoffAt: string | undefined;
  let nightFeedMl: number | undefined;
  if (goals.includes("night-wean")) {
    if (o.nightFeedMl === null) usedDefaults.push("night");
    nightCutoffAt = band.nightCutoff;
    nightFeedMl = Math.max(40, round5((o.nightFeedMl ?? 120) - 20 * (step - 1)));
  }

  const plan: Intervention = {
    enabled: true,
    goals,
    startedOn: input.startedOn ?? new Date(now.getTime()).toISOString().slice(0, 10),
    step,
    flexMin: 45,
    feedWindows,
    naps,
    ...(naps.length > 0 ? { maxDaySleepMin: naps.reduce((sum, n) => sum + n.capMin, 0) } : {}),
    // His usual wake: an earlier wake followed by more sleep is still the night.
    ...(o.wakeMin !== null ? { dayStartAt: hhmm(round15(o.wakeMin)) } : {}),
    ...(bedtimeMin !== undefined && (goals.includes("cap-day-sleep") || goals.includes("shift-bedtime"))
      ? { bedtimeAt: hhmm(bedtimeMin) }
      : {}),
    ...(nightCutoffAt ? { nightCutoffAt } : {}),
    ...(nightFeedMl ? { nightFeedMl } : {}),
  };
  return { plan, observed: o, usedDefaults };
}

/** "HH:MM" for a minutes-after-midnight value, or null. */
export const clockOrNull = (m: number | null) => (m === null ? null : hhmm(round15(m)));
/** Exposed for the summary: which clock a plan's HH:MM sits at. */
export const planClockMin = parseHHMM;
export { toClock };
