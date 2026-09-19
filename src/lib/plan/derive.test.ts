import { describe, expect, it } from "vitest";
import type { CareLog, SleepSession } from "@/lib/storage/types";
import { deriveIntervention, observe } from "./derive";

const MIN = 60 * 1000;
/** Local "now": 2026-09-18 09:00. */
const NOW = new Date(2026, 8, 18, 9, 0, 0, 0);
const on = (dayOffset: number, h: number, m = 0) => {
  const d = new Date(2026, 8, 18, h, m, 0, 0);
  d.setDate(d.getDate() + dayOffset);
  return d;
};
let seq = 0;
const bottle = (d: Date, ml: number): CareLog => ({
  id: `c${++seq}`, babyId: "b1", kind: "formula", at: d.toISOString(), amount: { value: ml, unit: "ml" },
});
const sleep = (d: Date, min: number): SleepSession => ({
  id: `s${++seq}`, babyId: "b1", start: d.toISOString(), end: new Date(d.getTime() + min * MIN).toISOString(),
});

/**
 * Nine days shaped like Kai's real week: ~10 bottles/day scattered, the
 * big ones in the evening and at night; three naps with the last running
 * to ~18:15; asleep ~21:05; one night bottle around 02:00.
 */
function kaiWeek() {
  const care: CareLog[] = [];
  const sessions: SleepSession[] = [];
  for (let d = -9; d <= -1; d++) {
    const b = [[5, 45, 110], [8, 20, 40], [10, 40, 100], [11, 30, 35], [13, 30, 95], [15, 30, 70], [16, 30, 40], [19, 10, 105], [20, 55, 170], [2, 0, 125]];
    for (const [h, m, ml] of b) care.push(bottle(on(d, h, m), ml));
    sessions.push(sleep(on(d, 7, 50), 55), sleep(on(d, 11, 35), 120), sleep(on(d, 16, 20), 115));
    sessions.push(sleep(on(d, 21, 5), 8 * 60 + 25)); // → 05:30 next day
  }
  return { care, sessions };
}

describe("observe", () => {
  it("reads Kai's week back correctly", () => {
    const { care, sessions } = kaiWeek();
    const o = observe(sessions, care, NOW);
    expect(o.bottleDays).toBe(9);
    expect(o.bottlesPerDay).toBe(10);
    expect(o.dailyMl).toBe(890);
    expect(o.napsPerDay).toBe(3);
    expect(o.naps.map((n) => Math.round(n.startMin / 60))).toEqual([8, 12, 16]);
    expect(o.lastNapEndMin).toBe(18 * 60 + 15);
    expect(o.bedtimeMin).toBe(21 * 60 + 5);
    expect(o.wakeMin).toBe(5 * 60 + 30);
    expect(o.nightFeedsPerNight).toBe(1);
    expect(o.nightFeedMl).toBe(125);
  });

  it("is all-null on an empty log", () => {
    const o = observe([], [], NOW);
    expect(o.bottleDays).toBe(0);
    expect(o.bottlesPerDay).toBeNull();
    expect(o.bedtimeMin).toBeNull();
    expect(o.naps).toEqual([]);
  });
});

describe("deriveIntervention", () => {
  const { care, sessions } = kaiWeek();
  const base = { ageMonths: 6.8, sessions, careLogs: care, now: NOW };

  it("goals gate what the plan contains", () => {
    const feedsOnly = deriveIntervention({ ...base, goals: ["consolidate-feeds"] }).plan;
    expect(feedsOnly.feedWindows.length).toBe(5);
    expect(feedsOnly.naps).toEqual([]);
    expect(feedsOnly.bedtimeAt).toBeUndefined();
    expect(feedsOnly.nightCutoffAt).toBeUndefined();

    const napsOnly = deriveIntervention({ ...base, goals: ["cap-day-sleep"] }).plan;
    expect(napsOnly.feedWindows).toEqual([]);
    expect(napsOnly.naps.length).toBe(3);
    expect(napsOnly.bedtimeAt).toBe("20:00");
  });

  it("reproduces the hand-built Stage A plan from the logs", () => {
    const { plan, usedDefaults } = deriveIntervention({ ...base, goals: ["consolidate-feeds", "cap-day-sleep"] });
    expect(usedDefaults).toEqual([]);
    // Five bottles from his 05:30 wake to an hour before the 20:00 bedtime.
    expect(plan.feedWindows.map((w) => w.at)).toEqual(["05:30", "09:00", "12:15", "15:45", "19:00"]);
    // Sized from his own ~890 ml/day, last one biggest.
    expect(plan.feedWindows[4].ml).toBeGreaterThan(plan.feedWindows[0].ml);
    const total = plan.feedWindows.reduce((s, w) => s + w.ml, 0);
    expect(total).toBeGreaterThanOrEqual(850);
    expect(total).toBeLessThanOrEqual(930);
    // Three cap bands split at the midpoints of his usual nap starts,
    // lengths capped by age, the last with a hard stop one hour earlier
    // than the last nap ends today.
    expect(plan.naps.map((n) => n.capMin)).toEqual([60, 90, 60]);
    expect(plan.naps.map((n) => [n.from, n.to])).toEqual([["04:00", "09:45"], ["09:45", "14:00"], ["14:00", "19:00"]]);
    expect(plan.naps[2].hardStopAt).toBe("17:15");
    expect(plan.maxDaySleepMin).toBe(210);
    expect(plan.dayStartAt).toBe("05:30");
    expect(plan.feedWindows[0].onWake).toBe(true);
    expect(plan.bedtimeAt).toBe("20:00");
  });

  it("walks the last-nap hard stop 60 min per step down to the target", () => {
    const at = (step: number) =>
      deriveIntervention({ ...base, goals: ["cap-day-sleep"], step }).plan.naps[2];
    expect(at(1).hardStopAt).toBe("17:15");
    expect(at(2).hardStopAt).toBe("16:15");
    expect(at(3).hardStopAt).toBe("16:15"); // 20:00 − 3h45 floor
  });

  it("shifts bedtime 30 min per step toward the age floor", () => {
    expect(deriveIntervention({ ...base, goals: ["shift-bedtime"], step: 1 }).plan.bedtimeAt).toBe("20:30");
    expect(deriveIntervention({ ...base, goals: ["shift-bedtime"], step: 2 }).plan.bedtimeAt).toBe("20:00");
    expect(deriveIntervention({ ...base, goals: ["shift-bedtime"], step: 5 }).plan.bedtimeAt).toBe("20:00");
  });

  it("tapers the night bottle from his own size, 20 ml per step, floor 40", () => {
    const ml = (step: number) => deriveIntervention({ ...base, goals: ["night-wean"], step }).plan.nightFeedMl;
    expect(ml(1)).toBe(125);
    expect(ml(2)).toBe(105);
    expect(ml(10)).toBe(40);
    expect(deriveIntervention({ ...base, goals: ["night-wean"] }).plan.nightCutoffAt).toBe("04:00");
  });

  it("falls back to the age template and says so when there is too little data", () => {
    const { plan, usedDefaults } = deriveIntervention({
      goals: ["consolidate-feeds", "cap-day-sleep", "night-wean"],
      ageMonths: 6.8,
      sessions: [],
      careLogs: [],
      now: NOW,
    });
    expect(usedDefaults).toEqual(["bottles", "naps", "night"]);
    expect(plan.feedWindows.length).toBe(5);
    expect(plan.naps.length).toBe(3);
    expect(plan.nightFeedMl).toBe(120);
  });
});
