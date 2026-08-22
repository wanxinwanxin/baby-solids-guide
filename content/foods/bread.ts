import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const bread: Food = {
  slug: "bread",
  name: "Bread",
  aliases: ["toast"],
  category: "grain",
  minAgeMonths: 6,
  ironRich: false,
  commonAllergen: "wheat",
  chokingRisk: "moderate",
  chokingNotes:
    "Fresh, soft white bread compacts against the palate into a sticky, gummy wad that can block an airway. Mitigate by lightly toasting every serving so the crumb stays springy instead of doughy, and cutting it into finger-width strips rather than handing over a fluffy slice or torn hunks.",
  nutritionHighlights: [
    "Many sandwich breads are fortified with iron and B vitamins such as folic acid",
    "Delivers wheat protein, one of the common allergens worth introducing early and keeping in the diet",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "One slice of low-sodium bread toasted just until lightly golden and springy, cut into strips about the width of one adult finger and the length of two.",
      passFailTest:
        "The pinch test: squeeze a strip between thumb and forefinger — it should compress and spring back. If it rolls into a dense, doughy ball, it needs more toasting.",
      whyThisForm:
        "At this age babies grip with a whole fist and gnaw on the part sticking out, so a long strip gives a handle; light toasting stops the crumb collapsing into the sticky wad that fresh bread becomes against bare gums.",
      prepSteps: [
        "Pick the lowest-sodium loaf you can find (compare labels — sodium per slice varies widely) with no honey listed before 12 months.",
        "Toast lightly until the surface is just golden and the slice springs back when pressed — not hard and cracker-like.",
        "Cut off the toughest crust edges and slice into finger-width strips.",
        "First time: serve early in the day, a small amount, and watch for 2 hours.",
      ],
      commonMistakes: [
        "Serving fresh, fluffy white bread — softness is the hazard here, because it gums into a sticky wad.",
        "Toasting until hard and crunchy, which swaps the gumming hazard for sharp, dry fragments.",
        "Adding a thick layer of spread — any topping should be a paper-thin smear.",
      ],
      cutDiagram: "strips",
      media: [],
    },
    {
      band: "9-12m",
      form: "Lightly toasted bread torn or cut into rough pieces about the size of your pinky fingernail, each still springy rather than doughy or hard.",
      passFailTest:
        "Press one piece flat between two fingers — it should squash and partially spring back, never smear into paste or crack like a chip.",
      whyThisForm:
        "The emerging pincer grasp lets babies pick up small pieces between thumb and forefinger, and small toasted bites are ideal low-stakes practice with a texture they already know.",
      prepSteps: [
        "Toast lightly exactly as for 6–8 months.",
        "Cut or tear into pinky-nail-sized pieces, keeping some soft crumb on each.",
        "Offer a few pieces at a time to discourage cheek-stuffing.",
      ],
      commonMistakes: [
        "Drifting back to untoasted bread because the baby seems more capable — fresh bread still wads up at this age.",
        "Dumping a whole slice's worth of pieces on the tray at once.",
      ],
      cutDiagram: "bite-size",
      media: [],
    },
    {
      band: "12-24m",
      form: "Lightly toasted strips or small sandwich squares with paper-thin fillings, keeping each piece no bigger than roughly two adult thumbnails and never a whole soft slice.",
      passFailTest:
        "Fold a piece in half: it should bend and spring back rather than compress into a dense pellet, and any filling should look like a see-through smear.",
      whyThisForm:
        "Toddlers are gaining molars but still tend to over-stuff, and soft bread remains one of the textures most likely to compact in the mouth, so light toasting and small pieces stay the rule.",
      prepSteps: [
        "Continue toasting lightly and cutting into strips or small squares.",
        "Build simple sandwiches with thin smears — mashed avocado, hummus, or thinned nut butter — not thick layers.",
      ],
      commonMistakes: [
        "Handing over a whole untoasted roll or bagel chunk — dense, chewy breads are still wad-formers.",
      ],
      cutDiagram: "strips",
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["avocado", "peanut-butter", "egg", "cheese"],
  tips: [
    "Bread is one of the saltiest staples in the cart — compare nutrition labels and pick the lowest sodium per slice you can find.",
    "Day-old bread toasts more evenly than fresh; keep a loaf sliced in the freezer and toast strips straight from frozen.",
    "A paper-thin smear of mashed avocado or thinned nut butter adds grip and calories without creating a sticky glob.",
    "If strips keep tearing in a tight fist, toast a shade darker — a slightly firmer surface survives the palmar grip better.",
  ],
  sources: [SOURCES.eatStudy, SOURCES.nhsFrom6Months, SOURCES.cdcFoodsAndDrinks],
};

export default bread;
