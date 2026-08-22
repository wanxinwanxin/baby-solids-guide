import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

/**
 * CANONICAL TEMPLATE — every food entry follows this structure and level of
 * precision. Note the house style for `form` (ROADMAP §6.2): one measurable
 * sentence using adult-finger / household units, plus a physical passFailTest.
 */
const carrot: Food = {
  slug: "carrot",
  name: "Carrot",
  aliases: [],
  category: "vegetable",
  minAgeMonths: 6,
  ironRich: false,
  commonAllergen: null,
  chokingRisk: "moderate",
  chokingNotes:
    "Raw or undercooked carrot is firm enough to block an airway, and coin-shaped slices are the riskiest geometry. Mitigate by cooking until completely soft and serving as sticks (not coins); no raw carrot except paper-thin ribbons until well into toddlerhood.",
  nutritionHighlights: [
    "Rich in beta-carotene, which the body converts to vitamin A for eye and immune development",
    "A source of gentle fiber that supports digestion",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "A whole peeled carrot, steamed or simmered until it smashes easily between your thumb and finger, served as a stick about the length and width of two adult fingers.",
      passFailTest:
        "The squish test: press a piece between your thumb and forefinger — it should flatten with gentle pressure. If you have to squeeze hard, cook it longer.",
      whyThisForm:
        "At this age babies use a palmar (whole-fist) grasp: they trap food in a fist and gnaw on the part sticking out. A long, soft stick gives them a graspable handle while staying soft enough to mash with bare gums.",
      prepSteps: [
        "Peel a medium carrot and trim both ends.",
        "Steam for 15–20 minutes, or simmer in unsalted water, until a fork slides in with zero resistance.",
        "Run the squish test on the thickest part before serving.",
        "Serve one warm (not hot) stick at a time on the tray.",
      ],
      commonMistakes: [
        "Undercooking — a carrot that still snaps is a choking hazard, not a food.",
        "Cutting into coins or rounds: round slices are exactly the shape that can plug an airway.",
        "Serving straight from the steamer while the center is still scalding.",
      ],
      cutDiagram: "batons",
      media: [],
    },
    {
      band: "9-12m",
      form: "Soft-cooked carrot chopped into rough pieces about the size of your pinky fingernail, each still soft enough to smash between two fingers.",
      passFailTest:
        "Pick up a piece and press it between two fingers — it should flatten easily. Pieces that resist pressure go back in the steamer.",
      whyThisForm:
        "Around 9 months the pincer grasp emerges — babies start picking up small objects between thumb and forefinger. Small, soft, irregular pieces feed that skill while staying safe to gum.",
      prepSteps: [
        "Cook exactly as for 6–8 months (fork-tender, squish-test passing).",
        "Dice into rough pinky-nail-sized pieces — irregular edges are easier to pick up than smooth cubes.",
        "Scatter a few pieces at a time on the tray to avoid cheek-stuffing.",
      ],
      commonMistakes: [
        "Pieces so slippery they frustrate the baby — roll them in a pinch of ground oat cereal for grip.",
        "Staying on purees only: this window is when chewing skills are easiest to build.",
      ],
      cutDiagram: "bite-size",
      media: [],
    },
    {
      band: "12-24m",
      form: "Cooked carrot in soft bite-size chunks, or raw carrot only as paper-thin ribbons shaved with a vegetable peeler; raw sticks and coins remain off-limits.",
      passFailTest:
        "Cooked pieces should still yield to firm finger pressure; a raw ribbon should be thin enough to tear easily with your fingers.",
      whyThisForm:
        "Toddlers are getting molars but still cannot grind hard raw vegetables into a safe swallow — raw carrot sticks and coins stay a top choking hazard until around age 4.",
      prepSteps: [
        "Continue serving soft-cooked chunks alongside family meals.",
        "For raw texture practice, shave ribbons with a peeler and pile them loosely.",
      ],
      commonMistakes: [
        "Graduating to raw carrot sticks or coins because the child 'has teeth' — molars, not front teeth, do the grinding, and they aren't ready.",
      ],
      cutDiagram: "ribbons",
      media: [],
    },
  ],
  firstFoodPick: true,
  flavorPairings: ["olive-oil", "chicken", "lentils", "oatmeal"],
  tips: [
    "Cook whole, then cut: a whole carrot steams evenly and is easier to cut into intact, grippable sticks afterward.",
    "Roasting concentrates sweetness — toss in a little olive oil and roast at 400°F until completely soft for a flavor boost with no added sugar.",
    "If the stick keeps sliding out of a slippery fist, roll it in a pinch of dry infant oat cereal for traction.",
    "Batch-steam a bag of carrots, freeze the sticks flat, and rewarm in seconds for effortless repeat exposures.",
  ],
  sources: [SOURCES.wicGuide, SOURCES.nhsFrom6Months, SOURCES.aapChoking],
  nutrients: ["vitaminA", "fiber"],
  servingGuidance: [
    {
      band: "6-8m",
      typicalAmount:
        "Start with 1–2 soft-cooked sticks — let the baby set the pace; gnawing counts even when little visibly disappears.",
    },
    {
      band: "9-12m",
      typicalAmount:
        "A tablespoon or two of pinky-nail pieces, scattered a few at a time — refill while the reaching continues.",
    },
    {
      band: "12-24m",
      typicalAmount:
        "A small handful of soft chunks or raw ribbon pieces with the family meal — appetite swings day to day.",
    },
  ],
  watchOuts: [
    "Lots of carrot every day can leave skin slightly orange-tinged (carotenemia) — it's harmless and clears once the menu varies.",
  ],
  emoji: "🥕",
};

export default carrot;
