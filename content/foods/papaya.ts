import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const papaya: Food = {
  slug: "papaya",
  name: "Papaya",
  aliases: ["pawpaw"],
  category: "fruit",
  minAgeMonths: 6,
  ironRich: false,
  commonAllergen: null,
  chokingRisk: "low",
  nutritionHighlights: [
    "An excellent source of vitamin C, which helps the body absorb iron from plant foods served in the same meal",
    "Provides beta-carotene, which the body converts to vitamin A for eyes and immune development",
    "Contains folate, needed for rapid cell growth in the first years",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "A ripe papaya wedge about the length and width of two adult fingers, every black seed scraped out, with the flesh soft enough to spread like room-temperature butter.",
      passFailTest:
        "Press the cut flesh with a fingertip — it should dent instantly and smear when rubbed, like very ripe avocado. Flesh that resists or feels crisp means the fruit needs more days on the counter.",
      whyThisForm:
        "Babies at this age trap food in a whole fist (palmar grasp) and gnaw the end sticking out, so a long soft wedge gives a graspable handle while butter-soft flesh dissolves against bare gums.",
      prepSteps: [
        "Halve the papaya lengthwise and scoop out all the black seeds and stringy pulp with a spoon.",
        "Cut a peeled wedge roughly the size of two adult fingers from the ripest part.",
        "If the wedge is too slippery to hold, leave skin on the lower half as a handle or roll one end in ground oat cereal.",
        "Run the fingertip dent test on the thickest part before it goes on the tray.",
      ],
      commonMistakes: [
        "Serving underripe papaya — firm orange flesh looks ready but is too crisp for bare gums.",
        "Missing a few seeds in the cavity: they are slippery, round, and worth a second scrape.",
        "Peeling completely and then wondering why the wedge shoots out of a small fist.",
      ],
      cutDiagram: "wedge-handle",
      media: [],
    },
    {
      band: "9-12m",
      form: "Ripe seeded papaya cut into soft cubes about the size of your pinky fingernail, each one squashing flat between two fingers with barely any pressure.",
      passFailTest:
        "Squeeze a cube between thumb and forefinger — it should flatten with the lightest pinch and feel silky, never crisp or watery-firm.",
      whyThisForm:
        "The pincer grasp arrives around 9 months, and small soft cubes give precise pick-up practice while papaya's melting texture stays safe to gum without teeth.",
      prepSteps: [
        "Seed and peel the papaya, then dice the ripest flesh into pinky-nail cubes.",
        "Roll the cubes in a pinch of ground oat cereal if they keep slipping through small fingers.",
        "Scatter a few cubes at a time to discourage cheek-stuffing.",
      ],
      commonMistakes: [
        "Cutting cubes from the firmer stem end while the blossom end is the soft, ready part.",
        "Handing over a loaded bowl — a mound of slippery cubes invites shoveling.",
      ],
      cutDiagram: "bite-size",
      media: [],
    },
    {
      band: "12-24m",
      form: "Soft ripe papaya in bite-size chunks or thin slices alongside the family meal, or half a small seeded papaya served as a boat for spoon-scooping practice.",
      passFailTest:
        "The flesh should still dent under a light fingertip; if you need a sawing motion to cut it, it is not ripe enough to serve raw.",
      whyThisForm:
        "Toddlers with emerging molars manage larger soft pieces easily, and scooping flesh straight from the papaya half builds real utensil skills with a forgiving, soft target.",
      prepSteps: [
        "Cut chunks or slices from a seeded, ripe papaya and serve with the family meal.",
        "For spoon practice, hand over a seeded quarter or half papaya with a small spoon and let the toddler excavate.",
      ],
      commonMistakes: [
        "Abandoning papaya after one indifferent meal — mild fruits often need many relaxed exposures before they land.",
      ],
      media: [],
    },
  ],
  firstFoodPick: true,
  flavorPairings: ["yogurt", "oatmeal", "banana"],
  tips: [
    "Ripeness check: a ready papaya gives under gentle thumb pressure like a ripe peach and smells faintly sweet at the blossom end — skin color varies too much to trust alone.",
    "A rock-hard papaya ripens on the counter in two to four days; paper-bagging it with a banana speeds things up.",
    "The seeds scoop out fastest with a metal spoon in one firm pass down the cavity — chase stragglers, since they are round and slick.",
    "A squeeze of lime on papaya brightens its mild flavor for the whole family without adding any sugar or salt.",
  ],
  sources: [SOURCES.wicGuide, SOURCES.nhsFrom6Months, SOURCES.aapStartingSolids],
  nutrients: ["vitaminC", "vitaminA", "folate"],
  servingGuidance: [
    {
      band: "6-8m",
      typicalAmount:
        "One soft wedge at a time, one or two per meal — gumming, smearing, and sucking all count as eating at this stage.",
    },
    {
      band: "9-12m",
      typicalAmount:
        "A small handful of pinky-nail cubes, offered a few pieces at a time and refilled while the reaching continues.",
    },
    {
      band: "12-24m",
      typicalAmount:
        "A few chunks or slices — roughly a quarter of a small papaya — served with the meal; appetite swings day to day.",
    },
  ],
  watchOuts: [
    "Papaya's soft flesh smears everywhere — a wipe-down after the meal beats scrubbing dried fruit off eyebrows later.",
  ],
  emoji: "🍈",
};

export default papaya;
