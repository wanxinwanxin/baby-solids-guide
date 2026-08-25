import type { CheckIn, CheckInPreset, ExposureLog } from "@/lib/storage/types";
import type { AllergenStateView } from "@/lib/engine";
import type { Locale, Msg } from "@/lib/i18n/config";
import { fmt } from "@/lib/i18n/config";
import { allergenLabel } from "@/lib/i18n/labels";

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

/**
 * Localized preset labels. CHECKIN_PRESETS keeps plain-string labels (existing
 * consumers render `p.label` directly); locale-aware surfaces use this instead.
 * The `en` values mirror CHECKIN_PRESETS exactly.
 */
const CHECKIN_PRESET_LABEL_MSGS: Record<CheckInPreset, Msg> = {
  "15m": { en: "15 min", zh: "15 分钟" },
  "1h": { en: "1 hour", zh: "1 小时" },
  "2h": { en: "2 hours", zh: "2 小时" },
  "2d": { en: "2 days", zh: "2 天" },
  "1w": { en: "1 week", zh: "1 周" },
};

export function checkinPresetLabel(presetId: CheckInPreset, locale: Locale = "en"): string {
  return CHECKIN_PRESET_LABEL_MSGS[presetId][locale];
}

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

/** Calendar copy. `en` values are pinned by tests — keep them byte-identical. */
const CAL_MSGS = {
  checkinTitle: {
    en: "Check {nickname} for a reaction — {foodName}",
    zh: "查看{nickname}有没有反应——{foodName}",
  },
  checkinDetails: {
    en: "Watch for: {signs}.\n\nLog what you see: {appUrl}/today\n\nIf there is trouble breathing, tongue/lip swelling, widespread hives with vomiting, or the baby is pale/floppy — call 911.",
    zh: "注意观察：{signs}。\n\n把看到的情况记录下来：{appUrl}/today\n\n如果出现呼吸困难、舌头或嘴唇肿胀、大面积荨麻疹伴呕吐，或宝宝面色苍白、软弱无力——立即拨打 911。",
  },
  checkinIcsDescription: {
    en: "Watch for: {signs}. Severe signs (trouble breathing, tongue/lip swelling, widespread hives with vomiting, pale/floppy) = call 911.",
    zh: "注意观察：{signs}。若出现严重信号（呼吸困难、舌头或嘴唇肿胀、大面积荨麻疹伴呕吐、面色苍白或软弱无力），请立即拨打 911。",
  },
  checkinAlarm: { en: "Reaction check-in", zh: "反应观察提醒" },
  maintainSummary: {
    en: "Serve {allergen} this week — keeping it in rotation maintains tolerance",
    zh: "本周给宝宝吃点{allergen}——持续保持在轮换中有助于维持耐受",
  },
  maintainDescription: {
    en: "Aim for about twice a week. Any thin-spread, mixed-in, or family-meal form counts.",
    zh: "目标是每周大约两次。薄涂、拌进辅食或随家庭餐一起吃，任何形式都算。",
  },
} satisfies Record<string, Msg>;

function joinSigns(signs: string[], locale: Locale): string {
  return signs.join(locale === "en" ? "; " : "；");
}

function calDate(iso: string): string {
  return iso.replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

export function googleCalendarUrl(
  input: {
    foodName: string;
    babyNickname: string;
    dueAt: string;
    reactionSigns: string[];
    appUrl: string;
  },
  locale: Locale = "en",
): string {
  const { foodName, babyNickname, dueAt, reactionSigns, appUrl } = input;
  const end = new Date(new Date(dueAt).getTime() + 15 * MIN).toISOString();
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: fmt(CAL_MSGS.checkinTitle[locale], { nickname: babyNickname, foodName }),
    dates: `${calDate(dueAt)}/${calDate(end)}`,
    details: fmt(CAL_MSGS.checkinDetails[locale], {
      signs: joinSigns(reactionSigns, locale),
      appUrl,
    }),
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

export function icsForCheckIns(
  input: {
    foodName: string;
    babyNickname: string;
    dueAts: string[];
    reactionSigns: string[];
    now: Date;
  },
  locale: Locale = "en",
): string {
  const { foodName, babyNickname, dueAts, reactionSigns, now } = input;
  const stamp = calDate(now.toISOString());
  const events = dueAts.map((dueAt, i) =>
    vevent([
      `UID:opensolids-checkin-${calDate(dueAt)}-${i}@opensolids`,
      `DTSTAMP:${stamp}`,
      `DTSTART:${calDate(dueAt)}`,
      `DTEND:${calDate(new Date(new Date(dueAt).getTime() + 15 * MIN).toISOString())}`,
      `SUMMARY:${icsEscape(fmt(CAL_MSGS.checkinTitle[locale], { nickname: babyNickname, foodName }))}`,
      `DESCRIPTION:${icsEscape(fmt(CAL_MSGS.checkinIcsDescription[locale], { signs: joinSigns(reactionSigns, locale) }))}`,
      "BEGIN:VALARM",
      "ACTION:DISPLAY",
      `DESCRIPTION:${icsEscape(CAL_MSGS.checkinAlarm[locale])}`,
      "TRIGGER:PT0M",
      "END:VALARM",
    ]),
  );
  return icsWrap(events);
}

/** Phase 8C — weekly recurring maintenance reminders for maintaining allergens. */
export function icsForMaintenance(
  states: AllergenStateView[],
  now: Date,
  locale: Locale = "en",
): string {
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
        // en keeps the historical raw allergen id ("Serve peanut this week" —
        // pinned by tests); zh uses the localized allergen label.
        `SUMMARY:${icsEscape(
          fmt(CAL_MSGS.maintainSummary[locale], {
            allergen: locale === "en" ? s.allergenId : allergenLabel(s.allergenId, locale),
          }),
        )}`,
        `DESCRIPTION:${icsEscape(CAL_MSGS.maintainDescription[locale])}`,
      ]);
    });
  return icsWrap(events);
}
