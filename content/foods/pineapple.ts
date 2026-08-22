import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const pineapple: Food = {
  slug: "pineapple",
  name: "Pineapple",
  aliases: [],
  category: "fruit",
  minAgeMonths: 6,
  ironRich: false,
  commonAllergen: null,
  chokingRisk: "moderate",
  chokingNotes:
    "Pineapple is fibrous: underripe flesh and the woody core tear into tough, stringy strands that can gag a baby or wad into a plug. Mitigate by serving only very ripe fruit, cutting out the entire core, slicing thin across the grain so the fibers are short, and steaming anything that will not shred between your fingers.",
  nutritionHighlights: [
    "Exceptionally rich in vitamin C — a single small serving covers a baby's daily need and boosts iron absorption",
    "The bright acidity is a real palate-stretcher next to the mild sweetness of most first fruits",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "A thin wedge of very ripe pineapple about two adult fingers long, core and every scrap of skin removed, cut across the grain and tender enough to shred between your fingers.",
      passFailTest:
        "The shred test: pull a piece apart with your fingers — ripe flesh separates into soft short strands with no effort. If you have to tug, steam the wedges 5–8 minutes.",
      whyThisForm:
        "A palmar-grasping baby gnaws on whatever sticks out of the fist, so the wedge must be thin and cut across the grain — short, tender fibers mash against gums where long tough ones would string and gag.",
      prepSteps: [
        "Slice off the crown and base, stand the pineapple up, and cut away all skin including the little brown eyes.",
        "Quarter lengthwise and slice the woody core strip completely off each quarter.",
        "Cut thin wedges across the grain, about two adult fingers long, and run the shred test.",
        "Steam wedges that fail the test for 5–8 minutes, cool, and serve one at a time.",
      ],
      commonMistakes: [
        "Serving firm, pale, tart pineapple — only deeply ripe fruit is tender enough for gums.",
        "Leaving core remnants on the wedge — the core is woody rope, not food, at this age.",
        "Cutting along the grain, which produces exactly the long strings you are trying to avoid.",
      ],
      cutDiagram: "wedge-handle",
      media: [],
    },
    {
      band: "9-12m",
      form: "Very ripe pineapple in soft core-free pieces about the size of your pinky fingernail, cut across the grain so every fiber stays short.",
      passFailTest:
        "Pull a piece apart — it should shred into short soft strands instantly. Squeeze another between two fingers; juice, not resistance, should be the result.",
      whyThisForm:
        "Small, soft pieces feed the new pincer grasp, and keeping the fibers short means each piece gums down without stringing across the tongue.",
      prepSteps: [
        "Prepare the fruit as before — fully skinned, fully cored, ripe or steamed.",
        "Chop across the grain into pinky-nail-sized pieces.",
        "Offer a few pieces at a time next to something mild like yogurt to balance the acidity.",
      ],
      commonMistakes: [
        "Using canned pineapple in syrup — if using canned, choose fruit packed in juice, not syrup.",
        "Serving big soft chunks that a baby stuffs whole — small pieces, a few at a time.",
      ],
      cutDiagram: "bite-size",
      media: [],
    },
    {
      band: "12-24m",
      form: "Ripe pineapple in thin slices or small flat chunks, still core-free and cut across the grain, served alongside family meals or cooked into them.",
      passFailTest:
        "Bite a piece yourself — it should be juicy and tender with no woody resistance; anything that squeaks against your teeth is underripe or core.",
      whyThisForm:
        "Toddlers with molars manage ripe pineapple well, but the fibrous core and long-grain strings remain a gagging and wadding hazard beyond this age too.",
      prepSteps: [
        "Continue full skin and core removal, slicing across the grain.",
        "Offer thin slices with meals, or dice into cooked dishes like rice or pork where the heat softens it further.",
      ],
      commonMistakes: [
        "Handing over a big fibrous ring or spear to gnaw — thin cross-grain slices remain the safe geometry.",
      ],
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["yogurt", "pork", "chicken", "rice"],
  tips: [
    "Ripeness test: a ready pineapple smells sweet at the base, gives slightly when pressed, and a center leaf pulls out with little effort.",
    "The riper the fruit, the shorter and softer the fibers — patience with ripening does more for safety than any knife trick.",
    "Frozen pineapple chunks steamed until shreddable are a reliable off-season stand-in.",
    "If the first taste makes a scrunched face, mix small pieces into yogurt or oatmeal — the acid softens and the flavor still registers.",
  ],
  sources: [SOURCES.wicGuide, SOURCES.nhsFrom6Months, SOURCES.aapStartingSolids],
  nutrients: ["vitaminC"],
  servingGuidance: [
    {
      band: "6-8m",
      typicalAmount:
        "One thin wedge at a time, a piece or two per meal — gnawing and juice-sucking count as eating.",
    },
    {
      band: "9-12m",
      typicalAmount:
        "A tablespoon or two of small pieces alongside milder foods — let the baby set the pace with the acidity.",
    },
    {
      band: "12-24m",
      typicalAmount:
        "A few thin slices or a small handful of chunks with a meal — bright enough that a little goes a long way.",
    },
  ],
  watchOuts: [
    "Pineapple's acid and enzymes can leave a harmless red tingle around the mouth and chin — it is contact irritation, not an allergy; a smear of barrier balm before eating and a water wipe after prevent it.",
  ],
  emoji: "🍍",
};

export default pineapple;
