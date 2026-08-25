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
