import type { Recipe } from "@/content-schema/recipe";

const recipe: Recipe = {
  slug: "red-lentil-tomato-cubes",
  name: "Red lentil tomato freezer cubes",
  foods: ["lentils", "tomato", "carrot", "cumin"],
  bands: ["6-8m", "9-12m", "12-24m"],
  method: "freeze-cubes",
  steps: [
    "Simmer 1/2 cup red lentils with 1 chopped carrot in water until collapsing soft.",
    "Add 1 chopped ripe tomato and a small pinch of cumin; simmer 5 more minutes.",
    "Blend everything until silky, loosening with the cooking water.",
    "Freeze in an ice-cube tray; pop cubes into a labeled freezer bag.",
    "Reheat 1–2 cubes to steaming, stir well, and cool to body temperature.",
  ],
  whyItWorks:
    "A gentle first dal: lentil iron plus tomato's vitamin C is the classic absorption pairing, carrot sweetens it, and cumin starts training a palate for spiced family food.",
  ironPairing: true,
  storage: "Freezer cubes keep 2 months; thawed cubes keep 24 hours in the fridge — never refreeze.",
};

export default recipe;
