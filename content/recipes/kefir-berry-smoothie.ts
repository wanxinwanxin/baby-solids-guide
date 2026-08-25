import type { Recipe } from "@/content-schema/recipe";

const recipe: Recipe = {
  slug: "kefir-berry-smoothie",
  name: "Kefir berry smoothie",
  foods: ["kefir", "blueberry", "banana", "flaxseed"],
  bands: ["6-8m", "9-12m", "12-24m"],
  method: "blend",
  steps: [
    "Blend half a cup of plain kefir with a handful of blueberries.",
    "Add half a banana and 1 tsp ground flaxseed; blend until smooth.",
    "Offer small sips from an open cup, or spoon it like a thin yogurt.",
  ],
  whyItWorks:
    "Kefir brings probiotics and tang, banana sweetens without any sugar, and ground flaxseed slips in omega-3s — a drinkable breakfast for mornings when nothing else lands.",
  ironPairing: false,
  storage: "Best fresh; keeps 24 hours in the fridge — it separates, so shake or stir before serving.",
};

export default recipe;
