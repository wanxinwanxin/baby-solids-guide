import type { Recipe } from "@/content-schema/recipe";

const recipe: Recipe = {
  slug: "almond-butter-apple-stir",
  name: "Almond-butter apple stir",
  foods: ["apple", "almond-butter", "cinnamon"],
  bands: ["6-8m", "9-12m", "12-24m"],
  method: "stir",
  steps: [
    "Stir 1 tsp smooth almond butter into 3 tbsp warm unsweetened applesauce.",
    "Mix until no streaks remain — the warmth melts the nut butter right in.",
    "Add a small pinch of cinnamon and serve on a pre-loaded spoon.",
  ],
  whyItWorks:
    "Applesauce thins sticky almond butter to a completely safe texture, making tree-nut exposure as easy as stirring — and it tastes like apple pie filling with zero added sugar.",
  ironPairing: false,
  storage: "Keeps 24 hours covered in the fridge; stir again before serving.",
};

export default recipe;
