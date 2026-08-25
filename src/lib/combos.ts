import type { Food } from "@/content-schema/food";
import type { Recipe } from "@/content-schema/recipe";
import { bandForAgeMonths } from "@/lib/food-utils";
import { COMPANION_ESTABLISHED_DAYS } from "@/lib/planner";
import { triage } from "@/lib/triage";
import type { ExposureLog } from "@/lib/storage/types";

/**
 * Foods settled enough to partner a brand-new food: eaten at least once,
 * never with allergen-pausing symptoms, and first eaten long enough ago
 * that a reaction today points at the new food rather than at this one.
 */
export function establishedSlugs(
  logs: ExposureLog[],
  now: Date,
  minDays: number = COMPANION_ESTABLISHED_DAYS,
): Set<string> {
  const firstEaten = new Map<string, string>();
  const paused = new Set<string>();
  for (const log of logs) {
    if (triage(log.symptoms).pausesAllergen) paused.add(log.foodSlug);
    if (log.amountEaten === "none") continue;
    const prev = firstEaten.get(log.foodSlug);
    if (!prev || log.date < prev) firstEaten.set(log.foodSlug, log.date);
  }
  const cutoff = new Date(now.getTime() - minDays * 86400000).toISOString().slice(0, 10);
  const established = new Set<string>();
  for (const [slug, date] of firstEaten) {
    if (!paused.has(slug) && date <= cutoff) established.add(slug);
  }
  return established;
}

/**
 * Part III D3 — combo suggester. Pure and deterministic, engine-style:
 * same input ⇒ same ranking, fully specified tie-breaks.
 *
 * Safety invariant (tested): a recipe is eligible only when EVERY
 * ingredient is (a) not blocked (known allergy, paused allergen, doctor
 * avoid, symptom hold) and (b) already established safe OR one of today's
 * picks — so suggestions never introduce food the engine wouldn't.
 */

export type RankedCombo = {
  recipe: Recipe;
  score: number;
  /** Which of today's picks this combo uses (the "serve it like this" hook). */
  usesPicks: string[];
};

export const COMBO_IRON_BONUS = 2.0;
export const COMBO_PICK_BONUS = 1.5;
export const COMBO_SAFE_BONUS = 0.25;
export const COMBO_FLAVOR_BONUS = 0.5;

export function rankCombos(input: {
  recipes: Recipe[];
  foods: Map<string, Food>;
  safeSlugs: Set<string>;
  todaysPickSlugs: string[];
  ageMonths: number;
  blockedSlugs: Set<string>;
  /**
   * Foods old enough to be companions during an introduction (see
   * `establishedSlugs`). Defaults to `safeSlugs`, which keeps the looser
   * pre-controlled-introduction behaviour for callers that don't supply it.
   */
  establishedSlugs?: Set<string>;
}): RankedCombo[] {
  const { recipes, foods, safeSlugs, todaysPickSlugs, ageMonths, blockedSlugs } = input;
  const established = input.establishedSlugs ?? safeSlugs;
  const band = bandForAgeMonths(ageMonths);
  const picks = new Set(todaysPickSlugs);

  const ranked: RankedCombo[] = [];
  for (const recipe of recipes) {
    if (!recipe.bands.includes(band)) continue;
    if (recipe.foods.some((slug) => blockedSlugs.has(slug))) continue;
    if (!recipe.foods.every((slug) => safeSlugs.has(slug) || picks.has(slug))) continue;

    // A controlled introduction: at most one unproven food on the plate, and
    // everything beside it already established, so a reaction has exactly one
    // plausible cause.
    const unproven = recipe.foods.filter((slug) => !safeSlugs.has(slug));
    if (unproven.length > 1) continue;
    if (unproven.length === 1 && !recipe.foods.every((slug) => slug === unproven[0] || established.has(slug))) {
      continue;
    }

    const usesPicks = recipe.foods.filter((slug) => picks.has(slug));
    let score = 0;
    if (recipe.ironPairing) score += COMBO_IRON_BONUS;
    score += Math.min(usesPicks.length, 2) * COMBO_PICK_BONUS;
    score += recipe.foods.filter((slug) => safeSlugs.has(slug)).length * COMBO_SAFE_BONUS;
    // Flavor coherence: content-declared pairings between ingredients.
    for (const a of recipe.foods) {
      const pairings = foods.get(a)?.flavorPairings ?? [];
      for (const b of recipe.foods) {
        if (a !== b && pairings.includes(b)) score += COMBO_FLAVOR_BONUS;
      }
    }
    ranked.push({ recipe, score, usesPicks });
  }

  return ranked.sort(
    (a, b) =>
      b.score - a.score ||
      a.recipe.foods.length - b.recipe.foods.length ||
      a.recipe.slug.localeCompare(b.recipe.slug),
  );
}
