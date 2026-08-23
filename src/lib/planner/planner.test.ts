import { describe, expect, it } from "vitest";
import type { Food } from "@/content-schema/food";
import type { BabyProfile, ExposureLog, Plan } from "@/lib/storage/types";
import { allergenOrderFromPlan, planWeekIndex, recommend, PLAN_BONUS } from "@/lib/engine";
import { generatePlan, mondayOf, validatePlan } from "./index";

const TODAY = new Date("2026-08-22T12:00:00Z"); // a Saturday
const DAY = 86400000;

function birthDateForAgeMonths(months: number): string {
  return new Date(TODAY.getTime() - months * 30.4375 * DAY).toISOString().slice(0, 10);
}

function makeFood(partial: Partial<Food> & { slug: string }): Food {
  return {
    name: partial.slug,
    aliases: [],
    category: "vegetable",
    minAgeMonths: 6,
    ironRich: false,
    commonAllergen: null,
    chokingRisk: "low",
    nutritionHighlights: [],
    prepSpecs: [
      {
        band: "6-8m",
        form: "A soft stick about the length and width of two adult fingers, cooked fully soft.",
        passFailTest: "Squish test.",
        whyThisForm: "Palmar grasp.",
        prepSteps: ["Cook until soft."],
        commonMistakes: [],
        media: [],
      },
    ],
    firstFoodPick: false,
    flavorPairings: [],
    tips: ["Cook it until fully soft.", "Batch prep and freeze."],
    sources: [{ label: "Test source", url: "https://example.com", retrievedOn: "2026-08-22" }],
    ...partial,
  };
}

function makeBaby(partial?: Partial<BabyProfile>): BabyProfile {
  return {
    id: "baby-1",
    nickname: "Testling",
    birthDate: birthDateForAgeMonths(6.5),
    feedingStyle: "mixed",
    allergyRisk: { eczema: "none", existingFoodAllergy: false, familyHistoryAtopy: false },
    knownAllergies: [],
    doctorAvoidList: [],
    doctorClearances: [],
    conditions: [],
    textureStage: "S1",
    readiness: { confirmedAt: "2026-08-10" },
    ...partial,
  };
}

const FOODS: Food[] = [
  makeFood({ slug: "beef", category: "protein", ironRich: true }),
  makeFood({ slug: "lentils", category: "legume", ironRich: true }),
  makeFood({ slug: "avocado", firstFoodPick: true }),
  makeFood({ slug: "banana", category: "fruit" }),
  makeFood({ slug: "broccoli" }),
  makeFood({ slug: "apple", category: "fruit", chokingRisk: "high" }),
  makeFood({ slug: "grapes", category: "fruit", chokingRisk: "high", minAgeMonths: 9 }),
  makeFood({ slug: "peanut-butter", category: "protein", commonAllergen: "peanut", chokingRisk: "high" }),
  makeFood({ slug: "egg", category: "protein", commonAllergen: "egg", ironRich: true }),
  makeFood({ slug: "yogurt", category: "dairy", commonAllergen: "milk" }),
];

const emptyInput = { logs: [] as ExposureLog[], overrides: [], today: TODAY, foods: FOODS };

describe("mondayOf", () => {
  it("maps any day to that week's Monday", () => {
    expect(mondayOf(new Date("2026-08-22T12:00:00Z"))).toBe("2026-08-17"); // Sat → Mon
    expect(mondayOf(new Date("2026-08-17T00:00:00Z"))).toBe("2026-08-17"); // Mon → itself
    expect(mondayOf(new Date("2026-08-23T00:00:00Z"))).toBe("2026-08-17"); // Sun → prior Mon
  });
});

describe("generatePlan (deterministic, gate-respecting)", () => {
  it("same input ⇒ same plan; iron leads week 0; one allergen/week from week 1", () => {
    const a = generatePlan({ baby: makeBaby(), ...emptyInput });
    const b = generatePlan({ baby: makeBaby(), ...emptyInput });
    expect(a).toEqual(b);

    const week0 = a.entries.filter((e) => e.weekIndex === 0).map((e) => e.foodSlug);
    expect(week0).toContain("beef");
    expect(week0).toContain("lentils");

    const allergenWeeks = a.entries
      .filter((e) => FOODS.find((f) => f.slug === e.foodSlug)?.commonAllergen)
      .map((e) => e.weekIndex);
    expect(Math.min(...allergenWeeks)).toBeGreaterThanOrEqual(1);
    // never two new allergens in the same week
    const counts = new Map<number, number>();
    for (const w of allergenWeeks) counts.set(w, (counts.get(w) ?? 0) + 1);
    expect([...counts.values()].every((n) => n === 1)).toBe(true);
  });

  it("high-risk baby: peanut never auto-planned before doctor clearance", () => {
    const baby = makeBaby({
      allergyRisk: { eczema: "severe", existingFoodAllergy: false, familyHistoryAtopy: false },
    });
    const plan = generatePlan({ baby, ...emptyInput });
    expect(plan.entries.some((e) => e.foodSlug === "peanut-butter")).toBe(false);
    // cleared → planned
    const cleared = generatePlan({ baby: { ...baby, doctorClearances: ["peanut"] }, ...emptyInput });
    expect(cleared.entries.some((e) => e.foodSlug === "peanut-butter")).toBe(true);
  });

  it("respects min-age at the scheduled week and skips already-tried foods", () => {
    const plan = generatePlan({ baby: makeBaby(), ...emptyInput });
    const grapes = plan.entries.find((e) => e.foodSlug === "grapes");
    if (grapes) {
      // 6.5mo baby reaches 9mo around week 11
      expect(grapes.weekIndex).toBeGreaterThanOrEqual(10);
    }
    const logs: ExposureLog[] = [
      {
        id: "l1", babyId: "baby-1", foodSlug: "avocado", date: "2026-08-20",
        prepBandUsed: "6-8m", amountEaten: "some", enjoyment: "loved", gagging: false, symptoms: [],
      },
    ];
    const plan2 = generatePlan({ baby: makeBaby(), ...emptyInput, logs });
    expect(plan2.entries.some((e) => e.foodSlug === "avocado")).toBe(false);
  });
});

describe("validatePlan warning matrix", () => {
  const planWith = (entries: Plan["entries"]): Plan => ({
    babyId: "baby-1",
    anchorMonday: "2026-08-17",
    entries,
  });

  it("known allergy blocks; crowding, min-age, stage warn", () => {
    const baby = makeBaby({ knownAllergies: ["milk"] });
    const warnings = validatePlan({
      plan: planWith([
        { id: "e1", foodSlug: "yogurt", weekIndex: 0 }, // known allergy → blocking
        { id: "e2", foodSlug: "peanut-butter", weekIndex: 1 }, // crowded with egg
        { id: "e3", foodSlug: "egg", weekIndex: 1 },
        { id: "e4", foodSlug: "grapes", weekIndex: 0 }, // min-age + stage caution
      ]),
      baby,
      ...emptyInput,
    });
    expect(warnings.find((w) => w.entryId === "e1")?.kind).toBe("known-allergy");
    expect(warnings.find((w) => w.entryId === "e1")?.blocking).toBe(true);
    expect(warnings.filter((w) => w.kind === "allergen-crowding").map((w) => w.entryId).sort()).toEqual(["e2", "e3"]);
    const grapeKinds = warnings.filter((w) => w.entryId === "e4").map((w) => w.kind).sort();
    expect(grapeKinds).toEqual(["min-age", "stage-caution"]);
  });

  it("a clean plan yields no warnings", () => {
    const warnings = validatePlan({
      plan: planWith([
        { id: "e1", foodSlug: "beef", weekIndex: 0 },
        { id: "e2", foodSlug: "egg", weekIndex: 1 },
        { id: "e3", foodSlug: "yogurt", weekIndex: 2 },
      ]),
      baby: makeBaby(),
      ...emptyInput,
    });
    expect(warnings).toEqual([]);
  });
});

describe("plan ↔ engine integration (R10 + order)", () => {
  const plan: Plan = {
    babyId: "baby-1",
    anchorMonday: "2026-08-17", // TODAY is in week 0
    entries: [
      { id: "e1", foodSlug: "beef", weekIndex: 0 },
      { id: "e2", foodSlug: "egg", weekIndex: 1 },
      { id: "e3", foodSlug: "peanut-butter", weekIndex: 2 },
    ],
  };

  it("allergenOrderFromPlan: plan order wins, unplanned allergens follow default", () => {
    expect(allergenOrderFromPlan(plan, FOODS).slice(0, 3)).toEqual(["egg", "peanut", "milk"]);
    expect(planWeekIndex(plan, TODAY)).toBe(0);
  });

  it("R10 boosts planned-this-week foods with the plan reason", () => {
    const logs: ExposureLog[] = [1, 2, 3].map((n) => ({
      id: `l${n}`, babyId: "baby-1", foodSlug: "banana", date: `2026-08-1${n}`,
      prepBandUsed: "6-8m", amountEaten: "some", enjoyment: "neutral", gagging: false, symptoms: [],
    }));
    const rec = recommend({ baby: makeBaby(), logs, overrides: [], foods: FOODS, today: TODAY, plan });
    const beef = rec.todaysPicks.find((p) => p.slug === "beef");
    expect(beef).toBeDefined();
    expect(beef!.reason).toBe("On your plan for this week.");
    // and the rail follows the plan's order: egg before peanut
    expect(rec.allergenRail.next?.allergenId).toBe("egg");

    const noPlan = recommend({ baby: makeBaby(), logs, overrides: [], foods: FOODS, today: TODAY });
    const beefNoPlan = noPlan.todaysPicks.find((p) => p.slug === "beef");
    expect(beefNoPlan?.reason).not.toBe("On your plan for this week.");
    expect(PLAN_BONUS).toBeGreaterThan(0);
  });
});

describe("pediatrician-guided early start (eligibility clamp)", () => {
  it("a 4.5m baby with approval gets a full plan of 6-month foods, no min-age warnings", () => {
    const baby = makeBaby({
      birthDate: birthDateForAgeMonths(4.5),
      readiness: { earlyStartApproved: true },
    });
    const plan = generatePlan({ baby, ...emptyInput });
    expect(plan.entries.filter((e) => e.weekIndex === 0).length).toBeGreaterThan(0);
    const warnings = validatePlan({ plan, baby, ...emptyInput });
    expect(warnings.filter((w) => w.kind === "min-age")).toHaveLength(0);
  });

  it("without approval the same 4.5m baby gets nothing until the weeks reach 6 months", () => {
    const baby = makeBaby({ birthDate: birthDateForAgeMonths(4.5), readiness: {} });
    const plan = generatePlan({ baby, ...emptyInput });
    expect(plan.entries.filter((e) => e.weekIndex === 0)).toHaveLength(0);
  });

  it("the clamp stops at 6 months: 9-month foods still respect min-age for an early starter", () => {
    const baby = makeBaby({
      birthDate: birthDateForAgeMonths(4.5),
      readiness: { earlyStartApproved: true },
    });
    const plan = generatePlan({ baby, ...emptyInput });
    const grapeEntry = plan.entries.find((e) => e.foodSlug === "grapes");
    if (grapeEntry) {
      // 6 (clamped) + weeks must be ≥ 9 months before grapes appear
      expect(grapeEntry.weekIndex).toBeGreaterThanOrEqual(13);
    }
  });
});
