import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const paneer: Food = {
  slug: "paneer",
  name: "Paneer",
  aliases: ["panir", "Indian fresh cheese"],
  category: "dairy",
  minAgeMonths: 6,
  ironRich: false,
  commonAllergen: "milk",
  chokingRisk: "moderate",
  chokingNotes:
    "Store-bought paneer is dense and springy, and a dry-fried cube can be rubbery enough to travel to the airway in one piece. Mitigate by simmering until it squashes between two fingers and serving strips (not cubes) until chewing matures; skip fried-firm cubes entirely in the first year.",
  nutritionHighlights: [
    "A fresh unripened cheese, so it is naturally much lower in sodium than aged cheeses",
    "Concentrated milk protein and calcium in a form that holds a graspable shape",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "Paneer simmered in unsalted water or a mild sauce until it squashes between two fingers, cut into one strip about the length and width of an adult pinky finger.",
      passFailTest:
        "The squish test: press the strip between thumb and forefinger — it should dent and flatten with gentle pressure; if it springs back like an eraser, simmer it longer.",
      whyThisForm:
        "A palmar-grasp baby clamps the strip in a fist and gnaws the end sticking out, so the piece needs to be long enough to protrude and soft enough that bare gums can mash off what breaks free.",
      prepSteps: [
        "Cut paneer into pinky-width strips about two adult fingers long.",
        "Simmer the strips in unsalted water, milk-free dal, or a mild no-salt tomato sauce for 10–15 minutes until they pass the squish test.",
        "First time: serve early in the day, a small amount, and watch for 2 hours.",
        "Serve alongside familiar foods, never another new food, so any reaction can be traced to the milk.",
      ],
      commonMistakes: [
        "Serving paneer straight from the package — uncooked blocks are far too dense and springy for gums.",
        "Pan-frying until golden; the crust turns the outside tough exactly when it needs to be softest.",
        "Cutting cubes instead of strips — a fist swallows a cube whole, but a strip leaves a gnawable handle.",
      ],
      cutDiagram: "strips",
      media: [],
    },
    {
      band: "9-12m",
      form: "Soft-simmered paneer diced into pieces about the size of a pinky fingernail, each one still soft enough to flatten between two fingers.",
      passFailTest:
        "Sample a piece from the batch and press it between two fingers — it should flatten without bouncing back; springy pieces return to the simmer.",
      whyThisForm:
        "The pincer grasp is arriving, and small irregular pieces of simmered paneer are ideal picking-up practice while staying soft enough to mash without molars.",
      prepSteps: [
        "Simmer as for 6–8 months, then dice the softened strips into pinky-nail pieces.",
        "Fold the pieces into rice, dal, or soft vegetables so some grip comes from the sauce.",
        "Scatter a few pieces at a time to discourage cheek-stuffing.",
      ],
      commonMistakes: [
        "Skipping the simmer because the pieces are small — small and rubbery is still rubbery.",
        "Seasoning the family curry with salt and chili before the baby's portion comes out.",
      ],
      media: [],
    },
    {
      band: "12-24m",
      form: "Bite-size cubes of well-simmered paneer served in mild, lightly salted family dishes like palak paneer, matar paneer, or paneer with soft rice.",
      passFailTest:
        "Cubes should still yield visibly to a firm fingertip press — restaurant-firm fried paneer that resists pressure isn't toddler-ready yet.",
      whyThisForm:
        "New molars handle soft cubes in sauce well, and folding paneer into family curries builds the toddler's place at the shared table — the remaining job is keeping salt and heat mild.",
      prepSteps: [
        "Take the toddler's portion out of the family pot before heavy salting and hot spicing.",
        "Keep cubes simmer-soft; save crisp-fried paneer for the adults.",
      ],
      commonMistakes: [
        "Serving takeout paneer dishes as-is — restaurant versions are typically both saltier and firmer than toddler-ready.",
      ],
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["spinach", "peas", "rice", "tomato"],
  tips: [
    "Paneer is fine as a food from around 6 months, but cow's milk as a drink waits until 12 months.",
    "The simmer is the whole trick: 10–15 minutes in any unsalted liquid turns a squeaky block into a squashable one.",
    "Homemade paneer from whole milk and lemon juice comes out softer than store blocks and contains exactly two ingredients.",
    "A quick soak in hot water softens store paneer even without a stove — cover cubes with just-boiled water for 10 minutes.",
    "Simmer a batch of strips, freeze flat, and drop them straight into dal or sauce to rewarm.",
  ],
  sources: [SOURCES.eatStudy, SOURCES.nhsFrom6Months, SOURCES.aapChoking],
  nutrients: ["protein", "calcium"],
  servingGuidance: [
    {
      band: "6-8m",
      typicalAmount:
        "One soft-simmered strip at a time — gnawing counts as eating even when little visibly disappears.",
      frequency: "Once tolerated, fine as a regular food — steady exposure helps maintain dairy tolerance.",
    },
    {
      band: "9-12m",
      typicalAmount:
        "A tablespoon or two of pinky-nail pieces folded into rice or dal — refill while the reaching continues.",
    },
    {
      band: "12-24m",
      typicalAmount:
        "A few soft cubes in the toddler's portion of the family curry — an opening offer, not a quota.",
    },
  ],
  watchOuts: [
    "Restaurant and takeout paneer dishes usually arrive salty, spicy-hot, and fried firm — the home version is the baby version.",
  ],
  emoji: "🧀",
};

export default paneer;
