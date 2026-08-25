import type { Recipe } from "@/content-schema/recipe";

const recipe: Recipe = {
  slug: "date-sweetened-oatmeal",
  name: "Date-sweetened oatmeal mash",
  foods: ["dates", "oatmeal", "cinnamon"],
  bands: ["9-12m", "12-24m"],
  method: "mash",
  steps: [
    "Soak 1 pitted date in hot water for 10 minutes until very soft.",
    "Mash the date to a fine paste — check carefully for any pit fragments.",
    "Mash the paste into 3 tbsp warm cooked oatmeal with a pinch of cinnamon.",
    "Serve just warm; the date should be fully worked in, never in chunks.",
  ],
  whyItWorks:
    "One soft-soaked date sweetens a whole bowl of oats the way no syrup needs to — mashed to a paste it's safe from 9 months, with fiber and minerals instead of empty sugar.",
  ironPairing: false,
  storage: "Keeps 2 days covered in the fridge; loosen with water or breast milk/formula when reheating.",
};

export default recipe;
