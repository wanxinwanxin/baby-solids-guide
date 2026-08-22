import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const tortilla: Food = {
  slug: "tortilla",
  name: "Flour tortilla",
  aliases: ["wrap"],
  category: "grain",
  minAgeMonths: 6,
  ironRich: false,
  commonAllergen: "wheat",
  chokingRisk: "moderate",
  chokingNotes:
    "A soft flour tortilla can compress against the palate into a sticky, gummy wad — the same hazard as fresh bread. Mitigate by warming and very lightly toasting each piece until it springs back when pressed, cutting it into finger-width strips, and never handing over a big floppy round a baby can tear and cram.",
  nutritionHighlights: [
    "Tortillas made from enriched flour contribute iron, folic acid, and other B vitamins",
    "An easy everyday vehicle for keeping wheat exposure steady once it's introduced",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "A flour tortilla warmed until pliable and very lightly toasted in a dry skillet, cut into strips about the width of one adult finger and the length of two.",
      passFailTest:
        "The pinch test: squeeze a strip between thumb and forefinger — it should compress and spring back. If it presses into a dense, doughy pellet, it needs another minute in the pan.",
      whyThisForm:
        "A palmar-grasping baby holds a strip in a fist and gnaws the end sticking out, and light toasting keeps the crumb springy instead of letting it collapse into the sticky wad a fresh tortilla becomes.",
      prepSteps: [
        "Pick the lowest-sodium tortilla on the shelf and warm it in a dry skillet about 30 seconds per side, until barely blistered but still bendable.",
        "Cut into finger-width strips roughly two finger-lengths long.",
        "First time with wheat: serve early in the day, keep the amount small, and watch for 2 hours.",
        "Never introduce it alongside another new food, so any reaction has one clear cause.",
      ],
      commonMistakes: [
        "Serving strips straight from the bag — untoasted tortilla is exactly the texture that wads up.",
        "Toasting until crisp, which swaps the gumming hazard for sharp, crackery shards.",
        "Rolling the strip around a thick filling that squeezes out in one blob.",
      ],
      cutDiagram: "strips",
      media: [],
    },
    {
      band: "9-12m",
      form: "Lightly toasted tortilla cut into rough pieces about the size of your pinky fingernail, each still springy rather than doughy-soft or crisp.",
      passFailTest:
        "Press one piece flat between two fingers — it should squash and partly spring back, never smear into paste or snap like a chip.",
      whyThisForm:
        "The emerging pincer grasp gets low-stakes practice on small toasted pieces, and a thin smear of mashed beans or avocado adds grip without creating a sticky glob.",
      prepSteps: [
        "Warm and lightly toast exactly as for 6–8 months.",
        "Cut into pinky-nail pieces, plain or with a paper-thin smear of mashed avocado or refried beans.",
        "Offer a few pieces at a time to discourage cheek-stuffing.",
      ],
      commonMistakes: [
        "Drifting back to untoasted tortilla because the baby seems more capable — it still wads up at this age.",
      ],
      cutDiagram: "bite-size",
      media: [],
    },
    {
      band: "12-24m",
      form: "Lightly toasted strips or thin-filled quesadilla pieces about the size of two adult thumbnails, never a whole floppy round to tear from.",
      passFailTest:
        "Fold a piece in half: it should bend and spring back rather than compress into a dense pellet, and any melted filling should be a see-through layer, not a molten pocket.",
      whyThisForm:
        "Toddlers gain molars but still over-stuff, and soft tortilla remains a top wad-former, so light toasting, small pieces, and thin fillings stay the rule.",
      prepSteps: [
        "Build a thin quesadilla with a light layer of cheese or mashed beans, toast in a dry pan, and rest until the filling cools.",
        "Cut into small strips or two-thumbnail pieces before serving.",
      ],
      commonMistakes: [
        "Serving quesadilla wedges straight off the heat — melted cheese holds scalding heat longer than the tortilla suggests.",
      ],
      cutDiagram: "strips",
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["avocado", "black-beans", "cheese", "egg"],
  tips: [
    "If wheat is already introduced via bread or pasta with no reaction, tortilla is just a new texture — the first-time caution steps no longer apply.",
    "Thirty seconds per side in a dry skillet is the sweet spot: blistered enough to stay springy, bendable enough to gum.",
    "A paper-thin smear of mashed avocado or beans adds grip and calories without turning the strip into a sticky glob.",
    "Tortillas freeze flat and toast straight from frozen — keep a bag stashed for instant baby-safe strips.",
  ],
  sources: [SOURCES.eatStudy, SOURCES.cdcFoodsAndDrinks, SOURCES.aapChoking],
  nutrients: ["iron", "folate"],
  servingGuidance: [
    {
      band: "6-8m",
      typicalAmount:
        "One lightly toasted strip is plenty to start — much of it is gnawing and exploration, and that counts.",
      frequency: "About twice a week once tolerated keeps the wheat exposure steady",
    },
    {
      band: "9-12m",
      typicalAmount:
        "A few pinky-nail pieces at a time, up to about half a tortilla — appetite decides, not the round.",
    },
    {
      band: "12-24m",
      typicalAmount:
        "Half a tortilla as strips or thin quesadilla pieces with the family meal — hunger swings day to day.",
    },
  ],
  watchOuts: [
    "Store tortillas vary widely in sodium — compare labels and pick the lowest per tortilla you can find.",
    "Tortilla is wheat — if celiac disease or wheat allergy runs in the family, discuss introduction with your pediatrician first.",
  ],
  emoji: "🌯",
};

export default tortilla;
