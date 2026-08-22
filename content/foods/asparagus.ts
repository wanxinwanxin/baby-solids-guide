import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const asparagus: Food = {
  slug: "asparagus",
  name: "Asparagus",
  aliases: [],
  category: "vegetable",
  minAgeMonths: 6,
  ironRich: false,
  commonAllergen: null,
  chokingRisk: "moderate",
  chokingNotes:
    "The outer skin of the stalk hides long fibrous strings that can pull loose in ropey strands, and an undercooked spear is firm enough to break into hard chunks. Mitigate by snapping off the woody end, peeling the lower half of each spear, cooking to full squish-softness, and cutting crosswise once the baby is picking up pieces.",
  nutritionHighlights: [
    "One of the better vegetable sources of folate, needed for rapid cell growth",
    "Brings gentle fiber that keeps digestion moving",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "A whole thick asparagus spear, woody end snapped off and lower half peeled, steamed until it smashes between two fingers, served as a stick about two adult fingers long.",
      passFailTest:
        "The squish test mid-stalk: press the thickest part between thumb and forefinger — it should flatten with gentle pressure and never feel ropey when you pull it apart.",
      whyThisForm:
        "A spear is a natural palmar-grasp food: the baby fists the stalk and gnaws the soft tip and shaft, so the built-in handle does the gripping work while peeling removes the strings.",
      prepSteps: [
        "Hold each spear at both ends and bend — it snaps naturally right where the woody part ends; discard the tough end.",
        "Run a vegetable peeler up the lower half of the spear to strip the stringy outer skin.",
        "Steam 8–12 minutes, until the thickest part passes the squish test.",
        "Serve one warm spear at a time, tip pointing out of the fist.",
      ],
      commonMistakes: [
        "Choosing pencil-thin spears — they collapse into droopy strings and are harder to grip than thick ones.",
        "Skipping the peel, which leaves ropey strands in the outer skin.",
        "Pulling the spears out while still bright green and firm — softness beats color.",
      ],
      cutDiagram: "batons",
      media: [],
    },
    {
      band: "9-12m",
      form: "Soft-steamed asparagus chopped crosswise into pieces about the size of your pinky fingernail, so that every fibrous strand is cut short.",
      passFailTest:
        "Pinch a piece from the thick end of the stalk between two fingers — it should flatten easily, and no long string should trail out when you pull it apart.",
      whyThisForm:
        "The pincer grasp arriving around 9 months suits small pieces, and cutting across the stalk shortens every fiber so nothing stringy can trail toward the throat.",
      prepSteps: [
        "Snap, peel, and steam exactly as for 6–8 months.",
        "Chop the spears crosswise into pinky-nail pieces, crumbling the soft tips.",
        "Scatter a few pieces at a time on the tray.",
      ],
      commonMistakes: [
        "Cutting lengthwise, which preserves full-length fibers instead of shortening them.",
        "Serving a big slippery pile that invites cheek-stuffing.",
      ],
      cutDiagram: "bite-size",
      media: [],
    },
    {
      band: "12-24m",
      form: "Fully tender asparagus in soft bite-size pieces cut across the stalk, or a whole soft spear to bite from, with the lower skin still peeled away.",
      passFailTest:
        "Pieces should yield to firm finger pressure, and biting a spear yourself should leave a clean edge with no strings dragging behind.",
      whyThisForm:
        "Toddlers chew better but still handle long fibers poorly, so asparagus stays soft-cooked with strings peeled while whole-spear biting builds real eating skills.",
      prepSteps: [
        "Keep snapping woody ends and peeling lower stalks before cooking.",
        "Steam or roast until fully tender, then serve pieces or whole spears alongside family meals.",
      ],
      commonMistakes: [
        "Serving crisp-tender restaurant-style asparagus — the al dente stage is exactly the stringy, chewy stage.",
      ],
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["egg", "olive-oil", "cheese", "pasta"],
  tips: [
    "Buy the thickest spears you can find: they steam up soft and creamy at the center and survive a fist grip, while thin ones turn to string.",
    "Snap, don't cut — bending the spear breaks it exactly where the woody base ends, no guesswork needed.",
    "A vegetable peeler up the bottom half of each spear removes the stringy skin in seconds and transforms the texture.",
    "Steam until the spear droops when you hold it at one end — a floppy spear is a safe spear.",
  ],
  sources: [SOURCES.nhsFrom6Months, SOURCES.wicGuide, SOURCES.cdcFoodsAndDrinks],
  nutrients: ["folate", "fiber"],
  servingGuidance: [
    {
      band: "6-8m",
      typicalAmount:
        "One or two soft whole spears — gnawing the tips counts as eating even when little visibly disappears.",
    },
    {
      band: "9-12m",
      typicalAmount:
        "A tablespoon of crosswise-chopped pieces, scattered a few at a time — refill while the reaching continues.",
    },
    {
      band: "12-24m",
      typicalAmount:
        "A small handful of soft pieces or a couple of tender spears beside the family meal — appetite leads.",
    },
  ],
  watchOuts: [
    "Asparagus can give urine a strong, odd smell within the hour — a harmless quirk of digestion, not a reaction.",
  ],
  emoji: "🌿",
};

export default asparagus;
