import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const splitPeas: Food = {
  slug: "split-peas",
  name: "Split peas",
  aliases: ["yellow split peas", "green split peas", "matar dal"],
  category: "legume",
  minAgeMonths: 6,
  ironRich: true,
  commonAllergen: null,
  chokingRisk: "low",
  nutritionHighlights: [
    "Plant iron and protein in a legume that cooks into a naturally safe texture",
    "Folate that supports the first year's rapid cell growth",
    "Fiber that helps keep a new eater regular",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "Split peas simmered until they collapse into a thick, dal-like, spoonable mash about the consistency of oatmeal, with no firm or gritty pea halves surviving.",
      passFailTest:
        "Rub a spoonful between your fingers — uniformly soft, no gritty centers — and a lifted spoonful should slump slowly off the spoon rather than pour.",
      whyThisForm:
        "Because they're split and skinless, these peas cook themselves into a lump-free porridge with no mashing or blending, and the thick body stays put on a preloaded spoon or a scooping fist.",
      prepSteps: [
        "Rinse ½ cup of split peas and simmer in about 2 cups of unsalted water for 30–40 minutes, stirring near the end, until they've fully broken down.",
        "Beat with the spoon for a few seconds — the agitation collapses any stubborn halves.",
        "Adjust to an oatmeal-thick consistency: simmer longer to thicken, add warm water to loosen.",
        "Serve warm on a preloaded spoon or spread on the tray.",
      ],
      commonMistakes: [
        "Pulling the pot early while pea halves still hold their shape and a gritty center.",
        "Thinning to soup — runny dal slides off spoons and fists and frustrates the eater.",
        "Salting the family pot before the baby's portion comes out.",
      ],
      cutDiagram: "mash",
      media: [],
    },
    {
      band: "9-12m",
      form: "Thicker dal-style split peas cooked with soft mashed vegetables until scoopable in clumps the baby can rake up with fingers or a fist.",
      passFailTest:
        "Pinch up a clump: it should hold together for a second in your fingers before crumbling, with nothing firm hiding inside.",
      whyThisForm:
        "A clumping, self-adhering texture rewards raking and early pincer attempts, letting the baby genuinely self-feed a food that has no unsafe pieces to find.",
      prepSteps: [
        "Cook the dal a little drier than the 6–8 month version so it clumps when cooled slightly.",
        "Fold in soft mashed carrot, squash, or spinach for flavor and color variety.",
        "Drop a few clumps directly on the tray alongside a preloaded spoon.",
      ],
      commonMistakes: [
        "Keeping it silky-smooth out of habit — this window is for thicker, clumpier textures.",
        "Making it so wet it re-liquefies on a warm tray within a minute.",
      ],
      media: [],
    },
    {
      band: "12-24m",
      form: "Thick split pea soup or dal eaten with a toddler spoon, or ladled over rice so the whole bowl is a soft, self-feedable one-pot meal.",
      passFailTest:
        "Stand a spoon in the bowl for a moment: a toddler-appropriate thickness holds it briefly upright — brothy soup that lets it clatter over belongs to the adults.",
      whyThisForm:
        "Toddlers are consolidating spoon skills, and a thick dal is the most forgiving spoon food there is — it stays aboard through wobbles and rewards independence.",
      prepSteps: [
        "Portion the toddler's dal or split pea soup before salting the family pot — ham-hock versions especially run salty.",
        "Serve over soft rice with a spoon and let fingers help without comment.",
      ],
      commonMistakes: [
        "Serving classic smoked-ham split pea soup as-is — the smoky meat makes it one of the saltier soups around.",
      ],
      media: [],
    },
  ],
  firstFoodPick: true,
  flavorPairings: ["carrot", "rice", "potato", "spinach"],
  tips: [
    "Yellow split peas taste milder and sweeter than green — an easier first dal for skeptical palates.",
    "No soaking needed: split peas go from bag to collapse in 30–40 minutes of plain simmering.",
    "The consistency dial runs both ways — simmer down to thicken, stir in warm water by the spoonful to loosen.",
    "Season with a bay leaf, a pinch of cumin, or a little turmeric instead of salt; lift the bay leaf out before serving.",
    "Freeze in ice-cube portions — dal thaws back to its exact original texture, unlike many purees.",
  ],
  sources: [SOURCES.wicGuide, SOURCES.nhsFrom6Months, SOURCES.aapStartingSolids],
  nutrients: ["iron", "protein", "fiber", "folate"],
  servingGuidance: [
    {
      band: "6-8m",
      typicalAmount:
        "One to two tablespoons of thick dal on a preloaded spoon — keep refilling while the mouth keeps opening.",
    },
    {
      band: "9-12m",
      typicalAmount:
        "Two to three tablespoons as scoopable clumps plus spoon practice — the baby works at their own pace.",
    },
    {
      band: "12-24m",
      typicalAmount:
        "A half cup or so over rice or in a bowl with a spoon — appetite varies day to day and that's normal.",
    },
  ],
  watchOuts: [
    "A generous first bowl can mean a gassy day — build split pea portions up gradually.",
    "Classic split pea soup gets its flavor from salty smoked pork — make the toddler's portion before the ham goes in.",
  ],
  emoji: "🫛",
};

export default splitPeas;
