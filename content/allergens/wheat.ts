import type { AllergenProgram } from "@/content-schema/food";
import { SOURCES } from "../sources";

const wheat: AllergenProgram = {
  id: "wheat",
  name: "Wheat",
  firstServe:
    "A spoonful of well-cooked wheat farina (wheat cereal) thinned with breast milk, formula, or water to a smooth, spoonable consistency — or stirred into a puree the baby already knows.",
  doseProgression: [
    "Day 1: a small taste (about ¼ teaspoon of prepared wheat cereal) mixed into a familiar food, early in the day; watch for 2 hours.",
    "If no reaction, repeat with a slightly larger amount over the next several days.",
    "Build to regular servings — a small bowl of farina, strips of soft bread or toast, or well-cooked pasta pieces as texture skills allow.",
  ],
  maintenance:
    "Once tolerated, wheat is easy to keep in the diet several times a week through cereal, bread, and pasta — regular exposure keeps tolerance steady.",
  reactionSigns: [
    "Hives or a raised, itchy rash",
    "Redness around the mouth soon after eating",
    "Vomiting within about 2 hours",
    "Swelling of the lips, face, or eyes",
    "Coughing or wheezing — treat as an emergency",
  ],
  foodSlugs: ["farina", "bread", "pasta"],
  notes: [
    "A wheat allergy is not the same as celiac disease — celiac is a reaction to gluten that develops over time and shows up as chronic GI symptoms and poor growth rather than sudden hives; discuss persistent symptoms with your pediatrician.",
    "Serve every new allergen early in the day so you can observe for the next 2 hours, and introduce one new allergen at a time with about 3 days before the next one.",
  ],
  sources: [SOURCES.eatStudy, SOURCES.aapStartingSolids],
};

export default wheat;
