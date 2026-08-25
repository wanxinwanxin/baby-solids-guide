import type { Recipe } from "@/content-schema/recipe";

const recipe: Recipe = {
  slug: "mango-quinoa-breakfast-bowl",
  name: "Mango quinoa breakfast bowl",
  foods: ["quinoa", "mango", "yogurt", "hemp-seeds"],
  bands: ["6-8m", "9-12m"],
  method: "stir",
  steps: [
    "Mash 2 tbsp very ripe mango with a fork until saucy.",
    "Stir in 3 tbsp cooked quinoa and 2 tbsp plain whole-milk yogurt.",
    "Sprinkle in 1 tsp hemp seeds and mix until nothing sits loose on top.",
    "Serve at room temperature on a pre-loaded spoon.",
  ],
  whyItWorks:
    "Quinoa and hemp seeds bring plant iron and protein, and mango's vitamin C helps that iron absorb — the yogurt binds it all so the tiny grains don't scatter off the spoon.",
  ironPairing: true,
  storage: "Keeps 24 hours covered in the fridge; stir well before serving.",
};

export default recipe;
