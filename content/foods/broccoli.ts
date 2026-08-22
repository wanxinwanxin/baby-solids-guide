import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const broccoli: Food = {
  slug: "broccoli",
  name: "Broccoli",
  aliases: [],
  category: "vegetable",
  minAgeMonths: 6,
  ironRich: false,
  commonAllergen: null,
  chokingRisk: "low",
  nutritionHighlights: [
    "Rich in vitamin C, which helps the body absorb iron from plant foods served alongside",
    "A source of folate and vitamin K for growth and healthy blood",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "A whole broccoli floret steamed until the stem smashes between two fingers, served head-up with about two adult fingers of trimmed stem left on as a built-in handle.",
      passFailTest:
        "The squish test on the stem, not the head: press the thickest part of the stem between thumb and forefinger — it should flatten with gentle pressure, because the fluffy top always softens first.",
      whyThisForm:
        "Broccoli is nature's palmar-grasp food: the baby fists the stem like a lollipop stick and gnaws the soft floret, so the handle geometry does the safety work.",
      prepSteps: [
        "Cut florets with a stem about two adult fingers long, shaving off any tough outer skin on the stem.",
        "Steam 8–12 minutes, until the stem — the slowest part — passes the squish test.",
        "Serve one warm floret at a time, stem pointing toward the baby's hand.",
      ],
      commonMistakes: [
        "Testing the floret head instead of the stem — the head softens minutes before the stem does.",
        "Trimming the stem flush to the head, which removes the entire handle.",
        "Undercooking to keep it bright green — color is the adult's priority, softness is the baby's.",
      ],
      cutDiagram: "wedge-handle",
      media: [],
    },
    {
      band: "9-12m",
      form: "Soft-steamed broccoli chopped into pieces about the size of your pinky fingernail, mixing crumbly floret bits and fully tender stem pieces.",
      passFailTest:
        "Pinch a stem piece between two fingers: it should flatten easily — floret crumbs are always soft, so the stem pieces are the ones to test.",
      whyThisForm:
        "The pincer grasp arriving around 9 months is well matched to broccoli's naturally craggy, grippy pieces, which are easier to hold than smooth cubes.",
      prepSteps: [
        "Steam until the stems pass the squish test, as for 6–8 months.",
        "Chop florets and stems into pinky-nail pieces.",
        "Scatter a few pieces at a time on the tray.",
      ],
      commonMistakes: [
        "Serving only the fluffy tops — tender stem pieces add valuable texture practice.",
        "Big handfuls on the tray at once, inviting cheek-stuffing.",
      ],
      cutDiagram: "bite-size",
      media: [],
    },
    {
      band: "12-24m",
      form: "Small steamed or well-roasted florets served whole, each cooked until the stem yields fully to firm finger pressure, alongside whatever the family is eating.",
      passFailTest:
        "Press the stem of the largest floret between two fingers — it should give without a fight; roasted pieces should be tender inside, not crisp-chewy.",
      whyThisForm:
        "Molars and a maturing chew let toddlers work through small whole florets, and handling recognizable pieces builds the food familiarity that carries into the picky years.",
      prepSteps: [
        "Steam or roast small florets until fully tender through the stem.",
        "Offer with a dip — plain yogurt or hummus — to keep repeat exposures appealing.",
      ],
      commonMistakes: [
        "Roasting until dark and crispy-chewy for the whole family — char is chew work a toddler will spit out.",
      ],
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["cheese", "pasta", "egg", "olive-oil"],
  tips: [
    "Always squish-test the stem — it is the last part to soften, and a floret that passes at the stem passes everywhere.",
    "Steam past the pretty stage: khaki-green and fully soft beats bright-green and firm every time for a gummy eater.",
    "A drizzle of olive oil after steaming adds calories and helps the fat-soluble vitamins absorb.",
    "Batch-steam a whole head, freeze florets flat on a tray, and rewarm with a brief steam so they soften instead of drying out.",
  ],
  sources: [SOURCES.nhsFrom6Months, SOURCES.wicGuide, SOURCES.cdcFoodsAndDrinks],
  nutrients: ["vitaminC", "folate", "fiber"],
  servingGuidance: [
    {
      band: "6-8m",
      typicalAmount:
        "One or two soft stem-handled florets — gnawed pieces and squeezed fistfuls all count as progress at this stage.",
    },
    {
      band: "9-12m",
      typicalAmount:
        "A tablespoon or two of pinky-nail pieces, scattered a few at a time — refill while interest holds.",
    },
    {
      band: "12-24m",
      typicalAmount:
        "A small handful of tender florets beside the family meal — offer without pressure and let appetite lead.",
    },
  ],
  emoji: "🥦",
};

export default broccoli;
