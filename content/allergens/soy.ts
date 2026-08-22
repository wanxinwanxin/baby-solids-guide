import type { AllergenProgram } from "@/content-schema/food";
import { SOURCES } from "../sources";

const soy: AllergenProgram = {
  id: "soy",
  name: "Soy",
  firstServe:
    "Silken or soft tofu mashed to a smooth paste and stirred into a puree the baby already knows — plain, with no added salt or sauces.",
  doseProgression: [
    "Day 1: a small taste (about ¼ teaspoon of mashed tofu) mixed into a familiar food, early in the day; watch for 2 hours.",
    "If no reaction, repeat with a slightly larger amount over the next several days.",
    "Build to a regular serving — strips of soft tofu for self-feeding, or well-mashed edamame once texture skills allow.",
  ],
  maintenance:
    "Once tolerated, keep soy foods like tofu or mashed edamame in the diet about twice a week to maintain the exposure.",
  reactionSigns: [
    "Hives or redness around the mouth soon after eating",
    "Vomiting within about 2 hours",
    "Swelling of the lips, face, or eyes",
    "Delayed GI symptoms such as diarrhea or mucus in stool",
    "Rarely, FPIES: repetitive, profuse vomiting starting 1–4 hours after the meal, sometimes with lethargy — soy is one of the more common FPIES triggers",
  ],
  foodSlugs: ["tofu", "edamame"],
  notes: [
    "Whole edamame beans are a choking hazard for infants — mash or finely chop them until chewing is well established.",
    "Serve every new allergen early in the day so you can observe for the next 2 hours, and introduce one new allergen at a time with about 3 days before the next one.",
  ],
  sources: [SOURCES.aaaaiFoodAllergy, SOURCES.aapStartingSolids],
};

export default soy;
