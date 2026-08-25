import type { Recipe } from "@/content-schema/recipe";

const recipe: Recipe = {
  slug: "peach-cottage-cheese-whip",
  name: "Peach cottage-cheese whip",
  foods: ["peach", "cottage-cheese"],
  bands: ["6-8m", "9-12m", "12-24m"],
  method: "blend",
  steps: [
    "Blend 3 tbsp cottage cheese until completely smooth, scraping down once.",
    "Add half a ripe peeled peach and blend again until creamy.",
    "Serve on a pre-loaded spoon, or as a dip for soft fruit strips from 9 months.",
  ],
  whyItWorks:
    "Blending erases the lumpy texture that makes many babies refuse cottage cheese, leaving a protein-rich cream that ripe peach sweetens all on its own.",
  ironPairing: false,
  storage: "Keeps 2 days covered in the fridge; stir before serving — it may weep a little liquid.",
};

export default recipe;
