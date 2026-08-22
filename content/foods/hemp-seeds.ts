import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const hempSeeds: Food = {
  slug: "hemp-seeds",
  name: "Hemp seeds",
  aliases: ["hemp hearts", "hulled hemp seeds"],
  category: "protein",
  minAgeMonths: 6,
  ironRich: true,
  commonAllergen: null,
  chokingRisk: "low",
  nutritionHighlights: [
    "A rich plant source of the omega-3 fat ALA, which supports brain development",
    "Unusually complete plant protein for a seed, plus a useful dose of iron",
    "Soft enough to need no grinding — one of the easiest nutrition boosters in the pantry",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "One teaspoon of hulled hemp hearts — tiny, cream-colored seeds about the size of a sesame seed and soft enough to squash between two fingers — stirred fully into a puree or oatmeal.",
      passFailTest:
        "Press a single heart between your thumb and fingertip: it should flatten into a soft smear with no hard crunch. A hard, gritty seed means you have unhulled seeds — swap them.",
      whyThisForm:
        "Hemp hearts are soft and tiny enough to pose almost no airway risk, but at this age everything still arrives by spoon, so they ride into the baby stirred through familiar smooth foods.",
      prepSteps: [
        "Buy hulled hemp hearts, not whole hemp seeds — the hull is a hard, gritty shell babies don't need.",
        "Stir about a teaspoon thoroughly into oatmeal, yogurt, or any vegetable or fruit puree.",
        "Start with a teaspoon a day and build up gradually over a couple of weeks.",
      ],
      commonMistakes: [
        "Buying whole (unhulled) hemp seeds — the crunchy shells are unpleasant and hard for small gums.",
        "Dumping in a tablespoon on day one — hemp is rich and fibrous, and small guts do better with a gradual ramp.",
      ],
      media: [],
    },
    {
      band: "9-12m",
      form: "One to two teaspoons of hemp hearts stirred into mashes and yogurt, or pressed onto slippery finger foods like banana spears and avocado wedges as a grippy, edible coating.",
      passFailTest:
        "Roll a banana spear in hemp hearts and hand it over: the piece should be grippable rather than shooting out of the fist, and the seeds should stay stuck to the food.",
      whyThisForm:
        "The pincer-grasp stage lives on slippery foods, and a coat of soft hemp hearts adds traction for small hands while quietly adding omega-3s, protein, and iron.",
      prepSteps: [
        "Spread a spoonful of hemp hearts on a plate and roll banana, avocado, or steamed sweet potato pieces in it.",
        "Keep stirring a teaspoon or two into oatmeal, yogurt, and mashed beans as before.",
      ],
      commonMistakes: [
        "Serving a loose pile of dry seeds to pick at — they scatter everywhere and frustrate the baby; put them on or in food instead.",
      ],
      media: [],
    },
    {
      band: "12-24m",
      form: "One to two teaspoons sprinkled and stirred through the day — into porridge, pasta, smoothies, pancake batter, or over buttered toast — as a default finishing seed.",
      passFailTest:
        "The seeds should disappear into whatever carries them; if a dish ends up visibly crusted in seeds, you have added more than one meal needs.",
      whyThisForm:
        "Toddlers eat family food, and hemp hearts are the rare booster that needs no prep at all — soft, mild, and invisible in almost anything.",
      prepSteps: [
        "Keep the bag within reach of the stove and add a spoonful to porridge, sauces, or batters as you cook.",
        "Stir into yogurt or nut-free spreads for daycare-safe snacks.",
      ],
      commonMistakes: [
        "Treating hemp as a garnish for special occasions — the value is in the steady, unremarkable daily sprinkle.",
      ],
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["oatmeal", "banana", "yogurt", "avocado"],
  tips: [
    "Hemp hearts from the grocery aisle are just a food seed — they contain nothing mind-altering, whatever the plant's reputation suggests.",
    "Their oils go rancid at room temperature — keep the bag sealed in the fridge or freezer and it lasts months.",
    "The grip trick is the killer feature: slippery banana and avocado become graspable the moment you roll them in hemp hearts.",
    "Mild and faintly nutty, they vanish into almost any dish — a rare booster babies never learn to refuse.",
  ],
  sources: [SOURCES.wicGuide, SOURCES.nhsFrom6Months, SOURCES.cdcFoodsAndDrinks],
  nutrients: ["omega3", "protein", "healthyFats", "iron"],
  servingGuidance: [
    {
      band: "6-8m",
      typicalAmount:
        "About a teaspoon stirred into one soft food a day — enough to matter, gentle enough for a new gut.",
    },
    {
      band: "9-12m",
      typicalAmount:
        "One to two teaspoons across the day, stirred in or used as a grip coating on slippery finger foods.",
    },
    {
      band: "12-24m",
      typicalAmount:
        "A teaspoon or two sprinkled through family dishes — a steady background habit, not a measured dose.",
    },
  ],
  watchOuts: [
    "Hemp hearts are rich and fibrous — ramp up gradually from a teaspoon rather than starting with big scoops.",
  ],
  emoji: "🌿",
};

export default hempSeeds;
