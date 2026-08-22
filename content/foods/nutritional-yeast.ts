import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const nutritionalYeast: Food = {
  slug: "nutritional-yeast",
  name: "Nutritional yeast",
  aliases: ["nooch", "savory yeast flakes"],
  category: "fat-other",
  minAgeMonths: 6,
  ironRich: false,
  commonAllergen: null,
  chokingRisk: "low",
  nutritionHighlights: [
    "Fortified versions carry B vitamins, including B12 — especially valuable in plant-forward households",
    "Delivers a savory, cheese-like depth with no salt added, plus a little complete protein",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "A small pinch — about a quarter teaspoon of the papery golden flakes — stirred into a serving of vegetable puree or mash until it dissolves completely into the food.",
      passFailTest:
        "Stir and look: no dry flake should remain visible, and the puree should taste faintly savory rather than coated. Flakes still sitting on the surface need more stirring or a splash of liquid.",
      whyThisForm:
        "The flakes soften instantly into moist food, so a dissolved pinch is the way to lend savory depth and B vitamins to bland purees at an age when everything arrives by spoon.",
      prepSteps: [
        "Prepare the vegetable puree or mash as usual, unsalted.",
        "Stir in about ¼ teaspoon of nutritional yeast until it fully dissolves.",
        "Taste it yourself: pleasantly savory is right; anything cheesy-intense means halve the pinch next time.",
      ],
      commonMistakes: [
        "Treating it like a seasoning shaker and coating the food — a pinch flavors, a pile overwhelms.",
        "Sprinkling it dry on top where it sits as a powdery layer instead of dissolving in.",
      ],
      media: [],
    },
    {
      band: "9-12m",
      form: "A quarter to half a teaspoon dusted lightly over sticky finger foods — avocado wedges, roasted sweet potato, scrambled egg — or dissolved into mashed potato and sauces.",
      passFailTest:
        "A dusted piece should show only a thin golden haze that stays put when picked up; visible drifts of dry flakes mean shake less next time.",
      whyThisForm:
        "Finger foods dominate now, and a light dusting clings to moist pieces, adding savory flavor and a bit of grip without any added salt.",
      prepSteps: [
        "Dust a light layer over moist finger foods just before serving.",
        "Keep dissolving it into mashes, bean pots, and pasta sauces as before.",
      ],
      commonMistakes: [
        "Dusting dry, slippery-free foods where the flakes just pool on the tray — it needs a moist surface to cling to.",
      ],
      media: [],
    },
    {
      band: "12-24m",
      form: "Half to one teaspoon stirred into family dishes — pasta, scrambled eggs, mashed potato, popcorn-free snack mixes — wherever a cheesy, savory note is welcome.",
      passFailTest:
        "The dish should taste rounder and more savory without tasting of yeast; if the flavor announces itself, scale the spoonful back.",
      whyThisForm:
        "Toddlers eat from the family pot, and nutritional yeast lets the cook build savory flavor without reaching for the salt — useful for the whole table.",
      prepSteps: [
        "Stir a spoonful into pasta with olive oil, scrambled eggs, or mashed potato at family meals.",
        "Whisk it into white sauces or bean dishes for a cheese-adjacent depth.",
      ],
      commonMistakes: [
        "Using it as a replacement for actual variety — it is a flavor booster and B-vitamin top-up, not a food group.",
      ],
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["potato", "broccoli", "pasta", "egg"],
  tips: [
    "Check the label for the word 'fortified' — the B vitamins, including B12, come from fortification, and unfortified brands skip them.",
    "It is the easiest salt-free route to savory: a pinch does for baby food what a shake of parmesan does for adult food.",
    "Despite the cheesy taste there is no dairy in it — handy for milk-allergic babies who miss out on cheesy flavors.",
    "Store it airtight and dark; the flakes keep for months but fade in flavor once the jar sits open.",
  ],
  sources: [SOURCES.wicGuide, SOURCES.cdcFoodsAndDrinks, SOURCES.nhsFrom6Months],
  nutrients: ["protein", "folate"],
  servingGuidance: [
    {
      band: "6-8m",
      typicalAmount:
        "A pinch — about a quarter teaspoon — dissolved into one dish a day is the right scale.",
      note: "A flavor and vitamin booster for other foods, not a food on its own.",
    },
    {
      band: "9-12m",
      typicalAmount:
        "A quarter to half a teaspoon across the day, dusted or dissolved into food.",
    },
    {
      band: "12-24m",
      typicalAmount:
        "Half to one teaspoon stirred through family dishes — let the toddler's taste be the ceiling.",
    },
  ],
  watchOuts: [
    "Fortification varies widely between brands — read the label rather than assuming the B12 is there.",
    "Fortified flakes are concentrated in B vitamins, so a pinch is the baby-sized dose; there is no benefit to heaping it on.",
  ],
  emoji: "✨",
};

export default nutritionalYeast;
