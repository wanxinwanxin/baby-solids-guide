import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const onion: Food = {
  slug: "onion",
  name: "Onion",
  aliases: ["yellow onion", "red onion", "shallot"],
  category: "vegetable",
  minAgeMonths: 6,
  ironRich: false,
  commonAllergen: null,
  chokingRisk: "low",
  nutritionHighlights: [
    "Rich in prebiotic fibers (fructans) that feed beneficial gut bacteria",
    "Adds a modest amount of vitamin C",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "Onion cooked low and slow until translucent and completely floppy, chopped into bits no bigger than a pinky nail and melted into mashes, eggs, or sauces.",
      passFailTest:
        "A piece should squash to nothing between two fingers and taste sweet rather than sharp when you sample it — any crunch or bite means more time in the pan.",
      whyThisForm:
        "At this age onion is a flavor base, not a finger food: soft-cooked bits dissolved into other dishes teach real savory flavor with nothing for gums to battle.",
      prepSteps: [
        "Dice an onion finely.",
        "Cook in olive oil over low heat for 10–15 minutes, until translucent and floppy — browning is optional.",
        "Chop any larger pieces down to pinky-nail bits.",
        "Fold into mashed vegetables, scrambled eggs, beans, or sauce.",
      ],
      commonMistakes: [
        "Half-cooking it — sharp, sulfurous onion earns an instant refusal even though it isn't dangerous.",
        "Leaving big slippery petals that separate into slick layers.",
        "Treating onion as forbidden — it's a flavor food, not a hazard or an irritant at cooked doses.",
      ],
      media: [],
    },
    {
      band: "9-12m",
      form: "Fully soft, sweet cooked onion as fine chopped bits or thin floppy strips stirred through eggs, beans, rice, and stews as an everyday flavor base.",
      passFailTest:
        "Pinch a strip — it should flatten silently with no crunch, and the pan should smell sweet rather than sharp.",
      whyThisForm:
        "Pincer-stage babies happily pick soft strips and mixed pieces out of dishes, and daily low-key onion exposure builds a palate ready for family cooking.",
      prepSteps: [
        "Cook as for 6–8 months, until fully translucent and floppy.",
        "Leave as fine bits, or cut thin short strips for self-feeding within a dish.",
        "Season the family pot with onion first, then portion the baby's serving before adding salt.",
      ],
      commonMistakes: [
        "Crunchy stir-fry onion — not unsafe like a hard vegetable, but unpleasant enough to sour the whole meal.",
      ],
      media: [],
    },
    {
      band: "12-24m",
      form: "Any fully cooked, floppy-soft onion in family dishes, from thin sautéed strips to caramelized bits melted into sauces, while raw onion is safe but usually refused for its sharp bite.",
      passFailTest:
        "Sample from the finished dish: cooked onion should be silky and sweet with no crunch; save raw onion experiments for tiny minced amounts, if at all.",
      whyThisForm:
        "Toddlers eat what the family eats, and onion's job is to make those shared dishes taste like real food — raw onion is merely a flavor gamble, not a safety issue.",
      prepSteps: [
        "Keep building family meals on a soft-cooked onion base.",
        "Try slow caramelized onions in pasta or on soft bread for natural sweetness.",
      ],
      commonMistakes: [
        "Skipping onion in the baby's portion out of habit — bland food now makes the family menu a harder sell later.",
      ],
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["beef", "lentils", "rice", "tomato"],
  tips: [
    "Think of onion as an ingredient, not a solo food — its job is making vegetables, beans, and meats taste like family cooking.",
    "Low heat plus a lid turns onion sweet and soft in about ten minutes with no browning skill required.",
    "Caramelized onions are a free sweetness upgrade for lentils, beans, and pasta — no sugar involved.",
    "Cook onion into the shared pot, portion out the baby's serving, and salt the rest afterward.",
  ],
  sources: [SOURCES.nhsFrom6Months, SOURCES.wicGuide, SOURCES.cdcFoodsAndDrinks],
  nutrients: ["fiber", "vitaminC"],
  servingGuidance: [
    {
      band: "6-8m",
      typicalAmount:
        "A teaspoon or so of melted-soft bits inside other foods — a pinch of flavor is the whole point.",
    },
    {
      band: "9-12m",
      typicalAmount:
        "A tablespoon of soft strips or bits within a dish — onion rarely needs its own serving.",
    },
    {
      band: "12-24m",
      typicalAmount:
        "A couple of spoonfuls through family dishes — however much the recipe happens to carry.",
    },
  ],
  watchOuts: [
    "Onion's fermentable fibers can make some babies gassy at first — start small and build up gradually.",
  ],
  emoji: "🧅",
};

export default onion;
