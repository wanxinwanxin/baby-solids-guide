import { describe, expect, it } from "vitest";
import type { Food } from "@/content-schema/food";
import type { Recipe } from "@/content-schema/recipe";
import { rankCombos } from "./combos";

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
  food("banana", ["peanut-butter"]),
  food("peanut-butter"),
  food("lentils"),
  food("broccoli"),
  food("salmon"),
  food("grapes"),
]);

const base = {
  foods: FOODS,
  safeSlugs: new Set(["banana", "peanut-butter", "broccoli"]),
  todaysPickSlugs: ["lentils"],
  ageMonths: 7,
  blockedSlugs: new Set<string>(),
};

describe("rankCombos (D3)", () => {
  it("safety invariant: every ingredient must be safe or a today's pick; blocked kills a combo", () => {
    const recipes = [
      recipe({ slug: "ok", foods: ["banana", "peanut-butter"] }),
      recipe({ slug: "uses-pick", foods: ["lentils", "broccoli"] }),
      recipe({ slug: "unknown-food", foods: ["banana", "salmon"] }), // salmon neither safe nor pick
    ];
    const out = rankCombos({ ...base, recipes });
    expect(out.map((r) => r.recipe.slug).sort()).toEqual(["ok", "uses-pick"]);

    const blocked = rankCombos({ ...base, recipes, blockedSlugs: new Set(["peanut-butter"]) });
    expect(blocked.map((r) => r.recipe.slug)).toEqual(["uses-pick"]);
  });

  it("band gate: a 12-24m-only recipe never surfaces for a 7-month-old", () => {
    const recipes = [recipe({ slug: "toddler-only", foods: ["banana"], bands: ["12-24m"] })];
    expect(rankCombos({ ...base, recipes })).toEqual([]);
  });

  it("ranking: iron pairing and today's-pick usage outrank plain safe combos; ties break by slug", () => {
    const recipes = [
      recipe({ slug: "plain", foods: ["banana", "broccoli"] }),
      recipe({ slug: "iron", foods: ["lentils", "broccoli"], ironPairing: true }),
      recipe({ slug: "a-tie", foods: ["banana", "broccoli"] }),
    ];
    const out = rankCombos({ ...base, recipes });
    expect(out[0].recipe.slug).toBe("iron");
    expect(out[0].usesPicks).toEqual(["lentils"]);
    // identical scores → slug order
    expect(out.slice(1).map((r) => r.recipe.slug)).toEqual(["a-tie", "plain"]);
  });

  it("deterministic: same input twice gives the identical ordering", () => {
    const recipes = [
      recipe({ slug: "b", foods: ["banana", "peanut-butter"] }),
      recipe({ slug: "a", foods: ["banana", "broccoli"] }),
      recipe({ slug: "c", foods: ["lentils", "banana"], ironPairing: false }),
    ];
    const one = rankCombos({ ...base, recipes }).map((r) => r.recipe.slug);
    const two = rankCombos({ ...base, recipes }).map((r) => r.recipe.slug);
    expect(one).toEqual(two);
  });
});
