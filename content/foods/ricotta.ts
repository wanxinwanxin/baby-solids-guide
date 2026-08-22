import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const ricotta: Food = {
  slug: "ricotta",
  name: "Ricotta",
  aliases: ["ricotta cheese"],
  category: "dairy",
  minAgeMonths: 6,
  ironRich: false,
  commonAllergen: "milk",
  chokingRisk: "low",
  nutritionHighlights: [
    "Naturally one of the lowest-sodium cheeses, so it needs no rinsing or rationing",
    "Whole-milk ricotta delivers calcium, protein, and energy-dense fat in a spoonable form",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "Whole-milk ricotta served as a thick, smooth dollop on a preloaded spoon, or spread in a thin layer along a finger-length strip of lightly toasted bread.",
      passFailTest:
        "Drag a spoon through the tub: the ricotta should hold a soft peak and cling to an upside-down spoon for a beat instead of sliding straight off.",
      whyThisForm:
        "Ricotta needs no cooking or cutting — its soft, clingy body suits a palmar-grasp baby steering a preloaded spoon, and a thin spread turns a graspable toast strip into a milk-protein delivery vehicle.",
      prepSteps: [
        "Choose whole-milk ricotta made from pasteurized milk and give it a quick stir to smooth it out.",
        "Load a small spoon, or spread a knife-thin layer on a toast strip about the length of two adult fingers.",
        "First time: serve early in the day, a small amount, and watch for 2 hours.",
        "Serve alongside familiar foods, never another new food, so any reaction can be traced to the milk.",
      ],
      commonMistakes: [
        "Choosing part-skim by default — whole-milk ricotta has the fat babies need.",
        "Spreading it thick like frosting; a claggy mound is harder to manage than a thin film.",
        "Serving sweetened cannoli-style ricotta blends instead of the plain tub.",
      ],
      cutDiagram: "thin-spread",
      media: [],
    },
    {
      band: "9-12m",
      form: "Ricotta stirred into soft pasta, dolloped onto mashed vegetables, or spread thin on toast that is then torn into pinky-nail-sized pieces for pincer practice.",
      passFailTest:
        "Each ricotta-topped toast piece should be about pinky-nail-sized and soft enough to squash between two fingers, spread and all.",
      whyThisForm:
        "The emerging pincer grasp wants small pieces to pick up, and ricotta acts as both a soft topping and an edible glue that keeps toppings anchored to the pieces.",
      prepSteps: [
        "Spread ricotta thin on toast, then tear the toast into pinky-nail pieces.",
        "Stir a spoonful into well-cooked pasta shapes or mashed vegetables to add richness.",
        "Offer a small dollop in a bowl for supervised spoon-scooping practice.",
      ],
      commonMistakes: [
        "Serving a big undressed spoonful of cold stiff ricotta — a quick stir or a warm mix-in makes it far more workable.",
        "Skipping the tear-into-pieces step and handing over a whole slice before the baby can bite pieces off safely.",
      ],
      media: [],
    },
    {
      band: "12-24m",
      form: "Ricotta folded into family dishes — lasagna, stuffed shells, pancakes, or scrambled eggs — or spread thin on toast the toddler bites pieces from independently.",
      passFailTest:
        "For baked dishes, check the toddler's portion is warm rather than molten in the center — cheese pockets hold heat longer than the pasta around them.",
      whyThisForm:
        "Toddlers eat what the family eats, and ricotta is the rare cheese that adds dairy protein to family cooking without dragging a salt load along with it.",
      prepSteps: [
        "Portion the toddler's serving from family bakes before any salty toppings go on.",
        "Blend ricotta with a little mashed fruit for a quick spoonable snack.",
      ],
      commonMistakes: [
        "Letting the salt creep in via parmesan-heavy family versions — keep the toddler's portion mostly ricotta.",
      ],
      media: [],
    },
  ],
  firstFoodPick: true,
  flavorPairings: ["pasta", "peach", "spinach", "bread"],
  tips: [
    "Ricotta is fine as a food from around 6 months, but cow's milk as a drink still waits until 12 months.",
    "Whisk ricotta for ten seconds before serving — it loosens from grainy to creamy with no added liquid.",
    "Too runny for a spread? Drain the tub in a fine sieve for 15 minutes and it thickens right up.",
    "Ricotta is a gentle flavor bridge: stir a spoonful into any new vegetable puree to soften bitter edges.",
  ],
  sources: [SOURCES.aaaaiFoodAllergy, SOURCES.nhsFrom6Months, SOURCES.aapStartingSolids],
  nutrients: ["calcium", "protein"],
  servingGuidance: [
    {
      band: "6-8m",
      typicalAmount:
        "A teaspoon or two on a preloaded spoon or as a thin smear on a toast strip — scale up as the milk introduction goes smoothly.",
      frequency: "Once tolerated, fine as an everyday food — regular exposure helps maintain dairy tolerance.",
    },
    {
      band: "9-12m",
      typicalAmount:
        "A tablespoon or two stirred into pasta or spread across toast pieces — refill while the reaching continues.",
    },
    {
      band: "12-24m",
      typicalAmount:
        "A few tablespoons folded into the family dish or spread on toast — the toddler's appetite does the portioning.",
    },
  ],
  watchOuts: [
    "Stick to ricotta made from pasteurized milk — supermarket tubs are, but farm-stand fresh cheeses may not be.",
  ],
  emoji: "🧀",
};

export default ricotta;
