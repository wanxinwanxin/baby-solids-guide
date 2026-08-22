import type { AllergenProgram } from "@/content-schema/food";
import { SOURCES } from "../sources";

const egg: AllergenProgram = {
  id: "egg",
  name: "Egg",
  firstServe:
    "A fully cooked egg — hard-boiled and mashed to a smooth paste with a little breast milk, formula, or water, or firmly set scrambled egg mashed into a familiar puree.",
  doseProgression: [
    "Day 1: a small taste (about ¼ teaspoon of mashed cooked egg) mixed into a familiar food, early in the day; watch for 2 hours.",
    "If no reaction, repeat with a slightly larger amount over the next several days.",
    "Build to a regular serving of roughly half an egg, then a whole egg as appetite allows.",
  ],
  maintenance:
    "Once tolerated, keep well-cooked egg on the menu about twice a week — regular exposure helps the immune system stay comfortable with it.",
  reactionSigns: [
    "Hives or raised welts on the face or body",
    "Redness around the mouth soon after eating",
    "Vomiting within about 2 hours",
    "Swelling of the lips, face, or eyes",
    "Coughing or wheezing — treat as an emergency",
  ],
  foodSlugs: ["egg"],
  notes: [
    "Fully cooked only: whites and yolks should be firmly set. No runny yolks, soft-set eggs, or raw batter — undercooked egg carries both a higher allergenic load and a food-poisoning risk for infants.",
    "Serve every new allergen early in the day so you can observe for the next 2 hours, and introduce one new allergen at a time with about 3 days before the next one.",
  ],
  sources: [SOURCES.eatStudy, SOURCES.aaaaiFoodAllergy, SOURCES.aapStartingSolids],
};

export default egg;
