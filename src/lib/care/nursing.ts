import type { Locale } from "@/lib/i18n/config";
import { formatDuration } from "@/lib/sleep/model";
import type { BreastSide, CareLog } from "@/lib/storage/types";

/**
 * Breastfeeding: a two-side timer, the side to start on next, and per-day
 * totals. A feed is a CareLog of kind "breast" whose `at` is the start and
 * whose `nursing` holds the seconds on each side.
 *
 * The timer is pure state plus pure transitions, so a feed survives a
 * reload or a locked phone: the running side is stored as the epoch ms it
 * began, never as a count that a sleeping tab would stop advancing.
 */

export type NursingTimer = {
  /** Epoch ms when the first side began. */
  startedAt: number;
  /** Finished stretches on each side, in ms. */
  leftMs: number;
  rightMs: number;
  /** The side running now, or null while paused. */
  running: BreastSide | null;
  /** Epoch ms when the running stretch began. Null while paused. */
  since: number | null;
  /** The first side of this feed. */
  startSide: BreastSide;
};

export const otherSide = (s: BreastSide): BreastSide => (s === "left" ? "right" : "left");

/**
 * One tap on a side button. With no timer, the tap starts the feed on that
 * side. A tap on the other side switches to it. A tap on the running side
 * pauses it, and a tap on a paused timer resumes on the side tapped.
 */
export function tapSide(t: NursingTimer | null, side: BreastSide, now: number): NursingTimer {
  if (!t) {
    return { startedAt: now, leftMs: 0, rightMs: 0, running: side, since: now, startSide: side };
  }
  const banked = pause(t, now);
  if (t.running === side) return banked;
  return { ...banked, running: side, since: now };
}

/** Stop the running side and bank its stretch. A paused timer is unchanged. */
export function pause(t: NursingTimer, now: number): NursingTimer {
  if (!t.running || t.since === null) return t;
  const ms = Math.max(0, now - t.since);
  return {
    ...t,
    leftMs: t.leftMs + (t.running === "left" ? ms : 0),
    rightMs: t.rightMs + (t.running === "right" ? ms : 0),
    running: null,
    since: null,
  };
}

/** Time on each side so far, including the stretch that is still running. */
export function elapsed(t: NursingTimer, now: number): { leftMs: number; rightMs: number } {
  const p = pause(t, now);
  return { leftMs: p.leftMs, rightMs: p.rightMs };
}

/** "4:05" under an hour, "1:02:05" past it. */
export function formatTimerClock(ms: number): string {
  const total = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = String(total % 60).padStart(2, "0");
  return h > 0 ? `${h}:${String(m).padStart(2, "0")}:${s}` : `${m}:${s}`;
}

/** "45 s" under a minute, then whole minutes in the sleep page's style. */
export function formatNursingSeconds(sec: number, locale: Locale): string {
  if (sec < 60) return locale === "zh" ? `${Math.max(0, Math.round(sec))} 秒` : `${Math.max(0, Math.round(sec))} s`;
  return formatDuration(sec / 60, locale);
}

/** The side a feed began on: the stored one, or the only side it used. */
export function feedStartSide(log: CareLog): BreastSide | null {
  const n = log.nursing;
  if (!n) return null;
  if (n.startSide) return n.startSide;
  if (n.leftSec > 0 && n.rightSec === 0) return "left";
  if (n.rightSec > 0 && n.leftSec === 0) return "right";
  return null;
}

/** The latest breastfeed by start time, or null. */
export function lastBreastFeed(careLogs: CareLog[]): CareLog | null {
  let best: CareLog | null = null;
  for (const l of careLogs) {
    if (l.kind !== "breast" || !l.nursing) continue;
    if (!best || new Date(l.at).getTime() > new Date(best.at).getTime()) best = l;
  }
  return best;
}

/**
 * The side to offer first at the next feed: the one the last feed did not
 * begin on. Alternating the first side is the usual lactation advice, and
 * it also covers a one-side feed, where the other breast is the fuller one.
 * Null when the last feed used both sides and nobody said which came first.
 */
export function suggestedNextSide(careLogs: CareLog[]): BreastSide | null {
  const last = lastBreastFeed(careLogs);
  const start = last ? feedStartSide(last) : null;
  return start ? otherSide(start) : null;
}

export type NursingTotals = { count: number; leftSec: number; rightSec: number };

/** Count and seconds per side over the given logs (other kinds are skipped). */
export function nursingTotals(logs: CareLog[]): NursingTotals {
  const out: NursingTotals = { count: 0, leftSec: 0, rightSec: 0 };
  for (const l of logs) {
    if (l.kind !== "breast" || !l.nursing) continue;
    out.count += 1;
    out.leftSec += l.nursing.leftSec;
    out.rightSec += l.nursing.rightSec;
  }
  return out;
}

/** Whole minutes for a minutes field: "12" for 725 s. */
export function minutesText(sec: number): string {
  return String(Math.round(sec / 60));
}

/**
 * Read a minutes field back into seconds. A field the parent left as the
 * timer filled it keeps the timer's exact seconds, so a 40-second side does
 * not save as a whole minute. Returns null for text that is not a number.
 */
export function secondsFromMinutesText(text: string, originalSec: number): number | null {
  const trimmed = text.trim();
  if (trimmed === minutesText(originalSec)) return originalSec;
  if (trimmed === "") return 0;
  const v = Number(trimmed);
  if (!Number.isFinite(v) || v < 0) return null;
  return Math.round(v * 60);
}
