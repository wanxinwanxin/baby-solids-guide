import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const teff: Food = {
  slug: "teff",
  name: "Teff",
  aliases: ["injera"],
  category: "grain",
  minAgeMonths: 6,
  ironRich: true,
  commonAllergen: null,
  chokingRisk: "low",
  nutritionHighlights: [
    "One of the most iron-dense grains in the pantry — a standout for a baby's high iron needs",
    "Unusually calcium-rich for a grain",
    "Naturally gluten-free, even though it lives its best life as flatbread",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "Teff whisked into cold water and simmered into a smooth, spoonable porridge about the thickness of yogurt, thinned with milk or water if it stiffens.",
      passFailTest:
        "Tip a loaded baby spoon slowly sideways: the porridge should cling for a beat and slide off in one soft mound, never pour thin or sit in a stiff clod.",
      whyThisForm:
        "The tiny teff grain cooks down to a naturally smooth porridge — exactly the safe, tongue-manageable texture a 6-month-old needs — and it clings to a preloaded spoon a palmar grasp can hold.",
      prepSteps: [
        "Whisk 2–3 tablespoons of teff (whole grain or flour) into cold unsalted water before heating — cold-start prevents lumps.",
        "Simmer 15–20 minutes, stirring often, until thick, glossy, and smooth.",
        "Thin to yogurt thickness with breastmilk, formula, or water and cool to warm before serving.",
      ],
      commonMistakes: [
        "Adding teff to boiling water, which seizes it into instant lumps.",
        "Walking away from the pot — the fine grain settles and scorches quickly without stirring.",
      ],
      cutDiagram: "mash",
      media: [],
    },
    {
      band: "9-12m",
      form: "Soft injera-style teff flatbread torn into pieces about the size of your pinky fingernail, or thick teff porridge with soft lumps on a spoon.",
      passFailTest:
        "A flatbread piece should fold and squash between two fingers like a damp sponge — anything dry or leathery goes back for steaming under a lid.",
      whyThisForm:
        "The emerging pincer grasp loves injera's spongy, slightly tacky surface — small torn pieces are easy wins, and the fermented flatbread is soft enough to gum flat.",
      prepSteps: [
        "Cook a thin teff-batter pancake in an unoiled nonstick pan, covered, until the top is set and spongy — no flipping needed.",
        "Tear into pinky-nail pieces once cool, or serve thick porridge with soft lumps by spoon.",
        "Offer a few pieces at a time to keep the pace calm.",
      ],
      commonMistakes: [
        "Serving store injera without checking the label — many are teff-wheat blends and saltier than homemade.",
      ],
      cutDiagram: "bite-size",
      media: [],
    },
    {
      band: "12-24m",
      form: "Strips of soft injera about one adult finger wide for scooping mild stews, alongside teff porridge bowls eaten with a toddler spoon.",
      passFailTest:
        "A strip should drape limply over your finger and tear with no effort; porridge should cling briefly to a tilted toddler spoon.",
      whyThisForm:
        "Toddlers can now tear soft flatbread with molars and love the scoop-your-own ritual — finger-wide strips keep each mouthful a manageable size.",
      prepSteps: [
        "Cut injera into finger-wide strips and serve beside a mild, low-salt lentil or vegetable stew for dipping.",
        "Keep porridge in the rotation as an easy spoon-practice breakfast.",
      ],
      commonMistakes: [
        "Handing over a large floppy sheet of injera — big pieces invite tearing off more than a mouth can manage.",
      ],
      cutDiagram: "strips",
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["lentils", "beef", "yogurt", "banana"],
  tips: [
    "Cold-start is the whole trick: whisk teff into cold water, then bring it up to a simmer for a lump-free porridge every time.",
    "Teff porridge thickens hard as it stands — re-thin leftovers with milk or water and re-whisk before every serve.",
    "A quick baby injera needs no fermentation: teff flour, water, a covered nonstick pan, and two minutes.",
    "Cook in unsalted water; the family can season their share at the table.",
  ],
  sources: [SOURCES.wicGuide, SOURCES.nhsFrom6Months],
  nutrients: ["iron", "calcium", "fiber"],
  servingGuidance: [
    {
      band: "6-8m",
      typicalAmount:
        "A tablespoon or two of porridge from preloaded spoons — interest, not the bowl, decides when the meal ends.",
    },
    {
      band: "9-12m",
      typicalAmount:
        "A few pinky-nail flatbread pieces at a time, or a couple of tablespoons of lumpy porridge.",
    },
    {
      band: "12-24m",
      typicalAmount:
        "One or two injera strips with a scoopable stew, or a quarter to half cup of porridge — appetite leads.",
    },
  ],
  watchOuts: [
    "Store-bought injera is often a teff-wheat blend and varies in sodium — read the label, especially if you're tracking wheat exposures separately.",
  ],
  emoji: "🥞",
};

export default teff;
