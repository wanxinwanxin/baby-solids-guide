import { describe, expect, it } from "vitest";
import type { Food } from "@/content-schema/food";
import type { BabyProfile, ExposureLog } from "@/lib/storage/types";
import { recommend, type EngineInput } from "./index";

/** Fixed clock — the engine never reads Date.now(). */
const TODAY = new Date("2026-08-22T12:00:00Z");
const DAY = 86400000;

function daysAgo(n: number): string {
  return new Date(TODAY.getTime() - n * DAY).toISOString().slice(0, 10);
}
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
        passFailTest: "Squish test: flattens between two fingers.",
        whyThisForm: "Palmar grasp.",
        prepSteps: ["Cook until soft."],
        commonMistakes: [],
        media: [],
      },
      {
        band: "9-12m",
        form: "Soft pinky-nail-sized pieces the baby can pick up with a developing pincer grasp.",
        passFailTest: "Squish test.",
        whyThisForm: "Pincer grasp.",
        prepSteps: ["Dice small."],
        commonMistakes: [],
        media: [],
      },
      {
        band: "12-24m",
        form: "Bite-size soft pieces cut safely for a toddler eating family meals now.",
        passFailTest: "Yields to firm finger pressure.",
        whyThisForm: "Molars developing.",
        prepSteps: ["Chop."],
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
    readiness: { confirmedAt: daysAgo(10) },
    ...partial,
  };
}

let logSeq = 0;
function makeLog(partial: Partial<ExposureLog> & { foodSlug: string }): ExposureLog {
  return {
    id: `log-${++logSeq}`,
    babyId: "baby-1",
    date: daysAgo(1),
    prepBandUsed: "6-8m",
    amountEaten: "some",
    enjoyment: "neutral",
    gagging: false,
    symptoms: [],
    ...partial,
  };
}

const FOODS: Food[] = [
  makeFood({ slug: "beef", name: "Beef", category: "protein", ironRich: true }),
  makeFood({ slug: "lentils", name: "Lentils", category: "legume", ironRich: true }),
  makeFood({ slug: "spinach", name: "Spinach", ironRich: true }),
  makeFood({ slug: "apple", name: "Apple", category: "fruit" }),
  makeFood({ slug: "banana", name: "Banana", category: "fruit" }),
  makeFood({ slug: "broccoli", name: "Broccoli" }),
  makeFood({ slug: "peanut-butter", name: "Peanut butter", category: "protein", commonAllergen: "peanut" }),
  makeFood({ slug: "egg", name: "Egg", category: "protein", commonAllergen: "egg", ironRich: true }),
  makeFood({ slug: "yogurt", name: "Yogurt", category: "dairy", commonAllergen: "milk" }),
  makeFood({ slug: "cheese", name: "Cheese", category: "dairy", commonAllergen: "milk" }),
];

function run(overrides: Partial<EngineInput>) {
  return recommend({
    baby: makeBaby(),
    logs: [],
    overrides: [],
    foods: FOODS,
    today: TODAY,
    ...overrides,
  });
}

describe("recommendation engine — the 10 mandatory cases (ROADMAP §7.3)", () => {
  it("1. 6.5m baby, 4 foods logged, 1 iron-rich → ≥2 iron-rich picks; peanut is next", () => {
    const logs = [
      makeLog({ foodSlug: "apple", date: daysAgo(4) }),
      makeLog({ foodSlug: "banana", date: daysAgo(3) }),
      makeLog({ foodSlug: "broccoli", date: daysAgo(2) }),
      makeLog({ foodSlug: "beef", date: daysAgo(1) }),
    ];
    const rec = run({ logs });
    expect(rec.gate).toBe("ready");
    const ironPicks = rec.todaysPicks.filter((p) => FOODS.find((f) => f.slug === p.slug)?.ironRich);
    expect(ironPicks.length).toBeGreaterThanOrEqual(2);
    expect(rec.allergenRail.next?.allergenId).toBe("peanut");
    expect(rec.allergenRail.next?.gated).toBe(false);
    expect(rec.allergenRail.next?.foodSlugs).toContain("peanut-butter");
  });

  it("2. severe eczema, peanut not doctor-cleared → gated rail item, not a food", () => {
    const baby = makeBaby({ allergyRisk: { eczema: "severe", existingFoodAllergy: false, familyHistoryAtopy: false } });
    const logs = [1, 2, 3].map((n) => makeLog({ foodSlug: "banana", date: daysAgo(n + 3) }));
    const rec = run({ baby, logs });
    expect(rec.allergenRail.next?.allergenId).toBe("peanut");
    expect(rec.allergenRail.next?.gated).toBe(true);
    expect(rec.allergenRail.next?.gateReason).toMatch(/pediatrician|allergist/i);
    expect(rec.allergenRail.next?.foodSlugs).toHaveLength(0);
    // and once the doctor clears it, the gate lifts:
    const cleared = run({ baby: { ...baby, doctorClearances: ["peanut"] }, logs });
    expect(cleared.allergenRail.next?.gated).toBe(false);
  });

  it("3. peanut first-exposed yesterday → egg not eligible (3-day cooldown); non-allergens unaffected", () => {
    const logs = [
      makeLog({ foodSlug: "banana", date: daysAgo(5) }),
      makeLog({ foodSlug: "broccoli", date: daysAgo(4) }),
      makeLog({ foodSlug: "apple", date: daysAgo(3) }),
      makeLog({ foodSlug: "peanut-butter", date: daysAgo(1), amountEaten: "taste" }),
    ];
    const rec = run({ logs });
    expect(rec.allergenRail.next?.allergenId).toBe("egg");
    expect(rec.allergenRail.next?.gated).toBe(true);
    expect(rec.allergenRail.next?.gateReason).toMatch(/wait/i);
    expect(rec.todaysPicks.map((p) => p.slug)).not.toContain("egg");
    expect(rec.todaysPicks.length).toBe(3); // non-allergen foods still recommended
  });

  it("4. peanut maintaining, last exposure 9 days ago → maintenance nudge", () => {
    const logs = [
      makeLog({ foodSlug: "peanut-butter", date: daysAgo(20) }),
      makeLog({ foodSlug: "peanut-butter", date: daysAgo(15) }),
      makeLog({ foodSlug: "peanut-butter", date: daysAgo(9) }),
    ];
    const rec = run({ logs });
    const nudge = rec.allergenRail.maintenance.find((m) => m.allergenId === "peanut");
    expect(nudge).toBeDefined();
    expect(nudge!.daysSince).toBe(9);
    expect(nudge!.message).toMatch(/twice a week/);
  });

  it("5. hives after yogurt → all milk foods excluded, warning links playbook, status reacted-paused", () => {
    const logs = [
      makeLog({ foodSlug: "banana", date: daysAgo(4) }),
      makeLog({ foodSlug: "yogurt", date: daysAgo(2), symptoms: ["hives-widespread"] }),
    ];
    const rec = run({ logs });
    const pickSlugs = rec.todaysPicks.map((p) => p.slug);
    expect(pickSlugs).not.toContain("yogurt");
    expect(pickSlugs).not.toContain("cheese");
    expect(rec.warnings.some((w) => w.kind === "symptom-hold" && w.allergenId === "milk")).toBe(true);
    expect(rec.allergenStates.find((s) => s.allergenId === "milk")?.status).toBe("reacted-paused");
  });

  it("6. 8m baby eating well → S1→S2 texture nudge; frequent gagging suppresses it", () => {
    const baby = makeBaby({ birthDate: birthDateForAgeMonths(8.2), textureStage: "S1" });
    const goodLogs = Array.from({ length: 12 }, (_, i) =>
      makeLog({ foodSlug: "banana", date: daysAgo(i + 1), amountEaten: "lots" }),
    );
    expect(run({ baby, logs: goodLogs }).textureStage.nudge).toBeDefined();

    const gaggyLogs = goodLogs.map((l, i) => (i < 3 ? { ...l, gagging: true } : l));
    expect(run({ baby, logs: gaggyLogs }).textureStage.nudge).toBeUndefined();
  });

  it("7. honey excluded at 11.9 months, included at 12.1 (corrected-age boundary)", () => {
    const honey = makeFood({
      slug: "honey",
      name: "Honey",
      minAgeMonths: 12,
      prepSpecs: [
        {
          band: "12-24m",
          form: "A thin drizzle stirred into yogurt or oatmeal once the botulism window has passed.",
          passFailTest: "n/a",
          whyThisForm: "Safe only after 12 months.",
          prepSteps: ["Stir in."],
          commonMistakes: [],
          media: [],
        },
      ],
    });
    const foods = [honey, makeFood({ slug: "carrot", name: "Carrot" })];
    // A carrot log unlocks a second pick slot (R11), so honey's eligibility
    // is what decides whether it appears.
    const logs = [makeLog({ foodSlug: "carrot", date: daysAgo(1) })];
    const young = run({ baby: makeBaby({ birthDate: birthDateForAgeMonths(11.9) }), foods, logs });
    expect(young.todaysPicks.map((p) => p.slug)).not.toContain("honey");
    const older = run({ baby: makeBaby({ birthDate: birthDateForAgeMonths(12.1) }), foods, logs });
    expect(older.todaysPicks.map((p) => p.slug)).toContain("honey");
  });

  it("8. preemie (8 weeks early) at 6 months chronological → gate not-ready", () => {
    const birthDate = birthDateForAgeMonths(6);
    const dueDate = new Date(new Date(`${birthDate}T00:00:00Z`).getTime() + 56 * DAY)
      .toISOString()
      .slice(0, 10);
    const rec = run({ baby: makeBaby({ birthDate, dueDate }) });
    expect(rec.gate).toBe("not-ready");
    expect(rec.todaysPicks).toHaveLength(0);
    expect(rec.gateReasons.length).toBeGreaterThan(0);
  });

  it("9. refused broccoli: not retried at 2 days, retried at 4 days with a different-prep suggestion", () => {
    const refusedAt = (n: number) => [
      makeLog({ foodSlug: "broccoli", date: daysAgo(n), enjoyment: "refused", amountEaten: "none" }),
    ];
    expect(run({ logs: refusedAt(2) }).retryQueue.map((r) => r.slug)).not.toContain("broccoli");
    const rec = run({ logs: refusedAt(4) });
    const entry = rec.retryQueue.find((r) => r.slug === "broccoli");
    expect(entry).toBeDefined();
    expect(entry!.reason).toMatch(/different prep|8–15/);
  });

  it("10. determinism: identical runs are identical (same input ⇒ same output)", () => {
    const logs = [makeLog({ foodSlug: "banana", date: daysAgo(2) })];
    const a = run({ logs });
    const b = run({ logs });
    expect(a).toEqual(b);
  });
});

describe("R11 gentle start + R12 day rotation", () => {
  it("R11: pick count ramps 1 → 2 → 3 as foods are introduced", () => {
    expect(run({ logs: [] }).todaysPicks).toHaveLength(1);
    const one = [makeLog({ foodSlug: "banana", date: daysAgo(1) })];
    expect(run({ logs: one }).todaysPicks).toHaveLength(2);
    const three = [
      makeLog({ foodSlug: "banana", date: daysAgo(3) }),
      makeLog({ foodSlug: "apple", date: daysAgo(2) }),
      makeLog({ foodSlug: "broccoli", date: daysAgo(1) }),
    ];
    expect(run({ logs: three }).todaysPicks).toHaveLength(3);
  });

  it("R11: the food just introduced is pinned first while ramping — keep offering it", () => {
    const logs = [makeLog({ foodSlug: "banana", date: daysAgo(1) })];
    const rec = run({ logs });
    expect(rec.todaysPicks[0].slug).toBe("banana");
    expect(rec.todaysPicks[0].reason).toMatch(/keep banana going/i);
    // A refused food is never pinned (retry spacing owns re-offers).
    const refused = [
      makeLog({ foodSlug: "banana", date: daysAgo(1), amountEaten: "none", enjoyment: "refused" }),
    ];
    expect(run({ logs: refused }).todaysPicks.map((p) => p.slug)).not.toContain("banana");
    // A stale introduction (>3 days ago) is not pinned either.
    const stale = [makeLog({ foodSlug: "banana", date: daysAgo(5) })];
    expect(run({ logs: stale }).todaysPicks[0]?.reason ?? "").not.toMatch(/keep banana going/i);
  });

  it("R12: picks vary across the days of a week but are identical for the same date", () => {
    // Many equal-priority untried foods → the rotation has room to work.
    const foods = Array.from({ length: 10 }, (_, i) =>
      makeFood({ slug: `veg-${i}`, name: `Veg ${i}` }),
    );
    const logs = [
      makeLog({ foodSlug: "veg-0", date: daysAgo(9) }),
      makeLog({ foodSlug: "veg-1", date: daysAgo(9) }),
      makeLog({ foodSlug: "veg-2", date: daysAgo(9) }),
    ];
    const seen = new Set<string>();
    for (let d = 0; d < 7; d++) {
      const day = new Date(TODAY.getTime() + d * DAY);
      const rec = recommend({ baby: makeBaby(), logs, overrides: [], foods, today: day });
      rec.todaysPicks.forEach((p) => seen.add(p.slug));
      const again = recommend({ baby: makeBaby(), logs, overrides: [], foods, today: day });
      expect(again.todaysPicks.map((p) => p.slug)).toEqual(rec.todaysPicks.map((p) => p.slug));
    }
    // Across a week the rotation surfaces more foods than one fixed trio.
    expect(seen.size).toBeGreaterThan(3);
  });
});

describe("R0 — pediatrician-guided early start", () => {
  const earlyBaby = (months: number, extra?: Partial<BabyProfile>) =>
    makeBaby({
      birthDate: birthDateForAgeMonths(months),
      readiness: { earlyStartApproved: true },
      ...extra,
    });

  it("4.5m + pediatrician approval, no readiness signs → ready, gets 6-month foods, early-start warning", () => {
    const rec = run({ baby: earlyBaby(4.5) });
    expect(rec.gate).toBe("ready");
    expect(rec.todaysPicks.length).toBeGreaterThan(0);
    expect(rec.warnings.some((w) => w.kind === "early-start")).toBe(true);
  });

  it("4.5m without approval → still gated, and the gate reason points at the pediatrician path", () => {
    const rec = run({
      baby: makeBaby({ birthDate: birthDateForAgeMonths(4.5), readiness: {} }),
    });
    expect(rec.gate).toBe("not-ready");
    expect(rec.gateReasons.join(" ")).toMatch(/pediatrician/i);
  });

  it("3.5m stays gated even with approval — 4 months is a hard floor", () => {
    const rec = run({ baby: earlyBaby(3.5) });
    expect(rec.gate).toBe("not-ready");
  });

  it("6.5m with approval but signs unconfirmed → ready with early-start warning", () => {
    const rec = run({ baby: earlyBaby(6.5) });
    expect(rec.gate).toBe("ready");
    expect(rec.warnings.some((w) => w.kind === "early-start")).toBe(true);
  });

  it("6.5m, signs unconfirmed, no approval → gated (unchanged behavior)", () => {
    const rec = run({
      baby: makeBaby({ birthDate: birthDateForAgeMonths(6.5), readiness: {} }),
    });
    expect(rec.gate).toBe("not-ready");
  });

  it("6.5m, signs confirmed → ready with no early-start warning", () => {
    const rec = run({ baby: makeBaby() });
    expect(rec.gate).toBe("ready");
    expect(rec.warnings.some((w) => w.kind === "early-start")).toBe(false);
  });

  it("12-month-plus foods stay excluded for an early starter (clamp is to 6 months, not beyond)", () => {
    const honey = makeFood({ slug: "honey", name: "Honey", minAgeMonths: 12 });
    const rec = run({ baby: earlyBaby(4.5), foods: [...FOODS, honey] });
    expect(rec.todaysPicks.map((p) => p.slug)).not.toContain("honey");
  });
});

describe("introduction pacing (day-level plans)", () => {
  const foods = FOODS;
  const plan: Plan = {
    babyId: "baby-1",
    anchorMonday: "2026-08-17",
    entries: [
      { id: "p1", foodSlug: "beef", weekIndex: 0, dayIndex: 0 },
      { id: "p2", foodSlug: "lentils", weekIndex: 0, dayIndex: 3 },
      { id: "p3", foodSlug: "broccoli", weekIndex: 0, dayIndex: 6 },
    ],
  };
  const anchor = new Date("2026-08-17T12:00:00Z");
  const atDay = (d: number) => new Date(anchor.getTime() + d * 86400000);
  const eaten = (slug: string, date: string): ExposureLog =>
    ({
      id: `l-${slug}`, babyId: "baby-1", foodSlug: slug, date,
      amountEaten: "some", enjoyment: "loved", symptoms: [],
    }) as unknown as ExposureLog;
  const history = [eaten("avocado", "2026-08-01"), eaten("banana", "2026-08-03")];

  const pickSlugs = (day: number) =>
    recommend({
      baby: makeBaby({ birthDate: birthDateForAgeMonths(7) }),
      logs: history, overrides: [], foods, today: atDay(day), plan,
    }).todaysPicks.map((p) => p.slug);

  it("holds one introduction steady across its observation window", () => {
    expect(pickSlugs(0)[0]).toBe("beef");
    expect(pickSlugs(1)[0]).toBe("beef");
    expect(pickSlugs(2)[0]).toBe("beef");
  });

  it("moves to the next food only when its day arrives", () => {
    expect(pickSlugs(3)[0]).toBe("lentils");
    expect(pickSlugs(6)[0]).toBe("broccoli");
  });

  it("never surfaces a food whose plan day has not arrived", () => {
    expect(pickSlugs(0)).not.toContain("lentils");
    expect(pickSlugs(0)).not.toContain("broccoli");
  });

  it("fills the remaining picks with foods the baby already eats", () => {
    const companions = pickSlugs(0).slice(1);
    for (const slug of companions) {
      expect(history.some((l) => l.foodSlug === slug)).toBe(true);
    }
  });
});
