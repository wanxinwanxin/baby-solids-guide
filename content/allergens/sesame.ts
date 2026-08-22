import type { AllergenProgram } from "@/content-schema/food";
import { SOURCES } from "../sources";

const sesame: AllergenProgram = {
  id: "sesame",
  name: "Sesame",
  firstServe:
    "One teaspoon of smooth tahini (sesame seed paste) thinned with 2–3 teaspoons of warm water, breast milk, or formula until it drizzles, then stirred into a puree the baby already knows.",
  doseProgression: [
    "Day 1: a small taste (about ¼ teaspoon of the thinned tahini mixture) mixed into a familiar food, early in the day; watch for 2 hours.",
    "If no reaction, repeat over the next several days, working up to the full thinned teaspoon.",
    "Build to a regular serving — tahini stirred into yogurt or oatmeal, or spread paper-thin on soft toast strips.",
  ],
  maintenance:
    "Once tolerated, keep sesame in the diet about twice a week — tahini mix-ins and hummus make this easy to sustain.",
  reactionSigns: [
    "Hives or raised welts, often around the mouth or face",
    "Redness or rash where tahini touched the skin",
    "Vomiting within about 2 hours",
    "Swelling of the lips, face, or eyes",
    "Coughing or wheezing — treat as an emergency",
  ],
  foodSlugs: ["tahini"],
  notes: [
    "Like nut butters, tahini is thick and sticky — always thin it to a drizzle or spread it paper-thin; never serve it by the spoonful. A sprinkle of whole sesame seeds delivers too little protein to count as a real exposure.",
    "Serve every new allergen early in the day so you can observe for the next 2 hours, and introduce one new allergen at a time with about 3 days before the next one.",
  ],
  sources: [SOURCES.eatStudy, SOURCES.aaaaiFoodAllergy],
};

export default sesame;
