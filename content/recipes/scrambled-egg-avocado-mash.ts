import type { Recipe } from "@/content-schema/recipe";

const recipe: Recipe = {
  slug: "scrambled-egg-avocado-mash",
  name: "Scrambled egg avocado mash",
  foods: ["egg", "avocado", "butter"],
  bands: ["6-8m", "9-12m", "12-24m"],
  method: "mash",
  steps: [
    "Scramble 1 egg in a little butter until fully set — no runny patches.",
    "Mash a quarter of a ripe avocado on a plate with a fork.",
    "Chop the egg fine and mash it into the avocado until it holds together.",
    "Serve as a soft mash on a pre-loaded spoon, or in small clumps to palm-grab.",
  ],
  whyItWorks:
    "Egg is a top allergen worth serving early and often, and avocado's fat keeps the scramble moist enough for a baby with no teeth — protein, fat, and choline in one breakfast.",
  ironPairing: false,
  storage: "Serve fresh; cooked egg keeps 24 hours in the fridge, but the mash is best made per meal.",
};

export default recipe;
