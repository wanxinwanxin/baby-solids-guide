import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const soba: Food = {
  slug: "soba",
  name: "Soba noodles",
  aliases: ["buckwheat noodles"],
  category: "grain",
  minAgeMonths: 6,
  ironRich: false,
  commonAllergen: "wheat",
  chokingRisk: "low",
  nutritionHighlights: [
    "The buckwheat share brings plant protein and minerals beyond what plain wheat noodles offer",
    "A quick, well-liked vehicle for keeping wheat exposure steady once it's introduced",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "Soba boiled a couple of minutes past the package time, rinsed well, and cut into soft pieces about the length of an adult pinky finger.",
      passFailTest:
        "Pinch a noodle between thumb and forefinger: it should squash flat and tear with no effort — a noodle with springy bounce needs more time in the pot.",
      whyThisForm:
        "A palmar-grasping baby traps food in a fist and gnaws what sticks out, so pinky-length pieces of fully softened noodle give a graspable ribbon that mashes against bare gums.",
      prepSteps: [
        "Boil soba past the package time until fully limp, then rinse well under running water to wash off surface starch and some of the salt cooked out of the dough.",
        "Toss with a drop of oil and cut into adult-pinky lengths with kitchen scissors.",
        "First time with wheat (most soba is a wheat-buckwheat blend): serve early in the day, keep the amount small, and watch for 2 hours.",
        "Never introduce it alongside another new food, so any reaction has one clear cause.",
      ],
      commonMistakes: [
        "Serving soba al dente the way adults like it — bounce is the enemy of gums.",
        "Skipping the rinse, which leaves the noodles starchier, saltier, and welded together.",
      ],
      cutDiagram: "strips",
      media: [],
    },
    {
      band: "9-12m",
      form: "Well-rinsed soft soba snipped into short pieces about the size of your pinky fingernail so a pincer grasp can lift each slippery bite.",
      passFailTest:
        "Lift one piece with your own thumb and forefinger — if it slithers out of your grip, toss the batch with a drop more oil or fold it into thick yogurt for traction.",
      whyThisForm:
        "The pincer grasp emerging around 9 months turns short slippery noodle bits into engaging precision practice, sized so an unchewed piece still passes safely.",
      prepSteps: [
        "Cook and rinse as for 6–8 months, keeping the noodles fully soft.",
        "Snip into pinky-nail bits with scissors straight in the bowl.",
        "Scatter a few pieces at a time to keep the pace calm.",
      ],
      commonMistakes: [
        "Dressing the baby's portion with tsuyu or soy-based dipping sauce made for adults.",
      ],
      cutDiagram: "bite-size",
      media: [],
    },
    {
      band: "12-24m",
      form: "Soft soba cut to roughly two-inch lengths and served slightly moist in a mild, low-salt broth, easy to spear or twirl with a toddler fork.",
      passFailTest:
        "A noodle should still squash between two fingers, and a forkful should cling long enough for a wobbly self-feeder to land the bite.",
      whyThisForm:
        "Toddlers are drilling utensil skills, and short moist noodles are forgiving fork food; molars and rotary chewing handle longer noodles now, and slurping is chewing practice in disguise.",
      prepSteps: [
        "Cook soft, snip to two-inch lengths, and serve in a splash of unsalted or well-diluted broth.",
        "Add soft tofu cubes or shredded vegetables from the family pot before it's seasoned.",
      ],
      commonMistakes: [
        "Ladling the toddler's bowl from a fully seasoned adult noodle soup.",
      ],
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["tofu", "edamame", "salmon", "avocado"],
  tips: [
    "If wheat is already introduced via bread or pasta with no reaction, soba is just a new texture — the first-time caution steps no longer apply.",
    "The post-boil rinse matters twice over: it washes off clingy starch and some of the salt that soba dough carries.",
    "Kitchen scissors straight in the bowl beat a knife and board for portioning noodles at every stage.",
    "A drop of oil after rinsing keeps the noodles from welding into one uncuttable clump.",
  ],
  sources: [SOURCES.eatStudy, SOURCES.cdcFoodsAndDrinks],
  nutrients: ["protein"],
  servingGuidance: [
    {
      band: "6-8m",
      typicalAmount:
        "A few pinky-length noodle pieces to start — early meals are mostly texture exploration, and that counts.",
      frequency: "About twice a week once tolerated keeps the wheat exposure steady",
    },
    {
      band: "9-12m",
      typicalAmount:
        "A couple of tablespoons of snipped bits, offered a few pieces at a time while the reaching continues.",
    },
    {
      band: "12-24m",
      typicalAmount:
        "A quarter to half cup of short noodles in mild broth with the family meal — the toddler resizes it daily.",
    },
  ],
  watchOuts: [
    "Most soba is a wheat-buckwheat blend — treat it as wheat unless the label says 100% buckwheat (juwari), and note that even pure-buckwheat soba is often made on shared lines.",
    "The noodles themselves are salted and the dipping sauces are saltier — rinse well after cooking and skip the seasoning sachet for babies.",
  ],
  emoji: "🍜",
};

export default soba;
