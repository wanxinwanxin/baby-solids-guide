import type { Locale } from "@/lib/i18n/config";
import type { SleepSession } from "@/lib/storage/types";

/**
 * Sleep window predictor — the pure engine behind /sleep.
 *
 * The design follows the two-process model of sleep regulation:
 *  - Process S (sleep pressure) appears as an age-based wake-window prior,
 *    personalized from the family's own logged wake windows, and adjusted
 *    when the last nap was short or long.
 *  - Process C (circadian rhythm) appears as a bedtime estimate that grows
 *    out of the logged night-sleep starts, and as a wide-window caveat for
 *    newborns, whose circadian drive is still near zero.
 *
 * Every input is public science (published wake-window tables and the
 * two-process literature) plus this device's own logs. All functions take an
 * injected `now` so they are unit-testable.
 */

export type { SleepSession };

const MIN = 60 * 1000;
const HOUR = 60 * MIN;
const DAY = 24 * HOUR;

/**
 * Age prior anchors: [months, shortest typical wake window, longest] in
 * minutes. Values follow the published pediatric wake-window tables that
 * sleep consultants use. Interpolation between anchors keeps the prior
 * continuous, so a 5.2-month-old gets a 5.2-month prior.
 */
const WAKE_WINDOW_ANCHORS: [number, number, number][] = [
  [0.5, 30, 60],
  [1.5, 40, 75],
  [3, 60, 105],
  [4.5, 90, 150],
  [6, 120, 165],
  [7.5, 135, 195],
  [9, 150, 210],
  [11, 180, 240],
  [13, 210, 300],
  [16, 240, 330],
  [20, 300, 360],
  [24, 330, 390],
];

/** Age defaults for bedtime, minutes after local midnight. */
function bedtimePriorMinutes(ageMonths: number): number {
  if (ageMonths < 3) return 21 * 60; // newborn "bedtime" is late and fluid
  if (ageMonths < 6) return 20 * 60;
  return 19.5 * 60;
}

export type WakeWindowPrior = { min: number; max: number; mid: number };

export function wakeWindowPrior(ageMonths: number): WakeWindowPrior {
  const a = WAKE_WINDOW_ANCHORS;
  const clamped = Math.min(Math.max(ageMonths, a[0][0]), a[a.length - 1][0]);
  let lo = a[0];
  let hi = a[a.length - 1];
  for (let i = 0; i < a.length - 1; i++) {
    if (clamped >= a[i][0] && clamped <= a[i + 1][0]) {
      lo = a[i];
      hi = a[i + 1];
      break;
    }
  }
  const t = hi[0] === lo[0] ? 0 : (clamped - lo[0]) / (hi[0] - lo[0]);
  const min = lo[1] + t * (hi[1] - lo[1]);
  const max = lo[2] + t * (hi[2] - lo[2]);
  return { min, max, mid: (min + max) / 2 };
}

const ms = (iso: string): number => new Date(iso).getTime();

/** Completed sessions with a sane duration, oldest first. */
export function completedSessions(sessions: SleepSession[]): (SleepSession & { end: string })[] {
  return sessions
    .filter((s): s is SleepSession & { end: string } => {
      if (!s.end) return false;
      const dur = ms(s.end) - ms(s.start);
      return dur > 0 && dur <= 20 * HOUR;
    })
    .sort((x, y) => ms(x.start) - ms(y.start));
}

export function openSession(sessions: SleepSession[]): SleepSession | null {
  const open = sessions.filter((s) => !s.end).sort((x, y) => ms(y.start) - ms(x.start));
  return open[0] ?? null;
}

/** A completed session that reads as night sleep, for the bedtime estimate. */
export function isNightSession(s: SleepSession & { end: string }): boolean {
  return ms(s.end) - ms(s.start) >= 4 * HOUR;
}

/**
 * Observed wake windows: the awake gaps between consecutive completed
 * sessions in the lookback period. Gaps outside 15 minutes–7 hours are
 * dropped — those are missing logs, not real wake windows.
 */
export function observedWakeWindows(
  sessions: SleepSession[],
  now: Date,
  lookbackDays = 14,
): number[] {
  const done = completedSessions(sessions).filter(
    (s) => now.getTime() - ms(s.start) <= lookbackDays * DAY,
  );
  const gaps: number[] = [];
  for (let i = 0; i < done.length - 1; i++) {
    const gap = (ms(done[i + 1].start) - ms(done[i].end)) / MIN;
    if (gap >= 15 && gap <= 7 * 60) gaps.push(gap);
  }
  return gaps;
}

export function median(values: number[]): number | null {
  if (values.length === 0) return null;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

/** Personal windows begin to steer the prediction from this sample count. */
export const PERSONALIZED_AT = 5;

export type LastNapAdjust = "shorter" | "longer" | null;

export type PredictionBasis = {
  ageMonths: number;
  prior: WakeWindowPrior;
  /** Median observed wake window (minutes), when any windows are logged. */
  personalMedian: number | null;
  observedCount: number;
  /** The blended, adjusted wake window (minutes) the prediction uses. */
  effectiveWindow: number;
  lastNapAdjust: LastNapAdjust;
  /** Duration of the last completed nap, minutes (drives lastNapAdjust). */
  lastNapMinutes: number | null;
  personalized: boolean;
  newborn: boolean;
  /** Epoch ms of tonight's estimated bedtime. */
  bedtimeEstimate: number;
  bedtimePersonalized: boolean;
};

export type SleepPrediction = {
  kind: "nap" | "bedtime";
  /** Epoch ms of the last known wake-up. */
  lastWake: number;
  windowStart: number;
  windowEnd: number;
  basis: PredictionBasis;
};

/** Minutes after local midnight for an ISO datetime, on the device clock. */
function clockMinutes(iso: string): number {
  const d = new Date(iso);
  return d.getHours() * 60 + d.getMinutes();
}

/**
 * Tonight's estimated bedtime: the personal median of night-sleep starts,
 * blended with the age default under the same shrinkage as wake windows.
 */
export function estimateBedtime(
  sessions: SleepSession[],
  ageMonths: number,
  now: Date,
): { at: number; personalized: boolean } {
  const nights = completedSessions(sessions)
    .filter(isNightSession)
    .filter((s) => now.getTime() - ms(s.start) <= 14 * DAY)
    // Keep evening starts; a 3 a.m. resettle is not a bedtime.
    .filter((s) => clockMinutes(s.start) >= 17 * 60 && clockMinutes(s.start) <= 23 * 60);
  const personal = median(nights.map((s) => clockMinutes(s.start)));
  const prior = bedtimePriorMinutes(ageMonths);
  const w = nights.length / (nights.length + 6);
  const minutes = personal === null ? prior : prior * (1 - w) + personal * w;
  const at = new Date(now);
  at.setHours(0, 0, 0, 0);
  return {
    at: at.getTime() + minutes * MIN,
    personalized: nights.length >= 3,
  };
}

export type PredictInput = {
  sessions: SleepSession[];
  ageMonths: number;
  now: Date;
  /** Fallback last-wake (ISO) when no completed session provides one. */
  wakeAnchor?: string;
};

/**
 * The next sleep window. Returns null when nothing tells us when the baby
 * last woke (no completed session and no anchor) — the UI then asks.
 */
export function predictNextSleep(input: PredictInput): SleepPrediction | null {
  const { sessions, ageMonths, now } = input;
  const done = completedSessions(sessions);
  const last = done[done.length - 1] ?? null;
  const candidates: number[] = [];
  if (last) candidates.push(ms(last.end));
  if (input.wakeAnchor) candidates.push(ms(input.wakeAnchor));
  const lastWake = Math.max(...candidates, 0);
  if (lastWake <= 0 || lastWake > now.getTime() + 5 * MIN) return null;

  const prior = wakeWindowPrior(ageMonths);
  const windows = observedWakeWindows(sessions, now);
  const personalMedian = median(windows);

  // Shrinkage toward the age prior: a few logged windows nudge, many steer.
  const w = windows.length / (windows.length + 6);
  let effective = personalMedian === null ? prior.mid : prior.mid * (1 - w) + personalMedian * w;

  // Process-S proxy: a short last nap cleared less pressure, a long one more.
  let lastNapAdjust: LastNapAdjust = null;
  let lastNapMinutes: number | null = null;
  if (last && !isNightSession(last) && ms(last.end) === lastWake) {
    lastNapMinutes = (ms(last.end) - ms(last.start)) / MIN;
    if (ageMonths >= 3) {
      if (lastNapMinutes < 45) {
        effective *= 0.85;
        lastNapAdjust = "shorter";
      } else if (lastNapMinutes > 90) {
        effective *= 1.08;
        lastNapAdjust = "longer";
      }
    }
  }

  // Guardrail: personalization never leaves the age-safe envelope.
  effective = Math.min(Math.max(effective, prior.min * 0.75), prior.max * 1.25);

  const newborn = ageMonths < 2;
  const [lo, hi] = newborn ? [0.75, 1.25] : [0.88, 1.08];
  const windowStart = lastWake + effective * lo * MIN;
  const windowEnd = lastWake + effective * hi * MIN;

  const bedtime = estimateBedtime(sessions, ageMonths, now);
  // Process-C label: a window that opens inside the bedtime zone IS bedtime.
  const kind: "nap" | "bedtime" =
    ageMonths >= 3 && windowStart >= bedtime.at - 60 * MIN ? "bedtime" : "nap";

  return {
    kind,
    lastWake,
    windowStart,
    windowEnd,
    basis: {
      ageMonths,
      prior,
      personalMedian,
      observedCount: windows.length,
      effectiveWindow: effective,
      lastNapAdjust,
      lastNapMinutes,
      personalized: windows.length >= PERSONALIZED_AT,
      newborn,
      bedtimeEstimate: bedtime.at,
      bedtimePersonalized: bedtime.personalized,
    },
  };
}

/** "1 h 25 min" / "45 min", localized just enough for the two locales. */
export function formatDuration(minutes: number, locale: Locale): string {
  const total = Math.max(0, Math.round(minutes));
  const h = Math.floor(total / 60);
  const m = total % 60;
  if (locale === "zh") {
    if (h === 0) return `${m} 分钟`;
    return m === 0 ? `${h} 小时` : `${h} 小时 ${m} 分钟`;
  }
  if (h === 0) return `${m} min`;
  return m === 0 ? `${h} h` : `${h} h ${m} min`;
}

/** Wall-clock label for an epoch ms, on the device clock. */
export function formatTime(at: number, locale: Locale): string {
  return new Intl.DateTimeFormat(locale === "zh" ? "zh-CN" : "en-US", {
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(at));
}
