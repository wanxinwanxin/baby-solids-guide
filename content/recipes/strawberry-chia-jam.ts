import type { Recipe } from "@/content-schema/recipe";

const recipe: Recipe = {
  slug: "strawberry-chia-jam",
  name: "Strawberry chia jam",
  foods: ["strawberry", "chia-seeds"],
  bands: ["6-8m", "9-12m", "12-24m"],
  method: "mash",
  steps: [
    "Mash 4 ripe strawberries with a fork until juicy and mostly smooth.",
    "Stir in 1 tsp chia seeds until evenly mixed through.",
    "Rest 15 minutes in the fridge — the chia swells into a soft jam.",
    "Spoon over yogurt or oatmeal, or spread thinly on a soft toast strip from 9 months.",
  ],
  whyItWorks:
    "Chia seeds bring plant iron and thicken the fruit with zero added sugar, while strawberry's vitamin C helps that iron absorb — a two-ingredient jam that beats anything in a jar.",
  ironPairing: true,
  storage: "Keeps 3 days covered in the fridge — stir before serving. Freezes well in small dollops.",
};

export default recipe;
