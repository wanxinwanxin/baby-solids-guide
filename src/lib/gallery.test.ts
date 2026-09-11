import { describe, expect, it } from "vitest";
import type { Food } from "@/content-schema/food";
import { achievementProgress, ACHIEVEMENT_TIERS, foodGallery, UNLOCK_EXPOSURES } from "./gallery";
import type { AmountEaten, ExposureLog, SymptomId } from "./storage/types";

function makeFood(slug: string, category: Food["category"] = "fruit"): Food {
  return {
    slug,
    name: slug,
    aliases: [],
    category,
    minAgeMonths: 6,
    ironRich: false,
    commonAllergen: null,
    chokingRisk: "low",
    nutritionHighlights: ["x"],
    prepSpecs: [],
    tips: [],
    sources: [],
    emoji: "🍎",
  } as unknown as Food;
}

let seq = 0;
function makeLog(
  foodSlug: string,
  date: string,
  amountEaten: AmountEaten = "some",
  symptoms: SymptomId[] = [],
): ExposureLog {
  return {
    id: `log-${seq++}`,
    babyId: "b1",
    foodSlug,
    date,
    prepBandUsed: "6-8m",
    amountEaten,
    enjoyment: "neutral",
    gagging: false,
    symptoms,
  };
}

describe("foodGallery", () => {
  const foods = [makeFood("apple"), makeFood("banana"), makeFood("egg", "protein")];

  it("handles empty logs: everything not-tried", () => {
    const g = foodGallery([], foods);
    expect(g.totalFoods).toBe(3);
    expect(g.unlockedCount).toBe(0);
    expect(g.inProgressCount).toBe(0);
    expect(g.reactedCount).toBe(0);
    expect(g.foods.every((f) => f.state === "not-tried")).toBe(true);
  });

  it("unlocks after eaten logs on UNLOCK_EXPOSURES distinct days", () => {
    const logs = [
      makeLog("apple", "2026-09-01"),
      makeLog("apple", "2026-09-02"),
      makeLog("apple", "2026-09-03"),
    ];
    const g = foodGallery(logs, foods);
    const apple = g.foods.find((f) => f.slug === "apple")!;
    expect(apple.eatenDays).toBe(UNLOCK_EXPOSURES);
    expect(apple.state).toBe("unlocked");
    expect(g.unlockedCount).toBe(1);
  });

  it("counts distinct days, not raw logs — three same-day logs stay in progress", () => {
    const logs = [
      makeLog("apple", "2026-09-01"),
      makeLog("apple", "2026-09-01"),
      makeLog("apple", "2026-09-01"),
    ];
    const apple = foodGallery(logs, foods).foods.find((f) => f.slug === "apple")!;
    expect(apple.eatenDays).toBe(1);
    expect(apple.state).toBe("in-progress");
  });

  it("ignores amountEaten none — an untouched offer earns no progress", () => {
    const logs = [makeLog("banana", "2026-09-01", "none")];
    const banana = foodGallery(logs, foods).foods.find((f) => f.slug === "banana")!;
    expect(banana.eatenDays).toBe(0);
    expect(banana.state).toBe("not-tried");
  });

  it("a reaction-grade log moves the food to reacted, even when unlocked", () => {
    const logs = [
      makeLog("egg", "2026-09-01"),
      makeLog("egg", "2026-09-02"),
      makeLog("egg", "2026-09-03"),
      makeLog("egg", "2026-09-04", "taste", ["hives-widespread"]),
    ];
    const g = foodGallery(logs, foods);
    const egg = g.foods.find((f) => f.slug === "egg")!;
    expect(egg.state).toBe("reacted");
    expect(g.reactedCount).toBe(1);
    expect(g.unlockedCount).toBe(0);
  });

  it("gagging-only and contact redness do not count as reactions", () => {
    const logs = [
      makeLog("apple", "2026-09-01", "some", ["gagging-only"]),
      makeLog("apple", "2026-09-02", "some", ["contact-redness-acidic"]),
      makeLog("apple", "2026-09-03"),
    ];
    const apple = foodGallery(logs, foods).foods.find((f) => f.slug === "apple")!;
    expect(apple.state).toBe("unlocked");
  });

  it("skips custom foods — they have no catalog tile", () => {
    const logs = [makeLog("custom:dragonfruit-cake", "2026-09-01")];
    const g = foodGallery(logs, foods);
    expect(g.foods).toHaveLength(3);
    expect(g.unlockedCount + g.inProgressCount + g.reactedCount).toBe(0);
  });
});

describe("achievementProgress", () => {
  it("starts with no tier and first-bite next", () => {
    const p = achievementProgress(0);
    expect(p.current).toBeNull();
    expect(p.next?.id).toBe("first-bite");
  });

  it("advances tiers with unlock count", () => {
    const p = achievementProgress(15);
    expect(p.current?.id).toBe("little-snacker");
    expect(p.next?.id).toBe("brave-taster");
  });

  it("caps at the top tier", () => {
    const top = ACHIEVEMENT_TIERS[ACHIEVEMENT_TIERS.length - 1];
    const p = achievementProgress(top.threshold + 10);
    expect(p.current?.id).toBe(top.id);
    expect(p.next).toBeNull();
  });

  it("thresholds are strictly increasing", () => {
    for (let i = 1; i < ACHIEVEMENT_TIERS.length; i++) {
      expect(ACHIEVEMENT_TIERS[i].threshold).toBeGreaterThan(ACHIEVEMENT_TIERS[i - 1].threshold);
    }
  });
});
