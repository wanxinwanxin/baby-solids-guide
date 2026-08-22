import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const cinnamon: Food = {
  slug: "cinnamon",
  name: "Cinnamon",
  aliases: ["ground cinnamon"],
  category: "herb-spice",
  minAgeMonths: 6,
  ironRich: false,
  commonAllergen: null,
  chokingRisk: "low",
  nutritionHighlights: [
    "The real value is flavor variety, not nutrition — warm, sweet-tasting seasoning with zero salt or sugar",
    "Like all ground spices it is concentrated plant matter, so it contributes a trace of fiber at culinary amounts",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "A small pinch of ground cinnamon stirred evenly through a familiar puree, mash, or warm porridge until no dry clumps or dusty streaks remain anywhere in the bowl.",
      passFailTest:
        "Taste a spoonful yourself: the cinnamon should read as gentle background warmth with no gritty or dusty pocket anywhere in the food.",
      whyThisForm:
        "Babies do not need bland food — they need flavor variety without salt or sugar, and cinnamon folded into a food they already know builds an adventurous palate one familiar spoonful at a time.",
      prepSteps: [
        "Start with about 1/8 teaspoon — a small pinch — per serving of oatmeal, fruit puree, or vegetable mash.",
        "Stir until the color is uniform and no dry powder sits on the surface.",
        "Repeat over several meals before increasing; familiarity, not quantity, is the goal.",
      ],
      commonMistakes: [
        "Sprinkling dry powder on top of food — a dry clump of cinnamon is bitter and can catch in the throat.",
        "Pairing it with added sugar from day one, which teaches 'cinnamon means dessert'.",
      ],
      media: [],
    },
    {
      band: "9-12m",
      form: "A generous pinch stirred fully into oatmeal, yogurt, or mashed fruit, still mixed until the powder is part of the food rather than dust sitting on top.",
      passFailTest:
        "Taste it yourself — pleasant, clearly-there cinnamon with nothing gritty; then check the surface for stray dry powder before serving.",
      whyThisForm:
        "As finger foods take over, seasoning the base foods keeps flavor exposure growing — a baby who meets real spices now is less likely to demand beige food at two.",
      prepSteps: [
        "Stir a pinch or two into the day's oatmeal, yogurt, or fruit before it reaches the tray.",
        "Dust banana or pear pieces lightly and roll them so the powder coats and sticks rather than sitting loose.",
      ],
      commonMistakes: [
        "Escalating too fast — a heavy dose of cinnamon is harsh and can put a baby off the smell for months.",
      ],
      media: [],
    },
    {
      band: "12-24m",
      form: "Cinnamon cooked or stirred into family dishes — a pinch or two through a pot of oatmeal, stewed fruit, or mashed squash — always dispersed, never a loose dry spoonful.",
      passFailTest:
        "The family-pot test: if the dish tastes pleasantly cinnamon-warm to you, it is right for the toddler eating the same meal.",
      whyThisForm:
        "Toddlers eat what the family eats, and seasoning the shared pot normalizes flavor while keeping salt and sugar out of the picture.",
      prepSteps: [
        "Season the family oatmeal, stewed apples, or roasted squash as you normally would, tasting as you go.",
        "Keep the jar away from little hands — the game of shaking it out is irresistible.",
      ],
      commonMistakes: [
        "Letting a toddler lick or eat dry cinnamon — a mouthful of dry powder is a genuine airway irritant at any age.",
      ],
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["oatmeal", "apple", "sweet-potato", "banana"],
  tips: [
    "Stir cinnamon into warm food — heat blooms the aroma and helps the powder disperse without clumping.",
    "Season the whole pot, not the bowl: a pinch per pot of oatmeal flavors every serving evenly.",
    "Cinnamon plus fruit is the classic gateway pairing — apple, banana, and pear all carry it beautifully with no sugar needed.",
    "Buy small jars; ground cinnamon fades within a year, and fresher spice means less is needed.",
  ],
  sources: [SOURCES.nhsFrom6Months, SOURCES.cdcFoodsAndDrinks, SOURCES.wicGuide],
  nutrients: ["fiber"],
  servingGuidance: [
    {
      band: "6-8m",
      typicalAmount:
        "A small pinch (about 1/8 teaspoon) stirred into one serving — flavor exposure is the goal, not quantity.",
    },
    {
      band: "9-12m",
      typicalAmount:
        "A pinch or two across the day's meals, always mixed in rather than dusted on top.",
    },
    {
      band: "12-24m",
      typicalAmount:
        "Season the family pot to your own taste — a pinch or two — and let the toddler eat what everyone eats.",
    },
  ],
  watchOuts: [
    "A mouthful of dry cinnamon powder can irritate and even choke — always stir it into moist food, never serve it loose or let a toddler play with the jar.",
  ],
  emoji: "🍂",
};

export default cinnamon;
