import type { Recipe } from "@/content-schema/recipe";

const recipe: Recipe = {
  slug: "sardine-tomato-smash",
  name: "Sardine tomato smash",
  foods: ["sardines", "tomato"],
  bands: ["6-8m", "9-12m", "12-24m"],
  method: "mash",
  steps: [
    "Lift the backbone out of 1 water-packed sardine and check for pin bones.",
    "Mash the fillet thoroughly with a fork — the soft bones left mash right in.",
    "Mash in 1 tbsp grated ripe tomato until the mix holds together.",
    "Serve as a mash, or spread on a soft toast strip from 9 months.",
  ],
  whyItWorks:
    "Sardines pack iron, omega-3s, and calcium in one tin, and tomato's vitamin C helps the iron absorb — an easy, low-mercury way to keep the fish allergen exposure regular.",
  ironPairing: true,
  storage: "Serve fresh; opened sardines keep 24 hours covered in the fridge — mash portions as needed.",
};

export default recipe;
