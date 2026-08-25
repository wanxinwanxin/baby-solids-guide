import type { Recipe } from "@/content-schema/recipe";

const recipe: Recipe = {
  slug: "blueberry-yogurt-swirl",
  name: "Blueberry yogurt swirl",
  foods: ["blueberry", "yogurt"],
  bands: ["6-8m", "9-12m", "12-24m"],
  method: "mash",
  steps: [
    "Warm a handful of blueberries briefly, or use thawed frozen ones.",
    "Mash thoroughly with a fork — every skin should be burst flat.",
    "Swirl through 3 tbsp plain whole-milk yogurt, leaving purple streaks.",
  ],
  whyItWorks:
    "Bursting the berries makes the skins safe and releases the juice that turns plain yogurt violet — babies eat with their eyes too, and there's not a spoonful of added sugar in it.",
  ironPairing: false,
  storage: "Keeps 24 hours covered in the fridge; the swirl turns fully purple overnight — still fine.",
};

export default recipe;
