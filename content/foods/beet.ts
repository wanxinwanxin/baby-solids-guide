import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const beet: Food = {
  slug: "beet",
  name: "Beet",
  aliases: ["beetroot"],
  category: "vegetable",
  minAgeMonths: 6,
  ironRich: false,
  commonAllergen: null,
  chokingRisk: "low",
  nutritionHighlights: [
    "A source of folate, a B vitamin needed for rapid cell growth",
    "Provides potassium alongside gentle fiber",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "Beet roasted or steamed until a fork slides through with no resistance, peeled, and cut into soft sticks about the length and width of two adult fingers.",
      passFailTest:
        "The squish test: press a stick between thumb and forefinger — it should flatten with gentle pressure. A beet that resists is not done, however long it cooked.",
      whyThisForm:
        "A palmar-grasping baby traps the stick in a fist and gnaws the end above it; a two-finger baton gives that handle while squish-soft flesh mashes on the gums.",
      prepSteps: [
        "Scrub whole beets and roast wrapped in foil at 400°F for 45–60 minutes, or steam chunks 20–25 minutes, until fork-tender throughout.",
        "Rub the skins off under cool water — they slip free when the beet is fully cooked.",
        "Cut into two-adult-finger sticks and run the squish test on the thickest one.",
      ],
      commonMistakes: [
        "Pulling beets early — dense roots hide a firm center long after the outside softens.",
        "Serving coin-shaped slices, the riskiest round geometry, instead of sticks.",
      ],
      cutDiagram: "batons",
      media: [],
    },
    {
      band: "9-12m",
      form: "Soft-cooked peeled beet diced into pieces about the size of your pinky fingernail, each cube still soft enough to smash between two fingers.",
      passFailTest:
        "Press a cube between two fingers — it should flatten easily. Any piece with a firm bite goes back in the steamer.",
      whyThisForm:
        "Small soft cubes feed the emerging pincer grasp, and beets' slightly dense texture holds a diced shape better than most soft vegetables.",
      prepSteps: [
        "Cook and peel beets exactly as for 6–8 months.",
        "Dice into pinky-nail pieces.",
        "Offer a few pieces at a time — beet juice will paint everything it touches.",
      ],
      commonMistakes: [
        "Dressing the baby in anything you care about — beet pigment stains fabric more or less permanently.",
      ],
      cutDiagram: "bite-size",
      media: [],
    },
    {
      band: "12-24m",
      form: "Soft-cooked beet in bite-size chunks or coarsely grated, served warm or cold, folded into yogurt or offered plain beside family meals.",
      passFailTest:
        "Chunks should yield to firm finger pressure; grated cooked beet should mash to a paste when pinched.",
      whyThisForm:
        "Toddlers with molars manage soft chunks well, and grated beet stirred into yogurt or grains slips an earthy vegetable into familiar textures.",
      prepSteps: [
        "Keep a roasted beet or two in the fridge; chunk or grate portions as needed.",
        "Fold grated beet into plain yogurt for a vivid pink dip or spoonable snack.",
      ],
      commonMistakes: [
        "Offering raw beet sticks — raw beetroot stays too hard for toddler chewing.",
      ],
      cutDiagram: "bite-size",
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["yogurt", "apple", "lentils", "orange"],
  tips: [
    "Heads-up before the first serving: beets can turn urine pink and stools reddish for a day or two — it can look alarming; it's just pigment, not blood.",
    "Roast beets whole in foil and the skins rub off under running water — no peeler, no cutting-board stains.",
    "Beets' earthy flavor can take 8–15 exposures to land — keep offering small amounts without pressure, and pair with something familiar like yogurt.",
    "Vacuum-packed pre-cooked beets (choose no-vinegar versions) are a fine shortcut — check that the flesh still passes the squish test.",
  ],
  sources: [SOURCES.wicGuide, SOURCES.nhsFrom6Months, SOURCES.cdcFoodsAndDrinks],
};

export default beet;
