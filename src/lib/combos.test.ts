import { describe, expect, it } from "vitest";
import type { Food } from "@/content-schema/food";
import type { Recipe } from "@/content-schema/recipe";
import type { ExposureLog } from "@/lib/storage/types";
import { establishedSlugs, rankCombos } from "./combos";

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

describe("controlled introduction", () => {
  it("rejects a combo that would introduce two unproven foods at once", () => {
    const recipes = [recipe({ slug: "two-new", foods: ["lentils", "salmon", "banana"] })];
    const out = rankCombos({ ...base, recipes, todaysPickSlugs: ["lentils", "salmon"] });
    expect(out).toEqual([]);
  });

  it("rejects a combo pairing a new food with a companion that is not established yet", () => {
    const recipes = [recipe({ slug: "fresh-companion", foods: ["lentils", "banana"] })];
    const out = rankCombos({
      ...base,
      recipes,
      establishedSlugs: new Set(["broccoli"]), // banana eaten, but only recently
    });
    expect(out).toEqual([]);
  });

  it("accepts a new food alongside established companions", () => {
    const recipes = [recipe({ slug: "one-new", foods: ["lentils", "banana"] })];
    const out = rankCombos({
      ...base,
      recipes,
      establishedSlugs: new Set(["banana", "peanut-butter", "broccoli"]),
    });
    expect(out.map((r) => r.recipe.slug)).toEqual(["one-new"]);
  });

  it("leaves all-established combos alone regardless of the companion rule", () => {
    const recipes = [recipe({ slug: "all-known", foods: ["banana", "peanut-butter"] })];
    const out = rankCombos({ ...base, recipes, establishedSlugs: new Set<string>() });
    expect(out.map((r) => r.recipe.slug)).toEqual(["all-known"]);
  });
});

describe("establishedSlugs", () => {
  const NOW = new Date("2026-08-25T12:00:00Z");
  const log = (foodSlug: string, date: string, symptoms: string[] = []): ExposureLog =>
    ({ foodSlug, date, amountEaten: "some", symptoms }) as unknown as ExposureLog;

  it("counts a food only once it has been eaten for long enough", () => {
    const out = establishedSlugs([log("banana", "2026-08-01"), log("pear", "2026-08-24")], NOW);
    expect([...out]).toEqual(["banana"]);
  });

  it("uses the first exposure, not the most recent one", () => {
    const out = establishedSlugs([log("banana", "2026-08-01"), log("banana", "2026-08-24")], NOW);
    expect(out.has("banana")).toBe(true);
  });

  it("drops a food that ever caused allergen-pausing symptoms", () => {
    const out = establishedSlugs([log("banana", "2026-08-01", ["hives-widespread"])], NOW);
    expect(out.has("banana")).toBe(false);
  });

  it("ignores offers the baby refused outright", () => {
    const refused = { foodSlug: "pear", date: "2026-08-01", amountEaten: "none", symptoms: [] };
    const out = establishedSlugs([refused as unknown as ExposureLog], NOW);
    expect(out.has("pear")).toBe(false);
  });
});
