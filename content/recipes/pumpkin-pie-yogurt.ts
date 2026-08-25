import type { Recipe } from "@/content-schema/recipe";

const recipe: Recipe = {
  slug: "pumpkin-pie-yogurt",
  name: "Pumpkin pie yogurt",
  foods: ["pumpkin", "yogurt", "cinnamon"],
  bands: ["6-8m", "9-12m", "12-24m"],
  method: "stir",
  steps: [
    "Stir 2 tbsp plain pumpkin purée into 3 tbsp whole-milk yogurt.",
    "Add a small pinch of cinnamon and mix until evenly orange.",
    "Serve chilled or at room temperature on a pre-loaded spoon.",
  ],
  whyItWorks:
    "Plain pumpkin purée is loaded with vitamin A and blends silkily into yogurt, while cinnamon does the pie-spice work — dessert flavor with no crust and no sugar.",
  ironPairing: false,
  storage: "Keeps 2 days covered in the fridge; give it a stir if liquid pools on top.",
};

export default recipe;
