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
import { entryDay, INTRO_SPACING_DAYS } from "@/lib/plan-progress";
import type { AllergenOverride, BabyProfile, ExposureLog, Plan, PlanEntry } from "@/lib/storage/types";

/**
 * Phase 11 — the introduction planner. Pure and deterministic: no Date.now(),
 * no randomness; ids are derived from content.
 */

const WEEKS_PER_MONTH = 30.4375 / 7;
const DAYS_PER_MONTH = 30.4375;
export const PLAN_WEEKS = 12;

/** Days a food must sit reaction-free before it may partner a new food. */
export const COMPANION_ESTABLISHED_DAYS = 7;

// The spacing rule and the entry→day accessor live in lib/plan-progress, the
// module that reconciles a written plan with what was actually logged. They
// are re-exported here so every planner caller keeps one import.
export { INTRO_SPACING_DAYS, entryDay } from "@/lib/plan-progress";

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

function ageAtDay(baby: BabyProfile, today: Date, dayIndex: number): number {
  return eligibilityAgeMonths(baby, today) + dayIndex / DAYS_PER_MONTH;
}

/**
 * Lay an ordered list of foods onto the calendar, each starting after the
 * previous one's observation window. This is the single place day slots are
 * assigned, so every edit path (generate, add, move, remove) produces a
 * plan with the same spacing guarantee.
 */
export function scheduleSlugs(
  orderedSlugs: string[],
  _foodBySlug?: Map<string, Food>,
  startDay = 0,
): PlanEntry[] {
  const entries: PlanEntry[] = [];
  let day = startDay;
  for (const foodSlug of orderedSlugs) {
    entries.push({
      id: `plan-${foodSlug}`,
      foodSlug,
      dayIndex: day,
      weekIndex: Math.floor(day / 7),
    });
    day += INTRO_SPACING_DAYS;
  }
  return entries;
}

/** The plan's foods in schedule order, de-duplicated. */
export function planOrder(plan: Plan): string[] {
  const ordered = [...plan.entries]
    .map((entry, i) => ({ entry, i }))
    .sort((a, b) => entryDay(a.entry) - entryDay(b.entry) || a.i - b.i)
    .map(({ entry }) => entry.foodSlug);
  return [...new Set(ordered)];
}

/**
 * Day the plan may start on. A plan for a baby who is not yet old enough
 * begins partway down the calendar; edits must not slide foods back in
 * front of that gate.
 */
export function planStartDay(plan: Plan): number {
  return plan.entries.length === 0 ? 0 : Math.min(...plan.entries.map(entryDay));
}

/**
 * Give day slots to a plan written before day-level scheduling existed.
 * Those entries carry only a weekIndex, so `entryDay` collapses every food
 * in a week onto the same day — the board then shows one repeated date and
 * keeps the old four-a-week packing. Re-spacing them in place fixes both.
 */
export function migrateLegacyPlan(plan: Plan): Plan {
  if (plan.entries.every((entry) => entry.dayIndex !== undefined)) return plan;
  return {
    ...plan,
    entries: scheduleSlugs(planOrder(plan), undefined, planStartDay(plan)),
  };
}

/** Re-space an existing plan without changing the order the parent chose. */
export function reflowPlan(plan: Plan, foodBySlug?: Map<string, Food>): Plan {
  return {
    ...plan,
    entries: scheduleSlugs(planOrder(plan), foodBySlug, planStartDay(plan)),
  };
}

/**
 * Put a food into a week and re-space everything after it. A food appears
 * once, so dropping it into an earlier week also lifts it out of the later
 * one — and the foods behind it slide back by exactly one observation
 * window rather than bunching up.
 */
export function addFoodToWeek(
  plan: Plan,
  foodSlug: string,
  weekIndex: number,
  foodBySlug: Map<string, Food>,
): Plan {
  const start = planStartDay(plan);
  const order = planOrder(plan).filter((slug) => slug !== foodSlug);

  // Inserting at position i gives the food day `start + i * spacing`. Take the
  // last position that still lands inside the requested week, so the food
  // joins the end of that week and only the foods behind it shift.
  const weekOf = (i: number) => Math.floor((start + i * INTRO_SPACING_DAYS) / 7);
  const slots = [...Array(order.length + 1).keys()].filter((i) => weekOf(i) === weekIndex);
  const at = slots.length
    ? slots[slots.length - 1]
    : weekIndex * 7 < start
      ? 0 // requested week is before this plan can start
      : order.length; // requested week is past the end of the plan

  order.splice(at, 0, foodSlug);
  return { ...plan, entries: scheduleSlugs(order, foodBySlug, start) };
}

export function removeFoodFromPlan(
  plan: Plan,
  foodSlug: string,
  foodBySlug: Map<string, Food>,
): Plan {
  const order = planOrder(plan).filter((slug) => slug !== foodSlug);
  return { ...plan, entries: scheduleSlugs(order, foodBySlug, planStartDay(plan)) };
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

/**
 * How the order of non-allergen foods is decided, in the order it reads on
 * the board:
 *  1. Iron leads. Stores laid down in the womb run out around six months,
 *     so the opening foods are iron-rich; the pull fades once a few are in
 *     rather than dragging every iron-rich food to the front.
 *  2. Curated first-food picks, whose textures are the easiest to get right.
 *  3. Category rotation, so the plan reads as a varied diet instead of an
 *     alphabetical run through one food group.
 * Ties break on slug, keeping the whole thing deterministic.
 */
const IRON_LEAD_PICKS = 6;
const RECENT_CATEGORY_MEMORY = 4;

function generalScore(food: Food, position: number, recent: string[]): number {
  let score = 0;
  if (food.ironRich) score += position < IRON_LEAD_PICKS ? 6 : 1;
  if (food.firstFoodPick) score += position < IRON_LEAD_PICKS ? 2 : 1;
  const seenAt = recent.indexOf(food.category);
  if (seenAt !== -1) score -= recent.length - seenAt;
  return score;
}

export type GeneratePlanInput = {
  baby: BabyProfile;
  foods: Food[];
  logs: ExposureLog[];
  overrides: AllergenOverride[];
  today: Date;
  weeks?: number;
};

/**
 * Suggested plan: iron-rich foods open the first week, one new allergen
 * lands per week from week 1 (respecting risk gates), and the rest rotates
 * through the food groups. Already-tried foods are skipped, and every pick
 * is spaced by its observation window.
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

  const generalPool = foods.filter((f) => !excluded(f) && f.commonAllergen === null);

  // Walk the calendar day by day rather than filling week buckets: each
  // pick consumes its own observation window, so the number of foods a week
  // holds falls out of the spacing instead of being assumed.
  const entries: PlanEntry[] = [];
  const used = new Set<string>();
  const recentCategories: string[] = []; // most recent first
  const horizon = weeks * 7;
  let allergenIdx = 0;
  let lastAllergenWeek = -1;
  let day = 0;

  while (day < horizon) {
    const week = Math.floor(day / 7);
    const age = ageAtDay(baby, today, day);
    let chosen: Food | undefined;

    // At most one new allergen per week, from week 1 on.
    if (week >= 1 && week > lastAllergenWeek && allergenIdx < allergenQueue.length) {
      const allergen = allergenQueue[allergenIdx];
      const preferred = PREFERRED_VEHICLES[allergen];
      chosen = foods
        .filter((f) => f.commonAllergen === allergen && !excluded(f) && !used.has(f.slug))
        .sort(
          (a, b) =>
            Number(b.slug === preferred) - Number(a.slug === preferred) ||
            a.slug.localeCompare(b.slug),
        )
        .find((f) => age >= f.minAgeMonths);
      if (chosen) {
        allergenIdx++;
        lastAllergenWeek = week;
      }
    }

    if (!chosen) {
      // Slug order first, so the strict > below keeps the alphabetically
      // first food among equal scores and the plan stays deterministic.
      const eligible = generalPool
        .filter(
          (f) =>
            !used.has(f.slug) &&
            age >= f.minAgeMonths &&
            // Keep high-choking-risk foods out of the very first weeks.
            !(f.chokingRisk === "high" && week < 2),
        )
        .sort((a, b) => a.slug.localeCompare(b.slug));
      for (const candidate of eligible) {
        if (
          !chosen ||
          generalScore(candidate, entries.length, recentCategories) >
            generalScore(chosen, entries.length, recentCategories)
        ) {
          chosen = candidate;
        }
      }
    }

    if (!chosen) {
      day += 1; // nothing eligible yet — the age gate may open tomorrow
      continue;
    }
    // Keep the day the walk actually landed on — re-laying the sequence from
    // day 0 here would erase the wait while an age gate was still shut.
    entries.push({
      id: `plan-${chosen.slug}`,
      foodSlug: chosen.slug,
      dayIndex: day,
      weekIndex: Math.floor(day / 7),
    });
    used.add(chosen.slug);
    recentCategories.unshift(chosen.category);
    recentCategories.length = Math.min(recentCategories.length, RECENT_CATEGORY_MEMORY);
    day += INTRO_SPACING_DAYS;
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
