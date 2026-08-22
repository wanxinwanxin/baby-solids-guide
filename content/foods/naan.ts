import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const naan: Food = {
  slug: "naan",
  name: "Naan",
  aliases: [],
  category: "grain",
  minAgeMonths: 6,
  ironRich: false,
  commonAllergen: "wheat",
  chokingRisk: "moderate",
  chokingNotes:
    "Naan is a rich, pillowy flatbread that compresses into a doughy wad against the palate — the same hazard as fresh bread, amplified by its soft crumb. Mitigate by toasting each piece lightly until it springs back when pressed and cutting thin, finger-width strips rather than offering torn chunks.",
  nutritionHighlights: [
    "Delivers wheat protein, keeping that allergen in steady rotation once introduced",
    "Richer in energy than plain bread thanks to the yogurt, milk, or ghee in the dough",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "Naan toasted lightly until it springs back when pressed, then cut into thin strips about the width of one adult finger and the length of two.",
      passFailTest:
        "The pinch test: squeeze a strip between thumb and forefinger — it should compress and spring back. If it packs into a dense, doughy pellet, toast it a little longer.",
      whyThisForm:
        "A palmar-grasping baby holds a strip in a fist and gnaws the end sticking out, and light toasting keeps naan's extra-soft crumb springy instead of letting it collapse into a wad.",
      prepSteps: [
        "Choose the plainest, lowest-sodium naan available and toast lightly until the surface is set and springy — not crisp.",
        "Slice off any hard, blistered edge and cut into thin finger-width strips.",
        "First time with wheat: serve early in the day, keep the amount small, and watch for 2 hours.",
        "Never introduce it alongside another new food, so any reaction has one clear cause.",
      ],
      commonMistakes: [
        "Serving naan straight from the packet — its pillowy crumb is the most wad-prone of the flatbreads.",
        "Picking a buttery garlic or chili variety when a plain one is on the same shelf.",
        "Cutting thick chunks instead of thin strips a fist can actually manage.",
      ],
      cutDiagram: "strips",
      media: [],
    },
    {
      band: "9-12m",
      form: "Lightly toasted naan cut into rough pieces about the size of your pinky fingernail, each springy to the pinch rather than pillowy-soft or crisp.",
      passFailTest:
        "Press one piece flat between two fingers — it should squash and partly spring back, never smear into dough or snap like a cracker.",
      whyThisForm:
        "Small toasted pieces give the emerging pincer grasp low-stakes practice, and naan's slightly chewy surface survives little fingers better than crumbly bread.",
      prepSteps: [
        "Toast lightly exactly as for 6–8 months.",
        "Cut into pinky-nail pieces, plain or with a paper-thin smear of yogurt or mild dal.",
        "Offer a few pieces at a time to discourage cheek-stuffing.",
      ],
      commonMistakes: [
        "Sliding back to untoasted naan because the baby seems more capable — it still wads up at this age.",
      ],
      cutDiagram: "bite-size",
      media: [],
    },
    {
      band: "12-24m",
      form: "Lightly toasted naan strips about one adult finger wide, plain or with a paper-thin smear of yogurt or dal for dipping practice.",
      passFailTest:
        "Fold a strip in half: it should bend and spring back rather than press into a dense pellet, and any smear should look see-through.",
      whyThisForm:
        "Toddlers gain molars but still over-stuff, and rich soft flatbreads remain top wad-formers, so light toasting and strip geometry stay the rule while scoop-and-dip skills grow.",
      prepSteps: [
        "Toast lightly, cut finger-wide strips, and serve beside a mild, low-salt dal or yogurt dip.",
        "Let the toddler dip and scoop — it builds utensil-adjacent skills with a built-in portion brake.",
      ],
      commonMistakes: [
        "Handing over a whole torn hunk from the adult basket at a restaurant.",
      ],
      cutDiagram: "strips",
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["chickpeas", "lentils", "yogurt", "chicken"],
  tips: [
    "If wheat is already introduced via bread or pasta with no reaction, naan is just a new texture — the first-time caution steps no longer apply.",
    "Store naan is among the saltiest flatbreads on the shelf — compare labels and pick the plainest, lowest-sodium option.",
    "Light toasting is the whole safety trick: springy beats pillowy, and springy beats crispy too.",
    "Naan freezes well; toast strips straight from frozen while the family curry finishes.",
  ],
  sources: [SOURCES.eatStudy, SOURCES.aapChoking, SOURCES.cdcFoodsAndDrinks],
  nutrients: ["folate", "protein"],
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
        "A few pinky-nail pieces at a time, up to about a quarter of a naan — appetite decides.",
    },
    {
      band: "12-24m",
      typicalAmount:
        "A quarter to half naan as strips with a dip at the family meal — hunger swings day to day.",
    },
  ],
  watchOuts: [
    "Store naan runs high in sodium — it's often the saltiest flatbread on the shelf, so compare labels.",
    "Most naan contains dairy (yogurt, milk, or ghee) — relevant if milk hasn't been introduced yet or a milk allergy is in play.",
    "Naan is wheat — if celiac disease or wheat allergy runs in the family, discuss introduction with your pediatrician first.",
  ],
  emoji: "🫓",
};

export default naan;
