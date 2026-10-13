import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const macadamia: Food = {
  slug: "macadamia",
  name: "Macadamia",
  aliases: ["macadamia nut", "macadamia nuts", "macadamias", "ground macadamia", "macadamia butter"],
  category: "protein",
  minAgeMonths: 6,
  ironRich: false,
  commonAllergen: "tree-nut",
  chokingRisk: "high",
  chokingNotes:
    "A macadamia is round, hard, and close to the size of a grape — the classic shape that plugs a young child's airway — and whole or chopped macadamias stay off-limits until at least age 4. Mitigate by grinding macadamias to a flour-fine powder with no visible pieces, or thinning macadamia butter with warm liquid, and stirring it completely into purees, oatmeal, or yogurt.",
  nutritionHighlights: [
    "The richest common nut in monounsaturated fat — the same kind of fat as olive oil and avocado — a dense fuel for rapid infant growth",
    "Adds fiber and a mild, buttery taste that disappears into fruit and grain purees",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "About half a teaspoon of raw, unsalted macadamias ground to a soft, flour-fine powder with no visible pieces, stirred completely into a smooth puree or soft oatmeal the baby already knows.",
      passFailTest:
        "Rub a pinch between your fingertips: it should feel like slightly damp flour, with nothing you could pick up as a piece. Macadamia powder clumps from its own oil — break up every clump, and send anything gritty back to the grinder.",
      whyThisForm:
        "A whole macadamia is the round, hard shape that blocks an airway, but the allergen protein still needs to arrive — flour-fine powder or thinned butter folded into a familiar puree delivers the exposure with no piece to choke on.",
      prepSteps: [
        "Chill plain, raw or dry-roasted unsalted macadamias in the freezer for about 15 minutes, then pulse them in a clean spice or coffee grinder in two or three short bursts and sift out any surviving fragment.",
        "Stir about half a teaspoon completely into a familiar puree or oatmeal — never with another new food, so any reaction can be traced to macadamia.",
        "First time: serve early in the day, offer a small amount, and watch for 2 hours.",
      ],
      commonMistakes: [
        "Grinding the salted, honey-roasted, or flavored macadamias from the snack aisle — they carry salt and sugar, and the honey-roasted ones carry honey, which stays off the menu before 12 months.",
        "Serving the paste thick after the grinder runs too long; if it turns to butter, thin 1 teaspoon with 2–3 teaspoons of warm liquid first.",
        "Dusting the powder dry on top of food instead of stirring it in — loose dry powder can be inhaled or clump in the mouth.",
      ],
      cutDiagram: "mash",
      media: [],
    },
    {
      band: "9-12m",
      form: "One to two teaspoons of flour-fine ground macadamia, or thinned macadamia butter, mixed through oatmeal, yogurt, or mashed fruit, still with zero fragments large enough for a pincer grasp to pick out.",
      passFailTest:
        "Drag a spoon through the mixed food and look closely: no speck should stand out as a pick-up-able piece. Thinned butter should drip slowly off a spoon, not cling in a thick glob.",
      whyThisForm:
        "The new pincer grasp means a baby will find and pick out any stray chunk — so the safety bar for grinding stays high, even as other finger foods expand.",
      prepSteps: [
        "Chill, grind, and sift as before; keep extra powder airtight in the freezer, because macadamia oil goes stale fast at room temperature.",
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
      form: "Finely ground macadamia or thinned macadamia butter continued as a stir-in for porridge, yogurt, and soft baking, because whole or chopped macadamias remain unsafe until at least age four.",
      passFailTest:
        "Powder should still pass the fingertip rub test; baked goods containing macadamia should squish easily between two fingers with no hard bits inside.",
      whyThisForm:
        "Toddlers gain molars but cannot yet reliably grind a hard, round nut into a safe swallow — whole macadamias stay a top choking hazard well past the second birthday.",
      prepSteps: [
        "Fold ground macadamia into muffins, pancakes, or oatmeal at family meals.",
        "Spread a thin scrape of macadamia butter on soft toast strips.",
      ],
      commonMistakes: [
        "Leaving a bowl or gift tin of whole macadamias within reach on the table — a round nut is the shape that can block an airway completely.",
      ],
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["banana", "mango", "oatmeal", "yogurt"],
  tips: [
    "Macadamias are the oiliest common nut and turn to butter within seconds — freeze them for about 15 minutes and grind in short pulses to keep a dry, flour-like powder.",
    "If your grinder takes it all the way to paste, treat it as macadamia butter and thin 1 teaspoon with 2–3 teaspoons of warm liquid.",
    "Each tree nut is its own distinct allergen: tolerating almond or walnut says nothing about macadamia, so macadamia gets its own watched first serving.",
  ],
  sources: [SOURCES.eatStudy, SOURCES.aaaaiFoodAllergy, SOURCES.aapChoking, SOURCES.cdcFoodsAndDrinks],
  nutrients: ["healthyFats", "fiber"],
  servingGuidance: [
    {
      band: "6-8m",
      typicalAmount:
        "About half a teaspoon of flour-fine powder stirred completely into a familiar puree — a taste-sized exposure is the whole job.",
      frequency: "About twice a week once tolerated.",
      note: "Each tree nut is its own allergen — macadamia needs its own watched first serving.",
    },
    {
      band: "9-12m",
      typicalAmount:
        "One to two teaspoons of ground macadamia or thinned butter blended through oatmeal, yogurt, or fruit mash — let the baby decide how much of the bowl disappears.",
      frequency: "About twice a week keeps macadamia familiar.",
    },
    {
      band: "12-24m",
      typicalAmount:
        "A teaspoon or two folded into porridge, yogurt, or soft baking — still flour-fine or thinned butter only, never pieces.",
    },
  ],
  watchOuts: [
    "Tolerating macadamia does not cover other tree nuts — every nut needs its own separate introduction.",
    "Most store-bought macadamias are roasted and salted, and honey-roasted ones carry honey, which waits until 12 months — grind only plain, raw or dry-roasted unsalted nuts.",
  ],
  emoji: "🌰",
};

export default macadamia;
