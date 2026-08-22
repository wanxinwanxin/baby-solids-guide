import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const pistachio: Food = {
  slug: "pistachio",
  name: "Pistachio (ground)",
  aliases: ["pistachios", "ground pistachio"],
  category: "protein",
  minAgeMonths: 6,
  ironRich: false,
  commonAllergen: "tree-nut",
  chokingRisk: "high",
  chokingNotes:
    "A whole pistachio is a smooth, hard plug almost sized for an infant airway, and stray shell splinters make it worse — whole or chopped pistachios stay off-limits until at least age 4. Mitigate by serving pistachio only as a flour-fine ground powder, checked for shell bits and stirred fully into soft foods.",
  nutritionHighlights: [
    "Plant protein and mostly unsaturated fats that support steady growth",
    "One of the more potassium-rich nuts, alongside a little fiber",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "About half a teaspoon of shelled, unsalted pistachios ground to a fine green powder the texture of flour, stirred entirely into a smooth puree or oatmeal the baby already knows.",
      passFailTest:
        "Rub a pinch of the dry powder between your fingertips: it should feel like flour with no pickable piece and absolutely no hard shell splinter. Gritty batches go back in the grinder.",
      whyThisForm:
        "An infant cannot chew any hard fragment safely, so the pistachio protein must arrive as a powder that vanishes into a familiar soft food.",
      prepSteps: [
        "Start from shelled, unsalted pistachios and pick over them for shell fragments before grinding.",
        "Pulse in a clean spice grinder in short bursts until flour-fine, then sift out any surviving piece.",
        "Stir about half a teaspoon fully into a familiar puree — never with another new food, so any reaction can be traced to pistachio.",
        "First time: serve early in the day, offer a small amount, and watch for 2 hours.",
      ],
      commonMistakes: [
        "Grinding without checking for shell bits first — a splinter of shell is harder than the nut itself.",
        "Settling for 'finely chopped' — visible fragments of any size are a hazard at this age.",
        "Dusting the powder dry on top of food instead of stirring it in, where it can be inhaled or clump.",
      ],
      cutDiagram: "mash",
      media: [],
    },
    {
      band: "9-12m",
      form: "One to two teaspoons of flour-fine pistachio powder mixed evenly through yogurt, oatmeal, or mashed fruit, with nothing left that a pincer grasp could single out.",
      passFailTest:
        "Drag a spoon through the mixed food and inspect: no green speck should stand out as a pick-up-able piece, and the dry powder should still pass the fingertip rub test.",
      whyThisForm:
        "The pincer grasp arriving around nine months means a baby will find and extract any stray chunk, so the grind has to stay flawless even as other textures advance.",
      prepSteps: [
        "Grind and sift as before; keep spare powder airtight in the freezer.",
        "Mix 1–2 teaspoons through thick yogurt, oatmeal, or fruit mash until evenly green.",
        "Keep servings coming about twice a week once tolerated.",
      ],
      commonMistakes: [
        "Assuming better chewing means coarser pistachio is fine — hard nut bits stay dangerous long after soft lumps are mastered.",
      ],
      media: [],
    },
    {
      band: "12-24m",
      form: "Finely ground pistachio continued as a stir-in for porridge, yogurt, and soft baking, because whole pistachios remain a choking hazard until at least age four.",
      passFailTest:
        "The powder still rubs like flour between two fingers, and any muffin or pancake made with it squashes easily with no hard bite inside.",
      whyThisForm:
        "Toddlers gain molars but cannot yet grind a smooth, hard nut into a safe swallow — whole pistachios are a classic toddler choking story worth waiting out.",
      prepSteps: [
        "Fold ground pistachio into pancake batter, muffins, or warm porridge at family meals.",
        "Stir it into yogurt with mashed banana for a quick green snack.",
      ],
      commonMistakes: [
        "Sharing pistachios from the adult snack bowl 'just one' at a time — one is exactly how many it takes.",
      ],
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["yogurt", "oatmeal", "banana", "pear"],
  tips: [
    "Buy shelled pistachios and still pick them over — a stray shell splinter survives most grinders and is harder than the nut.",
    "Short pulses then a fine-mesh sieve gives a truly flour-like powder; long grinding turns pistachio to paste instead.",
    "Each tree nut is a distinct allergen: tolerating cashew or almond says nothing about pistachio (though pistachio and cashew are close cousins), so it gets its own watched first serving.",
    "The vivid green dust looks striking on yogurt — stir it through anyway rather than leaving a dry layer on top.",
  ],
  sources: [SOURCES.eatStudy, SOURCES.aaaaiFoodAllergy, SOURCES.aapChoking],
  nutrients: ["protein", "healthyFats", "potassium"],
  servingGuidance: [
    {
      band: "6-8m",
      typicalAmount:
        "About half a teaspoon of flour-fine powder stirred into a familiar puree — a small, traceable taste is exactly the goal.",
      frequency: "About twice a week once tolerated.",
      note: "Each tree nut is its own allergen — pistachio needs its own watched first serving.",
    },
    {
      band: "9-12m",
      typicalAmount:
        "One to two teaspoons mixed through yogurt or oatmeal — refill only while the interest lasts.",
      frequency: "About twice a week keeps pistachio familiar.",
    },
    {
      band: "12-24m",
      typicalAmount:
        "A teaspoon or two as a stir-in or in soft baking — still ground only, never whole nuts.",
    },
  ],
  watchOuts: [
    "Most store pistachios are roasted and salted — grind only the unsalted kind.",
    "Tolerating pistachio does not cover other tree nuts — each one needs its own separate introduction.",
  ],
  emoji: "🌰",
};

export default pistachio;
