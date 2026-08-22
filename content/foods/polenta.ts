import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const polenta: Food = {
  slug: "polenta",
  name: "Polenta",
  aliases: ["cornmeal porridge", "grits"],
  category: "grain",
  minAgeMonths: 6,
  ironRich: false,
  commonAllergen: null,
  chokingRisk: "low",
  nutritionHighlights: [
    "Cornmeal that is enriched or fortified adds iron and B vitamins to an easy energy base",
    "Naturally gluten-free and mild-flavored, making it a friendly canvas for new tastes",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "Cornmeal simmered in unsalted water or milk to a smooth, thick porridge served on a preloaded spoon, or chilled until set and cut into soft sticks about two adult fingers long and one wide.",
      passFailTest:
        "For porridge, a spoon dragged through should leave a slow-closing trail; a set stick should hold its shape when lifted yet smash flat between thumb and finger with gentle pressure.",
      whyThisForm:
        "Set polenta is one of the few grains that becomes a true graspable stick for a palmar-grasp baby, while the porridge form works for spoon feeding — both mash effortlessly against bare gums.",
      prepSteps: [
        "Whisk 1 part cornmeal into 4–5 parts simmering unsalted water or whole milk and stir 5–10 minutes until thick and smooth.",
        "For sticks, pour the hot polenta about a finger deep into a small dish and chill 1–2 hours until fully set.",
        "Cut the set slab into sticks roughly two adult fingers long and one finger wide.",
        "Serve porridge warm on a preloaded spoon, or hand over one stick at a time.",
      ],
      commonMistakes: [
        "Setting the polenta too thin and firm — a rubbery, dense slab is harder to gum than a soft, thick-cut stick.",
        "Serving straight from the pot while the center of the porridge is still scalding.",
      ],
      cutDiagram: "batons",
      media: [],
    },
    {
      band: "9-12m",
      form: "Set polenta cut into soft cubes about the size of your pinky fingernail, each holding its shape on pick-up but squashing flat under gentle finger pressure.",
      passFailTest:
        "Press one cube between two fingers: it should flatten easily like a firm pudding — if it bounces back rubbery, whisk the next batch with more liquid.",
      whyThisForm:
        "Set polenta cubes have a slightly tacky surface that is unusually forgiving for a brand-new pincer grasp, giving easy wins on the way to harder foods.",
      prepSteps: [
        "Make and set polenta as for 6–8 months.",
        "Cut into pinky-nail cubes and scatter a few at a time on the tray.",
        "Keep serving the porridge form by spoon alongside, for texture variety.",
      ],
      commonMistakes: [
        "Coating cubes in oil to stop sticking — a little surface tack is exactly what helps small fingers succeed.",
      ],
      cutDiagram: "bite-size",
      media: [],
    },
    {
      band: "12-24m",
      form: "Creamy polenta as a family side topped with soft vegetables or shredded meat, or pan-warmed set-polenta pieces no bigger than two adult thumbnails.",
      passFailTest:
        "A serving spoon should stand briefly in creamy polenta before slowly tipping, and any pan-warmed piece should still yield fully to firm finger pressure.",
      whyThisForm:
        "Toddlers practicing utensils get a forgiving, cling-to-the-spoon food, while molars handle set pieces warmed until tender — polenta grows with the family menu.",
      prepSteps: [
        "Serve creamy polenta under the family's stew, beans, or roasted vegetables.",
        "Warm set-polenta pieces gently in a pan until heated through and tender, not crisp-fried hard.",
      ],
      commonMistakes: [
        "Loading the pot with salt and cheese before separating the toddler's portion.",
      ],
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["broccoli", "chicken", "tomato", "cheese"],
  tips: [
    "The pour-and-chill trick is the workhorse: one pot of porridge tonight becomes a tray of graspable sticks tomorrow.",
    "Cook the ratio wet — about 1:4 or 1:5 cornmeal to liquid — so the set version stays soft; stiff polenta sets rubbery.",
    "Skip the salt and stir in a spoonful of unsalted vegetable puree or a little grated cheese for flavor instead.",
    "Set polenta freezes well: cut sticks, freeze flat on a tray, and rewarm covered so they steam soft rather than dry out.",
  ],
  sources: [SOURCES.wicGuide, SOURCES.nhsWeaning, SOURCES.cdcFoodsAndDrinks],
  nutrients: ["iron"],
  servingGuidance: [
    {
      band: "6-8m",
      typicalAmount:
        "A couple of spoonfuls of porridge, or one soft stick — practice, not portions, is the point.",
    },
    {
      band: "9-12m",
      typicalAmount:
        "A small handful of set cubes plus a spoonful or two of porridge — follow the pace the baby sets.",
    },
    {
      band: "12-24m",
      typicalAmount:
        "A quarter to half cup of creamy polenta under the family topping — free to finish or leave.",
    },
  ],
  emoji: "🌽",
};

export default polenta;
