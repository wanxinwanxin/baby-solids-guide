import { describe, expect, it } from "vitest";
import {
  clockNow,
  dayLabel,
  firstTryLogIds,
  formatClock,
  formatQuantity,
  groupByDay,
  sortDayLogs,
} from "./journal";
import { targetSize } from "./media/photos";
import type { ExposureLog } from "./storage/types";

const log = (over: Partial<ExposureLog> & { id: string }): ExposureLog => ({
  babyId: "b1",
  foodSlug: "carrot",
  date: "2026-08-20",
  prepBandUsed: "6-8m",
  amountEaten: "some",
  enjoyment: "neutral",
  gagging: false,
  symptoms: [],
  ...over,
});

describe("sortDayLogs", () => {
  it("reads a day forward in time", () => {
    const out = sortDayLogs([
      log({ id: "dinner", time: "18:30" }),
      log({ id: "breakfast", time: "07:15" }),
      log({ id: "lunch", time: "12:00" }),
    ]);
    expect(out.map((l) => l.id)).toEqual(["breakfast", "lunch", "dinner"]);
  });

  it("puts untimed entries last rather than treating them as midnight", () => {
    const out = sortDayLogs([
      log({ id: "untimed" }),
      log({ id: "early", time: "06:00" }),
      log({ id: "late", time: "21:00" }),
    ]);
    expect(out.map((l) => l.id)).toEqual(["early", "late", "untimed"]);
  });

  it("is stable for entries sharing a time", () => {
    const out = sortDayLogs([
      log({ id: "bbb", time: "08:00" }),
      log({ id: "aaa", time: "08:00" }),
    ]);
    expect(out.map((l) => l.id)).toEqual(["aaa", "bbb"]);
  });
});

describe("firstTryLogIds", () => {
  it("marks the earliest date a food was actually eaten", () => {
    const ids = firstTryLogIds([
      log({ id: "second", date: "2026-08-21" }),
      log({ id: "first", date: "2026-08-19" }),
    ]);
    expect([...ids]).toEqual(["first"]);
  });

  it("ignores an offered-but-not-eaten entry", () => {
    // A refused first offer isn't a first try — the food went in the next day.
    const ids = firstTryLogIds([
      log({ id: "refused", date: "2026-08-19", amountEaten: "none" }),
      log({ id: "eaten", date: "2026-08-20" }),
    ]);
    expect([...ids]).toEqual(["eaten"]);
  });

  it("badges only the earlier of two entries on the same day", () => {
    const ids = firstTryLogIds([
      log({ id: "evening", date: "2026-08-20", time: "18:00" }),
      log({ id: "morning", date: "2026-08-20", time: "08:00" }),
    ]);
    expect([...ids]).toEqual(["morning"]);
  });

  it("tracks each food independently", () => {
    const ids = firstTryLogIds([
      log({ id: "carrot", foodSlug: "carrot", date: "2026-08-19" }),
      log({ id: "pear", foodSlug: "pear", date: "2026-08-21" }),
      log({ id: "carrot-again", foodSlug: "carrot", date: "2026-08-22" }),
    ]);
    expect([...ids].sort()).toEqual(["carrot", "pear"]);
  });
});

describe("groupByDay", () => {
  it("returns newest day first with each day ordered forward", () => {
    const logs = [
      log({ id: "a", date: "2026-08-19", time: "09:00" }),
      log({ id: "c", date: "2026-08-21", time: "19:00" }),
      log({ id: "b", date: "2026-08-21", time: "08:00" }),
    ];
    const days = groupByDay(logs, firstTryLogIds(logs));
    expect(days.map((d) => d.date)).toEqual(["2026-08-21", "2026-08-19"]);
    expect(days[0].logs.map((l) => l.id)).toEqual(["b", "c"]);
  });

  it("keeps first-try marks tied to the ids passed in, not the visible subset", () => {
    const all = [
      log({ id: "first", foodSlug: "pear", date: "2026-08-19" }),
      log({ id: "later", foodSlug: "pear", date: "2026-08-25" }),
    ];
    const ids = firstTryLogIds(all);
    // Render only the later day (as a filter would): it must not be promoted
    // to "first try" just because the original entry is out of view.
    const days = groupByDay([all[1]], ids);
    expect(days[0].firstTries).toEqual([]);
  });
});

describe("dayLabel", () => {
  it("names the two days parents think of by name", () => {
    expect(dayLabel("2026-08-25", "2026-08-25", "en")).toBe("Today");
    expect(dayLabel("2026-08-24", "2026-08-25", "en")).toBe("Yesterday");
    expect(dayLabel("2026-08-25", "2026-08-25", "zh")).toBe("今天");
  });

  it("spells older days out", () => {
    expect(dayLabel("2026-08-20", "2026-08-25", "en")).toBe("Thu, 20 Aug");
    expect(dayLabel("2026-08-20", "2026-08-25", "zh")).toBe("8月20日 周四");
  });

  it("crosses a month boundary", () => {
    expect(dayLabel("2026-07-31", "2026-08-01", "en")).toBe("Yesterday");
  });
});

describe("formatClock", () => {
  it("uses a 12-hour clock in English and 24-hour in Chinese", () => {
    expect(formatClock("19:00", "en")).toBe("7:00 PM");
    expect(formatClock("19:00", "zh")).toBe("19:00");
    expect(formatClock("07:05", "en")).toBe("7:05 AM");
  });

  it("renders both ends of the day without a zero hour", () => {
    expect(formatClock("00:30", "en")).toBe("12:30 AM");
    expect(formatClock("12:00", "en")).toBe("12:00 PM");
  });

  it("passes unparseable input through instead of throwing", () => {
    expect(formatClock("nonsense", "en")).toBe("nonsense");
  });
});

describe("formatQuantity", () => {
  it("keeps whole numbers whole", () => {
    expect(formatQuantity({ value: 20, unit: "ml" })).toBe("20 ml");
  });

  it("trims trailing zeros so 20.0 doesn't read as a measurement", () => {
    expect(formatQuantity({ value: 20.0, unit: "ml" })).toBe("20 ml");
    expect(formatQuantity({ value: 2.5, unit: "tbsp" })).toBe("2.5 tbsp");
  });

  it("accepts a localized unit label", () => {
    expect(formatQuantity({ value: 20, unit: "ml" }, "毫升")).toBe("20 毫升");
  });
});

describe("clockNow", () => {
  it("zero-pads to HH:MM", () => {
    expect(clockNow(new Date(2026, 7, 25, 7, 5))).toBe("07:05");
    expect(clockNow(new Date(2026, 7, 25, 19, 30))).toBe("19:30");
  });
});

describe("targetSize", () => {
  it("scales the longest edge down and keeps the aspect ratio", () => {
    expect(targetSize(4000, 3000, 1280)).toEqual({ width: 1280, height: 960 });
    expect(targetSize(3000, 4000, 1280)).toEqual({ width: 960, height: 1280 });
  });

  it("never upscales a photo that is already small", () => {
    expect(targetSize(800, 600, 1280)).toEqual({ width: 800, height: 600 });
  });

  it("tolerates a degenerate size", () => {
    expect(targetSize(0, 0, 1280)).toEqual({ width: 0, height: 0 });
  });
});
