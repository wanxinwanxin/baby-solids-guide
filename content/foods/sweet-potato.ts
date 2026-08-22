import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const sweetPotato: Food = {
  slug: "sweet-potato",
  name: "Sweet potato",
  aliases: ["yam"],
  category: "vegetable",
  minAgeMonths: 6,
  ironRich: false,
  commonAllergen: null,
  chokingRisk: "low",
  nutritionHighlights: [
    "Exceptionally rich in beta-carotene, which the body converts to vitamin A for vision and immune development",
    "Provides potassium and gentle fiber that supports digestion",
    "Naturally sweet, which makes it one of the most readily accepted early vegetables",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "Sweet potato roasted or steamed until the flesh is totally soft, cut into wedges about the length and width of two adult fingers, or mashed smooth with a splash of milk.",
      passFailTest:
        "The squish test: press a wedge between thumb and forefinger — it should flatten into a smear with gentle pressure, with no firm or fibrous core anywhere along its length.",
      whyThisForm:
        "A whole-fist palmar grasp needs a chunky handle with plenty sticking out to gnaw, and fully cooked sweet potato is soft enough to dissolve against bare gums while still holding a wedge shape.",
      prepSteps: [
        "Roast a whole sweet potato at 400°F for 45–60 minutes until it slumps and the skin wrinkles, or steam peeled wedges 12–15 minutes.",
        "Cool, peel, and cut into two-finger wedges.",
        "Run the squish test on the thickest part of a wedge before serving.",
        "Serve one warm (not hot) wedge at a time on the tray.",
      ],
      commonMistakes: [
        "Undercooking — a wedge with a firm center defeats gums and frustrates the meal.",
        "Cutting wedges too thin, so they collapse into mush inside the fist before reaching the mouth.",
        "Serving straight from the oven while the dense center is still scalding.",
      ],
      cutDiagram: "batons",
      media: [],
    },
    {
      band: "9-12m",
      form: "Fully soft roasted or steamed sweet potato cut into rough cubes about the size of your pinky fingernail, each still smashing flat between two fingers.",
      passFailTest:
        "Pick up one cube and pinch it: it should flatten with almost no effort — a cube that holds its corners under pressure needs more cooking time.",
      whyThisForm:
        "The pincer grasp emerging around 9 months thrives on small, soft, slightly tacky pieces, and sweet potato's natural stickiness helps cubes stay put between little fingers.",
      prepSteps: [
        "Cook exactly as for 6–8 months, until completely soft.",
        "Dice into pinky-nail cubes, leaving the edges rough for grip.",
        "Scatter a few cubes at a time to keep pacing calm.",
      ],
      commonMistakes: [
        "Cubes so moist they dissolve on the tray — a brief rest after cooking lets the surface firm slightly for pick-up.",
      ],
      cutDiagram: "bite-size",
      media: [],
    },
    {
      band: "12-24m",
      form: "Soft roasted chunks, thick mash with family seasonings held back, or oven fries cooked through until every piece yields fully to firm finger pressure.",
      passFailTest:
        "Squeeze the fattest piece between two fingers: soft interior and no leathery, chewy shell — oven fries that crunch are for the adults, not the toddler.",
      whyThisForm:
        "New molars manage more shape variety, but sweet potato should stay genuinely soft; the win at this age is folding it into family meals rather than firming it up.",
      prepSteps: [
        "Serve soft chunks or mash alongside the family meal.",
        "For oven fries, bake thick-cut wedges until fully tender inside and only lightly colored outside.",
      ],
      commonMistakes: [
        "Crisping fries hard for the whole family — a leathery shell is chew work a toddler can't finish.",
      ],
      media: [],
    },
  ],
  firstFoodPick: true,
  flavorPairings: ["black-beans", "chicken", "yogurt", "lentils"],
  tips: [
    "Roast whole and unattended: a 400°F oven for about an hour turns the flesh custard-soft with zero prep, and the skin peels off in one motion afterward.",
    "Steaming is the fast path (12–15 minutes for wedges), but roasting concentrates the sweetness babies love.",
    "If wedges keep sliding out of a slippery fist, roll them in a pinch of ground oat cereal for traction.",
    "Batch-roast several at once, cut, and freeze wedges flat on a tray — they rewarm in the microwave in under a minute.",
  ],
  sources: [SOURCES.wicGuide, SOURCES.nhsFrom6Months, SOURCES.aapStartingSolids],
  nutrients: ["vitaminA", "fiber"],
  servingGuidance: [
    {
      band: "6-8m",
      typicalAmount:
        "One soft two-finger piece at a time — one nibble some meals, three pieces others; both are the baby self-regulating.",
    },
    {
      band: "9-12m",
      typicalAmount:
        "A small handful of soft cubes, scattered a few at a time and topped up on demand.",
    },
    {
      band: "12-24m",
      typicalAmount:
        "A few soft chunks or a couple of tablespoons of mash with the family meal — a starting point, not a quota.",
    },
  ],
  watchOuts: [
    "A heavy daily beta-carotene habit can tint the nose and palms orange (carotenemia) — harmless, and it fades with a more varied rotation.",
  ],
  emoji: "🍠",
};

export default sweetPotato;
