import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const cashewButter: Food = {
  slug: "cashew-butter",
  name: "Cashew butter",
  aliases: ["cashew"],
  category: "protein",
  minAgeMonths: 6,
  ironRich: false,
  commonAllergen: "tree-nut",
  chokingRisk: "high",
  chokingNotes:
    "Undiluted cashew butter is a thick, sticky paste that can seal off an infant's airway, and whole cashews are off-limits until at least age 4. Mitigate by thinning it to a drizzle or spreading it in a paper-thin layer — a spoonful is never a safe serving.",
  nutritionHighlights: [
    "Plant protein and healthy fats for growth and energy",
    "A useful source of zinc and magnesium",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "One teaspoon of smooth, unsalted cashew butter stirred with 2–3 teaspoons of warm water, breast milk, or formula until it pours off the spoon like runny yogurt, folded into a well-tolerated puree.",
      passFailTest:
        "Scoop and tilt: the mixture should slide off the spoon in a slow, continuous ribbon. If it holds its shape or strings stickily, thin it further.",
      whyThisForm:
        "An infant this age has no way to dislodge a sticky mass from the palate or throat, so the cashew protein must arrive fully thinned — the exposure counts, the texture must not.",
      prepSteps: [
        "Choose 100% smooth cashew butter with no added salt, sugar, or honey.",
        "Stir 1 teaspoon with 2–3 teaspoons of warm water, breast milk, or formula until it drizzles freely.",
        "Mix into a familiar food (oatmeal, mashed banana) — never another new food, so any reaction is traceable to cashew.",
        "First time: serve early in the day, a small amount, and watch for 2 hours.",
      ],
      commonMistakes: [
        "Skipping a separate cashew introduction because almond went fine — every tree nut is its own distinct allergen.",
        "Offering an unthinned dab on the spoon 'just to taste' — even a small thick glob is the dangerous form.",
        "Blending it into a brand-new fruit puree, which makes any reaction impossible to attribute.",
      ],
      cutDiagram: "thin-spread",
      media: [],
    },
    {
      band: "9-12m",
      form: "Cashew butter in a nearly transparent smear across a lightly toasted bread strip roughly one adult finger long and wide, or whisked thin into yogurt.",
      passFailTest:
        "Tilt the strip toward the light — the bread's surface should show through the smear everywhere. Any spot with real depth gets scraped thinner.",
      whyThisForm:
        "Self-feeding takes over as the pincer grasp matures, but cashew butter stays exactly as sticky — a translucent layer on a graspable strip continues the exposure without the plug risk.",
      prepSteps: [
        "Toast bread lightly and slice into finger-width strips.",
        "Spread the thinnest possible film of smooth cashew butter and scrape off the excess.",
        "Serve with sips of water from an open cup.",
      ],
      commonMistakes: [
        "Judging thickness by eye from above — tilt the strip sideways; a layer that looked thin can pool surprisingly deep.",
      ],
      cutDiagram: "thin-spread",
      media: [],
    },
    {
      band: "12-24m",
      form: "Thin spreads and drizzles only — on toast, in porridge, or whisked into sauces — because spoonfuls of cashew butter and whole cashews remain unsafe for toddlers.",
      passFailTest:
        "The see-through test still applies: visible thickness on the tilted toast means too much butter for a safe serve.",
      whyThisForm:
        "Sticky boluses and hard whole nuts stay leading choking hazards until around age 4; toddler molars are not yet up to grinding a nut into a safe swallow.",
      prepSteps: [
        "Rotate cashew through the week as thin spreads, porridge stir-ins, and sauce bases.",
        "Blend soaked cashews smooth into family sauces or soups for an easy hidden serving.",
      ],
      commonMistakes: [
        "Sharing trail mix or snack nuts with a toddler — whole cashews are as risky at two as they were at one.",
      ],
      cutDiagram: "thin-spread",
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["banana", "mango", "oatmeal", "yogurt"],
  tips: [
    "Same math as peanut butter: 1 teaspoon smooth cashew butter to 2–3 teaspoons warm liquid reaches the drizzly, safe consistency.",
    "Cashew butter is naturally a little stiffer than peanut butter — err toward the 3-teaspoon end of the ratio and whisk while the liquid is warm.",
    "Tolerating almond does not guarantee tolerating cashew: treat this as a full first introduction with its own early-in-the-day, watch-2-hours serving.",
    "Once introduced, offer cashew about twice a week to keep the exposure steady.",
  ],
  sources: [SOURCES.eatStudy, SOURCES.aaaaiFoodAllergy, SOURCES.aapChoking],
  nutrients: ["healthyFats", "protein", "zinc"],
  servingGuidance: [
    {
      band: "6-8m",
      typicalAmount:
        "About 1 teaspoon whisked to a drizzle and folded into a familiar puree — the exposure matters, not the volume; the baby leads.",
      frequency: "About twice a week once tolerated",
    },
    {
      band: "9-12m",
      typicalAmount:
        "A see-through smear on a toast strip or a teaspoon whisked into yogurt — offer, don't push.",
    },
    {
      band: "12-24m",
      typicalAmount:
        "A thin spread on a strip of toast or a teaspoon stirred through porridge or a sauce — appetite is the guide, not the spoon.",
    },
  ],
  watchOuts: [
    "Read the jar: added salt, sugar, or honey is common — 100% cashews is the pick.",
    "Almond going smoothly proves nothing about cashew — every tree nut gets its own watchful first serving.",
  ],
  emoji: "🫙",
};

export default cashewButter;
