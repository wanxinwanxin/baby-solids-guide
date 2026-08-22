import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const corn: Food = {
  slug: "corn",
  name: "Corn",
  aliases: ["sweet corn", "corn on the cob"],
  category: "vegetable",
  minAgeMonths: 6,
  ironRich: false,
  commonAllergen: null,
  chokingRisk: "moderate",
  chokingNotes:
    "Loose whole kernels are small, smooth, and easy to suck backward before chewing is reliable. The cob itself is the safe format — gums shear kernels off in tiny fragmented bites, and the cob is far too big to swallow. Mitigate by serving corn on the cob early and smashing or roughly chopping any loose kernels until chewing is confident, around 12 months.",
  nutritionHighlights: [
    "Whole-grain-style fiber that supports digestion",
    "A source of folate and B vitamins",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "A whole cooked corn cob or a palm-length half cob served with the cob itself as the handle, so the baby gnaws kernels off in tiny sheared bites.",
      passFailTest:
        "Press a kernel row with your thumbnail — kernels should burst soft and milky; then hold the cob against your inner wrist to confirm it has cooled from the center.",
      whyThisForm:
        "The cob is a built-in palmar-grasp handle, and gumming the surface shears each kernel into fragments — a far safer delivery than the same kernels served loose.",
      prepSteps: [
        "Husk the corn and pull off the silk.",
        "Boil or steam 6–8 minutes, until kernels burst easily under a thumbnail.",
        "Cut the cob in half crosswise so it suits small hands.",
        "Cool until just warm and hand it over like a two-handed lollipop.",
      ],
      commonMistakes: [
        "Cutting the kernels off for a young baby — that creates exactly the loose-kernel hazard the cob avoids.",
        "Serving too hot: a dense cob holds heat like a battery long after the outside feels fine.",
        "Slathering with salted butter — plain or a wipe of unsalted fat is all a baby needs.",
      ],
      cutDiagram: "wedge-handle",
      media: [],
    },
    {
      band: "9-12m",
      form: "Corn still on the cob for gnawing, plus any loose kernels pressed flat between your fingers or roughly chopped before they reach the tray.",
      passFailTest:
        "Every loose kernel on the tray should already be burst: press a sample — nothing should still be a smooth, intact bead.",
      whyThisForm:
        "The pincer grasp loves picking up kernels, but whole ones are still easy to inhale, so each gets smashed to break the smooth round skin first.",
      prepSteps: [
        "Keep offering cooked half cobs as the main format.",
        "For loose corn, simmer frozen or fresh kernels until tender.",
        "Press the kernels flat with a fork or your fingers, or give them a rough chop, then serve a spoonful at a time.",
      ],
      commonMistakes: [
        "Tipping a pile of intact kernels onto the tray because they look conveniently tiny.",
        "Mixing smashed and whole kernels in one bowl — smash the whole batch so there's nothing to sort.",
      ],
      media: [],
    },
    {
      band: "12-24m",
      form: "Loose whole kernels once chewing is confident, scattered a few at a time rather than served as one big slippery handful, alongside corn still enjoyed on the cob.",
      passFailTest:
        "Watch the first few solo kernels: confident chewing on both sides of the mouth and a calm swallow mean whole kernels are ready; gulping means keep smashing.",
      whyThisForm:
        "By around a year most toddlers chew well enough for whole soft kernels, and small scattered servings keep the pace slow while the skill consolidates.",
      prepSteps: [
        "Simmer or steam kernels until tender, or slice them off a cooked cob.",
        "Scatter a spoonful at a time and refill as it disappears.",
      ],
      commonMistakes: [
        "A deep bowl of kernels for a toddler who still shovels — scattering a few keeps each mouthful manageable.",
      ],
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["potato", "black-beans", "cheese", "avocado"],
  tips: [
    "Fresh corn cooks fast — 6–8 minutes is plenty, and overcooking only toughens the kernels.",
    "Frozen corn works fine for the middle band: simmer until tender, then press the kernels flat with a fork.",
    "Always cool-check a cob against your inner wrist; the core stays hot long after the surface cools.",
    "A half cob is far easier for small hands to lift and rotate than a full-length one.",
  ],
  sources: [SOURCES.cdcChokingHazards, SOURCES.wicGuide, SOURCES.nhsFrom6Months],
  nutrients: ["fiber", "folate"],
  servingGuidance: [
    {
      band: "6-8m",
      typicalAmount:
        "A half cob to gnaw at the baby's own pace — whatever shears off is the serving.",
    },
    {
      band: "9-12m",
      typicalAmount:
        "A tablespoon or two of smashed kernels, plus cob time whenever you have it.",
    },
    {
      band: "12-24m",
      typicalAmount:
        "A couple of spoonfuls of kernels with the family meal, scattered a few at a time.",
    },
  ],
  watchOuts: [
    "Whole kernels often reappear in the diaper looking untouched — corn's outer skin doesn't digest, and it's completely normal.",
  ],
  emoji: "🌽",
};

export default corn;
