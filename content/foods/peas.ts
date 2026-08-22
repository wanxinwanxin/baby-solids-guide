import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const peas: Food = {
  slug: "peas",
  name: "Peas",
  aliases: ["green peas", "garden peas"],
  category: "vegetable",
  minAgeMonths: 6,
  ironRich: false,
  commonAllergen: null,
  chokingRisk: "moderate",
  chokingNotes:
    "A whole pea is a firm, smooth little sphere — close to airway-sized for an early eater who can't yet chew it down. Mitigate by mashing peas or pressing every single pea flat before serving; whole peas can wait until pincer grasp and steady chewing are established, around 10 months or later, at the parent's judgment.",
  nutritionHighlights: [
    "A vegetable with meaningful plant protein for its size",
    "Provides vitamin C and thiamine alongside gentle fiber",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "Peas steamed until soft and bright green, then mashed into a thick spoonable paste, or every single pea pressed completely flat between your thumb and finger before serving.",
      passFailTest:
        "Look at the tray: no intact spheres anywhere. Every pea should be visibly burst flat or part of a mash before it reaches the baby.",
      whyThisForm:
        "Young infants mash food between gums and tongue and can't reliably chew a small firm sphere; flattening bursts the skin and turns each pea into a harmless soft disc.",
      prepSteps: [
        "Steam or simmer peas for 3–4 minutes until soft.",
        "Mash with a fork to a thick paste, or press each pea flat with your thumb or the back of a fork.",
        "Serve on a preloaded spoon or spread thinly on the tray.",
      ],
      commonMistakes: [
        "Scattering whole peas because they seem conveniently bite-sized — the round shape is exactly the hazard.",
        "Missing a few intact peas hiding inside a chunky mash.",
      ],
      cutDiagram: "mash",
      media: [],
    },
    {
      band: "9-12m",
      form: "Soft-cooked peas each squashed flat with the back of a fork on the tray, moving to whole peas only once pincer grasp and steady chewing are clearly established, around ten months or later.",
      passFailTest:
        "Squeeze a pea between two fingers — it should burst with light pressure. If your baby is still swallowing pieces whole without chewing, keep flattening.",
      whyThisForm:
        "Flattened peas are ideal pincer-grasp practice — tiny, grippable, and safe — while the whole-pea graduation waits for chewing maturity, which parents can judge from how the baby handles other soft lumps.",
      prepSteps: [
        "Cook peas until soft, 3–4 minutes.",
        "Press a serving flat with the back of a fork in one pass.",
        "Offer a small scatter at a time; whole peas can be trialed near the end of this window if chewing is reliable.",
      ],
      commonMistakes: [
        "Rushing to whole peas at exactly 9 months because the pincer grasp appeared — grasp and chewing mature separately.",
      ],
      media: [],
    },
    {
      band: "12-24m",
      form: "Whole soft-cooked peas scattered a few at a time on the tray, now excellent pincer-grasp food for a toddler whose chewing and small-piece skills are established.",
      passFailTest:
        "A pea should still squash easily between two fingers — properly cooked, never raw or firm — and your toddler should be visibly chewing, not gulping.",
      whyThisForm:
        "By this age chewing is coordinated enough to manage small soft spheres, and one-by-one pea picking builds fine motor precision at every meal.",
      prepSteps: [
        "Cook peas until soft and serve warm or cool.",
        "Scatter a spoonful at a time rather than a full bowl.",
      ],
      commonMistakes: [
        "Serving raw or frozen-firm peas straight from the bag — cooked-soft remains the rule.",
      ],
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["carrot", "potato", "rice", "salmon"],
  tips: [
    "Frozen peas are the easy default: already shelled, consistently sweet, and soft after just a few minutes of steaming.",
    "Fastest flattening method: spread cooked peas on the tray or a cutting board and press the whole batch in one pass with the flat back of a fork.",
    "Fold mashed peas into potato mash or oatmeal to loan them a stickier, more spoonable texture.",
    "Peas' skins can shrug off a first meeting — offer them calmly again and again; repeated low-pressure exposure is what builds acceptance.",
  ],
  sources: [SOURCES.wicGuide, SOURCES.nhsFrom6Months, SOURCES.cdcChokingHazards],
  nutrients: ["protein", "fiber", "vitaminC"],
  servingGuidance: [
    {
      band: "6-8m",
      typicalAmount:
        "A tablespoon of mash, or a scatter of flattened peas — spread thin and let little hands do the raking.",
    },
    {
      band: "9-12m",
      typicalAmount:
        "A small handful of flattened peas at a time — refill the scatter as it clears.",
    },
    {
      band: "12-24m",
      typicalAmount:
        "A spoonful or two of whole soft peas, scattered a few at a time — picking them up one by one is half the fun.",
    },
  ],
  emoji: "🫛",
};

export default peas;
