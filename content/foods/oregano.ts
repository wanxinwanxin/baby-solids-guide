import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const oregano: Food = {
  slug: "oregano",
  name: "Oregano",
  aliases: ["dried oregano"],
  category: "herb-spice",
  minAgeMonths: 6,
  ironRich: false,
  commonAllergen: null,
  chokingRisk: "low",
  nutritionHighlights: [
    "The real value is flavor variety, not nutrition — a pinch is a taste lesson, not a nutrient source",
    "As a concentrated dried herb it contributes at most a trace of fiber",
    "Its piney, savory note is the signature of tomato sauces the whole family already eats",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "A small pinch of dried oregano crumbled finely between your fingers and stirred through a familiar tomato sauce, vegetable puree, or mash until evenly speckled with no clumps.",
      passFailTest:
        "Taste a spoonful yourself: a gentle savory-herbal note with no whole stiff leaves, no gritty stem bits, and no single bite that tastes like the whole jar.",
      whyThisForm:
        "Herbs are how a baby meets flavor variety without salt or sugar, and crumbling releases oregano's oils while breaking up leaf pieces that could otherwise sit papery on a small tongue.",
      prepSteps: [
        "Crumble roughly 1/8 teaspoon of dried oregano to a coarse powder between your fingertips.",
        "Stir it through tomato sauce, mashed zucchini, or another familiar puree until the specks are even.",
        "Warm the food briefly if you can — heat mellows the herb into the sauce.",
      ],
      commonMistakes: [
        "Skipping the crumble and leaving stiff whole leaves and stemmy bits in a smooth puree.",
        "Using an 'Italian seasoning' blend without checking it for added salt.",
        "Expecting instant enthusiasm — savory herbal flavors often take many relaxed tries.",
      ],
      media: [],
    },
    {
      band: "9-12m",
      form: "A crumbled pinch stirred into the tomato sauce coating soft pasta pieces, or scattered over roasted vegetable sticks before cooking so it toasts into the food.",
      passFailTest:
        "Pick up a coated piece and rub it between two fingers: the herb should cling in the sauce or oil, leaving no loose dry flakes to brush off.",
      whyThisForm:
        "Seasoning the finger foods themselves — saucy pasta, roasted vegetables — teaches a self-feeding baby that real family flavors live in the food, not in a salt shaker.",
      prepSteps: [
        "Simmer a crumbled pinch into the no-salt tomato sauce that dresses the baby's pasta.",
        "Or toss vegetable sticks in a little olive oil and crumbled oregano before roasting until soft.",
        "Season the adults' plates separately at the table.",
      ],
      commonMistakes: [
        "Dusting dry oregano over finished food, where it sits as loose flakes instead of melting into the sauce.",
      ],
      media: [],
    },
    {
      band: "12-24m",
      form: "Oregano cooked straight into the family pot of tomato sauce, soup, or traybake, with the toddler's portion — chopped or mashed as needed — served before any salt goes in.",
      passFailTest:
        "Taste the toddler's serving: fully seasoned with herbs yet unsalted. If it tastes finished-for-adults, the portion came out after the salt.",
      whyThisForm:
        "By toddlerhood one shared pot is the aim — oregano-rich sauces carry so much flavor that withholding only the salt still leaves genuinely delicious family food.",
      prepSteps: [
        "Cook oregano into the sauce or stew exactly as the family recipe directs.",
        "Scoop the toddler's portion out before salting and before any chili flakes for the adults.",
      ],
      commonMistakes: [
        "Treating toddler pasta as a plain-noodles-only zone — the herbs were never the problem, the salt was.",
      ],
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["tomato", "pasta", "zucchini", "chicken"],
  tips: [
    "Crumbling dried oregano between your fingertips right over the pot releases far more aroma than shaking it straight from the jar.",
    "Oregano and tomato is the lowest-risk first pairing — the baby has likely already accepted tomato, so only one variable changes.",
    "Dried beats fresh here for babies: fresh oregano leaves are surprisingly tough and peppery, while crumbled dried herb disperses evenly.",
    "Check 'Italian seasoning' blends for salt before using them on the baby's portion — many are fine, some are not.",
  ],
  sources: [SOURCES.nhsFrom6Months, SOURCES.cdcFoodsAndDrinks, SOURCES.wicGuide],
  nutrients: ["fiber"],
  servingGuidance: [
    {
      band: "6-8m",
      typicalAmount:
        "A small crumbled pinch — about 1/8 teaspoon — stirred through one serving; flavor exposure is the whole goal.",
    },
    {
      band: "9-12m",
      typicalAmount:
        "A pinch simmered into the sauce or oil coating the meal's finger foods.",
    },
    {
      band: "12-24m",
      typicalAmount:
        "Whatever a normally herbed, unsalted family portion carries — a pinch per pot goes a long way, and repetition matters more than measuring.",
    },
  ],
  watchOuts: [
    "Herb blends and 'seasoned' mixes often hide salt — plain single-jar oregano is the safe default.",
  ],
  emoji: "🌿",
};

export default oregano;
