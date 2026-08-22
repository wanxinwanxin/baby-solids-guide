import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const butternutSquash: Food = {
  slug: "butternut-squash",
  name: "Butternut squash",
  aliases: ["winter squash"],
  category: "vegetable",
  minAgeMonths: 6,
  ironRich: false,
  commonAllergen: null,
  chokingRisk: "low",
  nutritionHighlights: [
    "Rich in beta-carotene, which the body converts to vitamin A for eye and immune development",
    "Provides vitamin C alongside gentle fiber",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "Peeled butternut squash roasted or steamed until completely fork-tender, cut into wedges about the length and width of two adult fingers held together.",
      passFailTest:
        "The squish test: press a wedge between your thumb and forefinger — it should flatten with gentle pressure. If it holds its edges, cook it longer.",
      whyThisForm:
        "A palmar-grasping baby clamps the wedge in a fist and gnaws the end sticking out; two-finger sizing leaves enough above the fist to reach, and squish-soft flesh mashes on bare gums.",
      prepSteps: [
        "Peel, halve, and seed a butternut squash, then cut into two-finger wedges.",
        "Roast at 400°F for 25–30 minutes, or steam 12–15 minutes, until a fork slides in with no resistance.",
        "Run the squish test on the thickest wedge before serving.",
        "Serve one warm (not hot) wedge at a time.",
      ],
      commonMistakes: [
        "Pulling the squash while the center still resists a fork — undercooked squash is firm enough to break into hard chips.",
        "Cutting cubes at this age instead of graspable wedges.",
      ],
      cutDiagram: "batons",
      media: [],
    },
    {
      band: "9-12m",
      form: "Roasted or steamed squash cut into soft cubes about the size of your pinky fingernail, each piece squashable between two fingers with gentle pressure.",
      passFailTest:
        "Pick up a cube and press it between two fingers — it should flatten easily. Firm-cornered cubes go back in the oven.",
      whyThisForm:
        "The emerging pincer grasp thrives on small, slightly sticky pieces, and soft squash cubes hold together just enough to lift without resisting the gums.",
      prepSteps: [
        "Cook squash exactly as for 6–8 months, fully squish-test soft.",
        "Dice into pinky-nail cubes.",
        "Scatter a few pieces at a time on the tray.",
      ],
      commonMistakes: [
        "Pieces so slippery they frustrate the baby — a dusting of dry infant oat cereal adds grip.",
      ],
      cutDiagram: "bite-size",
      media: [],
    },
    {
      band: "12-24m",
      form: "Soft roasted squash in rough bite-size chunks, or mashed and stirred into pasta, polenta, or beans at shared family meals.",
      passFailTest:
        "Chunks should still yield to firm finger pressure — roasted-caramelized outside is fine as long as the inside stays soft.",
      whyThisForm:
        "Toddlers with new molars handle soft chunks and mixed dishes well, and squash's sweetness makes it a reliable bridge food inside less familiar meals.",
      prepSteps: [
        "Roast chunks alongside family dinner and serve as-is.",
        "Mash extra squash into sauces, soups, or grain bowls.",
      ],
      commonMistakes: [
        "Only ever pureeing it — by this age chunks are the texture practice that matters.",
      ],
      cutDiagram: "bite-size",
      media: [],
    },
  ],
  firstFoodPick: true,
  flavorPairings: ["chicken", "black-beans", "quinoa", "olive-oil"],
  tips: [
    "Skip the wrestling match with the peel: halve the squash, roast cut-side down at 400°F for 45–50 minutes, and scoop the soft flesh out with a spoon.",
    "Roasting concentrates sweetness far more than steaming — worth the extra minutes for a first-time taster.",
    "Squash cubes are slippery; roll them in a pinch of dry infant oat cereal or hulled hemp seeds for grip.",
    "Batch-roast a whole squash, freeze wedges flat on a tray, and rewarm in the toaster oven for repeat servings all week.",
  ],
  sources: [SOURCES.wicGuide, SOURCES.nhsFrom6Months, SOURCES.aapStartingSolids],
  nutrients: ["vitaminA", "vitaminC", "fiber"],
  servingGuidance: [
    {
      band: "6-8m",
      typicalAmount:
        "One or two soft roasted wedges, one piece at a time on the tray — a starting point; the baby's interest sets the real portion.",
    },
    {
      band: "9-12m",
      typicalAmount:
        "A tablespoon or two of soft cubes, a few at a time — refill as the tray clears.",
    },
    {
      band: "12-24m",
      typicalAmount:
        "A few soft chunks or a tablespoon mashed into the family dish — let the toddler decide when enough is enough.",
    },
  ],
  watchOuts: [
    "A menu heavy in orange vegetables can tint little noses and palms orange (carotenemia) — harmless, and it fades with variety.",
  ],
  emoji: "🎃",
};

export default butternutSquash;
