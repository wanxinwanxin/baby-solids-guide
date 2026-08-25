import type { Recipe } from "@/content-schema/recipe";

const recipe: Recipe = {
  slug: "shrimp-pea-rice-blend",
  name: "Shrimp pea rice blend",
  foods: ["shrimp", "peas", "rice"],
  bands: ["6-8m", "9-12m", "12-24m"],
  method: "blend",
  steps: [
    "Simmer 2 peeled, deveined shrimp until opaque and cooked through.",
    "Blend the shrimp with 2 tbsp steamed peas and 3 tbsp cooked rice.",
    "Loosen with cooking water until smooth — whole shrimp is too chewy to serve alone.",
    "Serve warm on a spoon; from 9 months, leave it slightly thicker for scooping.",
  ],
  whyItWorks:
    "Blending shrimp into a mild pea-rice purée turns a rubbery, hard-to-chew food into a safe early shellfish exposure — one of the allergens most worth introducing and repeating.",
  ironPairing: false,
  storage: "Keeps 24 hours in the fridge or 1 month frozen; reheat to steaming, stir, and cool.",
};

export default recipe;
