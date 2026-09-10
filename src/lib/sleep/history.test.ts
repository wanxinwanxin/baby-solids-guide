import { describe, expect, it } from "vitest";
import { dailySleep, summarizeHistory } from "./history";
import type { SleepSession } from "./model";

const iso = (y: number, mo: number, d: number, h: number, mi = 0) =>
  new Date(y, mo - 1, d, h, mi, 0, 0).toISOString();

let seq = 0;
const session = (start: string, end: string): SleepSession => ({
  id: `s${++seq}`,
  babyId: "b1",
  start,
  end,
});

describe("dailySleep", () => {
  it("buckets naps into their day with clock positions", () => {
    const sessions = [
      session(iso(2026, 9, 10, 9, 0), iso(2026, 9, 10, 10, 0)), // 60m morning nap
      session(iso(2026, 9, 10, 13, 0), iso(2026, 9, 10, 14, 30)), // 90m afternoon nap
    ];
    const [day] = dailySleep(sessions, new Date(2026, 8, 10, 20, 0));
    expect(day.dateIso).toBe("2026-09-10");
    expect(day.count).toBe(2);
    expect(day.totalMinutes).toBe(150);
    expect(day.blocks).toEqual([
      { startMin: 540, endMin: 600, night: false },
      { startMin: 780, endMin: 870, night: false },
    ]);
  });

  it("splits a night sleep across the two days it touches", () => {
    // 20:00 → 06:00 the next day = 10h night sleep.
    const sessions = [session(iso(2026, 9, 9, 20, 0), iso(2026, 9, 10, 6, 0))];
    const days = dailySleep(sessions, new Date(2026, 8, 10, 12, 0));
    const d9 = days.find((d) => d.dateIso === "2026-09-09")!;
    const d10 = days.find((d) => d.dateIso === "2026-09-10")!;
    expect(d9.blocks).toEqual([{ startMin: 1200, endMin: 1440, night: true }]); // 20:00→24:00
    expect(d10.blocks).toEqual([{ startMin: 0, endMin: 360, night: true }]); // 00:00→06:00
    expect(d9.totalMinutes).toBe(240);
    expect(d10.totalMinutes).toBe(360);
  });

  it("marks long sleeps as night and short ones as naps", () => {
    const sessions = [
      session(iso(2026, 9, 10, 13, 0), iso(2026, 9, 10, 14, 0)), // nap
      session(iso(2026, 9, 10, 19, 0), iso(2026, 9, 10, 23, 30)), // 4.5h → night
    ];
    const [day] = dailySleep(sessions, new Date(2026, 8, 10, 23, 59));
    expect(day.blocks.map((b) => b.night)).toEqual([false, true]);
  });

  it("keeps only days with data, newest first, within the window", () => {
    const sessions = [
      session(iso(2026, 9, 1, 9, 0), iso(2026, 9, 1, 10, 0)),
      session(iso(2026, 9, 10, 9, 0), iso(2026, 9, 10, 10, 0)),
    ];
    // A 14-day window ending the 10th excludes the 1st (9 days earlier is in,
    // but the 1st is 9 days before the 10th → still inside 14). Use 5 days.
    const days = dailySleep(sessions, new Date(2026, 8, 10, 12, 0), 5);
    expect(days.map((d) => d.dateIso)).toEqual(["2026-09-10"]);
  });

  it("ignores open (in-progress) sessions", () => {
    const open: SleepSession = { id: "o", babyId: "b1", start: iso(2026, 9, 10, 13, 0) };
    expect(dailySleep([open], new Date(2026, 8, 10, 14, 0))).toEqual([]);
  });
});

describe("summarizeHistory", () => {
  it("averages totals and counts over days with data", () => {
    const sessions = [
      session(iso(2026, 9, 9, 9, 0), iso(2026, 9, 9, 11, 0)), // 120m, 1 nap
      session(iso(2026, 9, 10, 9, 0), iso(2026, 9, 10, 10, 0)), // 60m
      session(iso(2026, 9, 10, 13, 0), iso(2026, 9, 10, 14, 0)), // 60m
    ];
    const days = dailySleep(sessions, new Date(2026, 8, 10, 20, 0));
    const s = summarizeHistory(days)!;
    expect(s.dayCount).toBe(2);
    expect(s.avgTotalMinutes).toBe(120); // (120 + 120) / 2
    expect(s.avgSleeps).toBe(1.5); // (1 + 2) / 2
  });

  it("returns null with no days", () => {
    expect(summarizeHistory([])).toBeNull();
  });
});
