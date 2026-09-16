import { describe, expect, it } from "vitest";
import type { AgeBand, AllergenId, Food } from "@/content-schema/food";
import {
  addMealPick,
  bandForFood,
  buildMealLogs,
  foodsToWatch,
  mealBands,
  type MealFood,
  newAllergensInMeal,
  removeMealPick,
  resolveMealPicks,
} from "./meal-log";

function makeFood(
  slug: string,
  bands: AgeBand[] = ["6-8m", "9-12m", "12-24m"],
  commonAllergen: AllergenId | null = null,
): Food {
  return {
    slug,
    name: slug,
    aliases: [],
    category: "fruit",
    minAgeMonths: 6,
    ironRich: false,
    commonAllergen,
    chokingRisk: "low",
    nutritionHighlights: ["x"],
    prepSpecs: bands.map((band) => ({ band, form: `${slug} at ${band}` })),
    tips: [],
    sources: [],
  } as unknown as Food;
}

const content = (food: Food): MealFood => ({ kind: "content", food });
const custom = (name: string): MealFood => ({ kind: "custom", name });

let seq = 0;
const ids = () => `id-${seq++}`;

function draft(foods: MealFood[], over: Partial<Parameters<typeof buildMealLogs>[0]> = {}) {
  seq = 0;
  return buildMealLogs({
    babyId: "b1",
    foods,
    date: "2026-09-16",
    band: null,
    ageMonths: 7,
    amountEaten: "some",
    enjoyment: "loved",
    gagging: false,
    symptoms: [],
    newId: ids,
    ...over,
  });
}

describe("picking foods for a meal", () => {
  it("adds each food once, whatever the parent taps", () => {
    let picks = addMealPick([], { kind: "content", slug: "egg" });
    picks = addMealPick(picks, { kind: "content", slug: "egg" });
    picks = addMealPick(picks, { kind: "custom", name: "Congee" });
    picks = addMealPick(picks, { kind: "custom", name: "congee" });
    expect(picks).toHaveLength(2);
  });

  it("removes a food by the slug it logs under", () => {
    const picks = [
      { kind: "content", slug: "egg" } as const,
      { kind: "custom", name: "Congee" } as const,
    ];
    expect(removeMealPick(picks, "custom:congee")).toEqual([{ kind: "content", slug: "egg" }]);
  });

  it("drops a slug the food index does not know", () => {
    const egg = makeFood("egg");
    const resolved = resolveMealPicks(
      [
        { kind: "content", slug: "egg" },
        { kind: "content", slug: "unicorn" },
        { kind: "custom", name: "Congee" },
      ],
      new Map([["egg", egg]]),
    );
    expect(resolved).toEqual([content(egg), custom("Congee")]);
  });
});

describe("prep stages across a meal", () => {
  it("offers every stage any food in the meal is served at", () => {
    const picked = [content(makeFood("egg", ["6-8m"])), content(makeFood("toast", ["9-12m"]))];
    expect(mealBands(picked)).toEqual(["6-8m", "9-12m"]);
  });

  it("records the chosen stage when the food has it", () => {
    expect(bandForFood(makeFood("egg"), "9-12m", 7)).toBe("9-12m");
  });

  it("falls back to the stage that suits the age when the food lacks the choice", () => {
    const toast = makeFood("toast", ["9-12m", "12-24m"]);
    expect(bandForFood(toast, "6-8m", 10)).toBe("9-12m");
  });

  it("falls back to the food's first stage when the age has none either", () => {
    const toast = makeFood("toast", ["12-24m"]);
    expect(bandForFood(toast, "6-8m", 7)).toBe("12-24m");
  });
});

describe("what a check-in watches", () => {
  it("watches every allergen in the meal", () => {
    const egg = makeFood("egg", ["6-8m"], "egg");
    const wheat = makeFood("toast", ["6-8m"], "wheat");
    const picked = [content(makeFood("pear")), content(egg), content(wheat)];
    expect(foodsToWatch(picked)).toEqual([egg, wheat]);
  });

  it("watches one food when the meal holds no allergen", () => {
    const pear = makeFood("pear");
    expect(foodsToWatch([content(pear), content(makeFood("carrot"))])).toEqual([pear]);
  });

  it("watches nothing when every food is a custom one", () => {
    expect(foodsToWatch([custom("Congee")])).toEqual([]);
  });

  it("names each allergen the meal introduces for the first time", () => {
    const picked = [
      content(makeFood("egg", ["6-8m"], "egg")),
      content(makeFood("omelette", ["6-8m"], "egg")),
      content(makeFood("toast", ["6-8m"], "wheat")),
      content(makeFood("yogurt", ["6-8m"], "milk")),
    ];
    expect(newAllergensInMeal(picked, (a) => a === "milk")).toEqual(["egg", "wheat"]);
  });
});

describe("buildMealLogs", () => {
  it("writes one row per food, sharing everything the meal has in common", () => {
    const logs = draft([content(makeFood("egg")), custom("Sweet potato mash")], {
      time: "18:30",
      mealSlot: "dinner",
      photoId: "photo-1",
      notes: "ate the lot",
    });
    expect(logs).toHaveLength(2);
    expect(logs.map((l) => l.foodSlug)).toEqual(["egg", "custom:sweet potato mash"]);
    expect(logs.map((l) => l.id)).toEqual(["id-0", "id-1"]);
    for (const log of logs) {
      expect(log.date).toBe("2026-09-16");
      expect(log.time).toBe("18:30");
      expect(log.mealSlot).toBe("dinner");
      expect(log.photoId).toBe("photo-1");
      expect(log.notes).toBe("ate the lot");
      expect(log.amountEaten).toBe("some");
      expect(log.enjoyment).toBe("loved");
    }
  });

  it("keeps the typed name on a custom food and nothing on a content food", () => {
    const logs = draft([content(makeFood("egg")), custom("  Congee  ")]);
    expect(logs[0].customFoodName).toBeUndefined();
    expect(logs[1].customFoodName).toBe("Congee");
  });

  it("records each food at the stage that food is actually served at", () => {
    const logs = draft([content(makeFood("egg", ["6-8m"])), content(makeFood("toast", ["9-12m"]))], {
      band: "6-8m",
      ageMonths: 10,
    });
    expect(logs.map((l) => l.prepBandUsed)).toEqual(["6-8m", "9-12m"]);
  });

  it("records a custom food at the stage that suits the age", () => {
    expect(draft([custom("Congee")], { ageMonths: 13 })[0].prepBandUsed).toBe("12-24m");
  });

  it("carries the same symptoms onto every food, because the meal is the suspect", () => {
    const logs = draft([content(makeFood("egg")), content(makeFood("toast"))], {
      symptoms: ["hives-widespread"],
      symptomOnset: "within-2h",
    });
    expect(logs.every((l) => l.symptoms[0] === "hives-widespread")).toBe(true);
    expect(logs.every((l) => l.symptomOnset === "within-2h")).toBe(true);
  });
});
