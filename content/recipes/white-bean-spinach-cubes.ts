import type { Recipe } from "@/content-schema/recipe";

const recipe: Recipe = {
  slug: "white-bean-spinach-cubes",
  name: "White bean spinach freezer cubes",
  foods: ["white-beans", "spinach", "tomato", "olive-oil"],
  bands: ["6-8m", "9-12m", "12-24m"],
  method: "freeze-cubes",
  steps: [
    "Blend 1 cup cooked white beans with a big handful of wilted spinach.",
    "Add 1 chopped ripe tomato and 2 tsp olive oil; blend until silky.",
    "Loosen with water to a thick, spoonable purée.",
    "Freeze in an ice-cube tray; transfer frozen cubes to a freezer bag.",
    "Reheat 1–2 cubes to steaming, stir well, and cool to body temperature.",
  ],
  whyItWorks:
    "Beans and spinach stack two plant-iron sources, tomato's vitamin C helps the iron absorb, and olive oil adds calories — a green sauce that also coats pasta later on.",
  ironPairing: true,
  storage: "Freezer cubes keep 2 months; thawed cubes keep 24 hours in the fridge — never refreeze.",
};

export default recipe;
