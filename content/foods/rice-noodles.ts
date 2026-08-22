import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const riceNoodles: Food = {
  slug: "rice-noodles",
  name: "Rice noodles",
  aliases: ["rice sticks", "pho noodles", "vermicelli"],
  category: "grain",
  minAgeMonths: 6,
  ironRich: false,
  commonAllergen: null,
  chokingRisk: "low",
  nutritionHighlights: [
    "Naturally gluten-free and gentle — a useful noodle for families keeping wheat exposures separate",
    "Brown-rice versions add whole-grain fiber; plain white ones are mostly easy carbohydrate energy",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "Wide, flat rice noodles cooked until completely soft, tossed with a drop of oil, and cut into pieces about the length of an adult pinky finger.",
      passFailTest:
        "Pinch a noodle between thumb and forefinger: it should squash flat with light pressure and tear with no effort — a springy, elastic noodle needs more time in the pot.",
      whyThisForm:
        "A palmar-grasping baby traps food in a fist and works on what sticks out, so pinky-length pieces of wide soft noodle give a graspable ribbon that dissolves against bare gums.",
      prepSteps: [
        "Choose wide, flat rice noodles and boil 1–2 minutes past the package time, until fully limp.",
        "Rinse briefly, toss with a drop of oil so they don't weld together, and cut into adult-pinky lengths with kitchen scissors.",
        "Serve a few pieces at a time, plain or with a mild unsalted sauce.",
      ],
      commonMistakes: [
        "Only soaking the noodles as the package suggests — soaked-but-chewy noodles are for stir-fries, not for gums.",
        "Serving a big slippery tangle that frustrates the fist and ends the meal early.",
      ],
      cutDiagram: "strips",
      media: [],
    },
    {
      band: "9-12m",
      form: "Fully softened rice noodles snipped into short pieces about the size of your pinky fingernail so the slippery bites stay manageable for a pincer grasp.",
      passFailTest:
        "Lift one piece with your own thumb and forefinger — if it slides straight out of your grip, toss the batch with a pinch of ground oat cereal or a drop more oil for traction.",
      whyThisForm:
        "Around 9 months the pincer grasp takes over, and short noodle bits are slippery little practice targets — small enough that a whole piece swallowed unchewed still passes safely.",
      prepSteps: [
        "Cook as for 6–8 months, keeping the noodles fully soft.",
        "Snip into pinky-nail bits with scissors straight in the bowl.",
        "Scatter a few pieces at a time; mix into mashed avocado or a mild sauce for grip and flavor.",
      ],
      commonMistakes: [
        "Piling on a whole bowl at once — slippery pieces invite two-handed cramming.",
      ],
      cutDiagram: "bite-size",
      media: [],
    },
    {
      band: "12-24m",
      form: "Soft rice noodles cut to roughly two-inch lengths and served slightly moist in a mild, low-salt broth or sauce for early fork-and-spoon practice.",
      passFailTest:
        "A noodle should still squash between two fingers, and a forkful should hang on long enough for a wobbly self-feeder to land the bite.",
      whyThisForm:
        "Toddlers are drilling utensil skills, and short moist noodles are a forgiving fork food; molars and rotary chewing now handle longer, thicker noodles well.",
      prepSteps: [
        "Cook soft, snip to two-inch lengths, and moisten with mild broth or the family sauce before salting the pot.",
        "Offer a toddler fork and let slurping happen — it's chewing practice in disguise.",
      ],
      commonMistakes: [
        "Serving noodles dressed from a salty noodle-kit sauce or fish-sauce dressing made for adults.",
      ],
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["tofu", "chicken", "edamame", "avocado"],
  tips: [
    "Cook past the package time on purpose — the squash-between-two-fingers test, not the clock, decides when they're baby-ready.",
    "Rinse and toss with a drop of oil right after draining, or the noodles weld into one uncuttable slab.",
    "Kitchen scissors straight in the bowl are the fastest way to portion noodles at every stage.",
    "Rotate rice noodles with oat, wheat, and other grains across the week rather than making them a daily default.",
  ],
  sources: [SOURCES.fdaArsenic, SOURCES.cdcFoodsAndDrinks, SOURCES.nhsFrom6Months],
  nutrients: ["fiber"],
  servingGuidance: [
    {
      band: "6-8m",
      typicalAmount:
        "A few pinky-length pieces to start — noodles are mostly texture play at this age, and that's the point.",
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
    "Like all rice foods, rice noodles can carry inorganic arsenic — vary the grain across the week instead of serving them daily.",
    "Noodle-kit seasoning packets and dipping sauces are very salty — dress the baby's portion plainly.",
  ],
  emoji: "🍜",
};

export default riceNoodles;
