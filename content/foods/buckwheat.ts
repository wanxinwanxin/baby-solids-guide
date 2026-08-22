import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const buckwheat: Food = {
  slug: "buckwheat",
  name: "Buckwheat",
  aliases: ["kasha", "buckwheat groats"],
  category: "grain",
  minAgeMonths: 6,
  ironRich: true,
  commonAllergen: null,
  chokingRisk: "low",
  nutritionHighlights: [
    "One of the more iron-dense grains in the pantry — a real contributor to a baby's high iron needs",
    "Naturally gluten-free despite the name: buckwheat is a seed crop, not a relative of wheat",
    "Brings whole-grain fiber and a well-rounded plant protein to the breakfast rotation",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "Finely ground buckwheat or cream-of-buckwheat cooked into a smooth, thick porridge that mounds on a spoon, about the thickness of full-fat yogurt.",
      passFailTest:
        "Tip a loaded baby spoon slowly sideways: the porridge should cling for a beat and slide off in one soft mound, never pour like soup or sit in a stiff lump.",
      whyThisForm:
        "A 6-month-old is still learning to move food back with the tongue, so a smooth, lump-free porridge is the safest first texture — and it rides a preloaded spoon that a palmar grasp can grab by the handle.",
      prepSteps: [
        "Whisk 2–3 tablespoons of ground buckwheat into cold unsalted water before turning on the heat — starting cold is what prevents lumps.",
        "Simmer 5–8 minutes, whisking often, until thick, smooth, and glossy.",
        "Thin with breastmilk, formula, or water to a yogurt-thick consistency and cool to warm.",
        "Hand over preloaded spoons one at a time, or let the baby dive in with hands.",
      ],
      commonMistakes: [
        "Stirring dry buckwheat into already-boiling water — it seizes into lumps instantly.",
        "Serving it soupy-thin, which dribbles off the spoon before it ever reaches the mouth.",
      ],
      cutDiagram: "mash",
      media: [],
    },
    {
      band: "9-12m",
      form: "Whole buckwheat groats simmered until each one squashes between two fingers, served as sticky pinky-nail clumps or folded into a thick, softly lumpy porridge.",
      passFailTest:
        "Press a single cooked groat between thumb and forefinger — it should flatten with light pressure. Then lift a clump with your own pincer grip: it should survive the pick-up.",
      whyThisForm:
        "The pincer grasp arrives around 9 months, and small tacky clumps of soft groats are an ideal target — big enough to grab, soft enough to mash with bare gums.",
      prepSteps: [
        "Simmer whole groats in plenty of unsalted water for 15–20 minutes, past the package time, until fully soft.",
        "Drain, then pinch the sticky groats into pinky-nail-sized clumps, or stir them into thick porridge or yogurt.",
        "Scatter a few clumps at a time on the tray to keep the pace calm.",
      ],
      commonMistakes: [
        "Cooking groats only until al dente — chewy grains frustrate gums that can't grind yet.",
        "Rinsing cooked groats until they separate, which leaves nothing a pincer grip can lift.",
      ],
      cutDiagram: "bite-size",
      media: [],
    },
    {
      band: "12-24m",
      form: "Soft-cooked buckwheat served by the spoonful — a porridge bowl, a kasha-style pilaf moistened with broth until soft, or pressed into bite-size clumps beside family stews.",
      passFailTest:
        "Load a toddler spoon and tilt it: the buckwheat should cling briefly rather than scatter, and any groat should still squash under firm finger pressure.",
      whyThisForm:
        "Utensil practice dominates this stage, and slightly sticky buckwheat is a forgiving spoon food; molars and rotary chewing now handle mixed kasha dishes well.",
      prepSteps: [
        "Cook groats soft and moisten with the broth or sauce of the family dish.",
        "Serve in a bowl with a toddler spoon, or press small clumps for eating on the go.",
      ],
      commonMistakes: [
        "Serving kasha seasoned from the adult pot with a heavy hand of salt or soy sauce.",
      ],
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["banana", "yogurt", "beef", "blueberry"],
  tips: [
    "Whisk ground buckwheat into cold water before it ever sees heat — that single habit makes every batch lump-free.",
    "Toast whole groats dry in the pan for 2–3 minutes before simmering for the nutty, kasha-style flavor babies often prefer.",
    "Cook in unsalted water or milk and season, if at all, from the family pot after the baby's portion is out.",
    "Porridge stiffens as it cools — re-thin leftovers with a splash of milk or water and re-whisk before serving.",
  ],
  sources: [SOURCES.wicGuide, SOURCES.nhsFrom6Months, SOURCES.cdcFoodsAndDrinks],
  nutrients: ["iron", "fiber", "protein"],
  servingGuidance: [
    {
      band: "6-8m",
      typicalAmount:
        "A tablespoon or two of thick porridge from preloaded spoons — the baby's interest, not the bowl, sets the amount.",
    },
    {
      band: "9-12m",
      typicalAmount:
        "A couple of tablespoons of groat clumps or lumpy porridge, offered a few pieces at a time and refilled while reaching continues.",
    },
    {
      band: "12-24m",
      typicalAmount:
        "A quarter to half cup of porridge or kasha with the family meal — appetite swings day to day, and that's normal.",
    },
  ],
  watchOuts: [
    "Buckwheat pancake mixes often blend in wheat flour, sugar, and salt — read the label, especially if you're tracking wheat exposures separately.",
  ],
  emoji: "🥣",
};

export default buckwheat;
