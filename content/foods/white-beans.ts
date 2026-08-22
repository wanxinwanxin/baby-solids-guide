import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const whiteBeans: Food = {
  slug: "white-beans",
  name: "White beans",
  aliases: ["cannellini beans", "navy beans", "great northern beans"],
  category: "legume",
  minAgeMonths: 6,
  ironRich: true,
  commonAllergen: null,
  chokingRisk: "moderate",
  chokingNotes:
    "A whole bean is a smooth, rounded unit whose intact skin can hold it together all the way into the airway. Mitigate by cooking until completely soft, then mashing or pressing every bean flat before 9 months and halving or smashing through 12 months; whole beans wait for toddlerhood.",
  nutritionHighlights: [
    "Plant iron aimed squarely at the 6-month iron gap, with vitamin-C pairings boosting absorption",
    "Protein and folate that fuel rapid first-year growth",
    "Among the thinnest-skinned beans, so they mash smoother than most",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "Fully soft cannellini or navy beans mashed with a fork into a thick, slightly coarse paste, every skin broken and no whole rounded bean left anywhere in the serving.",
      passFailTest:
        "Rub a spoonful between your fingers: uniformly soft with no firm bits, and a scan of the bowl turns up zero intact beans hiding in the mash.",
      whyThisForm:
        "White beans' thin skins collapse into a near-smooth mash a toothless baby can move safely, and the thick paste clings to a preloaded spoon or a raking fist far better than a runny puree.",
      prepSteps: [
        "Drain and rinse canned beans well under running water (or cook dried beans until they crush with zero resistance).",
        "Mash with a fork until no whole beans or large skin pieces remain, loosening with water, breast milk, or formula as needed.",
        "Serve as a thick layer on the tray or on a preloaded spoon.",
      ],
      commonMistakes: [
        "Leaving a few 'mostly mashed' whole beans in the bowl — every one needs to be broken.",
        "Skipping the rinse: the canning liquid is salty and clings to the beans.",
        "Thinning to soup — a paste that mounds is what small fists can actually pick up.",
      ],
      cutDiagram: "mash",
      media: [],
    },
    {
      band: "9-12m",
      form: "Soft whole white beans each pressed flat between your fingers or halved, served as a scatter the baby picks up one squashed piece at a time.",
      passFailTest:
        "Every piece on the tray should already be flat or halved — pick a few up and confirm they smear under a light fingertip press.",
      whyThisForm:
        "Flattened beans keep their pick-up-able shape for pincer practice while the flattening itself removes the rounded, skin-wrapped geometry that makes a whole bean risky.",
      prepSteps: [
        "Cook or rinse beans as before, confirming full softness on a sample.",
        "Press each bean flat between thumb and finger, or halve them — a ten-second job for a serving.",
        "Scatter a few at a time on the tray rather than a full pile.",
      ],
      commonMistakes: [
        "Serving whole round beans because the baby 'has teeth now' — front teeth don't do the grinding.",
        "Flattening over the pot in a hurry and letting a few intact beans slip through.",
      ],
      media: [],
    },
    {
      band: "12-24m",
      form: "Whole soft-cooked white beans served loose in soups, pasta, and grain bowls, each bean still soft enough to squash instantly between two fingers.",
      passFailTest:
        "Press a few beans sampled from the pot — each should flatten with no firm center; al dente beans from a salad bar don't pass.",
      whyThisForm:
        "Toddlers with molars and a practiced pincer grasp manage whole soft beans well, and loose beans in family dishes build self-feeding independence.",
      prepSteps: [
        "Fold soft beans into family minestrone, pasta, or rice dishes, portioning the toddler's serving before salting.",
        "Keep a rinsed can in the fridge for instant lunch add-ins through the week.",
      ],
      commonMistakes: [
        "Serving firm, under-simmered beans from adult salads — toddler beans should still be squashably soft.",
      ],
      media: [],
    },
  ],
  firstFoodPick: true,
  flavorPairings: ["carrot", "tomato", "pasta", "zucchini"],
  tips: [
    "Cannellini's thin skins are the shortcut: they mash smoother, faster, and with fewer papery flecks than most beans.",
    "Warm beans mash dramatically better than cold — thirty seconds of reheating saves two minutes of fork work.",
    "Blend mashed white beans into any vegetable puree to quietly raise the iron and protein of a food the baby already accepts.",
    "Pair with tomato, bell pepper, or other vitamin-C foods in the same meal — it meaningfully improves plant-iron absorption.",
    "Freeze mash in ice-cube portions; one cube rewarms into a single serving in under a minute.",
  ],
  sources: [SOURCES.wicGuide, SOURCES.cdcChokingHazards, SOURCES.aapStartingSolids],
  nutrients: ["iron", "protein", "fiber", "folate"],
  servingGuidance: [
    {
      band: "6-8m",
      typicalAmount:
        "One to two tablespoons of thick mash on a preloaded spoon or the tray — refill while the mouth keeps opening.",
    },
    {
      band: "9-12m",
      typicalAmount:
        "Two to three tablespoons of flattened beans scattered a few pieces at a time — the baby sets the pace.",
    },
    {
      band: "12-24m",
      typicalAmount:
        "A quarter cup or so of whole soft beans folded into the family dish — an opening offer, not a target.",
    },
  ],
  watchOuts: [
    "Canned beans sit in a salty liquid — drain and rinse thoroughly, and skip cans with added seasoning.",
    "A sudden fiber jump can mean a gassy day or two — build the portion up gradually.",
  ],
  emoji: "🫘",
};

export default whiteBeans;
