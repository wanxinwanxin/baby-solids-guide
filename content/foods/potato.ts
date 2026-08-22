import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const potato: Food = {
  slug: "potato",
  name: "Potato",
  aliases: ["white potato"],
  category: "vegetable",
  minAgeMonths: 6,
  ironRich: false,
  commonAllergen: null,
  chokingRisk: "low",
  nutritionHighlights: [
    "A source of potassium, which supports fluid balance and muscle function",
    "Provides vitamin C, especially when cooked in the skin",
    "Steady, easily accepted carbohydrate energy for rapid growth",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "Peeled potato boiled or steamed until it smashes with zero lumps, served as soft wedges about two adult fingers long and one adult finger wide.",
      passFailTest:
        "The squish test: a wedge should flatten between thumb and forefinger with gentle pressure, and a fork should slide through with no resistance.",
      whyThisForm:
        "A fist-grasping baby clamps the wedge and gnaws the end sticking out; a soft two-finger wedge is graspable, and fully cooked potato mashes on bare gums.",
      prepSteps: [
        "Peel a potato and cut into two-finger wedges.",
        "Boil or steam 12–15 minutes until a fork meets no resistance anywhere.",
        "Cool to warm and run the squish test on the thickest wedge.",
        "Serve one wedge at a time; a thin coat of olive oil keeps the surface from drying pasty.",
      ],
      commonMistakes: [
        "Serving dry, crumbly mash — it packs into a pasty ball in the mouth; loosen it with breast milk, formula, or olive oil until it drops off a tilted spoon.",
        "Undercooked wedges with a firm center that can snap into chunks.",
      ],
      cutDiagram: "batons",
      media: [],
    },
    {
      band: "9-12m",
      form: "Soft-cooked potato broken into rough chunks about the size of your pinky fingernail, or a smooth mash loosened with milk until it slides off a tilted spoon.",
      passFailTest:
        "Chunks should flatten easily between two fingers; a spoonful of mash turned sideways should slump off within a couple of seconds rather than cling.",
      whyThisForm:
        "Rough, slightly sticky potato chunks are forgiving pincer-grasp practice, while a properly loosened mash builds spoon skills without the pasty-bolus risk.",
      prepSteps: [
        "Cook potato fully soft as for 6–8 months.",
        "Break into pinky-nail chunks with a fork — ragged edges grip better than knife-cut cubes.",
        "For mash, whip in warm milk, formula, or olive oil until glossy and loose.",
      ],
      commonMistakes: [
        "Letting mash sit and stiffen — reheated potato dries out and needs re-loosening every time.",
      ],
      cutDiagram: "bite-size",
      media: [],
    },
    {
      band: "12-24m",
      form: "Soft roasted, boiled, or baked potato in bite-size pieces at family meals, with any mash kept loose enough to slide easily off the spoon.",
      passFailTest:
        "Pieces should still yield to firm finger pressure — crisp roasted edges are fine as long as the inside stays fluffy and soft.",
      whyThisForm:
        "Toddlers handle most family potato dishes now; the one texture rule that persists is avoiding dry, claggy mash that can wad up in the mouth.",
      prepSteps: [
        "Serve the family's potatoes — roasted, boiled, or baked — cut into bite-size pieces.",
        "Keep salt low by seasoning the toddler's portion before salting the pot.",
      ],
      commonMistakes: [
        "Handing over whole fries or firm roast potatoes with hard, sharp-crusted corners.",
      ],
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["egg", "cheese", "salmon", "broccoli"],
  tips: [
    "The mash rule of thumb: keep adding warm breast milk, formula, whole milk, or olive oil until a tilted spoonful slides off — dry-crumbly mash is the pasty-mouthful culprit.",
    "Yukon Gold and other waxy-yellow varieties mash creamier and less gluey than starchy russets for baby portions.",
    "Bake extra potatoes with dinner and refrigerate; a cold baked potato re-steams to squish-soft in two minutes.",
    "Rub wedges with a little olive oil before serving — it adds calories and stops the cut surface drying into a chalky skin.",
  ],
  sources: [SOURCES.wicGuide, SOURCES.nhsFrom6Months, SOURCES.aapMenu8to12],
  nutrients: ["potassium", "vitaminC"],
  servingGuidance: [
    {
      band: "6-8m",
      typicalAmount:
        "One or two soft pieces, served one at a time — some meals a nibble, some meals the whole piece, and both are the baby self-regulating.",
    },
    {
      band: "9-12m",
      typicalAmount:
        "A small handful of soft pieces, or a tablespoon or two of loose mash — top up while interest lasts.",
    },
    {
      band: "12-24m",
      typicalAmount:
        "Half a small potato in bite-size pieces at family meals is plenty for many toddlers — a starting point, never a quota.",
    },
  ],
  emoji: "🥔",
};

export default potato;
