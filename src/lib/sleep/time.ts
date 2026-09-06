/**
 * Typed-time parsing for the sleep page. The native time picker makes people
 * scroll a wheel for every minute, so /sleep takes a free-text clock instead
 * and parses the ways people actually write one: "7:35 pm", "19:35", "735",
 * "7pm", "下午7:35", "7点35分". Pure functions, unit-tested.
 */

export type Clock = { h: number; m: number };

export function parseClockText(raw: string): Clock | null {
  let s = raw.trim().toLowerCase();
  if (!s) return null;

  let meridiem: "am" | "pm" | null = null;
  if (/凌晨|早上|上午/.test(s)) meridiem = "am";
  if (/下午|晚上|傍晚|中午/.test(s)) meridiem = "pm";
  s = s
    .replace(/凌晨|早上|上午|下午|晚上|傍晚|中午/g, "")
    .replace(/[点时]/g, ":")
    .replace(/分/g, "")
    .replace(/[\s.]+/g, (ch) => (ch.includes(".") ? "." : ""))
    .replace(/\s+/g, "");

  const suffix = s.match(/(a\.?m\.?|p\.?m\.?|a|p)$/);
  if (suffix) {
    meridiem = suffix[1].startsWith("p") ? "pm" : "am";
    s = s.slice(0, s.length - suffix[1].length);
  }
  s = s.replace(/:$/, ""); // "7点" became "7:"

  let h: number;
  let m: number;
  let match: RegExpMatchArray | null;
  if ((match = s.match(/^(\d{1,2})[:.](\d{1,2})$/))) {
    h = Number(match[1]);
    m = Number(match[2]);
  } else if (/^\d{3,4}$/.test(s)) {
    h = Number(s.slice(0, s.length - 2));
    m = Number(s.slice(-2));
  } else if (/^\d{1,2}$/.test(s)) {
    h = Number(s);
    m = 0;
  } else {
    return null;
  }

  if (meridiem && (h < 1 || h > 12)) return null; // "13pm" is a typo, not a time
  if (meridiem === "pm" && h < 12) h += 12;
  if (meridiem === "am" && h === 12) h = 0;
  if (h > 23 || m > 59) return null;
  return { h, m };
}

/** Local calendar date "YYYY-MM-DD" for a date input. */
export function localDateIso(d: Date): string {
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

/** Combine a date-input value and a parsed clock into a local Date. */
export function combineDateClock(dateIso: string, clock: Clock): Date | null {
  const m = dateIso.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!m) return null;
  return new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]), clock.h, clock.m, 0, 0);
}
