import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const pita: Food = {
  slug: "pita",
  name: "Pita",
  aliases: ["pitta", "pocket bread"],
  category: "grain",
  minAgeMonths: 6,
  ironRich: false,
  commonAllergen: "wheat",
  chokingRisk: "moderate",
  chokingNotes:
    "Fresh, pillowy pita compacts into a doughy wad in the mouth — the same hazard as fresh bread. Mitigate by splitting thick pockets into single layers, toasting lightly until the surface springs back, and serving finger-width strips instead of torn hunks.",
  nutritionHighlights: [
    "Whole-wheat pita brings whole-grain fiber; white pita from enriched flour adds folic acid and iron",
    "A sturdy hummus vehicle that keeps wheat exposure steady once it's introduced",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "Pita split into single layers, lightly toasted until springy, and cut into strips about the width of one adult finger and the length of two.",
      passFailTest:
        "The pinch test: squeeze a strip between thumb and forefinger — it should compress and spring back. If it rolls into a dense, doughy ball, toast it a shade longer.",
      whyThisForm:
        "A palmar-grasping baby holds a strip in a fist and works on the end sticking out, and light toasting keeps the crumb springy instead of collapsing into the sticky wad fresh pita becomes.",
      prepSteps: [
        "Choose the lowest-sodium pita you can find, split the pocket into single layers, and toast lightly until just springy — not crisp.",
        "Cut into finger-width strips, plain or with a paper-thin smear of hummus.",
        "First time with wheat: serve early in the day, keep the amount small, and watch for 2 hours.",
        "Never introduce it alongside another new food, so any reaction has one clear cause.",
      ],
      commonMistakes: [
        "Serving fresh, fluffy pita — the pillowy softness is precisely what gums into a wad.",
        "Toasting to a crunch, which swaps the gumming hazard for sharp, dry shards.",
        "Loading strips with a thick scoop of hummus instead of a see-through smear.",
      ],
      cutDiagram: "strips",
      media: [],
    },
    {
      band: "9-12m",
      form: "Lightly toasted single-layer pita cut into rough pieces about the size of your pinky fingernail, each carrying at most a thin smear of hummus.",
      passFailTest:
        "Press one piece flat between two fingers — it should squash and partly spring back, never smear into paste or crack like a chip.",
      whyThisForm:
        "The emerging pincer grasp gets excellent low-stakes practice on small toasted pieces, and the tacky hummus smear doubles as grip for slippery little fingers.",
      prepSteps: [
        "Split, toast lightly, and cut into pinky-nail pieces exactly as the strip method, just smaller.",
        "Add a paper-thin smear of hummus or mashed vegetables for flavor and traction.",
        "Offer a few pieces at a time to discourage cheek-stuffing.",
      ],
      commonMistakes: [
        "Reverting to untoasted pita because the baby seems more capable — it still wads up at this age.",
      ],
      cutDiagram: "bite-size",
      media: [],
    },
    {
      band: "12-24m",
      form: "Lightly toasted pita strips or small triangles with a paper-thin hummus smear, each piece about the size of two adult thumbnails.",
      passFailTest:
        "Fold a piece in half: it should bend and spring back rather than press into a dense pellet, and the smear should look see-through, not layered.",
      whyThisForm:
        "Toddlers gain molars but still over-stuff, and soft flatbreads remain top wad-formers, so light toasting and small pieces stay the rule while dip-and-scoop skills bloom.",
      prepSteps: [
        "Toast lightly and cut into strips or small triangles for dipping practice.",
        "Serve beside a spoonful of hummus or thick yogurt dip and let the toddler do the scooping.",
      ],
      commonMistakes: [
        "Handing over a whole floppy half-pocket — big pieces invite tearing off more than a mouth can manage.",
      ],
      cutDiagram: "strips",
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["chickpeas", "cucumber", "yogurt", "tomato"],
  tips: [
    "If wheat is already introduced via bread or pasta with no reaction, pita is just a new texture — the first-time caution steps no longer apply.",
    "Splitting the pocket into single layers before toasting is the trick: thin layers toast evenly and never hide a doughy middle.",
    "A see-through smear of hummus adds flavor, grip, and a sesame exposure in one move — thick scoops just glob.",
    "Pita freezes well split and flat; toast strips straight from frozen for an instant baby-safe side.",
  ],
  sources: [SOURCES.eatStudy, SOURCES.nhsFrom6Months, SOURCES.aapChoking],
  nutrients: ["folate", "fiber"],
  servingGuidance: [
    {
      band: "6-8m",
      typicalAmount:
        "One lightly toasted strip is plenty to start — much of it is gnawing and exploration, and that counts.",
      frequency: "About twice a week once tolerated keeps the wheat exposure steady",
    },
    {
      band: "9-12m",
      typicalAmount:
        "A few pinky-nail pieces at a time, up to about half a single layer — appetite decides, not the pocket.",
    },
    {
      band: "12-24m",
      typicalAmount:
        "Half a pita as strips or triangles with a dip at the family meal — hunger swings day to day.",
    },
  ],
  watchOuts: [
    "Pita sodium varies a lot between brands — compare labels and pick the lowest per pocket.",
    "Pita is wheat — if celiac disease or wheat allergy runs in the family, discuss introduction with your pediatrician first.",
  ],
  emoji: "🥙",
};

export default pita;
