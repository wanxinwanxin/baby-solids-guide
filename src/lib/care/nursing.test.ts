import { describe, expect, it } from "vitest";
import { careLogSchema } from "@/lib/storage/schema";
import type { CareLog } from "@/lib/storage/types";
import {
  elapsed,
  formatNursingSeconds,
  formatTimerClock,
  lastBreastFeed,
  nursingTotals,
  pause,
  secondsFromMinutesText,
  suggestedNextSide,
  tapSide,
} from "./nursing";

const SEC = 1000;
const MIN = 60 * SEC;

function feed(at: string, leftSec: number, rightSec: number, startSide?: "left" | "right"): CareLog {
  return {
    id: at,
    babyId: "b",
    kind: "breast",
    at,
    nursing: { leftSec, rightSec, ...(startSide ? { startSide } : {}) },
  };
}

describe("the two-side timer", () => {
  it("starts on the side tapped, switches on the other side, and pauses on the same side", () => {
    let t = tapSide(null, "left", 0);
    expect(t).toMatchObject({ startedAt: 0, running: "left", startSide: "left" });

    t = tapSide(t, "right", 5 * MIN);
    expect(t).toMatchObject({ leftMs: 5 * MIN, rightMs: 0, running: "right", since: 5 * MIN });

    t = tapSide(t, "right", 8 * MIN);
    expect(t).toMatchObject({ leftMs: 5 * MIN, rightMs: 3 * MIN, running: null, since: null });

    // Resume on the left after a pause; the start side does not move.
    t = tapSide(t, "left", 10 * MIN);
    expect(elapsed(t, 12 * MIN)).toEqual({ leftMs: 7 * MIN, rightMs: 3 * MIN });
    expect(t.startSide).toBe("left");
  });

  it("counts the running stretch from its start time, so a locked phone loses nothing", () => {
    const t = tapSide(null, "right", 1000);
    expect(elapsed(t, 1000 + 20 * MIN).rightMs).toBe(20 * MIN);
  });

  it("leaves a paused timer unchanged on pause", () => {
    const t = pause(tapSide(null, "left", 0), 2 * MIN);
    expect(pause(t, 9 * MIN)).toEqual(t);
  });
});

describe("formatting", () => {
  it("draws the timer clock with seconds, and hours past an hour", () => {
    expect(formatTimerClock(4 * MIN + 5 * SEC)).toBe("4:05");
    expect(formatTimerClock(62 * MIN + 5 * SEC)).toBe("1:02:05");
  });

  it("says seconds under a minute and minutes after", () => {
    expect(formatNursingSeconds(45, "en")).toBe("45 s");
    expect(formatNursingSeconds(45, "zh")).toBe("45 秒");
    expect(formatNursingSeconds(12 * 60 + 20, "en")).toBe("12 min");
    expect(formatNursingSeconds(75 * 60, "zh")).toBe("1 小时 15 分钟");
  });
});

describe("the next side", () => {
  it("offers the side the last feed did not begin on", () => {
    const logs = [feed("2026-10-21T06:00:00.000Z", 600, 300, "left"), feed("2026-10-21T03:00:00.000Z", 0, 600)];
    expect(suggestedNextSide(logs)).toBe("right");
  });

  it("reads a one-side feed as starting on that side", () => {
    expect(suggestedNextSide([feed("2026-10-21T06:00:00.000Z", 0, 480)])).toBe("left");
  });

  it("makes no guess when both sides ran and the first is unknown", () => {
    expect(suggestedNextSide([feed("2026-10-21T06:00:00.000Z", 300, 300)])).toBeNull();
    expect(suggestedNextSide([])).toBeNull();
  });

  it("picks the latest feed by start time, whatever the list order", () => {
    const logs = [feed("2026-10-21T01:00:00.000Z", 60, 0), feed("2026-10-21T09:00:00.000Z", 0, 60)];
    expect(lastBreastFeed(logs)?.at).toBe("2026-10-21T09:00:00.000Z");
  });
});

describe("totals", () => {
  it("adds each side over breastfeeds only", () => {
    const bottle: CareLog = { id: "x", babyId: "b", kind: "formula", at: "2026-10-21T05:00:00.000Z", amount: { value: 90, unit: "ml" } };
    expect(nursingTotals([feed("2026-10-21T06:00:00.000Z", 600, 300), bottle, feed("2026-10-21T09:00:00.000Z", 0, 420)])).toEqual({
      count: 2,
      leftSec: 600,
      rightSec: 720,
    });
  });
});

describe("minutes fields", () => {
  it("keeps the timer's exact seconds when the field is left as filled", () => {
    expect(secondsFromMinutesText("1", 40)).toBe(40);
    expect(secondsFromMinutesText("0", 20)).toBe(20);
  });

  it("reads an edited field as minutes, and an empty one as zero", () => {
    expect(secondsFromMinutesText("12", 40)).toBe(720);
    expect(secondsFromMinutesText("2.5", 0)).toBe(150);
    expect(secondsFromMinutesText("", 300)).toBe(0);
    expect(secondsFromMinutesText("abc", 0)).toBeNull();
  });
});

describe("careLogSchema", () => {
  it("accepts a breastfeed and a breast-milk bottle", () => {
    expect(careLogSchema.safeParse(feed("2026-10-21T06:00:00.000Z", 600, 0, "left")).success).toBe(true);
    expect(
      careLogSchema.safeParse({
        id: "m",
        babyId: "b",
        kind: "formula",
        at: "2026-10-21T06:00:00.000Z",
        amount: { value: 90, unit: "ml" },
        milk: "breast_milk",
      }).success,
    ).toBe(true);
  });

  it("refuses a feed with no time and a side past four hours", () => {
    expect(careLogSchema.safeParse(feed("2026-10-21T06:00:00.000Z", 0, 0)).success).toBe(false);
    expect(careLogSchema.safeParse(feed("2026-10-21T06:00:00.000Z", 5 * 3600, 0)).success).toBe(false);
  });
});
