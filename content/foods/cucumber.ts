import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const cucumber: Food = {
  slug: "cucumber",
  name: "Cucumber",
  aliases: [],
  category: "vegetable",
  minAgeMonths: 6,
  ironRich: false,
  commonAllergen: null,
  chokingRisk: "moderate",
  chokingNotes:
    "Cucumber's flesh stays firm and crisp — a piece that breaks off in the mouth is a hard chunk an early eater can't chew down. Mitigate by peeling, trimming away the seedy core, and keeping early spears big enough (two adult fingers wide) that gnawing can't break a bite free; once real bites appear, switch to paper-thin ribbons or thin bendable pieces.",
  nutritionHighlights: [
    "Mostly water — a hydrating, refreshing food for hot days and teething mouths",
    "Provides a small amount of vitamin K",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "A peeled cucumber spear with the seedy core trimmed away, cut about as long and as wide as two adult fingers together, served cold as a gnawing food rather than an eating food.",
      passFailTest:
        "Try to snap the spear in half with two fingers at one end — if you can break a piece off that easily, cut a thicker spear. Then check the gnawed end each time: retire the spear once teeth or gums start carving real notches.",
      whyThisForm:
        "A fist-grasping baby gnaws and sucks the cold spear for the sensation — the spear must be too wide to break a chunk from, because the flesh itself is too firm to gum into a safe swallow.",
      prepSteps: [
        "Peel a cucumber completely and quarter it lengthwise.",
        "Slice away the seedy core strip from each quarter.",
        "Cut spears two adult fingers long and wide, chill, and serve one at a time under close watch.",
      ],
      commonMistakes: [
        "Serving thin slices or small chunks at this age — small firm pieces are the exact hazard.",
        "Leaving the baby to keep working a spear once pieces start breaking free — swap in a fresh, intact one.",
      ],
      cutDiagram: "batons",
      media: [],
    },
    {
      band: "9-12m",
      form: "Peeled cucumber shaved into paper-thin ribbons with a vegetable peeler, or sliced into thin pinky-nail pieces flexible enough to bend without snapping.",
      passFailTest:
        "Fold a piece in half between two fingers — it should bend like a slice of soft cheese. Any piece that cracks instead of bending is too thick.",
      whyThisForm:
        "With a pincer grasp and stronger jaw come real bites, so the geometry flips: instead of an unbreakable spear, every piece is now thin enough to be harmless if swallowed poorly chewed.",
      prepSteps: [
        "Peel the cucumber, then shave long ribbons with a vegetable peeler, stopping at the seedy core.",
        "Alternatively slice thin half-moons no thicker than a coin and quarter them to pinky-nail size.",
        "Pile ribbons loosely so they're easy to pick apart.",
      ],
      commonMistakes: [
        "Keeping the big spear routine going after real bites appear — that's when spears become dangerous rather than safe.",
      ],
      cutDiagram: "ribbons",
      media: [],
    },
    {
      band: "12-24m",
      form: "Peeled cucumber quartered lengthwise into slim spears, each thin enough that a toddler's bite crushes soft rather than snapping off a thick hard plug.",
      passFailTest:
        "Bite test one yourself: a bite should shear off a thin, flat sliver, not a fat cylinder. If your bite yields a chunky plug, quarter the spears again.",
      whyThisForm:
        "Toddlers with molars can process thin crisp pieces, but wide cucumber batons still break into firm chunks bigger than they can reliably grind.",
      prepSteps: [
        "Peel, quarter lengthwise, and remove the seedy core.",
        "Cut each quarter in half lengthwise again for slim, manageable spears.",
      ],
      commonMistakes: [
        "Serving thick unpeeled rounds off the salad plate — coins of firm cucumber remain a risky shape.",
      ],
      cutDiagram: "quarter-lengthwise",
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["yogurt", "avocado", "cheese"],
  tips: [
    "Straight-from-the-fridge cucumber is a teething hero — the cold spear soothes sore gums while doubling as food exposure.",
    "English (hothouse) cucumbers have thinner skins and barely-there seeds, which makes prep faster and the texture more even.",
    "Scoop the seed channel out with a teaspoon after halving lengthwise — quicker and neater than knife-trimming each quarter.",
    "Drag a fork's tines down a peeled spear before cutting: the ridges give slippery cucumber real grip in a small fist.",
  ],
  sources: [SOURCES.wicGuide, SOURCES.nhsFrom6Months, SOURCES.cdcChokingHazards],
  nutrients: ["vitaminC"],
  servingGuidance: [
    {
      band: "6-8m",
      typicalAmount:
        "One chilled stick at a time — expect far more gnawing than swallowing; the exploring is the point.",
      note: "Cold from the fridge, it doubles as gum relief on teething days.",
    },
    {
      band: "9-12m",
      typicalAmount:
        "A small handful of ribbons or thin pieces — scatter a few at a time and let the baby set the pace.",
    },
    {
      band: "12-24m",
      typicalAmount:
        "One or two slim sticks alongside the meal — a starting point, not a target; appetite swings day to day.",
    },
  ],
  watchOuts: [
    "Mostly water and very low in calories — serve it beside richer foods rather than letting it crowd them out.",
  ],
  emoji: "🥒",
};

export default cucumber;
