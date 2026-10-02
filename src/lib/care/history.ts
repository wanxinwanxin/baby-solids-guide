import { localIsoDate } from "@/lib/food-utils";
import { bottleMl } from "@/lib/plan/engine";
import type { CareLog } from "@/lib/storage/types";

/**
 * Bottle history: the bottles of each day laid on a 24-hour track, the way
 * sleep history lays out sleep. A bottle is a moment, not a span, so each one
 * is a mark whose size is its volume. The point of the picture is the shape
 * of the day: many small marks scattered across it, or a few large ones at
 * regular times. A family that is consolidating feeds watches the scatter
 * turn into columns.
 */

const MIN = 60 * 1000;
export const DAY_MINUTES = 24 * 60;

/** A bottle under this many ml reads as a sip. */
export const SIP_ML = 60;
/** A bottle at or above this many ml reads as a full bottle. */
export const FULL_ML = 120;

export type BottleMark = { min: number; ml: number; notes?: string };

export type DayBottles = {
  /** Local calendar date, YYYY-MM-DD. */
  dateIso: string;
  totalMl: number;
  count: number;
  /** Bottles under SIP_ML. */
  sips: number;
  marks: BottleMark[];
};

/**
 * Per-day bottles for the most recent `days` calendar days that have any,
 * newest first. Days without a bottle are omitted, as in dailySleep.
 */
export function dailyBottles(careLogs: CareLog[], now: Date, days = 14): DayBottles[] {
  const byDay = new Map<string, DayBottles>();
  for (const l of careLogs) {
    if (l.kind !== "formula") continue;
    const at = new Date(l.at);
    const dateIso = localIsoDate(at);
    const dayStart = new Date(at.getFullYear(), at.getMonth(), at.getDate()).getTime();
    const ml = bottleMl(l);
    const day = byDay.get(dateIso) ?? { dateIso, totalMl: 0, count: 0, sips: 0, marks: [] };
    day.marks.push({ min: (at.getTime() - dayStart) / MIN, ml, ...(l.notes ? { notes: l.notes } : {}) });
    day.totalMl += ml;
    day.count += 1;
    if (ml < SIP_ML) day.sips += 1;
    byDay.set(dateIso, day);
  }
  const cutoff = localIsoDate(new Date(now.getTime() - (days - 1) * DAY_MINUTES * MIN));
  return [...byDay.values()]
    .filter((d) => d.dateIso >= cutoff)
    .sort((a, b) => (a.dateIso < b.dateIso ? 1 : -1))
    .slice(0, days)
    .map((d) => ({ ...d, totalMl: Math.round(d.totalMl), marks: d.marks.sort((x, y) => x.min - y.min) }));
}

export type BottleHistorySummary = {
  dayCount: number;
  avgMl: number;
  avgCount: number;
  /** Share of all bottles that were sips, 0–1. */
  sipShare: number;
};

/** Averages over complete days only: today is still being written. */
export function summarizeBottles(days: DayBottles[], todayIso: string): BottleHistorySummary | null {
  const done = days.filter((d) => d.dateIso !== todayIso);
  if (done.length === 0) return null;
  const bottles = done.reduce((s, d) => s + d.count, 0);
  const sips = done.reduce((s, d) => s + d.sips, 0);
  return {
    dayCount: done.length,
    avgMl: Math.round(done.reduce((s, d) => s + d.totalMl, 0) / done.length),
    avgCount: Math.round((bottles / done.length) * 10) / 10,
    sipShare: bottles === 0 ? 0 : sips / bottles,
  };
}
