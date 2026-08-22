import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const cod: Food = {
  slug: "cod",
  name: "Cod",
  aliases: ["white fish"],
  category: "protein",
  minAgeMonths: 6,
  ironRich: false,
  commonAllergen: "fish",
  chokingRisk: "low",
  nutritionHighlights: [
    "Mild, lean, high-quality protein that most babies accept readily",
    "A natural source of iodine and vitamin B12",
    "A low-mercury fish suited to regular weekly servings",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "A piece of skinless cod fillet the size of two adult fingers, poached or baked until it separates into large soft flakes, checked for bones, and served whole or mashed into a familiar puree.",
      passFailTest:
        "Press the piece with a fork — it should fall into moist white flakes with no translucent center, and fingers raked through the flakes should find no bones.",
      whyThisForm:
        "Cooked cod is soft enough for toothless gums straight away, so a two-finger piece fits the whole-fist palmar grasp, and mashed flakes carry this allergen into spoon feeds.",
      prepSteps: [
        "Run fingertips over the raw fillet and remove any stray bones, then poach or bake until fully opaque and flaking, about 8–10 minutes.",
        "Flake the fish with a fork, re-check for bones, and stir in a spoonful of cooking liquid, breast milk, or formula — lean cod dries fast.",
        "Mix into or serve alongside familiar foods, never another new food.",
        "First time: serve early in the day, a small amount, and watch for 2 hours.",
      ],
      commonMistakes: [
        "Skipping the bone check because the fillet 'looks clean' — stray bones turn a soft food hazardous.",
        "Overcooking: cod turns rubbery and dry faster than fattier fish.",
        "Offering the first taste at dinner, pushing any delayed reaction into the night.",
      ],
      media: [],
    },
    {
      band: "9-12m",
      form: "Moist, bone-checked cod flakes about the size of a pinky fingernail, tossed with a little olive oil or cooking liquid so each flake mashes between two fingers.",
      passFailTest:
        "Pinch a flake — it should flatten softly rather than crumble dry, and a fingertip sweep through the serving should confirm it's bone-free.",
      whyThisForm:
        "Small, irregular flakes give the emerging pincer grasp perfect practice pieces, and continuing regular servings keeps the fish allergen established in the diet.",
      prepSteps: [
        "Cook and de-bone as for 6–8 months, then break into pinky-nail flakes.",
        "Moisten with olive oil, unsalted broth, or a soft sauce before serving.",
        "Offer a few flakes at a time alongside a vegetable the baby knows.",
      ],
      commonMistakes: [
        "Serving plain dry flakes that ball up in the mouth — lean fish always needs added moisture.",
        "Breaded fish sticks as a substitute: the coating brings salt and a hard fried crust.",
      ],
      cutDiagram: "bite-size",
      media: [],
    },
    {
      band: "12-24m",
      form: "Soft bite-size pieces of cooked, bone-checked cod no bigger than a pinky fingernail, or homemade fish cakes cut into finger-width strips.",
      passFailTest:
        "Each piece should flatten between thumb and finger into moist flakes; fish-cake strips should dent easily under a fingertip.",
      whyThisForm:
        "Toddlers manage soft fish easily, so the aim becomes routine — a mild low-mercury white fish is an easy way to keep fish on the weekly menu.",
      prepSteps: [
        "Serve family-meal cod in pinky-nail pieces after a final bone check.",
        "For fish cakes, mix flaked cod with mashed potato, form thin patties, cook gently, and slice into strips.",
      ],
      commonMistakes: [
        "Defaulting to salted, battered, or fried fish products instead of plain baked or poached fillet.",
      ],
      cutDiagram: "bite-size",
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["potato", "peas", "olive-oil", "carrot"],
  tips: [
    "Poach cod in barely simmering water or milk — gentle heat keeps this lean fish moist where a hot oven dries it out.",
    "Always re-moisten: a spoonful of olive oil or cooking liquid stirred through the flakes is the difference between easy and gluey.",
    "Cod is a low-mercury choice under federal fish advice, making it an easy pick for once-or-twice-weekly fish servings.",
    "Frozen cod fillets are as good as fresh for baby prep — thaw overnight in the fridge and cook straight through.",
  ],
  sources: [SOURCES.fdaFish, SOURCES.eatStudy, SOURCES.nhsFrom6Months],
  nutrients: ["protein"],
  servingGuidance: [
    {
      band: "6-8m",
      typicalAmount:
        "A two-finger piece or a tablespoon of moist flakes mashed into puree — a taste-sized start; the baby leads.",
      frequency: "Once or twice a week once tolerated keeps the fish exposure established",
    },
    {
      band: "9-12m",
      typicalAmount:
        "One to two tablespoons of moistened flakes, offered a few at a time — appetite sets the portion.",
      frequency: "Keep fish on the menu once or twice a week",
    },
    {
      band: "12-24m",
      typicalAmount:
        "A few tablespoons of flaked fish or a fish-cake strip or two with the family meal — let the toddler call it.",
    },
  ],
  watchOuts: [
    "Skip battered, breaded, and smoked fish products — they bring salt the plain fillet doesn't have.",
  ],
  emoji: "🐟",
};

export default cod;
