import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const turnip: Food = {
  slug: "turnip",
  name: "Turnip",
  aliases: ["white turnip"],
  category: "vegetable",
  minAgeMonths: 6,
  ironRich: false,
  commonAllergen: null,
  chokingRisk: "moderate",
  chokingNotes:
    "Raw turnip is as dense and hard as raw carrot, and a broken-off chunk can lodge firmly. Mitigate by peeling and cooking wedges until they squish between two fingers; no raw turnip anywhere in this age range.",
  nutritionHighlights: [
    "A brassica-family source of vitamin C, which also helps plant iron absorb",
    "Provides gentle fiber for digestion",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "Peeled turnip cut into wedges about two adult fingers long, steamed or roasted until each wedge smashes easily between your thumb and forefinger.",
      passFailTest:
        "The squish test on the fattest wedge: press between thumb and forefinger — it should flatten with gentle pressure and never feel dense at the center.",
      whyThisForm:
        "A long wedge suits the palmar grasp like a carrot stick does, and full cooking is what turns this dense root into something bare gums can mash.",
      prepSteps: [
        "Peel the turnip and cut it into eighths, so each wedge is about two adult fingers long.",
        "Steam 12–15 minutes, or roast at 400°F for about 25 minutes, until squish-soft.",
        "Test the fattest wedge before serving.",
        "Serve one warm wedge at a time.",
      ],
      commonMistakes: [
        "Undercooking — a wedge that takes a fork can still be far too firm for gums.",
        "Cutting rounds or half-moons instead of wedges.",
        "Serving a big storage turnip without tasting it — old ones can be harshly bitter.",
      ],
      cutDiagram: "wedge-handle",
      media: [],
    },
    {
      band: "9-12m",
      form: "Squish-soft turnip chopped into rough pieces about the size of your pinky fingernail, or mashed half-and-half with potato.",
      passFailTest:
        "Pinch a piece between two fingers — it should flatten easily, and a spoonful of mash should hold no firm lumps.",
      whyThisForm:
        "Small soft pieces feed the new pincer grasp, and blending turnip into potato mash introduces its flavor at a gentle concentration.",
      prepSteps: [
        "Cook as for 6–8 months, until fully squish-soft.",
        "Chop into pinky-nail pieces, or mash with an equal amount of potato.",
        "Scatter pieces a few at a time, or preload spoons with the mash.",
      ],
      commonMistakes: [
        "Serving turnip straight and strong on the first tries — the half-potato mash wins more repeat customers.",
      ],
      cutDiagram: "bite-size",
      media: [],
    },
    {
      band: "12-24m",
      form: "Roasted soft wedges or bite-size chunks alongside family meals, or turnip mashed smooth into potato, with raw turnip still off the menu.",
      passFailTest:
        "Chunks should give under firm finger pressure, and roasted edges should be caramel-soft rather than crisp.",
      whyThisForm:
        "New molars handle soft roasted chunks well, while roasting also converts turnip's peppery edge into a mild sweetness toddlers accept more readily.",
      prepSteps: [
        "Roast wedges in olive oil until browned and fully tender.",
        "Keep offering the turnip-potato mash alongside family versions of the same meal.",
      ],
      commonMistakes: [
        "Assuming teeth make raw turnip fine — dense raw roots wait years more, just like carrot.",
      ],
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["potato", "lamb", "olive-oil"],
  tips: [
    "Small young turnips are noticeably sweeter and milder than big storage ones — pick the tennis-ball size or smaller.",
    "The slightly bitter, peppery edge is normal to refuse at first: it can take 8–15 relaxed exposures, so keep servings small and expectations low.",
    "Mash turnip half-and-half with potato to introduce the flavor gently, then shift the ratio over time.",
    "Roasting converts the sharpness into sweetness — steam-then-roast gives softness and flavor in one wedge.",
  ],
  sources: [SOURCES.nhsFrom6Months, SOURCES.wicGuide, SOURCES.cdcFoodsAndDrinks],
  nutrients: ["vitaminC", "fiber"],
  servingGuidance: [
    {
      band: "6-8m",
      typicalAmount:
        "One or two soft wedges — gnawed ends and squeezed fists all count as a successful serving.",
    },
    {
      band: "9-12m",
      typicalAmount:
        "A tablespoon or two of soft pieces or turnip-potato mash, refilled while interest holds.",
    },
    {
      band: "12-24m",
      typicalAmount:
        "A few roasted wedges or a couple of spoonfuls of mash beside the family meal.",
    },
  ],
  watchOuts: [
    "Turnip is a brassica, so a bit of extra gas at first is normal — it settles as the gut adjusts.",
  ],
  emoji: "🥔",
};

export default turnip;
