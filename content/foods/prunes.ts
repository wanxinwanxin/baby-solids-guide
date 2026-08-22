import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const prunes: Food = {
  slug: "prunes",
  name: "Prunes",
  aliases: ["dried plums"],
  category: "fruit",
  minAgeMonths: 6,
  ironRich: false,
  commonAllergen: null,
  chokingRisk: "moderate",
  chokingNotes:
    "A dried-hard prune is dense, sticky, and gummy — the texture profile that lodges in a throat and resists coughing out. Mitigate by simmering or soaking prunes until completely soft before any serve, then pureeing or chopping small; never hand over a leathery whole prune.",
  nutritionHighlights: [
    "Natural sorbitol and fiber make prunes a classic, well-established food remedy for infant constipation",
    "A source of potassium",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "One to two pitted prunes simmered in water for five to ten minutes until completely soft, then blended into a smooth puree and served alone or stirred into oatmeal.",
      passFailTest:
        "Rub a bit of puree between two fingers — it should feel completely smooth with no leathery flecks. A stewed prune itself should squash flat like ripe banana.",
      whyThisForm:
        "Young babies manage smooth textures best, and the puree form delivers the sorbitol that keeps stools soft — the usual reason prunes enter the menu this early.",
      prepSteps: [
        "Simmer 1–2 pitted prunes in a little water for 5–10 minutes until plump and squashable.",
        "Blend with a splash of the cooking water to a smooth, spoonable puree.",
        "Serve 1–2 prunes' worth per day at most to start, plain or stirred into oatmeal or yogurt.",
      ],
      commonMistakes: [
        "Serving too much — prunes work, and more than a couple can overshoot straight into loose stools and a sore bottom.",
        "Blending an unsoaked dried prune into a gritty, leathery paste instead of stewing it soft first.",
        "Assuming 'pitted' means pit-free — feel the fruit before cooking, since fragments slip through.",
      ],
      cutDiagram: "mash",
      media: [],
    },
    {
      band: "9-12m",
      form: "Stewed-soft pitted prunes chopped into sticky pieces about the size of your pinky fingernail, lightly separated so they don't clump into one gummy ball.",
      passFailTest:
        "Press a piece between two fingers — it should squash flat instantly. If it feels leathery or springs back, it needs more simmering time.",
      whyThisForm:
        "Small soft pieces suit the new pincer grasp, and chopping plus separating prevents the sticky fruit from re-forming into a single gummy bolus in the mouth.",
      prepSteps: [
        "Simmer prunes until fully soft, cool, and feel each for pit fragments.",
        "Chop into pinky-nail pieces and toss with a pinch of ground oat cereal so the pieces stay separate.",
        "Offer a few pieces at a time alongside less sticky foods.",
      ],
      commonMistakes: [
        "Serving a pile of chopped prunes that promptly welds itself back into one sticky lump — the cereal-dusting trick prevents this.",
        "Feeding prunes daily by default rather than as needed — match the amount to how the diapers are trending.",
      ],
      cutDiagram: "bite-size",
      media: [],
    },
    {
      band: "12-24m",
      form: "Soft stewed prunes quartered or chopped for self-feeding, while any prune that is still leathery from the bag gets a ten-minute soak in hot water first.",
      passFailTest:
        "The two-finger squash on every piece: soft and flattening means serve; chewy-leathery means back into hot water for ten minutes.",
      whyThisForm:
        "Toddlers chew better but gummy dried fruit remains one of the stickier choking textures, so full softening stays the rule even as piece size grows.",
      prepSteps: [
        "Soak or simmer until soft, then quarter or chop and serve with meals.",
        "Stir chopped prunes into oatmeal, yogurt, or plain full-fat ricotta for a less sticky delivery.",
      ],
      commonMistakes: [
        "Handing over whole leathery prunes as a grab-and-go snack — soft-stewed and cut is still the standard in this window.",
      ],
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["oatmeal", "yogurt", "pork"],
  tips: [
    "The classic constipation dose is small: start with 1–2 prunes' worth a day and adjust by the diaper — prunes are effective enough that more usually means too much.",
    "Save the simmering liquid: a tablespoon of that prune water stirred into oatmeal delivers a gentler nudge than the fruit itself.",
    "Batch-stew a cup of prunes, blend half into puree and chop half, and freeze both in ice-cube trays for grab-a-cube convenience.",
    "Dusting chopped prunes with ground oat cereal keeps the sticky pieces from clumping and makes them far easier for small fingers to pick up.",
  ],
  sources: [SOURCES.wicGuide, SOURCES.aapStartingSolids, SOURCES.nhsFrom6Months],
  nutrients: ["fiber", "potassium"],
  servingGuidance: [
    {
      band: "6-8m",
      typicalAmount:
        "A teaspoon or two of prune puree — about one to two prunes' worth a day is the usual ceiling to start.",
      frequency: "As the diapers call for it, not daily by default.",
    },
    {
      band: "9-12m",
      typicalAmount:
        "A few sticky pinky-nail pieces — one to two prunes' worth — offered alongside less sticky foods.",
      frequency: "Match the amount to how stools are trending.",
    },
    {
      band: "12-24m",
      typicalAmount:
        "One or two stewed prunes, quartered or chopped, stirred into oatmeal or yogurt.",
    },
  ],
  watchOuts: [
    "Prunes work — more than a couple of prunes' worth can swing past relief into loose stools and a sore bottom.",
  ],
  emoji: "🍇",
};

export default prunes;
