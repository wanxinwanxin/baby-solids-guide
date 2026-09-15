import { describe, expect, it } from "vitest";
import type { Food } from "@/content-schema/food";
import type { Recipe } from "@/content-schema/recipe";
import type { ExposureLog } from "@/lib/storage/types";
import { MENU_DAYS, weeklyMenu } from "./weekly-menu";

const food = (slug: string, flavorPairings: string[] = []): [string, Food] => [
  slug,
  { slug, name: slug, flavorPairings } as unknown as Food,
];

const recipe = (partial: Partial<Recipe> & { slug: string; foods: string[] }): Recipe => ({
  name: partial.slug,
  bands: ["6-8m", "9-12m"],
  method: "mash",
  steps: ["Mash everything together until smooth."],
  whyItWorks: "Test rationale long enough to satisfy the schema.",
  ironPairing: false,
  storage: "Keeps 24 hours in the fridge.",
  ...partial,
});

const FOODS = new Map([
  food("banana"),
  food("pear"),
  food("broccoli"),
  food("oats"),
  food("lentils"),
  food("salmon"),
]);

const TODAY = new Date(2026, 8, 15); // 2026-09-15, local
const log = (foodSlug: string, date: string, symptoms: string[] = []): ExposureLog =>
  ({ foodSlug, date, amountEaten: "some", symptoms }) as unknown as ExposureLog;

/** Four pantry foods settled well before TODAY, so any of them may be a companion. */
const LOGS = [
  log("banana", "2026-08-01"),
  log("pear", "2026-08-01"),
  log("broccoli", "2026-08-01"),
  log("oats", "2026-08-01"),
];

const RECIPES = [
  recipe({ slug: "a", foods: ["banana", "pear"] }),
  recipe({ slug: "b", foods: ["broccoli", "oats"] }),
  recipe({ slug: "c", foods: ["banana", "oats"] }),
  recipe({ slug: "d", foods: ["pear", "broccoli"] }),
];

const base = {
  recipes: RECIPES,
  foods: FOODS,
  logs: LOGS,
  safeSlugs: new Set(["banana", "pear", "broccoli", "oats"]),
  blockedSlugs: new Set<string>(),
  plannedByDate: new Map<string, string>(),
  ageMonths: 7,
  today: TODAY,
};

describe("weeklyMenu", () => {
  it("covers seven consecutive days starting today", () => {
    const menu = weeklyMenu(base);
    expect(menu.days).toHaveLength(MENU_DAYS);
    expect(menu.days.map((d) => d.date)).toEqual([
      "2026-09-15",
      "2026-09-16",
      "2026-09-17",
      "2026-09-18",
      "2026-09-19",
      "2026-09-20",
      "2026-09-21",
    ]);
    expect(menu.days.map((d) => d.dayIndex)).toEqual([0, 1, 2, 3, 4, 5, 6]);
  });

  it("is deterministic: the same input gives the same week", () => {
    expect(weeklyMenu(base)).toEqual(weeklyMenu(base));
  });

  it("spreads distinct recipes before it repeats one", () => {
    const menu = weeklyMenu({ ...base, perDay: 1 });
    const firstFour = menu.days.slice(0, 4).map((d) => d.combos[0]?.recipe.slug);
    expect(new Set(firstFour).size).toBe(4);
  });

  it("rotates a small pantry instead of printing the best recipe every day", () => {
    // Three recipes, two slots asked for: a parent should see the week
    // cycle, not the top-ranked dish six times over.
    const menu = weeklyMenu({ ...base, recipes: RECIPES.slice(0, 3), perDay: 2 });
    const served = menu.days.map((d) => d.combos.map((c) => c.recipe.slug));
    // A pool of three cannot fill two slots a day without a rerun, so the
    // day gets shorter instead.
    expect(served).toEqual([["a"], ["b"], ["c"], ["a"], ["b"], ["c"], ["a"]]);
  });

  it("serves two a day once the pantry is wide enough for both", () => {
    const menu = weeklyMenu({ ...base, perDay: 2 });
    expect(menu.days.every((d) => d.combos.length === 2)).toBe(true);
    // No dish carries over from yesterday.
    for (let i = 1; i < menu.days.length; i += 1) {
      const yesterday = menu.days[i - 1].combos.map((c) => c.recipe.slug);
      for (const combo of menu.days[i].combos) {
        expect(yesterday).not.toContain(combo.recipe.slug);
      }
    }
  });

  it("repeats rather than leaving a day empty once the pantry runs out", () => {
    const menu = weeklyMenu({ ...base, recipes: [RECIPES[0]], perDay: 1 });
    expect(menu.days.every((d) => d.combos.map((c) => c.recipe.slug).includes("a"))).toBe(true);
    expect(menu.recipeCount).toBe(1);
    expect(menu.daysWithFood).toBe(MENU_DAYS);
  });

  it("puts the day's planned food on that day and nowhere else", () => {
    const menu = weeklyMenu({
      ...base,
      recipes: [...RECIPES, recipe({ slug: "with-lentils", foods: ["lentils", "banana"] })],
      plannedByDate: new Map([["2026-09-18", "lentils"]]),
    });
    for (const day of menu.days) {
      const usesLentils = day.combos.some((c) => c.recipe.foods.includes("lentils"));
      expect(usesLentils).toBe(day.date === "2026-09-18");
    }
    expect(menu.days.find((d) => d.date === "2026-09-18")?.newFoodSlug).toBe("lentils");
  });

  it("never serves a blocked food, even when the plan asks for it", () => {
    const menu = weeklyMenu({
      ...base,
      recipes: [...RECIPES, recipe({ slug: "with-salmon", foods: ["salmon", "banana"] })],
      plannedByDate: new Map([["2026-09-17", "salmon"]]),
      blockedSlugs: new Set(["salmon"]),
    });
    expect(menu.days.some((d) => d.combos.some((c) => c.recipe.foods.includes("salmon")))).toBe(
      false,
    );
  });

  it("does not treat a food introduced this week as pantry on a later day", () => {
    // lentils arrive Wednesday, salmon on Sunday. The Sunday plate may not
    // lean on lentils: three days in, lentils are still unproven, and two
    // unproven foods at once would make a reaction ambiguous.
    const menu = weeklyMenu({
      ...base,
      recipes: [...RECIPES, recipe({ slug: "lentils-salmon", foods: ["lentils", "salmon"] })],
      plannedByDate: new Map([
        ["2026-09-17", "lentils"],
        ["2026-09-20", "salmon"],
      ]),
    });
    expect(
      menu.days.some((d) => d.combos.some((c) => c.recipe.slug === "lentils-salmon")),
    ).toBe(false);
  });

  it("gives back an empty week when nothing is safe yet", () => {
    const menu = weeklyMenu({ ...base, safeSlugs: new Set<string>(), logs: [] });
    expect(menu.daysWithFood).toBe(0);
    expect(menu.recipeCount).toBe(0);
    expect(menu.days).toHaveLength(MENU_DAYS);
  });
});
