import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const tahini: Food = {
  slug: "tahini",
  name: "Tahini",
  aliases: ["sesame paste", "sesame"],
  category: "protein",
  minAgeMonths: 6,
  ironRich: false,
  commonAllergen: "sesame",
  chokingRisk: "high",
  chokingNotes:
    "Straight tahini is a thick, clinging paste that can coat and plug an infant's airway the same way a glob of nut butter can. Mitigate by always thinning it to a drizzle, spreading it paper-thin, or delivering it inside smooth hummus — never a spoonful of the plain paste.",
  nutritionHighlights: [
    "Sesame seeds are a notable plant source of calcium",
    "Healthy unsaturated fats plus some plant protein",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "One teaspoon of well-stirred smooth tahini whisked with 2–3 teaspoons of warm water, breast milk, or formula until it ribbons off the spoon, mixed into a familiar puree or a spoonful of smooth hummus.",
      passFailTest:
        "Lift the spoon: the mixture should fall in a steady, drizzly ribbon like runny yogurt. If it clings or strings, whisk in more warm liquid.",
      whyThisForm:
        "A young infant cannot clear a sticky paste from the roof of the mouth, so the sesame protein has to arrive fully thinned — or pre-diluted inside a smooth hummus — for the exposure to be safe.",
      prepSteps: [
        "Stir the jar thoroughly first — tahini separates, and the settled paste at the bottom is far thicker than the oil on top.",
        "Whisk 1 teaspoon with 2–3 teaspoons of warm water, breast milk, or formula until it drizzles freely.",
        "Mix into a familiar food (oatmeal, vegetable puree, plain yogurt) — never another new food, so a reaction can be traced to sesame.",
        "First time: serve early in the day, a small amount, and watch for 2 hours.",
      ],
      commonMistakes: [
        "Scooping unthinned paste from the bottom of an unstirred jar — the densest, stickiest form of the food.",
        "Assuming hummus 'doesn't count' as a sesame introduction — most hummus contains tahini and is a genuine first exposure.",
        "Introducing sesame at dinner, leaving any delayed reaction to surface overnight.",
      ],
      cutDiagram: "thin-spread",
      media: [],
    },
    {
      band: "9-12m",
      form: "Tahini in a nearly see-through smear on a soft toast strip about one adult finger long, or a tablespoon of smooth hummus offered as a dip for very soft vegetable sticks.",
      passFailTest:
        "Tilt the toast strip: bread should show through the smear everywhere. Hummus should drop off a tilted spoon in a soft dollop, never cling as a paste.",
      whyThisForm:
        "The pincer grasp and dipping games make this the age to move sesame onto finger foods — but only as a translucent layer or inside a loose, smooth hummus, since the paste itself is as sticky as ever.",
      prepSteps: [
        "Spread the thinnest possible film of stirred tahini on a lightly toasted, finger-width bread strip.",
        "Or blend chickpeas, tahini, a little olive oil, and water into a completely smooth, spoon-soft hummus.",
        "Offer water in an open cup alongside sticky foods.",
      ],
      commonMistakes: [
        "Buying chunky or 'whole seed' hummus — texture from whole chickpea pieces or seeds defeats the purpose at this stage.",
      ],
      cutDiagram: "thin-spread",
      media: [],
    },
    {
      band: "12-24m",
      form: "Thin tahini drizzles over roasted vegetables, tahini-yogurt sauces, and smooth hummus at family meals; plain spoonfuls of tahini remain too thick and sticky to serve.",
      passFailTest:
        "A tahini sauce should pour slowly off a spoon; if it mounds and holds shape, loosen it with warm water before it reaches the tray.",
      whyThisForm:
        "Toddler chewing improves, but a clinging bolus of straight paste is no safer at two than at one — sauces, drizzles, and dips keep sesame in the routine safely.",
      prepSteps: [
        "Whisk tahini with warm water and a squeeze of lemon into a pourable sauce for vegetables or grains.",
        "Keep hummus in the weekly rotation as a dip and sandwich spread.",
      ],
      commonMistakes: [
        "Letting sesame drop out of the diet after a successful introduction — steady exposure, about twice a week, is what maintains tolerance.",
      ],
      cutDiagram: "thin-spread",
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["chickpeas", "banana", "yogurt", "sweet-potato"],
  tips: [
    "The working ratio: 1 teaspoon tahini to 2–3 teaspoons warm liquid gives a safe drizzle; tahini thickens strangely at first, then loosens — keep whisking past the seized stage.",
    "Always stir the jar top to bottom before measuring; separated tahini ranges from oil-thin at the top to mortar-thick at the bottom.",
    "Smooth hummus is the easiest sesame vehicle: the tahini arrives pre-diluted, and it doubles as practice with a preloaded spoon or dipper.",
    "Tahini whisked into plain yogurt with mashed banana makes a fast, familiar base for repeat sesame exposures.",
  ],
  sources: [SOURCES.eatStudy, SOURCES.aaaaiFoodAllergy, SOURCES.aapChoking],
  nutrients: ["healthyFats", "calcium", "protein"],
  servingGuidance: [
    {
      band: "6-8m",
      typicalAmount:
        "One teaspoon, whisked thin with warm liquid into a familiar puree — small, fully thinned, and traceable.",
      frequency: "About twice a week once tolerated, to maintain sesame tolerance.",
    },
    {
      band: "9-12m",
      typicalAmount:
        "A see-through smear on a toast strip, or a tablespoon of smooth hummus as a dip.",
      frequency: "About twice a week once tolerated.",
    },
    {
      band: "12-24m",
      typicalAmount:
        "A teaspoon or two as drizzles, sauces, and hummus across family meals.",
      frequency: "Keep sesame appearing about twice a week.",
    },
  ],
  watchOuts: [
    "Store-bought hummus can be surprisingly salty — a smooth homemade batch keeps the sesame serve low-sodium.",
  ],
  emoji: "🥣",
};

export default tahini;
