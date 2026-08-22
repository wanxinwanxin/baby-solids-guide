import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const swissChard: Food = {
  slug: "swiss-chard",
  name: "Swiss chard",
  aliases: ["chard", "rainbow chard", "silverbeet"],
  category: "vegetable",
  minAgeMonths: 6,
  ironRich: false,
  commonAllergen: null,
  chokingRisk: "moderate",
  chokingNotes:
    "A braised chard leaf is slick and broad enough to drape flat over the airway like film — the same hazard as spinach — and the wide ribs stay stringy long after the leaves soften. Mitigate by stripping out the ribs, braising the leaves soft, squeezing them dry, and confetti-chopping; never serve an intact cooked leaf.",
  nutritionHighlights: [
    "A solid plant source of iron — serve with vitamin-C foods to help absorption",
    "Provides folate for rapid cell growth",
    "Deeply colored leaves carry beta-carotene as a bonus",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "Chard leaves stripped from their ribs, braised until silky, squeezed dry, and chopped into confetti flecks no bigger than a pinky nail, folded through mash, eggs, or oatmeal.",
      passFailTest:
        "Spread the chop out: no fleck bigger than a pinky nail, no stringy rib fragment, and nothing that lifts away as an intact sheet of leaf.",
      whyThisForm:
        "A fist-grasping baby eats chard as a passenger inside other foods; confetti flecks carried by a mash cannot drape over the airway the way a whole slick leaf can.",
      prepSteps: [
        "Fold each leaf and pull it away from the rib in one stroke; set the ribs aside.",
        "Braise the leaves in olive oil plus a splash of water, covered, for 8–12 minutes until silky.",
        "Squeeze the cooled chard firmly dry, then chop in both directions to confetti.",
        "Fold into mashed vegetables, oatmeal, or a soft omelette strip.",
      ],
      commonMistakes: [
        "Serving whole wilted leaves — soft, but exactly the draping shape to avoid.",
        "Leaving rib pieces in with the leaves; they need their own longer cooking.",
        "Skipping the squeeze, which leaves the dish watery and the flecks slippery.",
      ],
      cutDiagram: "shred",
      media: [],
    },
    {
      band: "9-12m",
      form: "Confetti-chopped braised chard stirred through scrambled eggs, pasta, or thick mash, so every pinky-nail fleck arrives attached to a food with body.",
      passFailTest:
        "Pull a spoonful apart: any chard you can peel off as a flat sheet bigger than a pinky nail needs more chopping.",
      whyThisForm:
        "Pincer-stage babies handle mixed pieces well, but a free-floating slick leaf is still a draping hazard, so chard keeps riding inside other textures.",
      prepSteps: [
        "Strip, braise, squeeze, and chop exactly as for 6–8 months.",
        "Stir into eggs, pasta pieces, beans, or mash.",
        "Serve as self-feedable mixed pieces, a few at a time.",
      ],
      commonMistakes: [
        "Handing over a leaf to explore because the baby seems ready — the leaf's geometry hasn't changed.",
      ],
      cutDiagram: "shred",
      media: [],
    },
    {
      band: "12-24m",
      form: "Braised chard chopped into pinky-nail pieces as its own small side, with the colorful ribs now welcome too — cooked until silky and chopped small across their strings.",
      passFailTest:
        "Leaf pieces should be chopped past the point of lifting out intact, and a rib piece should squash between two fingers with no string trailing.",
      whyThisForm:
        "Toddlers manage more texture, and the ribs — braised long and cut across the grain — add a second, silkier texture while the leaf-chopping rule keeps the slick sheets away.",
      prepSteps: [
        "Braise the sliced ribs 5 minutes longer than the leaves, until fully silky.",
        "Chop everything small and serve as a dressed side or folded through family dishes.",
      ],
      commonMistakes: [
        "Serving long rib batons — the strings run lengthwise, so always cut ribs crosswise.",
      ],
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["egg", "potato", "lentils", "olive-oil"],
  tips: [
    "Strip the leaf in one pull: fold it in half along the rib and tear the greens away in a single stroke.",
    "Squeeze the cooked leaves hard — a dry ball chops into clean confetti while wet chard smears and clumps.",
    "Pair chard with vitamin-C foods like tomato or orange in the same meal to help its plant iron absorb.",
    "The earthy, faintly bitter edge can take 8–15 relaxed exposures to win over — tiny portions, zero pressure.",
    "Rainbow stems are worth keeping: braised long and chopped across the strings, they turn silky-sweet.",
  ],
  sources: [SOURCES.wicGuide, SOURCES.nhsFrom6Months, SOURCES.cdcFoodsAndDrinks],
  nutrients: ["iron", "folate"],
  servingGuidance: [
    {
      band: "6-8m",
      typicalAmount:
        "A teaspoon or two of confetti flecks folded through mash or eggs — garnish-scale is the right start.",
    },
    {
      band: "9-12m",
      typicalAmount:
        "A tablespoon of chopped braised chard stirred through eggs, pasta, or mash.",
    },
    {
      band: "12-24m",
      typicalAmount:
        "A couple of tablespoons as its own small side, ribs and leaves together — offered, never pushed.",
    },
  ],
  watchOuts: [
    "Chard, like spinach, is high in oxalates that bind its calcium — count it as an iron-and-folate green and rotate it with lower-oxalate greens like kale.",
  ],
  emoji: "🍃",
};

export default swissChard;
