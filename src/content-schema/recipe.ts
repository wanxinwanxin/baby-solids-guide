import { z } from "zod";
import { AGE_BANDS } from "./food";

/**
 * Part III D3 — blender-simple recipes. Deliberately the simplest possible
 * tier of "cooking": blend, mash, stir, assemble, freeze into cubes. Never
 * a cooking project. Every ingredient must be a real food slug (enforced
 * by content-lint) so the combo suggester can check it against the baby's
 * safe-so-far pantry.
 */

export const RECIPE_METHODS = ["blend", "mash", "stir", "assemble", "freeze-cubes"] as const;
export type RecipeMethod = (typeof RECIPE_METHODS)[number];

export const RecipeSchema = z.object({
  slug: z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/),
  name: z.string().min(3).max(60),
  /** 2–4 ingredient food slugs — all must exist in content/foods. */
  foods: z.array(z.string()).min(2).max(4),
  bands: z.array(z.enum(AGE_BANDS)).min(1),
  method: z.enum(RECIPE_METHODS),
  /** ≤5 steps, each short enough to read one-handed. */
  steps: z.array(z.string().min(10).max(120)).min(1).max(5),
  /** The taste/nutrition rationale, in parent language. */
  whyItWorks: z.string().min(20).max(300),
  /** True when the combo pairs an iron source with a vitamin-C source. */
  ironPairing: z.boolean(),
  storage: z.string().min(10).max(200),
});

export type Recipe = z.infer<typeof RecipeSchema>;

/**
 * Family-table recipes (2026-09-11, user request): real weeknight dishes for
 * school-age kids and the rest of the family. A separate tier from baby
 * recipes on purpose — ingredients are free text (amounts included), steps
 * are real cooking, and nothing here is texture-checked or band-gated for
 * babies. The /recipes page labels the section accordingly.
 */
export const FamilyRecipeSchema = z.object({
  slug: z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/),
  name: z.string().min(3).max(60),
  emoji: z.string().min(1).max(8),
  /** Hands-on-to-table time, in parent language ("20 min"). */
  time: z.string().min(2).max(20),
  serves: z.string().min(2).max(40),
  /** Free text with amounts — these are not catalog food slugs. */
  ingredients: z.array(z.string().min(3).max(120)).min(3).max(12),
  steps: z.array(z.string().min(10).max(220)).min(2).max(8),
  /** Why kids actually eat it, in parent language. */
  whyItWorks: z.string().min(20).max(300),
  tips: z.array(z.string().min(10).max(220)).max(3).optional(),
});

export type FamilyRecipe = z.infer<typeof FamilyRecipeSchema>;
