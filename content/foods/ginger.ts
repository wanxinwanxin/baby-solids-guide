import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const ginger: Food = {
  slug: "ginger",
  name: "Ginger",
  aliases: ["fresh ginger", "ground ginger"],
  category: "herb-spice",
  minAgeMonths: 6,
  ironRich: false,
  commonAllergen: null,
  chokingRisk: "low",
  nutritionHighlights: [
    "The real value is flavor variety, not nutrition — bright, warming seasoning that needs no salt or sugar",
    "Like other spices it is concentrated plant matter, contributing a trace of fiber at the pinch-sized amounts used",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "A small pinch of ground ginger, or a few strands of finely grated fresh ginger, stirred through a smooth puree or porridge until completely dispersed with no fibrous bits.",
      passFailTest:
        "Taste a spoonful yourself: a gentle warmth in the background, no stringy ginger fibers, and no single bite noticeably hotter than the rest.",
      whyThisForm:
        "Flavor variety without salt or sugar is the whole point — a whisper of ginger in a familiar mash teaches a baby that food has range, long before opinions harden.",
      prepSteps: [
        "Start with about 1/8 teaspoon of ground ginger — or a few strands grated on the finest rasp — per serving.",
        "Stir it through carrot mash, pear puree, or porridge until fully dispersed.",
        "Taste before serving and repeat the same gentle dose across several meals before building up.",
      ],
      commonMistakes: [
        "Grating coarsely so stringy fibers end up in the food — use the finest side of the grater.",
        "Starting at adult strength — ginger's heat builds fast, and one harsh bowl can put a baby off the smell.",
      ],
      media: [],
    },
    {
      band: "9-12m",
      form: "A pinch of ground or finely grated fresh ginger mixed into mashed vegetables, oatmeal, lentils, or a meat dish, tasted by you first for gentle rather than spicy warmth.",
      passFailTest:
        "Your own taste test is the gate: pleasant warmth, not heat that lingers on the tongue — if you notice a burn, dilute the dish with more of the base food.",
      whyThisForm:
        "As the pincer grasp takes over and finger foods multiply, seasoning the soft base foods keeps the flavor education running alongside the motor skills.",
      prepSteps: [
        "Grate fresh ginger straight from the freezer on a fine rasp into cooking dishes — it disperses as it melts.",
        "Fold a pinch into chicken, lentil, or rice dishes during cooking rather than at the table.",
      ],
      commonMistakes: [
        "Adding raw chunks or coins of fresh ginger to food — the flavor should arrive grated or ground, never in pieces.",
      ],
      media: [],
    },
    {
      band: "12-24m",
      form: "Ginger cooked into family dishes — grated into soups, rice, stir-fries, or stewed fruit — at a strength you find pleasantly warm rather than spicy when you taste it.",
      passFailTest:
        "The shared-pot test: if the dish is comfortable for you and has no whole ginger pieces in it, it is ready for the toddler's plate.",
      whyThisForm:
        "Eating the family's real, seasoned food is the destination — a toddler who has grown up with ginger's warmth treats it as normal, not as a hurdle.",
      prepSteps: [
        "Season the family pot as usual, keeping the heat gentle and fishing out any ginger slices used for infusing.",
        "Let the toddler serve from the same dishes as everyone else.",
      ],
      commonMistakes: [
        "Serving candied or pickled ginger — the sugar, vinegar bite, and chewy texture all belong to a much later stage.",
      ],
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["carrot", "chicken", "pear", "rice"],
  tips: [
    "Keep a knob of fresh ginger in the freezer — it grates to a fine, fiber-free snow while frozen and never goes moldy in a drawer.",
    "No need to peel if you grate finely; the skin disappears on a fine rasp.",
    "Ground and fresh ginger taste different — ground is warmer and mellower, fresh is brighter — so both are worth rotating through.",
    "Ginger, carrot, and a little olive oil is a reliable first 'seasoned' mash if you want a starting recipe.",
  ],
  sources: [SOURCES.nhsFrom6Months, SOURCES.cdcFoodsAndDrinks, SOURCES.wicGuide],
  nutrients: ["fiber"],
  servingGuidance: [
    {
      band: "6-8m",
      typicalAmount:
        "A small pinch (about 1/8 teaspoon) stirred into one serving — the flavor is the serving.",
    },
    {
      band: "9-12m",
      typicalAmount:
        "A pinch per dish, built up slowly across meals as the baby shows enjoyment.",
    },
    {
      band: "12-24m",
      typicalAmount:
        "Season the family pot to a gentle warmth — a pinch or two — and share the same food.",
    },
  ],
  watchOuts: [
    "Ginger's heat scales fast — a heavy hand turns a friendly dish sharply spicy, so build up from a tiny pinch and always taste first.",
  ],
  emoji: "🫚",
};

export default ginger;
