import type { Recipe } from "@/content-schema/recipe";

const recipe: Recipe = {
  slug: "black-bean-mango-mash",
  name: "Black bean mango mash",
  foods: ["black-beans", "mango"],
  bands: ["6-8m", "9-12m", "12-24m"],
  method: "mash",
  steps: [
    "Mash 3 tbsp well-cooked black beans, pushing skins through the fork tines.",
    "Mash in 1 tbsp very ripe mango until the mix loosens.",
    "Add a splash of water if it feels pasty; it should drop off a spoon.",
    "Serve on a pre-loaded spoon, or thicker as a scoopable pile from 9 months.",
  ],
  whyItWorks:
    "Beans are a workhorse plant-iron source, and mango's vitamin C unlocks that iron — plus its sweetness makes beans an easy sell on a skeptical day.",
  ironPairing: true,
  storage: "Keeps 48 hours covered in the fridge; stir well, as the mango weeps a little liquid.",
};

export default recipe;
