import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const amaranth: Food = {
  slug: "amaranth",
  name: "Amaranth",
  aliases: [],
  category: "grain",
  minAgeMonths: 6,
  ironRich: true,
  commonAllergen: null,
  chokingRisk: "low",
  nutritionHighlights: [
    "Notably iron-rich for a grain — a genuine contributor to the iron babies need from 6 months",
    "Higher in protein than most cereal grains, including the lysine many grains lack",
    "Naturally gluten-free, so it suits families keeping wheat exposures separate",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "Amaranth simmered until the tiny seeds burst, then thinned with milk or water into a smooth, spoonable porridge about the thickness of yogurt.",
      passFailTest:
        "Tip a loaded baby spoon sideways: the porridge should cling briefly and release in one soft mound — if it stretches like glue or pours like soup, adjust with liquid or more simmering.",
      whyThisForm:
        "A smooth, yogurt-thick porridge is the texture a 6-month-old's tongue can manage safely, and amaranth's natural stickiness helps it ride a preloaded spoon held in a whole-fist grasp.",
      prepSteps: [
        "Rinse 1 part amaranth, then simmer in 3 parts unsalted water for 20–25 minutes, stirring often, until the seeds burst and turn porridge-like.",
        "Whisk vigorously, then thin with breastmilk, formula, or water — amaranth sets gluey, so err on the loose side.",
        "Cool to warm and serve on preloaded spoons, or let hands do the work.",
      ],
      commonMistakes: [
        "Serving it straight from the pot at full stickiness — cooled undiluted amaranth turns to paste that frustrates a new eater.",
        "Skipping the stirring, which lets the tiny seeds clump and scorch on the bottom.",
      ],
      cutDiagram: "mash",
      media: [],
    },
    {
      band: "9-12m",
      form: "Thick amaranth porridge that has set slightly on cooling, scooped into soft pinky-nail lumps a pincer grasp can lift, or offered on a preloaded spoon.",
      passFailTest:
        "Lift a lump with your own thumb and forefinger: it should hold together for the trip to the mouth, then smear flat with almost no pressure.",
      whyThisForm:
        "Amaranth's stickiness becomes an asset once the pincer grasp arrives around 9 months — set porridge lumps are grabbable practice pieces that still dissolve safely against the gums.",
      prepSteps: [
        "Cook as for 6–8 months, but let the porridge cool and thicken until it holds a soft shape.",
        "Scoop or pinch off pinky-nail lumps and space a few on the tray.",
        "Fold in a spoonful of mashed fruit or yogurt for flavor variety.",
      ],
      commonMistakes: [
        "Making the lumps too big — amaranth is dense, so keep pieces small and soft.",
      ],
      cutDiagram: "bite-size",
      media: [],
    },
    {
      band: "12-24m",
      form: "Amaranth porridge eaten with a toddler spoon, or cooled polenta-style amaranth cut into soft bite-size cubes that squash between two fingers.",
      passFailTest:
        "Press a cube between two fingers — it should flatten easily; spooned porridge should cling to a tilted spoon long enough for a self-feeder to land the bite.",
      whyThisForm:
        "Toddlers are building utensil skills, and sticky amaranth is a forgiving spoon food; set cubes add hand-food variety that molars now handle easily.",
      prepSteps: [
        "For cubes, pour thick cooked amaranth into a dish, chill until set, and cut bite-size pieces.",
        "For bowls, re-thin porridge with milk or water and serve warm with a toddler spoon.",
      ],
      commonMistakes: [
        "Sweetening every bowl — plain or fruit-mashed keeps sugar out of the habit loop.",
      ],
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["banana", "apple", "yogurt", "sweet-potato"],
  tips: [
    "Amaranth turns gluey as it cools — thin with milk or water and re-whisk every time you reheat, not just the first serve.",
    "Blend it half-and-half with oats for a porridge that's less sticky but keeps amaranth's iron along for the ride.",
    "Simmer in unsalted water and stir often — the tiny seeds settle and scorch faster than larger grains.",
    "Batch-cook, chill in a flat dish, and you get spoonable porridge one day and cuttable soft cubes the next.",
  ],
  sources: [SOURCES.wicGuide, SOURCES.cdcFoodsAndDrinks],
  nutrients: ["iron", "protein", "fiber"],
  servingGuidance: [
    {
      band: "6-8m",
      typicalAmount:
        "A tablespoon or two of thinned porridge from preloaded spoons — let the baby's interest set the pace.",
    },
    {
      band: "9-12m",
      typicalAmount:
        "A couple of tablespoons as soft lumps or spooned porridge, a few pieces at a time.",
    },
    {
      band: "12-24m",
      typicalAmount:
        "A quarter to half cup as a porridge bowl or a small handful of soft cubes with the family meal.",
    },
  ],
  watchOuts: [
    "Puffed-amaranth cereals and snack bars are often bound with honey — skip honey-sweetened versions before 12 months.",
  ],
  emoji: "🌱",
};

export default amaranth;
