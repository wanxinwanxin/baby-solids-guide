import type { Recipe } from "@/content-schema/recipe";

const recipe: Recipe = {
  slug: "edamame-broccoli-blend",
  name: "Edamame broccoli blend",
  foods: ["edamame", "broccoli", "olive-oil"],
  bands: ["6-8m", "9-12m", "12-24m"],
  method: "blend",
  steps: [
    "Boil 1/3 cup shelled edamame until very soft, about 8 minutes.",
    "Blend the edamame with 3 steamed broccoli florets and 1 tsp olive oil.",
    "Loosen with cooking water until completely smooth — edamame skins hide lumps.",
    "Serve warm on a spoon, or as a thick dip for a teething biscuit from 9 months.",
  ],
  whyItWorks:
    "Edamame doubles as a soy allergen exposure and a plant-iron source, and broccoli's vitamin C helps that iron absorb — olive oil smooths the grassy edge and adds calories.",
  ironPairing: true,
  storage: "Keeps 48 hours in the fridge or 2 months frozen in cubes; reheat to steaming and cool.",
};

export default recipe;
