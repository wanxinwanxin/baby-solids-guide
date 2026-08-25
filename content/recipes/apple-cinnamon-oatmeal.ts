import type { Recipe } from "@/content-schema/recipe";

const recipe: Recipe = {
  slug: "apple-cinnamon-oatmeal",
  name: "Apple cinnamon oatmeal",
  foods: ["apple", "cinnamon", "oatmeal"],
  bands: ["6-8m", "9-12m", "12-24m"],
  method: "stir",
  steps: [
    "Stir 2 tbsp unsweetened applesauce into 3 tbsp warm cooked oatmeal.",
    "Add a small pinch of cinnamon and mix until evenly tan.",
    "Cool to body temperature and serve on a pre-loaded spoon.",
  ],
  whyItWorks:
    "Applesauce sweetens and loosens the oats while cinnamon adds real flavor interest — early spice exposure builds an adventurous eater, and there's zero added sugar.",
  ironPairing: false,
  storage: "Keeps 2 days covered in the fridge; loosen with water or breast milk/formula when reheating.",
};

export default recipe;
