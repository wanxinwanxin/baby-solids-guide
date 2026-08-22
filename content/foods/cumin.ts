import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const cumin: Food = {
  slug: "cumin",
  name: "Cumin",
  aliases: ["ground cumin"],
  category: "herb-spice",
  minAgeMonths: 6,
  ironRich: false,
  commonAllergen: null,
  chokingRisk: "low",
  nutritionHighlights: [
    "The real value here is flavor variety, not nutrition — a pinch delivers taste, not meaningful nutrients",
    "Like all dried spices it is concentrated plant matter, contributing at most a trace of fiber",
    "Earthy warmth that makes beans and rice taste like family food instead of baby food",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "A small pinch of ground cumin stirred evenly through a familiar puree, mash, or porridge until no clumps, streaks, or dry pockets of spice remain anywhere.",
      passFailTest:
        "Taste a spoonful yourself: the cumin should read as a warm background note with no gritty specks or bitter concentrated pockets anywhere in the bowl.",
      whyThisForm:
        "Seasoning is the whole point — spices deliver flavor variety without the salt and sugar babies must avoid, and meeting bold tastes early builds a palate that later welcomes the family table.",
      prepSteps: [
        "Start with about 1/8 teaspoon of ground cumin per baby-sized serving.",
        "Stir it through a familiar food — mashed sweet potato, black bean puree, or oatmeal — until evenly colored throughout.",
        "Taste it yourself before serving, and hold the amount steady for several meals before nudging it up.",
      ],
      commonMistakes: [
        "Reaching for a taco or curry seasoning blend — most lead with salt the baby doesn't need.",
        "Doubling the dose after one enthusiastic meal; build the amount over weeks, not days.",
        "Reading a scrunched-up face as rejection — new flavors routinely take many relaxed tries to land.",
      ],
      media: [],
    },
    {
      band: "9-12m",
      form: "A slightly more generous pinch stirred through mashed or soft finger foods, or dusted thinly over vegetable sticks and rinsed beans before they are roasted or warmed.",
      passFailTest:
        "Rub a piece of the seasoned food between two fingers: the color should be even and you should feel no gritty layer of raw, dry spice sitting on the surface.",
      whyThisForm:
        "The finger-food months are the moment to season the foods themselves, so the baby learns that beans, vegetables, and grains — not just purees — carry interesting flavors.",
      prepSteps: [
        "Toss soft-cooked vegetable sticks or rinsed beans with about 1/4 teaspoon of cumin per family-sized portion.",
        "Warm or roast briefly so the spice blooms and clings instead of sitting as dry powder.",
        "Keep the baby's share salt-free; adults season their own plates at the table.",
      ],
      commonMistakes: [
        "Sprinkling dry powder straight onto finished food, where it sits in dusty, bitter patches.",
      ],
      media: [],
    },
    {
      band: "12-24m",
      form: "Cumin cooked straight into the family pot of beans, rice, or stew, with the toddler's portion — mashed or chopped as needed — scooped out before any salt goes in.",
      passFailTest:
        "Taste the toddler's scooped-out portion: it should be flavorful but unsalted. If it already tastes seasoned-for-adults salty, it was scooped too late.",
      whyThisForm:
        "By toddlerhood the goal is one shared pot: full family flavor with the salt held back, so the child eats what everyone eats and the spice does the heavy lifting.",
      prepSteps: [
        "Bloom cumin in oil at the start of the family bean, rice, or stew recipe as usual.",
        "Scoop the toddler's portion out before salting, then finish seasoning the adults' pot.",
      ],
      commonMistakes: [
        "Assuming toddler food must be bland — it's the salt that has to wait, never the flavor.",
      ],
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["black-beans", "rice", "lentils", "sweet-potato"],
  tips: [
    "Toast ground cumin for thirty seconds in a dry pan or a film of oil before mixing it in — blooming turns dusty-bitter into warm and nutty.",
    "Cumin plus mashed beans is the classic pairing: one pinch turns plain black beans into something the whole family recognizes as dinner.",
    "Buy small jars — ground cumin fades within months, and a stale pinch teaches the baby nothing worth learning.",
    "If a blend is all you have, read the label: 'salt' anywhere in the first few ingredients disqualifies it for the baby's portion.",
  ],
  sources: [SOURCES.nhsFrom6Months, SOURCES.cdcFoodsAndDrinks, SOURCES.wicGuide],
  nutrients: ["fiber"],
  servingGuidance: [
    {
      band: "6-8m",
      typicalAmount:
        "A small pinch — about 1/8 teaspoon — stirred through one serving; the taste exposure is the point, so any amount eaten counts.",
    },
    {
      band: "9-12m",
      typicalAmount:
        "A pinch or two spread across the meal's dishes; repeated exposure matters far more than quantity.",
    },
    {
      band: "12-24m",
      typicalAmount:
        "Whatever a normally spiced, unsalted family portion carries — no pinch-counting needed by now.",
    },
  ],
  watchOuts: [
    "Skip spice blends aimed at adults — taco, chili, and 'seasoning' mixes usually lead with salt.",
  ],
  emoji: "🟤",
};

export default cumin;
