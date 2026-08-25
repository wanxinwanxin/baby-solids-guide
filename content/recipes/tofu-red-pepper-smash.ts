import type { Recipe } from "@/content-schema/recipe";

const recipe: Recipe = {
  slug: "tofu-red-pepper-smash",
  name: "Tofu red pepper smash",
  foods: ["tofu", "bell-pepper"],
  bands: ["6-8m", "9-12m", "12-24m"],
  method: "mash",
  steps: [
    "Steam a few strips of red bell pepper until very soft; slip off the skins.",
    "Mash 3 tbsp firm tofu with a fork until crumbly-smooth.",
    "Mash the pepper into the tofu until the mix turns pale orange.",
    "Serve as a mash, or roll into soft pinches for practicing pincer grasp.",
  ],
  whyItWorks:
    "Tofu brings plant iron plus a soy exposure worth keeping regular, and red pepper is one of the richest vitamin-C foods there is — sweet enough that babies rarely object.",
  ironPairing: true,
  storage: "Keeps 24 hours covered in the fridge; drain any pooled water and stir before serving.",
};

export default recipe;
