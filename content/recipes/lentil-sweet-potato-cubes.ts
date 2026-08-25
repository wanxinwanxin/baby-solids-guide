import type { Recipe } from "@/content-schema/recipe";

const recipe: Recipe = {
  slug: "lentil-sweet-potato-cubes",
  name: "Lentil sweet-potato freezer cubes",
  foods: ["lentils", "sweet-potato", "broccoli"],
  bands: ["6-8m", "9-12m"],
  method: "freeze-cubes",
  steps: [
    "Blend 1 cup cooked lentils with 1 cup steamed sweet potato.",
    "Add a handful of steamed broccoli florets and blend smooth.",
    "Loosen with water or breast milk/formula to a spoonable purée.",
    "Freeze in an ice-cube tray; pop cubes into a freezer bag.",
    "Reheat 1–2 cubes to steaming, stir well, cool to body temperature.",
  ],
  whyItWorks:
    "Iron-rich lentils meet vitamin-C broccoli, which helps that plant iron absorb — and the sweet potato makes the whole thing taste like dessert. One blend, a week of dinners.",
  ironPairing: true,
  storage: "Freezer cubes keep 2 months; thawed cubes keep 24 hours in the fridge — never refreeze.",
};

export default recipe;
