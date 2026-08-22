import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const crab: Food = {
  slug: "crab",
  name: "Crab",
  aliases: ["crabmeat"],
  category: "protein",
  minAgeMonths: 6,
  ironRich: false,
  commonAllergen: "shellfish",
  chokingRisk: "low",
  nutritionHighlights: [
    "Complete protein that arrives naturally soft and shredded",
    "One of the richest everyday sources of zinc for growth and immune function",
    "A naturally low-mercury seafood with vitamin B12",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "Fully cooked crabmeat picked over piece by piece for shell and cartilage fragments, shredded to soft threads, moistened with a little water or cooking liquid, and folded into a familiar puree or mash.",
      passFailTest:
        "Spread the shreds thin on a plate and drag a fingertip through every bit — you should feel only soft, moist threads, never a hard or papery edge, and each shred should flatten under a light press.",
      whyThisForm:
        "Cooked crab is naturally tender enough for bare gums, so the real work is the fragment check — a stray sliver of shell is the only hard thing in an otherwise perfect early texture.",
      prepSteps: [
        "Steam or buy fully cooked crab, pick the meat, then spread it thin and run fingertips through every shred to catch shell and cartilage fragments.",
        "Shred to soft threads, stir in a spoonful of water or cooking liquid so the meat clumps softly, and fold into a familiar mash.",
        "Mix into or serve alongside familiar foods, never another new food.",
        "First time: serve early in the day, a small amount, and watch for 2 hours.",
      ],
      commonMistakes: [
        "Trusting 'picked' crabmeat straight from the tub — small shell fragments routinely survive commercial picking.",
        "Reaching for imitation crab, which is a salty processed blend that contains fish paste rather than crab.",
        "Introducing crab at dinner, so any delayed reaction lands overnight.",
      ],
      cutDiagram: "shred",
      media: [],
    },
    {
      band: "9-12m",
      form: "Fragment-checked crab shreds gathered into soft, moist clumps about the size of a pea to a pinky fingernail, easy to pick up and easy to flatten between two fingers.",
      passFailTest:
        "Pinch a clump — it should squash flat and stay together moistly, and a second fingertip sweep through the serving should confirm no shell slipped through.",
      whyThisForm:
        "Small, slightly sticky clumps are ideal pincer-grasp targets, and regular servings keep the shellfish allergen established once it has been introduced.",
      prepSteps: [
        "Check and shred as for 6–8 months, then press the moist shreds into pea-to-pinky-nail clumps.",
        "Toss with a little olive oil, plain yogurt, or mashed avocado if the meat has dried in the fridge.",
        "Scatter a few clumps at a time on the tray alongside a familiar food.",
      ],
      commonMistakes: [
        "Serving dry, papery shreds that scatter and stick — moisture makes crab easy to swallow.",
        "Skipping the fragment sweep because the last serving was clean.",
      ],
      cutDiagram: "shred",
      media: [],
    },
    {
      band: "12-24m",
      form: "Fragment-checked crab folded through moist family dishes like rice, pasta, or soft corn-free crab cakes cut into strips about the width of an adult finger.",
      passFailTest:
        "Every forkful should press flat between two fingers with no hard edges; cake strips should dent easily under a fingertip.",
      whyThisForm:
        "Toddlers chew soft shellfish well, so the aims are routine and variety — crab a couple of times a month or week keeps the allergen in the diet in family-meal form.",
      prepSteps: [
        "Fold checked crab shreds into a moist grain or sauced dish, or bind with mashed potato and egg into soft patties.",
        "Pan-cook patties gently and cut into finger-width strips before serving.",
      ],
      commonMistakes: [
        "Substituting imitation crab sticks — they are high in sodium and deliver fish, not the shellfish allergen.",
      ],
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["rice", "avocado", "zucchini", "potato"],
  tips: [
    "Do the fragment check in bright light with the meat spread thin — shell slivers are the same color as the meat and hide inside clumps.",
    "Fresh-picked or refrigerated pasteurized lump crab is the easiest starting point; give canned crab a brief rinse to shed some of its salt.",
    "A spoonful of mashed avocado binds dry crab shreds into clumps a baby can actually pick up.",
    "Freeze checked, moistened crab in ice-cube portions so keeping shellfish in the rotation never requires picking a whole crab again.",
  ],
  sources: [SOURCES.fdaFish, SOURCES.aaaaiFoodAllergy, SOURCES.wicGuide],
  nutrients: ["protein", "zinc"],
  servingGuidance: [
    {
      band: "6-8m",
      typicalAmount:
        "A teaspoon or two of moist shreds folded into a familiar mash — a taste-size first serve that grows with tolerance.",
      frequency: "About twice a week once tolerated, to keep the shellfish exposure steady.",
    },
    {
      band: "9-12m",
      typicalAmount:
        "A tablespoon of soft clumps, offered a few at a time — the baby sets the count.",
      frequency: "About twice a week keeps the shellfish allergen comfortably in the diet.",
    },
    {
      band: "12-24m",
      typicalAmount:
        "A few tablespoons folded into a family dish, or one soft patty strip — appetite varies meal to meal.",
      frequency: "Keep shellfish in the rotation about twice a week.",
    },
  ],
  watchOuts: [
    "Imitation crab (surimi) is a salty processed product made from fish paste — it carries far more sodium and doesn't provide the shellfish exposure real crab does.",
    "Canned and pasteurized crab can be briny — a quick rinse in a sieve brings the salt down.",
  ],
  emoji: "🦀",
};

export default crab;
