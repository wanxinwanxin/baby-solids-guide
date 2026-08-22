import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const chiaSeeds: Food = {
  slug: "chia-seeds",
  name: "Chia seeds",
  aliases: ["chia", "chia pudding"],
  category: "protein",
  minAgeMonths: 6,
  ironRich: false,
  commonAllergen: null,
  chokingRisk: "moderate",
  chokingNotes:
    "Dry chia swells to many times its size the moment it meets liquid, so a spoonful of dry seeds can turn into a gummy, expanding mass in the mouth or throat. Mitigate by always serving chia fully hydrated — soaked into pudding, oatmeal, or mash until every seed is a soft jelly bead — and never as dry seeds or dry sprinkle.",
  nutritionHighlights: [
    "A concentrated plant source of the omega-3 fat ALA, which supports brain development",
    "Soluble fiber that keeps things moving through small digestive systems",
    "Healthy fats and a little plant protein in a spoonable, gum-friendly texture",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "One teaspoon of chia seeds soaked in about four teaspoons of milk, formula, or puree for at least fifteen minutes, until the whole mixture turns into a soft, spoonable pudding.",
      passFailTest:
        "Press a soaked seed between two fingers: it should be a soft jelly bead with a swollen halo. If the mix still looks like dry specks in liquid, stir and keep waiting.",
      whyThisForm:
        "Chia is only safe after it has finished swelling — a fully gelled pudding has already done its expanding in the bowl instead of in the baby, and the texture suits gums perfectly.",
      prepSteps: [
        "Stir 1 teaspoon of chia into about 4 teaspoons of milk, formula, or a loose fruit puree.",
        "Wait at least 10–15 minutes, stirring once or twice so the seeds don't clump at the bottom.",
        "Check that every seed is swollen and jelly-soft, then serve by the spoon or let the baby dive in.",
      ],
      commonMistakes: [
        "Sprinkling dry chia straight onto food — the swelling then happens in the mouth, which is exactly the hazard.",
        "Serving too soon: five minutes gives gritty half-soaked seeds, not pudding.",
        "Forgetting the mid-soak stir, which leaves a dry clump under a gelled top layer.",
      ],
      cutDiagram: "mash",
      media: [],
    },
    {
      band: "9-12m",
      form: "Thick chia pudding made with mashed banana or fruit puree folded through, or a teaspoon of chia soaked directly into the morning oatmeal until fully swollen.",
      passFailTest:
        "Tip the bowl slightly: the pudding should hold together and slide as one soft mass, with no free liquid and no dry specks visible anywhere in it.",
      whyThisForm:
        "Self-feeding babies do well with thick, scoopable textures that cling to a spoon or fist, and pre-gelled chia keeps all the swelling safely outside the mouth.",
      prepSteps: [
        "Make the pudding ahead — chia soaked overnight in the fridge is foolproof by breakfast.",
        "Fold in mashed banana, pear, or berry puree for flavor instead of any sweetener.",
        "Loosen with a splash of milk if it has set stiffer than yogurt.",
      ],
      commonMistakes: [
        "Sweetening the pudding with honey (off-limits before 12 months) or syrup — mashed fruit does the job.",
      ],
      media: [],
    },
    {
      band: "12-24m",
      form: "Chia pudding as a snack or breakfast, chia soaked into porridge, or a teaspoon gelled into homemade fruit mash spread thinly on toast like jam.",
      passFailTest:
        "Whatever the dish, the seeds in it should already be swollen jelly beads — nothing on the plate should crunch or sit as a dry seed.",
      whyThisForm:
        "Toddlers can share family chia dishes as long as the hydration rule holds — the hazard was never age-specific, it is the dry seed itself.",
      prepSteps: [
        "Simmer mashed berries with a teaspoon of chia for a quick no-sugar jam that gels as it cools.",
        "Keep a jar of overnight chia pudding in the fridge for a ready toddler breakfast.",
      ],
      commonMistakes: [
        "Letting a toddler shake dry chia over their own food — the hydration step is not optional at any age here.",
      ],
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["banana", "oatmeal", "yogurt", "pear"],
  tips: [
    "The ratio that always gels: 1 part chia to about 4 parts liquid, 15 minutes minimum, with one stir partway through.",
    "Overnight in the fridge is the lazy, reliable route — by morning every seed is fully swollen with zero guesswork.",
    "Chia has almost no flavor of its own, so the pudding tastes like whatever fruit or milk you build it on.",
    "A chia-berry mash spread thin on toast works like jam with no added sugar and no crunch.",
  ],
  sources: [SOURCES.wicGuide, SOURCES.cdcChokingHazards, SOURCES.nhsFrom6Months],
  nutrients: ["omega3", "healthyFats", "fiber", "protein"],
  servingGuidance: [
    {
      band: "6-8m",
      typicalAmount:
        "A teaspoon of seeds' worth of fully gelled pudding — a few spoonfuls offered, with the baby deciding how far it goes.",
    },
    {
      band: "9-12m",
      typicalAmount:
        "Two to four tablespoons of thick fruit-chia pudding as part of a meal or snack.",
    },
    {
      band: "12-24m",
      typicalAmount:
        "A small bowl of pudding or a chia-jam toast — appetite, not the recipe, sets the portion.",
    },
  ],
  watchOuts: [
    "Chia drinks up fluid as it digests — serve it well hydrated and keep milk feeds or water nearby, especially at first.",
    "Its fiber is potent for a small gut: start with a teaspoon of seeds and build up slowly.",
    "A pudding keeps thickening as it sits — loosen a fridge-stiff batch with a splash of milk before serving.",
  ],
  emoji: "🥣",
};

export default chiaSeeds;
