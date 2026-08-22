import type { AllergenProgram } from "@/content-schema/food";
import { SOURCES } from "../sources";

const peanut: AllergenProgram = {
  id: "peanut",
  name: "Peanut",
  firstServe:
    "One teaspoon of smooth, salt-free peanut butter thinned with 2–3 teaspoons of warm water, breast milk, or formula to a drizzly consistency and stirred into a puree the baby already knows (peanut powder in oatmeal works just as well).",
  doseProgression: [
    "Day 1: a small taste (about ¼ teaspoon of the thinned mixture) stirred into a familiar food, early in the day; watch for 2 hours.",
    "If no reaction, repeat over the next several days, working up to the full thinned teaspoon.",
    "Build to a regular serving of about 2 teaspoons of peanut butter (thinned or spread paper-thin) per sitting.",
  ],
  maintenance:
    "Once tolerated, keep peanut in the diet about twice a week (roughly 2 teaspoons of peanut butter per serving) — steady ongoing exposure is what maintains tolerance.",
  reactionSigns: [
    "Hives or raised welts, often starting around the mouth or face",
    "Redness or a blotchy rash where peanut touched the skin",
    "Vomiting within about 2 hours of eating",
    "Swelling of the lips, face, or around the eyes",
    "Coughing, wheezing, or labored breathing — treat as an emergency",
  ],
  foodSlugs: ["peanut-butter"],
  notes: [
    "NIAID risk tiers: a baby with severe eczema or an existing egg allergy should see the pediatrician or an allergist BEFORE peanut is introduced — supervised introduction, possibly around 4–6 months, may be recommended. Babies with mild-to-moderate eczema can usually start at home around 6 months; babies with neither risk factor need no special precautions.",
    "Serve every new allergen early in the day so you can observe for the next 2 hours, and introduce one new allergen at a time with about 3 days before the next one.",
  ],
  sources: [SOURCES.niaid2017, SOURCES.leapStudy],
};

export default peanut;
