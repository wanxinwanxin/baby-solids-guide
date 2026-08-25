import type { Recipe } from "@/content-schema/recipe";

const recipe: Recipe = {
  slug: "quinoa-veggie-cubes",
  name: "Quinoa kale zucchini freezer cubes",
  foods: ["quinoa", "kale", "zucchini"],
  bands: ["6-8m", "9-12m", "12-24m"],
  method: "freeze-cubes",
  steps: [
    "Blend 1 cup cooked quinoa with 1 cup steamed zucchini chunks.",
    "Add a small handful of steamed kale, stems removed, and blend smooth.",
    "The zucchini's water usually loosens it enough; add a splash more if not.",
    "Freeze in an ice-cube tray; pop cubes into a labeled freezer bag.",
    "Reheat 1–2 cubes to steaming, stir, and cool to body temperature.",
  ],
  whyItWorks:
    "Quinoa is a rare grain with meaningful iron and complete protein, and kale's vitamin C helps that iron land — mild zucchini stretches it into a week of green dinners.",
  ironPairing: true,
  storage: "Freezer cubes keep 2 months; thawed cubes keep 24 hours in the fridge — never refreeze.",
};

export default recipe;
