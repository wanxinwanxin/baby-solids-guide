import { describe, expect, it } from "vitest";
import { babySparksActivities, filterBabySparks } from "./babysparks";
import { ACTIVITY_IDS } from "@/lib/storage/types";

describe("BabySparks catalog", () => {
  it("retains all 193 source IDs, age groups, and log identities", () => {
    expect(babySparksActivities.map((entry) => entry.catalogId)).toEqual(
      Array.from({ length: 193 }, (_, i) => i + 1),
    );
    expect(new Set(babySparksActivities.map((entry) => entry.slug)).size).toBe(193);
    expect(filterBabySparks(null, "4-6", "")).toHaveLength(93);
    expect(filterBabySparks(null, "7-9", "")).toHaveLength(100);
    for (const entry of babySparksActivities) {
      expect(entry.ageBand).toBe(entry.catalogId <= 93 ? "4-6" : "7-9");
      expect(ACTIVITY_IDS).toContain(entry.activity);
    }
  });

  it("combines area and age filters with either language's search", () => {
    const result = filterBabySparks("routines", "4-6", "期待吃饭");
    expect(result.map((entry) => entry.catalogId)).toEqual([1]);
    expect(filterBabySparks("routines", "4-6", "  ANTICIPATING EVENTS ")).toEqual(result);
    expect(filterBabySparks("moving", "4-6", "期待吃饭")).toEqual([]);
    expect(filterBabySparks(null, "7-9", "期待吃饭")).toEqual([]);
    expect(filterBabySparks(null, null, "xyz-no-match")).toEqual([]);
  });

  it("keeps added reminders distinct and omits untranscribed milestones", () => {
    expect(babySparksActivities.filter((entry) => entry.reminder)).toHaveLength(36);
    const balloon = babySparksActivities.find((entry) => entry.catalogId === 3)!;
    expect(balloon.title.en).toBe("Balloon");
    expect(balloon.reminder?.zh).toContain("窒息风险");
    expect(balloon.reminderBasis).toBe("AAP：Choking Prevention");
    expect(balloon.instructions.en).not.toContain(balloon.reminder!.en);
    expect(balloon.milestone).toBeUndefined();
  });
});
