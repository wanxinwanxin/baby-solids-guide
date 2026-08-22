import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const turmeric: Food = {
  slug: "turmeric",
  name: "Turmeric",
  aliases: ["ground turmeric"],
  category: "herb-spice",
  minAgeMonths: 6,
  ironRich: false,
  commonAllergen: null,
  chokingRisk: "low",
  nutritionHighlights: [
    "The real value is flavor variety, not nutrition — an earthy, golden seasoning that asks for no salt or sugar",
    "As a concentrated ground root it contributes a trace of fiber at the pinch-sized culinary amounts babies get",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "A small pinch of ground turmeric stirred through a smooth lentil puree, rice porridge, or vegetable mash until the golden color is perfectly even with no dry pockets.",
      passFailTest:
        "Look, then taste: the color should be uniform gold with no orange streaks, and your spoonful should carry a mild earthiness with nothing bitter or dusty.",
      whyThisForm:
        "Babies can enjoy real seasoning from the start — flavor variety without salt or sugar is the point, and turmeric folded into lentils or rice plants the flavors half the world cooks with.",
      prepSteps: [
        "Start with about 1/8 teaspoon per serving of lentil, rice, or vegetable mash.",
        "Stir until the color is even — streaks mean pockets of unmixed powder.",
        "Add a small drizzle of olive oil to the dish; turmeric's flavor carries better with a little fat.",
      ],
      commonMistakes: [
        "Dusting it dry over the top instead of stirring through — dry turmeric tastes bitter and chalky.",
        "Using so much the dish turns medicinal — a pinch colors and flavors an entire bowl.",
      ],
      media: [],
    },
    {
      band: "9-12m",
      form: "A pinch of turmeric cooked into lentils, rice, scrambled dishes, or mashed vegetables with a little olive oil, mixed until the dish is evenly golden throughout.",
      passFailTest:
        "The even-gold check plus your own taste: mild, warm, earthy — if it tastes like medicine to you, cut the next batch in half.",
      whyThisForm:
        "Cooking the spice into soft foods keeps flavor education moving while finger-food skills develop — and turmeric's classic partners, lentils and rice, are already on the tray.",
      prepSteps: [
        "Add the pinch early in cooking so the raw edge mellows into the dish.",
        "Fold turmeric-golden rice or lentils into the week's rotation a couple of times.",
      ],
      commonMistakes: [
        "Adding turmeric at the very end of cooking, which leaves a raw, bitter note babies notice.",
      ],
      media: [],
    },
    {
      band: "12-24m",
      form: "Turmeric cooked into family dishes such as dal, golden rice, or thin vegetable stews, added early in the cooking so the earthy flavor mellows and disperses evenly.",
      passFailTest:
        "The shared-pot test: a dish that tastes balanced and gently earthy to you is exactly right for the toddler eating alongside you.",
      whyThisForm:
        "Toddlers join the family table for real, and a child raised on golden dal and seasoned rice meets the world's everyday food without a fight.",
      prepSteps: [
        "Season family pots as usual — dal, rice, roasted cauliflower — keeping chili heat separate and optional.",
        "Serve the toddler from the family dish before any chili or salt is added at the table.",
      ],
      commonMistakes: [
        "Assuming turmeric equals spicy-hot — it carries no chili heat, so there is no reason to leave it out of the toddler's portion.",
      ],
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["lentils", "rice", "cauliflower", "chicken"],
  tips: [
    "Turmeric plus a little fat is the rule — a drizzle of olive oil helps both flavor and color spread through the dish.",
    "Add it early in cooking, not at the end, so the raw bitter edge cooks off.",
    "Mix your own gentle 'starter curry' — turmeric with a pinch of cumin — before graduating to store blends, which often hide salt or chili.",
    "Accept the yellow fingers and countertop as part of the deal, and wipe spills before they set.",
  ],
  sources: [SOURCES.nhsFrom6Months, SOURCES.cdcFoodsAndDrinks, SOURCES.wicGuide],
  nutrients: ["fiber"],
  servingGuidance: [
    {
      band: "6-8m",
      typicalAmount:
        "A small pinch (about 1/8 teaspoon) stirred into one serving — the color and flavor are the point.",
    },
    {
      band: "9-12m",
      typicalAmount:
        "A pinch cooked into a dish, a few meals a week as part of normal rotation.",
    },
    {
      band: "12-24m",
      typicalAmount:
        "Season the family pot to your own taste — a pinch or two — and share it straight to the toddler's plate.",
    },
  ],
  watchOuts: [
    "Turmeric stains bibs, trays, sponges, and light countertops a permanent yellow — dress the baby in dark colors on dal days and wipe spills fast; the babies themselves wash clean.",
  ],
  emoji: "🟡",
};

export default turmeric;
