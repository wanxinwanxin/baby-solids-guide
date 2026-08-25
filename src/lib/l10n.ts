import type { AllergenProgram, Food, Guide } from "@/content-schema/food";
import type { Recipe } from "@/content-schema/recipe";
import type { AllergenL10n, FoodL10n, GuideL10n, RecipeL10n } from "@/content-schema/l10n";
import type { Locale } from "@/lib/i18n/config";
import { ZH_FOODS } from "../../content/i18n/zh/foods";
import { ZH_RECIPES } from "../../content/i18n/zh/recipes";
import { ZH_GUIDES } from "../../content/i18n/zh/guides";
import { ZH_ALLERGENS } from "../../content/i18n/zh/allergens";

/**
 * Apply zh translation overlays to English base content. Called at the
 * server-component boundary, so client bundles only ever receive the one
 * language being rendered. Falls back field-by-field to English wherever an
 * overlay is missing or an array runs short — a half-translated entry
 * degrades gracefully instead of crashing or blanking out.
 */

function pickAt<T>(arr: T[] | undefined, i: number): T | undefined {
  return arr ? arr[i] : undefined;
}

export function localizeFood(food: Food, locale: Locale): Food {
  if (locale !== "zh") return food;
  const o: FoodL10n | undefined = ZH_FOODS[food.slug];
  if (!o) return food;
  return {
    ...food,
    name: o.name,
    // Keep the English name/aliases as search aliases so both languages match.
    aliases: [...(o.aliases ?? []), food.name, ...food.aliases],
    chokingNotes: o.chokingNotes ?? food.chokingNotes,
    nutritionHighlights: food.nutritionHighlights.map((s, i) => pickAt(o.nutritionHighlights, i) ?? s),
    prepSpecs: food.prepSpecs.map((spec, i) => {
      const os = pickAt(o.prepSpecs, i);
      if (!os) return spec;
      return {
        ...spec,
        form: os.form,
        passFailTest: os.passFailTest,
        whyThisForm: os.whyThisForm,
        prepSteps: spec.prepSteps.map((s, j) => pickAt(os.prepSteps, j) ?? s),
        commonMistakes: spec.commonMistakes.map((s, j) => pickAt(os.commonMistakes, j) ?? s),
      };
    }),
    tips: food.tips.map((s, i) => pickAt(o.tips, i) ?? s),
    watchOuts: food.watchOuts?.map((s, i) => pickAt(o.watchOuts, i) ?? s),
    servingGuidance: food.servingGuidance?.map((g, i) => {
      const og = pickAt(o.servingGuidance, i);
      if (!og) return g;
      return {
        ...g,
        typicalAmount: og.typicalAmount,
        frequency: og.frequency ?? g.frequency,
        note: og.note ?? g.note,
      };
    }),
  };
}

export function localizeRecipe(recipe: Recipe, locale: Locale): Recipe {
  if (locale !== "zh") return recipe;
  const o: RecipeL10n | undefined = ZH_RECIPES[recipe.slug];
  if (!o) return recipe;
  return {
    ...recipe,
    name: o.name,
    steps: recipe.steps.map((s, i) => pickAt(o.steps, i) ?? s),
    whyItWorks: o.whyItWorks,
    storage: o.storage,
  };
}

export function localizeGuide(guide: Guide, locale: Locale): Guide {
  if (locale !== "zh") return guide;
  const o: GuideL10n | undefined = ZH_GUIDES[guide.slug];
  if (!o) return guide;
  return {
    ...guide,
    title: o.title,
    summary: o.summary,
    sections: guide.sections.map((sec, i) => {
      const os = pickAt(o.sections, i);
      if (!os) return sec;
      return {
        heading: os.heading,
        paragraphs: sec.paragraphs.map((p, j) => pickAt(os.paragraphs, j) ?? p),
      };
    }),
  };
}

export function localizeAllergen(program: AllergenProgram, locale: Locale): AllergenProgram {
  if (locale !== "zh") return program;
  const o: AllergenL10n | undefined = ZH_ALLERGENS[program.id];
  if (!o) return program;
  return {
    ...program,
    name: o.name,
    firstServe: o.firstServe,
    doseProgression: program.doseProgression.map((s, i) => pickAt(o.doseProgression, i) ?? s),
    maintenance: o.maintenance,
    reactionSigns: program.reactionSigns.map((s, i) => pickAt(o.reactionSigns, i) ?? s),
    notes: program.notes.map((s, i) => pickAt(o.notes, i) ?? s),
  };
}

export function localizeFoods(foods: Food[], locale: Locale): Food[] {
  return locale === "zh" ? foods.map((f) => localizeFood(f, locale)) : foods;
}

export function localizeRecipes(recipes: Recipe[], locale: Locale): Recipe[] {
  return locale === "zh" ? recipes.map((r) => localizeRecipe(r, locale)) : recipes;
}
