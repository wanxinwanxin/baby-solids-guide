import type { Recipe } from "@/content-schema/recipe";

const recipe: Recipe = {
  slug: "turkey-tomato-couscous",
  name: "Turkey tomato couscous stir",
  foods: ["turkey", "tomato", "couscous"],
  bands: ["9-12m", "12-24m"],
  method: "stir",
  steps: [
    "Stir 2 tbsp finely shredded cooked turkey thigh into 3 tbsp warm couscous.",
    "Grate half a ripe tomato over the bowl and stir until everything is coated.",
    "Add a spoonful of water if the couscous clumps; it should feel moist.",
    "Serve slightly warm in a bowl your baby can scoop from with fingers or a spoon.",
  ],
  whyItWorks:
    "Dark turkey meat carries real iron, tomato's vitamin C boosts it, and soft couscous grains give 9-month-olds safe, satisfying pincer-grasp practice with no prep drama.",
  ironPairing: true,
  storage: "Keeps 24 hours covered in the fridge; sprinkle with water and reheat to steaming, then cool.",
};

export default recipe;
