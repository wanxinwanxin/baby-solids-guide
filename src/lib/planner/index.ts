import type { AllergenId, Food } from "@/content-schema/food";
import {
  DEFAULT_ALLERGEN_ORDER,
  deriveAllergenStates,
  eligibilityAgeMonths,
  riskTier,
} from "@/lib/engine";
import type { Locale, Msg } from "@/lib/i18n/config";
import { fmt } from "@/lib/i18n/config";
import { allergenLabel } from "@/lib/i18n/labels";
import type { AllergenOverride, BabyProfile, ExposureLog, Plan, PlanEntry } from "@/lib/storage/types";

/**
 * Phase 11 — the introduction planner. Pure and deterministic: no Date.now(),
 * no randomness; ids are derived from content.
 */

const WEEKS_PER_MONTH = 30.4375 / 7;
export const PLAN_WEEKS = 12;
export const FOODS_PER_WEEK = 4;

/** ISO date of the Monday of the week containing `date` (UTC). */
export function mondayOf(date: Date): string {
  const d = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  const day = d.getUTCDay(); // 0 = Sunday
  const diff = day === 0 ? -6 : 1 - day;
  d.setUTCDate(d.getUTCDate() + diff);
  return d.toISOString().slice(0, 10);
}

// Eligibility age (not raw corrected age): a pediatrician-guided early
// starter plans against the 6-month starter foods, same as the engine.
function ageAtWeek(baby: BabyProfile, today: Date, weekIndex: number): number {
  return eligibilityAgeMonths(baby, today) + weekIndex / WEEKS_PER_MONTH;
}

/**
 * The classic, most-protein-relevant first vehicle per allergen — the
 * suggested plan should introduce milk via yogurt, not butter.
 */
export const PREFERRED_VEHICLES: Record<AllergenId, string> = {
  peanut: "peanut-butter",
  egg: "egg",
  milk: "yogurt",
  wheat: "farina",
  soy: "tofu",
  sesame: "tahini",
  "tree-nut": "almond-butter",
  fish: "salmon",
  shellfish: "shrimp",
};

export type GeneratePlanInput = {
  baby: BabyProfile;
  foods: Food[];
  logs: ExposureLog[];
  overrides: AllergenOverride[];
  today: Date;
  weeks?: number;
};

/**
 * Suggested plan: weeks 0–1 seed iron-rich + first-pick foods; one new
 * allergen per week from week 1 (respecting risk gates); variety spread
 * across categories; already-tried foods are skipped.
 */
export function generatePlan(input: GeneratePlanInput): Plan {
  const { baby, foods, logs, overrides, today, weeks = PLAN_WEEKS } = input;
  const states = deriveAllergenStates({ baby, logs, overrides, foods });
  const tier = riskTier(baby);
  const tried = new Set(logs.filter((l) => l.amountEaten !== "none").map((l) => l.foodSlug));

  const excluded = (f: Food): boolean =>
    (f.commonAllergen !== null && baby.knownAllergies.includes(f.commonAllergen)) ||
    baby.doctorAvoidList.includes(f.slug) ||
    tried.has(f.slug);

  // Allergens still to introduce, in effective order, minus gated/paused ones.
  const order = baby.allergenOrder ?? DEFAULT_ALLERGEN_ORDER;
  const allergenQueue = order.filter((id) => {
    const state = states.get(id)!;
    if (state.status !== "not-started") return false;
    if (id === "peanut" && tier === "high" && !baby.doctorClearances.includes("peanut")) return false;
    return true;
  });

  // Non-allergen candidates, deterministic priority: iron → first picks → slug.
  const generalPool = foods
    .filter((f) => !excluded(f) && f.commonAllergen === null)
    .sort(
      (a, b) =>
        Number(b.ironRich) - Number(a.ironRich) ||
        Number(b.firstFoodPick) - Number(a.firstFoodPick) ||
        a.slug.localeCompare(b.slug),
    );

  const entries: PlanEntry[] = [];
  const used = new Set<string>();
  const push = (foodSlug: string, weekIndex: number) => {
    entries.push({ id: `plan-${foodSlug}`, foodSlug, weekIndex });
    used.add(foodSlug);
  };

  let allergenIdx = 0;
  for (let w = 0; w < weeks; w++) {
    let slots = FOODS_PER_WEEK;

    // One new allergen per week from week 1 on.
    if (w >= 1 && allergenIdx < allergenQueue.length) {
      const allergen = allergenQueue[allergenIdx];
      const preferred = PREFERRED_VEHICLES[allergen];
      const vehicle = foods
        .filter((f) => f.commonAllergen === allergen && !excluded(f) && !used.has(f.slug))
        .sort(
          (a, b) =>
            Number(b.slug === preferred) - Number(a.slug === preferred) ||
            a.slug.localeCompare(b.slug),
        )
        .find((f) => ageAtWeek(baby, today, w) >= f.minAgeMonths);
      if (vehicle) {
        push(vehicle.slug, w);
        allergenIdx++;
        slots--;
      }
    }

    for (const f of generalPool) {
      if (slots === 0) break;
      if (used.has(f.slug)) continue;
      if (ageAtWeek(baby, today, w) < f.minAgeMonths) continue;
      // Keep high-choking-risk foods out of the very first weeks.
      if (f.chokingRisk === "high" && w < 2) continue;
      push(f.slug, w);
      slots--;
    }
  }

  return { babyId: baby.id, anchorMonday: mondayOf(today), entries };
}

export type PlanWarning = {
  entryId: string;
  foodSlug: string;
  kind:
    | "known-allergy"
    | "doctor-avoid"
    | "min-age"
    | "allergen-crowding"
    | "allergen-paused"
    | "stage-caution";
  message: string;
  /** Only known-allergy blocks; everything else is parent's call. */
  blocking: boolean;
};

/**
 * Warning message templates. `en` values must stay byte-for-byte identical to
 * the historical strings (tests pin them); allergen names are inserted as raw
 * ids in en and localized labels in zh.
 */
const WARNING_MSGS: Record<PlanWarning["kind"], Msg> = {
  "known-allergy": {
    en: "{name} carries {allergen}, which is on the confirmed-allergy list — remove it from the plan.",
    zh: "{name}含有{allergen}，而它在已确认过敏清单上——请把它从计划中移除。",
  },
  "doctor-avoid": {
    en: "{name} is on your doctor-avoid list.",
    zh: "{name}在医生建议回避的清单上。",
  },
  "min-age": {
    en: "{name} is a {months}-month-plus food — the baby will be younger than that in week {week}.",
    zh: "{name}适合{months}个月以上的宝宝——到第{week}周时宝宝还没到这个月龄。",
  },
  "allergen-paused": {
    en: "The {allergen} group is currently paused — clear it with your pediatrician before planning it.",
    zh: "{allergen}这组过敏原目前处于暂停状态——请先与儿科医生确认，再安排到计划里。",
  },
  "allergen-crowding": {
    en: "{count} new allergens land in week {week} ({list}). One new allergen per week keeps reactions traceable.",
    zh: "第{week}周会同时引入{count}种新过敏原（{list}）。每周只引入一种新过敏原，出现反应时更容易追溯。",
  },
  "stage-caution": {
    en: "{name} is a high-choking-risk food — double-check the prep page before serving it this early.",
    zh: "{name}属于高窒息风险食物——这么早喂之前，请先仔细查看备餐页面。",
  },
};

export function validatePlan(
  input: {
    plan: Plan;
    baby: BabyProfile;
    foods: Food[];
    logs: ExposureLog[];
    overrides: AllergenOverride[];
    today: Date;
  },
  locale: Locale = "en",
): PlanWarning[] {
  const { plan, baby, foods, logs, overrides, today } = input;
  const t = (kind: PlanWarning["kind"], vars: Record<string, string | number>) =>
    fmt(WARNING_MSGS[kind][locale], vars);
  // en keeps the historical raw allergen ids; zh uses localized labels.
  const aName = (id: AllergenId) => (locale === "en" ? id : allergenLabel(id, locale));
  const foodBySlug = new Map(foods.map((f) => [f.slug, f]));
  const states = deriveAllergenStates({ baby, logs, overrides, foods });
  const warnings: PlanWarning[] = [];

  // First-appearance week per not-yet-started allergen.
  const firstWeek = new Map<AllergenId, { week: number; entryIds: string[] }>();
  for (const entry of [...plan.entries].sort((a, b) => a.weekIndex - b.weekIndex)) {
    const food = foodBySlug.get(entry.foodSlug);
    if (!food?.commonAllergen) continue;
    if (states.get(food.commonAllergen)!.status !== "not-started") continue;
    const existing = firstWeek.get(food.commonAllergen);
    if (!existing) firstWeek.set(food.commonAllergen, { week: entry.weekIndex, entryIds: [entry.id] });
    else if (existing.week === entry.weekIndex) existing.entryIds.push(entry.id);
  }
  const byWeek = new Map<number, AllergenId[]>();
  for (const [allergen, { week }] of firstWeek) {
    byWeek.set(week, [...(byWeek.get(week) ?? []), allergen]);
  }

  for (const entry of plan.entries) {
    const food = foodBySlug.get(entry.foodSlug);
    if (!food) continue;

    if (food.commonAllergen && baby.knownAllergies.includes(food.commonAllergen)) {
      warnings.push({
        entryId: entry.id,
        foodSlug: entry.foodSlug,
        kind: "known-allergy",
        blocking: true,
        message: t("known-allergy", { name: food.name, allergen: aName(food.commonAllergen) }),
      });
      continue;
    }
    if (baby.doctorAvoidList.includes(food.slug)) {
      warnings.push({
        entryId: entry.id,
        foodSlug: entry.foodSlug,
        kind: "doctor-avoid",
        blocking: false,
        message: t("doctor-avoid", { name: food.name }),
      });
    }
    if (ageAtWeek(baby, today, entry.weekIndex) < food.minAgeMonths) {
      warnings.push({
        entryId: entry.id,
        foodSlug: entry.foodSlug,
        kind: "min-age",
        blocking: false,
        message: t("min-age", { name: food.name, months: food.minAgeMonths, week: entry.weekIndex + 1 }),
      });
    }
    if (food.commonAllergen) {
      const state = states.get(food.commonAllergen)!;
      if (state.status === "reacted-paused" || state.status === "avoid-per-doctor") {
        warnings.push({
          entryId: entry.id,
          foodSlug: entry.foodSlug,
          kind: "allergen-paused",
          blocking: false,
          message: t("allergen-paused", { allergen: aName(food.commonAllergen) }),
        });
      }
      const crowd = byWeek.get(entry.weekIndex) ?? [];
      const first = firstWeek.get(food.commonAllergen);
      if (crowd.length > 1 && first?.week === entry.weekIndex) {
        warnings.push({
          entryId: entry.id,
          foodSlug: entry.foodSlug,
          kind: "allergen-crowding",
          blocking: false,
          message: t("allergen-crowding", {
            count: crowd.length,
            week: entry.weekIndex + 1,
            list: crowd.map(aName).join(locale === "en" ? ", " : "、"),
          }),
        });
      }
    }
    // Foods served as thin spreads or mashes are geometry-safe by preparation
    // (nut butters, ground nuts) — the stage caution would be pure noise there.
    const safeByPrep =
      food.prepSpecs[0]?.cutDiagram === "thin-spread" || food.prepSpecs[0]?.cutDiagram === "mash";
    if (food.chokingRisk === "high" && !safeByPrep && ageAtWeek(baby, today, entry.weekIndex) < 9) {
      warnings.push({
        entryId: entry.id,
        foodSlug: entry.foodSlug,
        kind: "stage-caution",
        blocking: false,
        message: t("stage-caution", { name: food.name }),
      });
    }
  }

  return warnings;
}
