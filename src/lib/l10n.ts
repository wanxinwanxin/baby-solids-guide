import type { AllergenProgram, Food, Guide } from "@/content-schema/food";
import type { Recipe } from "@/content-schema/recipe";
import type { Locale } from "@/lib/i18n/config";
import { mergeAllergen, mergeFood, mergeGuide, mergeRecipe } from "./l10n-merge";
import { ZH_FOODS } from "../../content/i18n/zh/foods";
import { ZH_RECIPES } from "../../content/i18n/zh/recipes";
import { ZH_GUIDES } from "../../content/i18n/zh/guides";
import { ZH_ALLERGENS } from "../../content/i18n/zh/allergens";

/**
 * Server-side content localization: applies the zh overlays (imported
 * statically — server bundles only) to English base content at the
 * server-component boundary, so client bundles receive just the rendered
 * language. Client components that read the bundled corpus directly use
 * the lazy-loading hooks in src/lib/i18n/content-client.ts instead.
 */

export function localizeFood(food: Food, locale: Locale): Food {
  return locale === "zh" ? mergeFood(food, ZH_FOODS[food.slug]) : food;
}

export function localizeRecipe(recipe: Recipe, locale: Locale): Recipe {
  return locale === "zh" ? mergeRecipe(recipe, ZH_RECIPES[recipe.slug]) : recipe;
}

export function localizeGuide(guide: Guide, locale: Locale): Guide {
  return locale === "zh" ? mergeGuide(guide, ZH_GUIDES[guide.slug]) : guide;
}

export function localizeAllergen(program: AllergenProgram, locale: Locale): AllergenProgram {
  return locale === "zh" ? mergeAllergen(program, ZH_ALLERGENS[program.id]) : program;
}

export function localizeFoods(foods: Food[], locale: Locale): Food[] {
  return locale === "zh" ? foods.map((f) => localizeFood(f, locale)) : foods;
}

export function localizeRecipes(recipes: Recipe[], locale: Locale): Recipe[] {
  return locale === "zh" ? recipes.map((r) => localizeRecipe(r, locale)) : recipes;
}

export function localizeGuides(guides: Guide[], locale: Locale): Guide[] {
  return locale === "zh" ? guides.map((g) => localizeGuide(g, locale)) : guides;
}

export function localizeAllergens(programs: AllergenProgram[], locale: Locale): AllergenProgram[] {
  return locale === "zh" ? programs.map((p) => localizeAllergen(p, locale)) : programs;
}
