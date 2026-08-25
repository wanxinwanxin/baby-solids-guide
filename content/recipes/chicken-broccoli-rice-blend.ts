import type { Recipe } from "@/content-schema/recipe";

const recipe: Recipe = {
  slug: "chicken-broccoli-rice-blend",
  name: "Chicken broccoli rice blend",
  foods: ["chicken", "broccoli", "rice", "olive-oil"],
  bands: ["6-8m", "9-12m", "12-24m"],
  method: "blend",
  steps: [
    "Blend 1/4 cup cooked chicken thigh with 2 steamed broccoli florets.",
    "Add 2 tbsp cooked rice and 1 tsp olive oil; blend again.",
    "Loosen with water or breast milk/formula until smooth and spoonable.",
    "Serve warm, or spread on a pre-loaded spoon for self-feeding.",
  ],
  whyItWorks:
    "Dark-meat chicken carries more iron than breast, broccoli's vitamin C helps absorb it, and a little olive oil adds the calories babies need — rice keeps the flavor gentle.",
  ironPairing: true,
  storage: "Keeps 48 hours in the fridge or 2 months frozen in cubes; reheat to steaming and cool.",
};

export default recipe;
