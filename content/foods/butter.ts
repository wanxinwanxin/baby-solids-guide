import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const butter: Food = {
  slug: "butter",
  name: "Butter & ghee",
  aliases: ["ghee", "clarified butter"],
  category: "dairy",
  minAgeMonths: 6,
  ironRich: false,
  commonAllergen: "milk",
  chokingRisk: "low",
  nutritionHighlights: [
    "Energy-dense fat that helps small stomachs meet big calorie needs",
    "Carries fat-soluble vitamin A along with the calories",
    "Makes bitter vegetables and plain grains taste like food worth finishing",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "About half a teaspoon of unsalted butter melted completely into warm oatmeal, mashed vegetables, or soft rice until it disappears, leaving richness but no pieces to manage.",
      passFailTest:
        "Tilt the bowl: you should see a light gloss coating the food, not a loose pool of melted fat sitting on top.",
      whyThisForm:
        "The baby is eating thick mashes by preloaded spoon and fist, so butter's job is invisible enrichment — and because butter carries only a small amount of milk protein, it works as a gentle add-on exposure rather than a standalone one.",
      prepSteps: [
        "Choose unsalted butter (or ghee for cooking — see the ghee note in tips).",
        "Melt about half a teaspoon into the warm food and stir until no streaks remain.",
        "First time: serve early in the day, a small amount, and watch for 2 hours.",
        "Serve alongside familiar foods, never another new food, so any reaction can be traced to the milk.",
      ],
      commonMistakes: [
        "Using salted butter — the sodium adds up fast at this serving size of food.",
        "Counting ghee as the milk introduction; with the milk solids removed it carries almost no milk protein.",
        "Handing over a cold pat to gnaw — butter is a melt-in ingredient, not a finger food.",
      ],
      media: [],
    },
    {
      band: "9-12m",
      form: "A thin scrape of unsalted butter on a toast strip — thin enough to see the bread through it — plus the usual half-teaspoon melted into vegetables and grains.",
      passFailTest:
        "Hold the toast up: a proper scrape glistens without showing tooth-marks-deep butter anywhere; visible soft lumps mean too much.",
      whyThisForm:
        "Toast strips and then torn pieces suit this window's grasp skills, and a thin buttered surface adds calories and grip-friendly softness without a greasy coating that makes pieces slippery.",
      prepSteps: [
        "Scrape a thin layer onto toast, then serve as strips or tear into pinky-nail pieces as the pincer grasp arrives.",
        "Keep melting butter into vegetables, pasta, and rice at cooking time.",
        "Store a stick at room temperature in a covered dish so it spreads thin instead of tearing the bread.",
      ],
      commonMistakes: [
        "Slathering the toast — thick cold butter makes pieces slick and adds salt-free but pointless excess.",
        "Buying 'spreadable' butter blends, which often add salt and seed oils.",
      ],
      cutDiagram: "thin-spread",
      media: [],
    },
    {
      band: "12-24m",
      form: "Unsalted butter or ghee used normally in family cooking — melted over vegetables, stirred into grains, or thinly spread on bread the toddler bites from.",
      passFailTest:
        "Check the family dish at serving: the toddler's portion should taste rich but not salty — season the adults' plates afterward instead.",
      whyThisForm:
        "By toddlerhood butter is simply a family cooking fat; keeping the toddler's version unsalted preserves the calorie and flavor benefits without the sodium habit.",
      prepSteps: [
        "Cook the family meal with unsalted butter or ghee and salt individual portions after the toddler's is out.",
        "Rotate butter with olive oil and other fats so no single fat dominates the plate.",
      ],
      commonMistakes: [
        "Letting salted butter become the default spread once the toddler eats toast daily.",
      ],
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["oatmeal", "sweet-potato", "rice", "broccoli"],
  tips: [
    "Butter is fine as a food from around 6 months, but cow's milk as a drink waits until 12 months — a buttered breakfast doesn't change the drink rule.",
    "Ghee is butter with the milk solids strained out: great for high-heat cooking and usually fine even for many dairy-sensitive babies, but for that same reason it barely counts as milk-allergen exposure — use real butter, yogurt, or cheese for that job.",
    "Half a teaspoon melted into any vegetable is the cheapest acceptance trick in the book — fat carries flavor to a skeptical palate.",
    "Freeze butter in half-teaspoon dabs on parchment; one dab drops straight into a warm bowl and melts in seconds.",
  ],
  sources: [SOURCES.eatStudy, SOURCES.aapStartingSolids, SOURCES.wicGuide],
  nutrients: ["healthyFats", "vitaminA"],
  servingGuidance: [
    {
      band: "6-8m",
      typicalAmount:
        "About half a teaspoon melted into one or two foods a day — an enricher, not a course of its own.",
      frequency: "Fine daily once tolerated, rotated with olive oil and other fats.",
    },
    {
      band: "9-12m",
      typicalAmount:
        "A thin smear on toast plus a half-teaspoon in cooking — richness spread through the meal rather than piled anywhere.",
    },
    {
      band: "12-24m",
      typicalAmount:
        "Normal family-cooking amounts — a teaspoon or so across the toddler's day, salted portions kept for the adults.",
    },
  ],
  watchOuts: [
    "Salted butter turns an enricher into a steady sodium drip — unsalted is the baby default.",
    "Ghee carries almost no milk protein, so it neither introduces nor maintains dairy tolerance — don't let it silently replace real dairy exposure.",
  ],
  emoji: "🧈",
};

export default butter;
