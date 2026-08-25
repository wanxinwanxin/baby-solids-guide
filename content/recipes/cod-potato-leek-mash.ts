import type { Recipe } from "@/content-schema/recipe";

const recipe: Recipe = {
  slug: "cod-potato-leek-mash",
  name: "Cod potato leek mash",
  foods: ["cod", "potato", "leek"],
  bands: ["6-8m", "9-12m", "12-24m"],
  method: "mash",
  steps: [
    "Steam a small cod fillet until it flakes; check twice for pin bones.",
    "Steam 1/2 cup potato chunks with 2 tbsp sliced leek until both are very soft.",
    "Mash the potato and leek together, adding water or milk feed to loosen.",
    "Flake in the cod and mash until it disappears into the potato.",
  ],
  whyItWorks:
    "Cod is the mildest fish there is, and buttery potato with sweet leek hides it in comfort-food form — a low-drama way to keep fish on the menu every week.",
  ironPairing: false,
  storage: "Keeps 24 hours covered in the fridge; reheat to steaming, stir well, and cool before serving.",
};

export default recipe;
