const DAY = 86400000;

export const NUDGE_MIN_LOGS = 10;
export const NUDGE_STALE_EXPORT_DAYS = 14;
export const NUDGE_SNOOZE_DAYS = 7;

/**
 * Phase 6.0 — should the backup nudge banner show?
 * Pure: all date logic lives here, none in components.
 */
export function shouldNudgeBackup(input: {
  logCount: number;
  lastExportAt?: string;
  snoozedUntil?: string;
  today: Date;
}): boolean {
  const { logCount, lastExportAt, snoozedUntil, today } = input;
  if (logCount < NUDGE_MIN_LOGS) return false;
  if (snoozedUntil && new Date(snoozedUntil).getTime() > today.getTime()) return false;
  if (!lastExportAt) return true;
  return today.getTime() - new Date(lastExportAt).getTime() > NUDGE_STALE_EXPORT_DAYS * DAY;
}

export function snoozeUntil(today: Date): string {
  return new Date(today.getTime() + NUDGE_SNOOZE_DAYS * DAY).toISOString();
}
