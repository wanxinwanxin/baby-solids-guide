import type { AllergenProgram } from "@/content-schema/food";
import { SOURCES } from "../sources";

const treeNut: AllergenProgram = {
  id: "tree-nut",
  name: "Tree nuts",
  firstServe:
    "One teaspoon of a single smooth nut butter (almond is a common start) thinned with 2–3 teaspoons of warm water, breast milk, or formula to a drizzly consistency and stirred into a familiar puree.",
  doseProgression: [
    "Day 1: a small taste (about ¼ teaspoon of the thinned nut butter mixture) mixed into a familiar food, early in the day; watch for 2 hours.",
    "If no reaction, repeat over the next several days, working up to the full thinned teaspoon.",
    "Build to a regular serving of that nut, then start the next tree nut (cashew, walnut, ...) as its own new introduction.",
  ],
  maintenance:
    "Once a nut is tolerated, keep it in the diet about twice a week as thinned or thinly spread nut butter — and maintain each tolerated nut separately.",
  reactionSigns: [
    "Hives or raised welts, often starting around the mouth or face",
    "Redness or rash where the nut butter touched the skin",
    "Vomiting within about 2 hours",
    "Swelling of the lips, face, or eyes",
    "Coughing, wheezing, or labored breathing — treat as an emergency",
  ],
  foodSlugs: ["almond-butter", "cashew-butter", "walnut"],
  notes: [
    "Each tree nut is a distinct allergen: tolerating almond says nothing about cashew or walnut, so introduce every nut individually with the same one-at-a-time process.",
    "Whole nuts and nut pieces are choking hazards until at least age 4 — deliver tree nuts only as thinned or paper-thin nut butters, or finely ground into other foods.",
    "Serve every new allergen early in the day so you can observe for the next 2 hours, and introduce one new allergen at a time with about 3 days before the next one.",
  ],
  sources: [SOURCES.aaaaiFoodAllergy, SOURCES.aapStartingSolids],
};

export default treeNut;
