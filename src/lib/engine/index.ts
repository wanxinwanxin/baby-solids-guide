import type { AgeBand, AllergenId, Food } from "@/content-schema/food";
import { ALLERGEN_IDS } from "@/content-schema/food";
import { correctedAgeMonths, daysBetween } from "@/lib/age";
import { triage } from "@/lib/triage";
import type {
  AllergenOverride,
  AllergenStatus,
  BabyProfile,
  ExposureLog,
  Plan,
  TextureStage,
} from "@/lib/storage/types";
import { TEXTURE_STAGES } from "@/lib/storage/types";

/**
 * Recommendation engine (ROADMAP §7). Pure: no I/O, no Date.now() — the
 * clock is injected via `today`. Same input ⇒ same output (tie-breaks are
 * fully specified in R9).
 */

// ——— Tunables (rule constants; each is exercised by a test) ———
export const READY_MONTHS = 6;
export const EARLY_START_MONTHS = 4;
export const IRON_DISTINCT_TARGET = 5; // R1
export const IRON_EXPOSURE_TARGET = 12; // R1
export const ALLERGEN_SUCCESS_DAYS = 3; // R2: successful solid days before first allergen
export const ALLERGEN_COOLDOWN_DAYS = 3; // R2: days between new allergens
export const MAINTENANCE_NUDGE_DAYS = 5; // R3
export const MAINTENANCE_WARN_DAYS = 14; // R3
export const RETRY_MIN_DAYS = 3; // R6
export const RETRY_MAX_ATTEMPTS = 15; // R6
export const IRON_BONUS = 2.0; // R1
export const ALLERGEN_BONUS = 1.5; // R2
export const PLAN_BONUS = 1.25; // R10
export const VARIETY_BONUS = 1.0; // R5
export const RETRY_BONUS = 0.8; // R6

export const DEFAULT_ALLERGEN_ORDER: AllergenId[] = [
  "peanut",
  "egg",
  "milk",
  "wheat",
  "soy",
  "sesame",
  "tree-nut",
  "fish",
  "shellfish",
];

/**
 * Age used for food eligibility. A pediatrician-guided early start
 * (earlyStartApproved, 4–6 months corrected) unlocks the 6-month starter
 * foods: the pediatrician's program supersedes our floor, and the first
 * prep band on every food is already the smooth texture an early starter
 * needs. Under 4 months nothing is clamped — that gate is hard.
 */
export function eligibilityAgeMonths(baby: BabyProfile, today: Date): number {
  const age = correctedAgeMonths(baby, today);
  if (
    baby.readiness.earlyStartApproved === true &&
    age >= EARLY_START_MONTHS &&
    age < READY_MONTHS
  ) {
    return READY_MONTHS;
  }
  return age;
}

export type EngineInput = {
  baby: BabyProfile;
  logs: ExposureLog[];
  overrides: AllergenOverride[];
  foods: Food[];
  today: Date;
  /** Optional 12-week plan (Phase 11) — reorders allergens and boosts planned foods (R10). */
  plan?: Plan | null;
};

/** Allergen order implied by a plan: first-appearance week, ties broken by the default order. */
export function allergenOrderFromPlan(plan: Plan, foods: Food[]): AllergenId[] {
  const allergenOfFood = new Map(foods.map((f) => [f.slug, f.commonAllergen]));
  const firstWeek = new Map<AllergenId, number>();
  for (const entry of plan.entries) {
    const allergen = allergenOfFood.get(entry.foodSlug);
    if (!allergen) continue;
    const prev = firstWeek.get(allergen);
    if (prev === undefined || entry.weekIndex < prev) firstWeek.set(allergen, entry.weekIndex);
  }
  const planned = [...firstWeek.entries()].sort(
    (a, b) =>
      a[1] - b[1] ||
      DEFAULT_ALLERGEN_ORDER.indexOf(a[0]) - DEFAULT_ALLERGEN_ORDER.indexOf(b[0]),
  );
  const rest = DEFAULT_ALLERGEN_ORDER.filter((id) => !firstWeek.has(id));
  return [...planned.map(([id]) => id), ...rest];
}

/** Which plan week `today` falls in (negative before the anchor week). */
export function planWeekIndex(plan: Plan, today: Date): number {
  return Math.floor(daysBetween(plan.anchorMonday, today) / 7);
}

export type ScoredFood = {
  slug: string;
  name: string;
  score: number;
  reason: string;
  suggestedBand: AgeBand;
};

export type Warning = {
  kind: "symptom-hold" | "hard-block" | "maintenance-lapse" | "food-hold" | "early-start";
  message: string;
  allergenId?: AllergenId;
  foodSlug?: string;
};

export type AllergenPlanItem = {
  allergenId: AllergenId;
  foodSlugs: string[];
  gated: boolean;
  gateReason?: string;
  guidance: string;
};

export type MaintenanceNudge = {
  allergenId: AllergenId;
  daysSince: number;
  message: string;
  urgent: boolean;
};

export type AllergenStateView = {
  allergenId: AllergenId;
  status: AllergenStatus;
  exposureCount: number;
  lastExposureDate?: string;
};

export type Recommendation = {
  gate: "not-ready" | "ready";
  gateReasons: string[];
  todaysPicks: ScoredFood[];
  allergenRail: { next: AllergenPlanItem | null; maintenance: MaintenanceNudge[] };
  allergenStates: AllergenStateView[];
  textureStage: { current: TextureStage; nudge?: string };
  retryQueue: ScoredFood[];
  warnings: Warning[];
};

// ——— Derivation helpers ———

type FoodStats = {
  attempts: number;
  exposures: number; // attempts where something was eaten
  lastDate?: string;
  lastEnjoyment?: ExposureLog["enjoyment"];
  hasPausingSymptoms: boolean;
};

function deriveFoodStats(logs: ExposureLog[]): Map<string, FoodStats> {
  const stats = new Map<string, FoodStats>();
  const sorted = [...logs].sort((a, b) => a.date.localeCompare(b.date));
  for (const log of sorted) {
    const s = stats.get(log.foodSlug) ?? {
      attempts: 0,
      exposures: 0,
      hasPausingSymptoms: false,
    };
    s.attempts += 1;
    if (log.amountEaten !== "none") s.exposures += 1;
    s.lastDate = log.date;
    s.lastEnjoyment = log.enjoyment;
    if (triage(log.symptoms).pausesAllergen) s.hasPausingSymptoms = true;
    stats.set(log.foodSlug, s);
  }
  return stats;
}

export function deriveAllergenStates(input: {
  baby: BabyProfile;
  logs: ExposureLog[];
  overrides: AllergenOverride[];
  foods: Food[];
}): Map<AllergenId, AllergenStateView & { firstExposureDate?: string }> {
  const { baby, logs, overrides, foods } = input;
  const allergenOfFood = new Map(foods.map((f) => [f.slug, f.commonAllergen]));
  const result = new Map<AllergenId, AllergenStateView & { firstExposureDate?: string }>();

  for (const id of ALLERGEN_IDS) {
    result.set(id, { allergenId: id, status: "not-started", exposureCount: 0 });
  }

  const sorted = [...logs].sort((a, b) => a.date.localeCompare(b.date));
  for (const log of sorted) {
    const allergen = allergenOfFood.get(log.foodSlug);
    if (!allergen) continue;
    const state = result.get(allergen)!;
    if (log.amountEaten !== "none") {
      state.exposureCount += 1;
      state.firstExposureDate ??= log.date;
      state.lastExposureDate = log.date;
    }
    if (triage(log.symptoms).pausesAllergen) state.status = "reacted-paused";
  }

  for (const id of ALLERGEN_IDS) {
    const state = result.get(id)!;
    if (state.status !== "reacted-paused") {
      state.status =
        state.exposureCount === 0
          ? "not-started"
          : state.exposureCount < 3
            ? "introducing"
            : "maintaining";
    }
    if (baby.knownAllergies.includes(id)) state.status = "avoid-per-doctor";
  }

  // Explicit user/doctor overrides win over derived state.
  for (const o of overrides) {
    const state = result.get(o.allergenId)!;
    state.status = o.status;
  }

  return result;
}

function bandForAge(food: Food, ageMonths: number): AgeBand {
  const preferred: AgeBand = ageMonths < 9 ? "6-8m" : ageMonths < 12 ? "9-12m" : "12-24m";
  if (food.prepSpecs.some((p) => p.band === preferred)) return preferred;
  return food.prepSpecs[0].band;
}

function isoDay(d: Date): string {
  return d.toISOString().slice(0, 10);
}

/** NIAID risk tier (ROADMAP §8.2). */
export function riskTier(baby: BabyProfile): "high" | "moderate" | "low" {
  if (baby.allergyRisk.eczema === "severe" || baby.allergyRisk.existingFoodAllergy) return "high";
  if (baby.allergyRisk.eczema === "mild-moderate") return "moderate";
  return "low";
}

// ——— The engine ———

export function recommend(input: EngineInput): Recommendation {
  const { baby, logs, overrides, foods, today, plan } = input;
  const age = correctedAgeMonths(baby, today);
  const stats = deriveFoodStats(logs);
  const allergenStates = deriveAllergenStates({ baby, logs, overrides, foods });
  const warnings: Warning[] = [];

  // R0 — readiness gate. Pediatrician guidance supersedes both the 6-month
  // default and the readiness checklist (many supervised programs start at
  // 4 months, before all the classic signs appear). Under 4 months stays a
  // hard floor — no supervised program starts earlier.
  const pediatricianGuided = baby.readiness.earlyStartApproved === true;
  const gateReasons: string[] = [];
  if (age < EARLY_START_MONTHS) {
    gateReasons.push(
      "Most babies are ready around 6 months (corrected age), and even pediatrician-guided programs wait until at least 4 months. It's early yet — watch for the readiness signs.",
    );
  } else if (!pediatricianGuided) {
    if (age < READY_MONTHS) {
      gateReasons.push(
        "Between 4 and 6 months, start solids only if your pediatrician specifically advised it — if they have, tell us below and you can start today.",
      );
    }
    if (!baby.readiness.confirmedAt) {
      gateReasons.push(
        "Confirm the readiness signs first: sits with minimal support, steady head control, brings objects to the mouth, shows interest in food, and the tongue-thrust reflex has faded.",
      );
    }
  }
  if (gateReasons.length > 0) {
    return {
      gate: "not-ready",
      gateReasons,
      todaysPicks: [],
      allergenRail: { next: null, maintenance: [] },
      allergenStates: [...allergenStates.values()],
      textureStage: { current: baby.textureStage },
      retryQueue: [],
      warnings,
    };
  }

  // A pediatrician-guided early starter (4–6 months) is deliberately on the
  // program before our 6-month food floor, so eligibility uses the clamped
  // age — every food's first prep band is already the smooth purée/mash an
  // early starter needs. Surface the caveat once instead of gating.
  const eligibilityAge = eligibilityAgeMonths(baby, today);
  if (pediatricianGuided && (age < READY_MONTHS || !baby.readiness.confirmedAt)) {
    warnings.push({
      kind: "early-start",
      message:
        "You're starting on your pediatrician's guidance" +
        (age < READY_MONTHS ? " before 6 months" : "") +
        ". Stick to smooth, thin textures (the first prep option on each food page) and let their advice override anything suggested here.",
    });
  }

  // ——— Exclusions (R7, R8) ———
  const excludedSlugs = new Map<string, string>(); // slug → reason
  const pausedAllergens = new Set<AllergenId>();
  for (const [id, state] of allergenStates) {
    if (state.status === "reacted-paused" || state.status === "avoid-per-doctor") {
      pausedAllergens.add(id);
    }
  }

  for (const food of foods) {
    if (eligibilityAge < food.minAgeMonths) {
      excludedSlugs.set(food.slug, `Not before ${food.minAgeMonths} months (corrected age).`);
      continue;
    }
    if (food.commonAllergen && pausedAllergens.has(food.commonAllergen)) {
      excludedSlugs.set(
        food.slug,
        `Paused: the ${food.commonAllergen} group is on hold after a logged reaction or per medical advice.`,
      );
      continue;
    }
    if (baby.doctorAvoidList.includes(food.slug)) {
      excludedSlugs.set(food.slug, "On your doctor-avoid list.");
      continue;
    }
    const s = stats.get(food.slug);
    if (s?.hasPausingSymptoms && !food.commonAllergen) {
      excludedSlugs.set(food.slug, "On hold: symptoms were logged with this food — check with your pediatrician.");
      warnings.push({
        kind: "food-hold",
        foodSlug: food.slug,
        message: `${food.name} is on hold after logged symptoms. Discuss with your pediatrician before re-offering.`,
      });
    }
  }

  for (const id of pausedAllergens) {
    const state = allergenStates.get(id)!;
    warnings.push({
      kind: "symptom-hold",
      allergenId: id,
      message:
        state.status === "avoid-per-doctor"
          ? `The ${id} group is excluded (known allergy / medical advice).`
          : `The ${id} group is paused after a logged reaction. See the reaction playbook, and clear it only after talking to your pediatrician.`,
    });
  }

  // ——— R2: next allergen ———
  const successfulDays = new Set(
    logs.filter((l) => l.amountEaten !== "none" && !triage(l.symptoms).pausesAllergen).map((l) => l.date),
  ).size;

  // Plan-derived order wins when a plan exists; then the user's manual order.
  const order =
    plan && plan.entries.length > 0
      ? allergenOrderFromPlan(plan, foods)
      : (baby.allergenOrder ?? DEFAULT_ALLERGEN_ORDER);
  const lastNewAllergenFirstExposure = [...allergenStates.values()]
    .map((s) => (s as { firstExposureDate?: string }).firstExposureDate)
    .filter((d): d is string => !!d)
    .sort()
    .at(-1);
  const daysSinceNewAllergen = lastNewAllergenFirstExposure
    ? daysBetween(lastNewAllergenFirstExposure, today)
    : Infinity;

  const tier = riskTier(baby);
  let next: AllergenPlanItem | null = null;
  const anyUnresolvedSymptoms = [...allergenStates.values()].some((s) => s.status === "reacted-paused");

  const nextCandidate = order.find((id) => allergenStates.get(id)!.status === "not-started");
  if (nextCandidate) {
    const candidateFoods = foods
      .filter((f) => f.commonAllergen === nextCandidate && !excludedSlugs.has(f.slug))
      .map((f) => f.slug)
      .sort();
    const gatedByRisk =
      tier === "high" && nextCandidate === "peanut" && !baby.doctorClearances.includes("peanut");
    if (gatedByRisk) {
      next = {
        allergenId: "peanut",
        foodSlugs: [],
        gated: true,
        gateReason:
          "Severe eczema or an existing food allergy puts your baby in the higher-risk group for peanut allergy. Talk to your pediatrician or allergist before introducing peanut — they may recommend testing or a supervised first exposure, ideally around 4–6 months. Once they clear you, confirm it in the allergen tracker.",
        guidance: "Talk to your pediatrician first, then confirm clearance in the tracker.",
      };
    } else if (
      successfulDays >= ALLERGEN_SUCCESS_DAYS &&
      !anyUnresolvedSymptoms &&
      daysSinceNewAllergen >= ALLERGEN_COOLDOWN_DAYS &&
      candidateFoods.length > 0
    ) {
      next = {
        allergenId: nextCandidate,
        foodSlugs: candidateFoods,
        gated: false,
        guidance:
          "Serve early in the day so you can watch for a reaction for the next 2 hours, alongside familiar foods — never with another brand-new food.",
      };
    } else if (candidateFoods.length > 0 || successfulDays < ALLERGEN_SUCCESS_DAYS) {
      const why =
        successfulDays < ALLERGEN_SUCCESS_DAYS
          ? `Get ${ALLERGEN_SUCCESS_DAYS} smooth days of solids in first, then start ${nextCandidate}.`
          : anyUnresolvedSymptoms
            ? "Resolve the paused reaction before starting a new allergen."
            : `Wait ${Math.ceil(ALLERGEN_COOLDOWN_DAYS - daysSinceNewAllergen)} more day(s) after the last new allergen before starting ${nextCandidate}.`;
      next = {
        allergenId: nextCandidate,
        foodSlugs: [],
        gated: true,
        gateReason: why,
        guidance: why,
      };
    }
  }

  // ——— R3: maintenance nudges ———
  const maintenance: MaintenanceNudge[] = [];
  for (const [id, state] of allergenStates) {
    if (state.status !== "maintaining" || !state.lastExposureDate) continue;
    const days = Math.floor(daysBetween(state.lastExposureDate, today));
    if (days > MAINTENANCE_WARN_DAYS) {
      maintenance.push({
        allergenId: id,
        daysSince: days,
        urgent: true,
        message: `It's been ${days} days since ${id}. Consistent ongoing exposure (about twice a week) is what maintains tolerance — get it back in the rotation soon.`,
      });
      warnings.push({
        kind: "maintenance-lapse",
        allergenId: id,
        message: `${id} hasn't been served in ${days} days — long gaps can undo the benefit of early introduction.`,
      });
    } else if (days > MAINTENANCE_NUDGE_DAYS) {
      maintenance.push({
        allergenId: id,
        daysSince: days,
        urgent: false,
        message: `Keep ${id} in the rotation — aim for about twice a week (last served ${days} days ago).`,
      });
    }
  }
  maintenance.sort((a, b) => b.daysSince - a.daysSince || a.allergenId.localeCompare(b.allergenId));

  // ——— R1 iron pressure ———
  const ironFoods = foods.filter((f) => f.ironRich);
  const ironDistinct = ironFoods.filter((f) => (stats.get(f.slug)?.exposures ?? 0) > 0).length;
  const ironExposures = ironFoods.reduce((n, f) => n + (stats.get(f.slug)?.exposures ?? 0), 0);
  const ironPressure = ironDistinct < IRON_DISTINCT_TARGET || ironExposures < IRON_EXPOSURE_TARGET;

  // ——— R5 variety pressure ———
  const recentCutoff = isoDay(new Date(today.getTime() - 7 * 86400000));
  const recentCategories = new Set(
    logs
      .filter((l) => l.date >= recentCutoff)
      .map((l) => foods.find((f) => f.slug === l.foodSlug)?.category)
      .filter(Boolean),
  );

  // ——— R6 retry queue ———
  const retryQueue: ScoredFood[] = [];
  for (const food of foods) {
    if (excludedSlugs.has(food.slug)) continue;
    const s = stats.get(food.slug);
    if (!s?.lastDate) continue;
    if (s.lastEnjoyment !== "refused" && s.lastEnjoyment !== "disliked") continue;
    if (s.attempts >= RETRY_MAX_ATTEMPTS) continue;
    if (daysBetween(s.lastDate, today) < RETRY_MIN_DAYS) continue;
    retryQueue.push({
      slug: food.slug,
      name: food.name,
      score: RETRY_BONUS,
      suggestedBand: bandForAge(food, age),
      reason: `Refused ${s.attempts} time(s) so far — normal! Try a different prep or pair it with ${food.flavorPairings[0] ?? "a favorite"}. It can take 8–15 tries.`,
    });
  }
  retryQueue.sort(
    (a, b) => (stats.get(a.slug)!.attempts - stats.get(b.slug)!.attempts) || a.slug.localeCompare(b.slug),
  );

  // ——— R10: foods planned for the current week ———
  const currentWeek = plan && plan.entries.length > 0 ? planWeekIndex(plan, today) : null;
  const plannedThisWeek = new Set(
    currentWeek === null
      ? []
      : plan!.entries.filter((e) => e.weekIndex === currentWeek).map((e) => e.foodSlug),
  );

  // ——— R9 scoring ———
  const eligibleNextAllergen = next && !next.gated ? next.allergenId : null;
  const scored: ScoredFood[] = [];
  for (const food of foods) {
    if (excludedSlugs.has(food.slug)) continue;
    // New-allergen foods live on the allergen rail until their allergen is eligible.
    const state = food.commonAllergen ? allergenStates.get(food.commonAllergen)! : null;
    if (state && state.status === "not-started" && food.commonAllergen !== eligibleNextAllergen) continue;

    let score = 1.0;
    let reason = `A good fit for ${bandForAge(food, age)} right now.`;
    if (!recentCategories.has(food.category)) {
      score += VARIETY_BONUS;
      reason = `Nothing from the ${food.category} group this week — variety builds acceptance.`;
    }
    const s = stats.get(food.slug);
    if (
      s?.lastDate &&
      (s.lastEnjoyment === "refused" || s.lastEnjoyment === "disliked") &&
      daysBetween(s.lastDate, today) >= RETRY_MIN_DAYS &&
      s.attempts < RETRY_MAX_ATTEMPTS
    ) {
      score += RETRY_BONUS;
    }
    if (food.commonAllergen && food.commonAllergen === eligibleNextAllergen) {
      score += ALLERGEN_BONUS;
      reason = `Time to introduce ${food.commonAllergen}: serve early in the day and watch for 2 hours.`;
    }
    if (food.ironRich && ironPressure) {
      score += IRON_BONUS;
      reason = "Iron stores dip around 6 months — iron-rich foods are the priority.";
    }
    // R10 last: when a food is both planned and otherwise prioritized, the
    // user's own plan is the clearest reason to surface.
    if (plannedThisWeek.has(food.slug)) {
      score += PLAN_BONUS;
      reason = "On your plan for this week.";
    }
    scored.push({
      slug: food.slug,
      name: food.name,
      score,
      reason,
      suggestedBand: bandForAge(food, age),
    });
  }
  const isFirstPick = new Map(foods.map((f) => [f.slug, f.firstFoodPick]));
  scored.sort(
    (a, b) =>
      b.score - a.score ||
      (stats.get(a.slug)?.exposures ?? 0) - (stats.get(b.slug)?.exposures ?? 0) ||
      Number(isFirstPick.get(b.slug) ?? false) - Number(isFirstPick.get(a.slug) ?? false) ||
      a.slug.localeCompare(b.slug),
  );
  const todaysPicks = scored.slice(0, 3);

  // ——— R4 texture progression ———
  const stageIdx = TEXTURE_STAGES.findIndex((s) => s.id === baby.textureStage);
  const nextStage = TEXTURE_STAGES[stageIdx + 1];
  let nudge: string | undefined;
  if (nextStage && age >= nextStage.minAgeMonths) {
    const recent = [...logs].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 10);
    const ateWell = recent.filter((l) => l.amountEaten === "some" || l.amountEaten === "lots").length;
    const gaggingCount = recent.filter((l) => l.gagging).length;
    const noSymptoms = recent.every((l) => !triage(l.symptoms).pausesAllergen);
    if (recent.length >= 10 && ateWell >= 8 && gaggingCount <= 2 && noSymptoms) {
      nudge = `Ready for the next texture? The last ${recent.length} logs show confident eating. Consider moving to ${nextStage.id}: ${nextStage.label.toLowerCase()} (${nextStage.typicalAge}). You confirm the switch — the app never auto-advances.`;
    }
  }

  return {
    gate: "ready",
    gateReasons: [],
    todaysPicks,
    allergenRail: { next, maintenance },
    allergenStates: [...allergenStates.values()].map(({ allergenId, status, exposureCount, lastExposureDate }) => ({
      allergenId,
      status,
      exposureCount,
      lastExposureDate,
    })),
    textureStage: { current: baby.textureStage, nudge },
    retryQueue: retryQueue.slice(0, 5),
    warnings,
  };
}
