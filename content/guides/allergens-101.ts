import type { Guide } from "@/content-schema/food";
import { SOURCES } from "../sources";

const allergens101: Guide = {
  slug: "allergens-101",
  title: "Allergens, demystified",
  summary:
    "The nine common allergens, why introducing them early protects your baby, and exactly what to watch for after a first taste.",
  minRead: 4,
  sections: [
    {
      heading: "The nine to know",
      paragraphs: [
        "Nine foods account for the large majority of food allergies: peanut, egg, cow's milk, wheat, soy, sesame, tree nuts, fish, and shellfish. These are not foods to fear — they are foods to introduce deliberately, in infant-safe forms (peanut butter thinned with water, well-cooked egg, plain yogurt), while the window for prevention is wide open.",
      ],
    },
    {
      heading: "The old advice was backwards",
      paragraphs: [
        "For years parents were told to delay allergens until age 1, 2, even 3. That advice was wrong, and the reversal is one of the clearest stories in modern pediatrics. The LEAP trial found that high-risk infants who ate peanut regularly from infancy were about 80% less likely to develop peanut allergy than those who avoided it. The EAT trial pointed the same direction for a broader set of allergenic foods.",
        "The underlying lesson: a baby's immune system learns tolerance through the gut. Regular early eating teaches it 'this is food.' Avoidance leaves the question open — and an immune system left guessing sometimes guesses wrong.",
      ],
    },
    {
      heading: "Know your baby's risk tier first",
      paragraphs: [
        "Most babies can start allergens at home with no special preparation. But if your baby has severe eczema or an existing food allergy, talk to your pediatrician before introducing peanut — they may recommend allergy testing or a supervised first taste. Babies with mild eczema can generally go ahead at home with a bit of extra watchfulness. If you're not sure which group your baby falls into, that call belongs to your pediatrician, not to guesswork.",
      ],
    },
    {
      heading: "The routine that makes it easy",
      paragraphs: [
        "One new allergen at a time, so any reaction has an obvious culprit. Serve the first taste early in the day — breakfast or lunch, never dinner — and keep an eye on your baby for about 2 hours afterward, the window when most reactions appear. Start with a small amount, and wait about 3 days before debuting the next new allergen. Non-allergen foods can keep flowing in between.",
        "Here is the part parents most often miss: starting an allergen is only half the job. Keeping it in the diet — roughly twice a week — is what maintains tolerance. A single taste of peanut in month six followed by months of nothing doesn't offer lasting protection. Once a food is in, keep it in the rotation.",
      ],
    },
    {
      heading: "Mild reaction vs. emergency",
      paragraphs: [
        "Mild reactions are by far the more common kind: a few hives around the mouth, a patchy red rash, an episode of vomiting, unusual fussiness. If you see these, stop the food, take photos of any rash, and call your pediatrician the same day to plan next steps.",
        "Call 911 immediately for any sign of a severe reaction: trouble breathing, wheezing, or persistent coughing; swelling of the tongue or lips, or difficulty swallowing; widespread hives together with vomiting; sudden paleness, floppiness, or unresponsiveness. Symptoms in two body systems at once — hives plus repeated vomiting, for example — also mean emergency care now, even if each symptom alone seems mild. Severe first-taste reactions are rare, but knowing the line before you need it is what lets you serve peanut butter with a steady hand.",
      ],
    },
  ],
  sources: [SOURCES.niaid2017, SOURCES.leapStudy, SOURCES.fareEmergencyPlan],
};

export default allergens101;
