import type { Recipe } from "@/content-schema/recipe";

const recipe: Recipe = {
  slug: "pear-prune-mash",
  name: "Pear prune mash",
  foods: ["pear", "prunes"],
  bands: ["6-8m", "9-12m"],
  method: "mash",
  steps: [
    "Soak 2 pitted prunes in hot water for 10 minutes until very soft; drain.",
    "Mash the prunes to a smooth paste with a fork, removing any tough bits.",
    "Mash in half a very ripe peeled pear until mostly smooth.",
  ],
  whyItWorks:
    "Pear and prune are the classic gentle remedy when starting solids slows things down in the diaper — both bring natural sorbitol and fiber, and it tastes like caramel-sweet fruit.",
  ironPairing: false,
  storage: "Keeps 3 days covered in the fridge; freezes well in cubes for 2 months.",
};

export default recipe;
