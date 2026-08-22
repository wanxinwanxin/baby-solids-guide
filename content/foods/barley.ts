import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const barley: Food = {
  slug: "barley",
  name: "Barley",
  aliases: ["pearl barley"],
  category: "grain",
  minAgeMonths: 6,
  ironRich: false,
  commonAllergen: null,
  chokingRisk: "low",
  nutritionHighlights: [
    "Rich in beta-glucan, a soluble fiber that supports healthy digestion",
    "Provides B vitamins and trace minerals such as selenium and manganese",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "Pearl barley simmered with generous water until each grain is swollen, creamy, and porridge-soft, then stirred into a thick familiar mash so it mounds on a spoon.",
      passFailTest:
        "Press a single grain between thumb and forefinger: it should smash flat with gentle pressure and feel creamy inside, with no chewy or rubbery center.",
      whyThisForm:
        "Babies at this stage eat from a preloaded spoon or a fisted scoop, and barley's naturally chewy grains only become gummable after long, wet cooking bound into a mash.",
      prepSteps: [
        "Use pearl barley (the polished kind), which cooks softer and faster than hulled barley.",
        "Simmer 1 part barley in about 3 parts unsalted water for 40–50 minutes, until the grains are swollen and creamy.",
        "Mash lightly with a fork, then stir into a thick vegetable puree or plain yogurt until spoonable.",
        "Serve warm on a preloaded spoon or as a thick scoopable mound on the tray.",
      ],
      commonMistakes: [
        "Stopping at the package's minimum cook time — barley that still bounces back between your fingers is too chewy for gums.",
        "Serving loose whole grains at this age, which slip through a fist grip and frustrate the meal.",
      ],
      cutDiagram: "mash",
      media: [],
    },
    {
      band: "9-12m",
      form: "Very soft-cooked pearl barley served as slightly sticky spoonfuls or individual creamy grains, each about pinky-nail size once swollen and squashing flat under gentle finger pressure.",
      passFailTest:
        "Pick up one grain with your own thumb and forefinger and press: it should flatten easily — a grain that springs back goes back in the pot.",
      whyThisForm:
        "Swollen barley grains are the perfect size for a brand-new pincer grasp, offering dozens of low-stakes pick-up repetitions in a single bowl.",
      prepSteps: [
        "Cook as for 6–8 months until fully creamy, keeping the pot slightly wet so grains stay tacky.",
        "Scatter a spoonful of grains on the tray alongside a thicker barley-and-veg mash.",
        "Rewarm refrigerated barley with a splash of water — it stiffens as it cools.",
      ],
      commonMistakes: [
        "Draining and cooling the barley until the grains separate and firm up — chilled barley turns surprisingly chewy.",
      ],
      media: [],
    },
    {
      band: "12-24m",
      form: "Soft barley stirred into family soups, stews, and grain bowls in bite-size spoonfuls, each moist enough that the grains cling together on a self-loaded toddler spoon.",
      passFailTest:
        "Squeeze a grain from the family pot between two fingers: if it resists flattening, simmer the toddler's portion in broth a while longer.",
      whyThisForm:
        "New molars and rotary chewing let toddlers handle barley's pleasant chew in mixed dishes, and its natural stickiness makes it a forgiving grain for spoon practice.",
      prepSteps: [
        "Cook barley directly in family soups and stews, where it drinks up flavor as it softens.",
        "Set aside the toddler's portion before salting the pot for adults.",
      ],
      commonMistakes: [
        "Serving barley from salty canned soups — cook from dry grains so you control the sodium.",
      ],
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["chicken", "carrot", "butternut-squash", "beef"],
  tips: [
    "Barley contains gluten even though it is not the wheat allergen — families with celiac disease concerns should discuss introducing gluten grains with their pediatrician.",
    "Soak pearl barley for a few hours or overnight to cut the cook time roughly in half.",
    "Cook a big pot in unsalted broth, freeze flat in a zip bag, and snap off portions to stir into any puree or soup.",
    "Barley firms up dramatically in the fridge — always rewarm with a splash of water or broth to bring back the creamy texture.",
  ],
  sources: [SOURCES.wicGuide, SOURCES.nhsFrom6Months, SOURCES.cdcFoodsAndDrinks],
};

export default barley;
