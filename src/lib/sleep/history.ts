import { localIsoDate } from "@/lib/food-utils";
import { completedSessions, isNightSession, type SleepSession } from "./model";

/**
 * Sleep history: turn logged sessions into per-day timelines so a parent can
 * look back and see the shape of the days — one block in the morning, one
 * around noon, one late afternoon, night sleep at the ends. A session that
 * crosses midnight is split across the two days it touches, so each day's
 * total and timeline are correct.
 */

const MIN = 60 * 1000;
export const DAY_MINUTES = 24 * 60;

/** One sleep block within a single day, in minutes from local midnight. */
export type SleepBlock = { startMin: number; endMin: number; night: boolean };

export type DaySleep = {
  /** Local calendar date, YYYY-MM-DD. */
  dateIso: string;
  totalMinutes: number;
  /** Number of sessions that touch this day. */
  count: number;
  blocks: SleepBlock[];
};

function dayStartMs(dateIso: string): number {
  const [y, m, d] = dateIso.split("-").map(Number);
  return new Date(y, m - 1, d, 0, 0, 0, 0).getTime();
}

/**
 * Per-day sleep for the most recent `days` calendar days that have any logged
 * sleep, newest first. Days with no sleep are omitted so the list stays tight.
 */
export function dailySleep(sessions: SleepSession[], now: Date, days = 14): DaySleep[] {
  const byDay = new Map<string, DaySleep>();

  for (const s of completedSessions(sessions)) {
    const night = isNightSession(s);
    const start = new Date(s.start).getTime();
    const end = new Date(s.end).getTime();

    // Walk each local day the session overlaps, clipping to that day.
    let cursor = new Date(start);
    cursor.setHours(0, 0, 0, 0);
    while (cursor.getTime() < end) {
      const dateIso = localIsoDate(cursor);
      const dStart = dayStartMs(dateIso);
      const dEnd = dStart + DAY_MINUTES * MIN;
      const segStart = Math.max(start, dStart);
      const segEnd = Math.min(end, dEnd);
      if (segEnd > segStart) {
        const day = byDay.get(dateIso) ?? { dateIso, totalMinutes: 0, count: 0, blocks: [] };
        day.blocks.push({
          startMin: (segStart - dStart) / MIN,
          endMin: (segEnd - dStart) / MIN,
          night,
        });
        day.totalMinutes += (segEnd - segStart) / MIN;
        day.count += 1;
        byDay.set(dateIso, day);
      }
      cursor = new Date(dEnd);
    }
  }

  const cutoff = localIsoDate(new Date(now.getTime() - (days - 1) * DAY_MINUTES * MIN));
  return [...byDay.values()]
    .filter((d) => d.dateIso >= cutoff)
    .sort((a, b) => (a.dateIso < b.dateIso ? 1 : -1))
    .slice(0, days)
    .map((d) => ({ ...d, blocks: d.blocks.sort((x, y) => x.startMin - y.startMin) }));
}

export type SleepHistorySummary = {
  dayCount: number;
  avgTotalMinutes: number;
  avgSleeps: number;
};

/** Averages across the days that have data — an honest at-a-glance summary. */
export function summarizeHistory(days: DaySleep[]): SleepHistorySummary | null {
  if (days.length === 0) return null;
  const totalMin = days.reduce((s, d) => s + d.totalMinutes, 0);
  const totalCount = days.reduce((s, d) => s + d.count, 0);
  return {
    dayCount: days.length,
    avgTotalMinutes: totalMin / days.length,
    avgSleeps: totalCount / days.length,
  };
}
