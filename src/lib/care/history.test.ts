import { describe, expect, it } from "vitest";
import type { CareLog } from "@/lib/storage/types";
import { dailyBottles, summarizeBottles } from "./history";

const at = (y: number, m: number, d: number, h: number, min = 0) =>
  new Date(y, m - 1, d, h, min).toISOString();

function bottle(iso: string, ml: number, over: Partial<CareLog> = {}): CareLog {
  return { id: iso + ml, babyId: "b", kind: "formula", at: iso, amount: { value: ml, unit: "ml" }, ...over };
}

describe("dailyBottles", () => {
  const now = new Date(2026, 9, 1, 12);
  const logs: CareLog[] = [
    bottle(at(2026, 9, 30, 7, 30), 90),
    bottle(at(2026, 9, 30, 13, 42), 20, { notes: "一勺深度水解" }),
    bottle(at(2026, 9, 30, 20, 10), 200),
    { id: "d", babyId: "b", kind: "diaper", at: at(2026, 9, 30, 9), diaper: "wet" },
    bottle(at(2026, 10, 1, 0, 51), 2, { amount: { value: 2, unit: "oz" } }),
  ];

  it("groups bottles by local day, newest first, with minutes from midnight and sizes", () => {
    const days = dailyBottles(logs, now, 14);
    expect(days.map((d) => d.dateIso)).toEqual(["2026-10-01", "2026-09-30"]);
    const sep30 = days[1];
    expect(sep30.count).toBe(3);
    expect(sep30.sips).toBe(1);
    expect(sep30.totalMl).toBe(310);
    expect(sep30.marks.map((m) => m.min)).toEqual([450, 822, 1210]);
    expect(sep30.marks[1].notes).toBe("一勺深度水解");
    // Ounces convert, and a bottle after midnight belongs to the new day.
    expect(days[0].marks[0].min).toBe(51);
    expect(days[0].totalMl).toBe(59);
  });

  it("ignores diapers and days outside the window", () => {
    const old = [bottle(at(2026, 8, 1, 9), 100)];
    expect(dailyBottles(old, now, 14)).toEqual([]);
  });
});

describe("summarizeBottles", () => {
  it("averages complete days only and reports the sip share", () => {
    const now = new Date(2026, 9, 1, 12);
    const days = dailyBottles(
      [
        bottle(at(2026, 9, 29, 8), 100),
        bottle(at(2026, 9, 29, 12), 40),
        bottle(at(2026, 9, 30, 8), 160),
        bottle(at(2026, 9, 30, 12), 40),
        bottle(at(2026, 10, 1, 8), 500),
      ],
      now,
    );
    const s = summarizeBottles(days, "2026-10-01")!;
    expect(s.dayCount).toBe(2);
    expect(s.avgMl).toBe(170);
    expect(s.avgCount).toBe(2);
    expect(s.sipShare).toBe(0.5);
    expect(summarizeBottles(days.filter((d) => d.dateIso === "2026-10-01"), "2026-10-01")).toBeNull();
  });
});
