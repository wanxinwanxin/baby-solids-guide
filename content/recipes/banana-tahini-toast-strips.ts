import type { Recipe } from "@/content-schema/recipe";

const recipe: Recipe = {
  slug: "banana-tahini-toast-strips",
  name: "Banana tahini toast strips",
  foods: ["bread", "banana", "tahini"],
  bands: ["9-12m", "12-24m"],
  method: "assemble",
  steps: [
    "Toast a slice of bread lightly and cut it into finger-width strips.",
    "Mash a quarter of a banana with 1 tsp tahini until smooth and spreadable.",
    "Spread a thin layer on each strip — never a thick glob.",
    "Hand baby one strip at a time.",
  ],
  whyItWorks:
    "Banana thins sticky tahini to a safe spread and covers its bitter edge — an easy sesame exposure to keep on rotation, with calcium and healthy fats riding along.",
  ironPairing: false,
  storage: "Assemble fresh; the banana-tahini spread keeps 24 hours covered in the fridge.",
};

export default recipe;
