import type { FamilyRecipe } from "@/content-schema/recipe";

const recipe: FamilyRecipe = {
  slug: "seaweed-egg-drop-soup",
  name: "Seaweed egg-drop soup",
  emoji: "🍲",
  time: "10 min",
  serves: "Family of 4",
  ingredients: [
    "1 L water or unsalted stock",
    "2 eggs, beaten",
    "5 g dried laver seaweed (紫菜), torn",
    "1 tsp soy sauce",
    "1/4 tsp salt",
    "A few drops toasted sesame oil",
    "Small dried shrimp (虾皮) or sliced scallion, optional",
  ],
  steps: [
    "Bring the water to a boil and drop in the torn seaweed (and dried shrimp, if using). Simmer 1 minute.",
    "Turn the heat to low and pour the beaten egg in a thin stream while stirring gently, so it blooms into flowers.",
    "Season with soy sauce and salt, turn off the heat, and finish with sesame oil and scallion.",
  ],
  whyItWorks:
    "The 10-minute soup that makes any plain dinner feel complete. Laver brings iodine and a savory depth kids read as comfort, and egg flowers are dinner theater at zero cost.",
  tips: [
    "Laver needs no soaking — straight from the pack into the pot.",
    "Taste before salting if you added dried shrimp; they season the pot on their own.",
  ],
};

export default recipe;
