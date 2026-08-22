import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const quinoa: Food = {
  slug: "quinoa",
  name: "Quinoa",
  aliases: [],
  category: "grain",
  minAgeMonths: 6,
  ironRich: true,
  commonAllergen: null,
  chokingRisk: "low",
  nutritionHighlights: [
    "A complete plant protein containing all nine essential amino acids",
    "A useful plant source of iron, a critical nutrient from 6 months on",
    "Naturally gluten-free, handy for families avoiding gluten grains",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "Rinsed quinoa simmered with extra water until the grains burst open and turn porridge-soft, then stirred into a thick familiar mash or vegetable puree so it holds together on a spoon.",
      passFailTest:
        "Drag a spoon through the bowl: the mixture should hold a soft mound like thick oatmeal, not scatter into loose individual grains or run off the spoon.",
      whyThisForm:
        "Young babies eat from a preloaded spoon or a fisted scoop, and loose tiny grains simply fall out of a palmar grip — binding quinoa into a mash makes every mouthful actually arrive.",
      prepSteps: [
        "Rinse quinoa in a fine-mesh sieve under cold water until the water runs clear, to wash off the bitter saponin coating.",
        "Simmer 1 part quinoa in about 2.5 parts unsalted water for 18–20 minutes, until the spirals pop free and the grains are fully soft.",
        "Stir into a thick puree the baby already knows — sweet potato, carrot, or plain yogurt — until it mounds on a spoon.",
        "Serve warm on a preloaded spoon or as a thick scoopable pile on the tray.",
      ],
      commonMistakes: [
        "Skipping the rinse — unwashed quinoa tastes bitter and soapy, and one bad first taste can put a baby off it.",
        "Serving loose fluffy grains at this age: not dangerous, just so frustrating that the meal ends in tears.",
      ],
      cutDiagram: "mash",
      media: [],
    },
    {
      band: "9-12m",
      form: "Soft-cooked quinoa served slightly sticky and pressed into loose clumps about the size of your pinky fingernail, with a few individual grains scattered alongside for fine-motor practice.",
      passFailTest:
        "Pinch a clump between two fingers: it should hold together on pick-up, then smash flat with gentle pressure.",
      whyThisForm:
        "The new pincer grasp is precise enough to chase individual grains, which makes quinoa one of the best fine-motor training foods — clumps keep the meal filling while single grains build the skill.",
      prepSteps: [
        "Cook as for 6–8 months but with slightly less water, so the quinoa is sticky rather than soupy.",
        "Press spoonfuls together into pinky-nail clumps, or fold into thick yogurt.",
        "Scatter a pinch of loose grains next to the clumps and let the baby practice picking them up.",
      ],
      commonMistakes: [
        "Rinsing cooked quinoa or fluffing it with a fork — dry, separated grains stop clumping and get flung instead of eaten.",
      ],
      media: [],
    },
    {
      band: "12-24m",
      form: "Quinoa spooned into family dishes — stirred through soups, folded into soft veggie patties, or served as a lightly sticky pilaf eaten with a toddler spoon or fingers.",
      passFailTest:
        "Squeeze a spoonful in your fist: it should pack loosely like damp sand rather than pour like dry rice, so a toddler spoon can lift it.",
      whyThisForm:
        "Toddlers are practicing utensils, and a slightly sticky grain rides a self-loaded spoon far better than a fluffy one; molars handle the mixed textures of family dishes.",
      prepSteps: [
        "Cook a weekly batch and stir portions into soups, stews, or scrambled egg.",
        "For finger food, mix with mashed beans or egg and pan-cook small soft patties.",
      ],
      commonMistakes: [
        "Seasoning the family pot heavily with salt before setting aside the toddler portion.",
      ],
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["sweet-potato", "black-beans", "avocado", "yogurt"],
  tips: [
    "Always rinse until the water runs clear — the saponin coating is the source of quinoa's bitter reputation.",
    "Use more water than the package says (about 1:2.5) and simmer to a deliberate mush for babies; save fluffy quinoa for the adults.",
    "Cook it slightly wet and skip the fork-fluff: stickiness is a feature, because clumps are what little hands can actually pick up.",
    "Batch-cook, portion into an ice-cube tray, and freeze — a cube rewarms in seconds and stirs straight into any puree.",
  ],
  sources: [SOURCES.wicGuide, SOURCES.whoComplementary, SOURCES.cdcFoodsAndDrinks],
};

export default quinoa;
