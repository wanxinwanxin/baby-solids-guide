import type { AllergenProgram } from "@/content-schema/food";
import { SOURCES } from "../sources";

const fish: AllergenProgram = {
  id: "fish",
  name: "Fish",
  firstServe:
    "Well-cooked salmon with every bone removed, flaked and mashed with a little water or breast milk into a soft, moist paste, offered alone or in a familiar puree.",
  doseProgression: [
    "Day 1: a small taste (about ¼ teaspoon of mashed cooked fish) mixed into a familiar food, early in the day; watch for 2 hours.",
    "If no reaction, repeat with a slightly larger amount over the next several days.",
    "Build to a regular serving — about an ounce of flaked fish per sitting, rotating among low-mercury species.",
  ],
  maintenance:
    "Once tolerated, serve fish about twice a week, favoring low-mercury choices like salmon, cod, and sardines — the same rhythm the FDA/EPA fish advice recommends for young children.",
  reactionSigns: [
    "Hives or redness, often around the mouth, soon after eating",
    "Vomiting within about 2 hours",
    "Swelling of the lips, face, or eyes",
    "Coughing, wheezing, or labored breathing — treat as an emergency",
  ],
  foodSlugs: ["salmon", "cod", "sardines"],
  notes: [
    "Stick to low-mercury fish (salmon, cod, sardines) and skip high-mercury species like shark, swordfish, king mackerel, and bigeye tuna for young children.",
    "Check flaked fish carefully with your fingers for pin bones before every serving.",
    "Serve every new allergen early in the day so you can observe for the next 2 hours, and introduce one new allergen at a time with about 3 days before the next one.",
  ],
  sources: [SOURCES.eatStudy, SOURCES.aaaaiFoodAllergy, SOURCES.fdaFish],
};

export default fish;
