import { z } from "zod";

/** The 9 common allergens tracked by the app (US FASTER Act list). */
export const ALLERGEN_IDS = [
  "peanut",
  "egg",
  "milk",
  "wheat",
  "soy",
  "sesame",
  "tree-nut",
  "fish",
  "shellfish",
] as const;
export type AllergenId = (typeof ALLERGEN_IDS)[number];

export const AGE_BANDS = ["6-8m", "9-12m", "12-24m"] as const;
export type AgeBand = (typeof AGE_BANDS)[number];

export const FOOD_CATEGORIES = [
  "vegetable",
  "fruit",
  "protein",
  "grain",
  "dairy",
  "legume",
  "herb-spice",
  "fat-other",
] as const;
export type FoodCategory = (typeof FOOD_CATEGORIES)[number];

/** Nutrient tags (Phase 10) — the health story behind each food. */
export const NUTRIENT_TAGS = [
  "iron",
  "zinc",
  "protein",
  "omega3",
  "vitaminA",
  "vitaminC",
  "vitaminD",
  "calcium",
  "folate",
  "fiber",
  "healthyFats",
  "potassium",
] as const;
export type NutrientTag = (typeof NUTRIENT_TAGS)[number];

const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "must be an ISO date (YYYY-MM-DD)");

export const sourceRefSchema = z.object({
  label: z.string().min(3),
  url: z.string().url(),
  retrievedOn: isoDate,
});
export type SourceRef = z.infer<typeof sourceRefSchema>;

export const mediaLinkSchema = z.object({
  kind: z.enum(["youtube", "image"]),
  url: z.string().url(),
  title: z.string().min(3),
  sourceChannel: z.string().min(2),
  license: z.string().optional(),
  verifiedOn: isoDate,
});
export type MediaLink = z.infer<typeof mediaLinkSchema>;

export const prepSpecSchema = z.object({
  band: z.enum(AGE_BANDS),
  /** ONE precise sentence: exact shape/size/consistency for a safe serve. */
  form: z.string().min(20),
  /** A physical test the parent can do (e.g. the "squish test"). */
  passFailTest: z.string().min(10),
  /** Developmental rationale (palmar grasp vs pincer, molars, etc.). */
  whyThisForm: z.string().min(10),
  /** Numbered, concrete steps: cook method, times, cut geometry. */
  prepSteps: z.array(z.string().min(5)).min(1),
  commonMistakes: z.array(z.string().min(5)),
  /** Id of an SVG cut-diagram variant (see src/components/diagrams). */
  cutDiagram: z.string().optional(),
  media: z.array(mediaLinkSchema),
});
export type PrepSpec = z.infer<typeof prepSpecSchema>;

export const foodSchema = z.object({
  slug: z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "kebab-case slug"),
  name: z.string().min(2),
  aliases: z.array(z.string()),
  category: z.enum(FOOD_CATEGORIES),
  /** Corrected-age gate in months (most foods: 6; honey: 12). */
  minAgeMonths: z.number().int().min(4).max(24),
  ironRich: z.boolean(),
  commonAllergen: z.enum(ALLERGEN_IDS).nullable(),
  chokingRisk: z.enum(["low", "moderate", "high"]),
  /** Required when chokingRisk ≥ moderate: the hazard + its mitigation. */
  chokingNotes: z.string().optional(),
  /** Max 3, each backed by the entry's sources. */
  nutritionHighlights: z.array(z.string().min(5)).max(3),
  prepSpecs: z.array(prepSpecSchema).min(1),
  /** Curated "great first food" flag. */
  firstFoodPick: z.boolean(),
  /** Slugs of foods this pairs well with. */
  flavorPairings: z.array(z.string()),
  /** Kitchen tips for achieving the safe texture — the guide's highlight. */
  tips: z.array(z.string().min(10)).min(2).max(5),
  sources: z.array(sourceRefSchema).min(1),
  // ——— Phase 10 nutrition & serving fields (lint-required once backfilled) ———
  /** 1–4 nutrient tags; the prose justification lives in nutritionHighlights. */
  nutrients: z.array(z.enum(NUTRIENT_TAGS)).min(1).max(4).optional(),
  /** Sensible amounts per band — responsive-feeding framing, never counting. */
  servingGuidance: z
    .array(
      z.object({
        band: z.enum(AGE_BANDS),
        typicalAmount: z.string().min(10),
        frequency: z.string().optional(),
        note: z.string().optional(),
      }),
    )
    .optional(),
  /** Non-choking cautions (sodium, vitamin A caps, acid rash…). Max 3. */
  watchOuts: z.array(z.string().min(10)).max(3).optional(),
  /** Single emoji used by planner chips and list views. */
  emoji: z.string().min(1).max(8).optional(),
  cuisineTags: z.array(z.string()).optional(),
});
export type Food = z.infer<typeof foodSchema>;

/** Learn chapter (Phase 9) — first-visit education content. */
export const guideSchema = z.object({
  slug: z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/),
  title: z.string().min(5),
  summary: z.string().min(20),
  minRead: z.number().int().min(1).max(15),
  sections: z
    .array(
      z.object({
        heading: z.string().min(3),
        paragraphs: z.array(z.string().min(40)).min(1),
      }),
    )
    .min(2),
  sources: z.array(sourceRefSchema).min(2),
});
export type Guide = z.infer<typeof guideSchema>;

export const allergenProgramSchema = z.object({
  id: z.enum(ALLERGEN_IDS),
  name: z.string().min(2),
  /** Recommended first-serve form for this allergen. */
  firstServe: z.string().min(20),
  /** How to progress the amount across the first exposures. */
  doseProgression: z.array(z.string().min(10)).min(2),
  /** Ongoing rhythm once introduced (e.g. ~2×/week). */
  maintenance: z.string().min(20),
  /** What a reaction to THIS allergen typically looks like. */
  reactionSigns: z.array(z.string().min(5)).min(2),
  /** Slugs of foods in the database that deliver this allergen. */
  foodSlugs: z.array(z.string()).min(1),
  notes: z.array(z.string()),
  sources: z.array(sourceRefSchema).min(1),
});
export type AllergenProgram = z.infer<typeof allergenProgramSchema>;
