import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const sunflowerSeedButter: Food = {
  slug: "sunflower-seed-butter",
  name: "Sunflower seed butter",
  aliases: ["sunflower butter"],
  category: "protein",
  minAgeMonths: 6,
  ironRich: false,
  commonAllergen: null,
  chokingRisk: "high",
  chokingNotes:
    "Like every thick seed or nut butter, an unthinned glob of sunflower seed butter can plug an infant's airway, and whole sunflower seeds are a choking hazard until at least age 4. Mitigate by thinning it to a drizzle or spreading it paper-thin — never a straight spoonful.",
  nutritionHighlights: [
    "Exceptionally rich in vitamin E, an antioxidant infants need for cell protection",
    "Healthy fats and plant protein that support growth",
    "Provides magnesium and selenium",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "One teaspoon of smooth, unsalted sunflower seed butter whisked with 2–3 teaspoons of warm water, breast milk, or formula to a runny-yogurt drizzle, stirred into a puree the baby already eats.",
      passFailTest:
        "Tilt the spoon: the mixture should pour off in a slow, unbroken ribbon. If it sits on the spoon or strings stickily, add warm liquid and whisk again.",
      whyThisForm:
        "Infants this age cannot dislodge a sticky mass from the palate or throat, so the only safe format for any thick seed butter is fully thinned and folded into a familiar soft food.",
      prepSteps: [
        "Choose 100% smooth sunflower seed butter with no added salt, sugar, or honey.",
        "Whisk 1 teaspoon with 2–3 teaspoons of warm water, breast milk, or formula until it drizzles freely off the spoon.",
        "Stir into a familiar puree or infant cereal rather than serving it on its own.",
      ],
      commonMistakes: [
        "Offering a thick dab straight off the spoon — the glob, not the seed, is the hazard.",
        "Using a 'crunchy' variety with seed pieces, which are unsafe at this age.",
        "Skipping the stir: natural seed butters separate, and the bottom of the jar is far thicker than the top.",
      ],
      cutDiagram: "thin-spread",
      media: [],
    },
    {
      band: "9-12m",
      form: "Sunflower seed butter in a paper-thin, nearly see-through layer on a lightly toasted bread strip about one adult finger long and wide, or whisked thin into yogurt or oatmeal.",
      passFailTest:
        "Hold the strip sideways to the light: the bread should be visible through the layer everywhere. Scrape back any spot with real depth.",
      whyThisForm:
        "Self-feeding with the new pincer grasp takes over here, but the butter's stickiness is unchanged — a translucent smear on a graspable strip is the safe finger-food format.",
      prepSteps: [
        "Toast bread lightly and cut into finger-width strips.",
        "Spread the thinnest film you can and scrape off the excess.",
        "Serve with water in an open cup to help clear the mouth.",
      ],
      commonMistakes: [
        "Letting the layer creep thicker as feeding skills improve — thickness is the hazard at every age.",
      ],
      cutDiagram: "thin-spread",
      media: [],
    },
    {
      band: "12-24m",
      form: "Still thin spreads, drizzles, and stir-ins only, because spoonfuls of sunflower seed butter and whole sunflower seeds remain unsafe throughout toddlerhood.",
      passFailTest:
        "The see-through test on toast still decides: visible thickness when you tilt the strip means too much for a safe serve.",
      whyThisForm:
        "Sticky boluses and small hard seeds both stay real choking hazards until around age 4, even as most other texture limits fall away.",
      prepSteps: [
        "Use thin spreads on toast, crackers, or apple slices softened by cooking.",
        "Whisk it into oatmeal, yogurt, or smoothie-style fruit mashes at family meals.",
      ],
      commonMistakes: [
        "Handing over whole sunflower seeds as a snack — small, hard, and easy to inhale, they are as risky as whole nuts.",
      ],
      cutDiagram: "thin-spread",
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["banana", "apple", "oatmeal", "yogurt"],
  tips: [
    "Same thinning math as peanut butter: 1 teaspoon smooth sunflower seed butter to 2–3 teaspoons warm liquid reaches the safe drizzle.",
    "Not one of the top-9 allergens, so it is usually the spread permitted in nut-free daycares — a practical stand-in wherever peanut and tree-nut butters are banned.",
    "Don't panic at green baked goods: sunflower seed butter reacts harmlessly with baking soda and can tint muffins or pancakes green.",
    "Warm the mixing liquid first; cold liquid leaves lumps that take three times the whisking.",
  ],
  sources: [SOURCES.wicGuide, SOURCES.aapChoking, SOURCES.cdcChokingHazards],
  nutrients: ["healthyFats", "protein"],
  servingGuidance: [
    {
      band: "6-8m",
      typicalAmount:
        "One teaspoon, whisked thin with warm liquid and stirred into a familiar puree — a little delivers a lot.",
    },
    {
      band: "9-12m",
      typicalAmount:
        "A paper-thin smear on one or two toast strips, or a teaspoon whisked thin into yogurt or oatmeal.",
    },
    {
      band: "12-24m",
      typicalAmount:
        "A teaspoon or two across the day as thin spreads, drizzles, and stir-ins — never by the spoonful.",
    },
  ],
  watchOuts: [
    "Many jars carry added sugar or salt — the ingredient list should read sunflower seeds and little else.",
  ],
  emoji: "🌻",
};

export default sunflowerSeedButter;
