import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const snapPeas: Food = {
  slug: "snap-peas",
  name: "Snap peas",
  aliases: ["sugar snap peas"],
  category: "vegetable",
  minAgeMonths: 9,
  ironRich: false,
  commonAllergen: null,
  chokingRisk: "high",
  chokingNotes:
    "A raw snap pea is crisp enough to snap into hard, curved chunks, the seams carry tough strings, and the peas inside are small and round — three risky features in one pod. Mitigate by steaming until floppy-soft, pulling the strings from both seams, splitting the pods lengthwise, and chopping small until chewing is strong; crunchy raw pods wait until around age 4.",
  nutritionHighlights: [
    "A good source of vitamin C, which helps iron absorb from foods served alongside",
    "Pods bring gentle fiber for digestion",
  ],
  prepSpecs: [
    {
      band: "9-12m",
      form: "Snap peas steamed until a pod folds limply over your finger, strings pulled from both seams, split lengthwise and chopped into pieces about the size of a pinky nail.",
      passFailTest:
        "The drape-and-pinch test: a whole pod should fold over your finger without cracking, and a chopped piece should flatten easily between two fingers.",
      whyThisForm:
        "Pincer-stage babies handle small pieces well, but only full steaming removes the snap, and splitting lengthwise before chopping makes sure the round inner peas get flattened too.",
      prepSteps: [
        "Snap the stem tip of each pod and pull it down like a zipper to remove the strings on both seams.",
        "Steam 5–7 minutes, until the pods are floppy rather than merely bright green.",
        "Split each pod lengthwise along the seam, pressing flat any peas that pop out.",
        "Chop crosswise into pinky-nail pieces and stir into rice or pasta for grip.",
      ],
      commonMistakes: [
        "A quick blanch that keeps the signature snap — the snap is the hazard.",
        "Skipping the strings; they survive cooking and can trail into the throat.",
        "Leaving escaped round peas whole on the tray instead of pressing them flat.",
      ],
      cutDiagram: "quarter-lengthwise",
      media: [],
    },
    {
      band: "12-24m",
      form: "Well-steamed, string-free pods quartered lengthwise into thin strips or chopped small, staying soft-cooked until molars grind reliably, while crisp raw pods remain a snack for later years.",
      passFailTest:
        "A strip should bend and pinch soft with no crack, and sampling one yourself should reveal no string bridging the bite.",
      whyThisForm:
        "New molars still can't grind a crisp pod into a safe swallow, so snap peas keep arriving soft, stringless, and cut long-ways so no curved chunk survives.",
      prepSteps: [
        "String and steam as before, keeping the pods fully floppy.",
        "Quarter lengthwise into thin strips, or chop small, and serve with the family meal.",
      ],
      commonMistakes: [
        "Handing over raw pods from the snack bag because the toddler has teeth — front teeth snap pieces off; they don't grind them.",
      ],
      cutDiagram: "quarter-lengthwise",
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["rice", "chicken", "tofu", "olive-oil"],
  tips: [
    "String both seams in one motion: snap the stem tip and pull it down the pod like a zipper.",
    "Steam past pretty — a floppy, khaki-tinged pod is safe; a bright squeaky one isn't there yet.",
    "Press any escaped peas flat with your thumb before they roll onto the tray.",
    "Chopped soft pods disappear happily into fried-rice-style dishes, where the grains add grip.",
  ],
  sources: [SOURCES.aapChoking, SOURCES.cdcChokingHazards, SOURCES.nhsFrom6Months],
  nutrients: ["vitaminC", "fiber"],
  servingGuidance: [
    {
      band: "9-12m",
      typicalAmount:
        "A tablespoon of chopped soft pods stirred into rice or pasta, a few pieces at a time.",
    },
    {
      band: "12-24m",
      typicalAmount:
        "A small handful of soft-cooked strips or chopped pods alongside the family meal.",
    },
  ],
  watchOuts: [],
  emoji: "🫛",
};

export default snapPeas;
