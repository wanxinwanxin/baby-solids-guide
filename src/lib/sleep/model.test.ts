import { describe, expect, it } from "vitest";
import {
  completedSessions,
  estimateBedtime,
  formatDuration,
  isNightSession,
  median,
  observedWakeWindows,
  openSession,
  predictNextSleep,
  wakeWindowPrior,
  type SleepSession,
} from "./model";

const MIN = 60 * 1000;

/** A fixed local "now": today at the given clock time. */
function at(hours: number, minutes = 0, dayOffset = 0): Date {
  const d = new Date(2026, 8, 6, hours, minutes, 0, 0); // local time
  d.setDate(d.getDate() + dayOffset);
  return d;
}
const iso = (d: Date) => d.toISOString();

let seq = 0;
function session(start: Date, endMinLater: number | null, babyId = "b1"): SleepSession {
  return {
    id: `s${++seq}`,
    babyId,
    start: iso(start),
    ...(endMinLater === null ? {} : { end: iso(new Date(start.getTime() + endMinLater * MIN)) }),
  };
}

describe("wakeWindowPrior", () => {
  it("interpolates between anchors and grows with age", () => {
    const p6 = wakeWindowPrior(6);
    expect(p6.min).toBe(120);
    expect(p6.max).toBe(165);
    const p525 = wakeWindowPrior(5.25);
    expect(p525.min).toBeGreaterThan(90);
    expect(p525.min).toBeLessThan(120);
    expect(wakeWindowPrior(9).mid).toBeGreaterThan(p6.mid);
  });

  it("clamps outside the anchor range", () => {
    expect(wakeWindowPrior(0)).toEqual(wakeWindowPrior(0.5));
    expect(wakeWindowPrior(36)).toEqual(wakeWindowPrior(24));
  });
});

describe("session helpers", () => {
  it("keeps only sane completed sessions, oldest first", () => {
    const good = session(at(9), 60);
    const open = session(at(13), null);
    const inverted: SleepSession = { id: "x", babyId: "b1", start: iso(at(15)), end: iso(at(14)) };
    const done = completedSessions([open, good, inverted]);
    expect(done.map((s) => s.id)).toEqual([good.id]);
    expect(openSession([open, good])?.id).toBe(open.id);
  });

  it("classifies night sleep by duration", () => {
    expect(isNightSession(session(at(19, 30), 11 * 60) as SleepSession & { end: string })).toBe(true);
    expect(isNightSession(session(at(13), 80) as SleepSession & { end: string })).toBe(false);
  });

  it("computes median", () => {
    expect(median([])).toBeNull();
    expect(median([3, 1, 2])).toBe(2);
    expect(median([1, 2, 3, 4])).toBe(2.5);
  });
});

describe("observedWakeWindows", () => {
  it("measures awake gaps and drops implausible ones", () => {
    const sessions = [
      session(at(8), 60), // wake 9:00
      session(at(11, 30), 60), // gap 150 min
      session(at(13, 40), 5), // gap 70 min; 5-min catnap still ends a gap
      session(at(13, 50, 1), 60, "b1"), // next day: 24h gap → dropped
    ];
    const gaps = observedWakeWindows(sessions, at(20, 0, 1));
    expect(gaps).toEqual([150, 70]);
  });
});

describe("predictNextSleep", () => {
  it("returns null with no wake evidence", () => {
    expect(predictNextSleep({ sessions: [], ageMonths: 6, now: at(10) })).toBeNull();
  });

  it("cold start: predicts from the age prior and a wake anchor", () => {
    const now = at(9);
    const p = predictNextSleep({
      sessions: [],
      ageMonths: 6,
      now,
      wakeAnchor: iso(at(8)),
    });
    expect(p).not.toBeNull();
    expect(p!.basis.personalized).toBe(false);
    expect(p!.basis.observedCount).toBe(0);
    // 6-month prior mid = 142.5 min after the 8:00 wake.
    const mid = (p!.windowStart + p!.windowEnd) / 2;
    const expected = at(8).getTime() + 142.5 * (0.88 + 1.08) / 2 * MIN;
    expect(Math.abs(mid - expected)).toBeLessThan(MIN);
    expect(p!.kind).toBe("nap");
  });

  it("personalization pulls the window toward the child's median", () => {
    // Six consistent 180-min wake windows for a 6-month-old (prior mid 142.5).
    const sessions: SleepSession[] = [];
    for (let day = -6; day <= -1; day++) {
      sessions.push(session(at(8, 0, day), 60));
      sessions.push(session(at(12, 0, day), 60)); // gap = 180 min
    }
    const p = predictNextSleep({
      sessions,
      ageMonths: 6,
      now: at(9),
      wakeAnchor: iso(at(8, 30)),
    })!;
    expect(p.basis.personalMedian).toBe(180);
    expect(p.basis.personalized).toBe(true);
    expect(p.basis.effectiveWindow).toBeGreaterThan(155);
    expect(p.basis.effectiveWindow).toBeLessThan(180);
  });

  it("guardrail: outlier logs never leave the age-safe envelope", () => {
    // Implausible 6.5-hour "wake windows" for a 4.5-month-old.
    const sessions: SleepSession[] = [];
    for (let day = -8; day <= -1; day++) {
      sessions.push(session(at(7, 0, day), 30));
      sessions.push(session(at(14, 0, day), 30)); // gap = 390 min, kept (< 7 h)
    }
    const p = predictNextSleep({
      sessions,
      ageMonths: 4.5,
      now: at(8),
      wakeAnchor: iso(at(7, 30)),
    })!;
    const prior = wakeWindowPrior(4.5);
    expect(p.basis.effectiveWindow).toBeLessThanOrEqual(prior.max * 1.25);
  });

  it("a short last nap brings the window earlier", () => {
    const base: SleepSession[] = [session(at(8), 90)]; // long nap, wake 9:30
    const short: SleepSession[] = [session(at(9), 30)]; // 30-min nap, wake 9:30
    const long = predictNextSleep({ sessions: base, ageMonths: 7, now: at(10) })!;
    const clipped = predictNextSleep({ sessions: short, ageMonths: 7, now: at(10) })!;
    expect(long.basis.lastNapAdjust).toBeNull();
    expect(clipped.basis.lastNapAdjust).toBe("shorter");
    expect(clipped.windowStart).toBeLessThan(long.windowStart);
    expect(clipped.basis.lastNapMinutes).toBe(30);
  });

  it("newborns get a wide window and the newborn flag", () => {
    const p = predictNextSleep({
      sessions: [],
      ageMonths: 1,
      now: at(10),
      wakeAnchor: iso(at(9, 30)),
    })!;
    expect(p.basis.newborn).toBe(true);
    const widthMin = (p.windowEnd - p.windowStart) / MIN;
    expect(widthMin).toBeGreaterThan(p.basis.effectiveWindow * 0.4);
    expect(p.kind).toBe("nap"); // the bedtime label waits for a working clock
  });

  it("a window that opens in the bedtime zone is labeled bedtime", () => {
    const p = predictNextSleep({
      sessions: [],
      ageMonths: 8,
      now: at(17),
      wakeAnchor: iso(at(16, 30)),
    })!;
    // 8-month window (~3 h) from 16:30 opens ≈19:10, inside bedtime − 60 min.
    expect(p.kind).toBe("bedtime");
  });
});

describe("estimateBedtime", () => {
  it("uses the age default with no night logs", () => {
    const b = estimateBedtime([], 8, at(12));
    expect(b.personalized).toBe(false);
    const d = new Date(b.at);
    expect(d.getHours() * 60 + d.getMinutes()).toBe(19.5 * 60);
  });

  it("moves toward the logged bedtimes", () => {
    const sessions: SleepSession[] = [];
    for (let day = -5; day <= -1; day++) {
      sessions.push(session(at(20, 30, day), 10 * 60)); // bedtime 20:30 nights
    }
    const b = estimateBedtime(sessions, 8, at(12));
    expect(b.personalized).toBe(true);
    const d = new Date(b.at);
    const clock = d.getHours() * 60 + d.getMinutes();
    expect(clock).toBeGreaterThan(19.5 * 60);
    expect(clock).toBeLessThanOrEqual(20.5 * 60);
  });

  it("ignores middle-of-the-night resettles", () => {
    const resettle = [session(at(2, 0, -1), 5 * 60)]; // 2 a.m., 5 h
    const b = estimateBedtime(resettle, 8, at(12));
    expect(b.personalized).toBe(false);
  });
});

describe("formatDuration", () => {
  it("formats both locales", () => {
    expect(formatDuration(45, "en")).toBe("45 min");
    expect(formatDuration(85, "en")).toBe("1 h 25 min");
    expect(formatDuration(120, "en")).toBe("2 h");
    expect(formatDuration(85, "zh")).toBe("1 小时 25 分钟");
    expect(formatDuration(30, "zh")).toBe("30 分钟");
  });
});
