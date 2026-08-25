import type { Recipe } from "@/content-schema/recipe";

const recipe: Recipe = {
  slug: "beef-tomato-polenta-mash",
  name: "Beef tomato polenta mash",
  foods: ["beef", "tomato", "polenta"],
  bands: ["6-8m", "9-12m", "12-24m"],
  method: "mash",
  steps: [
    "Simmer 2 tbsp ground beef in a splash of water until fully cooked and soft.",
    "Mash the beef into 3 tbsp warm, soft-cooked polenta until no crumbles stand alone.",
    "Stir in 1 tbsp grated ripe tomato, flesh only.",
    "Mash to a smooth, spoonable texture; cool to body temperature before serving.",
  ],
  whyItWorks:
    "Beef's heme iron is the kind babies absorb best, and tomato's vitamin C helps it along — while creamy polenta binds everything into one mild, spoonable dinner.",
  ironPairing: true,
  storage: "Keeps 24 hours covered in the fridge; reheat to steaming, stir, and cool before serving.",
};

export default recipe;
