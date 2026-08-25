"use client";

import { useEffect, useMemo, useState } from "react";
import type { AllergenProgram, Food } from "@/content-schema/food";
import type { Recipe } from "@/content-schema/recipe";
import type { AllergenL10n, FoodL10n, RecipeL10n } from "@/content-schema/l10n";
import { allFoods, foodBySlug } from "../../../content/foods";
import { allRecipes, recipeBySlug } from "../../../content/recipes";
import { allergenPrograms } from "../../../content/allergens";
import { mergeAllergen, mergeFood, mergeRecipe } from "../l10n-merge";
import { useLocale } from "./LocaleProvider";

/**
 * Localized content for CLIENT components that read the bundled English
 * corpus directly (today, plan, log, history, insights, allergens tracker,
 * import flow). The zh overlays load through a dynamic import, so they live
 * in their own chunk that English users never download. While the chunk is
 * in flight (or during SSR) the English corpus renders, then the page
 * re-renders localized — the same progressive pattern these pages already
 * use for zustand hydration.
 */

type ZhContent = {
  foods: Record<string, FoodL10n>;
  recipes: Record<string, RecipeL10n>;
  allergens: Record<string, AllergenL10n>;
};

let cached: ZhContent | null = null;

function useZhContent(): ZhContent | null {
  const locale = useLocale();
  const [zh, setZh] = useState<ZhContent | null>(cached);
  useEffect(() => {
    if (locale !== "zh" || cached) return;
    let alive = true;
    Promise.all([
      import("../../../content/i18n/zh/foods"),
      import("../../../content/i18n/zh/recipes"),
      import("../../../content/i18n/zh/allergens"),
    ]).then(([f, r, a]) => {
      cached = { foods: f.ZH_FOODS, recipes: r.ZH_RECIPES, allergens: a.ZH_ALLERGENS };
      if (alive) setZh(cached);
    });
    return () => {
      alive = false;
    };
  }, [locale]);
  return locale === "zh" ? zh : null;
}

/** Drop-in localized replacement for `allFoods` / `foodBySlug`. */
export function useL10nFoods(): { foods: Food[]; foodBySlug: Map<string, Food> } {
  const zh = useZhContent();
  return useMemo(() => {
    if (!zh) return { foods: allFoods, foodBySlug };
    const foods = allFoods.map((f) => mergeFood(f, zh.foods[f.slug]));
    return { foods, foodBySlug: new Map(foods.map((f) => [f.slug, f])) };
  }, [zh]);
}

/** Drop-in localized replacement for `allRecipes` / `recipeBySlug`. */
export function useL10nRecipes(): { recipes: Recipe[]; recipeBySlug: Map<string, Recipe> } {
  const zh = useZhContent();
  return useMemo(() => {
    if (!zh) return { recipes: allRecipes, recipeBySlug };
    const recipes = allRecipes.map((r) => mergeRecipe(r, zh.recipes[r.slug]));
    return { recipes, recipeBySlug: new Map(recipes.map((r) => [r.slug, r])) };
  }, [zh]);
}

/** Drop-in localized replacement for `allergenPrograms`. */
export function useL10nAllergens(): AllergenProgram[] {
  const zh = useZhContent();
  return useMemo(() => {
    if (!zh) return allergenPrograms;
    return allergenPrograms.map((p) => mergeAllergen(p, zh.allergens[p.id]));
  }, [zh]);
}
