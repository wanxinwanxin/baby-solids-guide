import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const honeydew: Food = {
  slug: "honeydew",
  name: "Honeydew",
  aliases: ["honeydew melon"],
  category: "fruit",
  minAgeMonths: 6,
  ironRich: false,
  commonAllergen: null,
  chokingRisk: "low",
  nutritionHighlights: [
    "Provides vitamin C to support the immune system and iron absorption",
    "A source of potassium, which supports fluid balance and muscle function",
    "Mostly water — one of the most hydrating fruits you can serve",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "A thin slab of fully ripe honeydew about the length and width of two adult fingers, all rind removed, soft enough to mash between thumb and finger.",
      passFailTest:
        "Press a slab between thumb and forefinger — ripe honeydew flattens with gentle pressure. A slab that resists means the melon needs more ripening time.",
      whyThisForm:
        "A long, flat, thin slab suits the whole-fist palmar grasp, and thinness means each gummed-off bite is small — while a pat-dry and grip prep tame the slipperiest fruit on the tray.",
      prepSteps: [
        "Scrub the whole rind under running water before cutting so the knife stays clean through the flesh.",
        "Halve, scoop out all seeds, and cut the rind fully away.",
        "Slice thin slabs about two adult fingers long and pat them dry.",
        "Serve one slab at a time; a pinch of ground oat cereal on the surface adds traction.",
      ],
      commonMistakes: [
        "Serving underripe honeydew — pale, crunchy flesh is firm enough to break into gum-proof lumps.",
        "Cutting thick cubes instead of thin slabs, which defeats the small-bite geometry.",
        "Skipping the rind scrub before the first cut.",
      ],
      cutDiagram: "batons",
      media: [],
    },
    {
      band: "9-12m",
      form: "Ripe honeydew chopped into soft rind-free pieces about the size of your pinky fingernail, each squashing easily between two fingers.",
      passFailTest:
        "Squeeze a piece between two fingers — it should flatten without effort; crunchy pieces mean an underripe melon.",
      whyThisForm:
        "Small, soft, irregular pieces feed the emerging pincer grasp, and slick melon pieces are honest fine-motor practice for little fingers.",
      prepSteps: [
        "Prepare the melon as before — scrubbed, seeded, fully de-rinded.",
        "Chop into pinky-nail-sized pieces and pat dry so they are pickable.",
        "Scatter a few pieces at a time to prevent cheek-stuffing.",
      ],
      commonMistakes: [
        "Melon-baller shapes — round, slick balls are the exact geometry to avoid.",
        "Serving dripping-wet pieces that slide out of reach and frustrate the baby.",
      ],
      cutDiagram: "bite-size",
      media: [],
    },
    {
      band: "12-24m",
      form: "Thin rind-free slices or flat-sided bite-size chunks of ripe honeydew with family meals, never scooped into round melon balls.",
      passFailTest:
        "Bite a piece yourself — it should give with no crunch, and no piece should look round from any angle.",
      whyThisForm:
        "Toddlers with molars manage melon well, but round slippery melon balls recreate grape geometry and stay off the menu.",
      prepSteps: [
        "Continue scrubbing the rind before cutting and removing it completely.",
        "Cut slices or flat-sided chunks and serve alongside the family fruit plate.",
      ],
      commonMistakes: [
        "Passing along melon balls from a party fruit salad instead of recutting them flat-sided.",
      ],
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["cucumber", "kiwi", "yogurt"],
  tips: [
    "Ripeness test: a ready honeydew has a creamy-yellow (not green-white) rind that feels slightly tacky and smells sweet at the blossom end.",
    "Honeydew does not ripen much after picking — buy ripe, because steaming cannot rescue a crunchy one the way it rescues stone fruit.",
    "Pat every piece dry and add a pinch of ground oat cereal for grip — honeydew is the slipperiest fruit most babies meet.",
    "Scrub the rind under running water before the first cut, and refrigerate cut melon promptly.",
  ],
  sources: [SOURCES.wicGuide, SOURCES.nhsFrom6Months, SOURCES.aapStartingSolids],
  nutrients: ["vitaminC", "potassium"],
  servingGuidance: [
    {
      band: "6-8m",
      typicalAmount:
        "One thin slab at a time, a piece or two per meal — juice-sucking counts as eating at this age.",
    },
    {
      band: "9-12m",
      typicalAmount:
        "A small handful of pinky-nail pieces, offered a few at a time — refill while the reaching continues.",
    },
    {
      band: "12-24m",
      typicalAmount:
        "A few slices or a small bowl of chunks with a meal or snack — light and hydrating, so be generous.",
    },
  ],
  watchOuts: [
    "Melon rinds can carry bacteria into the flesh on the knife — always scrub before cutting and chill cut melon promptly.",
  ],
  emoji: "🍈",
};

export default honeydew;
