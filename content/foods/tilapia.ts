import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const tilapia: Food = {
  slug: "tilapia",
  name: "Tilapia",
  aliases: [],
  category: "protein",
  minAgeMonths: 6,
  ironRich: false,
  commonAllergen: "fish",
  chokingRisk: "low",
  nutritionHighlights: [
    "A mild, unfishy flavor that makes it one of the easiest first fish for babies to accept",
    "Lean, complete protein with vitamin B12 and selenium",
    "A low-mercury fish appropriate for regular weekly servings",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "A skinless piece of tilapia fillet about the size of two adult fingers, baked or poached until it separates into soft white flakes, checked for stray bones, and served whole or mashed into a familiar puree.",
      passFailTest:
        "Press the piece flat with a fork — it should fall into moist flakes with no translucent center, and fingertips raked through the flakes should find no bones.",
      whyThisForm:
        "Cooked tilapia is soft enough for toothless gums from the first bite, so a two-finger piece fits the whole-fist palmar grasp while mashed flakes carry the fish allergen into spoon feeds.",
      prepSteps: [
        "Run fingertips over the raw fillet and remove any stray bones — tilapia fillets are usually clean, but check anyway — then poach or bake until fully opaque, about 8–10 minutes.",
        "Flake with a fork, re-check for bones, and stir in a spoonful of cooking liquid, breast milk, or formula, since this lean fish dries quickly.",
        "Mix into or serve alongside familiar foods, never another new food.",
        "First time: serve early in the day, a small amount, and watch for 2 hours.",
      ],
      commonMistakes: [
        "Overcooking — lean tilapia turns dry and crumbly faster than fattier fish, and dry crumbs are hard to swallow.",
        "Skipping the bone check because the fillet 'looks clean.'",
        "Offering the first taste at dinner, pushing any delayed reaction into the night.",
      ],
      media: [],
    },
    {
      band: "9-12m",
      form: "Moist, bone-checked tilapia flakes about the size of a pinky fingernail, tossed with a little olive oil or cooking liquid so each flake flattens softly between two fingers.",
      passFailTest:
        "Pinch a flake — it should flatten rather than crumble into dry grains, and a fingertip sweep through the serving should confirm it is bone-free.",
      whyThisForm:
        "Small, irregular flakes give the new pincer grasp ideal practice pieces, and a mild fish served weekly keeps the allergen established without any flavor battle.",
      prepSteps: [
        "Cook and de-bone as for 6–8 months, then break into pinky-nail flakes.",
        "Moisten with olive oil, unsalted broth, or a soft sauce before serving.",
        "Scatter a few flakes at a time on the tray alongside a vegetable the baby knows.",
      ],
      commonMistakes: [
        "Serving the flakes plain and dry — they stick to the roof of the mouth and frustrate the meal.",
        "Pieces bigger than a pinky nail, which outmatch a gummy chew.",
      ],
      cutDiagram: "bite-size",
      media: [],
    },
    {
      band: "12-24m",
      form: "Bite-size chunks of cooked tilapia no larger than a pinky fingernail, served moist in family dishes like rice bowls, soft tacos, or pasta.",
      passFailTest:
        "Each chunk should flatten between two fingers and separate into flakes; a piece that holds firm needs a smaller cut or more moisture.",
      whyThisForm:
        "Toddlers chew soft white fish easily, so the aim becomes routine and variety — a mild fish the whole family eats keeps weekly servings realistic.",
      prepSteps: [
        "Serve family-meal tilapia in pinky-nail chunks after a final bone check.",
        "Fold into moist dishes — rice, soft vegetables, a mild sauce — rather than serving dry and plain.",
      ],
      commonMistakes: [
        "Defaulting to breaded frozen fish products — they carry far more salt than a plain baked fillet.",
      ],
      cutDiagram: "bite-size",
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["rice", "avocado", "broccoli", "sweet-potato"],
  tips: [
    "Poach in barely simmering water for 8–10 minutes for the moistest result — lean tilapia punishes high heat by drying out.",
    "Because the flavor is so mild, tilapia is a good vehicle for repeat fish exposures in babies who rejected a stronger-tasting fish.",
    "A squeeze of the poaching liquid or a spoonful of plain yogurt stirred through the flakes rescues fish that has dried in the fridge.",
    "Thin frozen fillets cook straight from frozen in about 12 minutes — keep a bag on hand so a fish serving is never more than one pan away.",
  ],
  sources: [SOURCES.fdaFish, SOURCES.eatStudy, SOURCES.wicGuide],
  nutrients: ["protein"],
  servingGuidance: [
    {
      band: "6-8m",
      typicalAmount:
        "A teaspoon or two of mashed flakes in a familiar puree, or one soft two-finger piece — a taste-size first serve that grows with tolerance.",
      frequency: "1–2 times a week once tolerated — tilapia is a low-mercury choice.",
    },
    {
      band: "9-12m",
      typicalAmount:
        "A small handful of moist pinky-nail flakes, offered a few at a time — refill while the reaching continues.",
      frequency: "1–2 times a week keeps the fish allergen comfortably in the diet.",
    },
    {
      band: "12-24m",
      typicalAmount:
        "A few tablespoons of soft chunks folded into a moist family dish — let appetite lead.",
      frequency: "1–2 low-mercury fish servings a week fits federal advice for young children.",
    },
  ],
  watchOuts: [
    "Pre-seasoned and breaded tilapia products are salty — plain fillets you season yourself keep sodium where it belongs.",
  ],
  emoji: "🐟",
};

export default tilapia;
