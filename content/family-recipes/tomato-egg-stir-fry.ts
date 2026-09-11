import type { FamilyRecipe } from "@/content-schema/recipe";

const recipe: FamilyRecipe = {
  slug: "tomato-egg-stir-fry",
  name: "Tomato & egg stir-fry",
  emoji: "🍅",
  time: "15 min",
  serves: "Family of 4",
  ingredients: [
    "4 large eggs",
    "3 ripe tomatoes, cut into wedges",
    "2 scallions, sliced (white and green separated)",
    "1 tsp sugar",
    "1/2 tsp salt, divided",
    "2 tbsp neutral oil, divided",
    "1 tsp ketchup (optional, deepens the sauce)",
    "Steamed rice, to serve",
  ],
  steps: [
    "Beat the eggs with a pinch of salt. Heat 1 tbsp oil in a wok over medium-high, pour in the eggs, and scramble into large soft curds. Remove while still glossy.",
    "Add the remaining oil and the scallion whites, then the tomato wedges. Stir-fry 3–4 minutes until they slump and release their juice.",
    "Season with the sugar, remaining salt, and ketchup if using. Simmer 1 minute into a loose sauce.",
    "Return the eggs, fold twice so they stay in big pieces, top with scallion greens, and serve over rice.",
  ],
  whyItWorks:
    "The dish every Chinese kid grows up on: sweet-tart tomato sauce soaking into rice, with soft egg clouds that need almost no chewing. Ready faster than delivery and made of things already in the fridge.",
  tips: [
    "Take the eggs out early — they finish cooking in the sauce and stay custardy instead of rubbery.",
    "Out-of-season tomatoes need the ketchup; in-season ones may not.",
  ],
};

export default recipe;
