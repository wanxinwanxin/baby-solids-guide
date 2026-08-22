import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const pumpkinSeedButter: Food = {
  slug: "pumpkin-seed-butter",
  name: "Pumpkin seed butter",
  aliases: ["pepita butter", "pumpkin seed spread"],
  category: "protein",
  minAgeMonths: 6,
  ironRich: true,
  commonAllergen: null,
  chokingRisk: "high",
  chokingNotes:
    "Like every thick seed or nut butter, an unthinned glob of pumpkin seed butter can plug an infant's airway like a stopper, and whole pumpkin seeds stay a choking hazard until at least age 4. Mitigate by thinning it to a drizzle or spreading it paper-thin — never a straight spoonful.",
  nutritionHighlights: [
    "One of the few spreads that is genuinely iron-rich — a real asset from 6 months, when iron stores run low",
    "Notably high in zinc, which supports growth and immune function",
    "Healthy fats and plant protein in a concentrated, easy-to-add form",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "One teaspoon of smooth, unsalted pumpkin seed butter whisked with 2–3 teaspoons of warm water, breast milk, or formula until it drizzles like runny yogurt, stirred into a familiar puree or infant cereal.",
      passFailTest:
        "Tilt the spoon: the deep-green mixture should pour off in a slow, unbroken ribbon. If it sits on the spoon or strings stickily, whisk in more warm liquid.",
      whyThisForm:
        "Infants this age cannot dislodge a sticky mass from the palate or throat, so any thick seed butter has to arrive fully thinned and folded into a soft food they already manage.",
      prepSteps: [
        "Choose 100% pumpkin seed butter with no added salt, sugar, or honey — the ingredient list should be one word long.",
        "Whisk 1 teaspoon with 2–3 teaspoons of warm water, breast milk, or formula until it drizzles freely off the spoon.",
        "Stir it into oatmeal, a vegetable mash, or fruit puree rather than serving it on its own.",
      ],
      commonMistakes: [
        "Offering a thick dab straight off the spoon — the glob, not the seed, is the hazard.",
        "Skipping the jar stir: natural seed butters separate, and the bottom half is far thicker than the top.",
        "Worrying about the dark green-brown color — that is simply what pumpkin seeds look like blended.",
      ],
      cutDiagram: "thin-spread",
      media: [],
    },
    {
      band: "9-12m",
      form: "Pumpkin seed butter in a paper-thin, nearly see-through layer on a lightly toasted bread strip about one adult finger long and wide, or whisked thin into yogurt or oatmeal.",
      passFailTest:
        "Hold the strip sideways to the light: the bread should show through the green smear everywhere, with no spot of real depth left behind.",
      whyThisForm:
        "The new pincer grasp puts finger foods in charge, but the butter's stickiness is unchanged — a translucent smear on a graspable strip is the safe finger-food format.",
      prepSteps: [
        "Toast bread lightly and cut it into finger-width strips.",
        "Spread the thinnest film you can manage and scrape off any excess.",
        "Serve with water in an open cup to help clear the mouth.",
      ],
      commonMistakes: [
        "Letting the layer thicken as feeding skills improve — thickness is the hazard at every age, not ability.",
      ],
      cutDiagram: "thin-spread",
      media: [],
    },
    {
      band: "12-24m",
      form: "Still thin spreads, drizzles, and stir-ins only, because spoonfuls of pumpkin seed butter and whole pumpkin seeds remain unsafe throughout toddlerhood.",
      passFailTest:
        "The see-through test on toast still decides: visible thickness when you tilt the strip means scrape some off before serving.",
      whyThisForm:
        "Sticky boluses and small hard seeds both stay genuine choking hazards until around age 4, even as most other texture limits fall away.",
      prepSteps: [
        "Use thin spreads on toast or soft crackers, and whisk it into porridge or yogurt at family meals.",
        "Drizzle the thinned version over roasted vegetable mash or beans for an iron top-up.",
      ],
      commonMistakes: [
        "Handing over whole roasted pumpkin seeds as a snack — small, hard, and easy to inhale, they are as risky as whole nuts.",
      ],
      cutDiagram: "thin-spread",
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["oatmeal", "banana", "apple", "yogurt"],
  tips: [
    "Same thinning math as peanut butter: 1 teaspoon smooth pumpkin seed butter to 2–3 teaspoons warm liquid reaches the safe drizzle.",
    "Pair it with vitamin C in the same meal — stirred into oatmeal with mashed strawberry or served near orange segments — to help the plant iron absorb.",
    "Not one of the top-9 allergens, so it is usually welcome in nut-free daycares where peanut and tree-nut butters are banned.",
    "Warm the mixing liquid first; cold liquid leaves stubborn lumps that take three times the whisking.",
  ],
  sources: [SOURCES.wicGuide, SOURCES.aapChoking, SOURCES.cdcChokingHazards],
  nutrients: ["iron", "zinc", "healthyFats", "protein"],
  servingGuidance: [
    {
      band: "6-8m",
      typicalAmount:
        "One teaspoon, whisked thin with warm liquid and stirred into a familiar puree — a small amount carries a lot of iron.",
    },
    {
      band: "9-12m",
      typicalAmount:
        "A paper-thin smear on one or two toast strips, or a teaspoon whisked thin into yogurt or oatmeal — offer, then let the baby decide.",
    },
    {
      band: "12-24m",
      typicalAmount:
        "A teaspoon or two across the day as thin spreads, drizzles, and stir-ins — never by the spoonful.",
    },
  ],
  watchOuts: [
    "Many jars carry added sugar or salt — the ingredient list should read pumpkin seeds and little else.",
    "It stains: the deep green marks bibs and grout-colored trays, so dress for it.",
  ],
  emoji: "🎃",
};

export default pumpkinSeedButter;
