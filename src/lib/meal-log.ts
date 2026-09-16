import type { AgeBand, AllergenId, Food } from "@/content-schema/food";
import { AGE_BANDS } from "@/content-schema/food";
import { bandForAgeMonths, customFoodSlug } from "@/lib/food-utils";
import type {
  AmountEaten,
  Enjoyment,
  ExposureLog,
  FeedQuantity,
  MealSlot,
  SymptomId,
} from "@/lib/storage/types";

/**
 * A meal of several foods, saved in one pass (parent request, 2026-09-16).
 *
 * The store keeps one row per food, because the allergen engine, the
 * check-ins, the gallery, and insights all key off a single `foodSlug`. A
 * meal is therefore N exposure logs that share the date, the time, the
 * amount, the reaction, the symptoms, and the photo, and differ only in the
 * food and the prep stage that food was served at.
 *
 * The parent who typed "鸡蛋红薯" as one custom food lost both the egg
 * check-in and the nutrient tags of each half of that plate. Two rows keep
 * both, and the parent still fills the form once.
 */

/** A food a parent picked, stored as a reference so a locale change re-resolves it. */
export type MealPick = { kind: "content"; slug: string } | { kind: "custom"; name: string };

/** A picked food with its content entry attached. */
export type MealFood = { kind: "content"; food: Food } | { kind: "custom"; name: string };

/** The slug a picked food logs under. */
export function mealPickKey(pick: MealPick): string {
  return pick.kind === "content" ? pick.slug : customFoodSlug(pick.name);
}

/** The slug a resolved food logs under. */
export function mealFoodKey(picked: MealFood): string {
  return picked.kind === "content" ? picked.food.slug : customFoodSlug(picked.name);
}

/** The name to show for a picked food. */
export function mealFoodName(picked: MealFood): string {
  return picked.kind === "content" ? picked.food.name : picked.name.trim();
}

/** Add `pick` to a meal, unless that food is in the meal already. */
export function addMealPick(picks: MealPick[], pick: MealPick): MealPick[] {
  const key = mealPickKey(pick);
  return picks.some((p) => mealPickKey(p) === key) ? picks : [...picks, pick];
}

/** Drop the food with this slug from a meal. */
export function removeMealPick(picks: MealPick[], key: string): MealPick[] {
  return picks.filter((p) => mealPickKey(p) !== key);
}

/**
 * Attach the content entry to each pick. A slug with no entry is dropped:
 * the food index arrives with the page, and a stale link is not a food.
 */
export function resolveMealPicks(
  picks: MealPick[],
  foodBySlug: Map<string, Food>,
): MealFood[] {
  const resolved: MealFood[] = [];
  for (const pick of picks) {
    if (pick.kind === "custom") {
      resolved.push({ kind: "custom", name: pick.name });
      continue;
    }
    const food = foodBySlug.get(pick.slug);
    if (food) resolved.push({ kind: "content", food });
  }
  return resolved;
}

/** The content foods in a meal, in the order the parent picked them. */
export function contentFoods(picked: MealFood[]): Food[] {
  return picked.flatMap((p) => (p.kind === "content" ? [p.food] : []));
}

/**
 * The prep stages to offer for a meal, in age order. A stage appears when at
 * least one food in the meal is served at it, so a meal of one food offers
 * exactly that food's own stages.
 */
export function mealBands(picked: MealFood[]): AgeBand[] {
  const bands = new Set<AgeBand>();
  for (const food of contentFoods(picked)) for (const spec of food.prepSpecs) bands.add(spec.band);
  return AGE_BANDS.filter((band) => bands.has(band));
}

/**
 * The stage to record for one food. A meal carries one stage choice, but a
 * food is served only at the stages it has a prep spec for, so a food without
 * the chosen stage falls back to the stage that suits the baby's age.
 */
export function bandForFood(food: Food, chosen: AgeBand | null, ageMonths: number): AgeBand {
  if (chosen && food.prepSpecs.some((p) => p.band === chosen)) return chosen;
  const forAge = bandForAgeMonths(ageMonths);
  return food.prepSpecs.find((p) => p.band === forAge)?.band ?? food.prepSpecs[0].band;
}

/**
 * The foods a check-in watches after this meal. A common allergen is what a
 * two-hour check is for, so every allergen in the meal is watched. A meal of
 * familiar foods is watched through its first food alone, because four
 * reminders at the same minute help nobody.
 */
export function foodsToWatch(picked: MealFood[]): Food[] {
  const content = contentFoods(picked);
  const allergenFoods = content.filter((f) => f.commonAllergen);
  return allergenFoods.length > 0 ? allergenFoods : content.slice(0, 1);
}

/**
 * The allergens this meal gives the baby for the first time. Guidance is one
 * new allergen at a time: a second one in the same meal makes a reaction
 * impossible to attribute, so the parent hears about it before the save, not
 * after. `isIntroduced` comes from the allergen engine.
 */
export function newAllergensInMeal(
  picked: MealFood[],
  isIntroduced: (allergen: AllergenId) => boolean,
): AllergenId[] {
  const out: AllergenId[] = [];
  for (const food of contentFoods(picked)) {
    const allergen = food.commonAllergen;
    if (allergen && !isIntroduced(allergen) && !out.includes(allergen)) out.push(allergen);
  }
  return out;
}

/** Everything one meal holds, before it becomes rows. */
export type MealDraft = {
  babyId: string;
  foods: MealFood[];
  date: string;
  /** The stage the parent picked for the meal. Null means "suit the age". */
  band: AgeBand | null;
  ageMonths: number;
  amountEaten: AmountEaten;
  enjoyment: Enjoyment;
  gagging: boolean;
  symptoms: SymptomId[];
  symptomOnset?: ExposureLog["symptomOnset"];
  time?: string;
  mealSlot?: MealSlot;
  quantity?: FeedQuantity;
  notes?: string;
  /** One photo of the plate. Every food in the meal points at it. */
  photoId?: string;
  /** Id source, injected so the rows stay predictable in a test. */
  newId: () => string;
};

/** One exposure log per food, sharing everything the meal has in common. */
export function buildMealLogs(draft: MealDraft): ExposureLog[] {
  return draft.foods.map((picked) => ({
    id: draft.newId(),
    babyId: draft.babyId,
    foodSlug: mealFoodKey(picked),
    customFoodName: picked.kind === "custom" ? picked.name.trim() : undefined,
    date: draft.date,
    time: draft.time,
    mealSlot: draft.mealSlot,
    quantity: draft.quantity,
    notes: draft.notes,
    photoId: draft.photoId,
    // A custom food has no prep specs to check the choice against, so it
    // records the meal's stage, or the stage that suits the age.
    prepBandUsed:
      picked.kind === "content"
        ? bandForFood(picked.food, draft.band, draft.ageMonths)
        : (draft.band ?? bandForAgeMonths(draft.ageMonths)),
    amountEaten: draft.amountEaten,
    enjoyment: draft.enjoyment,
    gagging: draft.gagging,
    symptoms: draft.symptoms,
    symptomOnset: draft.symptomOnset,
  }));
}
