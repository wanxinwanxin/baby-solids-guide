import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const coconut: Food = {
  slug: "coconut",
  name: "Coconut",
  aliases: ["coconut milk", "shredded coconut", "coconut cream"],
  category: "fruit",
  minAgeMonths: 6,
  ironRich: false,
  commonAllergen: null,
  chokingRisk: "moderate",
  chokingNotes:
    "Chunks of fresh coconut flesh are about as hard as raw carrot, and wide dried flakes or chips can lie flat against a small airway. Mitigate by serving coconut finely shredded and softened into moist foods, or in liquid form as coconut milk or cream stirred into meals; hard chunks and big crisp flakes wait until around age four.",
  nutritionHighlights: [
    "Rich in fat, which babies genuinely need — an easy way to add energy density to low-calorie vegetable purees",
    "Coconut milk brings creaminess and calories to porridges and stews without any dairy",
    "A distinctive flavor that widens the menu toward many world cuisines",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "Canned coconut milk or cream stirred into a familiar puree, oatmeal, or vegetable mash, or finely grated coconut simmered into porridge until every shred is fully softened.",
      passFailTest:
        "Rub a spoonful between your fingers: any shreds present should feel soft and short like cooked oats, and the mixture should be uniformly creamy with no dry or crisp bits.",
      whyThisForm:
        "At this age coconut works as an ingredient, not a finger food — liquid and fully softened fine shreds add fat and flavor with none of the hard-chunk geometry that makes raw coconut risky.",
      prepSteps: [
        "Shake a can of plain coconut milk well and stir a spoonful into oatmeal, fruit puree, or mashed vegetables.",
        "For shreds, choose unsweetened finely desiccated coconut and simmer it in the porridge for a few minutes until soft.",
        "Run the finger-rub test before serving to confirm nothing is still crisp.",
      ],
      commonMistakes: [
        "Grabbing sweetened baking coconut — much of the shredded coconut on the baking aisle is sugar-coated.",
        "Using wide coconut flakes or chips instead of fine shreds — width, not just hardness, is the hazard.",
        "Offering coconut water or carton coconut drink as a milk substitute — it is neither formula, breast milk, nor a toddler milk.",
      ],
      cutDiagram: "shred",
      media: [],
    },
    {
      band: "9-12m",
      form: "Finely shredded unsweetened coconut stirred through moist foods like yogurt or mashed banana, every shred short and softened, with coconut milk still enriching porridges and stews.",
      passFailTest:
        "Pinch a shred from the bowl: it should bend and squash rather than snap, and no piece should be wider than a grain of rice.",
      whyThisForm:
        "A baby managing textured food can now handle fine soft shreds mixed through a moist carrier, which keeps the coconut dispersed instead of clumping into a dry mouthful.",
      prepSteps: [
        "Stir a teaspoon of fine unsweetened shreds into yogurt, mashed banana, or warm oatmeal and let it sit a minute to soften.",
        "Keep using coconut milk in family-style lentils, rice, and stews served alongside finger foods.",
      ],
      commonMistakes: [
        "Serving a spoonful of dry shreds straight from the bag — dry coconut wads up in the mouth.",
      ],
      media: [],
    },
    {
      band: "12-24m",
      form: "Coconut milk cooked into family curries and stews, fine shreds baked into soft foods or stirred through yogurt, and still no hard chunks of raw coconut flesh or large crisp flakes.",
      passFailTest:
        "Anything coconut on the plate should squash or tear easily between your fingers — a piece that snaps, or a flake wider than your pinky nail, doesn't go to the toddler.",
      whyThisForm:
        "Toddlers can enjoy coconut through the whole family menu, but raw coconut flesh stays carrot-hard and molars alone don't make hard slippery chunks safe.",
      prepSteps: [
        "Cook coconut milk into curries, soups, and rice dishes the family already eats, keeping the toddler's portion unsalted and mild.",
        "Use fine shreds in oatmeal, yogurt, or soft baking like banana pancakes.",
      ],
      commonMistakes: [
        "Sharing fresh coconut chunks or big toasted flakes from an adult snack bowl — those wait until around age four.",
      ],
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["rice", "oatmeal", "lentils", "chicken"],
  tips: [
    "Canned full-fat coconut milk separates in the can — shake hard or stir the cream back in, then refrigerate leftovers in a sealed container for up to a few days.",
    "Freeze leftover coconut milk in an ice-cube tray: one cube melts perfectly into a single serving of warm porridge.",
    "Buy 'unsweetened finely desiccated' coconut — the words on the bag that matter are unsweetened and fine.",
    "Coconut milk mellows spiced family dishes, making it a natural bridge food for introducing curries and stews.",
  ],
  sources: [SOURCES.wicGuide, SOURCES.nhsFrom6Months, SOURCES.aaaaiFoodAllergy],
  nutrients: ["healthyFats", "fiber"],
  servingGuidance: [
    {
      band: "6-8m",
      typicalAmount:
        "A spoonful of coconut milk stirred into one serving, or a teaspoon of softened fine shreds cooked into porridge.",
    },
    {
      band: "9-12m",
      typicalAmount:
        "A teaspoon or two of soft shreds through a moist food, or coconut-milk-enriched dishes as part of the meal.",
    },
    {
      band: "12-24m",
      typicalAmount:
        "A few spoonfuls of whatever coconut-milk dish the family is eating — richness makes small amounts satisfying.",
    },
  ],
  watchOuts: [
    "Coconut is not one of the top-9 allergens: US labels legally call it a tree nut, but botanically it's a fruit and cross-reaction with true tree-nut allergy is rare — families managing a tree-nut allergy should ask their allergist rather than assume either way.",
    "Baking-aisle shredded coconut is often sweetened — check for 'unsweetened' on the bag.",
    "Coconut drinks and coconut water are not substitutes for breast milk, formula, or whole milk.",
  ],
  emoji: "🥥",
};

export default coconut;
