import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const cabbage: Food = {
  slug: "cabbage",
  name: "Cabbage",
  aliases: ["green cabbage", "red cabbage", "savoy cabbage"],
  category: "vegetable",
  minAgeMonths: 6,
  ironRich: false,
  commonAllergen: null,
  chokingRisk: "moderate",
  chokingNotes:
    "A braised cabbage leaf turns slick and can drape flat over the airway like a piece of film — the same hazard as spinach — while raw cabbage is too tough to gum. Mitigate by braising until melting-soft and chopping finely; never serve an intact cooked leaf or raw chunks.",
  nutritionHighlights: [
    "A good source of vitamin C, which also helps plant iron absorb from foods alongside",
    "Provides folate for rapid cell growth",
    "Gentle fiber supports digestion",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "Cabbage leaves braised until melting-soft, thick ribs sliced thin, chopped into confetti flecks no bigger than your pinky nail and folded through a mash or porridge.",
      passFailTest:
        "Spread the chop out on the board: no fleck bigger than a pinky nail, and no piece that lifts away as an intact sheet of leaf.",
      whyThisForm:
        "A fist-grasping baby eats cabbage as a passenger in other foods; confetti flecks carried by a mash cannot drape over the airway the way a whole slick leaf can.",
      prepSteps: [
        "Cut out the hard core and slice the leaves — thick ribs thinnest of all.",
        "Braise covered in olive oil plus a splash of water for 15–20 minutes, until silky.",
        "Drain, squeeze off excess water, and chop in both directions to confetti.",
        "Fold into mashed potato, oatmeal, or a soft omelette.",
      ],
      commonMistakes: [
        "A quick stir-fry that leaves the leaves squeaky and tough — cabbage needs the long braise.",
        "Serving a whole softened leaf — soft, but exactly the draping shape to avoid.",
        "Forgetting the ribs cook slowest — slice them thinner than the leafy parts.",
      ],
      cutDiagram: "shred",
      media: [],
    },
    {
      band: "9-12m",
      form: "Finely chopped braised cabbage stirred through eggs, pasta, or mashed potato, arriving as pinky-nail mixed pieces the baby can pick up.",
      passFailTest:
        "Pull a spoonful apart: any cabbage you can peel off as a flat sheet bigger than a pinky nail needs more chopping.",
      whyThisForm:
        "Pincer-stage babies manage mixed small pieces well, but a free-floating slick leaf is still a draping hazard, so cabbage keeps riding inside foods with body.",
      prepSteps: [
        "Braise and chop exactly as for 6–8 months.",
        "Stir into scrambled eggs, pasta pieces, or a thick mash.",
        "Serve as self-feedable mixed pieces, a few at a time.",
      ],
      commonMistakes: [
        "Loosening the chop because the baby seems capable — capability doesn't change the leaf's geometry.",
      ],
      cutDiagram: "shred",
      media: [],
    },
    {
      band: "12-24m",
      form: "Braised cabbage chopped into pinky-nail pieces served as its own small side, with raw cabbage still limited to a rare few paper-thin, short shreds for practiced chewers.",
      passFailTest:
        "Cooked cabbage should be chopped past the point where an intact leaf could be lifted out; any raw shred should be thin enough to tear instantly between your fingers.",
      whyThisForm:
        "Toddlers chew better but thin, slippery sheets remain hard to control, so cooked cabbage stays chopped and raw cabbage stays minimal until chewing is truly strong.",
      prepSteps: [
        "Keep braising soft and chopping before serving, alone or in family dishes.",
        "Late in this band, offer a few short, paper-thin raw shreds tossed with a little olive oil to soften them.",
      ],
      commonMistakes: [
        "A pile of long raw slaw shreds — length plus toughness makes them hard to manage.",
      ],
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["potato", "pork", "apple", "beef"],
  tips: [
    "Braise cabbage with a few slices of apple — the sweetness rounds out the sulfur notes babies often notice first.",
    "Red and green cabbage are the same food to a baby, but red stains bibs, trays, and fingers spectacularly.",
    "Cut the ribs thinner than the leaves so everything reaches silky at the same moment.",
    "Batch-braise half a head and freeze in small portions — it rewarms into mashes and eggs in seconds.",
  ],
  sources: [SOURCES.nhsFrom6Months, SOURCES.wicGuide, SOURCES.cdcFoodsAndDrinks],
  nutrients: ["vitaminC", "folate", "fiber"],
  servingGuidance: [
    {
      band: "6-8m",
      typicalAmount:
        "A teaspoon or two of confetti flecks folded through a mash — a garnish-scale start is exactly right.",
    },
    {
      band: "9-12m",
      typicalAmount:
        "A tablespoon of chopped braised cabbage stirred through eggs, pasta, or mash.",
    },
    {
      band: "12-24m",
      typicalAmount:
        "A couple of tablespoons as its own small side, offered without pressure and eaten or not.",
    },
  ],
  watchOuts: [
    "Cabbage is a classic gas-maker — expect some extra wind at first; it usually settles as the gut gets used to brassicas.",
  ],
  emoji: "🥬",
};

export default cabbage;
