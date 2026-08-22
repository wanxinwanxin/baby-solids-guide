import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const oatCereal: Food = {
  slug: "oat-cereal",
  name: "Iron-fortified oat cereal",
  aliases: ["infant oat cereal", "baby oat cereal"],
  category: "grain",
  minAgeMonths: 6,
  ironRich: true,
  commonAllergen: null,
  chokingRisk: "low",
  nutritionHighlights: [
    "Iron-fortified — the fortification is the whole point, arriving exactly as a baby's iron stores from birth run low around 6 months",
    "Typically fortified with zinc and B vitamins as well",
    "Oats are a gentle, easy-to-digest first grain",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "Iron-fortified infant oat cereal whisked with breast milk, formula, or water — about 1 tablespoon of cereal to 4–5 tablespoons of liquid — into a smooth, completely lump-free puree that falls slowly off a tilted spoon.",
      passFailTest:
        "Tilt a loaded spoon: the cereal should slide off in one slow, smooth dollop. If it pours like milk it is too thin; if it sits like paste it is too thick for a first eater.",
      whyThisForm:
        "A brand-new eater is still learning to move food from the front of the tongue to the back and swallow on purpose — a smooth, barely-thick puree gives that reflex the easiest possible material to practice on.",
      prepSteps: [
        "Measure 1 tablespoon of dry fortified oat cereal into a bowl.",
        "Whisk in 4–5 tablespoons of breast milk, formula, or warm water until completely smooth and lump-free.",
        "Wait one minute and re-check the thickness — fortified cereal keeps absorbing liquid as it stands.",
        "Serve with a soft-tipped spoon; treat first meals as practice, not calories.",
      ],
      commonMistakes: [
        "Putting cereal in a bottle — it teaches no eating skills and adds needless calories to milk feeds.",
        "Mixing it stiff on day one; start soupy and thicken over the following weeks.",
        "Saving leftovers the feeding spoon has touched — saliva enzymes thin the bowl to liquid and it spoils fast.",
      ],
      cutDiagram: "mash",
      media: [],
    },
    {
      band: "9-12m",
      form: "The same fortified cereal mixed noticeably thicker — roughly 1 tablespoon of cereal to 2–3 tablespoons of liquid — so it holds a soft mound on the spoon, with mashed fruit stirred through for texture.",
      passFailTest:
        "Turn the spoon on its side: the mound should slump slowly rather than pour, and any fruit lump should smear flat between two fingers.",
      whyThisForm:
        "This is the window for building lump tolerance and chewing motions, and a thicker cereal also clings to a preloaded spoon that a baby with an emerging pincer grasp can grab and steer herself.",
      prepSteps: [
        "Mix 1 tablespoon of cereal with 2–3 tablespoons of liquid for a soft, mounding texture.",
        "Stir through mashed banana, pear, or prunes for flavor and gentle lumps.",
        "Preload a spoon, rest it on the tray, and let the baby bring it to her own mouth.",
      ],
      commonMistakes: [
        "Staying at the thin, silky mix for months — babies who never meet lumps in this window often fight them later.",
      ],
      cutDiagram: "mash",
      media: [],
    },
    {
      band: "12-24m",
      form: "Fortified oat cereal mixed to a thick, spoon-clinging porridge with soft lumps and bite-size pieces of soft fruit folded in, self-fed with a small toddler spoon at family breakfast.",
      passFailTest:
        "Flip a loaded spoon upside down for a second — the porridge should cling rather than fall, and every lump should still smash easily between your fingers.",
      whyThisForm:
        "Toddlers are consolidating utensil skills, and a thick porridge that stays on a self-steered spoon rewards the effort; the fortified iron remains useful insurance in a picky-eating year.",
      prepSteps: [
        "Mix the cereal thick, or fold it into regular oatmeal to boost the iron of a family breakfast.",
        "Top with chopped soft fruit and hand over the spoon.",
      ],
      commonMistakes: [
        "Retiring fortified cereal at the first birthday — it stays one of the cheapest, easiest iron sources for a selective toddler.",
      ],
      cutDiagram: "mash",
      media: [],
    },
  ],
  firstFoodPick: true,
  flavorPairings: ["banana", "pear", "prunes", "peanut-butter"],
  tips: [
    "The starter ratio to memorize: 1 tablespoon cereal to 4–5 tablespoons liquid for silky-smooth, then work toward 1-to-2 as skills grow.",
    "Mix with the baby's own breast milk or formula at first — the familiar taste smooths the introduction.",
    "Stir a vitamin C fruit (mashed strawberry, kiwi, or orange segments' juice) into the bowl; vitamin C meaningfully boosts absorption of the fortified iron.",
    "Whisk the liquid in gradually rather than dumping it all at once — that is the difference between silky and lumpy.",
    "The dry cereal doubles as a grip aid: roll slippery fruit pieces in a pinch of it for traction.",
  ],
  sources: [SOURCES.wicGuide, SOURCES.cdcFoodsAndDrinks, SOURCES.aapStartingSolids],
  nutrients: ["iron"],
  servingGuidance: [
    {
      band: "6-8m",
      typicalAmount:
        "Start with 1 tablespoon of dry cereal mixed thin — a few practice spoonfuls may be the whole meal, and that's fine.",
      frequency: "Many families offer it daily while it's a main iron source.",
    },
    {
      band: "9-12m",
      typicalAmount:
        "A bowl made from 1–2 tablespoons of dry cereal, mixed thick — let the baby's spoon-grabs set the pace.",
    },
    {
      band: "12-24m",
      typicalAmount:
        "A small bowl — 2–3 tablespoons dry — at breakfast; an offer, never a quota.",
    },
  ],
  emoji: "🥣",
};

export default oatCereal;
