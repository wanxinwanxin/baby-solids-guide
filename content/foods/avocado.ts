import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const avocado: Food = {
  slug: "avocado",
  name: "Avocado",
  aliases: [],
  category: "vegetable",
  minAgeMonths: 6,
  ironRich: false,
  commonAllergen: null,
  chokingRisk: "low",
  nutritionHighlights: [
    "Monounsaturated fats that support rapid brain growth in the first two years",
    "A natural source of folate, potassium, and vitamin E",
    "Calorie-dense for its volume — useful when small stomachs need efficient energy",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "A ripe avocado cut into wedges about the length and width of two adult fingers, with the peel left on the lower half of each wedge as a non-slip handle, or mashed smooth on a preloaded spoon.",
      passFailTest:
        "Press the flesh with your thumb: ripe avocado should dent like softened butter, and a pea-sized piece should smear flat between two fingers with almost no pressure.",
      whyThisForm:
        "A palmar-grasp baby crushes whatever sits inside the fist, and bare avocado simply shoots out — the strip of peel gives a dry, grippy handle while the exposed top half stays soft enough to gum straight off.",
      prepSteps: [
        "Choose an avocado that yields to gentle thumb pressure; a rock-hard one is not ready.",
        "Halve, remove the pit, and cut into two-finger wedges.",
        "Peel only the top half of each wedge, leaving the skin on the bottom half as a handle — and take the wedge away once it's gnawed down to the peel.",
        "Alternatively mash smooth with a fork and serve from a preloaded spoon.",
      ],
      commonMistakes: [
        "Serving underripe avocado — firm flesh is both hard to gum and impossible to mash.",
        "Peeling the whole wedge, which turns it into a bar of soap in a small fist.",
        "Cutting slender slices that collapse when gripped instead of chunky wedges.",
      ],
      cutDiagram: "wedge-handle",
      media: [],
    },
    {
      band: "9-12m",
      form: "Ripe avocado cut into cubes about the size of your pinky fingernail, rolled in a pinch of ground infant cereal or hemp seeds so they are grippable rather than slick.",
      passFailTest:
        "Pick up a cube with your own thumb and forefinger: it should survive the lift without squirting away, then smear flat with the lightest pinch.",
      whyThisForm:
        "The new pincer grasp is ready for small pieces, but avocado's slipperiness defeats it — a dusting of dry coating turns a frustrating food into an easy win.",
      prepSteps: [
        "Cube ripe avocado into pinky-nail pieces.",
        "Roll the cubes in a pinch of ground oat cereal, hemp seeds, or fine breadcrumbs for traction.",
        "Offer a few cubes at a time alongside mashed avocado on a spoon.",
      ],
      commonMistakes: [
        "Serving naked slippery cubes and concluding the baby 'doesn't like avocado' when the real problem is grip.",
      ],
      cutDiagram: "bite-size",
      media: [],
    },
    {
      band: "12-24m",
      form: "Avocado in soft slices or cubes, smashed onto lightly toasted bread strips as a thin spread, or stirred into family dishes like rice bowls and scrambled eggs.",
      passFailTest:
        "Any piece should still smear under gentle finger pressure — ripeness stays the test at every age, and a firm slice goes back on the counter to ripen.",
      whyThisForm:
        "Toddlers can now manage varied shapes and self-feed with improving dexterity, so avocado shifts from a standalone shape to an everyday ingredient across the family menu.",
      prepSteps: [
        "Smash onto toast strips, fold into rice or eggs, or serve plain soft slices.",
        "Season the toddler portion with a squeeze of lime instead of salt.",
      ],
      commonMistakes: [
        "Salting shared guacamole heavily before setting aside the toddler's share.",
      ],
      media: [],
    },
  ],
  firstFoodPick: true,
  flavorPairings: ["banana", "egg", "black-beans", "bread"],
  tips: [
    "Speed-ripen a hard avocado in a closed paper bag with a banana — the trapped ethylene gas usually does the job in a day or two.",
    "The skin-on handle is the whole trick at 6–8 months: peel only the top half of the wedge so the fist holds peel, not slime.",
    "For pincer-stage cubes, a pinch of ground oat cereal or hemp seeds is the difference between eating and chasing.",
    "Cut only what you need and store the rest with the pit in, flesh pressed with plastic or a squeeze of lemon, to slow browning — brown avocado is safe, just less appealing.",
    "Mash extra into an ice-cube tray and freeze for smoothie-ready portions; the texture softens but the nutrition holds.",
  ],
  sources: [SOURCES.wicGuide, SOURCES.aapStartingSolids, SOURCES.cdcFoodsAndDrinks],
  nutrients: ["healthyFats", "folate", "potassium", "fiber"],
  servingGuidance: [
    {
      band: "6-8m",
      typicalAmount:
        "One or two peel-handled wedges, or a couple of teaspoons mashed on a preloaded spoon — offer more only if the baby keeps reaching.",
    },
    {
      band: "9-12m",
      typicalAmount:
        "Around a quarter of an avocado in coated cubes is a generous start — plenty of babies stop far short, and that's fine.",
    },
    {
      band: "12-24m",
      typicalAmount:
        "A few soft slices or a thin smash on half a piece of toast — let appetite, not the portion, decide when the meal is over.",
    },
  ],
  emoji: "🥑",
};

export default avocado;
