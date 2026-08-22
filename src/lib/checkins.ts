import type { CheckIn, CheckInPreset, ExposureLog } from "@/lib/storage/types";
import type { AllergenStateView } from "@/lib/engine";

/**
 * Phase 8A — reaction check-ins. Pure helpers: preset math, onset mapping,
 * Google Calendar links, and .ics generation. No Date.now() — clocks injected.
 */

const MIN = 60000;
const HOUR = 60 * MIN;
const DAY = 24 * HOUR;

export const CHECKIN_PRESETS: { id: CheckInPreset; label: string; defaultOn?: boolean }[] = [
  { id: "15m", label: "15 min" },
  { id: "1h", label: "1 hour" },
  { id: "2h", label: "2 hours", defaultOn: true },
  { id: "2d", label: "2 days" },
  { id: "1w", label: "1 week" },
];

export function dueAtForPreset(preset: CheckInPreset, now: Date): string {
  const offsets: Record<CheckInPreset, number> = {
    "15m": 15 * MIN,
    "1h": HOUR,
    "2h": 2 * HOUR,
    "2d": 2 * DAY,
    "1w": 7 * DAY,
  };
  return new Date(now.getTime() + offsets[preset]).toISOString();
}

/** Map elapsed time since the food was logged onto the symptom-onset vocabulary. */
export function onsetForElapsed(loggedAt: Date, now: Date): ExposureLog["symptomOnset"] {
  const elapsed = now.getTime() - loggedAt.getTime();
  if (elapsed < 15 * MIN) return "immediate";
  if (elapsed < 2 * HOUR) return "within-2h";
  if (elapsed < 6 * HOUR) return "2-6h";
  return "next-day";
}

export function pendingCheckIns(checkIns: CheckIn[], now: Date): { due: CheckIn[]; upcoming: CheckIn[] } {
  const pending = checkIns.filter((c) => c.status === "pending");
  return {
    due: pending
      .filter((c) => new Date(c.dueAt).getTime() <= now.getTime())
      .sort((a, b) => a.dueAt.localeCompare(b.dueAt)),
    upcoming: pending
      .filter((c) => new Date(c.dueAt).getTime() > now.getTime())
      .sort((a, b) => a.dueAt.localeCompare(b.dueAt)),
  };
}

// ——— Calendar delivery (no server needed) ———

function calDate(iso: string): string {
  return iso.replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

export function googleCalendarUrl(input: {
  foodName: string;
  babyNickname: string;
  dueAt: string;
  reactionSigns: string[];
  appUrl: string;
}): string {
  const { foodName, babyNickname, dueAt, reactionSigns, appUrl } = input;
  const end = new Date(new Date(dueAt).getTime() + 15 * MIN).toISOString();
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `Check ${babyNickname} for a reaction — ${foodName}`,
    dates: `${calDate(dueAt)}/${calDate(end)}`,
    details: `Watch for: ${reactionSigns.join("; ")}.\n\nLog what you see: ${appUrl}/today\n\nIf there is trouble breathing, tongue/lip swelling, widespread hives with vomiting, or the baby is pale/floppy — call 911.`,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function icsEscape(s: string): string {
  return s.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
}

function vevent(lines: string[]): string {
  return ["BEGIN:VEVENT", ...lines, "END:VEVENT"].join("\r\n");
}

function icsWrap(events: string[]): string {
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//OpenSolids//Check-ins//EN",
    ...events,
    "END:VCALENDAR",
  ].join("\r\n");
}

export function icsForCheckIns(input: {
  foodName: string;
  babyNickname: string;
  dueAts: string[];
  reactionSigns: string[];
  now: Date;
}): string {
  const { foodName, babyNickname, dueAts, reactionSigns, now } = input;
  const stamp = calDate(now.toISOString());
  const events = dueAts.map((dueAt, i) =>
    vevent([
      `UID:opensolids-checkin-${calDate(dueAt)}-${i}@opensolids`,
      `DTSTAMP:${stamp}`,
      `DTSTART:${calDate(dueAt)}`,
      `DTEND:${calDate(new Date(new Date(dueAt).getTime() + 15 * MIN).toISOString())}`,
      `SUMMARY:${icsEscape(`Check ${babyNickname} for a reaction — ${foodName}`)}`,
      `DESCRIPTION:${icsEscape(`Watch for: ${reactionSigns.join("; ")}. Severe signs (trouble breathing, tongue/lip swelling, widespread hives with vomiting, pale/floppy) = call 911.`)}`,
      "BEGIN:VALARM",
      "ACTION:DISPLAY",
      "DESCRIPTION:Reaction check-in",
      "TRIGGER:PT0M",
      "END:VALARM",
    ]),
  );
  return icsWrap(events);
}

/** Phase 8C — weekly recurring maintenance reminders for maintaining allergens. */
export function icsForMaintenance(states: AllergenStateView[], now: Date): string {
  const stamp = calDate(now.toISOString());
  // First occurrence: tomorrow 11:00 UTC, staggered a day per allergen.
  const base = new Date(now.getTime() + DAY);
  base.setUTCHours(11, 0, 0, 0);
  const events = states
    .filter((s) => s.status === "maintaining")
    .map((s, i) => {
      const start = new Date(base.getTime() + i * DAY);
      return vevent([
        `UID:opensolids-maintain-${s.allergenId}@opensolids`,
        `DTSTAMP:${stamp}`,
        `DTSTART:${calDate(start.toISOString())}`,
        `DTEND:${calDate(new Date(start.getTime() + 15 * MIN).toISOString())}`,
        "RRULE:FREQ=WEEKLY",
        `SUMMARY:${icsEscape(`Serve ${s.allergenId} this week — keeping it in rotation maintains tolerance`)}`,
        `DESCRIPTION:${icsEscape("Aim for about twice a week. Any thin-spread, mixed-in, or family-meal form counts.")}`,
      ]);
    });
  return icsWrap(events);
}
