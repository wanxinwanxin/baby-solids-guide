import type { AgeBand, AllergenId, Food, FoodCategory } from "@/content-schema/food";

export const ALLERGEN_LABELS: Record<AllergenId, string> = {
  peanut: "Peanut",
  egg: "Egg",
  milk: "Milk (dairy)",
  wheat: "Wheat",
  soy: "Soy",
  sesame: "Sesame",
  "tree-nut": "Tree nuts",
  fish: "Fish",
  shellfish: "Shellfish",
};

export const CATEGORY_LABELS: Record<FoodCategory, string> = {
  vegetable: "Vegetables",
  fruit: "Fruits",
  protein: "Proteins",
  grain: "Grains",
  dairy: "Dairy",
  legume: "Legumes",
  "herb-spice": "Herbs & spices",
  "fat-other": "Fats & other",
};

export const NUTRIENT_LABELS: Record<import("@/content-schema/food").NutrientTag, string> = {
  iron: "Iron",
  zinc: "Zinc",
  protein: "Protein",
  omega3: "Omega-3",
  vitaminA: "Vitamin A",
  vitaminC: "Vitamin C",
  vitaminD: "Vitamin D",
  calcium: "Calcium",
  folate: "Folate",
  fiber: "Fiber",
  healthyFats: "Healthy fats",
  potassium: "Potassium",
};

export const BAND_LABELS: Record<AgeBand, string> = {
  "6-8m": "6–8 months",
  "9-12m": "9–12 months",
  "12-24m": "12–24 months",
};

export function bandForAgeMonths(ageMonths: number): AgeBand {
  return ageMonths < 9 ? "6-8m" : ageMonths < 12 ? "9-12m" : "12-24m";
}

/** Slim projection safe to ship to client list views. */
export type SlimFood = {
  slug: string;
  name: string;
  aliases: string[];
  category: FoodCategory;
  minAgeMonths: number;
  ironRich: boolean;
  commonAllergen: AllergenId | null;
  chokingRisk: Food["chokingRisk"];
  firstFoodPick: boolean;
  nutrients?: import("@/content-schema/food").NutrientTag[];
  emoji?: string;
  /** Cut-diagram id of the earliest prep band that has one (card thumbnails). */
  cutDiagram?: string;
  /** One-line serving hint: the first band's form, truncated at a word break. */
  hint: string;
};

const HINT_MAX = 64;

function shortForm(form: string): string {
  if (form.length <= HINT_MAX) return form;
  const slice = form.slice(0, HINT_MAX + 1);
  const lastSpace = slice.lastIndexOf(" ");
  const cut = slice.slice(0, lastSpace > HINT_MAX / 2 ? lastSpace : HINT_MAX);
  return `${cut.replace(/[\s,;:.—–-]+$/, "")}…`;
}

export function slimFood(f: Food): SlimFood {
  return {
    slug: f.slug,
    name: f.name,
    aliases: f.aliases,
    category: f.category,
    minAgeMonths: f.minAgeMonths,
    ironRich: f.ironRich,
    commonAllergen: f.commonAllergen,
    chokingRisk: f.chokingRisk,
    firstFoodPick: f.firstFoodPick,
    nutrients: f.nutrients,
    emoji: f.emoji,
    cutDiagram: f.prepSpecs.find((p) => p.cutDiagram)?.cutDiagram,
    hint: shortForm(f.prepSpecs[0].form),
  };
}

export function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}
