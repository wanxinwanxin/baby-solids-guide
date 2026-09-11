import type { FamilyRecipe } from "@/content-schema/recipe";

const recipe: FamilyRecipe = {
  slug: "tomato-beef-noodle-soup",
  name: "Tomato beef noodle soup",
  emoji: "🍜",
  time: "40 min",
  serves: "Family of 4",
  ingredients: [
    "300 g thin beef slices (hot-pot style) or beef stew meat",
    "4 ripe tomatoes, chopped",
    "1 small onion, sliced",
    "3 slices ginger",
    "1 tbsp tomato paste",
    "1 tbsp soy sauce",
    "1 tsp sugar",
    "1.2 L water or unsalted stock",
    "400 g wheat noodles",
    "Baby bok choy or spinach, a handful per person",
  ],
  steps: [
    "Soften the onion and ginger in a little oil, then add the tomatoes and tomato paste. Cook 5 minutes until saucy.",
    "Add the water, soy sauce, and sugar. Simmer 20 minutes so the tomatoes melt into the broth.",
    "Stew meat: add it at the start and simmer 1 hour instead. Thin slices: swish them in at the end for 1–2 minutes until just cooked.",
    "Boil the noodles separately, and blanch the greens in the same pot for the last minute.",
    "Build each bowl: noodles, greens, beef, then the hot tomato broth. Season each bowl to its eater.",
  ],
  whyItWorks:
    "A gateway noodle soup: naturally sweet-and-sour tomato broth needs no chili to taste complete, and every component sits separately so each kid gets the ratio they want.",
  tips: [
    "Noodles boiled in the soup drink it all up and turn bloated — a separate pot keeps leftovers good for tomorrow.",
    "Freeze the plain broth; future-you gets a 10-minute dinner.",
  ],
};

export default recipe;
