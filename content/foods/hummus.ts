import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const hummus: Food = {
  slug: "hummus",
  name: "Hummus",
  aliases: ["chickpea dip"],
  category: "legume",
  minAgeMonths: 6,
  ironRich: false,
  commonAllergen: "sesame",
  chokingRisk: "low",
  nutritionHighlights: [
    "Chickpea protein and fiber plus healthy fats from tahini and olive oil in one spread",
    "Delivers the sesame allergen in an easy, repeatable everyday form",
    "A creamy vehicle that carries vegetables a baby might not take plain",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "Completely smooth homemade or no-salt-added hummus spread in a thin layer along a finger-length toast strip, or offered as a small dollop on a preloaded spoon.",
      passFailTest:
        "Smear a dab between two fingers — silky with no chickpea grit — and the toast layer should be thin enough to see the bread's surface through it.",
      whyThisForm:
        "A thin smooth spread on a graspable strip suits the whole-fist stage, and because the tahini in hummus is sesame, this serving doubles as a controlled early sesame exposure.",
      prepSteps: [
        "Blend rinsed chickpeas with tahini, olive oil, a squeeze of lemon, and enough water to reach a completely smooth, salt-free cream (or buy a no-salt-added tub).",
        "Spread a knife-thin layer on a toast strip about two adult fingers long, or load a small dollop on a spoon.",
        "First time: serve early in the day, a small amount, and watch for 2 hours — hummus contains sesame via the tahini, so treat it as a sesame introduction unless tahini is already established.",
        "Serve alongside familiar foods, never another new food, so any reaction can be traced to the sesame.",
      ],
      commonMistakes: [
        "Assuming hummus is 'just chickpeas' and missing that every classic hummus carries the sesame allergen.",
        "Serving a thick glob — a claggy paste is harder for a gummy mouth to clear than a thin film.",
        "Using regular store hummus, which is usually well salted.",
      ],
      cutDiagram: "thin-spread",
      media: [],
    },
    {
      band: "9-12m",
      form: "Smooth low-salt hummus loosened with water to a yogurt-like dip served alongside soft-cooked vegetable sticks, or spread thin on toast torn into pinky-nail pieces.",
      passFailTest:
        "Dip a soft carrot stick and lift: the hummus should coat and cling like yogurt; if it sits in a stiff lump on the stick, whisk in more water.",
      whyThisForm:
        "Dipping is a favorite skill of this window — it doubles food-to-mouth practice — and hummus-coated pieces stay soft, grippy, and sesame-exposure-rich.",
      prepSteps: [
        "Whisk a spoonful of water into the hummus until it drapes like thick yogurt.",
        "Set out a small dip bowl with soft-cooked vegetable sticks or toast pieces.",
        "Preload a few pieces with a thin swipe to demonstrate the game.",
      ],
      commonMistakes: [
        "Pairing the dip with raw hard vegetables — the dippers must still be squash-soft at this age.",
        "Letting the salty family tub become the baby's tub.",
      ],
      media: [],
    },
    {
      band: "12-24m",
      form: "Hummus as a sandwich spread, a dip cup with soft vegetable sticks, or a spoonful folded into grain bowls at family meals, kept smooth and lightly salted at most.",
      passFailTest:
        "Check the label or your recipe: the toddler's hummus stays on the low end for sodium, and any whole chickpeas on top are squashed before serving.",
      whyThisForm:
        "Toddlers manage spreads and dips independently, and hummus keeps sesame in the weekly rotation while smuggling legumes into lunchbox-style meals.",
      prepSteps: [
        "Spread on bread for a fold-over sandwich cut into strips, or serve a dip cup beside soft veg.",
        "Squash or halve any decorative whole chickpeas sitting on top of the tub.",
      ],
      commonMistakes: [
        "Sliding into strongly seasoned family tubs by default — many store versions carry a real salt load per toddler-sized dip.",
      ],
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["cucumber", "carrot", "bread", "bell-pepper"],
  tips: [
    "Homemade in two minutes: a rinsed can of chickpeas, a big spoonful of tahini, olive oil, lemon, water — blend until completely smooth, no salt needed.",
    "The smoothness test is the safety test: any remaining chickpea grit means more blending or more water.",
    "Thin it with water for dipping, keep it thick for spreading — one batch covers both jobs across the week.",
    "Hummus is the easiest sesame maintenance plan going: a smear a few times a week keeps the exposure steady after introduction.",
  ],
  sources: [SOURCES.eatStudy, SOURCES.nhsFrom6Months, SOURCES.wicGuide],
  nutrients: ["protein", "fiber", "healthyFats"],
  servingGuidance: [
    {
      band: "6-8m",
      typicalAmount:
        "A thin smear on one toast strip or a teaspoon-sized dollop — small on purpose for the first sesame exposures.",
      frequency: "Once tolerated, a few times a week keeps sesame exposure steady.",
    },
    {
      band: "9-12m",
      typicalAmount:
        "A tablespoon or two in a dip bowl with soft dippers — refill the dippers while the dunking continues.",
    },
    {
      band: "12-24m",
      typicalAmount:
        "A couple of tablespoons as spread or dip with the meal — the toddler's appetite sets the amount.",
    },
  ],
  watchOuts: [
    "Store-bought hummus is usually salted — pick no-salt-added or make it at home for the everyday version.",
    "Served too thick it turns claggy — loosen with water until it drapes rather than clumps.",
  ],
  emoji: "🫓",
};

export default hummus;
