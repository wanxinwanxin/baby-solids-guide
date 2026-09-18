import { describe, expect, it } from "vitest";
import type { CareLog, Intervention, SleepSession } from "@/lib/storage/types";
import {
  bottleOutcome,
  clockOn,
  defaultIntervention,
  fussyAdvice,
  isDaySleepOn,
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
    { at: "06:00", ml: 150 },
    { at: "09:30", ml: 150 },
    { at: "13:15", ml: 150 },
    { at: "16:30", ml: 150 },
    { at: "19:00", ml: 180 },
  ],
  naps: [
    { startAt: "07:15", capMin: 60 },
    { startAt: "11:30", capMin: 90 },
    { startAt: "15:15", capMin: 60, hardStopAt: "16:15" },
  ],
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

describe("day sleep + wake-by", () => {
  it("classifies day sleep by start hour and length", () => {
    expect(isDaySleepOn(session(at(11, 30), 90), at(12))).toBe(true);
    expect(isDaySleepOn(session(at(11, 30), null), at(12))).toBe(true);
    expect(isDaySleepOn(session(at(21), 8 * 60), at(22))).toBe(false);
    expect(isDaySleepOn(session(at(11, 30, -1), 90), at(12))).toBe(false);
  });

  it("wakes at the cap, or at the hard stop when that comes first", () => {
    const nap3 = plan.naps[2];
    expect(toClock(predictWakeBy(at(15, 15).getTime(), nap3))).toBe("16:15");
    expect(toClock(predictWakeBy(at(15, 45).getTime(), nap3))).toBe("16:15"); // hard stop wins over 16:45
    expect(toClock(predictWakeBy(at(14, 30).getTime(), nap3))).toBe("15:30"); // cap wins
    expect(toClock(predictWakeBy(at(11, 30).getTime(), plan.naps[1]))).toBe("13:00");
  });
});

describe("nextSleep", () => {
  it("names the wake-by while a nap is running, with hard-stop flagged", () => {
    const s = nextSleep(plan, [session(at(7, 20), 55), session(at(11, 30), 90), session(at(15, 40), null)], [], at(16));
    expect(s.kind).toBe("asleep");
    if (s.kind !== "asleep") return;
    expect(s.napIndex).toBe(2);
    expect(toClock(s.wakeBy)).toBe("16:15");
    expect(s.hardStop).toBe(true);
    expect(s.overdueMin).toBeLessThan(0);
  });

  it("goes overdue past wake-by", () => {
    const s = nextSleep(plan, [session(at(7, 20), 55), session(at(11, 30), 90), session(at(15, 40), null)], [], at(16, 25));
    if (s.kind !== "asleep") throw new Error(s.kind);
    expect(s.overdueMin).toBe(10);
  });

  it("plans the next nap with a delta against the predictor", () => {
    const prediction = {
      kind: "nap" as const,
      lastWake: at(14).getTime(),
      windowStart: at(16, 10).getTime(),
      windowEnd: at(16, 40).getTime(),
      basis: {} as never,
    };
    const s = nextSleep(plan, [session(at(7, 20), 55), session(at(11, 30), 150)], [], at(14, 30), prediction);
    if (s.kind !== "nap") throw new Error(s.kind);
    expect(s.napIndex).toBe(2);
    expect(toClock(s.startAt)).toBe("15:15");
    expect(toClock(s.wakeBy)).toBe("16:15");
    expect(s.deltaMin).toBe(-55);
    expect(s.state).toBe("waiting");
  });

  it("opens 15 minutes before the planned start and runs late after 45", () => {
    const done = [session(at(7, 20), 55), session(at(11, 30), 90)];
    expect((nextSleep(plan, done, [], at(15, 5)) as { state: string }).state).toBe("open");
    expect((nextSleep(plan, done, [], at(15, 50)) as { state: string }).state).toBe("open");
    expect((nextSleep(plan, done, [], at(15, 56)) as { state: string }).state).toBe("skip"); // <20 min to 16:15
  });

  it("says skip when the hard stop is too close to be worth it", () => {
    const done = [session(at(7, 20), 55), session(at(11, 30), 90)];
    const s = nextSleep(plan, done, [], at(16));
    expect(s.kind).toBe("nap");
    expect((s as { state: string }).state).toBe("skip");
  });

  it("counts a skipped nap as taken and moves to bedtime, 30 min earlier", () => {
    const done = [session(at(7, 20), 55), session(at(11, 30), 90)];
    const ev = planEvents([event(at(16), "nap_skipped")]);
    const s = nextSleep(plan, done, ev, at(17));
    if (s.kind !== "bedtime") throw new Error(s.kind);
    expect(toClock(s.at)).toBe("19:30");
    expect(s.reason).toBe("skipped-last-nap");
    expect(s.adjustedMin).toBe(30);
  });

  it("pulls bedtime earlier after a short last nap, and holds it after a full one", () => {
    const short = [session(at(7, 20), 55), session(at(11, 30), 90), session(at(15, 15), 20)];
    const s1 = nextSleep(plan, short, [], at(17));
    if (s1.kind !== "bedtime") throw new Error(s1.kind);
    expect(s1.reason).toBe("short-last-nap");
    expect(toClock(s1.at)).toBe("19:30");

    const full = [session(at(7, 20), 55), session(at(11, 30), 90), session(at(15, 15), 60)];
    const s2 = nextSleep(plan, full, [], at(17));
    if (s2.kind !== "bedtime") throw new Error(s2.kind);
    expect(s2.reason).toBeNull();
    expect(toClock(s2.at)).toBe("20:00");
  });

  it("ignores yesterday's naps and the night sleep", () => {
    const s = nextSleep(plan, [session(at(15, 15, -1), 60), session(at(21, 0, -1), 8 * 60)], [], at(6, 30));
    if (s.kind !== "nap") throw new Error(s.kind);
    expect(s.napIndex).toBe(0);
    expect(toClock(s.startAt)).toBe("07:15");
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
