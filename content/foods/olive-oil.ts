import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const oliveOil: Food = {
  slug: "olive-oil",
  name: "Olive oil",
  aliases: ["extra-virgin olive oil", "EVOO"],
  category: "fat-other",
  minAgeMonths: 6,
  ironRich: false,
  commonAllergen: null,
  chokingRisk: "low",
  nutritionHighlights: [
    "A concentrated source of calories, useful because babies have tiny stomachs and high energy needs",
    "Mostly unsaturated fat, the kind health guidance favors for cooking",
    "Dietary fat helps the body absorb the fat-soluble vitamins A, D, E, and K from vegetables served with it",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "Half to one teaspoon of olive oil stirred thoroughly into a single serving of vegetable puree or mashed food until the whole spoonful takes on a light, even sheen.",
      passFailTest:
        "The glisten test: the finished puree should glisten, not pool — tilt the bowl, and if free oil runs to the edge, you've added too much for one serving.",
      whyThisForm:
        "At this age almost everything is a puree or mash, and stirring the oil in raises the calorie density of low-calorie vegetables while carrying their fat-soluble vitamins into the baby.",
      prepSteps: [
        "Prepare the vegetable puree or mash as usual, unsalted.",
        "Stir in ½–1 teaspoon of olive oil until fully combined with no visible slick.",
        "Run the glisten test before serving: sheen yes, pooling no.",
      ],
      commonMistakes: [
        "Pouring oil on top instead of stirring it through — a surface slick delivers one oily first bite and nothing after.",
        "Adding oil to every single food at once; a teaspoon or so across the day is plenty at this age.",
        "Skipping added fat entirely because adults avoid it — babies need calorie-dense food, and this is the easy way to provide it.",
      ],
      media: [],
    },
    {
      band: "9-12m",
      form: "About one teaspoon drizzled and tossed over finger foods — soft-cooked vegetable pieces, shredded chicken, or pasta — so each piece carries a light coating rather than sitting in oil.",
      passFailTest:
        "Pick up a coated piece: your fingers should come away barely shiny, not dripping, and the piece should still be grippable rather than skating off the tray.",
      whyThisForm:
        "Finger foods dominate once the pincer grasp arrives, and a thin toss of oil adds calories and vitamin absorption without turning slippery food into an ungrippable one.",
      prepSteps: [
        "Toss warm soft-cooked vegetables, grains, or shredded meat with about a teaspoon of olive oil.",
        "Wipe off visible excess with a quick toss on a paper towel if pieces skate around the tray.",
      ],
      commonMistakes: [
        "Over-oiling finger food until it is too slippery for a nine-month-old to hold — the coating should be barely there.",
      ],
      media: [],
    },
    {
      band: "12-24m",
      form: "One to two teaspoons across the day as the family's cooking fat and a finishing drizzle — sauteing vegetables, moistening pasta, or gloss on beans and stews.",
      passFailTest:
        "Same glisten-not-pool standard on the plate: food should look lightly glossed, with no puddle of free oil left when the plate is tilted.",
      whyThisForm:
        "Toddlers eat modified family meals, and cooking with olive oil is the lowest-effort way to keep their food calorie-dense while the household eats the same dish.",
      prepSteps: [
        "Cook the family meal in olive oil as usual, keeping the toddler's portion unsalted or lightly salted.",
        "Finish low-fat foods like plain beans, lentils, or steamed vegetables with a small drizzle before serving.",
      ],
      commonMistakes: [
        "Reaching for low-fat versions of foods for a toddler — under two, dietary fat is fuel for brain growth, not something to restrict.",
      ],
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["carrot", "sweet-potato", "broccoli", "lentils"],
  tips: [
    "Think of olive oil as a vitamin ferry: carrots, sweet potato, and leafy greens hold fat-soluble vitamins that absorb far better when eaten with a little fat.",
    "It is also the easiest calorie boost in the kitchen — a teaspoon adds roughly 40 calories to a serving of vegetables without changing the volume a small stomach must hold.",
    "Any real olive oil works; extra-virgin adds flavor, but the everyday bottle you cook with is nutritionally fine for a baby.",
    "Store the bottle in a dark cupboard away from the stove — heat and light turn oil stale and bitter, and babies notice bitter.",
  ],
  sources: [SOURCES.nhsFrom6Months, SOURCES.wicGuide, SOURCES.aapStartingSolids],
};

export default oliveOil;
