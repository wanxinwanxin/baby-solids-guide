import type { FamilyRecipe } from "@/content-schema/recipe";

const recipe: FamilyRecipe = {
  slug: "steamed-egg-custard",
  name: "Savory steamed egg custard",
  emoji: "🍮",
  time: "15 min",
  serves: "2 kids or 1 adult + 1 kid",
  ingredients: [
    "2 large eggs",
    "150 ml warm water or unsalted stock (about 1.5× the egg volume)",
    "1/4 tsp salt",
    "A few drops toasted sesame oil",
    "1/2 tsp soy sauce, to finish",
    "Sliced scallion greens, to finish",
  ],
  steps: [
    "Beat the eggs with the salt, then whisk in the warm water. Strain through a sieve into a shallow heat-proof bowl for a silky result.",
    "Skim off surface bubbles, then cover the bowl tightly with a plate or foil.",
    "Steam over gently simmering water for 10–12 minutes, until just set with a slight wobble in the center.",
    "Finish with the soy sauce, sesame oil, and scallions. Serve with a spoon, alone or over rice.",
  ],
  whyItWorks:
    "Wobbly, savory, and spoonable — 蒸蛋羹 is the dish kids of every age share with the baby. The 1.5× water ratio and the strainer are the whole secret to a custard with no holes.",
  tips: [
    "A tight lid keeps condensation from pocking the surface.",
    "Fancy upgrades kids love: a few small shrimp or frozen peas dropped in halfway through steaming.",
  ],
};

export default recipe;
