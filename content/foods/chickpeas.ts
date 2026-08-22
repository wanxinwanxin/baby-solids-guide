import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const chickpeas: Food = {
  slug: "chickpeas",
  name: "Chickpeas",
  aliases: ["garbanzo beans"],
  category: "legume",
  minAgeMonths: 6,
  ironRich: true,
  commonAllergen: null,
  chokingRisk: "moderate",
  chokingNotes:
    "A whole chickpea is firm, round, and roughly airway-sized — risky geometry even when cooked. Mitigate by serving as a completely smooth, hummus-style mash, or by smashing each chickpea flat between your fingers; whole firm chickpeas (and crunchy roasted ones) stay off the menu until chewing is reliable, around age 4 for the crunchy kind.",
  nutritionHighlights: [
    "Iron and plant protein in a versatile, inexpensive legume",
    "A source of folate for rapid cell growth",
    "Fiber that supports healthy digestion",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "Chickpeas blended into a completely smooth, hummus-style mash with no added salt, thinned with water or unsalted cooking liquid until it spreads like thick yogurt.",
      passFailTest:
        "Rub a dab between two fingers: it should feel smooth with no gritty or pebbly fragments, and a spoonful should spread on the tray rather than hold a ball shape.",
      whyThisForm:
        "Pre-chewing babies can't manage a firm sphere, and even fragments of underblended chickpea stay hard-edged — a fully smooth mash delivers the iron and protein with none of the round-and-firm risk.",
      prepSteps: [
        "Simmer soaked chickpeas until very soft (or rinse no-salt-added canned chickpeas thoroughly).",
        "Blend with water or unsalted cooking liquid until completely smooth, adding liquid until it spreads like thick yogurt.",
        "Serve from a preloaded spoon, spread on the tray, or stirred into a familiar vegetable puree.",
      ],
      commonMistakes: [
        "Blending only until 'mostly smooth' — leftover chickpea fragments are hard little pebbles.",
        "Using store-bought hummus, which typically carries added salt — and tahini, which is its own allergen event (see tips).",
        "Skipping the rinse on canned chickpeas and importing the canning liquid's sodium.",
      ],
      cutDiagram: "mash",
      media: [],
    },
    {
      band: "9-12m",
      form: "Soft-cooked chickpeas served a few at a time, each one smashed completely flat between your thumb and finger, with any loose papery skins pinched away.",
      passFailTest:
        "Scan the tray before serving: every chickpea must be a flattened disc — anything still round and firm gets smashed again or held back.",
      whyThisForm:
        "Flattened chickpeas are excellent pincer-grasp practice, and smashing destroys the firm round geometry; removing loose skins keeps papery flaps from sticking to the palate.",
      prepSteps: [
        "Cook (or rinse canned) chickpeas until each smashes flat with easy thumb pressure.",
        "Press each chickpea flat between thumb and forefinger, pinching off any skin that slides loose.",
        "Offer four or five at a time alongside the smooth mash.",
      ],
      commonMistakes: [
        "Serving whole chickpeas because they 'seem soft' — softness doesn't fix the round shape; flattening does.",
        "Leaving detached papery skins on the tray, where they can plaster to the roof of the mouth.",
      ],
      cutDiagram: "mash",
      media: [],
    },
    {
      band: "12-24m",
      form: "Chickpeas still smashed flat or roughly chopped into halves and quarters, since a whole firm chickpea keeps its risky round shape until chewing matures.",
      passFailTest:
        "Every piece in the bowl should be flat, halved, or quartered and should yield to one-finger pressure; crunchy roasted chickpeas fail on sight.",
      whyThisForm:
        "Molars are only starting to arrive, and a firm sphere can still slip backward before it's ground down — chopped or flattened stays the rule, and crunchy roasted chickpeas wait until about age 4.",
      prepSteps: [
        "Fold flattened or quartered chickpeas into pasta, grain bowls, and low-salt stews from the family meal.",
        "Keep unsalted smooth mash in rotation as a spread on toast strips.",
      ],
      commonMistakes: [
        "Offering crunchy roasted chickpea snacks — hard, round, and exactly the wrong texture until around age 4.",
      ],
      cutDiagram: "mash",
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["olive-oil", "carrot", "zucchini", "cauliflower"],
  tips: [
    "Traditional hummus contains tahini — that's sesame, a separate common allergen. If you add tahini, treat that meal as a deliberate sesame introduction, not a hidden ingredient.",
    "Make baby hummus at home: chickpeas, water, and a drizzle of olive oil, blended smooth — skip the salt entirely and add lemon or garlic for flavor instead.",
    "Overcook on purpose: chickpeas simmered 10 minutes past 'done' blend dramatically smoother and smash flat with one finger.",
    "Rinsed no-salt-added canned chickpeas are a fine shortcut; a quick extra simmer in plain water softens them further.",
  ],
  sources: [SOURCES.wicGuide, SOURCES.cdcChokingHazards, SOURCES.nhsFrom6Months],
  nutrients: ["iron", "protein", "fiber", "folate"],
  servingGuidance: [
    {
      band: "6-8m",
      typicalAmount:
        "One to two tablespoons of smooth unsalted mash on a spoon or the tray — a starting point, never a quota.",
      note: "A squeeze of lemon in the mash adds vitamin C that helps the plant iron along.",
    },
    {
      band: "9-12m",
      typicalAmount:
        "Four or five flattened chickpeas at a time plus a teaspoon or two of mash — refill at the baby's pace.",
    },
    {
      band: "12-24m",
      typicalAmount:
        "A few tablespoons of flattened or quartered chickpeas through a family dish — the toddler decides when it's enough.",
    },
  ],
  watchOuts: [
    "Legumes can mean a gassy day or two at first — small, regular servings help the gut adjust.",
    "Store-bought hummus usually brings added salt plus tahini — that's sesame, a separate allergen to introduce deliberately.",
  ],
  emoji: "🧆",
};

export default chickpeas;
