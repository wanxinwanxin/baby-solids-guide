import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const kale: Food = {
  slug: "kale",
  name: "Kale",
  aliases: ["curly kale", "lacinato kale", "tuscan kale"],
  category: "vegetable",
  minAgeMonths: 6,
  ironRich: false,
  commonAllergen: null,
  chokingRisk: "moderate",
  chokingNotes:
    "Cooked kale pieces are slick enough to drape like wet paper, and raw or half-cooked leaves are tough, papery, and hard to gum, while the central ribs stay woody. Mitigate by stripping out every rib, braising until fully silky, and confetti-chopping so no piece can lie flat over the airway.",
  nutritionHighlights: [
    "Rich in vitamin C, which also helps iron absorb from foods served alongside",
    "Beta-carotene supports eye and immune development",
    "One of the greens whose calcium the body absorbs well — kale is low in oxalates, unlike spinach",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "Kale leaves stripped off their ribs, braised until completely silky, squeezed dry, and chopped into confetti flecks no bigger than a pinky nail, folded into mash or oatmeal.",
      passFailTest:
        "Spread the chop out: no fleck bigger than a pinky nail, no woody rib fragment, and nothing that lifts away as an intact piece of leaf.",
      whyThisForm:
        "A fist-grasping baby meets kale as a passenger inside other foods; fine flecks carried by a mash can't drape over the airway, and only long braising defeats kale's papery toughness.",
      prepSteps: [
        "Pinch each stem and slide your fingers up it to strip the leaf off the rib in one pull; discard the ribs.",
        "Braise the leaves in olive oil plus a splash of water, covered, for 10–15 minutes until silky.",
        "Squeeze the cooled kale dry in your fist, then chop in both directions to confetti.",
        "Fold into mashed vegetables, oatmeal, or a soft omelette strip.",
      ],
      commonMistakes: [
        "A quick adult-style sauté — kale needs far longer than spinach to go silky.",
        "Leaving rib fragments in, which stay woody no matter how long the leaves cook.",
        "Skipping the squeeze, which leaves the flecks wet and slippery.",
      ],
      cutDiagram: "shred",
      media: [],
    },
    {
      band: "9-12m",
      form: "Silky braised kale chopped fine and stirred through scrambled eggs, pasta, or a thick mash so every pinky-nail fleck arrives attached to a food with body.",
      passFailTest:
        "Pull a spoonful apart: any kale you can peel off as a flat piece bigger than a pinky nail needs more chopping.",
      whyThisForm:
        "Pincer-stage babies pick up mixed pieces well, but a free-floating slick leaf remains a draping hazard, so kale keeps riding inside other textures.",
      prepSteps: [
        "Strip, braise, squeeze, and chop exactly as for 6–8 months.",
        "Stir into eggs, pasta, mashed potato, or beans.",
        "Serve as mixed self-feedable pieces, a few at a time.",
      ],
      commonMistakes: [
        "Serving crispy kale chips — the shards are scratchy and easy to inhale mid-giggle.",
      ],
      cutDiagram: "shred",
      media: [],
    },
    {
      band: "12-24m",
      form: "Braised kale chopped into pinky-nail pieces served as its own small side or in family dishes, with raw kale still off the menu for its papery toughness.",
      passFailTest:
        "Cooked kale should be chopped past the point where an intact leaf could be lifted out, and a sampled piece should chew silky, never leathery.",
      whyThisForm:
        "Toddlers chew better but thin, tough, clingy leaves stay difficult; small silky pieces keep kale safe while familiarity builds toward the picky years.",
      prepSteps: [
        "Continue stripping ribs and braising until silky before chopping.",
        "Serve as a dressed little side, or fold into pasta, soups, and grain bowls.",
      ],
      commonMistakes: [
        "Offering raw salad kale — even adults massage it first; toddler molars aren't ready for it.",
      ],
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["potato", "olive-oil", "egg", "cheese"],
  tips: [
    "Strip the leaf from the rib in one satisfying pull — pinch the stem end and slide your fingers up it.",
    "Braise 10–15 minutes with oil and a splash of water, far longer than an adult sauté, until the leaf goes truly silky.",
    "Kale's bitter edge is normal to refuse at first: it can take 8–15 relaxed exposures before it lands, so keep portions tiny and pressure at zero.",
    "A little grated cheese or olive oil folded through softens the bitterness without hiding the vegetable.",
  ],
  sources: [SOURCES.nhsFrom6Months, SOURCES.wicGuide, SOURCES.cdcFoodsAndDrinks],
  nutrients: ["vitaminC", "vitaminA", "calcium"],
  servingGuidance: [
    {
      band: "6-8m",
      typicalAmount:
        "A teaspoon or two of confetti flecks folded through mash or oatmeal — garnish-scale is the right scale.",
    },
    {
      band: "9-12m",
      typicalAmount:
        "A tablespoon of chopped braised kale stirred through eggs, pasta, or mash.",
    },
    {
      band: "12-24m",
      typicalAmount:
        "A couple of tablespoons as a small side or through family dishes — offered, not pushed.",
    },
  ],
  watchOuts: [
    "Like its brassica cousins, kale can be a little windy at first — start small and build up.",
  ],
  emoji: "🥬",
};

export default kale;
