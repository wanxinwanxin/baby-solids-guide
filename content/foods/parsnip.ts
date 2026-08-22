import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const parsnip: Food = {
  slug: "parsnip",
  name: "Parsnip",
  aliases: [],
  category: "vegetable",
  minAgeMonths: 6,
  ironRich: false,
  commonAllergen: null,
  chokingRisk: "moderate",
  chokingNotes:
    "Raw or undercooked parsnip is at least as hard as raw carrot, and coin-shaped slices are the riskiest geometry. Mitigate by cooking until completely soft and serving sticks rather than coins; no raw parsnip at any age in this guide.",
  nutritionHighlights: [
    "Notably good fiber for a root vegetable, supporting digestion",
    "Provides folate and potassium",
    "Naturally sweet, which makes repeat vegetable exposures easy",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "A whole peeled parsnip steamed or simmered until it smashes between thumb and finger, served as a stick about the length and width of two adult fingers.",
      passFailTest:
        "The squish test at the fat core end: press between thumb and forefinger — it should flatten with gentle pressure; if you have to squeeze hard, cook it longer.",
      whyThisForm:
        "A long soft stick suits the palmar grasp — the baby fists it and gnaws the end — while full cooking turns a hard root into something bare gums can mash.",
      prepSteps: [
        "Peel a medium parsnip and trim both ends.",
        "Steam 15–20 minutes, or simmer in unsalted water, until a fork slides in with zero resistance.",
        "Squish-test the thick core end — it's the last part to soften.",
        "Cut into two-adult-finger sticks and serve warm, one at a time.",
      ],
      commonMistakes: [
        "Undercooking — a parsnip that still snaps is a hazard, not a food.",
        "Cutting coins or rounds: exactly the shape that can plug an airway.",
        "Serving the woody core of a very large parsnip — it can stay fibrous even when the outside is soft.",
      ],
      cutDiagram: "batons",
      media: [],
    },
    {
      band: "9-12m",
      form: "Soft-cooked parsnip chopped into rough pieces about the size of your pinky fingernail, each still smashable between two fingers.",
      passFailTest:
        "Pick up a piece and press it between two fingers — it should flatten easily; pieces that resist go back in the steamer.",
      whyThisForm:
        "Small, soft, irregular pieces feed the emerging pincer grasp while staying safe to gum, exactly as with carrot.",
      prepSteps: [
        "Cook exactly as for 6–8 months, until squish-test soft throughout.",
        "Dice into pinky-nail pieces — irregular edges grip better than smooth cubes.",
        "Scatter a few pieces at a time to discourage cheek-stuffing.",
      ],
      commonMistakes: [
        "Slippery pieces that frustrate the baby — roll them in a pinch of ground oat cereal for traction.",
      ],
      cutDiagram: "bite-size",
      media: [],
    },
    {
      band: "12-24m",
      form: "Roasted or steamed parsnip in soft bite-size chunks or creamy mash, while raw parsnip stays entirely off-limits just like raw carrot.",
      passFailTest:
        "Chunks should yield to firm finger pressure with no fibrous center; a roasted edge should be caramelized, not crisp-hard.",
      whyThisForm:
        "Toddlers still can't grind a raw root safely, but soft roasted chunks reward new molars and parsnip's sweetness makes it an easy family-meal vegetable.",
      prepSteps: [
        "Roast chunks in olive oil at 400°F until browned outside and fully soft inside.",
        "Or mash steamed parsnip with potato for a naturally sweet side.",
      ],
      commonMistakes: [
        "Offering a raw peeled strip to gnaw — parsnip never gets the raw-vegetable pass in this age range.",
      ],
      media: [],
    },
  ],
  firstFoodPick: true,
  flavorPairings: ["carrot", "chicken", "olive-oil", "beef"],
  tips: [
    "Everything you do with carrot works with parsnip — same squish-test sticks, same timing, sweeter payoff.",
    "Roasting concentrates the sweetness dramatically; toss in olive oil and roast until fully soft.",
    "Very large parsnips hide a woody core — quarter them lengthwise and trim it out if it stays firm after cooking.",
    "Batch-steam a bag of sticks and freeze flat; they rewarm in seconds for repeat exposures.",
  ],
  sources: [SOURCES.nhsFrom6Months, SOURCES.wicGuide, SOURCES.aapChoking],
  nutrients: ["fiber", "folate", "potassium"],
  servingGuidance: [
    {
      band: "6-8m",
      typicalAmount:
        "One or two soft-cooked sticks — let the baby set the pace; gnawing counts even when little disappears.",
    },
    {
      band: "9-12m",
      typicalAmount:
        "A tablespoon or two of pinky-nail pieces, scattered a few at a time.",
    },
    {
      band: "12-24m",
      typicalAmount:
        "A small handful of roasted chunks or a few spoonfuls of mash with the family meal.",
    },
  ],
  watchOuts: [],
  emoji: "🥕",
};

export default parsnip;
