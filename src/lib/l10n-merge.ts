import type { AllergenProgram, Food, Guide } from "@/content-schema/food";
import type { Recipe } from "@/content-schema/recipe";
import type { AllergenL10n, FoodL10n, GuideL10n, RecipeL10n } from "@/content-schema/l10n";

/**
 * Pure overlay-merge functions, shared by the server localizers
 * (src/lib/l10n.ts) and the client hooks (src/lib/i18n/content-client.ts).
 * This module must stay free of content imports so client bundles only pull
 * the zh corpus through the lazy chunk. Falls back field-by-field to English
 * wherever an overlay is missing or an array runs short.
 */

function pickAt<T>(arr: T[] | undefined, i: number): T | undefined {
  return arr ? arr[i] : undefined;
}

export function mergeFood(food: Food, o: FoodL10n | undefined): Food {
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

export function mergeRecipe(recipe: Recipe, o: RecipeL10n | undefined): Recipe {
  if (!o) return recipe;
  return {
    ...recipe,
    name: o.name,
    steps: recipe.steps.map((s, i) => pickAt(o.steps, i) ?? s),
    whyItWorks: o.whyItWorks,
    storage: o.storage,
  };
}

export function mergeGuide(guide: Guide, o: GuideL10n | undefined): Guide {
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

export function mergeAllergen(program: AllergenProgram, o: AllergenL10n | undefined): AllergenProgram {
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
