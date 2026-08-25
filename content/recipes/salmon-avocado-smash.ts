import type { Recipe } from "@/content-schema/recipe";

const recipe: Recipe = {
  slug: "salmon-avocado-smash",
  name: "Salmon avocado smash",
  foods: ["salmon", "avocado"],
  bands: ["6-8m", "9-12m", "12-24m"],
  method: "mash",
  steps: [
    "Flake 2 tbsp cooked salmon, checking twice for pin bones.",
    "Smash a quarter of a ripe avocado on top with a fork.",
    "Mix until the salmon binds — the avocado keeps flakes moist.",
    "Serve as a mash, or spread onto a soft toast strip from 9 months.",
  ],
  whyItWorks:
    "Avocado's fat mellows salmon's strong flavor for first fish exposures and keeps every bite moist — a gentle vehicle for the fish allergen with omega-3s on board.",
  ironPairing: false,
  storage: "Serve fresh; cooked salmon keeps 48 hours in the fridge — mix each portion just before serving.",
};

export default recipe;
