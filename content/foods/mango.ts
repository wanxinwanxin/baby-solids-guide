import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const mango: Food = {
  slug: "mango",
  name: "Mango",
  aliases: [],
  category: "fruit",
  minAgeMonths: 6,
  ironRich: false,
  commonAllergen: null,
  chokingRisk: "low",
  nutritionHighlights: [
    "Rich in vitamin C, which supports immunity and helps the body absorb iron from plant foods",
    "A source of beta-carotene, converted by the body to vitamin A for eyes and skin",
    "Natural sweetness that makes it an easy vehicle for mixing in new flavors",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "A ripe mango cheek cut off the flat pit and sliced into wedges about two adult fingers in size, with the skin left on the lower half of each wedge as a non-slip handle.",
      passFailTest:
        "Press the cut flesh with a fingertip — it should dent like ripe avocado and feel slippery-soft, not firm or fibrous.",
      whyThisForm:
        "Babies at this age hold food in a whole fist and gnaw the exposed end, and ripe mango is among the most slippery fruits — the skin-covered grip end is what keeps the wedge in the fist.",
      prepSteps: [
        "Stand the mango on end and slice the two cheeks off either side of the flat central pit.",
        "Cut each cheek into wedges roughly the size of two adult fingers.",
        "Peel only the top half of each wedge, leaving skin on the bottom half as the handle.",
        "Alternatively, peel fully and roll the grip end in ground oat cereal for traction.",
      ],
      commonMistakes: [
        "Serving fully peeled mango — it is soap-bar slippery and shoots straight out of a small fist.",
        "Using an underripe, fibrous mango whose strings are hard to manage with bare gums.",
        "Letting the baby gnaw near the pit, where clinging fibrous flesh can shred into strings.",
      ],
      cutDiagram: "wedge-handle",
      media: [],
    },
    {
      band: "9-12m",
      form: "Ripe mango peeled and chopped into soft cubes about the size of your pinky fingernail, each squashing flat easily between two fingers.",
      passFailTest:
        "Press a cube between two fingers — it should flatten with gentle pressure and feel smooth, not stringy.",
      whyThisForm:
        "With the pincer grasp emerging around 9 months, small soft cubes let the baby self-feed precise bites, and mango's softness makes it safe to gum without teeth.",
      prepSteps: [
        "Slice the cheeks off the pit, score a grid into each cheek, and scoop the cubes out with a spoon.",
        "Roll the cubes in a pinch of ground oat cereal if they are too slick to pick up.",
        "Offer a few cubes at a time to discourage cheek-stuffing.",
      ],
      commonMistakes: [
        "Cubes so slippery the baby gives up — the ground-cereal trick solves this in seconds.",
        "Serving stringy flesh from right against the pit instead of the smooth cheek flesh.",
      ],
      cutDiagram: "bite-size",
      media: [],
    },
    {
      band: "12-24m",
      form: "Peeled ripe mango in bite-size chunks or thin slices, or a whole skin-on wedge to bite from under supervision once chewing is confident.",
      passFailTest:
        "The flesh should still dent under a fingertip; a mango you have to saw through is not ripe enough to serve raw.",
      whyThisForm:
        "Toddlers with emerging molars handle larger soft pieces and can practice taking bites from a bigger wedge, a real-world eating skill.",
      prepSteps: [
        "Cut cheeks off the pit and serve as chunks, slices, or a large wedge with a skin handle.",
        "Never serve the pit itself — flesh clings to it, but it is a smooth, slippery oval exactly wrong for small mouths.",
      ],
      commonMistakes: [
        "Giving the pit to suck on 'like a lollipop' — it is a slick, mouth-sized object that can slide back toward the throat.",
      ],
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["yogurt", "black-beans", "chicken", "rice"],
  tips: [
    "Ripeness test: a ripe mango smells sweet at the stem end and gives under gentle thumb pressure — color alone is a poor guide since it varies by variety.",
    "The mango pit is a flat oval running the length of the fruit — slice the cheeks off either side of it rather than trying to cut through the center.",
    "Frozen mango chunks, thawed until fingertip-soft, are a reliable off-season substitute and come pre-cut.",
    "Rolling slippery mango in ground oat cereal or crushed dry infant cereal adds grip without changing the taste much.",
  ],
  sources: [SOURCES.wicGuide, SOURCES.nhsFrom6Months, SOURCES.aapStartingSolids],
  nutrients: ["vitaminC", "vitaminA", "fiber"],
  servingGuidance: [
    {
      band: "6-8m",
      typicalAmount:
        "One skin-handled wedge at a time — a piece or two per meal; squeezing, smearing, and sucking all count.",
    },
    {
      band: "9-12m",
      typicalAmount:
        "A small handful of soft cubes — refill while the reaching continues.",
    },
    {
      band: "12-24m",
      typicalAmount:
        "A few slices or chunks — a quarter to half a mango — served with the meal rather than before it.",
    },
  ],
  watchOuts: [
    "Mango peel (the built-in handle) can irritate sensitive skin on contact — wipe cheeks and hands after the meal.",
  ],
  emoji: "🥭",
};

export default mango;
