import type { Recipe } from "@/content-schema/recipe";

const recipe: Recipe = {
  slug: "blueberry-pear-freezer-cubes",
  name: "Blueberry pear freezer cubes",
  foods: ["blueberry", "pear"],
  bands: ["6-8m", "9-12m"],
  method: "freeze-cubes",
  steps: [
    "Blend a handful of blueberries with half a ripe peeled pear until smooth.",
    "Strain only if the skins bother your baby — most blend right in.",
    "Freeze in an ice-cube tray, then transfer the cubes to a freezer bag.",
    "Thaw 1–2 cubes in the fridge; stir into porridge or serve as is.",
  ],
  whyItWorks:
    "Pear's mild sweetness rounds out blueberry's tang, and the deep purple color makes any porridge or yogurt instantly interesting — a two-fruit stash for rushed mornings.",
  ironPairing: false,
  storage: "Freezer cubes keep 2 months; thawed cubes keep 24 hours in the fridge — never refreeze.",
};

export default recipe;
