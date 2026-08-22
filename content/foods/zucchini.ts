import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const zucchini: Food = {
  slug: "zucchini",
  name: "Zucchini",
  aliases: ["courgette"],
  category: "vegetable",
  minAgeMonths: 6,
  ironRich: false,
  commonAllergen: null,
  chokingRisk: "low",
  nutritionHighlights: [
    "High water content makes it a gentle, hydrating early vegetable",
    "Provides some vitamin C and potassium with a mild flavor babies rarely refuse",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "Zucchini quartered lengthwise into strips about the length and width of two adult fingers, skin left on one side of each strip for grip, and steamed just until the flesh smashes between two fingers.",
      passFailTest:
        "The squish test: press the flesh side between thumb and forefinger — it should flatten with gentle pressure, while the skin side still holds the strip in one piece when lifted.",
      whyThisForm:
        "A palmar-grasp baby needs a handle that survives the fist, and peeled zucchini turns to slippery mush almost instantly — the strip of skin is the structure and the traction.",
      prepSteps: [
        "Wash a medium zucchini, trim the ends, and quarter it lengthwise so every strip keeps a band of skin.",
        "Steam only 4–6 minutes — zucchini races from firm to mush faster than almost any vegetable.",
        "Run the squish test on the flesh, then pat the strips dry so they are less slick.",
        "Serve one warm strip at a time, skin side facing the palm.",
      ],
      commonMistakes: [
        "Peeling it — without skin the strip collapses in the fist before it reaches the mouth.",
        "Oversteaming into watery mush; set a timer, because the window is short.",
        "Cutting half-moons or coins at this age: too slippery and too small for a fist grip.",
      ],
      cutDiagram: "strips",
      media: [],
    },
    {
      band: "9-12m",
      form: "Soft-steamed zucchini in rough pieces about the size of your pinky fingernail, each keeping a bit of skin on one side and patted dry or dusted for grip.",
      passFailTest:
        "Pick up a piece with your own thumb and forefinger: it should survive the lift without skating away, then flatten with a gentle pinch.",
      whyThisForm:
        "The new pincer grasp is defeated by wet, slick surfaces more than by size — skin-on pieces with a dry or dusted surface let the skill practice actually succeed.",
      prepSteps: [
        "Steam skin-on strips as for 6–8 months, then chop into pinky-nail pieces.",
        "Pat dry and, if pieces still skate around, roll them in a pinch of ground oat cereal.",
        "Scatter a few pieces at a time on the tray.",
      ],
      commonMistakes: [
        "Serving slippery peeled half-moons and concluding the baby can't handle finger food — grip, not skill, is usually the problem.",
      ],
      cutDiagram: "bite-size",
      media: [],
    },
    {
      band: "12-24m",
      form: "Tender sautéed or roasted zucchini pieces up to two adult thumbnails in size, or raw zucchini only as paper-thin peeler ribbons, folded into family meals.",
      passFailTest:
        "Cooked pieces should yield fully to a gentle finger press; a raw ribbon should be thin enough to tear effortlessly between your fingers.",
      whyThisForm:
        "Toddlers with molars manage zucchini's soft cooked texture in any reasonable shape, and paper-thin raw ribbons introduce a fresh crunch without real chewing demand.",
      prepSteps: [
        "Sauté or roast pieces until tender through, and serve with the family meal.",
        "For raw practice, shave thin ribbons with a vegetable peeler and pile them loosely.",
      ],
      commonMistakes: [
        "Serving thick raw sticks — raw zucchini is firmer than it looks and stays a gagging frustration until chewing matures.",
      ],
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["pasta", "chicken", "tomato", "olive-oil"],
  tips: [
    "Set a timer: 4–6 minutes of steaming is the whole window between too firm and watery mush.",
    "Never peel for babies — the skin is the handle, the structure, and the anti-slip surface all at once.",
    "Pat steamed pieces dry before serving; zucchini weeps water that turns every surface slippery.",
    "Rolling pieces in a pinch of ground oat cereal or fine breadcrumbs is the rescue move when little fingers keep losing their grip.",
    "Grate raw zucchini into fritters or muffins for an easy no-texture-battle serving on busy days.",
  ],
  sources: [SOURCES.nhsFrom6Months, SOURCES.wicGuide, SOURCES.cdcFoodsAndDrinks],
  nutrients: ["vitaminC", "potassium"],
  servingGuidance: [
    {
      band: "6-8m",
      typicalAmount:
        "One skin-on strip at a time — gnawed, squished, or eaten, all three count as practice.",
    },
    {
      band: "9-12m",
      typicalAmount:
        "A small handful of skin-on pieces, patted dry and put down a few at a time.",
    },
    {
      band: "12-24m",
      typicalAmount:
        "A few tender pieces with the family meal, or a loose pile of raw ribbon slices to explore — appetite sets the amount.",
    },
  ],
  emoji: "🥒",
};

export default zucchini;
