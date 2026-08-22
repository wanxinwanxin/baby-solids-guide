import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const flaxseed: Food = {
  slug: "flaxseed",
  name: "Ground flaxseed",
  aliases: ["flaxseed meal", "ground flax", "linseed"],
  category: "protein",
  minAgeMonths: 6,
  ironRich: false,
  commonAllergen: null,
  chokingRisk: "low",
  nutritionHighlights: [
    "One of the richest plant sources of the omega-3 fat ALA, which supports brain development",
    "Gentle soluble fiber that helps keep a baby's digestion regular",
    "Adds healthy fats and a little plant protein to soft foods with zero prep",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "A quarter to half a teaspoon of flaxseed ground to a soft, flour-like meal, stirred completely into a serving of oatmeal, yogurt, or fruit puree until it disappears.",
      passFailTest:
        "Rub a pinch between your fingertips: it should feel like soft, slightly oily flour with no whole seed in it. Whole shiny seeds mean it needs grinding, not serving.",
      whyThisForm:
        "Whole flaxseeds slide through a baby undigested, taking their omega-3s with them — only the ground meal releases the nutrition, and a small stirred-in dose suits a gut new to fiber.",
      prepSteps: [
        "Buy flaxseed already ground (often sold as flaxseed meal) or pulse whole seeds in a spice grinder until flour-fine.",
        "Stir ¼–½ teaspoon fully into oatmeal, yogurt, or a familiar puree.",
        "Hold at this small dose for a week or two before increasing.",
      ],
      commonMistakes: [
        "Sprinkling whole flaxseeds onto food — they pass straight through, delivering nothing.",
        "Starting with a full teaspoon or more — flax fiber is concentrated, and a small gut needs a gentle ramp.",
        "Dusting the dry meal on top instead of stirring it in, where it sits as a powdery layer.",
      ],
      media: [],
    },
    {
      band: "9-12m",
      form: "Half to one teaspoon of ground flaxseed blended through thicker foods — porridge, mashed banana, yogurt — or baked into soft pancakes and muffins for finger feeding.",
      passFailTest:
        "The finished food should look and feel the same as it did without flax — no visible seeds, no gritty layer, just a faintly nutty smell.",
      whyThisForm:
        "As finger foods take over, baking the meal into soft pancakes or muffins keeps flax in the rotation without depending on spoon-fed dishes.",
      prepSteps: [
        "Whisk ½–1 teaspoon into porridge or yogurt, or add a spoonful per batch to pancake and muffin batter.",
        "Keep the ground meal sealed in the fridge between uses.",
      ],
      commonMistakes: [
        "Adding flax to every dish of the day at once — one appearance a day is plenty at this age.",
      ],
      media: [],
    },
    {
      band: "12-24m",
      form: "One to two teaspoons of ground flaxseed a day worked into family food — porridge, smoothies, meatball or pancake mixtures — always the ground meal, never whole seeds.",
      passFailTest:
        "Still no whole seeds anywhere: whatever the dish, a fingertip rub of the flax going in should feel like soft flour.",
      whyThisForm:
        "Toddlers eat family meals, and ground flax folds invisibly into most of them — the whole-seed rule stays because unground flax remains undigestible at any age.",
      prepSteps: [
        "Stir a teaspoon into breakfast porridge or a fruit smoothie.",
        "Add a spoonful to meatballs, veggie fritters, or baking as a routine mix-in.",
      ],
      commonMistakes: [
        "Switching to whole seeds for crunch — they are not unsafe, just useless, sliding through undigested.",
      ],
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["oatmeal", "banana", "yogurt", "apple"],
  tips: [
    "Ground is the whole game: whole flaxseeds pass through undigested, so buy flaxseed meal or grind your own in a spice grinder.",
    "Flax oils go rancid quickly at room temperature — store the ground meal in the fridge or freezer and sniff before using; rancid flax smells like old paint.",
    "Start small and climb slowly: ¼ teaspoon stirred in daily does more good than a tablespoon that upsets a small stomach.",
    "Golden and brown flaxseed are nutritionally equivalent — buy whichever is cheaper.",
  ],
  sources: [SOURCES.wicGuide, SOURCES.nhsFrom6Months, SOURCES.cdcFoodsAndDrinks],
  nutrients: ["omega3", "healthyFats", "fiber", "protein"],
  servingGuidance: [
    {
      band: "6-8m",
      typicalAmount:
        "A quarter to half a teaspoon stirred into one soft food a day — a background booster, not a dish of its own.",
    },
    {
      band: "9-12m",
      typicalAmount:
        "Half to one teaspoon a day, stirred in or baked into soft finger foods.",
    },
    {
      band: "12-24m",
      typicalAmount:
        "One to two teaspoons worked into family dishes across the day.",
    },
  ],
  watchOuts: [
    "Flax fiber is concentrated — ramping up too fast can mean gas or loose stools, so build the dose gradually.",
    "Skip flaxseed oil supplements for babies — the food-dose of ground meal in meals is the right vehicle.",
  ],
  emoji: "🌾",
};

export default flaxseed;
