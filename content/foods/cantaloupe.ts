import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const cantaloupe: Food = {
  slug: "cantaloupe",
  name: "Cantaloupe",
  aliases: ["rockmelon", "muskmelon"],
  category: "fruit",
  minAgeMonths: 6,
  ironRich: false,
  commonAllergen: null,
  chokingRisk: "low",
  nutritionHighlights: [
    "Exceptionally rich in beta-carotene for a melon, which the body converts to vitamin A",
    "Provides vitamin C to support immunity and iron absorption",
    "Mostly water — a genuinely hydrating fruit for hot days",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "A thin slab of ripe cantaloupe about the length and width of two adult fingers, every trace of rind cut away, soft enough to mash between thumb and finger.",
      passFailTest:
        "Press a slab between thumb and forefinger — ripe cantaloupe flattens with gentle pressure. If it resists, choose a riper melon; steaming melon is a last resort.",
      whyThisForm:
        "A palmar-grasping baby needs a long flat handle, and cutting the slab thin means the bites that shear off are small and easily gummed — but wet melon is slippery, so grip prep earns its keep here.",
      prepSteps: [
        "Scrub the whole rind under running water before cutting so the knife doesn't drag surface germs through the flesh.",
        "Halve, scoop out all seeds and strings, and cut the rind fully away.",
        "Slice thin slabs about two adult fingers long and pat them dry.",
        "Serve one slab at a time; roll it in a pinch of ground oat cereal if it keeps escaping the fist.",
      ],
      commonMistakes: [
        "Serving thick chunky cubes instead of thin slabs — thick firm melon breaks into gum-proof lumps.",
        "Leaving a strip of rind as a 'handle' — rind chunks are tough and easy to bite through unpredictably.",
        "Skipping the rind scrub: the knife carries whatever lives on the netting straight through the fruit.",
      ],
      cutDiagram: "batons",
      media: [],
    },
    {
      band: "9-12m",
      form: "Ripe cantaloupe chopped into soft rind-free pieces about the size of your pinky fingernail, each squashing easily between two fingers.",
      passFailTest:
        "Squeeze a piece between two fingers — it should flatten without effort. Firm crunchy pieces mean the melon needs more ripening.",
      whyThisForm:
        "Small, soft, irregular pieces feed the brand-new pincer grasp, and their wet-slick surface is genuinely useful fine-motor practice.",
      prepSteps: [
        "Prepare the melon as before — scrubbed, seeded, fully de-rinded.",
        "Chop into pinky-nail-sized pieces and pat them dry so they are pickable.",
        "Scatter a few pieces at a time to prevent cheek-stuffing.",
      ],
      commonMistakes: [
        "Serving pieces so wet they skate around the tray — a quick pat dry fixes most frustration.",
        "Cutting melon balls with a scoop — round shapes are the one geometry to avoid.",
      ],
      cutDiagram: "bite-size",
      media: [],
    },
    {
      band: "12-24m",
      form: "Thin rind-free slices or bite-size chunks of ripe cantaloupe served with family meals, still cut flat-sided rather than into round balls.",
      passFailTest:
        "Bite a piece yourself — ripe cantaloupe should give with no audible crunch, and no piece should look round from any angle.",
      whyThisForm:
        "Toddlers with molars handle melon easily, but scooped melon balls recreate the exact round, slick geometry that plugs airways.",
      prepSteps: [
        "Continue scrubbing the rind before cutting and removing it completely.",
        "Cut slices or flat-sided chunks and let the toddler self-serve from the plate.",
      ],
      commonMistakes: [
        "Fruit-salad melon balls from a party platter — swap them for flat-sided chunks before they reach the high chair.",
      ],
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["yogurt", "cucumber", "mango"],
  tips: [
    "Ripeness test: a ready cantaloupe smells sweet and musky at the blossom end and feels heavy for its size.",
    "Grip trick: pat slabs dry and roll them in a pinch of ground oat cereal — traction transforms slippery melon.",
    "Scrub the netting-textured rind under running water before the first cut, every time — the knife drags whatever is on the outside through the inside.",
    "A cold (not frozen) slab straight from the fridge doubles as gum relief for a teething baby.",
  ],
  sources: [SOURCES.wicGuide, SOURCES.nhsFrom6Months, SOURCES.aapStartingSolids],
  nutrients: ["vitaminA", "vitaminC"],
  servingGuidance: [
    {
      band: "6-8m",
      typicalAmount:
        "One thin slab at a time, a piece or two per meal — sucking the juice out counts as eating.",
    },
    {
      band: "9-12m",
      typicalAmount:
        "A small handful of pinky-nail pieces, scattered a few at a time — refill while the reaching continues.",
    },
    {
      band: "12-24m",
      typicalAmount:
        "A few slices or a small bowl of chunks with a meal or snack — hydrating enough to be generous with.",
    },
  ],
  watchOuts: [
    "Melons have caused outbreaks from rind bacteria — always scrub the rind before cutting and refrigerate cut melon promptly.",
  ],
  emoji: "🍈",
};

export default cantaloupe;
