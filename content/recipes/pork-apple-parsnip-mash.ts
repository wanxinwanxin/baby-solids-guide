import type { Recipe } from "@/content-schema/recipe";

const recipe: Recipe = {
  slug: "pork-apple-parsnip-mash",
  name: "Pork apple parsnip mash",
  foods: ["pork", "apple", "parsnip"],
  bands: ["6-8m", "9-12m", "12-24m"],
  method: "mash",
  steps: [
    "Simmer 2 tbsp ground pork in a splash of water until fully cooked and soft.",
    "Steam 1/2 cup parsnip chunks with 2 tbsp chopped apple until fork-tender.",
    "Mash the parsnip and apple together until nearly smooth.",
    "Mash in the pork until no crumbles stand alone; loosen with cooking water.",
  ],
  whyItWorks:
    "Pork brings heme iron and zinc in a milder package than beef, and the apple-parsnip base is naturally sweet — the flavor logic of pork chops and applesauce, sized for a baby.",
  ironPairing: false,
  storage: "Keeps 24 hours in the fridge or 2 months frozen in cubes; reheat to steaming and cool.",
};

export default recipe;
