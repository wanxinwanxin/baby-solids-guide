import type { Food } from "@/content-schema/food";
import type { Recipe } from "@/content-schema/recipe";
import { establishedSlugs, rankCombos, type RankedCombo } from "@/lib/combos";
import { localIsoDate } from "@/lib/food-utils";
import type { ExposureLog } from "@/lib/storage/types";

/**
 * Weekly menu (2026-09-15, from user feedback): "如果可以根据计划的食物和已经
 * 排敏成功的食物来推荐一周食谱那就更好了". A parent already sees one day of
 * combos on Today. This module spreads the same idea across the coming week,
 * so the plan board answers "what do I actually cook" and not only "what do I
 * introduce".
 *
 * Every day is one `rankCombos` call, so the safety invariant is the one that
 * module already carries and tests: a recipe appears only when every
 * ingredient is unblocked, and at most one ingredient is unproven — that day's
 * planned introduction. Nothing here loosens it.
 *
 * Pure and deterministic, engine-style: no Date.now(), no randomness. The
 * clock is `today`.
 */

const DAY_MS = 86400000;
const DAYS_PER_MONTH = 30.4375;

export const MENU_DAYS = 7;
export const MENU_PER_DAY = 2;

export type MenuDay = {
  /** ISO date of this day, local calendar. */
  date: string;
  /** Days from today: 0 is today, 6 is the last day of the week. */
  dayIndex: number;
  /** The plan's introduction for this day, when it has one. */
  newFoodSlug?: string;
  /** Recipes for this day, best first, de-duplicated across the week. */
  combos: RankedCombo[];
};

export type WeeklyMenu = {
  days: MenuDay[];
  /** Days that produced at least one recipe. */
  daysWithFood: number;
  /** Distinct recipes across the whole week. */
  recipeCount: number;
};

/**
 * Pick this day's recipes, preferring ones the week has not used yet. A
 * repeat is allowed only when the pantry is too small to fill the day, which
 * is the honest answer early on — the alternative is an empty day.
 */
function pickForDay(ranked: RankedCombo[], used: Set<string>, perDay: number): RankedCombo[] {
  const fresh = ranked.filter((c) => !used.has(c.recipe.slug));
  const repeats = ranked.filter((c) => used.has(c.recipe.slug));
  return [...fresh, ...repeats].slice(0, perDay);
}

export function weeklyMenu(input: {
  recipes: Recipe[];
  foods: Map<string, Food>;
  logs: ExposureLog[];
  /** The cleared pantry: eaten at least once, never with pausing symptoms. */
  safeSlugs: Set<string>;
  /** The engine's exclusions, exactly as Today builds them. */
  blockedSlugs: Set<string>;
  /** ISO date → the food the plan introduces that day. */
  plannedByDate: Map<string, string>;
  /** Corrected age in months on `today`; each later day adds its own share. */
  ageMonths: number;
  today: Date;
  days?: number;
  perDay?: number;
}): WeeklyMenu {
  const days = input.days ?? MENU_DAYS;
  const perDay = input.perDay ?? MENU_PER_DAY;
  // Companions are judged as of today. A food introduced later this week is
  // not established by Friday, and pretending otherwise would put two
  // unproven foods on one plate.
  const established = establishedSlugs(input.logs, input.today);

  const used = new Set<string>();
  const out: MenuDay[] = [];

  for (let dayIndex = 0; dayIndex < days; dayIndex += 1) {
    const date = localIsoDate(new Date(input.today.getTime() + dayIndex * DAY_MS));
    const newFoodSlug = input.plannedByDate.get(date);
    const ranked = rankCombos({
      recipes: input.recipes,
      foods: input.foods,
      safeSlugs: input.safeSlugs,
      establishedSlugs: established,
      todaysPickSlugs: newFoodSlug ? [newFoodSlug] : [],
      ageMonths: input.ageMonths + dayIndex / DAYS_PER_MONTH,
      blockedSlugs: input.blockedSlugs,
    });
    const combos = pickForDay(ranked, used, perDay);
    for (const combo of combos) used.add(combo.recipe.slug);
    out.push({ date, dayIndex, newFoodSlug, combos });
  }

  return {
    days: out,
    daysWithFood: out.filter((d) => d.combos.length > 0).length,
    recipeCount: used.size,
  };
}
