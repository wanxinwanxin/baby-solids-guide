import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const kefir: Food = {
  slug: "kefir",
  name: "Kefir",
  aliases: ["milk kefir", "drinkable yogurt"],
  category: "dairy",
  minAgeMonths: 6,
  ironRich: false,
  commonAllergen: "milk",
  chokingRisk: "low",
  nutritionHighlights: [
    "Calcium and protein from whole milk, packaged in a tangy fermented form",
    "Fermentation breaks down much of the lactose, so many babies digest it comfortably",
    "One of the most culture-dense dairy foods — a wider range of live cultures than yogurt",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "Plain, unsweetened whole-milk kefir stirred into oatmeal or a familiar thick puree so it rides a preloaded spoon, or offered as tiny helped sips from a small open cup.",
      passFailTest:
        "Read the label first — it should say milk and live cultures with zero grams of added sugar — then check the bowl: the mixture should mound on a spoon, not run off like milk.",
      whyThisForm:
        "Kefir pours like a thin drink, which a palmar-grasp baby can't manage alone; folding it into something thick keeps the milk-protein exposure on the spoon, while tiny helped open-cup sips build drinking skills without displacing formula or breast milk.",
      prepSteps: [
        "Choose plain, unsweetened whole-milk kefir — skip every flavored or 'kids' bottle.",
        "Stir a spoonful into warm oatmeal or a thick fruit puree, or pour a shallow splash into a small open cup and help the baby sip.",
        "First time: serve early in the day, a small amount, and watch for 2 hours.",
        "Serve alongside familiar foods, never another new food, so any reaction can be traced to the milk.",
      ],
      commonMistakes: [
        "Treating kefir like a bottle of milk — it's a food-sized taste, and breast milk or formula stays the drink before 12 months.",
        "Buying strawberry or vanilla kefir, which is closer to a milkshake in sugar terms.",
        "Overfilling the cup — a splash barely covering the bottom is plenty for sip practice.",
      ],
      media: [],
    },
    {
      band: "9-12m",
      form: "A shallow splash of plain whole-milk kefir in a small open cup or straw cup for supervised practice, plus spoonfuls stirred into cereal or mashed fruit.",
      passFailTest:
        "Pour a finger-width depth into the cup and hand it over: the baby should be able to tip it without a flood — refill shallow rather than pouring deep.",
      whyThisForm:
        "This is the prime window for open-cup and straw skills before the 12-month bottle wean, and thin kefir is a forgiving practice liquid that also keeps steady dairy exposure going.",
      prepSteps: [
        "Pour a shallow layer of plain kefir into a small open cup at one meal a day.",
        "Refill in small amounts instead of starting with a full cup.",
        "Keep using kefir as a mix-in for oatmeal, overnight oats, or mashed banana.",
      ],
      commonMistakes: [
        "Serving kefir in a bottle, which turns a food into a milk-drink substitute.",
        "Giving up on the open cup after a few spills — dribbles are the tuition for the skill.",
      ],
      media: [],
    },
    {
      band: "12-24m",
      form: "A small open cup — about a quarter cup — of plain whole-milk kefir with a meal or snack, or blended with soft fruit into a spoonable smoothie.",
      passFailTest:
        "Check the label habit is still holding: ingredients should read milk and cultures only, and the added-sugar line should still say zero.",
      whyThisForm:
        "After 12 months dairy drinks can join meals, and tangy kefir is a lower-sugar habit than flavored milks; keeping it at meals rather than sipped all day protects both appetite and teeth.",
      prepSteps: [
        "Offer a quarter-cup of plain kefir in an open cup alongside meals or snacks.",
        "Blend kefir with banana or thawed berries for a thick, spoonable smoothie — no sweeteners needed.",
      ],
      commonMistakes: [
        "Letting a kefir cup wander around the house between meals — grazing on any milky drink all day bathes teeth in it.",
      ],
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["banana", "blueberry", "oatmeal", "mango"],
  tips: [
    "Kefir and yogurt are fine as foods from around 6 months, but cow's milk as a drink waits until 12 months — before then kefir is a taste and a mix-in, never a bottle-filler.",
    "Too thin for a spoon? Whisk kefir into an equal amount of thick Greek-style yogurt for a spoonable halfway texture.",
    "Tame the tang the same way as yogurt: mash in ripe banana at first, then step the fruit down as the baby acclimates.",
    "One tub, two jobs: use spoonfuls for eating practice and shallow cup pours for sipping practice — the baby is building different skills with each.",
  ],
  sources: [SOURCES.eatStudy, SOURCES.cdcFoodsAndDrinks, SOURCES.aapStartingSolids],
  nutrients: ["calcium", "protein"],
  servingGuidance: [
    {
      band: "6-8m",
      typicalAmount:
        "A teaspoon or two stirred into a familiar food, or a few helped sips from a small cup — build up as the milk introduction goes smoothly.",
      frequency: "Once tolerated, fine as a regular food — steady exposure also helps maintain dairy tolerance.",
    },
    {
      band: "9-12m",
      typicalAmount:
        "A few tablespoons in a shallow open cup plus mix-in spoonfuls — refill in small pours while interest lasts.",
    },
    {
      band: "12-24m",
      typicalAmount:
        "About a quarter cup at a meal or snack — the toddler decides how much of it actually goes down.",
    },
  ],
  watchOuts: [
    "Flavored kefir is one of the most sugared items in the dairy case — plain unsweetened is the only version for this age.",
    "Kefir is drinkable but it is not a formula or breast-milk replacement — before 12 months it stays a food-sized serving.",
  ],
  emoji: "🥛",
};

export default kefir;
