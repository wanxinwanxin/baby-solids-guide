import type { Recipe } from "@/content-schema/recipe";

const recipe: Recipe = {
  slug: "lamb-squash-kale-cubes",
  name: "Lamb butternut kale freezer cubes",
  foods: ["lamb", "butternut-squash", "kale"],
  bands: ["6-8m", "9-12m", "12-24m"],
  method: "freeze-cubes",
  steps: [
    "Simmer 1/2 cup ground lamb in water until cooked through and very soft.",
    "Blend the lamb with 1 cup steamed butternut squash cubes.",
    "Add a small handful of steamed kale, stems removed, and blend smooth.",
    "Loosen with the cooking water until the purée drops slowly off a spoon.",
    "Freeze in an ice-cube tray; reheat cubes to steaming and cool before serving.",
  ],
  whyItWorks:
    "Lamb is one of the richest heme-iron meats, kale adds vitamin C to help it absorb, and sweet squash rounds off the gamey edge so first tastes go down easier.",
  ironPairing: true,
  storage: "Freezer cubes keep 2 months; thawed cubes keep 24 hours in the fridge — never refreeze.",
};

export default recipe;
