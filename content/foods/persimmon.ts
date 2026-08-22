import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const persimmon: Food = {
  slug: "persimmon",
  name: "Persimmon",
  aliases: ["fuyu", "hachiya", "kaki"],
  category: "fruit",
  minAgeMonths: 6,
  ironRich: false,
  commonAllergen: null,
  chokingRisk: "low",
  nutritionHighlights: [
    "Rich in beta-carotene, which the body converts to vitamin A for eye and immune development",
    "A good source of gentle fiber that keeps things moving",
    "Sweet enough on its own that it never needs added sugar",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "A fully ripe Fuyu persimmon peeled and cut into thin wide slices about the size of two adult fingers, each soft enough to squash between thumb and forefinger, or jelly-ripe Hachiya pulp spooned like a thick puree.",
      passFailTest:
        "Take a bite yourself first: ripe persimmon tastes purely sweet with zero mouth-drying pucker, and a slice should flatten under gentle finger pressure. Any chalky, furry feeling on your tongue fails the fruit.",
      whyThisForm:
        "Palmar-grasp babies pin a wide thin slice under a fist and gnaw the exposed edge, while Hachiya's jelly texture is spoonable straight away — and only fully ripe fruit is soft and pucker-free enough to enjoy.",
      prepSteps: [
        "Identify the variety: squat, tomato-shaped Fuyu is served sliced when soft-ripe; acorn-shaped Hachiya is used only when it feels like a water balloon.",
        "For Fuyu, peel, remove the leafy calyx and any seeds, and cut thin wide slices from the softest part.",
        "For Hachiya, halve the jelly-soft fruit and spoon the pulp out, mashing it smooth into oatmeal or yogurt.",
        "Taste-test a piece from the same fruit before every serve — ripeness varies fruit to fruit.",
      ],
      commonMistakes: [
        "Serving an underripe fruit — the tannins are harmless but so astringent that one chalky taste can put a baby off for weeks.",
        "Treating a firm Hachiya like a Fuyu: the pointy-bottomed variety is inedibly puckery until completely jelly-soft.",
        "Missing the occasional brown seed hiding in the flesh.",
      ],
      cutDiagram: "mash",
      media: [],
    },
    {
      band: "9-12m",
      form: "Soft-ripe seeded persimmon chopped into pieces about the size of your pinky fingernail, each squashing flat between two fingers, with Hachiya pulp still offered as a spoonable mash.",
      passFailTest:
        "Press a piece between two fingers — it should flatten with light pressure — and your own taste check should find sweetness with no drying pucker.",
      whyThisForm:
        "Small soft pieces feed the emerging pincer grasp, and persimmon's slippery-sweet flesh is easy to gum, so the only real gate remains full ripeness.",
      prepSteps: [
        "Peel a soft-ripe Fuyu, check for seeds, and dice into pinky-nail pieces.",
        "Roll slippery pieces in a pinch of ground oat cereal if they frustrate little fingers.",
        "Stir Hachiya pulp through porridge or yogurt for a spoon-fed option on firmer-fruit weeks.",
      ],
      commonMistakes: [
        "Cutting from a fruit that passed the squeeze test on one side but is still firm on the other — check the part you actually serve.",
        "Offering a big bowl at once; a few pieces at a time discourages cheek-stuffing.",
      ],
      cutDiagram: "bite-size",
      media: [],
    },
    {
      band: "12-24m",
      form: "Ripe Fuyu in thin slices or soft bite-size chunks eaten out of hand, and Hachiya halves served with a spoon so the toddler can scoop the jelly pulp themselves.",
      passFailTest:
        "The adult taste check still rules: pure sweetness and a flesh that dents under a fingertip pass; any hint of chalky pucker means the fruit waits another few days.",
      whyThisForm:
        "Toddlers with molars handle slices and chunks confidently, and excavating a Hachiya half with a spoon is genuinely fun utensil practice with a soft, forgiving target.",
      prepSteps: [
        "Slice or chunk soft-ripe Fuyu and serve with the family meal.",
        "Halve a jelly-ripe Hachiya, remove any seeds, and hand it over with a small spoon.",
      ],
      commonMistakes: [
        "Serving crisp, apple-firm Fuyu slices — even for toddlers, firm slippery slices are harder work and less safe than soft-ripe fruit.",
      ],
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["yogurt", "oatmeal", "cheese"],
  tips: [
    "Learn the two shapes once and prep becomes easy: squat Fuyu is ready when it gives like a ripe peach; pointed Hachiya is ready only when it sloshes like a water balloon.",
    "Ripen rock-hard persimmons on the counter — a paper bag with a banana speeds it up dramatically.",
    "Always taste a corner of the exact fruit you are serving; astringency is invisible but unmistakable on your own tongue.",
    "Jelly-ripe Hachiya pulp freezes well in cubes — thaw one into warm oatmeal for an instant no-sugar sweetener.",
  ],
  sources: [SOURCES.wicGuide, SOURCES.nhsFrom6Months, SOURCES.aapStartingSolids],
  nutrients: ["vitaminA", "fiber"],
  servingGuidance: [
    {
      band: "6-8m",
      typicalAmount:
        "A slice or two, or a spoonful of Hachiya pulp stirred into porridge — exploring the flavor is the whole goal.",
    },
    {
      band: "9-12m",
      typicalAmount:
        "A small handful of soft pieces offered a few at a time, refilled while the interest lasts.",
    },
    {
      band: "12-24m",
      typicalAmount:
        "A few slices or half a small fruit with a meal — sweet enough that it pairs best alongside protein and fat rather than solo.",
    },
  ],
  watchOuts: [
    "Underripe persimmon is intensely astringent — harmless, but the mouth-drying pucker can sour a baby on the fruit for a long while, so ripeness is non-negotiable.",
  ],
  emoji: "🟠",
};

export default persimmon;
