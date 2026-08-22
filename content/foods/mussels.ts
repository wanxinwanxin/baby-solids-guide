import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const mussels: Food = {
  slug: "mussels",
  name: "Mussels",
  aliases: [],
  category: "protein",
  minAgeMonths: 6,
  ironRich: true,
  commonAllergen: "shellfish",
  chokingRisk: "moderate",
  chokingNotes:
    "Cooked mussel meat is chewy and elastic, and a whole mussel is a springy oval about the size of an airway that bare gums cannot break down. Mitigate by cooking thoroughly, discarding any shell that hasn't opened, and mincing the meat finely — whole mussels stay off the menu throughout this guide's age range.",
  nutritionHighlights: [
    "Among the most iron-rich foods from the sea — more heme iron per bite than most red meat",
    "An exceptional source of vitamin B12 and zinc",
    "Provides omega-3s while staying naturally low in mercury",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "Thoroughly cooked mussel meat from opened shells only, minced to rice-grain-size pieces, moistened with a spoonful of the cooking broth, and folded into a familiar puree or soft mash.",
      passFailTest:
        "Run a fingertip through the mince — every piece should be rice-grain-size or smaller, and a pinch between two fingers should meet soft give, never a rubbery band that resists.",
      whyThisForm:
        "Mussel meat never softens the way fish does, so the fine mince does the safety work — it removes the chewy-oval hazard while still delivering this iron-dense shellfish by spoon.",
      prepSteps: [
        "Scrub live mussels, pull off the wiry beards, and steam 5–7 minutes until the shells open wide; discard any shell that stays shut.",
        "Pick out the meat, trim away the tough rim if one peels free, mince to rice-grain pieces, and loosen with a spoonful of the strained cooking broth.",
        "Mix into or serve alongside familiar foods, never another new food.",
        "First time: serve early in the day, a small amount, and watch for 2 hours.",
      ],
      commonMistakes: [
        "Prying open and serving a mussel that didn't open in the pot — an unopened shell is the classic sign it wasn't safe to eat.",
        "Chopping coarsely instead of truly mincing; a half-mussel is still a springy oval plug.",
        "Introducing mussels at dinner, so any delayed reaction lands overnight.",
      ],
      media: [],
    },
    {
      band: "9-12m",
      form: "Well-cooked mussel meat chopped fine — every piece pea-size or smaller — kept moist with broth and folded through soft rice, pasta, or mashed potato.",
      passFailTest:
        "Pinch a piece — it should compress and stay flat rather than bounce back, and nothing in the serving should be a recognizable whole or half mussel.",
      whyThisForm:
        "The pincer grasp handles small pieces now, but mussel stays elastic, so pieces must remain small and moist while regular servings keep the shellfish allergen established.",
      prepSteps: [
        "Cook and pick as for 6–8 months, then chop the meat to pea-size or smaller.",
        "Fold the pieces through a moist, familiar carrier — soft rice, small pasta, or a vegetable mash — with a spoonful of broth.",
        "Offer a small scatter at a time to discourage cheek-stuffing.",
      ],
      commonMistakes: [
        "Letting chopped mussel dry out — dry, chewy bits are both a gagging trigger and hard to swallow.",
        "Pieces bigger than a pea, which stay too springy for a gummy chew.",
      ],
      cutDiagram: "bite-size",
      media: [],
    },
    {
      band: "12-24m",
      form: "Thoroughly cooked mussel meat chopped into bite-size pieces no larger than a pinky fingernail, served moist in family dishes like tomato-sauced pasta or a mild seafood rice.",
      passFailTest:
        "Every piece should flatten under a firm two-finger press with no eraser-like spring, and no whole or halved mussel should reach the plate.",
      whyThisForm:
        "New molars still cannot grind elastic shellfish reliably, so chopped-small stays the rule — the win at this age is keeping an iron-rich food in the family rotation.",
      prepSteps: [
        "Chop cooked, picked mussel meat into pinky-nail pieces.",
        "Stir into a moist family dish and spoon a little of the cooking broth over before serving.",
      ],
      commonMistakes: [
        "Serving whole mussels off the family platter because the toddler grabs for the shells — offer an empty shell to play with and keep the meat chopped.",
      ],
      cutDiagram: "bite-size",
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["potato", "tomato", "rice"],
  tips: [
    "Buy mussels alive — shells shut, or closing when tapped — and cook them the same day; freshness rules matter more with shellfish than with any other food.",
    "The broth left in the pot is liquid gold: strain it and use it to moisten the mince, cook the rice, or thin a vegetable mash with a big flavor and mineral boost — but skip added salt, since mussels are naturally briny.",
    "Steam only until the shells swing open wide, about 5–7 minutes; extra time makes the already-chewy meat tougher.",
    "One pot of mussels yields many baby portions — mince, moisten with broth, and freeze in ice-cube trays for effortless iron-rich repeats.",
  ],
  sources: [SOURCES.fdaFish, SOURCES.aaaaiFoodAllergy, SOURCES.cdcChokingHazards],
  nutrients: ["iron", "protein", "zinc", "omega3"],
  servingGuidance: [
    {
      band: "6-8m",
      typicalAmount:
        "A teaspoon or two of broth-moistened mince folded into a familiar mash — even a taste-size serve carries meaningful iron.",
      frequency: "About twice a week once tolerated, to keep the shellfish exposure steady.",
    },
    {
      band: "9-12m",
      typicalAmount:
        "A tablespoon of finely chopped pieces folded through rice or mash — the baby sets the pace.",
      frequency: "About twice a week keeps the allergen in the diet and the iron coming.",
    },
    {
      band: "12-24m",
      typicalAmount:
        "A few tablespoons of chopped mussel stirred into a moist family dish — appetite swings day to day.",
      frequency: "Keep shellfish in the rotation about twice a week.",
    },
  ],
  watchOuts: [
    "Shellfish food safety is unforgiving: cook mussels from live, discard any that don't open, and refrigerate leftovers promptly — reheat only once, until steaming.",
    "Mussels and their broth are naturally briny, so skip added salt anywhere in the dish.",
  ],
  emoji: "🦪",
};

export default mussels;
