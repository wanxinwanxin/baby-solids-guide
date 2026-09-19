import { describe, expect, it } from "vitest";
import type { CareLog, Intervention, SleepSession } from "@/lib/storage/types";
import {
  bandFor,
  bottleOutcome,
  clockOn,
  defaultIntervention,
  fussyAdvice,
  isDaySleepOn,
  morningWake,
  napBands,
  nearestWindow,
  nextFeed,
  nextSleep,
  nightAdvice,
  planEvents,
  predictWakeBy,
  toClock,
  wontSleepAdvice,
} from "./engine";

const MIN = 60 * 1000;

/** A fixed local "now": 2026-09-18 at the given clock time. */
function at(hours: number, minutes = 0, dayOffset = 0): Date {
  const d = new Date(2026, 8, 18, hours, minutes, 0, 0);
  d.setDate(d.getDate() + dayOffset);
  return d;
}
const iso = (d: Date) => d.toISOString();

let seq = 0;
function bottle(when: Date, ml: number, extra: Partial<CareLog> = {}): CareLog {
  return { id: `c${++seq}`, babyId: "b1", kind: "formula", at: iso(when), amount: { value: ml, unit: "ml" }, ...extra };
}
function event(when: Date, event: CareLog["event"]): CareLog {
  return { id: `e${++seq}`, babyId: "b1", kind: "event", at: iso(when), event };
}
function session(start: Date, endMinLater: number | null): SleepSession {
  return {
    id: `s${++seq}`,
    babyId: "b1",
    start: iso(start),
    ...(endMinLater === null ? {} : { end: iso(new Date(start.getTime() + endMinLater * MIN)) }),
  };
}

/** Kai's Stage A plan, as the family would configure it. */
const plan: Intervention = {
  enabled: true,
  goals: ["consolidate-feeds", "cap-day-sleep"],
  startedOn: "2026-09-18",
  step: 1,
  flexMin: 45,
  feedWindows: [
    { at: "06:00", ml: 150, onWake: true },
    { at: "09:30", ml: 150 },
    { at: "13:15", ml: 150 },
    { at: "16:30", ml: 150 },
    { at: "19:00", ml: 180 },
  ],
  naps: [
    { from: "04:00", to: "09:30", capMin: 60 },
    { from: "09:30", to: "13:30", capMin: 90 },
    { from: "13:30", to: "19:00", capMin: 60, hardStopAt: "16:15" },
  ],
  maxDaySleepMin: 210,
  dayStartAt: "05:30",
  bedtimeAt: "20:00",
  nightCutoffAt: "04:00",
  nightFeedMl: 120,
};

describe("clock helpers", () => {
  it("round-trips a clock time on a day", () => {
    const t = clockOn(at(12), "16:15");
    expect(toClock(t)).toBe("16:15");
    expect(new Date(t).getDate()).toBe(18);
  });
});

describe("defaultIntervention", () => {
  it("scales with age and is always enabled", () => {
    const young = defaultIntervention(4, "2026-09-18");
    const mid = defaultIntervention(6.8, "2026-09-18");
    const older = defaultIntervention(10, "2026-09-18");
    expect(young.enabled && mid.enabled && older.enabled).toBe(true);
    expect(young.naps.length).toBeGreaterThan(older.naps.length);
    expect(older.feedWindows[0].ml).toBeGreaterThan(young.feedWindows[0].ml);
    expect(mid.nightCutoffAt).toBe("04:00");
  });
});

describe("bottleOutcome", () => {
  it("splits at thirds", () => {
    expect(bottleOutcome(150, 150)).toBe("took_full");
    expect(bottleOutcome(100, 150)).toBe("took_full");
    expect(bottleOutcome(99, 150)).toBe("partial");
    expect(bottleOutcome(50, 150)).toBe("partial");
    expect(bottleOutcome(49, 150)).toBe("refused");
    expect(bottleOutcome(30, 150)).toBe("refused");
  });
});

describe("nearestWindow", () => {
  it("assigns a bottle to the closest window within two hours", () => {
    expect(nearestWindow(plan.feedWindows, at(12).getTime())).toBe(2); // 13:15 is 75 min away
    expect(nearestWindow(plan.feedWindows, at(9, 40).getTime())).toBe(1);
  });
  it("leaves a night bottle unassigned", () => {
    expect(nearestWindow(plan.feedWindows, at(1).getTime())).toBe(-1);
  });
});

describe("nextFeed", () => {
  it("waits for the first unconsumed window and names the earliest hunger may open it", () => {
    const f = nextFeed(plan, [bottle(at(6, 5), 150)], at(8))!;
    expect(f.index).toBe(1);
    expect(toClock(f.windowAt)).toBe("09:30");
    expect(toClock(f.earliestAt)).toBe("08:45");
    expect(f.state).toBe("waiting");
    expect(f.targetMl).toBe(150);
    expect(f.lastBottle?.outcome).toBe("took_full");
    expect(f.reoffer).toBeNull();
  });

  it("is open inside the flex and late after an hour", () => {
    expect(nextFeed(plan, [bottle(at(6), 150)], at(9))!.state).toBe("open");
    expect(nextFeed(plan, [bottle(at(6), 150)], at(10, 45))!.state).toBe("late");
  });

  it("treats an early bottle as that window taken early, not as an extra", () => {
    // 12:00 bottle is the 13:15 window pulled forward; the next one is 16:30.
    const f = nextFeed(plan, [bottle(at(6), 150), bottle(at(9, 30), 150), bottle(at(12), 140)], at(12, 30))!;
    expect(f.index).toBe(3);
    expect(toClock(f.windowAt)).toBe("16:30");
  });

  it("opens the first bottle on the morning wake when that comes early", () => {
    // Woke 04:50 after the night; the 06:00 window is open now, not at 05:15.
    const f = nextFeed(plan, [], at(4, 52), at(4, 50).getTime())!;
    expect(f.index).toBe(0);
    expect(toClock(f.windowAt)).toBe("04:50");
    expect(f.state).toBe("open");
    // A 04:50 bottle then counts as that first window.
    const g = nextFeed(plan, [bottle(at(4, 55), 70)], at(6, 30), at(4, 50).getTime())!;
    expect(g.index).toBe(1);
    // A 03:30 wake is a night feed, not the morning bottle.
    expect(toClock(nextFeed(plan, [], at(3, 40), at(3, 30).getTime())!.windowAt)).toBe("06:00");
  });

  it("does not let a night bottle consume the morning window", () => {
    const f = nextFeed(plan, [bottle(at(1, 30), 130)], at(5, 50))!;
    expect(f.index).toBe(0);
    expect(f.state).toBe("open"); // inside the 45-min flex
  });

  it("skips a stale window with nothing logged", () => {
    // Nothing at 06:00; by 08:30 the 06:00 window is more than two hours past.
    const f = nextFeed(plan, [], at(8, 30))!;
    expect(f.index).toBe(1);
  });

  it("offers a re-offer and a discard time after a partial bottle", () => {
    const f = nextFeed(plan, [bottle(at(9, 30), 60)], at(9, 40))!;
    expect(f.lastBottle?.outcome).toBe("partial");
    expect(toClock(f.reoffer!.at)).toBe("10:00");
    expect(toClock(f.reoffer!.discardAt)).toBe("10:30");
    expect(nextFeed(plan, [bottle(at(9, 30), 60)], at(10, 35))!.reoffer).toBeNull();
  });

  it("uses the frozen target on the log when present", () => {
    const stamped = bottle(at(9, 30), 90, { plan: { windowAt: iso(at(9, 30)), targetMl: 120 } });
    expect(nextFeed(plan, [stamped], at(9, 45))!.lastBottle?.outcome).toBe("took_full");
  });

  it("converts oz", () => {
    const f = nextFeed(plan, [bottle(at(6), 0, { amount: { value: 5, unit: "oz" } })], at(6, 10))!;
    expect(f.lastBottle?.ml).toBeCloseTo(147.9, 0);
  });

  it("rolls to tomorrow once every window is done", () => {
    const logs = plan.feedWindows.map((w) => bottle(new Date(clockOn(at(12), w.at)), w.ml));
    const f = nextFeed(plan, logs, at(21))!;
    expect(f.state).toBe("done");
    expect(f.index).toBe(-1);
    expect(new Date(f.windowAt).getDate()).toBe(19);
  });

  it("returns null with no windows", () => {
    expect(nextFeed({ ...plan, feedWindows: [] }, [], at(9))).toBeNull();
  });
});

describe("fussyAdvice", () => {
  const withLast = (ml: number, now: Date) => nextFeed(plan, [bottle(at(6), ml)], now)!;
  it("opens the window when it is within 45 minutes", () => {
    expect(fussyAdvice(withLast(150, at(8, 50)), at(8, 50))).toEqual(["open-now"]);
  });
  it("checks other causes between 45 and 90 minutes out", () => {
    expect(fussyAdvice(withLast(150, at(8, 10)), at(8, 10))).toEqual(["check-other-causes", "feed-if-crying"]);
  });
  it("suspects tiredness when far out after a full bottle", () => {
    expect(fussyAdvice(withLast(150, at(7)), at(7))).toEqual(["probably-tired", "feed-if-crying"]);
  });
  it("does not suspect tiredness after a refused bottle", () => {
    expect(fussyAdvice(withLast(30, at(7)), at(7))).toEqual(["check-other-causes", "feed-if-crying"]);
  });
});

describe("bands + wake-by", () => {
  it("normalizes bands and reads a legacy startAt plan at the midpoints", () => {
    const bands = napBands(plan);
    expect(bands.map((b) => b.capMin)).toEqual([60, 90, 60]);
    const legacy = napBands({ ...plan, naps: [{ startAt: "08:00", capMin: 45 }, { startAt: "11:15", capMin: 90 }, { startAt: "15:15", capMin: 60, hardStopAt: "17:00" }] });
    expect(legacy.map((b) => [b.fromMin, b.toMin])).toEqual([[240, 578], [578, 795], [795, 1140]]);
    expect(legacy[2].hardStopAt).toBe("17:00");
  });

  it("picks the cap by when the nap starts, not by count", () => {
    const bands = napBands(plan);
    expect(bandFor(bands, at(5, 30).getTime())?.capMin).toBe(60);
    expect(bandFor(bands, at(12).getTime())?.capMin).toBe(90);
    expect(bandFor(bands, at(15, 40).getTime())?.hardStopAt).toBe("16:15");
    expect(bandFor(bands, at(19, 30).getTime())?.hardStopAt).toBe("16:15"); // past the last band: last band
  });

  it("classifies day sleep by start hour and length (derive helper)", () => {
    expect(isDaySleepOn(session(at(11, 30), 90), at(12))).toBe(true);
    expect(isDaySleepOn(session(at(21), 8 * 60), at(22))).toBe(false);
  });

  it("wakes at the cap, or at the hard stop when that comes first", () => {
    const last = napBands(plan)[2];
    expect(toClock(predictWakeBy(at(15, 15).getTime(), last))).toBe("16:15");
    expect(toClock(predictWakeBy(at(15, 45).getTime(), last))).toBe("16:15");
    expect(toClock(predictWakeBy(at(14, 30).getTime(), last))).toBe("15:30");
  });
});

describe("morningWake", () => {
  const night = session(at(21, 0, -1), 7 * 60 + 50); // → 04:50
  it("finds the night's end and treats an early return to sleep as the night continuing", () => {
    const m1 = morningWake([night], at(5, 0), "05:30");
    expect(toClock(m1.nightEnd!)).toBe("04:50");
    expect(m1.earlyAwake).toBe(true);
    const resleep = session(at(5, 30), 50); // 05:30–06:20
    const m2 = morningWake([night, resleep], at(6, 30), "05:30");
    expect(toClock(m2.nightEnd!)).toBe("06:20");
    expect(m2.earlyAwake).toBe(false);
    const open = session(at(5, 30), null);
    expect(morningWake([night, open], at(5, 45), "05:30").stillNight).toBe(true);
  });
  it("counts him up for good after an hour awake, and a 10:00 sleep as a nap", () => {
    expect(morningWake([night], at(5, 55), "05:30").earlyAwake).toBe(false);
    const late = session(at(10), 60);
    expect(toClock(morningWake([night, late], at(11), "05:30").nightEnd!)).toBe("04:50");
  });
  it("is unknown without a night session", () => {
    expect(morningWake([], at(9), "05:30").nightEnd).toBeNull();
  });
});

describe("nextSleep", () => {
  const night = session(at(21, 0, -1), 7 * 60 + 50); // → 04:50
  const pred = (h: number, m: number) => ({
    kind: "nap" as const,
    lastWake: 0,
    windowStart: at(h, m).getTime(),
    windowEnd: at(h, m + 30).getTime(),
    basis: {} as never,
  });

  it("says it is still night while he is back asleep before his usual wake", () => {
    expect(nextSleep(plan, [night, session(at(5, 30), null)], [], at(5, 45)).kind).toBe("night");
  });

  it("says early morning after an early wake, not 'put him down at 07:45'", () => {
    const s = nextSleep(plan, [night], [], at(5, 0));
    expect(s.kind).toBe("early");
  });

  it("does not count a return-to-sleep as nap 1 — the stroller nap gets the morning cap", () => {
    const resleep = session(at(5, 30), 50);
    const stroller = session(at(9, 20), null);
    const s = nextSleep(plan, [night, resleep, stroller], [], at(9, 40));
    if (s.kind !== "asleep") throw new Error(s.kind);
    expect(toClock(s.wakeBy)).toBe("10:20"); // 60-min morning cap, not the 90 of "nap 2"
  });

  it("times the next nap from the predictor and caps it by band and budget", () => {
    const done = [night, session(at(7, 40), 60), session(at(11, 30), 90)];
    const s = nextSleep(plan, done, [], at(14, 30), pred(15, 25));
    if (s.kind !== "nap") throw new Error(s.kind);
    expect(toClock(s.windowStart)).toBe("15:25");
    expect(toClock(s.wakeBy)).toBe("16:15"); // hard stop beats 60-min cap
    expect(s.hardStop).toBe(true);
    expect(s.budgetLeftMin).toBe(10);
    expect(s.state).toBe("waiting");
  });

  it("shrinks the cap to the day-sleep budget after a long day", () => {
    const done = [night, session(at(7, 40), 90), session(at(11), 100)];
    const s = nextSleep(plan, done, [], at(14, 30), pred(15, 0));
    if (s.kind !== "nap") throw new Error(s.kind);
    expect(s.capMin).toBe(20); // 210 − 190 = 20 left
  });

  it("goes to bedtime once the last nap could not run 20 min before the hard stop", () => {
    const done = [night, session(at(7, 40), 60), session(at(11, 30), 90)];
    const s = nextSleep(plan, done, [], at(16), pred(16, 10));
    if (s.kind !== "bedtime") throw new Error(s.kind);
    expect(s.why).toBe("no-nap-after");
    expect(toClock(s.at)).toBe("19:30"); // pulled 30 min: no last nap
  });

  it("goes to bedtime when the budget is spent", () => {
    const done = [night, session(at(7, 40), 60), session(at(11, 30), 90), session(at(14), 60)];
    const s = nextSleep(plan, done, [], at(15, 30), pred(16, 0));
    if (s.kind !== "bedtime") throw new Error(s.kind);
    expect(s.why).toBe("budget");
    expect(toClock(s.at)).toBe("20:00");
  });

  it("pulls bedtime earlier after a short last nap, and holds it after a full one", () => {
    const short = [night, session(at(7, 40), 60), session(at(11, 30), 90), session(at(15, 15), 20)];
    const s1 = nextSleep(plan, short, [], at(17), pred(17, 30));
    if (s1.kind !== "bedtime") throw new Error(s1.kind);
    expect(s1.reason).toBe("short-last-nap");
    expect(toClock(s1.at)).toBe("19:30");
  });

  it("reads a logged nap_skipped as a missing last nap for bedtime", () => {
    const done = [night, session(at(7, 40), 60), session(at(11, 30), 90)];
    const ev = planEvents([event(at(15, 50), "nap_skipped")]);
    const s = nextSleep(plan, done, ev, at(17), pred(17, 30));
    if (s.kind !== "bedtime") throw new Error(s.kind);
    expect(s.reason).toBe("skipped-last-nap");
    expect(toClock(s.at)).toBe("19:30");
  });

  it("falls back to the next band edge without a predictor", () => {
    const s = nextSleep(plan, [night, session(at(7, 40), 60)], [], at(9));
    if (s.kind !== "nap") throw new Error(s.kind);
    expect(s.fromBand).toBe(true);
    expect(toClock(s.windowStart)).toBe("09:30");
  });

  it("uses the open session's own band while asleep, overdue past wake-by", () => {
    const s = nextSleep(plan, [night, session(at(7, 40), 60), session(at(11, 30), 90), session(at(15, 40), null)], [], at(16, 25));
    if (s.kind !== "asleep") throw new Error(s.kind);
    expect(toClock(s.wakeBy)).toBe("16:15");
    expect(s.overdueMin).toBe(10);
  });

  it("is none with nothing to plan", () => {
    expect(nextSleep({ ...plan, naps: [], bedtimeAt: undefined }, [], [], at(12)).kind).toBe("none");
  });
});

describe("wontSleepAdvice", () => {
  it("keeps the crib calm unless self-settling is the goal", () => {
    expect(wontSleepAdvice(plan)).toBe("twenty-then-up");
    expect(wontSleepAdvice({ ...plan, goals: ["self-settle"] })).toBe("graduated");
  });
});

describe("nightAdvice", () => {
  const weaning: Intervention = { ...plan, goals: ["night-wean"] };
  it("is not in plan without the goal or in the daytime", () => {
    expect(nightAdvice(plan, at(2), 3)).toBe("not-in-plan");
    expect(nightAdvice(weaning, at(14), 3)).toBe("not-in-plan");
  });
  it("walks the steps before the cutoff", () => {
    expect(nightAdvice(weaning, at(2), 3)).toBe("wait-5");
    expect(nightAdvice(weaning, at(2), 6)).toBe("comfort-2");
    expect(nightAdvice(weaning, at(2), 10)).toBe("repeat-once");
    expect(nightAdvice(weaning, at(2), 15)).toBe("feed");
    // Late evening counts as before a morning cutoff.
    expect(nightAdvice(weaning, at(23), 3)).toBe("wait-5");
  });
  it("feeds after the cutoff", () => {
    expect(nightAdvice(weaning, at(4, 30), 1)).toBe("after-cutoff-feed");
    expect(nightAdvice(weaning, at(5, 45), 1)).toBe("after-cutoff-feed");
  });
});
