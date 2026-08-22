import type { AllergenProgram } from "@/content-schema/food";
import { SOURCES } from "../sources";

const shellfish: AllergenProgram = {
  id: "shellfish",
  name: "Shellfish",
  firstServe:
    "Well-cooked shrimp minced very finely and stirred into a moist, familiar puree — shrimp's firm, springy texture makes fine mincing essential at 6 months.",
  doseProgression: [
    "Day 1: a small taste (about ¼ teaspoon of finely minced cooked shrimp) mixed into a familiar food, early in the day; watch for 2 hours.",
    "If no reaction, repeat with a slightly larger amount over the next several days.",
    "Build to a regular serving of finely chopped shrimp folded into rice, pasta, or vegetable dishes.",
  ],
  maintenance:
    "Once tolerated, keep shellfish in the rotation about twice a week so the exposure stays consistent rather than occasional.",
  reactionSigns: [
    "Hives or raised welts, often spreading quickly",
    "Redness and swelling around the mouth, lips, or face",
    "Vomiting within about 2 hours",
    "Coughing, wheezing, or labored breathing — shellfish reactions can be stronger and faster than many other food reactions, so treat any breathing symptom as an emergency",
  ],
  foodSlugs: ["shrimp"],
  notes: [
    "Shellfish allergy tends to be lifelong and its reactions are among the more severe food reactions, so be especially deliberate about the small first dose and the 2-hour observation window.",
    "Crustaceans (shrimp, crab, lobster) and mollusks (clams, scallops) are related but distinct groups — tolerating shrimp does not automatically clear the others.",
    "Serve every new allergen early in the day so you can observe for the next 2 hours, and introduce one new allergen at a time with about 3 days before the next one.",
  ],
  sources: [SOURCES.aaaaiFoodAllergy, SOURCES.aapStartingSolids],
};

export default shellfish;
