import type { Recipe } from "@/content-schema/recipe";

const recipe: Recipe = {
  slug: "liver-sweet-potato-blend",
  name: "Liver sweet-potato apple blend",
  foods: ["liver", "sweet-potato", "apple"],
  bands: ["6-8m", "9-12m", "12-24m"],
  method: "blend",
  steps: [
    "Simmer 1 tbsp chopped liver in water until cooked through, about 5 minutes.",
    "Blend the liver with 1/2 cup steamed sweet potato until silky.",
    "Add 2 tbsp unsweetened cooked apple and blend again to mellow the flavor.",
    "Serve about 1–2 tsp of the blend at a time, stirred into other purées if you like.",
  ],
  whyItWorks:
    "Liver is the single densest iron food a baby can eat, and sweet potato plus apple soften its strong taste. Keep portions small — a teaspoon or two, once or twice a week, is plenty.",
  ironPairing: false,
  storage: "Keeps 24 hours in the fridge or 1 month frozen in small dollops; reheat to steaming and cool.",
};

export default recipe;
