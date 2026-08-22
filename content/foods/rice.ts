import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const rice: Food = {
  slug: "rice",
  name: "Rice",
  aliases: [],
  category: "grain",
  minAgeMonths: 6,
  ironRich: false,
  commonAllergen: null,
  chokingRisk: "low",
  nutritionHighlights: [
    "Enriched white rice contributes iron and B vitamins along with easy carbohydrate energy",
    "Gentle on new digestive systems and one of the least allergenic grains",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "Soft-cooked rice stirred into a thick familiar puree until spoonable, or overcooked short-grain rice pressed into a sticky log about the size of two adult fingers.",
      passFailTest:
        "Squeeze a pressed log gently in your fist: it should hold its shape on pick-up and then smash flat between thumb and finger with light pressure.",
      whyThisForm:
        "A palmar-grasping baby can hold a sticky rice log like any other stick food, and rice bound into a mash rides a spoon — loose grains just sift through a fist (frustrating, though not dangerous).",
      prepSteps: [
        "Use short-grain or sushi-style rice, which cooks up naturally sticky.",
        "Simmer in extra unsalted water 5–10 minutes past the package time, until the grains are swollen and soft.",
        "Press warm rice firmly into finger-length logs with damp hands, or stir spoonfuls into a thick vegetable puree.",
        "Cool to warm and serve one log or a preloaded spoon at a time.",
      ],
      commonMistakes: [
        "Serving loose, fluffy long-grain rice — it falls apart in a fist and ends the meal in frustration.",
        "Packing logs while the rice is cold, so they crumble instead of holding together.",
      ],
      cutDiagram: "mash",
      media: [],
    },
    {
      band: "9-12m",
      form: "Sticky, well-cooked rice pinched into loose clumps about the size of your pinky fingernail, moist enough to hold together between a thumb and forefinger.",
      passFailTest:
        "Pick up one clump with your own pincer grip: it should survive the lift, then squash easily — clumps that crumble on pick-up need wetter, stickier rice.",
      whyThisForm:
        "Around 9 months the pincer grasp takes over, and small tacky clumps are the right target size — big enough to succeed with, soft enough to gum flat.",
      prepSteps: [
        "Cook as for 6–8 months, keeping the rice on the wet, sticky side.",
        "Pinch off pinky-nail clumps, or fold rice into thick yogurt or mashed beans.",
        "Offer a few clumps at a time to keep the pace calm.",
      ],
      commonMistakes: [
        "Rinsing or fluffing cooked rice so the grains separate — separation is exactly what you don't want at this stage.",
      ],
      media: [],
    },
    {
      band: "12-24m",
      form: "Soft rice served with family meals — folded into stews, formed into small palm-pressed balls, or eaten with a toddler spoon from a bowl of slightly sticky grains.",
      passFailTest:
        "Load a toddler spoon and tip it slowly sideways: the rice should cling for a moment rather than pour straight off, which means a self-feeding toddler can land the bite.",
      whyThisForm:
        "Utensil practice dominates this stage, and slightly sticky rice is one of the most forgiving spoon foods; molars and rotary chewing handle mixed rice dishes well now.",
      prepSteps: [
        "Serve rice moistened with the sauce or broth of the family dish.",
        "For finger food on the go, press small rice balls with damp hands.",
      ],
      commonMistakes: [
        "Serving heavily salted or soy-sauce-seasoned rice dishes straight from the adult table.",
      ],
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["lentils", "salmon", "avocado", "black-beans"],
  tips: [
    "Rotate rice with other grains — oats, barley, and quinoa — rather than serving it daily, to limit cumulative exposure to the inorganic arsenic rice can carry.",
    "Cooking rice like pasta — in plenty of excess water, then drained — meaningfully reduces its arsenic content; rinse before cooking too.",
    "Short-grain and sushi rice clump far better than long-grain; save the fluffy basmati for the adults.",
    "Press logs and balls with damp hands while the rice is still warm — cold rice loses its stick and crumbles.",
  ],
  sources: [SOURCES.fdaArsenic, SOURCES.wicGuide, SOURCES.nhsFrom6Months],
  nutrients: ["iron", "folate"],
  servingGuidance: [
    {
      band: "6-8m",
      typicalAmount:
        "One or two pressed sticky logs, or a tablespoon stirred into a thick puree — served one piece at a time at the baby's pace.",
    },
    {
      band: "9-12m",
      typicalAmount:
        "A couple of tablespoons pinched into small clumps, offered a few pieces at a time — more while the tray keeps clearing.",
    },
    {
      band: "12-24m",
      typicalAmount:
        "A quarter to half cup of soft rice with the family meal — a starting point the toddler resizes day by day.",
    },
  ],
  watchOuts: [
    "Vary grains across the week — rice carries more inorganic arsenic than oats or barley, so it shouldn't be the everyday default.",
  ],
  emoji: "🍚",
};

export default rice;
