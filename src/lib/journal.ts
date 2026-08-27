import type { Locale } from "@/lib/i18n/config";
import type { ExposureLog, FeedQuantity } from "@/lib/storage/types";

/**
 * Pure helpers behind the journal (/history). Kept free of React and of the
 * ambient clock so every ordering and labelling rule is directly testable —
 * the caller passes "today" in, the same way the engine takes an injected
 * clock.
 */

export type JournalDay = {
  date: string; // ISO date
  logs: ExposureLog[];
  /** Foods eaten for the first time ever on this date. */
  firstTries: string[];
};

/**
 * Within a day, entries read forward in time (breakfast → bedtime) because
 * that is how a parent recounts a day. Entries with no time sit at the end
 * rather than pretending to be midnight; a missing time is unknown, not early.
 */
export function sortDayLogs(logs: ExposureLog[]): ExposureLog[] {
  return [...logs].sort((a, b) => {
    if (a.time && b.time) return a.time.localeCompare(b.time) || a.id.localeCompare(b.id);
    if (a.time) return -1;
    if (b.time) return 1;
    return a.id.localeCompare(b.id);
  });
}

/**
 * Ids of the entries that represent a food's first try, at most one per food.
 *
 * "Tried" means it actually went in — a refused taste (amountEaten "none") is
 * not a first try, and if a food was offered twice on the same day only the
 * earlier entry is badged.
 */
export function firstTryLogIds(logs: ExposureLog[]): Set<string> {
  const bySlug = new Map<string, ExposureLog>();
  for (const l of logs) {
    if (l.amountEaten === "none") continue;
    const held = bySlug.get(l.foodSlug);
    if (!held || l.date < held.date || (l.date === held.date && sortDayLogs([l, held])[0] === l)) {
      bySlug.set(l.foodSlug, l);
    }
  }
  return new Set([...bySlug.values()].map((l) => l.id));
}

/**
 * Group logs into days, newest day first, each day ordered chronologically.
 * `firstTryIds` is computed over the *unfiltered* set by the caller so that
 * filtering the view never changes which entry counts as a first try.
 */
export function groupByDay(logs: ExposureLog[], firstTryIds: Set<string>): JournalDay[] {
  const days = new Map<string, ExposureLog[]>();
  for (const log of logs) days.set(log.date, [...(days.get(log.date) ?? []), log]);
  return [...days.entries()]
    .sort((a, b) => b[0].localeCompare(a[0]))
    .map(([date, dayLogs]) => ({
      date,
      logs: sortDayLogs(dayLogs),
      firstTries: dayLogs.filter((l) => firstTryIds.has(l.id)).map((l) => l.foodSlug),
    }));
}

/** ISO date `n` days before `from` (local calendar days). */
function shiftDays(from: string, n: number): string {
  const d = new Date(`${from}T00:00:00`);
  d.setDate(d.getDate() + n);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

const WEEKDAYS: Record<Locale, string[]> = {
  en: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  zh: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
};
const MONTHS_EN = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/**
 * "Today" / "Yesterday" for the two dates a parent thinks of by name, an
 * explicit date otherwise. Formatted by hand rather than via Intl so the
 * output is stable across Node/browser ICU builds (the e2e and unit suites
 * both assert on it).
 */
export function dayLabel(date: string, today: string, locale: Locale): string {
  if (date === today) return locale === "en" ? "Today" : "今天";
  if (date === shiftDays(today, -1)) return locale === "en" ? "Yesterday" : "昨天";
  const d = new Date(`${date}T00:00:00`);
  const weekday = WEEKDAYS[locale][d.getDay()];
  if (locale === "zh") return `${d.getMonth() + 1}月${d.getDate()}日 ${weekday}`;
  return `${weekday}, ${d.getDate()} ${MONTHS_EN[d.getMonth()]}`;
}

/**
 * "7:00 PM" in English, "19:00" in Chinese — matching what each audience
 * reads on a clock. Invalid input renders as-is rather than throwing.
 */
export function formatClock(time: string, locale: Locale): string {
  const m = /^(\d{2}):(\d{2})$/.exec(time);
  if (!m) return time;
  const h = Number(m[1]);
  if (locale === "zh") return time;
  const suffix = h < 12 ? "AM" : "PM";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${m[2]} ${suffix}`;
}

/**
 * "20 ml" — trailing zeros trimmed so 20.0 doesn't read as a measurement.
 * `unitLabel` lets the caller pass a localized unit ("毫升"); it defaults to
 * the stored symbol so the function stays usable outside React.
 */
export function formatQuantity(q: FeedQuantity, unitLabel: string = q.unit): string {
  const value = Number.isInteger(q.value) ? String(q.value) : String(Number(q.value.toFixed(2)));
  return `${value} ${unitLabel}`;
}

/** Local wall-clock "HH:MM" right now — the default for a fresh entry. */
export function clockNow(at: Date = new Date()): string {
  return `${String(at.getHours()).padStart(2, "0")}:${String(at.getMinutes()).padStart(2, "0")}`;
}
