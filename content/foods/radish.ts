import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const radish: Food = {
  slug: "radish",
  name: "Radish",
  aliases: ["red radish", "daikon"],
  category: "vegetable",
  minAgeMonths: 9,
  ironRich: false,
  commonAllergen: null,
  chokingRisk: "high",
  chokingNotes:
    "A raw radish is hard, smooth, and round — close to the highest-risk shape a food can take. Mitigate by cooking until a wedge squishes between two fingers and always cutting into wedges rather than rounds or coins; raw radish waits until around age 4.",
  nutritionHighlights: [
    "A source of vitamin C for immune health and iron absorption",
    "Brings a little fiber in a low-calorie package",
  ],
  prepSpecs: [
    {
      band: "9-12m",
      form: "Radishes steamed or roasted until they smash easily between two fingers, cut lengthwise into thin wedges — never coins or whole rounds — each about the thickness of a pinky finger.",
      passFailTest:
        "The squish test on the fattest wedge: it should flatten under gentle finger pressure; any wet, crisp crunch means back into the pan.",
      whyThisForm:
        "Wedge geometry destroys the dangerous ball shape, cooking removes the hardness, and thin soft wedges suit a pincer grasp that is just finding its accuracy.",
      prepSteps: [
        "Trim the tops and root tails, then quarter each radish lengthwise into wedges.",
        "Steam 10–12 minutes, or roast at 400°F for 20–25 minutes, until squish-soft.",
        "Test the fattest wedge between two fingers before any reach the tray.",
        "Serve a few warm wedges alongside a familiar food.",
      ],
      commonMistakes: [
        "Serving raw slices because radishes are small — small, hard, and round is the worst combination.",
        "Cutting rounds or coins instead of wedges.",
        "Stopping at fork-pierceable — a radish can take a fork and still crunch.",
      ],
      cutDiagram: "wedge-handle",
      media: [],
    },
    {
      band: "12-24m",
      form: "Soft-cooked radish wedges or bite-size chopped pieces, with roasting favored for its mellow sweetness, while hard raw radish stays off the tray until about age four.",
      passFailTest:
        "Every wedge or piece should still flatten between two fingers; if the batch firmed up in the fridge, rewarm with a splash of water until it softens again.",
      whyThisForm:
        "Toddler molars cannot yet grind a raw radish safely, so it keeps arriving cooked and wedge-cut while roasting converts the peppery bite into an easy mild-sweet flavor.",
      prepSteps: [
        "Roast wedges with olive oil until browned at the edges and fully soft inside.",
        "Serve warm beside familiar foods, or chop into a grain bowl.",
      ],
      commonMistakes: [
        "Passing down a raw radish half from the salad — cooked-only remains the rule for years yet.",
      ],
      cutDiagram: "wedge-handle",
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["olive-oil", "potato", "cheese"],
  tips: [
    "Roasting transforms radishes — the peppery bite mellows into something closer to a mild turnip-sweet potato.",
    "Big daikon radish can be cut into carrot-style sticks and steamed to squish-soft for easier gripping.",
    "Steamed radishes hold a lot of water; a quick finish in a hot pan keeps the wedges from being drippy.",
    "Introduce radish next to an old favorite — new peppery flavors land better beside familiar friends.",
  ],
  sources: [SOURCES.aapChoking, SOURCES.cdcChokingHazards, SOURCES.wicGuide],
  nutrients: ["vitaminC", "fiber"],
  servingGuidance: [
    {
      band: "9-12m",
      typicalAmount:
        "One or two soft wedges, or a spoonful of chopped pieces, offered alongside familiar foods.",
    },
    {
      band: "12-24m",
      typicalAmount:
        "A few soft roasted wedges with the family meal — let appetite decide how many.",
    },
  ],
  watchOuts: [],
  emoji: "🌱",
};

export default radish;
