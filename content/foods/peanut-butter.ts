import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

/**
 * CANONICAL ALLERGEN TEMPLATE — allergen foods add precise first-exposure
 * guidance (early in the day, watch 2 hours) and reference the NIAID/LEAP
 * evidence base in sources.
 */
const peanutButter: Food = {
  slug: "peanut-butter",
  name: "Peanut butter",
  aliases: ["peanut"],
  category: "protein",
  minAgeMonths: 6,
  ironRich: false,
  commonAllergen: "peanut",
  chokingRisk: "high",
  chokingNotes:
    "A thick glob of peanut butter can plug an airway like a stopper, and whole peanuts are off-limits until at least age 4. Mitigate by always thinning smooth peanut butter to a drizzle or spreading it paper-thin — never serve it by the spoonful.",
  nutritionHighlights: [
    "Protein and healthy fats that support rapid infant growth",
    "A natural source of vitamin E and niacin",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "One teaspoon of smooth, salt-free peanut butter thinned with 2–3 teaspoons of warm water, breast milk, or formula to a drizzly, runny-yogurt consistency, stirred into a puree the baby already knows.",
      passFailTest:
        "Lift the spoon: the mixture should ribbon off like runny yogurt. If it clings in a sticky lump, keep thinning.",
      whyThisForm:
        "Young infants cannot clear sticky boluses from the roof of the mouth or throat; fully thinned peanut butter delivers the allergen protein with none of the plug-shaped risk.",
      prepSteps: [
        "Choose 100% smooth peanut butter with no added salt, sugar, or honey (honey is off-limits before 12 months).",
        "Stir 1 teaspoon with 2–3 teaspoons of warm water, breast milk, or formula until it drizzles off the spoon.",
        "Mix into a familiar food (oatmeal, fruit puree) — never a brand-new food, so a reaction can be traced.",
        "First time: serve early in the day, start with a small taste, and watch for 2 hours.",
      ],
      commonMistakes: [
        "Serving a thick glob straight off the spoon — the single most dangerous peanut mistake.",
        "Using crunchy peanut butter: the nut fragments are a choking hazard.",
        "Introducing at dinner, where a delayed reaction lands overnight when you can't observe.",
        "Mixing into another new food, which makes a reaction impossible to attribute.",
      ],
      cutDiagram: "thin-spread",
      media: [],
    },
    {
      band: "9-12m",
      form: "Peanut butter spread paper-thin — a see-through layer — on a soft toast strip about the size of one adult finger, or stirred into yogurt or oatmeal.",
      passFailTest:
        "Hold the toast strip up: you should almost see the bread through the peanut butter layer. If the layer has thickness, scrape some off.",
      whyThisForm:
        "Older babies handle finger foods well, but peanut butter's stickiness hasn't gotten safer — a thin smear on a graspable strip keeps the exposure going as self-feeding takes over.",
      prepSteps: [
        "Toast bread lightly, cut into finger-width strips.",
        "Spread the thinnest possible layer of smooth peanut butter.",
        "Serve alongside water in an open cup.",
      ],
      commonMistakes: [
        "Letting the layer creep thicker as the baby seems more capable — thickness, not age, is the hazard.",
      ],
      cutDiagram: "thin-spread",
      media: [],
    },
    {
      band: "12-24m",
      form: "Still only thin spreads on toast or crackers, or thinned into foods; spoonfuls of peanut butter and whole peanuts remain unsafe throughout toddlerhood.",
      passFailTest:
        "Same see-through test as before: if the spread has visible thickness, it's too much.",
      whyThisForm:
        "Choking risk from sticky globs and whole nuts persists until around age 4, long after other texture restrictions have relaxed.",
      prepSteps: [
        "Keep peanut butter in the weekly rotation as thin spreads and mix-ins.",
        "Introduce peanut in family dishes (sauces, stews) once tolerated.",
      ],
      commonMistakes: [
        "Assuming a toddler with teeth can handle a spoonful of peanut butter or whole peanuts — neither is safe yet.",
      ],
      cutDiagram: "thin-spread",
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["banana", "oatmeal", "apple", "yogurt"],
  tips: [
    "Thinning ratio to memorize: 1 teaspoon smooth peanut butter to 2–3 teaspoons warm liquid gives the safe drizzly consistency.",
    "Peanut powder (defatted peanut flour) stirred into a familiar puree is the easiest, safest first form — same allergen protein, zero stickiness.",
    "After successful introduction, keep peanut in the diet about twice a week (roughly 2 teaspoons of peanut butter per serving) — consistent ongoing exposure is what maintains tolerance.",
    "Always serve new allergens early in the day so you can observe for the following 2 hours.",
  ],
  sources: [SOURCES.niaid2017, SOURCES.leapStudy, SOURCES.aapStartingSolids],
};

export default peanutButter;
