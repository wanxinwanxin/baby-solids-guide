import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const tofu: Food = {
  slug: "tofu",
  name: "Tofu",
  aliases: ["bean curd", "soybean curd"],
  category: "protein",
  minAgeMonths: 6,
  ironRich: true,
  commonAllergen: "soy",
  chokingRisk: "low",
  nutritionHighlights: [
    "A plant protein that also delivers iron for rapidly growing infants",
    "Calcium-set tofu contributes meaningful calcium for bone growth",
    "Naturally soft texture makes it one of the easiest protein foods to serve safely",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "A baton of firm tofu about the length and width of two adult fingers, patted dry, or silken tofu stirred smooth into a puree the baby already knows.",
      passFailTest:
        "Press the baton between thumb and forefinger — it should dent and start to crumble under gentle pressure. If it springs back like an eraser, it's an extra-firm block better suited to mashing.",
      whyThisForm:
        "A palmar-grasp baby traps food in a fist and gnaws the part sticking out, so a two-finger-wide baton of naturally soft tofu is close to an ideal first protein; silken tofu covers the same soy exposure for spoon-fed babies.",
      prepSteps: [
        "Drain a block of firm tofu, pat dry, and cut into batons the length and width of two adult fingers (no cooking required, or warm briefly).",
        "For spoon feeding, whisk a spoonful of silken tofu into a familiar fruit or vegetable puree.",
        "First time: serve early in the day, a small amount, and watch for 2 hours.",
        "Serve alongside familiar foods, never another new food, so any reaction can be traced to the soy.",
      ],
      commonMistakes: [
        "Using pre-seasoned, fried, or marinated tofu — the sodium load is far too high for an infant.",
        "Serving batons straight from a wet block: slippery tofu shoots out of small fists, so pat it dry first.",
      ],
      cutDiagram: "batons",
      media: [],
    },
    {
      band: "9-12m",
      form: "Firm tofu diced into soft cubes about the size of your pinky fingernail, rolled in a pinch of ground oat cereal or crushed cereal so the slippery pieces are easier to pick up.",
      passFailTest:
        "Squeeze a cube between two fingers — it should flatten or crumble without effort. Then check grip: if pieces keep skating off the tray, add more dry coating.",
      whyThisForm:
        "Small soft cubes are perfect fodder for the emerging pincer grasp; a light dry coating solves tofu's one real problem at this age, which is slipperiness rather than firmness.",
      prepSteps: [
        "Cut drained firm tofu into pinky-nail cubes.",
        "Toss the cubes in a pinch of ground infant oat cereal or finely crushed low-salt cereal for traction.",
        "Offer a few cubes at a time, warm or at room temperature.",
      ],
      commonMistakes: [
        "Pan-frying until a tough, chewy crust forms — a crisp shell defeats the soft interior.",
        "Giving up after the baby fumbles slippery pieces instead of adding a dry coating.",
      ],
      cutDiagram: "bite-size",
      media: [],
    },
    {
      band: "12-24m",
      form: "Bite-size pieces of firm or extra-firm tofu, plain or lightly pan-warmed in a little oil, that still dent easily when pressed between two fingers.",
      passFailTest:
        "Press a piece between two fingers: it should give and dent readily. A deep-fried or heavily seared piece that resists pressure is too tough.",
      whyThisForm:
        "Toddlers with molars coming in can handle slightly firmer textures and mixed dishes, so tofu can now appear in family stir-fries and soups — kept low-salt and never deep-fried to a leathery shell.",
      prepSteps: [
        "Cube tofu bite-size and warm it gently in family dishes like low-sodium soups or soft stir-fries.",
        "Keep the seasoning on the family's portion and the toddler's portion low-salt.",
      ],
      commonMistakes: [
        "Sharing restaurant-style fried or heavily sauced tofu — sodium and tough crusts are the issues, not the tofu.",
      ],
      cutDiagram: "bite-size",
      media: [],
    },
  ],
  firstFoodPick: true,
  flavorPairings: ["sweet-potato", "avocado", "rice", "broccoli"],
  tips: [
    "Firmness guide: silken for stirring into purees, firm for batons and cubes; extra-firm can be too rubbery for the earliest eaters.",
    "Pat batons dry with a paper towel before serving — dry tofu is dramatically easier for a fist to hold onto.",
    "Slippery-cube fix: a pinch of ground infant oat cereal on the outside adds grip without changing the flavor.",
    "Tofu takes on any flavor: warm batons briefly in the (unsalted) sauce or broth from the family meal for free flavor exposure.",
  ],
  sources: [SOURCES.aaaaiFoodAllergy, SOURCES.wicGuide, SOURCES.nhsFrom6Months],
  nutrients: ["iron", "protein", "calcium"],
  servingGuidance: [
    {
      band: "6-8m",
      typicalAmount:
        "One or two two-finger sticks of firm tofu, or a tablespoon of silken tofu stirred into a familiar puree.",
      frequency: "About twice a week once tolerated keeps the soy exposure steady.",
    },
    {
      band: "9-12m",
      typicalAmount:
        "A small handful of coated cubes, offered a few at a time — refill while the pincer practice continues.",
    },
    {
      band: "12-24m",
      typicalAmount:
        "A few tablespoons of bite-size pieces in family soups or soft stir-fries — the toddler's appetite does the portioning.",
    },
  ],
  watchOuts: [
    "Pre-marinated, fried, or seasoned tofu products are sodium traps — start from a plain block and season the toddler's portion lightly.",
  ],
  emoji: "🍲",
};

export default tofu;
