import type { Recipe } from "@/content-schema/recipe";

const recipe: Recipe = {
  slug: "kiwi-oatmeal-stir",
  name: "Kiwi oatmeal stir-in",
  foods: ["oatmeal", "kiwi"],
  bands: ["6-8m", "9-12m"],
  method: "stir",
  steps: [
    "Mash half a ripe peeled kiwi with a fork until pulpy — scoop out any tough white core.",
    "Stir into 3 tbsp warm cooked iron-fortified oatmeal.",
    "Check the temperature on your wrist and serve on a pre-loaded spoon.",
  ],
  whyItWorks:
    "Kiwi is one of the best vitamin-C fruits going, and pairing it with iron-fortified oatmeal helps that iron absorb — the tang also wakes up plain oats without a grain of sugar.",
  ironPairing: true,
  storage: "Best fresh; keeps 24 hours covered in the fridge — the kiwi gets tangier as it sits.",
};

export default recipe;
