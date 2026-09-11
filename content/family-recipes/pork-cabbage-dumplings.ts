import type { FamilyRecipe } from "@/content-schema/recipe";

const recipe: FamilyRecipe = {
  slug: "pork-cabbage-dumplings",
  name: "Pork & cabbage dumplings",
  emoji: "🥟",
  time: "60 min",
  serves: "Makes ~40 dumplings",
  ingredients: [
    "400 g ground pork",
    "300 g napa cabbage, finely chopped and salted",
    "2 scallions, minced",
    "1 tbsp grated ginger",
    "2 tbsp soy sauce",
    "1 tbsp toasted sesame oil",
    "1 egg",
    "40 round dumpling wrappers",
    "Black vinegar for dipping",
  ],
  steps: [
    "Salt the chopped cabbage 10 minutes, then squeeze out the water hard — watery filling is why dumplings burst.",
    "Mix the pork, cabbage, scallions, ginger, soy sauce, sesame oil, and egg, stirring in one direction until sticky.",
    "Set up a family assembly line: a spoonful of filling, wet the wrapper's rim, fold and pinch. Kids' lumpy ones cook just as well.",
    "Boil in batches: when the pot returns to a boil, add a cup of cold water; when it boils again and the dumplings float, they're done.",
    "Serve with black vinegar for dipping. Freeze the rest raw on a tray before bagging.",
  ],
  whyItWorks:
    "Dumpling night is dinner and the activity at once — kids who fold their own dumplings eat their own dumplings. One session stocks the freezer with a two-week supply of 10-minute meals.",
  tips: [
    "A sticky, one-direction-stirred filling holds together instead of crumbling out of the wrapper.",
    "Frozen dumplings go straight into boiling water — never thaw first.",
  ],
};

export default recipe;
