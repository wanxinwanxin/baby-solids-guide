import type { Recipe } from "@/content-schema/recipe";

const recipe: Recipe = {
  slug: "raspberry-amaranth-porridge",
  name: "Raspberry amaranth porridge",
  foods: ["amaranth", "raspberry", "banana"],
  bands: ["6-8m", "9-12m"],
  method: "stir",
  steps: [
    "Mash 4 raspberries and a few slices of ripe banana together with a fork.",
    "Stir into 3 tbsp cooked amaranth porridge while it's still warm.",
    "Loosen with water or breast milk/formula if it stiffens up.",
    "Serve just warm on a pre-loaded spoon.",
  ],
  whyItWorks:
    "Tiny amaranth grains cook into a naturally smooth, iron-rich porridge, raspberry's vitamin C helps that iron absorb, and banana rounds out the tartness — no sweetener needed.",
  ironPairing: true,
  storage: "Keeps 2 days covered in the fridge; amaranth sets when cold, so stir in a splash of water to reheat.",
};

export default recipe;
