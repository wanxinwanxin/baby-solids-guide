import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const komatsuna: Food = {
  slug: "komatsuna",
  name: "Komatsuna",
  aliases: ["Japanese mustard spinach", "mustard spinach"],
  category: "vegetable",
  minAgeMonths: 6,
  ironRich: false,
  commonAllergen: null,
  chokingRisk: "moderate",
  chokingNotes:
    "Blanched komatsuna leaves are thin and slick: a whole wilted leaf can stick to the roof of the mouth or drape flat over the airway like film, and long stem pieces turn stringy. Mitigate by blending or finely mincing the cooked greens, slicing stems crosswise, and folding them into a food with body (porridge, puree, omelette) rather than serving intact leaves.",
  nutritionHighlights: [
    "Rich in calcium the body absorbs well — komatsuna is low in oxalates, unlike spinach, so it counts as a true calcium green",
    "A useful plant source of iron, and its vitamin C helps iron absorb from the same meal",
    "Provides folate for rapid cell growth and vitamin K for normal blood clotting",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "Komatsuna leaf tops blanched for 1–2 minutes, squeezed dry, and either blended smooth into a puree or minced into flecks no bigger than a pinky nail, stirred through rice porridge or a soft omelette strip.",
      passFailTest:
        "Spread the mince on a plate: no fleck bigger than a pinky nail, no stem thread trailing from any piece, and nothing that lifts away as an intact leaf. A blended puree should slide off the spoon with no strands in it.",
      whyThisForm:
        "A fist-grasping baby meets komatsuna as a passenger inside other foods; a thin wilted leaf can stick to the palate or drape over the airway, but a smooth puree or fine flecks carried by porridge or egg cannot.",
      prepSteps: [
        "Wash the bunch well, especially at the base where soil collects, and pinch off the leafy tops; save the stems for later months or the family pot.",
        "Blanch the leaves in boiling water for 1–2 minutes until soft and bright green, then cool them in cold water.",
        "Squeeze the leaves firmly in your fist until no more water drips out.",
        "Blend smooth with a little water, or mince in both directions to fine flecks, then stir into rice porridge, a vegetable puree, or a well-cooked omelette cut into finger-width strips.",
      ],
      commonMistakes: [
        "Serving whole wilted leaves because they look soft — a thin leaf clings to the palate and is exactly the draping shape to avoid.",
        "Adding the stems this early — even blanched, their fibers gather into strings in a puree or porridge.",
        "Boiling for 5–10 minutes to be safe — komatsuna turns khaki and mushy with no gain in safety.",
      ],
      cutDiagram: "shred",
      media: [],
    },
    {
      band: "9-12m",
      form: "Finely chopped blanched komatsuna, with the stems now included and sliced crosswise into bits no bigger than a pinky nail, mixed into porridge, scrambled egg, soft tofu, or mash.",
      passFailTest:
        "Pull a spoonful apart: any leaf you can peel off as a flat sheet bigger than a pinky nail, or any stem piece that trails a string, needs more chopping.",
      whyThisForm:
        "Pincer-stage babies pick up mixed pieces well and manage a little more texture, so the tender stems can join in, but a free-floating thin leaf is still a draping hazard, so komatsuna keeps riding inside other foods.",
      prepSteps: [
        "Lower the stems into boiling water first, add the leaves 30 seconds later, and cook for 1–2 minutes in total.",
        "Squeeze dry, slice the stems crosswise into thin rounds, then chop everything finely.",
        "Mix into porridge, scrambled egg, soft tofu, or mashed sweet potato, and serve as self-feedable mixed pieces.",
      ],
      commonMistakes: [
        "Cutting the stems lengthwise or into long pieces — their fibers run end to end, so always slice across them.",
        "Handing over a leaf to explore because the baby seems ready — the leaf's thin, clingy shape hasn't changed.",
      ],
      cutDiagram: "shred",
      media: [],
    },
    {
      band: "12-24m",
      form: "Chopped cooked komatsuna in family dishes such as stir-fries, soups, noodles, or fried rice, with leaves cut to pieces no bigger than a pinky nail and stems sliced crosswise.",
      passFailTest:
        "No intact leaf should lift out of the dish, and a stem piece should squash between two fingers with no string trailing.",
      whyThisForm:
        "Toddlers chew better but still manage thin, clingy leaves poorly; chopped pieces in the family dish let the child share the meal while learning to move slippery greens around the mouth.",
      prepSteps: [
        "Add chopped komatsuna for the last 1–2 minutes of cooking, stems first and leaves after.",
        "Lift out the toddler's portion before soy sauce, oyster sauce, dashi seasoning, or salt goes in.",
      ],
      commonMistakes: [
        "Leaving whole leaves in a soup or noodle bowl, where they cling together into one slick sheet.",
      ],
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["egg", "tofu", "rice", "sweet-potato"],
  tips: [
    "Blanch for only 1–2 minutes: komatsuna goes tender far faster than kale or chard, and longer boiling only dulls the color and leaches more vitamin C into the water.",
    "Squeeze hard after blanching — a fist-wrung ball minces into clean flecks or blends smooth, while wet greens smear and make the puree watery.",
    "Batch trick: blanch a whole bunch, squeeze, mince, and freeze in ice-cube portions, then thaw only the cube you need for each meal.",
    "The taste is mild and faintly sweet, without the bite of mustard greens, yet some babies still need 8–15 relaxed exposures — keep portions small and pressure at zero.",
  ],
  sources: [SOURCES.wicGuide, SOURCES.nhsFrom6Months, SOURCES.cdcFoodsAndDrinks],
  nutrients: ["calcium", "iron", "vitaminC", "folate"],
  servingGuidance: [
    {
      band: "6-8m",
      typicalAmount:
        "A teaspoon or two of blended or minced komatsuna stirred through porridge, puree, or an omelette strip — a garnish-scale start is plenty.",
    },
    {
      band: "9-12m",
      typicalAmount:
        "A tablespoon of finely chopped komatsuna mixed through porridge, scrambled egg, tofu, or mash.",
    },
    {
      band: "12-24m",
      typicalAmount:
        "A couple of tablespoons of chopped komatsuna through family dishes or as a small side — offered without pressure, eaten or not.",
    },
  ],
  watchOuts: [
    "Family komatsuna dishes are seasoned for adults — ohitashi dressed in soy sauce or seasoned bonito dashi, salted greens rice (nameshi), stir-fries with oyster sauce — so set the baby's portion aside before any salt or salty sauce goes in.",
  ],
  emoji: "🥬",
};

export default komatsuna;
