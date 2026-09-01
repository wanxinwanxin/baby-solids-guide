import { localIsoDate } from "@/lib/food-utils";

const MS_PER_DAY = 24 * 60 * 60 * 1000;
const DAYS_PER_MONTH = 30.4375; // 365.25 / 12

function toUtcDate(iso: string): Date {
  return new Date(`${iso}T00:00:00Z`);
}

export function daysBetween(fromIso: string, to: Date): number {
  return (to.getTime() - toUtcDate(fromIso).getTime()) / MS_PER_DAY;
}

/**
 * Whole calendar days from `fromIso` to the local calendar day of `to`
 * (0 = the same day). Use this to compare a stored log date with the clock —
 * `daysBetween` measures from UTC midnight, so an evening "today" reads as
 * one day ago in western timezones.
 */
export function calendarDaysBetween(fromIso: string, to: Date): number {
  return Math.round(
    (toUtcDate(localIsoDate(to)).getTime() - toUtcDate(fromIso).getTime()) / MS_PER_DAY,
  );
}

export function chronologicalAgeMonths(birthDate: string, today: Date): number {
  return daysBetween(birthDate, today) / DAYS_PER_MONTH;
}

/**
 * Corrected age (ROADMAP §5.1): when a due date is on file and the baby was
 * born early, subtract the weeks of prematurity — but only until 24 months
 * chronological, the standard cutoff for age correction.
 */
export function correctedAgeMonths(
  baby: { birthDate: string; dueDate?: string },
  today: Date,
): number {
  const chrono = chronologicalAgeMonths(baby.birthDate, today);
  if (!baby.dueDate || chrono >= 24) return chrono;
  const daysEarly =
    (toUtcDate(baby.dueDate).getTime() - toUtcDate(baby.birthDate).getTime()) / MS_PER_DAY;
  if (daysEarly <= 0) return chrono;
  return chrono - daysEarly / DAYS_PER_MONTH;
}

/**
 * The calendar date on which corrected age reaches `months` — the inverse of
 * `correctedAgeMonths`. Used to answer "so when *can* we start?", so a family
 * that is told to wait is also told what they are waiting for.
 */
export function dateAtCorrectedAge(
  baby: { birthDate: string; dueDate?: string },
  months: number,
): Date {
  const birth = toUtcDate(baby.birthDate);
  const daysEarly = baby.dueDate
    ? Math.max(0, (toUtcDate(baby.dueDate).getTime() - birth.getTime()) / MS_PER_DAY)
    : 0;
  return new Date(birth.getTime() + (months * DAYS_PER_MONTH + daysEarly) * MS_PER_DAY);
}
