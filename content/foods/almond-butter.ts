import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const almondButter: Food = {
  slug: "almond-butter",
  name: "Almond butter",
  aliases: ["almond"],
  category: "protein",
  minAgeMonths: 6,
  ironRich: false,
  commonAllergen: "tree-nut",
  chokingRisk: "high",
  chokingNotes:
    "A thick glob of almond butter is sticky enough to plug an infant's airway like a stopper, and whole almonds are off-limits until at least age 4. Mitigate by thinning smooth almond butter to a drizzly consistency or spreading it paper-thin — never offer it by the spoonful.",
  nutritionHighlights: [
    "Healthy monounsaturated fats and protein that support rapid infant growth",
    "One of the richest everyday food sources of vitamin E",
    "Contributes some calcium and magnesium",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "One teaspoon of smooth, unsalted almond butter whisked with 2–3 teaspoons of warm water, breast milk, or formula until it drizzles like runny yogurt, then stirred into a puree the baby already eats.",
      passFailTest:
        "Lift the spoon and watch: the mixture should ribbon off in a steady drizzle. If it hangs on in a sticky clump, add more warm liquid and stir again.",
      whyThisForm:
        "Young infants cannot clear a sticky bolus from the roof of the mouth or throat, so the allergen has to arrive fully thinned — the protein exposure works just as well without the plug-shaped texture.",
      prepSteps: [
        "Choose 100% smooth almond butter with no added salt, sugar, or honey (honey stays off-limits before 12 months).",
        "Whisk 1 teaspoon with 2–3 teaspoons of warm water, breast milk, or formula until it drizzles off the spoon.",
        "Stir it into a familiar food (oatmeal, banana puree) — never another new food, so any reaction can be traced to almond.",
        "First time: serve early in the day, a small amount, and watch for 2 hours.",
      ],
      commonMistakes: [
        "Serving a thick blob straight from the jar — thickness, not the nut itself, is the choking hazard.",
        "Using a crunchy or 'stir-in bits' variety: nut fragments are unsafe at this age.",
        "Introducing almond in the evening, so a delayed reaction would surface overnight when no one is watching.",
      ],
      cutDiagram: "thin-spread",
      media: [],
    },
    {
      band: "9-12m",
      form: "Almond butter scraped into a paper-thin, nearly see-through layer on a lightly toasted bread strip about the length and width of one adult finger.",
      passFailTest:
        "Hold the strip up to the light: you should almost make out the bread through the smear. A layer with visible thickness needs to be scraped back down.",
      whyThisForm:
        "The emerging pincer grasp makes finger foods the main event now, but almond butter's stickiness has not gotten any safer — a translucent smear on a graspable strip keeps the exposure going.",
      prepSteps: [
        "Toast bread lightly and cut it into finger-width strips.",
        "Spread the thinnest layer of smooth almond butter you can manage, scraping off any excess.",
        "Offer water in an open cup alongside to help clear the mouth.",
      ],
      commonMistakes: [
        "Letting the layer thicken because the baby 'handles food well now' — the hazard is the texture, not the skill level.",
      ],
      cutDiagram: "thin-spread",
      media: [],
    },
    {
      band: "12-24m",
      form: "Still only thin spreads on toast or soft crackers, or almond butter whisked into yogurt and porridge; spoonfuls and whole or slivered almonds stay unsafe throughout toddlerhood.",
      passFailTest:
        "Same see-through check: if the spread shows thickness when you tilt the toast, remove some before serving.",
      whyThisForm:
        "Molars help with many textures, but sticky globs and hard whole nuts remain top choking hazards until around age 4 — long after most other restrictions relax.",
      prepSteps: [
        "Keep almond in the weekly rotation as thin spreads and stir-ins.",
        "Fold thinned almond butter into family dishes like oatmeal or noodle sauces once it is tolerated.",
      ],
      commonMistakes: [
        "Handing over whole or slivered almonds because the toddler has teeth — front teeth bite, but the molars that grind hard nuts safely are years away.",
      ],
      cutDiagram: "thin-spread",
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["banana", "oatmeal", "pear", "yogurt"],
  tips: [
    "The ratio to memorize: 1 teaspoon smooth almond butter to 2–3 teaspoons warm liquid gives the safe, drizzly consistency every time.",
    "Warm the liquid first — cold milk leaves stubborn lumps, while warm liquid whisks smooth in seconds.",
    "Each tree nut is a distinct allergen: tolerating almond does not guarantee tolerating cashew or walnut, so introduce each nut separately.",
    "Once tolerated, keep almond in the diet about twice a week — steady ongoing exposure is what maintains tolerance.",
    "Finely ground almond flour stirred into a familiar puree delivers the same allergen protein with zero stickiness to manage.",
  ],
  sources: [SOURCES.eatStudy, SOURCES.aaaaiFoodAllergy, SOURCES.aapChoking],
  nutrients: ["healthyFats", "protein"],
  servingGuidance: [
    {
      band: "6-8m",
      typicalAmount:
        "About 1 teaspoon, thinned to a drizzle and folded into a familiar puree — a taste-sized exposure is plenty; the baby decides how much goes in.",
      frequency: "About twice a week once tolerated",
    },
    {
      band: "9-12m",
      typicalAmount:
        "A see-through smear on one or two toast strips — offer without chasing; some days a lick is the whole serving.",
      frequency: "Keep it appearing about twice a week",
    },
    {
      band: "12-24m",
      typicalAmount:
        "A thin spread on a strip of toast or a teaspoon whisked into porridge — follow the toddler's appetite, not the jar.",
    },
  ],
  watchOuts: [
    "Many jars carry added salt, sugar, or honey — choose a 100% almond, unsalted variety.",
    "Tolerating almond says nothing about other tree nuts — each one needs its own separate introduction.",
  ],
  emoji: "🌰",
};

export default almondButter;
