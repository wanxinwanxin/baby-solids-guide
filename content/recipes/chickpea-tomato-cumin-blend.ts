import type { Recipe } from "@/content-schema/recipe";

const recipe: Recipe = {
  slug: "chickpea-tomato-cumin-blend",
  name: "Chickpea tomato cumin blend",
  foods: ["chickpeas", "tomato", "cumin"],
  bands: ["6-8m", "9-12m", "12-24m"],
  method: "blend",
  steps: [
    "Blend 1/2 cup well-cooked chickpeas with 1 chopped ripe tomato.",
    "Add a small pinch of ground cumin and blend until completely smooth.",
    "Loosen with water or bean-cooking liquid to a hummus-like spread.",
    "Serve on a spoon, or spread thinly on a soft pita strip from 9 months.",
  ],
  whyItWorks:
    "Chickpeas bring plant iron and protein, tomato's vitamin C helps that iron in, and a whisper of cumin starts building a palate for real family food — no salt needed.",
  ironPairing: true,
  storage: "Keeps 3 days covered in the fridge; stir before serving as it thickens when cold.",
};

export default recipe;
