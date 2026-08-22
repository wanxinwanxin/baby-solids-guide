const MS_PER_DAY = 24 * 60 * 60 * 1000;
const DAYS_PER_MONTH = 30.4375; // 365.25 / 12

function toUtcDate(iso: string): Date {
  return new Date(`${iso}T00:00:00Z`);
}

export function daysBetween(fromIso: string, to: Date): number {
  return (to.getTime() - toUtcDate(fromIso).getTime()) / MS_PER_DAY;
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
