import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const cheese: Food = {
  slug: "cheese",
  name: "Cheese",
  aliases: ["mozzarella", "ricotta", "swiss cheese"],
  category: "dairy",
  minAgeMonths: 6,
  ironRich: false,
  commonAllergen: "milk",
  chokingRisk: "moderate",
  chokingNotes:
    "Cheese cubes and chunks are a classic toddler choking hazard — firm, slippery blocks that can wedge in an airway. Mitigate by serving cheese only shredded, in thin floppy strips, or as soft spoonable ricotta; save cubes for well past the toddler years.",
  nutritionHighlights: [
    "Concentrated calcium for growing bones",
    "Protein and whole-milk fat in a small, energy-dense package",
    "Pasteurized cheese is a convenient dairy exposure that needs no cooking",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "Smooth whole-milk ricotta stirred into a familiar puree, or a paper-thin slice of a low-sodium pasteurized cheese like fresh mozzarella or Swiss cut into a strip about two adult fingers wide.",
      passFailTest:
        "The bend test: a strip should flop over your finger like a piece of fabric and tear easily with your fingers — if it holds its shape stiffly or resists tearing, slice it thinner.",
      whyThisForm:
        "A wide, floppy, paper-thin strip suits the whole-fist grasp and shears apart under gum pressure, while spoonable ricotta gives pre-finger-food babies the same milk-protein exposure with zero geometry risk.",
      prepSteps: [
        "Pick a low-sodium pasteurized cheese: fresh mozzarella, Swiss (Emmental), or whole-milk ricotta are reliable choices.",
        "Stir a spoonful of ricotta into a familiar puree, or shave a paper-thin slice and cut a strip two adult fingers wide.",
        "First time: serve early in the day, a small amount, and watch for 2 hours.",
        "Serve alongside familiar foods, never another new food, so any reaction can be traced to the milk.",
      ],
      commonMistakes: [
        "Cutting cubes or thick batons — with cheese, thick is the hazard; thin and floppy is the safe form.",
        "Choosing salty cheeses like feta, halloumi, or processed slices; an infant's sodium budget is tiny.",
        "Serving unpasteurized (raw-milk) cheese, which carries infection risk for infants.",
      ],
      cutDiagram: "strips",
      media: [],
    },
    {
      band: "9-12m",
      form: "Low-sodium pasteurized cheese either finely shredded or cut into thin, floppy strips no thicker than a slice of sandwich cheese, never into cubes or chunks.",
      passFailTest:
        "Pinch a shred or strip: it should bend limply and tear apart with no effort. Any piece stiff enough to hold a block shape between your fingers is too thick.",
      whyThisForm:
        "Shreds are near-ideal pincer-grasp practice and are too small to plug anything, while thin strips keep working for babies who prefer a bigger handful — cubes remain the one shape to avoid.",
      prepSteps: [
        "Shred cheese on the fine side of a box grater, or slice thin floppy strips with a vegetable peeler.",
        "Scatter a small pile of shreds on the tray, or melt them over soft vegetables so they bind into wisps.",
        "Keep portions modest — cheese is salty even in its low-sodium forms.",
      ],
      commonMistakes: [
        "Cubing cheese because it seems tidier — cubes are exactly the hazard shape.",
        "Relying on cheese at every meal; its saltiness makes it an easy crutch that crowds out variety.",
      ],
      cutDiagram: "shred",
      media: [],
    },
    {
      band: "12-24m",
      form: "Thin slices, shredded cheese, or cheese melted into family foods like pasta and eggs, keeping cubes and chunky pieces off the menu until well past age two.",
      passFailTest:
        "Same bend-and-tear check: every piece should flop and tear easily; firm cubes and thick sticks of cheese still fail.",
      whyThisForm:
        "Toddlers chew better but still lack the full set of grinding molars, and a firm slippery cube can wedge before it's chewed — thin and floppy stays the rule through toddlerhood.",
      prepSteps: [
        "Melt shredded cheese into pasta, eggs, or vegetables, or serve thin floppy slices with fruit.",
        "Keep choosing lower-sodium varieties and keep portions moderate.",
      ],
      commonMistakes: [
        "Graduating to cheese cubes or string-cheese logs bitten straight off — cut string cheese into thin lengthwise strips instead.",
      ],
      cutDiagram: "shred",
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["broccoli", "apple", "pasta", "egg"],
  tips: [
    "Cheese and yogurt are fine as foods from 6 months, but cow's milk must not replace breast milk or formula as a drink before 12 months.",
    "Sodium shortcut: fresh mozzarella, Swiss, and ricotta sit near the bottom of the cheese sodium range — feta, halloumi, and processed slices sit at the top.",
    "A vegetable peeler makes better baby cheese than a knife: it naturally shaves the paper-thin, floppy strips that pass the bend test.",
    "Chill the block for 15 minutes before shredding or peeling — cold cheese shaves cleanly instead of crumbling.",
    "String cheese is only safe cut lengthwise into thin strips; bitten off the log, it breaks into firm plugs.",
  ],
  sources: [SOURCES.aaaaiFoodAllergy, SOURCES.cdcChokingHazards, SOURCES.aapStartingSolids],
};

export default cheese;
