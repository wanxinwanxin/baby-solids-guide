import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const couscous: Food = {
  slug: "couscous",
  name: "Couscous",
  aliases: ["pearl couscous", "Israeli couscous"],
  category: "grain",
  minAgeMonths: 6,
  ironRich: false,
  commonAllergen: "wheat",
  chokingRisk: "low",
  nutritionHighlights: [
    "An easy way to keep wheat in the weekly rotation once it's introduced — steady exposure is what maintains tolerance",
    "Whole-wheat couscous adds whole-grain fiber alongside quick carbohydrate energy",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "Couscous steamed soft, moistened generously, and stirred into a thick vegetable puree or plain yogurt until the mixture is spoonable and mounds like mash.",
      passFailTest:
        "Squeeze a spoonful in your fist: it should hold together damply rather than scatter like sand — dry, separate granules mean it needs more liquid stirred through.",
      whyThisForm:
        "Loose dry granules sift through a palmar grasp and can trigger coughs, but couscous bound into a moist mash rides a preloaded spoon and dissolves easily against bare gums.",
      prepSteps: [
        "Steam couscous in unsalted water or low-sodium broth, then fluff and stir in extra liquid until it clumps damply.",
        "Fold into a thick vegetable puree, plain yogurt, or mashed beans until spoonable.",
        "First time with wheat: serve early in the day, keep the amount small, and watch for 2 hours.",
        "Never introduce it alongside another new food, so any reaction has one clear cause.",
      ],
      commonMistakes: [
        "Serving it dry and fluffy — sandy granules frustrate the fist and make new eaters cough.",
        "Cooking it in salty stock made for adults.",
      ],
      cutDiagram: "mash",
      media: [],
    },
    {
      band: "9-12m",
      form: "Well-moistened couscous pinched into soft clumps about the size of your pinky fingernail, with a few pearl couscous spheres cooked very soft for pincer practice.",
      passFailTest:
        "Lift a clump with your own thumb and forefinger — it should survive the pick-up and then squash flat; a pearl couscous sphere should flatten under one finger.",
      whyThisForm:
        "The pincer grasp arrives around 9 months, and damp couscous clumps — or single soft pearls — are ideal small, low-stakes targets for precision practice.",
      prepSteps: [
        "Cook couscous moist as before; pinch off pinky-nail clumps with damp fingers.",
        "If using pearl couscous, boil past the package time until each sphere squashes easily.",
        "Scatter a few pieces at a time to keep the pace calm.",
      ],
      commonMistakes: [
        "Serving pearl couscous al dente — bouncy spheres are for adults, not gums.",
      ],
      cutDiagram: "bite-size",
      media: [],
    },
    {
      band: "12-24m",
      form: "Moist, fluffy couscous eaten by the spoonful or in small pinched clusters, dressed with a drizzle of olive oil or the sauce of the family dish.",
      passFailTest:
        "Load a toddler spoon and tilt it: moistened couscous should cling for a moment rather than pour off, so a self-feeder can land the bite.",
      whyThisForm:
        "Utensil practice dominates this stage, and damp couscous is one of the most forgiving spoon foods; chewing is no longer the constraint — spillage is.",
      prepSteps: [
        "Keep couscous on the moist side and serve in a bowl with a toddler spoon.",
        "Fold in soft vegetables, chickpeas, or shredded meat from the family meal.",
      ],
      commonMistakes: [
        "Serving boxed flavored couscous straight from the packet — the seasoning sachets are salt bombs.",
      ],
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["chickpeas", "lamb", "zucchini", "tomato"],
  tips: [
    "If wheat is already on the menu via bread or pasta with no reaction, couscous is just a new texture — the first-time caution steps no longer apply.",
    "Extra liquid is the secret: stir in a splash of water or unsalted broth after fluffing so the granules clump instead of scattering.",
    "Pearl couscous boiled well past the package time makes wonderfully soft, grabbable spheres for pincer practice.",
    "Cook plain and season from the family pot — the boxed flavor sachets are built for adult salt tolerance.",
  ],
  sources: [SOURCES.eatStudy, SOURCES.nhsFrom6Months, SOURCES.cdcFoodsAndDrinks],
  nutrients: ["fiber", "protein"],
  servingGuidance: [
    {
      band: "6-8m",
      typicalAmount:
        "A tablespoon or two folded into a puree or yogurt, from preloaded spoons — interest sets the amount.",
    },
    {
      band: "9-12m",
      typicalAmount:
        "A couple of tablespoons as damp clumps or soft pearls, offered a few pieces at a time.",
      frequency: "About twice a week once tolerated keeps the wheat exposure steady",
    },
    {
      band: "12-24m",
      typicalAmount:
        "A quarter to half cup of moist couscous with the family meal — appetite swings day to day, and that's normal.",
    },
  ],
  watchOuts: [
    "Boxed flavored couscous kits lean salty — cook plain couscous and season from the family pot instead.",
    "Couscous is wheat — if celiac disease or wheat allergy runs in the family, discuss introduction with your pediatrician first.",
  ],
  emoji: "🥘",
};

export default couscous;
