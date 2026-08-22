import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const leek: Food = {
  slug: "leek",
  name: "Leek",
  aliases: [],
  category: "vegetable",
  minAgeMonths: 6,
  ironRich: false,
  commonAllergen: null,
  chokingRisk: "moderate",
  chokingNotes:
    "Cooked leek separates into slick, stringy layers that can trail toward the throat or drape flat, and undercooked layers are squeaky and tough. Mitigate by braising until melting-soft and chopping crosswise into fine pieces so no long strand survives the knife.",
  nutritionHighlights: [
    "Brings prebiotic-style fiber that feeds a developing gut",
    "A source of folate for rapid cell growth",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "The white and pale-green parts of a leek braised until melting-soft, then chopped crosswise into fine pieces no bigger than a pinky nail and folded through a mash.",
      passFailTest:
        "Press a piece between two fingers — it should smear rather than spring back, and pulling the pile apart should reveal no long, stringy ribbons.",
      whyThisForm:
        "A fist-grasping baby meets leek as a flavor inside other foods; melting-soft fine pieces can't separate into the slick strands that whole layers become.",
      prepSteps: [
        "Trim the root and the tough dark-green tops, keeping the white and pale-green barrel.",
        "Halve lengthwise and fan the layers under running water — grit hides between them.",
        "Slice thin and braise covered in olive oil plus a splash of water for 15–20 minutes, until melting.",
        "Chop fine and fold into potato mash, oatmeal, or a soft omelette.",
      ],
      commonMistakes: [
        "A fast sauté that leaves the layers squeaky and stretchy.",
        "Cutting long strips, which slide apart into exactly the strings you're avoiding.",
        "Skipping the rinse — one gritty bite can put a baby off for weeks.",
      ],
      cutDiagram: "shred",
      media: [],
    },
    {
      band: "9-12m",
      form: "Melting-braised leek chopped into pinky-nail pieces and stirred through scrambled eggs, pasta, beans, or mashed potato as an everyday flavor base.",
      passFailTest:
        "Pull a spoonful apart: nothing should stretch between the halves, and a pinched piece should smear flat with no spring.",
      whyThisForm:
        "Pincer-stage babies pick mixed pieces up well, and keeping leek chopped fine inside foods with body means the slippery layers never travel alone.",
      prepSteps: [
        "Braise and chop exactly as for 6–8 months.",
        "Stir into eggs, pasta, or mash before serving.",
        "Offer a few self-feedable mixed pieces at a time.",
      ],
      commonMistakes: [
        "Serving rings from a lightly cooked leek — the layers telescope apart into slick loops.",
      ],
      cutDiagram: "shred",
      media: [],
    },
    {
      band: "12-24m",
      form: "Soft braised leek in small chopped pieces through family dishes, or whipped with potato into a classic smooth leek-and-potato mash or soup.",
      passFailTest:
        "Sample a piece from the finished dish: it should melt against the roof of your mouth with no chewy layer or trailing strand.",
      whyThisForm:
        "Toddlers manage more texture, but leek's layers stay slippery, so it shines chopped through dishes where its sweetness does the work and the geometry stays safe.",
      prepSteps: [
        "Keep braising until melting before chopping into family dishes.",
        "Simmer with potato and blend for a naturally sweet soup no toddler has to chew.",
      ],
      commonMistakes: [
        "Treating leek like a green onion garnish — raw or crisp leek is tough, sharp, and stringy.",
      ],
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["potato", "chicken", "egg", "cheese"],
  tips: [
    "Grit hides deep between the layers — halve lengthwise and fan under running water before anything else.",
    "Use the white and pale-green parts for the baby; save the tough dark tops for the stock pot.",
    "Leek is the gentlest first allium: all of onion's flavor-base magic with a naturally sweeter finish.",
    "Braise low and slow until you can smear a piece between two fingers — that's the melting point that makes it safe.",
  ],
  sources: [SOURCES.nhsFrom6Months, SOURCES.wicGuide, SOURCES.cdcFoodsAndDrinks],
  nutrients: ["fiber", "folate"],
  servingGuidance: [
    {
      band: "6-8m",
      typicalAmount:
        "A teaspoon or two of melting chopped leek folded through a mash — flavor-base scale is plenty.",
    },
    {
      band: "9-12m",
      typicalAmount:
        "A tablespoon of chopped braised leek stirred through eggs, pasta, or mash.",
    },
    {
      band: "12-24m",
      typicalAmount:
        "A couple of tablespoons through a family dish, or a small bowl of blended leek-and-potato soup.",
    },
  ],
  watchOuts: [
    "Like onion and garlic, leek can be a bit windy at first — start with small amounts folded into familiar foods.",
  ],
  emoji: "🧅",
};

export default leek;
