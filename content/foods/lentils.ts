import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const lentils: Food = {
  slug: "lentils",
  name: "Lentils",
  aliases: ["red lentils", "dal"],
  category: "legume",
  minAgeMonths: 6,
  ironRich: true,
  commonAllergen: null,
  chokingRisk: "low",
  nutritionHighlights: [
    "One of the most iron-dense plant foods, well matched to the 6-month iron gap",
    "Plant protein and folate that support rapid growth",
    "Fiber that helps keep a new eater's digestion moving",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "Red or brown lentils simmered until they collapse into a thick, spoonable mash about the consistency of oatmeal, with no firm intact lentils remaining.",
      passFailTest:
        "Rub a spoonful between your fingers: it should feel uniformly soft with no gritty or firm centers. Lift the spoon — the mush should mound and slowly slump, not run off like soup.",
      whyThisForm:
        "Lentils cook down into a naturally lump-free mush, ideal for a baby who can't chew yet, and the thick oatmeal texture stays on a preloaded spoon or a fist far better than a thin puree.",
      prepSteps: [
        "Rinse ½ cup of red or small brown lentils and simmer in about 1½ cups of unsalted water for 20–25 minutes, until they've fully broken down.",
        "Stir hard at the end — the agitation collapses any remaining intact lentils into the mush.",
        "Thicken by simmering longer or loosen with a splash of water to reach an oatmeal-like consistency.",
        "Serve warm on a preloaded spoon, or spread a layer on the tray for hand-scooping.",
      ],
      commonMistakes: [
        "Stopping the simmer while lentils still hold their shape — for this age they should be well past intact.",
        "Making it soup-thin: a runny puree slides off spoons and fists and frustrates self-feeding.",
        "Seasoning the family pot with salt before taking out the baby's portion.",
      ],
      cutDiagram: "mash",
      media: [],
    },
    {
      band: "9-12m",
      form: "Very soft-cooked lentils lightly mashed so the mixture clumps together, thick enough for a baby to rake with fingers or scoop up by the fistful.",
      passFailTest:
        "Pinch up a clump: it should hold together in your fingers for a second before crumbling. Individual lentils should squash instantly under a fingertip.",
      whyThisForm:
        "As raking and pincer skills develop, a clumpy, self-adhering texture lets the baby feed themselves by hand while every individual lentil stays too soft to pose any risk.",
      prepSteps: [
        "Cook lentils until fully soft (green and black varieties take 25–30 minutes), then mash briefly so about half break down and bind the rest.",
        "Let the mash cool and set for a few minutes — it clumps better once it's not piping hot.",
        "Drop a few clumps directly on the tray for self-feeding practice.",
      ],
      commonMistakes: [
        "Serving loose individual lentils that scatter and slip through fingers — clumps work, singles frustrate.",
        "Returning to smooth puree only, which skips the texture practice this window is for.",
      ],
      media: [],
    },
    {
      band: "12-24m",
      form: "Whole soft-cooked lentils served loose in family dishes like soups, stews, and grain bowls, each lentil still soft enough to squash between two fingers.",
      passFailTest:
        "Press a few sample lentils from the pot between two fingers — every one should flatten with no firm center.",
      whyThisForm:
        "Toddlers with developing molars and a refined pincer grasp handle whole soft lentils easily; the remaining job is flavor variety and keeping the toddler portion low-salt.",
      prepSteps: [
        "Cook lentils into family meals — dal, lentil soup, pasta sauce — and take the toddler's portion out before heavy salting.",
        "Offer a small spoon and let the toddler alternate between spoon and fingers.",
      ],
      commonMistakes: [
        "Serving firm, al dente lentils from a salad — toddler lentils should still be soft all the way through.",
      ],
      media: [],
    },
  ],
  firstFoodPick: true,
  flavorPairings: ["carrot", "sweet-potato", "spinach", "rice"],
  tips: [
    "Split red lentils are the beginner's shortcut: they disintegrate into a smooth mush in about 20 minutes with no blending required.",
    "Consistency dial: simmer longer for thicker, stir in warm water a spoonful at a time for thinner — you can always move both directions.",
    "Cook lentils in unsalted water and add flavor with a bay leaf, garlic, or mild spices like cumin instead of salt.",
    "Freeze the mush flat in an ice-cube tray — each cube is one serving that rewarms in under a minute.",
  ],
  sources: [SOURCES.wicGuide, SOURCES.nhsFrom6Months, SOURCES.aapStartingSolids],
};

export default lentils;
