import type { Recipe } from "@/content-schema/recipe";

const recipe: Recipe = {
  slug: "cucumber-yogurt-dill-sauce",
  name: "Cucumber yogurt dill sauce",
  foods: ["yogurt", "cucumber", "dill"],
  bands: ["6-8m", "9-12m", "12-24m"],
  method: "stir",
  steps: [
    "Peel and finely grate 2 tbsp of cucumber; squeeze out the extra water.",
    "Stir the cucumber into 1/4 cup plain whole-milk yogurt.",
    "Stir in a pinch of finely chopped fresh dill.",
    "Spoon over meat or veggie purées, or serve as a dip from 9 months.",
  ],
  whyItWorks:
    "A cool, tangy sauce keeps the dairy exposure regular and teaches babies that sauces make food interesting — it softens dry meats and makes bitter veggies friendlier.",
  ironPairing: false,
  storage: "Keeps 24 hours covered in the fridge; pour off any watery layer and stir before serving.",
};

export default recipe;
