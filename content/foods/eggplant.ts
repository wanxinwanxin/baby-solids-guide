import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const eggplant: Food = {
  slug: "eggplant",
  name: "Eggplant",
  aliases: ["aubergine"],
  category: "vegetable",
  minAgeMonths: 6,
  ironRich: false,
  commonAllergen: null,
  chokingRisk: "low",
  nutritionHighlights: [
    "A source of gentle fiber, much of it in the silky cooked flesh",
    "Contributes potassium alongside its high water content",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "Eggplant roasted until the flesh turns silky and collapses, skin removed, cut into soft strips about the length and width of two adult fingers.",
      passFailTest:
        "A strip should squash flat between two fingers and almost spread like a paste; any spongy, springy resistance means more oven time.",
      whyThisForm:
        "Silky roasted strips give a palmar-grasping baby a soft handle to fist and gnaw, and removing the skin takes away the one part gums can't break down.",
      prepSteps: [
        "Slice the eggplant into thick planks and brush with olive oil.",
        "Roast at 400°F for 25–30 minutes, until the flesh slumps and a fork meets no resistance.",
        "Peel or scrape away the skin while warm.",
        "Cut into two-adult-finger strips and serve warm, one or two at a time.",
      ],
      commonMistakes: [
        "Undercooking — spongy eggplant is squeaky, bitter, and hard to gum.",
        "Leaving the skin on for early eaters; it turns leathery exactly as the flesh turns silky.",
        "Pan-frying to crisp — crisped edges chew like leather for a gummy eater.",
      ],
      cutDiagram: "strips",
      media: [],
    },
    {
      band: "9-12m",
      form: "Fully roasted, skinless eggplant chopped into pieces about the size of a pinky fingernail, dusted with ground oat cereal if they prove too slippery to pick up.",
      passFailTest:
        "Pinch a piece — it should flatten to a smear with almost no pressure; eggplant done right is closer to a sauce than a solid.",
      whyThisForm:
        "Small, ultra-soft pieces suit the new pincer grasp, and a dusting of dry cereal gives traction on one of the most slippery vegetables there is.",
      prepSteps: [
        "Roast and peel as for 6–8 months.",
        "Chop the silky flesh into pinky-nail pieces.",
        "Roll slippery pieces in a pinch of ground oat cereal, or stir them into pasta or mashed beans.",
      ],
      commonMistakes: [
        "Serving bare pieces on a smooth tray, where they skate away and frustrate the baby.",
      ],
      cutDiagram: "bite-size",
      media: [],
    },
    {
      band: "12-24m",
      form: "Soft-roasted or stewed eggplant in bite-size chunks with tender skin now fine to leave on, or mashed into a smooth garlicky dip for scooping with bread.",
      passFailTest:
        "A chunk should squash easily between two fingers, and a strip of skin should tear without tugging when you test one yourself.",
      whyThisForm:
        "Toddlers manage tender skin and mixed dishes well, and serving eggplant as a dip or in family stews keeps a low-effort vegetable in heavy rotation.",
      prepSteps: [
        "Roast or stew until fully collapsing; leave tender skin on if it tears easily.",
        "Serve as chunks in pasta or stew, or mash the flesh into a smooth dip with a swirl of olive oil.",
      ],
      commonMistakes: [
        "Serving firm sautéed cubes from an adult stir-fry — eggplant is only baby-ready when it's silky.",
      ],
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["tomato", "pasta", "olive-oil", "yogurt"],
  tips: [
    "Roast until it collapses — the moment eggplant slumps and loses its shape is the moment it's ready for a baby.",
    "The skin slips off easily while the roasted flesh is still warm; a spoon scrapes it clean in seconds.",
    "Eggplant drinks up olive oil happily — that added fat is welcome calories at this age.",
    "Its mild flesh takes on any sauce: simmer chunks in tomato sauce for an easy pasta topper.",
  ],
  sources: [SOURCES.nhsFrom6Months, SOURCES.wicGuide, SOURCES.cdcFoodsAndDrinks],
  nutrients: ["fiber", "potassium"],
  servingGuidance: [
    {
      band: "6-8m",
      typicalAmount:
        "One or two soft strips at a time — much of it will smear, and that exploration counts.",
    },
    {
      band: "9-12m",
      typicalAmount:
        "A tablespoon or two of soft pieces, plain or stirred through pasta.",
    },
    {
      band: "12-24m",
      typicalAmount:
        "A small handful of chunks in a family dish, or a few spoonfuls of eggplant dip with soft bread.",
    },
  ],
  watchOuts: [],
  emoji: "🍆",
};

export default eggplant;
