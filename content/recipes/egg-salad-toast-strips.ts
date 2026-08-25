import type { Recipe } from "@/content-schema/recipe";

const recipe: Recipe = {
  slug: "egg-salad-toast-strips",
  name: "Egg salad toast strips",
  foods: ["egg", "yogurt", "bread"],
  bands: ["9-12m", "12-24m"],
  method: "assemble",
  steps: [
    "Peel a hard-boiled egg and mash it thoroughly with a fork.",
    "Stir in 1 tbsp plain whole-milk yogurt until creamy — no dry crumbles.",
    "Toast a slice of bread lightly and cut it into finger-width strips.",
    "Spread the egg salad thinly on the strips and serve one at a time.",
  ],
  whyItWorks:
    "Yogurt stands in for mayo, binding the dry yolk into a moist spread babies can actually swallow — a no-added-salt egg salad that keeps the egg exposure streak alive.",
  ironPairing: false,
  storage: "Egg salad keeps 24 hours covered in the fridge; assemble strips fresh so they don't go soggy.",
};

export default recipe;
