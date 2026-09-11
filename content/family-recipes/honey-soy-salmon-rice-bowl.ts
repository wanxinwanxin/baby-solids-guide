import type { FamilyRecipe } from "@/content-schema/recipe";

const recipe: FamilyRecipe = {
  slug: "honey-soy-salmon-rice-bowl",
  name: "Honey-soy salmon rice bowl",
  emoji: "🐟",
  time: "25 min",
  serves: "Family of 4",
  ingredients: [
    "4 small salmon fillets (about 120 g each), skin on",
    "2 tbsp soy sauce",
    "1 tbsp honey",
    "1 tsp rice vinegar or lemon juice",
    "1 clove garlic, grated",
    "1 cucumber, thinly sliced and lightly salted",
    "Steamed rice, to serve",
    "Toasted sesame seeds and sliced scallion, to finish",
  ],
  steps: [
    "Stir the soy sauce, honey, vinegar, and garlic into a glaze.",
    "Pat the salmon dry and sear skin-side down in a hot, lightly oiled pan for 4 minutes, until the skin releases on its own.",
    "Flip, cook 2 minutes, then pour in the glaze and spoon it over the fish for 1 minute as it bubbles and thickens.",
    "Flake into big pieces over bowls of rice, checking for pin bones as you go. Add the cucumber alongside.",
    "Spoon the pan glaze over everything and finish with sesame seeds and scallion.",
  ],
  whyItWorks:
    "Sweet-glazed salmon is most kids' first favorite fish — rich enough to stay moist even slightly overcooked, and the flake-it-yourself bowl format beats a fillet staring back from the plate.",
  tips: [
    "Salting the cucumber 10 minutes ahead turns it into a crunchy counterpoint that kids eat like chips.",
    "Frozen fillets work: thaw overnight in the fridge and pat very dry before searing.",
  ],
};

export default recipe;
