import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const trout: Food = {
  slug: "trout",
  name: "Trout",
  aliases: ["rainbow trout"],
  category: "protein",
  minAgeMonths: 6,
  ironRich: true,
  commonAllergen: "fish",
  chokingRisk: "low",
  nutritionHighlights: [
    "Rich in DHA, the omega-3 fat concentrated in the developing brain and eyes",
    "One of the few everyday foods that naturally provides vitamin D",
    "A low-mercury fish that fits comfortably into a weekly rotation",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "A skinless piece of cooked trout fillet about the size of two adult fingers, flaked apart and combed twice for the fine pin bones trout carries, then remoistened and served whole or mashed into a familiar puree.",
      passFailTest:
        "Rake a fork and then bare fingertips through every flake — the fish should fall apart moist with no resistance, and the fingertip sweep must turn up not a single fine bone.",
      whyThisForm:
        "Cooked trout is naturally soft enough for bare gums, so a two-finger piece suits the whole-fist palmar grasp, while mashed flakes in a familiar puree deliver the allergen and DHA by spoon.",
      prepSteps: [
        "Run fingertips along the raw fillet against the grain and tweeze out every pin bone — trout hides more of them than most fish — then bake or poach until opaque and flaking, about 8–10 minutes.",
        "Flake the cooked fish with a fork, comb through a second time with fingertips for missed bones, and stir in a little cooking liquid, breast milk, or formula.",
        "Mix into or serve alongside familiar foods, never another new food.",
        "First time: serve early in the day, a small amount, and watch for 2 hours.",
      ],
      commonMistakes: [
        "Checking for bones only once — trout pin bones are fine and flexible, and the second comb-through after cooking is the one that catches them.",
        "Overcooking until dry and chalky; dry trout crumbles instead of mashing.",
        "Introducing trout at dinner, where a delayed reaction lands overnight when you can't observe.",
      ],
      media: [],
    },
    {
      band: "9-12m",
      form: "Moist, twice-bone-checked trout broken into loose flakes about the size of a pinky fingernail, each soft enough to flatten between two fingers without crumbling dry.",
      passFailTest:
        "Pinch a flake between two fingers — it should flatten into soft threads, and a slow fingertip sweep through the pile should confirm no bone slipped through.",
      whyThisForm:
        "Small, irregular flakes are tailor-made for the emerging pincer grasp, and keeping fish on the menu weekly maintains the allergen exposure once it's introduced.",
      prepSteps: [
        "Cook and de-bone exactly as for 6–8 months, then break into pinky-nail flakes.",
        "Toss the flakes with a spoonful of cooking juice, olive oil, or plain yogurt so nothing dries out.",
        "Scatter a few flakes at a time on the tray alongside a food the baby knows.",
      ],
      commonMistakes: [
        "Trusting a 'boneless' label instead of your fingertips — pin bones routinely evade filleting.",
        "Serving dry flakes that scatter and stick in the mouth; moisture is what makes fish easy.",
      ],
      cutDiagram: "bite-size",
      media: [],
    },
    {
      band: "12-24m",
      form: "Bite-size chunks of cooked, bone-checked trout no bigger than a pinky fingernail, served moist from the family meal or folded into rice, pasta, or mashed potato.",
      passFailTest:
        "Each chunk should flatten between two fingers and pull apart into flakes; anything that resists a pinch is too dense or too big.",
      whyThisForm:
        "Toddlers manage soft fish well, so the goal shifts to routine — keeping low-mercury fish in the weekly rotation in shapes a molars-in-progress chewer handles easily.",
      prepSteps: [
        "Serve family-meal trout in pinky-nail chunks after one final fingertip bone check.",
        "Moisten with pan juices or fold into a soft grain or vegetable dish before plating.",
      ],
      commonMistakes: [
        "Relaxing the bone check because the toddler 'eats everything now' — a fine bone is still the real hazard in this soft fish.",
      ],
      cutDiagram: "bite-size",
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["potato", "peas", "zucchini", "quinoa"],
  tips: [
    "Poach the fillet in barely simmering water for about 8 minutes — trout stays moistest cooked gently, and the poaching liquid doubles as remoistener.",
    "The bone check happens twice: fingertips over the raw fillet, then again through the cooked flakes — trout's pin bones are finer than salmon's and hide until the flesh separates.",
    "Trout is a low-mercury choice, so it can anchor one or two of the week's fish servings without any special limits.",
    "Freeze cooked, de-boned flakes flat in a zip bag and snap off a portion at a time to keep weekly fish servings effortless.",
  ],
  sources: [SOURCES.fdaFish, SOURCES.eatStudy, SOURCES.nhsFrom6Months],
  nutrients: ["omega3", "protein", "vitaminD", "iron"],
  servingGuidance: [
    {
      band: "6-8m",
      typicalAmount:
        "A teaspoon or two of mashed flakes in a familiar puree, or one soft two-finger piece — first serves stay small and grow with tolerance.",
      frequency: "1–2 times a week once tolerated — trout is a low-mercury choice.",
    },
    {
      band: "9-12m",
      typicalAmount:
        "A small handful of moist pinky-nail flakes, scattered a few pieces at a time — the baby sets the pace.",
      frequency: "1–2 times a week keeps the fish allergen comfortably in the diet.",
    },
    {
      band: "12-24m",
      typicalAmount:
        "A few tablespoons of soft chunks folded into the family meal — appetite swings day to day, and that's normal.",
      frequency: "1–2 low-mercury fish servings a week fits federal advice for young children.",
    },
  ],
  watchOuts: [
    "Smoked trout is heavily salted and cured rather than cooked through — plain poached or baked fillet is the version for babies.",
  ],
  emoji: "🐟",
};

export default trout;
