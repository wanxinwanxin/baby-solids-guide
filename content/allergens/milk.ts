import type { AllergenProgram } from "@/content-schema/food";
import { SOURCES } from "../sources";

const milk: AllergenProgram = {
  id: "milk",
  name: "Milk (dairy)",
  firstServe:
    "A small spoonful of plain, whole-milk yogurt (unsweetened, pasteurized) offered on its own or stirred into a fruit puree the baby already knows.",
  doseProgression: [
    "Day 1: a small taste (about ¼ teaspoon of plain whole-milk yogurt) mixed into a familiar food, early in the day; watch for 2 hours.",
    "If no reaction, repeat with a slightly larger amount over the next several days.",
    "Build to a regular serving — a few tablespoons of yogurt, or a small piece of pasteurized cheese once texture skills allow.",
  ],
  maintenance:
    "Once tolerated, keep dairy foods like yogurt or cheese in the rotation at least twice a week so the exposure stays consistent.",
  reactionSigns: [
    "Hives, welts, or redness around the mouth soon after eating",
    "Vomiting within about 2 hours; swelling of lips or face",
    "Delayed GI patterns over hours to days — blood or mucus in stool, persistent diarrhea, unusual fussiness, or worsening eczema — the typical picture of cow's milk protein allergy (CMPA)",
    "Rarely, FPIES: repetitive, profuse vomiting starting 1–4 hours after the meal, sometimes with lethargy or pallor — milk is one of the more common FPIES triggers",
  ],
  foodSlugs: ["yogurt", "cheese"],
  notes: [
    "Cow's milk as a drink waits until 12 months (it displaces breast milk or formula and is low in iron), but yogurt and cheese as foods are fine from around 6 months.",
    "Serve every new allergen early in the day so you can observe for the next 2 hours, and introduce one new allergen at a time with about 3 days before the next one.",
  ],
  sources: [SOURCES.eatStudy, SOURCES.aaaaiFoodAllergy, SOURCES.aapStartingSolids],
};

export default milk;
