import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const avocadoOil: Food = {
  slug: "avocado-oil",
  name: "Avocado oil",
  aliases: [],
  category: "fat-other",
  minAgeMonths: 6,
  ironRich: false,
  commonAllergen: null,
  chokingRisk: "low",
  nutritionHighlights: [
    "A concentrated calorie source, valuable because babies pair tiny stomachs with big energy needs",
    "Mostly monounsaturated fat, the kind health guidance favors",
    "Fat served alongside vegetables helps the fat-soluble vitamins A, D, E, and K absorb",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "Half to one teaspoon of avocado oil stirred all the way through a single serving of vegetable puree or mash until the spoonful carries a light, even sheen.",
      passFailTest:
        "The glisten test: the finished puree should glisten evenly, never pool — tilt the bowl, and any free oil running to the edge means too much for one serving.",
      whyThisForm:
        "Nearly everything is a puree or mash at this age, and a stirred-in teaspoon of oil quietly raises calorie density while ferrying the vegetables' fat-soluble vitamins into the baby.",
      prepSteps: [
        "Prepare the vegetable puree or mash as usual, unsalted.",
        "Stir in ½–1 teaspoon of avocado oil until fully combined with no visible slick on top.",
        "Run the glisten test before serving: sheen yes, puddle no.",
      ],
      commonMistakes: [
        "Pouring the oil over the top instead of stirring it through — one oily first bite, then nothing.",
        "Adding oil to every food of the day at once; about a teaspoon spread across the day is plenty now.",
        "Withholding added fat because the adults are avoiding it — under two, fat is fuel for brain growth.",
      ],
      media: [],
    },
    {
      band: "9-12m",
      form: "About one teaspoon tossed through finger foods — soft-cooked vegetables, shredded chicken, pasta spirals — so every piece carries a whisper of coating rather than sitting in oil.",
      passFailTest:
        "Pick up a coated piece: fingers should come away barely shiny, not dripping, and the piece should still be grippable instead of skating across the tray.",
      whyThisForm:
        "Finger foods rule once the pincer grasp arrives, and a light toss of oil adds calories and vitamin absorption without making food too slippery for small hands.",
      prepSteps: [
        "Toss warm soft-cooked vegetables, grains, or shredded meat with about a teaspoon of avocado oil.",
        "If pieces skate around the tray, blot the excess with a quick roll on a paper towel.",
      ],
      commonMistakes: [
        "Over-oiling until food shoots out of a nine-month-old fist — the coating should be barely there.",
      ],
      media: [],
    },
    {
      band: "12-24m",
      form: "One to two teaspoons across the day as the household's high-heat cooking fat — roasting vegetables, searing fish, pan-frying fritters — plus the odd finishing drizzle.",
      passFailTest:
        "Same glisten-not-pool standard on the plate: food should look lightly glossed, with no puddle of free oil when the plate is tilted.",
      whyThisForm:
        "Toddlers eat modified family meals, and avocado oil's high smoke point makes it the natural fat for the roasting and searing the family already does.",
      prepSteps: [
        "Roast or saute the family meal in avocado oil, keeping the toddler's portion unsalted or lightly salted.",
        "Finish plain beans, lentils, or steamed vegetables with a small drizzle before serving.",
      ],
      commonMistakes: [
        "Serving a toddler low-fat versions of foods — dietary fat stays essential fuel until at least age two.",
      ],
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["sweet-potato", "carrot", "broccoli", "rice"],
  tips: [
    "Its high smoke point is the practical edge: avocado oil stays stable through hot roasting and searing where more delicate oils degrade.",
    "The flavor is nearly neutral — handy for babies who wrinkle at the grassy bite of some olive oils.",
    "Think of any cooking fat as a vitamin ferry: carrots, squash, and greens give up their fat-soluble vitamins far better when eaten with a little fat.",
    "Store the bottle in a dark cupboard away from the stove — heat and light stale any oil, and babies notice bitter.",
  ],
  sources: [SOURCES.nhsFrom6Months, SOURCES.wicGuide, SOURCES.aapStartingSolids],
  nutrients: ["healthyFats"],
  servingGuidance: [
    {
      band: "6-8m",
      typicalAmount:
        "Half to one teaspoon stirred into a serving of puree — enough for a sheen, never a slick.",
      note: "A booster for other foods, not a food on its own.",
    },
    {
      band: "9-12m",
      typicalAmount:
        "About one teaspoon tossed through finger foods over the course of the day.",
    },
    {
      band: "12-24m",
      typicalAmount:
        "One to two teaspoons across the day as the cooking fat plus an occasional finishing drizzle.",
    },
  ],
  watchOuts: [
    "Bottles labeled 'avocado oil blend' can be mostly cheaper oils — the ingredient list should name avocado oil alone.",
  ],
  emoji: "🥑",
};

export default avocadoOil;
