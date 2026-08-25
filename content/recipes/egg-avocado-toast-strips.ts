import type { Recipe } from "@/content-schema/recipe";

const recipe: Recipe = {
  slug: "egg-avocado-toast-strips",
  name: "Egg avocado toast strips",
  foods: ["egg", "avocado", "bread"],
  bands: ["9-12m", "12-24m"],
  method: "assemble",
  steps: [
    "Mash 1 hard-boiled egg with a quarter of a ripe avocado until creamy.",
    "Toast a slice of bread lightly and cut it into finger-width strips.",
    "Spread the egg-avocado mash thinly onto each strip.",
    "Hand over one strip at a time; keep the rest out of grabbing range.",
  ],
  whyItWorks:
    "A whole egg on soft toast keeps the egg allergen exposure going in a form 9-month-olds can self-feed, and avocado's fat makes the dry yolk easy to swallow.",
  ironPairing: false,
  storage: "Assemble fresh; the egg-avocado mash keeps 24 hours in the fridge pressed under plastic wrap.",
};

export default recipe;
