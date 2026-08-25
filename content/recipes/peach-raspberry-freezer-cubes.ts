import type { Recipe } from "@/content-schema/recipe";

const recipe: Recipe = {
  slug: "peach-raspberry-freezer-cubes",
  name: "Peach raspberry freezer cubes",
  foods: ["peach", "raspberry", "banana"],
  bands: ["6-8m", "9-12m"],
  method: "freeze-cubes",
  steps: [
    "Blend a ripe peeled peach, a handful of raspberries, and half a banana.",
    "Blend until fully smooth — raspberry seeds are fine to leave in.",
    "Freeze in an ice-cube tray; pop cubes into a labeled freezer bag.",
    "Thaw 1–2 cubes in the fridge and stir well before serving.",
  ],
  whyItWorks:
    "One blend banks a week of instant fruit servings — banana keeps the texture creamy after thawing, and a cool thawed cube stirred into yogurt doubles as a teething-day treat.",
  ironPairing: false,
  storage: "Freezer cubes keep 2 months; thawed cubes keep 24 hours in the fridge — never refreeze.",
};

export default recipe;
