import { describe, expect, it } from "vitest";
import type { CheckIn } from "@/lib/storage/types";
import { shouldNudgeBackup, snoozeUntil } from "./backup-nudge";
import {
  dueAtForPreset,
  googleCalendarUrl,
  icsForCheckIns,
  icsForMaintenance,
  onsetForElapsed,
  pendingCheckIns,
} from "./checkins";

const NOW = new Date("2026-08-22T12:00:00.000Z");

describe("check-in preset math (Phase 8A)", () => {
  it.each([
    ["15m", "2026-08-22T12:15:00.000Z"],
    ["1h", "2026-08-22T13:00:00.000Z"],
    ["2h", "2026-08-22T14:00:00.000Z"],
    ["2d", "2026-08-24T12:00:00.000Z"],
    ["1w", "2026-08-29T12:00:00.000Z"],
  ] as const)("%s → %s", (preset, expected) => {
    expect(dueAtForPreset(preset, NOW)).toBe(expected);
  });
});

describe("onset mapping", () => {
  const at = (minsAgo: number) => new Date(NOW.getTime() - minsAgo * 60000);
  it("boundaries map onto the log vocabulary", () => {
    expect(onsetForElapsed(at(5), NOW)).toBe("immediate");
    expect(onsetForElapsed(at(14), NOW)).toBe("immediate");
    expect(onsetForElapsed(at(16), NOW)).toBe("within-2h");
    expect(onsetForElapsed(at(119), NOW)).toBe("within-2h");
    expect(onsetForElapsed(at(121), NOW)).toBe("2-6h");
    expect(onsetForElapsed(at(359), NOW)).toBe("2-6h");
    expect(onsetForElapsed(at(361), NOW)).toBe("next-day");
  });
});

describe("pending split", () => {
  const ci = (id: string, dueAt: string, status: CheckIn["status"] = "pending"): CheckIn => ({
    id,
    babyId: "b1",
    foodSlug: "peanut-butter",
    logId: "l1",
    dueAt,
    status,
  });
  it("splits due vs upcoming, ignores resolved", () => {
    const { due, upcoming } = pendingCheckIns(
      [
        ci("a", "2026-08-22T11:00:00.000Z"),
        ci("b", "2026-08-22T13:00:00.000Z"),
        ci("c", "2026-08-22T10:00:00.000Z", "done"),
      ],
      NOW,
    );
    expect(due.map((c) => c.id)).toEqual(["a"]);
    expect(upcoming.map((c) => c.id)).toEqual(["b"]);
  });
});

describe("calendar delivery", () => {
  it("google calendar URL encodes food, baby, and reaction signs", () => {
    const url = googleCalendarUrl({
      foodName: "Peanut butter & co",
      babyNickname: "Mango",
      dueAt: "2026-08-22T14:00:00.000Z",
      reactionSigns: ["hives", "vomiting; lethargy"],
      appUrl: "https://example.app",
    });
    expect(url).toMatch(/^https:\/\/calendar\.google\.com\/calendar\/render\?/);
    expect(url).toContain("action=TEMPLATE");
    expect(url).toContain(encodeURIComponent("Check Mango for a reaction — Peanut butter & co").replace(/%20/g, "+"));
    expect(url).toContain("dates=20260822T140000Z%2F20260822T141500Z");
  });

  it("check-in .ics is valid-shaped with a VALARM per event", () => {
    const ics = icsForCheckIns({
      foodName: "Egg",
      babyNickname: "Mango",
      dueAts: ["2026-08-22T14:00:00.000Z", "2026-08-24T12:00:00.000Z"],
      reactionSigns: ["hives near the mouth"],
      now: NOW,
    });
    expect(ics.startsWith("BEGIN:VCALENDAR")).toBe(true);
    expect(ics.match(/BEGIN:VEVENT/g)).toHaveLength(2);
    expect(ics.match(/BEGIN:VALARM/g)).toHaveLength(2);
    expect(ics).toContain("DTSTART:20260822T140000Z");
    expect(ics.endsWith("END:VCALENDAR")).toBe(true);
  });

  it("maintenance .ics emits weekly RRULEs only for maintaining allergens", () => {
    const ics = icsForMaintenance(
      [
        { allergenId: "peanut", status: "maintaining", exposureCount: 5 },
        { allergenId: "egg", status: "introducing", exposureCount: 1 },
      ],
      NOW,
    );
    expect(ics.match(/BEGIN:VEVENT/g)).toHaveLength(1);
    expect(ics).toContain("RRULE:FREQ=WEEKLY");
    expect(ics).toContain("Serve peanut this week");
  });
});

describe("backup nudge predicate (Phase 6.0)", () => {
  const daysAgo = (n: number) => new Date(NOW.getTime() - n * 86400000).toISOString();
  it.each([
    [{ logCount: 9 }, false], // below threshold
    [{ logCount: 10 }, true], // never exported
    [{ logCount: 10, lastExportAt: daysAgo(2) }, false], // fresh export
    [{ logCount: 10, lastExportAt: daysAgo(15) }, true], // stale export
    [{ logCount: 10, snoozedUntil: daysAgo(-2) }, false], // active snooze (future)
    [{ logCount: 10, snoozedUntil: daysAgo(1) }, true], // expired snooze
    [{ logCount: 50, lastExportAt: daysAgo(15), snoozedUntil: daysAgo(-1) }, false], // snooze wins
  ])("%o → %s", (input, expected) => {
    expect(shouldNudgeBackup({ ...input, today: NOW })).toBe(expected);
  });

  it("snoozeUntil is 7 days out", () => {
    expect(snoozeUntil(NOW)).toBe("2026-08-29T12:00:00.000Z");
  });
});
