import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const walnut: Food = {
  slug: "walnut",
  name: "Walnut",
  aliases: ["walnuts", "ground walnut"],
  category: "protein",
  minAgeMonths: 6,
  ironRich: false,
  commonAllergen: "tree-nut",
  chokingRisk: "high",
  chokingNotes:
    "Whole, halved, or chopped walnuts are hard, angular, and exactly the size that lodges in an infant airway — they stay off-limits until at least age 4. Mitigate by serving walnut only as a flour-fine ground powder with no visible pieces, stirred completely into purees, oatmeal, or yogurt.",
  nutritionHighlights: [
    "One of the best plant sources of the omega-3 fat ALA, which supports brain development",
    "Adds plant protein and healthy fats to otherwise soft, mild foods",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "About half a teaspoon of walnuts ground to a fine, flour-like powder with no visible pieces, stirred completely into a smooth puree or soft oatmeal the baby already knows.",
      passFailTest:
        "Rub a pinch between your fingertips: it should feel like coarse flour, with nothing you could pick up as a piece. Anything gritty or chunky goes back in the grinder.",
      whyThisForm:
        "Hard nut fragments are one of the highest-risk shapes for an infant airway, but the allergen protein still needs to arrive — flour-fine powder folded into a familiar puree delivers the exposure with no piece to choke on.",
      prepSteps: [
        "Pulse plain, unsalted walnuts in a clean spice or coffee grinder in short bursts until they resemble flour, sifting out any surviving fragments.",
        "Stir about half a teaspoon fully into a familiar food, never another new food, so any reaction can be traced to walnut.",
        "First time: serve early in the day, a small amount, and watch for 2 hours.",
      ],
      commonMistakes: [
        "Stopping at 'finely chopped' — chopped is not ground, and any visible fragment is a hazard.",
        "Grinding so long the powder turns to oily paste; if that happens, thin it like a nut butter (1 teaspoon to 2–3 teaspoons warm liquid) before serving.",
        "Dusting the powder dry on top of food instead of stirring it in — loose dry powder can be inhaled or clump in the mouth.",
      ],
      cutDiagram: "mash",
      media: [],
    },
    {
      band: "9-12m",
      form: "One to two teaspoons of flour-fine ground walnut mixed through oatmeal, yogurt, or mashed fruit, still with zero fragments large enough for a pincer grasp to pick out.",
      passFailTest:
        "Drag a spoon through the mixed food and look closely: no speck should stand out as a pick-up-able piece. The fingertip rub test on the dry powder still applies.",
      whyThisForm:
        "The new pincer grasp means a baby will find and pick out any stray chunk — so the safety bar for grinding is higher, not lower, even as other finger foods expand.",
      prepSteps: [
        "Grind and sift as before; store extra powder airtight in the freezer.",
        "Stir 1–2 teaspoons into thick oatmeal, yogurt, or fruit mash until fully blended.",
        "Keep servings coming about twice a week once tolerated.",
      ],
      commonMistakes: [
        "Relaxing the grind because the baby now chews soft lumps — soft lumps and hard nut fragments are entirely different risks.",
      ],
      media: [],
    },
    {
      band: "12-24m",
      form: "Finely ground walnut continued as a stir-in for porridge, yogurt, and soft baking, because whole, halved, or chopped walnuts remain unsafe until at least age four.",
      passFailTest:
        "Powder should still pass the fingertip rub test; baked goods containing walnut should squish easily between two fingers with no hard bits inside.",
      whyThisForm:
        "Toddlers gain molars but cannot yet reliably grind a hard, angular nut into a safe swallow — walnut pieces stay a top choking hazard well past the second birthday.",
      prepSteps: [
        "Fold ground walnut into muffins, pancakes, or oatmeal at family meals.",
        "Whisk it into yogurt with mashed banana for an easy snack.",
      ],
      commonMistakes: [
        "Letting a toddler pick from a bowl of walnut halves at the table — an adult snack bowl within reach is the classic setup for a choking incident.",
      ],
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["oatmeal", "banana", "yogurt", "apple"],
  tips: [
    "Short pulses in a spice grinder, then a pass through a fine-mesh sieve, is the reliable route to truly flour-like walnut with no stragglers.",
    "Walnut oils go rancid fast — grind small batches and keep the powder in an airtight container in the freezer.",
    "Each tree nut is a distinct allergen: tolerating almond or cashew does not guarantee tolerating walnut, so give walnut its own watched first serving.",
    "If your grinder takes the powder all the way to paste, treat it as walnut butter and thin 1 teaspoon with 2–3 teaspoons of warm liquid.",
  ],
  sources: [SOURCES.eatStudy, SOURCES.aaaaiFoodAllergy, SOURCES.aapChoking],
  nutrients: ["omega3", "healthyFats", "protein"],
  servingGuidance: [
    {
      band: "6-8m",
      typicalAmount:
        "About half a teaspoon of flour-fine powder stirred completely into a familiar puree.",
      frequency: "About twice a week once tolerated.",
      note: "Each tree nut is its own allergen — walnut gets its own watched first serving.",
    },
    {
      band: "9-12m",
      typicalAmount:
        "One to two teaspoons of ground walnut blended through oatmeal, yogurt, or fruit mash.",
      frequency: "About twice a week once tolerated.",
    },
    {
      band: "12-24m",
      typicalAmount:
        "A teaspoon or two folded into porridge, yogurt, or soft baking — still flour-fine only, never pieces.",
    },
  ],
  emoji: "🌰",
};

export default walnut;
