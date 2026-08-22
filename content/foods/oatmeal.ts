import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const oatmeal: Food = {
  slug: "oatmeal",
  name: "Oatmeal",
  aliases: ["porridge", "oats"],
  category: "grain",
  minAgeMonths: 6,
  ironRich: false,
  commonAllergen: null,
  chokingRisk: "low",
  nutritionHighlights: [
    "A whole grain whose beta-glucan fiber supports healthy digestion",
    "Slow-release carbohydrate energy plus some plant protein",
    "Naturally contains small amounts of iron and zinc (much less than fortified infant cereal)",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "Rolled or steel-cut oats cooked in water or milk until every oat smashes easily — about 10 minutes for rolled, 25–30 for steel-cut — then cooled to warm and served thick enough to cling to a preloaded spoon.",
      passFailTest:
        "Turn a loaded spoon upside down for a moment: the oatmeal should cling instead of dropping off, and a single oat should smear flat between two fingers with no chewy center.",
      whyThisForm:
        "A palmar-grasping baby cannot scoop, but she can grab a preloaded spoon handle and steer it mouthward — a thick, clinging porridge is what survives the wobbly trip from tray to mouth.",
      prepSteps: [
        "Simmer rolled oats about 10 minutes (steel-cut 25–30) in unsalted water, milk, or a mix, stirring now and then, until completely soft.",
        "Let it cool to warm — oatmeal thickens as it stands, which is exactly what you want.",
        "Run the two-finger smear test on a few oats from the center of the bowl.",
        "Preload a spoon, lay it on the tray handle-out, and reload as it comes back empty.",
      ],
      commonMistakes: [
        "Serving it loose and soupy so it drips off the spoon before it ever reaches the mouth.",
        "Using instant flavored packets, which carry added sugar and salt a baby doesn't need.",
        "Serving straight off the stove — the center of a bowl of oatmeal holds heat far longer than the surface suggests.",
      ],
      cutDiagram: "mash",
      media: [],
    },
    {
      band: "9-12m",
      form: "Thick, fully cooked oatmeal with mashed fruit or a thin drizzle of nut butter stirred through, offered on a preloaded spoon or spread thickly enough for determined little hands to scoop.",
      passFailTest:
        "The upside-down spoon should still hold its load, and any stirred-in fruit lump should flatten under gentle pressure between two fingers.",
      whyThisForm:
        "The emerging pincer grasp and rake let babies feed themselves sticky foods by hand, and gentle lumps in a familiar base are the lowest-stakes way to build chewing tolerance.",
      prepSteps: [
        "Cook as before; stir in mashed banana, pear, or berries for texture and flavor.",
        "Serve some on a preloaded spoon and smear a little directly on the tray for hand practice.",
        "Keep it thick — thin porridge frustrates both spoon and fingers.",
      ],
      commonMistakes: [
        "Sweetening the bowl with honey — honey stays off-limits until 12 months — or with syrups babies don't need.",
      ],
      cutDiagram: "mash",
      media: [],
    },
    {
      band: "12-24m",
      form: "Regular family oatmeal, still cooked fully soft and cooled to warm, self-fed with a small spoon and topped with chopped soft fruit or a thin, well-stirred nut-butter drizzle.",
      passFailTest:
        "A loaded toddler spoon tipped sideways should hold its mound; toppings should each pass their own squish test before they go on.",
      whyThisForm:
        "Toddlers are consolidating independent utensil use, and a cohesive, clinging porridge rewards every self-steered spoonful while molars finish the little chewing that soft oats require.",
      prepSteps: [
        "Cook one family pot; the toddler's bowl needs no salt or sugar, just soft toppings.",
        "Hand over the spoon and expect a mess — the practice is the point.",
      ],
      commonMistakes: [
        "Adding granola or whole nuts as a topping — hard clusters and whole nuts stay choking hazards until around age 4.",
      ],
      cutDiagram: "mash",
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["peanut-butter", "banana", "blueberry", "yogurt"],
  tips: [
    "The clinging texture is the goal: cook rolled oats at about 1 part oats to 2 parts liquid, then let the pot stand 5 minutes — it thickens itself.",
    "For the smoothest early bowls, blitz dry rolled oats into flour first; the resulting porridge cooks in 3–4 minutes and needs no whisking battle.",
    "Steel-cut oats need the full 25–30 minutes — an al dente steel-cut oat has a chewy center that fails the two-finger smear test.",
    "Oatmeal is the ideal carrier food: thinned nut butters, ground walnut, and fruit mashes all disappear smoothly into a bowl the baby already trusts.",
    "Cool it fast by spreading a thin layer on a plate; stirring a scalding bowl hides hot pockets in the middle.",
  ],
  sources: [SOURCES.nhsFrom6Months, SOURCES.wicGuide, SOURCES.cdcFoodsAndDrinks],
  nutrients: ["fiber", "protein"],
  servingGuidance: [
    {
      band: "6-8m",
      typicalAmount:
        "A couple of tablespoons of thick porridge on a preloaded spoon — plenty may end up worn rather than eaten, and that's normal.",
    },
    {
      band: "9-12m",
      typicalAmount:
        "Two to four tablespoons with fruit stirred through — keep reloading the spoon while interest holds.",
    },
    {
      band: "12-24m",
      typicalAmount:
        "A small bowl — about half a cup cooked — at family breakfast; the toddler decides how much of it is breakfast.",
    },
  ],
  emoji: "🥣",
};

export default oatmeal;
