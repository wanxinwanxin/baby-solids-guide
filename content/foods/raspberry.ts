import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const raspberry: Food = {
  slug: "raspberry",
  name: "Raspberry",
  aliases: [],
  category: "fruit",
  minAgeMonths: 6,
  ironRich: false,
  commonAllergen: null,
  chokingRisk: "low",
  nutritionHighlights: [
    "Unusually high in fiber for a fruit, supporting regular digestion",
    "A source of vitamin C for immunity and plant-iron absorption",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "Whole, deeply ripe raspberries pressed lightly flat between your fingers, or mashed with a fork into oatmeal or yogurt, since a ripe berry collapses at the gentlest pressure.",
      passFailTest:
        "Squeeze a berry between two fingers — it should fall apart almost on contact. A berry that holds together firmly is underripe; mash it thoroughly or skip it.",
      whyThisForm:
        "Raspberries are naturally hollow and built to collapse, so unlike round firm berries they flatten under gum pressure alone — light pre-squashing just guarantees it for a brand-new eater.",
      prepSteps: [
        "Rinse gently and discard any hard, pale, underripe berries.",
        "Press each berry lightly flat, or mash a handful with a fork and stir into a familiar food.",
        "Serve two or three at a time — they rake into a fist easily.",
      ],
      commonMistakes: [
        "Serving firm, pale, out-of-season berries that behave more like a round hazard than a raspberry.",
        "Panicking over red-stained drool and cheeks — that's pigment, not blood, and not a rash.",
      ],
      cutDiagram: "mash",
      media: [],
    },
    {
      band: "9-12m",
      form: "Whole ripe raspberries served as they are, each one soft enough to collapse between two fingers, offered a few at a time for pincer practice.",
      passFailTest:
        "The two-finger test on one berry from each punnet: it should crumble with almost no pressure. If it resists, press each berry flat before serving.",
      whyThisForm:
        "A soft, palm-sized-for-a-baby berry that self-destructs under pressure is one of the best pincer-grasp practice foods there is at 9 months.",
      prepSteps: [
        "Rinse, check ripeness with the squeeze test, and put three or four berries on the tray.",
        "Flatten any berry that feels firm at the core before it goes down.",
      ],
      commonMistakes: [
        "Assuming every red berry is ripe — winter raspberries can be firm at the core and deserve a quick press first.",
      ],
      media: [],
    },
    {
      band: "12-24m",
      form: "Whole ripe raspberries by the handful, straight up or stirred into yogurt and oatmeal, with only rock-firm underripe berries still getting a quick flatten.",
      passFailTest:
        "Same one-berry spot check per punnet: soft and collapsing means serve as-is; firm means give each berry a pinch first.",
      whyThisForm:
        "Toddler chewing handles soft collapsing fruit with ease, so raspberries can simply join meals and snacks without special geometry.",
      prepSteps: [
        "Rinse and serve, seated and supervised like all toddler meals.",
        "Fold into yogurt, oatmeal, or ricotta for less table-staining than loose berries.",
      ],
      commonMistakes: [
        "Buying only raspberries and skipping texture variety — rotating berries keeps chewing practice broad.",
      ],
      media: [],
    },
  ],
  firstFoodPick: true,
  flavorPairings: ["yogurt", "oatmeal", "peach", "banana"],
  tips: [
    "Ripeness rule: a ready raspberry is deeply colored and practically falls apart when lifted — firm berries with pale shoulders need mashing before serving.",
    "The tart-face grimace after a sour berry is a flavor reaction, not a sign of allergy — keep offering.",
    "Frozen raspberries thawed in a bowl collapse to the perfect texture and are cheaper than fresh most of the year.",
    "Mash a punnet with a fork and freeze in ice-cube trays for instant stir-ins to oatmeal and yogurt.",
  ],
  sources: [SOURCES.wicGuide, SOURCES.nhsFrom6Months, SOURCES.aapStartingSolids],
  nutrients: ["vitaminC", "fiber"],
  servingGuidance: [
    {
      band: "6-8m",
      typicalAmount:
        "Two or three flattened berries, or a tablespoon of mash stirred into oatmeal — follow the baby's lead on seconds.",
    },
    {
      band: "9-12m",
      typicalAmount:
        "A small handful of whole ripe berries, put down a few at a time for pincer practice.",
    },
    {
      band: "12-24m",
      typicalAmount:
        "A small handful with meals or snacks, plain or stirred into yogurt — some days it vanishes, some days it doesn't, and both are fine.",
    },
  ],
  emoji: "🫐",
};

export default raspberry;
