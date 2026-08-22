import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const spinach: Food = {
  slug: "spinach",
  name: "Spinach",
  aliases: ["baby spinach"],
  category: "vegetable",
  minAgeMonths: 6,
  ironRich: true,
  commonAllergen: null,
  chokingRisk: "moderate",
  chokingNotes:
    "A slick, wilted spinach leaf can drape flat over the airway like a piece of film — the hazard is the shape, not the softness. Mitigate by always chopping cooked spinach finely and folding it into a food with body (omelette, mash, oatmeal) rather than serving intact leaves.",
  nutritionHighlights: [
    "One of the richer plant sources of iron — pair with vitamin-C foods to help absorption",
    "Provides folate, needed for rapid cell growth",
    "A source of vitamin K for normal blood clotting",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "Spinach wilted in a hot pan, squeezed firmly dry, and chopped into confetti-sized flecks no bigger than your pinky nail, folded through a mash, oatmeal, or soft omelette strip.",
      passFailTest:
        "Spread the chopped spinach out: no piece should be larger than your pinky nail, and no intact leaf should survive the chop.",
      whyThisForm:
        "A fist-grasping baby eats spinach only as a passenger in other foods; fine flecks carried by a mash or omelette can't drape over the airway the way a whole slick leaf can.",
      prepSteps: [
        "Wilt a few handfuls of washed spinach in a hot pan for 1–2 minutes.",
        "Squeeze the cooled spinach hard in your fist or a clean towel until no more water drips out.",
        "Chop finely in both directions until the pieces look like green confetti.",
        "Fold into mashed vegetables, oatmeal, or a well-cooked omelette cut into finger-width strips.",
      ],
      commonMistakes: [
        "Serving whole wilted leaves — soft, but exactly the draping shape to avoid.",
        "Skipping the squeeze, which leaves the dish watery and the flecks slippery.",
      ],
      cutDiagram: "shred",
      media: [],
    },
    {
      band: "9-12m",
      form: "Finely chopped cooked spinach stirred into scrambled egg, pasta, yogurt, or mashed vegetables so that every fleck arrives attached to a food with real body.",
      passFailTest:
        "Pull a spoonful apart: any spinach piece you can peel off as a flat sheet bigger than a pinky nail needs more chopping.",
      whyThisForm:
        "Pincer-stage babies pick up mixed pieces well, but a free-floating slick leaf is still a draping hazard, so spinach keeps riding inside other textures.",
      prepSteps: [
        "Cook, squeeze, and chop spinach as for 6–8 months.",
        "Stir into scrambled eggs, pasta pieces, or a thick mash.",
        "Serve as pinky-nail-sized mixed pieces the baby can self-feed.",
      ],
      commonMistakes: [
        "Handing over a leaf to explore because the baby seems capable — capability doesn't change the leaf's geometry.",
      ],
      cutDiagram: "shred",
      media: [],
    },
    {
      band: "12-24m",
      form: "Cooked chopped spinach served as its own small side dish, with raw baby spinach still torn into pinky-nail pieces rather than offered as whole slick leaves.",
      passFailTest:
        "Cooked spinach should be chopped past the point where you could lift out a flat, intact leaf; torn raw pieces should each fit on a pinky nail.",
      whyThisForm:
        "Toddlers chew better but still manage thin, clingy textures poorly; small pieces keep spinach safe while the child learns to move slippery foods around the mouth.",
      prepSteps: [
        "Continue chopping cooked spinach before serving, on its own or in family dishes.",
        "For raw spinach in salads or sandwiches, tear leaves into small pieces first.",
      ],
      commonMistakes: [
        "Serving a whole raw spinach leaf in a sandwich, where it can pull free in one slick sheet.",
      ],
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["egg", "potato", "lentils", "yogurt"],
  tips: [
    "Squeeze hard after cooking: a fist-wrung ball of spinach chops cleanly into confetti, while wet spinach smears and clumps.",
    "Pair spinach with vitamin-C foods — tomato, orange, strawberry — in the same meal to help the body absorb its plant iron.",
    "Batch trick: wilt a whole bag, squeeze it into a log, freeze, and grate frozen shavings straight into eggs or sauces as they cook.",
    "The mineral edge of spinach can take 8–15 exposures to win over — keep offering small amounts without pressure and let familiarity do the work.",
  ],
  sources: [SOURCES.wicGuide, SOURCES.nhsFrom6Months, SOURCES.cdcFoodsAndDrinks],
  nutrients: ["iron", "folate"],
  servingGuidance: [
    {
      band: "6-8m",
      typicalAmount:
        "A teaspoon or two of chopped flecks folded through a mash or omelette strip — a garnish-scale start is exactly right.",
    },
    {
      band: "9-12m",
      typicalAmount:
        "A tablespoon of confetti-chopped spinach stirred through eggs, pasta pieces, or a thick mash.",
    },
    {
      band: "12-24m",
      typicalAmount:
        "A couple of tablespoons as its own small side, or torn pieces through family dishes — offered without pressure, eaten or not.",
    },
  ],
  watchOuts: [
    "Spinach's oxalates bind much of its calcium (and some of its iron) — count it as an iron-with-vitamin-C food rather than a calcium source, and rotate it with other greens.",
  ],
  emoji: "🥬",
};

export default spinach;
