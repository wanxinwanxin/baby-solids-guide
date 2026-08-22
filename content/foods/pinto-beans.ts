import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const pintoBeans: Food = {
  slug: "pinto-beans",
  name: "Pinto beans",
  aliases: ["frijoles pintos"],
  category: "legume",
  minAgeMonths: 6,
  ironRich: true,
  commonAllergen: null,
  chokingRisk: "moderate",
  chokingNotes:
    "Like all whole beans, an intact pinto is a rounded, skin-wrapped unit that can reach the airway whole. Mitigate by mashing to a refried-style paste before 9 months, flattening or halving each bean through 12 months, and reserving whole soft beans for toddlerhood.",
  nutritionHighlights: [
    "Plant iron and protein matched to the 6-month iron gap",
    "Folate for rapid cell growth in the first year",
    "Cook up creamier than most beans, mashing into a naturally smooth paste",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "Soft-cooked pinto beans mashed into a thick, creamy, homemade-refried-style paste with every bean and skin broken down and no intact bean left in the bowl.",
      passFailTest:
        "Rub a spoonful between your fingers — creamy with no firm pieces — then lift the spoon: the paste should mound and hold rather than pour.",
      whyThisForm:
        "Pintos are the creamiest of the common beans and collapse into a spoon-clinging paste that suits a palmar-grasp baby, while the thorough mash removes the rounded whole-bean hazard entirely.",
      prepSteps: [
        "Drain and rinse canned pintos well, or simmer dried beans until they crush with no resistance.",
        "Mash warm with a fork or masher into a smooth, thick paste, loosening with water — not the canning liquid.",
        "Spread a layer on the tray or load a spoon; a dusting of mild cumin is welcome, salt is not.",
      ],
      commonMistakes: [
        "Substituting store-bought or restaurant refried beans, which are typically heavily salted.",
        "Leaving 'a few whole ones for texture' — texture comes later; at this age every bean gets mashed.",
        "Mashing cold beans and fighting the skins — warm beans give up their structure easily.",
      ],
      cutDiagram: "mash",
      media: [],
    },
    {
      band: "9-12m",
      form: "Soft whole pintos pressed flat between your fingers or halved, served as a small scatter or folded into rice so each squashed piece is easy to pick up.",
      passFailTest:
        "Check the tray before serving: every piece already flattened or halved, and a fingertip press smears a sample without any springy pushback.",
      whyThisForm:
        "Flattened beans are ideal pincer-grasp targets — soft, grippy, and irregular — while the pressing removes the round geometry that intact skins otherwise preserve.",
      prepSteps: [
        "Confirm a sample bean squashes effortlessly, then flatten or halve the serving's worth.",
        "Mix into soft rice or scoopable mash so some servings train fingers and some train the spoon.",
        "Offer a few pieces at a time to head off cheek-stuffing.",
      ],
      commonMistakes: [
        "Serving whole beans mixed into rice where an intact one can hide — flatten first, then mix.",
        "Riding the mash stage too long; this window is for graduating textures.",
      ],
      media: [],
    },
    {
      band: "12-24m",
      form: "Whole soft pinto beans served loose in family tacos, rice bowls, and soups, every bean still squashing between two fingers with no firm center.",
      passFailTest:
        "Press a few beans from the pot between two fingers — all should flatten easily; firm ones mean more simmering before the toddler's portion comes out.",
      whyThisForm:
        "Molars and a refined pincer grasp make whole soft beans manageable, and pintos slot straight into family Mexican-style meals with the salt held back.",
      prepSteps: [
        "Portion the toddler's beans before salting and hot-saucing the family batch.",
        "Offer beans with soft rice, avocado, and shredded cheese as a self-serve toddler bowl.",
      ],
      commonMistakes: [
        "Defaulting to canned 'seasoned' or charro-style beans for the toddler — the seasoning is mostly salt.",
      ],
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["rice", "avocado", "cheese", "bell-pepper"],
  tips: [
    "Homemade 'refried' beans need no frying: mash warm rinsed pintos with a splash of water and a pinch of cumin — done in two minutes.",
    "Mash the whole can at once and freeze flat in a zip bag; snap off a square per meal.",
    "The bean-broth trick works only with your own unsalted pot — canned liquid is the salty part, so rinse it away and thin with water instead.",
    "Pair with vitamin-C foods like tomato or bell pepper in the same meal to boost plant-iron absorption.",
  ],
  sources: [SOURCES.wicGuide, SOURCES.cdcFoodsAndDrinks, SOURCES.aapChoking],
  nutrients: ["iron", "protein", "fiber", "folate"],
  servingGuidance: [
    {
      band: "6-8m",
      typicalAmount:
        "One to two tablespoons of creamy mash on a preloaded spoon or the tray — refill while the mouth keeps opening.",
    },
    {
      band: "9-12m",
      typicalAmount:
        "Two to three tablespoons of flattened beans, alone or folded into rice — a scatter at a time.",
    },
    {
      band: "12-24m",
      typicalAmount:
        "A quarter cup or so of whole soft beans in the family meal — an opening offer the toddler finishes or doesn't.",
    },
  ],
  watchOuts: [
    "Canned beans ride in salty liquid — drain and rinse well, and skip seasoned or charro-style cans.",
    "New bean eaters can have a gassy day or two — build portions gradually rather than starting big.",
  ],
  emoji: "🫘",
};

export default pintoBeans;
