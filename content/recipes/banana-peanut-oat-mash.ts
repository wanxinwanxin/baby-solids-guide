import type { Recipe } from "@/content-schema/recipe";

const recipe: Recipe = {
  slug: "banana-peanut-oat-mash",
  name: "Banana peanut oat mash",
  foods: ["banana", "peanut-butter", "oatmeal"],
  bands: ["6-8m", "9-12m"],
  method: "mash",
  steps: [
    "Mash half a ripe banana with a fork until nearly smooth.",
    "Stir in 1 tsp smooth peanut butter until no streaks remain.",
    "Fold in 2 tbsp cooked oatmeal to loosen the texture.",
    "Serve slightly warm or room temperature on a pre-loaded spoon.",
  ],
  whyItWorks:
    "Banana's sweetness carries the peanut flavor, and oatmeal thins the sticky nut butter to a safe, spoonable texture — an easy way to keep the peanut maintenance streak going.",
  ironPairing: false,
  storage: "Best fresh; keeps 24 hours covered in the fridge — stir before serving.",
};

export default recipe;
