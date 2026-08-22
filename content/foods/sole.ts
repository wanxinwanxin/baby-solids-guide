import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const sole: Food = {
  slug: "sole",
  name: "Sole",
  aliases: ["flounder", "flatfish"],
  category: "protein",
  minAgeMonths: 6,
  ironRich: false,
  commonAllergen: "fish",
  chokingRisk: "low",
  nutritionHighlights: [
    "One of the softest textures in the fish case — flakes that melt against bare gums",
    "Mild, lean, complete protein with vitamin B12 and selenium",
    "Flatfish like sole sit on the lowest-mercury tier of federal fish advice",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "A thin, skinless sole fillet piece about the size of two adult fingers, steamed or poached just three to four minutes until it flakes at a touch, checked for bones, and draped over or mashed into a familiar puree.",
      passFailTest:
        "Touch the fish with a fork — it should collapse into fine, moist flakes with no pressure at all, and a fingertip sweep through them should find nothing sharp.",
      whyThisForm:
        "Sole cooks up softer than almost any other fish, so it asks nothing of toothless gums — a two-finger piece suits the palmar grasp, and the flakes vanish into a spoonable mash.",
      prepSteps: [
        "Run fingertips over the raw fillet — sole is usually sold fully boned, but check anyway — then steam or poach gently for 3–4 minutes until just opaque.",
        "Lift the fillet out with a spatula (it tears easily), flake with a fork, re-check for bones, and moisten with a spoonful of cooking liquid, breast milk, or formula.",
        "Mix into or serve alongside familiar foods, never another new food.",
        "First time: serve early in the day, a small amount, and watch for 2 hours.",
      ],
      commonMistakes: [
        "Walking away from the stove — a fillet this thin overcooks in the time it takes to set the table.",
        "Flipping the fillet mid-cook so it shreds before it reaches the tray; steam it flat and it stays servable.",
        "Introducing sole at dinner, so any delayed reaction lands overnight.",
      ],
      media: [],
    },
    {
      band: "9-12m",
      form: "Fine, bone-checked sole flakes about the size of a pinky fingernail, kept glossy with a little olive oil or cooking liquid so each one flattens between two fingers.",
      passFailTest:
        "Pinch a flake — it should flatten into soft threads instantly; sole that resists a pinch has been overcooked and needs moisture stirred through.",
      whyThisForm:
        "Sole's small, delicate flakes are ready-made pincer-grasp pieces, and its mild taste makes it an easy weekly repeat that keeps the fish allergen established.",
      prepSteps: [
        "Cook and check as for 6–8 months, then break into pinky-nail flakes.",
        "Toss the flakes with olive oil or a spoonful of the cooking liquid so they don't dry out.",
        "Scatter a few flakes at a time next to a familiar vegetable or grain.",
      ],
      commonMistakes: [
        "Serving flakes dry — even this soft fish sticks in the mouth without a slick of moisture.",
        "Cooking several minutes 'to be safe' — thin sole is done almost immediately, and extra time only toughens it.",
      ],
      cutDiagram: "bite-size",
      media: [],
    },
    {
      band: "12-24m",
      form: "Soft flaked sole folded into moist family dishes, or a whole thin fillet rolled and cut into bite-size pieces no bigger than a pinky fingernail.",
      passFailTest:
        "Every piece should flatten between two fingers and fall back into flakes; nothing on the plate should hold a firm, rubbery shape.",
      whyThisForm:
        "Toddlers handle this fish effortlessly, so the goal is simply routine — a mild, low-mercury flatfish is an easy way to keep weekly fish servings going.",
      prepSteps: [
        "Serve family-meal sole flaked into rice, mashed potato, or a soft sauce after a final bone check.",
        "For self-feeding, roll a cooked fillet loosely and slice into pinky-nail rounds that fall apart on picking up.",
      ],
      commonMistakes: [
        "Relying on breaded frozen flatfish products, which trade this fish's softness for a salty coating.",
      ],
      cutDiagram: "bite-size",
      media: [],
    },
  ],
  firstFoodPick: true,
  flavorPairings: ["potato", "peas", "carrot", "spinach"],
  tips: [
    "Steam the fillet flat on a heatproof plate over simmering water — sole is too fragile to survive flipping in a pan, and the plate catches the juices you'll use to remoisten.",
    "Three to four minutes is genuinely enough: the fillet is so thin that it cooks through the moment it turns fully white.",
    "Sole's blandness is a feature for first fish exposures — fold it into a vegetable the baby already loves and the new food rides in on a familiar flavor.",
    "Buy sole fresh and cook it the same day or the next; a fillet this thin loses moisture fast in the fridge.",
  ],
  sources: [SOURCES.fdaFish, SOURCES.eatStudy, SOURCES.nhsFrom6Months],
  nutrients: ["protein"],
  servingGuidance: [
    {
      band: "6-8m",
      typicalAmount:
        "A teaspoon or two of mashed flakes folded into a familiar puree, or one soft two-finger piece — first serves stay small and grow with tolerance.",
      frequency: "1–2 times a week once tolerated — sole is among the lowest-mercury fish.",
    },
    {
      band: "9-12m",
      typicalAmount:
        "A small handful of glossy pinky-nail flakes, scattered a few at a time — the baby sets the pace.",
      frequency: "1–2 times a week keeps the fish allergen comfortably in the diet.",
    },
    {
      band: "12-24m",
      typicalAmount:
        "A few tablespoons of flaked sole folded into the family meal — appetite swings day to day, and that's normal.",
      frequency: "1–2 low-mercury fish servings a week fits federal advice for young children.",
    },
  ],
  emoji: "🐟",
};

export default sole;
