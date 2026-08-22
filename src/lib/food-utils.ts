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
  "fat-other": "Fats & other",
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
  category: FoodCategory;
  minAgeMonths: number;
  ironRich: boolean;
  commonAllergen: AllergenId | null;
  chokingRisk: Food["chokingRisk"];
  firstFoodPick: boolean;
};

export function slimFood(f: Food): SlimFood {
  return {
    slug: f.slug,
    name: f.name,
    category: f.category,
    minAgeMonths: f.minAgeMonths,
    ironRich: f.ironRich,
    commonAllergen: f.commonAllergen,
    chokingRisk: f.chokingRisk,
    firstFoodPick: f.firstFoodPick,
  };
}

export function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}
