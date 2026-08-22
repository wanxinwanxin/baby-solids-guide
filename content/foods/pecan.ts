import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const pecan: Food = {
  slug: "pecan",
  name: "Pecan (ground)",
  aliases: ["pecans", "ground pecan"],
  category: "protein",
  minAgeMonths: 6,
  ironRich: false,
  commonAllergen: "tree-nut",
  chokingRisk: "high",
  chokingNotes:
    "Whole, halved, or chopped pecans are hard, angular, and exactly the size that wedges in an infant airway — pecan pieces of any size stay off-limits until at least age 4. Mitigate by grinding pecans to a flour-fine powder with no visible fragments and stirring it completely into purees, oatmeal, or yogurt.",
  nutritionHighlights: [
    "Mostly unsaturated fat, a concentrated fuel for rapid infant growth",
    "Adds plant protein and a little fiber to otherwise soft, mild foods",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "Roughly half a teaspoon of pecans ground down to a soft, flour-fine powder with zero visible flecks, stirred all the way through a smooth puree or thin oatmeal the baby already eats.",
      passFailTest:
        "Pinch some dry powder between two fingertips: it should feel like flour, with nothing you could pick up as a piece. Anything gritty goes back in the grinder.",
      whyThisForm:
        "Hard nut fragments are among the worst shapes for a baby's airway, so the allergen protein has to travel as a powder fully folded into a food the baby already manages.",
      prepSteps: [
        "Pulse plain, unsalted pecans in a clean spice or coffee grinder in short bursts until they look like flour, then sift out any surviving fragment.",
        "Stir about half a teaspoon completely into a familiar puree or oatmeal — never with another new food, so any reaction can be traced to pecan.",
        "First time: serve early in the day, offer a small amount, and watch for 2 hours.",
      ],
      commonMistakes: [
        "Stopping at 'finely chopped' — chopped is not ground, and any fragment you can see is a hazard.",
        "Grinding past powder into oily paste; if that happens, thin it like a nut butter (1 teaspoon to 2–3 teaspoons warm liquid) before serving.",
        "Dusting dry powder over the top instead of stirring it through — loose dry powder can be inhaled or clump in the mouth.",
      ],
      cutDiagram: "mash",
      media: [],
    },
    {
      band: "9-12m",
      form: "One to two teaspoons of flour-fine pecan powder blended right through thick oatmeal, yogurt, or mashed banana, with no fleck big enough for small fingers to pick out.",
      passFailTest:
        "Drag a spoon slowly through the mixed bowl and look closely: nothing should stand out as a piece a pincer grasp could find. The fingertip pinch test on the dry powder still applies.",
      whyThisForm:
        "A nine-month-old's new pincer grasp will locate and extract any stray chunk, so the grinding standard gets stricter — not looser — just as self-feeding takes off.",
      prepSteps: [
        "Grind and sift exactly as before; store spare powder airtight in the freezer.",
        "Blend 1–2 teaspoons through thick oatmeal, yogurt, or fruit mash until no speck stands proud.",
        "Keep pecan appearing about twice a week once it is tolerated.",
      ],
      commonMistakes: [
        "Relaxing the grind because lumpy foods are going well — soft lumps and hard nut fragments are entirely different risks.",
      ],
      media: [],
    },
    {
      band: "12-24m",
      form: "Flour-fine ground pecan carried on as a stir-in for porridge, yogurt, and soft home baking, because whole, halved, and chopped pecans stay unsafe until around age four.",
      passFailTest:
        "Powder still passes the fingertip pinch test, and anything baked with pecan should squash easily between two fingers with no hard bit hiding inside.",
      whyThisForm:
        "New molars can bite but cannot yet grind a hard, angular nut into a safe swallow — pecan pieces remain a top choking hazard well past the second birthday.",
      prepSteps: [
        "Fold ground pecan into pancake or muffin batter at family breakfasts.",
        "Whisk it into yogurt with mashed banana or pear for an easy snack.",
      ],
      commonMistakes: [
        "Leaving a bowl of pecan halves within a toddler's reach — the adult snack bowl on the coffee table is the classic choking setup.",
      ],
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["oatmeal", "banana", "yogurt", "sweet-potato"],
  tips: [
    "Short grinder pulses followed by a pass through a fine-mesh sieve is the dependable route to truly flour-like pecan with no stragglers.",
    "Pecans are among the oiliest nuts and go stale fast once ground — grind small batches and keep the powder airtight in the freezer.",
    "Each tree nut is its own distinct allergen: tolerating almond or walnut says nothing about pecan, so pecan gets its own watched first serving.",
    "If your grinder takes it all the way to paste, treat it as pecan butter and thin 1 teaspoon with 2–3 teaspoons of warm liquid.",
  ],
  sources: [SOURCES.eatStudy, SOURCES.aaaaiFoodAllergy, SOURCES.aapChoking],
  nutrients: ["healthyFats", "protein", "fiber"],
  servingGuidance: [
    {
      band: "6-8m",
      typicalAmount:
        "About half a teaspoon of flour-fine powder stirred completely into a familiar puree — a taste-sized exposure is the whole job.",
      frequency: "About twice a week once tolerated.",
      note: "Each tree nut is its own allergen — pecan needs its own watched first serving.",
    },
    {
      band: "9-12m",
      typicalAmount:
        "One to two teaspoons blended through oatmeal, yogurt, or fruit mash — let the baby decide how much of the bowl disappears.",
      frequency: "About twice a week keeps pecan familiar.",
    },
    {
      band: "12-24m",
      typicalAmount:
        "A teaspoon or two folded into porridge, yogurt, or soft baking — still flour-fine only, never pieces.",
    },
  ],
  watchOuts: [
    "Tolerating pecan does not cover other tree nuts — every nut needs its own separate introduction.",
    "Candied and spiced pecans carry sugar and salt — grind only plain, raw or dry-roasted unsalted nuts.",
  ],
  emoji: "🌰",
};

export default pecan;
