import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const cottageCheese: Food = {
  slug: "cottage-cheese",
  name: "Cottage cheese",
  aliases: ["curd cheese"],
  category: "dairy",
  minAgeMonths: 6,
  ironRich: false,
  commonAllergen: "milk",
  chokingRisk: "low",
  nutritionHighlights: [
    "One of the most protein-dense soft dairy foods, spoonful for spoonful",
    "Calcium that supports rapidly mineralizing bones and teeth",
    "Soft curds give lump-in-smooth texture practice with almost no prep",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "No-salt-added whole-milk cottage cheese mashed briefly with a fork so every curd is broken down, served as a thick spoonful on a preloaded spoon or smeared on the tray.",
      passFailTest:
        "Check the sodium line first — a no-salt-added or genuinely low-sodium tub — then press a stray curd between two fingers: it should flatten instantly with no rubbery resistance.",
      whyThisForm:
        "A palmar-grasp baby steers a preloaded spoon or scoops with a whole fist, so a thick, mashed, clingy texture works where loose curds would scatter, and the fork-mash removes any bigger curds before gums meet them.",
      prepSteps: [
        "Choose a no-salt-added (or lowest-sodium) whole-milk cottage cheese — regular tubs are surprisingly salty.",
        "Mash a few spoonfuls with a fork until no whole curds remain, loosening with a little breast milk, formula, or water if it's stiff.",
        "First time: serve early in the day, a small amount, and watch for 2 hours.",
        "Serve alongside familiar foods, never another new food, so any reaction can be traced to the milk.",
      ],
      commonMistakes: [
        "Grabbing the regular salted tub — cottage cheese is one of the saltiest items in the yogurt aisle.",
        "Choosing low-fat versions — babies need the whole-milk fat.",
        "Serving fruit-on-the-bottom cottage cheese cups, which add sugar the same way flavored yogurt does.",
      ],
      cutDiagram: "mash",
      media: [],
    },
    {
      band: "9-12m",
      form: "No-salt-added cottage cheese served straight from the tub in a shallow bowl, with any curd larger than a pea pinched in half before it goes out.",
      passFailTest:
        "Scan the bowl: every curd should be pea-sized or smaller and squash under a light fingertip — anything bigger or bouncier gets pinched down.",
      whyThisForm:
        "Individual soft curds are ready-made pincer-grasp practice — small, soft, and irregular — and the lumpy-in-creamy texture is exactly the mixed consistency this window is for.",
      prepSteps: [
        "Spoon a few tablespoons into a shallow bowl and pinch any large curds in half.",
        "Let the baby alternate between finger-raking curds and working a small spoon.",
        "Stir in mashed ripe fruit for flavor instead of buying sweetened cups.",
      ],
      commonMistakes: [
        "Going back to fully mashed once the pincer grasp appears — the curds are the texture curriculum.",
        "Overfilling the bowl; a scatter of curds beats a mound that invites cheek-stuffing.",
      ],
      media: [],
    },
    {
      band: "12-24m",
      form: "Cottage cheese by the spoonful with soft pinky-nail-sized fruit pieces stirred in, or folded into scrambled eggs, pancake batter, and pasta at family meals.",
      passFailTest:
        "Vet the mix-ins like any finger food: each fruit piece squashes between two fingers and is no bigger than a pinky nail.",
      whyThisForm:
        "Toddlers manage mixed textures and utensils well; cottage cheese works as both an independent spoon food and a quiet protein boost folded into family cooking.",
      prepSteps: [
        "Serve a small bowl with a toddler spoon, stirring in soft diced fruit or a spoonful of mashed avocado.",
        "Fold cottage cheese into eggs, pancakes, or baked pasta to stretch the protein through family meals.",
      ],
      commonMistakes: [
        "Sliding into sweetened 'dessert' cottage cheese cups as the default snack once the toddler shows a preference.",
      ],
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["peach", "banana", "avocado", "tomato"],
  tips: [
    "Cottage cheese is fine as a food from around 6 months, but cow's milk as a drink waits until 12 months — the curds don't change the drink rule.",
    "Can't find no-salt-added? Dump regular cottage cheese in a fine sieve and rinse under cold water for a few seconds — a real chunk of the sodium washes off with the dressing.",
    "Small-curd varieties mash faster and smoother than large-curd; whipped cottage cheese skips the fork entirely.",
    "The tang pairs naturally with sweet mix-ins: mashed peach or pear turns it into a no-recipe breakfast.",
  ],
  sources: [SOURCES.eatStudy, SOURCES.wicGuide, SOURCES.cdcFoodsAndDrinks],
  nutrients: ["protein", "calcium"],
  servingGuidance: [
    {
      band: "6-8m",
      typicalAmount:
        "A teaspoon or two of the fork-mashed version to start — grow the portion as the milk introduction goes smoothly.",
      frequency: "Once tolerated, fine as a regular food — steady exposure helps maintain dairy tolerance.",
    },
    {
      band: "9-12m",
      typicalAmount:
        "Two to three tablespoons of curds in a shallow bowl — refill while the raking and scooping continue.",
    },
    {
      band: "12-24m",
      typicalAmount:
        "A quarter to half a cup at a meal or snack, alone or folded into other dishes — appetite sets the finish line.",
    },
  ],
  watchOuts: [
    "Regular cottage cheese runs salty — choose no-salt-added, or rinse the curds in a sieve to shed much of the sodium.",
  ],
  emoji: "🧀",
};

export default cottageCheese;
