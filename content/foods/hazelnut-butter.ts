import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const hazelnutButter: Food = {
  slug: "hazelnut-butter",
  name: "Hazelnut butter",
  aliases: ["hazelnut", "filbert butter"],
  category: "protein",
  minAgeMonths: 6,
  ironRich: false,
  commonAllergen: "tree-nut",
  chokingRisk: "high",
  chokingNotes:
    "A thick glob of hazelnut butter is sticky enough to seal an infant's airway like a stopper, and whole hazelnuts are round, hard, and off-limits until at least age 4. Mitigate by thinning smooth hazelnut butter to a drizzle or scraping it paper-thin — never a spoonful, never the chocolate spread.",
  nutritionHighlights: [
    "Mostly monounsaturated fat plus plant protein for steady growth",
    "A strong everyday source of vitamin E",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "One teaspoon of smooth, unsalted 100% hazelnut butter whisked with 2–3 teaspoons of warm water, breast milk, or formula until it drizzles like runny yogurt, folded into a puree the baby already eats.",
      passFailTest:
        "Lift the spoon and tilt it: the mixture should ribbon off in a slow, steady drizzle. If it clings in a sticky clump, whisk in more warm liquid.",
      whyThisForm:
        "A young infant cannot clear a sticky bolus from the roof of the mouth or throat, so the allergen must arrive fully thinned — the protein exposure works identically without the plug-shaped texture.",
      prepSteps: [
        "Choose a jar whose ingredient list reads hazelnuts and nothing else — chocolate hazelnut spreads are mostly sugar and are not this food.",
        "Whisk 1 teaspoon with 2–3 teaspoons of warm water, breast milk, or formula until it drizzles freely off the spoon.",
        "Fold it into a familiar food (oatmeal, banana mash) — never with another new food, so any reaction can be traced to hazelnut.",
        "First time: serve early in the day, offer a small amount, and watch for 2 hours.",
      ],
      commonMistakes: [
        "Reaching for the famous chocolate spread — that jar is sugar first, and it is not how hazelnut gets introduced.",
        "Serving a thick dab straight from the jar — the glob, not the nut, is the choking hazard.",
        "Introducing hazelnut at dinner, so a delayed reaction would land overnight when no one is watching.",
      ],
      cutDiagram: "thin-spread",
      media: [],
    },
    {
      band: "9-12m",
      form: "Hazelnut butter scraped into a paper-thin, nearly see-through film on a lightly toasted bread strip about the length and width of one adult finger.",
      passFailTest:
        "Hold the strip up to the light: the bread should show through the smear everywhere. Any spot with real depth gets scraped back down.",
      whyThisForm:
        "Self-feeding takes over with the new pincer grasp, but the butter's stickiness has not gotten safer — a translucent smear on a graspable strip keeps the exposure going.",
      prepSteps: [
        "Toast bread lightly and cut it into finger-width strips.",
        "Spread the thinnest layer of smooth hazelnut butter you can manage, scraping off the excess.",
        "Offer water in an open cup alongside to help clear the mouth.",
      ],
      commonMistakes: [
        "Letting the layer creep thicker because the baby 'eats so well now' — thickness, not skill, is the hazard.",
      ],
      cutDiagram: "thin-spread",
      media: [],
    },
    {
      band: "12-24m",
      form: "Still only thin spreads on toast or soft crackers, or hazelnut butter whisked into porridge and yogurt, because spoonfuls and whole hazelnuts stay unsafe throughout toddlerhood.",
      passFailTest:
        "The see-through test still decides: tilt the toast, and any visible thickness of spread means too much for a safe serve.",
      whyThisForm:
        "Sticky globs and round, hard whole nuts both remain top choking hazards until around age 4, long after most other texture rules have relaxed.",
      prepSteps: [
        "Keep hazelnut in the weekly rotation as thin spreads and stir-ins.",
        "Whisk thinned hazelnut butter into oatmeal or plain yogurt with mashed pear at family breakfasts.",
      ],
      commonMistakes: [
        "Assuming a toddler with teeth can manage whole hazelnuts — a rounder, harder nut than most, and among the riskiest to inhale.",
      ],
      cutDiagram: "thin-spread",
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["banana", "oatmeal", "pear", "yogurt"],
  tips: [
    "The ratio to memorize: 1 teaspoon smooth hazelnut butter to 2–3 teaspoons warm liquid reaches the safe, drizzly consistency every time.",
    "Read the label twice — 'hazelnut spread' on the shelf usually means a chocolate-sugar product; the baby's jar should list hazelnuts only.",
    "Each tree nut is a distinct allergen: tolerating almond or walnut says nothing about hazelnut, so it gets its own watched first serving.",
    "Once tolerated, keep hazelnut appearing about twice a week — steady ongoing exposure is what maintains tolerance.",
    "Natural jars separate — stir the oil back through before measuring, because the bottom of the jar is far thicker than the top.",
  ],
  sources: [SOURCES.eatStudy, SOURCES.aaaaiFoodAllergy, SOURCES.aapChoking],
  nutrients: ["healthyFats", "protein"],
  servingGuidance: [
    {
      band: "6-8m",
      typicalAmount:
        "About 1 teaspoon, thinned to a drizzle and folded into a familiar puree — a taste-sized exposure is plenty, and the baby sets the pace.",
      frequency: "About twice a week once tolerated.",
      note: "Each tree nut is its own allergen — hazelnut needs its own watched first serving.",
    },
    {
      band: "9-12m",
      typicalAmount:
        "A see-through smear on one or two toast strips — some days one lick is the whole serving, and that still counts.",
      frequency: "Keep it appearing about twice a week.",
    },
    {
      band: "12-24m",
      typicalAmount:
        "A teaspoon or two across the day as thin spreads and stir-ins — never by the spoonful.",
    },
  ],
  watchOuts: [
    "Chocolate hazelnut spreads are mostly sugar with some palm oil — they are a dessert, not an introduction food for a baby.",
    "Tolerating hazelnut says nothing about other tree nuts — each one needs its own separate introduction.",
  ],
  emoji: "🌰",
};

export default hazelnutButter;
