import type { Recipe } from "@/content-schema/recipe";

const recipe: Recipe = {
  slug: "strawberry-farina-porridge",
  name: "Strawberry farina porridge",
  foods: ["farina", "strawberry"],
  bands: ["6-8m", "9-12m"],
  method: "stir",
  steps: [
    "Cook 3 tbsp iron-fortified farina to a smooth porridge per the box.",
    "Mash 2 ripe strawberries with a fork until saucy.",
    "Swirl the berries through the warm farina until pink throughout.",
    "Cool to body temperature — check a dab on your wrist before serving.",
  ],
  whyItWorks:
    "Fortified farina is one of the highest-iron foods a baby can eat, and strawberry's vitamin C multiplies how much of that iron absorbs — sweet, pink, and done in five minutes.",
  ironPairing: true,
  storage: "Keeps 24 hours covered in the fridge; loosen with water or breast milk/formula when reheating.",
};

export default recipe;
