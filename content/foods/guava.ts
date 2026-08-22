import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const guava: Food = {
  slug: "guava",
  name: "Guava",
  aliases: ["guayaba"],
  category: "fruit",
  minAgeMonths: 6,
  ironRich: false,
  commonAllergen: null,
  chokingRisk: "moderate",
  chokingNotes:
    "The hazard is twofold: the central seed bed is packed with genuinely hard little seeds, and underripe guava flesh is firm and slippery-crisp like unripe pear. Mitigate by serving only fully ripe fruit that dents under a fingertip and scooping the entire seed core out before cutting; the seeds stay out through the early bands, and firm fruit is never worth the shortcut.",
  nutritionHighlights: [
    "One of the most vitamin-C-dense fruits there is — far more per bite than citrus — which supercharges iron absorption from plant foods",
    "A strong source of fiber for healthy digestion",
    "Fragrant natural sweetness that needs nothing added",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "A fully ripe guava cut into wedges about the length and width of two adult fingers, the hard-seeded core scooped out completely, with the remaining flesh denting under a fingertip.",
      passFailTest:
        "Press the outer flesh — it should dent like a ripe pear and yield when pinched — and run a fingertip along the cut face: no gritty hard seed should remain anywhere on the wedge.",
      whyThisForm:
        "A palmar-grasp baby pins the wedge in a fist and gnaws the exposed end, so the flesh must be ripe-soft for bare gums and the rock-hard seeds must already be gone.",
      prepSteps: [
        "Wash the guava well — the thin skin is edible and helps grip — and slice it into quarters.",
        "Scoop the entire seedy center out of each quarter with a spoon, chasing any strays at the edges.",
        "Cut the seed-free quarters into two-adult-finger wedges and fingertip-test the flesh.",
        "Serve one wedge at a time on the tray.",
      ],
      commonMistakes: [
        "Leaving 'just a few' seeds in — guava seeds are hard enough to resist an adult's molars, let alone bare gums.",
        "Serving crisp underripe fruit because the color looked right — ripeness is a squeeze test, not a color test.",
        "Peeling away the skin that was providing the only non-slip grip on the wedge.",
      ],
      cutDiagram: "wedge-handle",
      media: [],
    },
    {
      band: "9-12m",
      form: "Seed-free ripe guava chopped into soft pieces about the size of your pinky fingernail, each one squashing flat between two fingers without effort.",
      passFailTest:
        "Squeeze a piece between thumb and forefinger — it should flatten easily — and a fingertip dragged through the pile should meet zero gritty seeds.",
      whyThisForm:
        "Small soft pieces suit the new pincer grasp, and with the seed core scooped in the kitchen the baby gets guava's fragrance without its hardest parts.",
      prepSteps: [
        "Quarter, scoop the seed bed thoroughly, and dice the ripe flesh into pinky-nail pieces.",
        "Offer a few pieces at a time, skin-on for grip or skin-off as preferred.",
      ],
      commonMistakes: [
        "Rushing the scoop — stray seeds hide right at the boundary between core and flesh, so take one extra pass.",
      ],
      cutDiagram: "bite-size",
      media: [],
    },
    {
      band: "12-24m",
      form: "Ripe guava wedges or thin slices with the core still scooped out for most toddlers, or the soft seedy center pressed through a sieve into yogurt or oatmeal.",
      passFailTest:
        "Flesh still dents under a fingertip, and anything served from the core has been sieved — nothing gritty should survive a pinch between your fingers.",
      whyThisForm:
        "Toddlers handle wedges and bites of ripe guava well, but the seeds remain hard enough that scooping — or sieving the core into a smooth puree — stays the sensible default.",
      prepSteps: [
        "Serve seed-free wedges or slices alongside family meals.",
        "To waste nothing, press the scooped core through a sieve and stir the seedless puree into yogurt.",
      ],
      commonMistakes: [
        "Handing over a whole guava to bite like an apple — the hidden seed bed makes that an older-kid privilege.",
      ],
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["yogurt", "oatmeal", "banana"],
  tips: [
    "A ripe guava announces itself: the whole kitchen smells perfumed, and the fruit gives under gentle thumb pressure — hard, scentless fruit needs more counter time.",
    "Scoop the core with a serrated grapefruit spoon if you have one; the seeds sit in soft pulp that releases in one twist.",
    "The scooped core isn't waste — sieve it into a smooth, seedless puree that sweetens plain yogurt beautifully.",
    "Varieties range from white to deep pink inside; all serve the same way once ripe, so buy whatever is soft and fragrant.",
  ],
  sources: [SOURCES.wicGuide, SOURCES.nhsFrom6Months, SOURCES.aapChoking],
  nutrients: ["vitaminC", "fiber"],
  servingGuidance: [
    {
      band: "6-8m",
      typicalAmount:
        "One seed-free wedge at a time, a piece or two per meal — gnawing and smearing count as engagement.",
    },
    {
      band: "9-12m",
      typicalAmount:
        "A small handful of pinky-nail pieces, offered a few at a time and refilled on demand.",
    },
    {
      band: "12-24m",
      typicalAmount:
        "A few wedges or slices — about half a small guava — alongside the family meal.",
    },
  ],
  watchOuts: [
    "Guava is high in fiber, and a big serving can firm up or loosen stools depending on the baby — let diapers calibrate the portion.",
  ],
  emoji: "🍏",
};

export default guava;
