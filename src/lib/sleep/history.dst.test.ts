import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { dailySleep } from "./history";
import type { SleepSession } from "./model";

// Daylight-saving days only exist in a zone that has them. Node reads TZ
// again each time it changes, so the zone applies to this file only.
const savedTz = process.env.TZ;
beforeAll(() => {
  process.env.TZ = "America/New_York";
});
afterAll(() => {
  process.env.TZ = savedTz;
});

const iso = (y: number, mo: number, d: number, h: number, mi = 0) =>
  new Date(y, mo - 1, d, h, mi, 0, 0).toISOString();

const session = (id: string, start: string, end: string): SleepSession => ({
  id,
  babyId: "b1",
  start,
  end,
});

describe("dailySleep across a daylight-saving change", () => {
  it("splits a night across the 25-hour fall-back day (2026-11-01)", () => {
    // 19:30 EDT on Nov 1 → 06:30 EST on Nov 2. Before the fix, the day walk
    // never left Nov 1 and the page froze on every family device.
    const night = session("n1", iso(2026, 11, 1, 19, 30), iso(2026, 11, 2, 6, 30));
    const days = dailySleep([night], new Date(2026, 10, 2, 8, 0));
    const nov1 = days.find((d) => d.dateIso === "2026-11-01")!;
    const nov2 = days.find((d) => d.dateIso === "2026-11-02")!;
    expect(nov1.totalMinutes).toBe(270); // 19:30 → 24:00
    expect(nov2.totalMinutes).toBe(390); // 00:00 → 06:30
  });

  it("counts a sleep that ends in the last hour of the fall-back day", () => {
    const late = session("n2", iso(2026, 11, 1, 20, 0), iso(2026, 11, 1, 23, 30));
    const [day] = dailySleep([late], new Date(2026, 10, 2, 8, 0));
    expect(day.dateIso).toBe("2026-11-01");
    expect(day.totalMinutes).toBe(210);
  });

  it("does not count the first hour of the next day on the 23-hour spring-forward day", () => {
    // 20:00 EST on Mar 7 → 00:30 EDT on Mar 9, 2027 (Mar 8 is 23 hours).
    const long = session("n3", iso(2027, 3, 8, 20, 0), iso(2027, 3, 9, 0, 30));
    const days = dailySleep([long], new Date(2027, 2, 9, 8, 0));
    expect(days.find((d) => d.dateIso === "2027-03-08")!.totalMinutes).toBe(240);
    expect(days.find((d) => d.dateIso === "2027-03-09")!.totalMinutes).toBe(30);
  });
});
