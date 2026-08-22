import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const cannedTuna: Food = {
  slug: "canned-tuna",
  name: "Canned light tuna",
  aliases: ["tuna", "skipjack tuna"],
  category: "protein",
  minAgeMonths: 6,
  ironRich: false,
  commonAllergen: "fish",
  chokingRisk: "low",
  nutritionHighlights: [
    "A pantry-stable, complete protein that makes weekly fish servings easy",
    "Provides vitamin B12, selenium, and a modest amount of omega-3s",
    "Light (skipjack) tuna is markedly lower in mercury than white albacore",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "Water-packed light tuna, drained and mashed with a fork into a paste loosened with breast milk, formula, plain yogurt, or mashed avocado until no dry pebble bigger than a grain of rice remains.",
      passFailTest:
        "Drag a spoon through the mash — it should ribbon smoothly and hold together moistly; if it sits in dry crumbles that scatter off the spoon, add more liquid and mash again.",
      whyThisForm:
        "Canned tuna comes out of the tin in dry, pebbly grains that scatter in a young mouth, so mashing it into a moist, cohesive paste makes it spoonable and safe for babies still on purees and mashes.",
      prepSteps: [
        "Choose water-packed, no-salt-added light (skipjack) tuna, drain well, and give it a quick rinse if the label lists added salt.",
        "Mash thoroughly with a fork, then work in breast milk, formula, yogurt, or avocado a spoonful at a time until the mix is soft and cohesive.",
        "Mix into or serve alongside familiar foods, never another new food.",
        "First time: serve early in the day, a small amount, and watch for 2 hours.",
      ],
      commonMistakes: [
        "Serving tuna straight from the can — the dry grains clump in cheeks and are hard to swallow without added moisture.",
        "Grabbing white albacore by mistake; it carries roughly three times the mercury of light tuna.",
        "Introducing tuna at dinner, so any delayed reaction lands overnight.",
      ],
      media: [],
    },
    {
      band: "9-12m",
      form: "Drained light tuna mashed with avocado or plain yogurt into a soft salad, offered in pea-size clumps for finger practice or spread paper-thin on a lightly toasted bread strip.",
      passFailTest:
        "A clump should squash flat between two fingers without shedding dry crumbs, and a spread should be thin enough that the bread beneath shows through in patches.",
      whyThisForm:
        "Moist clumps suit the new pincer grasp, and a thin spread on a toast strip turns a crumbly food into a graspable, gummable handle.",
      prepSteps: [
        "Mash drained tuna with mashed avocado or yogurt until it holds together like a soft salad.",
        "Offer pea-size clumps a few at a time, or spread a thin layer on a finger-length strip of lightly toasted bread.",
        "Pair with a familiar vegetable or grain so the meal isn't all one texture.",
      ],
      commonMistakes: [
        "Spreading the tuna salad thickly — a thick layer wads up in the mouth, while a paper-thin one dissolves.",
        "Using heavily salted regular canned tuna without a rinse.",
      ],
      cutDiagram: "thin-spread",
      media: [],
    },
    {
      band: "12-24m",
      form: "Moistened light tuna folded into family dishes — pasta, rice, or a soft tuna-and-potato patty cut into finger-width strips — with every serving bound in a sauce or mash rather than dry.",
      passFailTest:
        "Pinch a forkful — it should hold together moistly and flatten easily; dry flakes that fall apart mid-air need more binder before they reach the tray.",
      whyThisForm:
        "Toddlers manage tuna's texture well once it's bound in a moist dish, so the focus shifts to keeping portions small and the light-not-albacore habit steady.",
      prepSteps: [
        "Fold drained light tuna into a moist family dish such as tomato-sauced pasta or a potato mash.",
        "For patties, bind tuna with mashed potato and egg, pan-cook gently, and cut into strips about the width of an adult finger.",
      ],
      commonMistakes: [
        "Serving tuna several times a week — even low-mercury light tuna is best kept to a couple of small servings.",
      ],
      cutDiagram: "strips",
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["pasta", "avocado", "peas", "yogurt"],
  tips: [
    "Read the can twice: 'light' or 'skipjack' is the low-mercury choice, while 'white' or 'albacore' carries roughly three times more and suits only occasional use.",
    "Water-packed, no-salt-added cans give you full control; if only salted tuna is on hand, a 30-second rinse in a sieve washes off a meaningful share of the sodium.",
    "Mashed avocado is the best binder for baby tuna salad — it adds the fat and moisture the canned fish lacks without any salt.",
    "Half a can is plenty for several baby servings; refrigerate the rest in a covered container, not the opened can, and use it within two days.",
  ],
  sources: [SOURCES.fdaFish, SOURCES.eatStudy, SOURCES.cdcFoodsAndDrinks],
  nutrients: ["protein"],
  servingGuidance: [
    {
      band: "6-8m",
      typicalAmount:
        "A teaspoon or two of the moist mash folded into a familiar puree — a taste-size first serve that grows with tolerance.",
      frequency: "Up to 1–2 small servings a week, keeping light tuna in rotation with other low-mercury fish.",
    },
    {
      band: "9-12m",
      typicalAmount:
        "A tablespoon of soft tuna-avocado clumps, or half a thin-spread toast strip — the baby decides how much of it disappears.",
      frequency: "1–2 small servings a week, alternating with fresh low-mercury fish.",
    },
    {
      band: "12-24m",
      typicalAmount:
        "A couple of tablespoons folded into a family dish, or one patty strip — appetite varies meal to meal.",
      frequency: "1–2 small servings a week fits federal fish advice for young children.",
    },
  ],
  watchOuts: [
    "Mercury framing matters: choose cans labeled 'light' (skipjack) over 'white' (albacore), and keep tuna to a couple of small servings a week within a varied fish rotation.",
    "Regular canned tuna is salted in the can — pick water-packed, no-salt-added versions, or drain and rinse before mashing.",
  ],
  emoji: "🥫",
};

export default cannedTuna;
