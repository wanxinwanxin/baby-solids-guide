import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const kidneyBeans: Food = {
  slug: "kidney-beans",
  name: "Kidney beans",
  aliases: ["red kidney beans", "rajma"],
  category: "legume",
  minAgeMonths: 6,
  ironRich: true,
  commonAllergen: null,
  chokingRisk: "moderate",
  chokingNotes:
    "Kidney beans are large, rounded, and wrapped in a notably thick, glossy skin that can carry an intact bean into the airway. Mitigate by cooking until truly soft, then smashing every bean completely flat before 9 months and halving or smashing through 12 months; whole soft beans wait for toddlerhood.",
  nutritionHighlights: [
    "One of the iron-richest common beans — a workhorse for the 6-month iron gap",
    "Plant protein and folate supporting rapid growth",
    "Fiber that keeps a new eater's digestion moving",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "Fully cooked kidney beans mashed into a thick, spreadable paste with every thick skin broken down, no intact or half-intact bean left in the serving.",
      passFailTest:
        "Rub a spoonful between your fingers: soft throughout, with no leathery skin flaps or firm centers — and a visual sweep finds no whole beans in the bowl.",
      whyThisForm:
        "Kidney beans' thick skins don't dissolve on their own, so a deliberate, thorough mash is what turns a risky rounded bean into a safe iron-dense paste a gumming baby can manage.",
      prepSteps: [
        "Use canned kidney beans (already fully cooked), drained and rinsed well — or boil soaked dried beans hard for at least 10 minutes, then simmer until they crush effortlessly.",
        "Mash with a fork or the back of a spoon until skins and flesh are one thick paste, thinning with water as needed.",
        "Serve on a preloaded spoon or spread a layer on the tray for hand-scooping.",
      ],
      commonMistakes: [
        "A lazy mash that leaves skin-wrapped halves behind — the thick skins are exactly the part that must be broken.",
        "Serving beans from an under-simmered pot of dried beans — undercooked kidney beans are unsafe, full stop.",
        "Using the seasoned chili-style cans instead of plain beans.",
      ],
      cutDiagram: "mash",
      media: [],
    },
    {
      band: "9-12m",
      form: "Soft-cooked kidney beans smashed flat one by one between your fingers or halved lengthwise, scattered so the baby picks up single squashed pieces.",
      passFailTest:
        "Lift a few pieces from the tray: each is visibly flattened or halved, and smears under gentle fingertip pressure with no springy skin resistance.",
      whyThisForm:
        "Flattened beans give the emerging pincer grasp a real target while eliminating the rounded, thick-skinned geometry — the flattening does the safety work the baby's gums can't.",
      prepSteps: [
        "Confirm softness on a sample bean, then press each one flat or halve it.",
        "Fold the flattened beans into rice or soft vegetables, or scatter a few at a time.",
        "Keep the baby's portion unsalted; season the family pot afterward.",
      ],
      commonMistakes: [
        "Halving crosswise into two rounded plugs instead of flattening — the smash is safer than the cut.",
        "Trusting teeth over texture: springy beans need more cooking regardless of age.",
      ],
      media: [],
    },
    {
      band: "12-24m",
      form: "Whole soft kidney beans served loose in mild chili, rajma, rice bowls, and soups, each bean squashing between two fingers with no firm center.",
      passFailTest:
        "Sample-test a few from the pot: every bean should flatten under two fingers; any that resist go back to simmer.",
      whyThisForm:
        "With molars erupting and chewing maturing, whole soft beans become manageable, and kidney beans' sturdy shape survives family stews without disintegrating.",
      prepSteps: [
        "Portion the toddler's serving from family chili or rajma before adding salt and heavy spice.",
        "Keep beans simmering until squash-soft even when adults prefer them firmer.",
      ],
      commonMistakes: [
        "Serving marinated salad-bar kidney beans — firm, vinegary, and salty is three strikes.",
      ],
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["rice", "sweet-potato", "avocado", "tomato"],
  tips: [
    "Canned is the easy safe route: kidney beans in a can are already fully cooked, so the only jobs left are rinsing and mashing.",
    "Cooking from dried? Soak, then boil hard for at least 10 minutes before simmering — and never cook raw kidney beans in a slow cooker on low.",
    "A potato masher processes a whole batch faster than a fork, and warm beans give up their skins far more easily than cold.",
    "Serve alongside tomato or bell pepper — vitamin C in the same meal helps the plant iron absorb.",
  ],
  sources: [SOURCES.wicGuide, SOURCES.cdcChokingHazards, SOURCES.nhsFrom6Months],
  nutrients: ["iron", "protein", "fiber", "folate"],
  servingGuidance: [
    {
      band: "6-8m",
      typicalAmount:
        "One to two tablespoons of thick mash — refill by the spoonful while interest holds.",
    },
    {
      band: "9-12m",
      typicalAmount:
        "Two to three tablespoons of flattened beans, offered a small scatter at a time.",
    },
    {
      band: "12-24m",
      typicalAmount:
        "A quarter cup or so of whole soft beans in the family dish — the toddler's appetite does the portioning.",
    },
  ],
  watchOuts: [
    "Raw or undercooked kidney beans contain a natural toxin (phytohaemagglutinin) that causes real poisoning — canned beans are fully cooked and safe, but dried beans must be boiled hard for at least 10 minutes and then cooked until soft, never slow-cooked from raw.",
    "The canning liquid is salty — drain and rinse before every use, and skip pre-seasoned chili beans.",
    "A sudden fiber jump can bring a gassy day or two — scale portions up gradually.",
  ],
  emoji: "🫘",
};

export default kidneyBeans;
