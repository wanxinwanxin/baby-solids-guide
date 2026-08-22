import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const edamame: Food = {
  slug: "edamame",
  name: "Edamame",
  aliases: ["green soybeans"],
  category: "legume",
  minAgeMonths: 6,
  ironRich: true,
  commonAllergen: "soy",
  chokingRisk: "high",
  chokingNotes:
    "A whole edamame bean is round, firm, and almost exactly airway-sized — the classic choking geometry, like a grape in miniature. Mitigate by serving only as a smooth mash, or with every single bean smashed completely flat or finely chopped; whole beans stay off-limits until about age 4.",
  nutritionHighlights: [
    "Plant protein plus iron in one small green package",
    "A source of folate, which supports rapid cell growth",
    "Provides fiber that helps keep an infant's digestion regular",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "Shelled edamame boiled very soft and blended with water, breast milk, or formula into a completely smooth, spreadable mash with no whole or partial beans left in it.",
      passFailTest:
        "Drag a spoon through the mash and look for lumps: if you can spot any bean fragment big enough to pick up, blend or smash it longer.",
      whyThisForm:
        "Young infants cannot chew, and a whole edamame bean is one of the riskiest shapes a baby can meet — round, firm, and slick. A smooth mash delivers the soy exposure with zero round pieces.",
      prepSteps: [
        "Boil shelled (podless) edamame for 8–10 minutes, well past the al dente stage adults prefer.",
        "Blend with water, breast milk, or formula until completely smooth, then press through a sieve if any skins remain.",
        "First time: serve early in the day, a small amount, and watch for 2 hours.",
        "Serve alongside familiar foods, never another new food, so any reaction can be traced to the soy.",
      ],
      commonMistakes: [
        "Leaving 'just a few' whole beans in the mash — one round bean is the hazard.",
        "Cooking the beans crisp-tender the way adults eat them instead of boiling them soft.",
        "Serving beans still in the pod; pods are fibrous and a chunk can break off.",
      ],
      cutDiagram: "mash",
      media: [],
    },
    {
      band: "9-12m",
      form: "Soft-cooked, shelled edamame with every single bean smashed completely flat between your thumb and finger, so nothing round or firm ever reaches the tray.",
      passFailTest:
        "Look at each piece before it goes on the tray: every bean must be a flat disc that has clearly split its skin. Anything still bean-shaped gets smashed again.",
      whyThisForm:
        "Flattened beans are ideal pincer-grasp practice — small, soft, and grippable — while smashing destroys the round, airway-plugging geometry that makes whole beans dangerous.",
      prepSteps: [
        "Boil shelled edamame 8–10 minutes until very soft.",
        "Press each bean flat between thumb and forefinger, or lay them on a cutting board and flatten with the back of a fork.",
        "Serve a small handful of flattened beans at a time.",
      ],
      commonMistakes: [
        "Smashing most beans but letting a few whole ones through — the check has to be every bean, every time.",
        "Assuming soft-cooked is enough: texture doesn't fix the round shape, only flattening or chopping does.",
      ],
      cutDiagram: "mash",
      media: [],
    },
    {
      band: "12-24m",
      form: "Still only flattened or finely chopped edamame — every bean pressed flat or cut into quarters — because whole round beans remain a choking hazard until about age four.",
      passFailTest:
        "Same every-bean check: each piece on the plate should be flat or quartered, and soft enough to squash under one finger.",
      whyThisForm:
        "Even with molars arriving, toddlers cannot reliably grind a firm, slippery sphere before it slides backward — round foods like whole edamame, grapes, and cherries all stay modified until around age 4.",
      prepSteps: [
        "Keep boiling until soft, then flatten or quarter every bean.",
        "Stir flattened beans into rice, pasta, or soups from the family meal.",
      ],
      commonMistakes: [
        "Handing a toddler the family bowl of whole edamame because they have teeth — whole beans stay off-limits until about age 4.",
      ],
      cutDiagram: "mash",
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["rice", "carrot", "avocado", "quinoa"],
  tips: [
    "Buy frozen shelled edamame ('mukimame') — it skips the podding work and cooks soft in under 10 minutes.",
    "Boil past the adult al dente point: for babies the target is a bean that squashes flat under one finger with no resistance.",
    "The fork-back trick: line up a row of cooked beans on the cutting board and press them all flat at once with the back of a fork.",
    "If skins keep peeling off into papery flakes, pinch them away — the flattened green centers are the useful part.",
  ],
  sources: [SOURCES.aaaaiFoodAllergy, SOURCES.cdcChokingHazards, SOURCES.wicGuide],
  nutrients: ["iron", "protein", "fiber", "folate"],
  servingGuidance: [
    {
      band: "6-8m",
      typicalAmount:
        "A teaspoon or two of smooth mash to start — offer more only if the baby keeps leaning in.",
      frequency: "About twice a week once soy is tolerated, to keep the exposure steady.",
    },
    {
      band: "9-12m",
      typicalAmount:
        "A small handful of flattened beans — refill the scatter while the reaching continues.",
    },
    {
      band: "12-24m",
      typicalAmount:
        "A tablespoon or two of flattened beans stirred through the meal — the toddler decides where to stop.",
    },
  ],
  watchOuts: [
    "Restaurant-style edamame pods are usually heavily salted — cook plain shelled beans for the baby's portion.",
  ],
  emoji: "🫘",
};

export default edamame;
