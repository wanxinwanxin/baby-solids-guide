import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const millet: Food = {
  slug: "millet",
  name: "Millet",
  aliases: [],
  category: "grain",
  minAgeMonths: 6,
  ironRich: false,
  commonAllergen: null,
  chokingRisk: "low",
  nutritionHighlights: [
    "A gentle, naturally gluten-free whole grain that widens the porridge rotation beyond oats and rice",
    "Whole-grain fiber supports digestion as the menu expands",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "Millet simmered in extra unsalted water into a smooth, spoonable porridge about the thickness of yogurt, mashed or whisked until no whole grains remain.",
      passFailTest:
        "Drag a spoon across the surface: the track should hold its shape for a second, and a spoonful tipped sideways should slide off in one soft mound.",
      whyThisForm:
        "At 6 months a smooth, thick porridge is the texture a new eater can move safely with the tongue, and it clings to a preloaded spoon that a whole-fist grasp can manage.",
      prepSteps: [
        "Toast millet dry in the pan for 2–3 minutes until fragrant — optional, but it adds a nutty flavor.",
        "Simmer 1 part millet in 3–4 parts unsalted water for 20–25 minutes, stirring, until the grains burst and turn creamy.",
        "Mash or whisk smooth, thin with breastmilk, formula, or water to yogurt thickness, and cool to warm.",
      ],
      commonMistakes: [
        "Using the fluffy 2-to-1 pilaf ratio — dry, separate grains sift straight through a little fist.",
        "Serving it fresh off the stove while the center of the bowl is still scalding.",
      ],
      cutDiagram: "mash",
      media: [],
    },
    {
      band: "9-12m",
      form: "Wet-cooked millet pressed while still warm into soft, sticky clumps about the size of your pinky fingernail that hold together for a pincer grip.",
      passFailTest:
        "Lift one clump with your own thumb and forefinger: it should survive the pick-up, then squash flat with light pressure — crumbly clumps need wetter millet.",
      whyThisForm:
        "Around 9 months the pincer grasp emerges, and small tacky clumps let the baby practice precision pick-ups with a texture soft enough to gum flat.",
      prepSteps: [
        "Cook millet on the wet, porridge-y side as for 6–8 months, but stop mashing — soft whole grains are welcome now.",
        "While warm, pinch off pinky-nail clumps with damp fingers, or fold millet into thick yogurt or mashed beans.",
        "Offer a few clumps at a time to discourage cheek-stuffing.",
      ],
      commonMistakes: [
        "Fluffing the millet so the grains separate — separation is exactly what you don't want at this stage.",
      ],
      cutDiagram: "bite-size",
      media: [],
    },
    {
      band: "12-24m",
      form: "Fluffy millet moistened with the sauce of the family dish, eaten with a toddler spoon or pinched into small thumbnail-size clusters by hand.",
      passFailTest:
        "Load a toddler spoon and tip it slowly: moistened millet should cling for a moment rather than pour straight off, so a self-feeder can land the bite.",
      whyThisForm:
        "Toddlers are drilling utensil skills, and slightly sticky millet is forgiving on a spoon; molars and rotary chewing handle fluffier textures now.",
      prepSteps: [
        "Cook at a 2-to-1 water ratio for a fluffier grain, then moisten with broth, sauce, or a spoonful of the family stew.",
        "Serve in a bowl with a toddler spoon, keeping a few pressed clusters on the tray for hand backup.",
      ],
      commonMistakes: [
        "Serving millet seasoned from the adult pot with a heavy hand of salt.",
      ],
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["butternut-squash", "banana", "chicken", "yogurt"],
  tips: [
    "Toasting millet dry before simmering deepens the flavor from bland to nutty — worth the extra three minutes.",
    "One grain, two textures: 2 parts water makes fluffy pilaf for the family, 3–4 parts makes baby porridge from the same bag.",
    "Millet stiffens dramatically as it cools — re-thin leftovers with a splash of water or milk and re-whisk before serving.",
    "Always cook in unsalted water; season the family's share after the baby's portion comes out.",
  ],
  sources: [SOURCES.wicGuide, SOURCES.nhsFrom6Months],
  nutrients: ["fiber"],
  servingGuidance: [
    {
      band: "6-8m",
      typicalAmount:
        "A tablespoon or two of porridge from preloaded spoons — much of it is exploration, and that counts.",
    },
    {
      band: "9-12m",
      typicalAmount:
        "A couple of tablespoons pressed into small clumps, offered a few pieces at a time while the tray keeps clearing.",
    },
    {
      band: "12-24m",
      typicalAmount:
        "A quarter to half cup of moistened millet with the family meal — a starting point the toddler resizes daily.",
    },
  ],
  watchOuts: [
    "Instant millet porridge pouches and puffed-millet snacks often carry added sugar or salt — plain dry millet cooked at home stays clean.",
  ],
  emoji: "🌾",
};

export default millet;
