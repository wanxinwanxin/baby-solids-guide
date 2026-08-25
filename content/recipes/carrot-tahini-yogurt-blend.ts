import type { Recipe } from "@/content-schema/recipe";

const recipe: Recipe = {
  slug: "carrot-tahini-yogurt-blend",
  name: "Carrot tahini yogurt blend",
  foods: ["carrot", "tahini", "yogurt"],
  bands: ["6-8m", "9-12m", "12-24m"],
  method: "blend",
  steps: [
    "Blend 1/2 cup steamed carrot coins until smooth.",
    "Add 1 tsp tahini and 2 tbsp plain whole-milk yogurt; blend again.",
    "Check the texture — the tahini must be fully thinned in, never a sticky glob.",
    "Serve on a spoon, or as a dip for soft-cooked veggie sticks from 9 months.",
  ],
  whyItWorks:
    "Yogurt and carrot thin sticky tahini to a safe, creamy texture, so one little dinner quietly maintains two allergens — sesame and dairy — while the carrot keeps it sweet.",
  ironPairing: false,
  storage: "Keeps 48 hours covered in the fridge; stir before serving as the tahini can settle.",
};

export default recipe;
