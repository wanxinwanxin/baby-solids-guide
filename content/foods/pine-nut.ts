import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const pineNut: Food = {
  slug: "pine-nut",
  name: "Pine nut",
  aliases: ["pine nuts", "pignoli", "pignolia", "pinon", "piñon", "ground pine nut"],
  category: "protein",
  minAgeMonths: 6,
  ironRich: false,
  commonAllergen: "tree-nut",
  chokingRisk: "high",
  chokingNotes:
    "Whole pine nuts are small, hard, and slick — exactly the kind of piece a young child can suck into the airway — and whole or chopped pine nuts stay off-limits until at least age 4. Mitigate by grinding pine nuts to a flour-fine powder with no visible pieces, or thinning pine-nut butter with warm liquid, and stirring it completely into purees, oatmeal, or yogurt.",
  nutritionHighlights: [
    "Among the richest nuts in zinc — with iron, one of the two minerals breast milk alone stops covering around six months",
    "Adds plant protein and healthy fats, plus magnesium and vitamin E",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "About half a teaspoon of plain pine nuts ground to a flour-fine powder with no visible pieces, stirred completely into a smooth puree or soft oatmeal the baby already knows.",
      passFailTest:
        "Rub a pinch between your fingertips: it should feel like coarse flour, with nothing you could pick up as a piece. Anything gritty or chunky goes back in the grinder.",
      whyThisForm:
        "A whole pine nut is small and slippery enough to be breathed in, but the allergen protein still needs to arrive — flour-fine powder folded into a familiar puree delivers the exposure with no piece to inhale.",
      prepSteps: [
        "Pulse plain, unsalted pine nuts in a clean spice or coffee grinder in a few short bursts — they are soft and oily and turn to paste fast — then sift out any surviving fragment.",
        "Stir about half a teaspoon fully into a familiar food, never another new food, so any reaction can be traced to pine nut.",
        "First time: serve early in the day, a small amount, and watch for 2 hours.",
      ],
      commonMistakes: [
        "Stopping at 'finely chopped' — chopped is not ground, and any visible fragment is a hazard.",
        "Grinding so long the powder turns to oily paste and serving it thick; if that happens, thin it like a nut butter (1 teaspoon to 2–3 teaspoons warm liquid) before serving.",
        "Dusting the powder dry on top of food instead of stirring it in — loose dry powder can be inhaled or clump in the mouth.",
      ],
      cutDiagram: "mash",
      media: [],
    },
    {
      band: "9-12m",
      form: "One to two teaspoons of flour-fine ground pine nut, or thinned pine-nut butter, mixed through oatmeal, yogurt, or mashed vegetables, still with zero fragments large enough for a pincer grasp to pick out.",
      passFailTest:
        "Drag a spoon through the mixed food and look closely: no speck should stand out as a pick-up-able piece. The fingertip rub test on the dry powder still applies.",
      whyThisForm:
        "The new pincer grasp means a baby will find and pick out any stray piece, and a whole pine nut is just the size a pincer grasp picks — so the grinding standard stays strict even as other finger foods expand.",
      prepSteps: [
        "Grind and sift as before; store extra powder airtight in the freezer.",
        "Stir 1–2 teaspoons into thick oatmeal, yogurt, or mashed pumpkin until fully blended.",
        "Keep servings coming about twice a week once tolerated.",
      ],
      commonMistakes: [
        "Letting the baby pick whole pine nuts out of a family dish — pesto, a salad, or sweet corn stir-fried with pine nuts — because they look tiny and soft; being small is exactly what makes them dangerous.",
      ],
      media: [],
    },
    {
      band: "12-24m",
      form: "Finely ground pine nut or thinned pine-nut butter continued as a stir-in for porridge, pasta sauce, yogurt, and soft baking, because whole pine nuts remain unsafe until at least age four.",
      passFailTest:
        "Powder should still pass the fingertip rub test; sauces and baked goods made with pine nut should show no whole or half nut anywhere you look.",
      whyThisForm:
        "Toddlers gain molars but still take quick breaths mid-chew, and a small, slick pine nut can slip into the airway — the risk lasts well past the second birthday.",
      prepSteps: [
        "Blend pine nuts completely smooth into a homemade, unsalted pesto with basil and olive oil, then stir a spoonful through soft pasta or vegetables.",
        "Fold ground pine nut into muffins, pancakes, or oatmeal at family meals.",
      ],
      commonMistakes: [
        "Spooning store-bought pesto over a toddler's pasta — jarred pesto often keeps visible nut pieces and carries salt and hard cheese in adult amounts.",
      ],
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["pumpkin", "spinach", "pasta", "oatmeal"],
  tips: [
    "Pine nuts are soft and oily and go from powder to paste in a few pulses — use short bursts, or plan on thinning the paste as pine-nut butter (1 teaspoon to 2–3 teaspoons of warm liquid).",
    "Pine nuts turn rancid quickly — taste one before grinding (a bitter or soapy nut means the batch is off), and store the rest airtight in the fridge or freezer.",
    "A few people get 'pine mouth' after eating certain pine nuts: a bitter or metallic taste that starts a day or two later and fades on its own, sometimes only after about two weeks. It is not an allergic reaction and causes no lasting harm; if a batch gives it to you, switch brands.",
    "Each tree nut is its own distinct allergen: tolerating walnut or almond says nothing about pine nut, so pine nut gets its own watched first serving.",
  ],
  sources: [SOURCES.eatStudy, SOURCES.aaaaiFoodAllergy, SOURCES.aapChoking],
  nutrients: ["zinc", "protein", "healthyFats"],
  servingGuidance: [
    {
      band: "6-8m",
      typicalAmount:
        "About half a teaspoon of flour-fine powder stirred completely into a familiar puree.",
      frequency: "About twice a week once tolerated.",
      note: "Each tree nut is its own allergen — pine nut gets its own watched first serving.",
    },
    {
      band: "9-12m",
      typicalAmount:
        "One to two teaspoons of ground pine nut or thinned pine-nut butter blended through oatmeal, yogurt, or a vegetable mash.",
      frequency: "About twice a week once tolerated.",
    },
    {
      band: "12-24m",
      typicalAmount:
        "A teaspoon or two folded into porridge, pasta sauce, yogurt, or soft baking — still flour-fine or blended smooth, never whole nuts.",
    },
  ],
  watchOuts: [
    "Tolerating pine nut does not cover other tree nuts — every nut needs its own separate introduction.",
    "Store-bought pesto brings pine nuts together with salty hard cheese, a milk allergen — introduce pine nut on its own first, and save pesto for after both are tolerated.",
  ],
  emoji: "🌰",
};

export default pineNut;
