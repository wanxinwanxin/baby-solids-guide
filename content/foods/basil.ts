import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const basil: Food = {
  slug: "basil",
  name: "Basil",
  aliases: ["fresh basil", "sweet basil"],
  category: "herb-spice",
  minAgeMonths: 6,
  ironRich: false,
  commonAllergen: null,
  chokingRisk: "low",
  nutritionHighlights: [
    "The real value is flavor variety, not nutrition — a sweet, peppery-green herb that seasons food without any salt or sugar",
    "Like all leafy herbs it contributes a trace of plant fiber at the pinch-sized amounts a baby eats",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "A small pinch of fresh basil sliced into fine ribbons and stirred through a smooth tomato sauce, vegetable puree, or mash until the green is evenly distributed.",
      passFailTest:
        "Run a spoon through the bowl: no basil piece bigger than a grain of rice, and your own taste of the food should carry a gentle sweet-herb note, not a leafy mouthful.",
      whyThisForm:
        "Flavor variety without salt or sugar is the whole point — basil folded into a familiar tomato or vegetable base introduces one of the world's great flavors while the palate is still wide open.",
      prepSteps: [
        "Start with about 1/8 teaspoon of finely sliced basil per serving.",
        "Stack a couple of leaves, roll them into a cigar, and slice into fine ribbons, then chop the ribbons short.",
        "Stir into the warm (not boiling) food just before serving and check for even distribution.",
      ],
      commonMistakes: [
        "Leaving whole or half leaves in the food — a wet leaf can plaster itself flat across a small tongue.",
        "Simmering basil for a long time, which turns it dark and bitter.",
      ],
      media: [],
    },
    {
      band: "9-12m",
      form: "Basil chiffonade — leaves stacked, rolled, and sliced into thin ribbons, then chopped short — folded through pasta, mashed vegetables, or soft cooked dishes just before serving.",
      passFailTest:
        "The rice-grain check: nothing green longer than a grain of rice in the dish, and the flavor should read as a fresh accent when you taste it.",
      whyThisForm:
        "As pasta and soft finger foods arrive, basil rides along on foods the baby already handles — flavor education stacked on top of pincer-grasp practice.",
      prepSteps: [
        "Fold chopped basil ribbons through tomato-sauced pasta or zucchini just off the heat.",
        "Stir a pinch into ricotta or mashed white beans as a spread for soft bread strips.",
      ],
      commonMistakes: [
        "Adding basil during a long simmer instead of at the end — the perfume is the point, and heat erases it.",
      ],
      media: [],
    },
    {
      band: "12-24m",
      form: "Basil sliced into thin ribbons and stirred into family pasta, tomato dishes, or soups off the heat, so the flavor stays bright and the leaves stay soft.",
      passFailTest:
        "The shared-pot test: a fresh, fragrant accent to your own taste, with all pieces still confetti-small on the toddler's portion.",
      whyThisForm:
        "Toddlers now share the family menu, and visible green ribbons on everyday pasta normalize herbs before the picky years can veto them.",
      prepSteps: [
        "Finish the family's pasta or tomato dishes with basil at the table.",
        "Let the toddler smell and tear a leaf during cooking — playing with the herb builds acceptance of the flavor.",
      ],
      commonMistakes: [
        "Reserving basil for adult plates only, which teaches that green flecks are foreign to kid food.",
      ],
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["tomato", "pasta", "zucchini", "cheese"],
  tips: [
    "Chiffonade in seconds: stack the leaves, roll them into a tight cigar, slice thin ribbons, then cross-chop the ribbons short.",
    "Always add basil off the heat at the end — long cooking turns it black and bitter.",
    "Tear or slice with a sharp knife just before serving; bruised basil browns and loses its perfume within minutes.",
    "A pot of basil on the windowsill outlives any bought bunch and gives a leaf-at-a-time supply for single servings.",
  ],
  sources: [SOURCES.nhsFrom6Months, SOURCES.cdcFoodsAndDrinks, SOURCES.wicGuide],
  nutrients: ["fiber"],
  servingGuidance: [
    {
      band: "6-8m",
      typicalAmount:
        "A small pinch (about 1/8 teaspoon) of fine ribbons stirred into one serving — the aroma is the serving.",
    },
    {
      band: "9-12m",
      typicalAmount:
        "A pinch folded through pasta or vegetables at a meal or two a day.",
    },
    {
      band: "12-24m",
      typicalAmount:
        "Finish family dishes normally — a pinch of ribbons per portion — and serve the toddler the same plate.",
    },
  ],
  emoji: "🍃",
};

export default basil;
