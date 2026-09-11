import type { FamilyRecipe } from "@/content-schema/recipe";

const recipe: FamilyRecipe = {
  slug: "chicken-corn-soup",
  name: "Chicken & sweet corn soup",
  emoji: "🌽",
  time: "20 min",
  serves: "Family of 4",
  ingredients: [
    "1 chicken breast, finely minced or ground",
    "1 can (400 g) creamed corn, or 2 cups blitzed corn kernels",
    "1 L unsalted chicken stock",
    "1 egg, beaten",
    "1 tbsp cornstarch + 2 tbsp water",
    "1/2 tsp salt",
    "A few drops toasted sesame oil and sliced scallion, to finish",
  ],
  steps: [
    "Bring the stock to a simmer and stir in the creamed corn.",
    "Add the minced chicken in small pinches, stirring so it cooks in tender flecks rather than one clump, about 3 minutes.",
    "Stir in the cornstarch slurry and simmer 1 minute until the soup turns silky.",
    "Turn off the heat and pour the beaten egg in a thin stream while stirring slowly, so it sets into ribbons.",
    "Season with salt, finish with sesame oil and scallion.",
  ],
  whyItWorks:
    "Sweet corn, silky texture, and egg ribbons — the restaurant soup kids order every time, made in 20 minutes. Minced chicken disappears into it, so the protein comes along for free.",
  tips: [
    "Off the heat is the trick for egg ribbons — a boiling pot shreds them into cloudiness.",
    "Blitz half the kernels and leave half whole if your kids like something to chew.",
  ],
};

export default recipe;
