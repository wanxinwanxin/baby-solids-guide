import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const apple: Food = {
  slug: "apple",
  name: "Apple",
  aliases: [],
  category: "fruit",
  minAgeMonths: 6,
  ironRich: false,
  commonAllergen: null,
  chokingRisk: "high",
  chokingNotes:
    "Raw apple is one of the top choking hazards for babies and toddlers: the hard flesh snaps into firm chunks that can plug an airway. Mitigate by serving apple only steamed-soft or finely grated raw — hard raw chunks, wedges, and whole apples are off-limits until around age 4.",
  nutritionHighlights: [
    "Provides pectin, a soluble fiber gentle on developing digestion",
    "A modest source of vitamin C",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "A peeled apple wedge steamed until it smashes between thumb and finger, cut about two adult fingers long, or raw apple grated on the fine side of a box grater.",
      passFailTest:
        "The squish test: a cooked wedge must flatten under gentle finger pressure with no firm core; a pinch of grated apple should mash into juice between two fingers.",
      whyThisForm:
        "A palmar-grasping baby gnaws whatever sticks out of the fist, so the wedge must be squish-soft throughout — and fine grating is the only safe way to serve apple raw, because each shred is too small to block anything.",
      prepSteps: [
        "Peel and core an apple and cut into two-finger wedges.",
        "Steam 8–10 minutes (or microwave, covered with a splash of water, 2–3 minutes) until fork-tender.",
        "Run the squish test on the thickest wedge before serving warm, not hot.",
        "For the raw option, grate on the fine side of a box grater and serve as a small mound or stirred into oatmeal.",
      ],
      commonMistakes: [
        "Serving raw apple wedges or chunks — the classic, and one of the most dangerous, first-food mistakes.",
        "Undercooking so a firm center hides inside a soft-looking wedge.",
        "Using the coarse grater side, which produces thick matchsticks rather than safe fine shreds.",
      ],
      cutDiagram: "batons",
      media: [],
    },
    {
      band: "9-12m",
      form: "Steamed-soft apple chopped into pieces about the size of your pinky fingernail, or a loose mound of raw apple finely grated on a box grater.",
      passFailTest:
        "Every cooked piece should flatten between two fingers; grated shreds should be short and fine enough that you couldn't pick one up and snap it.",
      whyThisForm:
        "Pinky-nail soft pieces feed the new pincer grasp, while raw apple stays grated-only — front teeth can now scrape but molars for grinding hard flesh are still years away.",
      prepSteps: [
        "Steam wedges soft as for 6–8 months, then dice into pinky-nail pieces.",
        "Or grate raw apple finely just before serving, since it browns quickly.",
        "Scatter a few pieces at a time on the tray.",
      ],
      commonMistakes: [
        "Graduating to raw pieces because the baby has front teeth — biting is not chewing, and raw chunks remain a top hazard.",
      ],
      cutDiagram: "bite-size",
      media: [],
    },
    {
      band: "12-24m",
      form: "Cooked-soft apple pieces and finely grated raw apple remain the safe forms; hard raw chunks, thick wedges, and whole apples stay off-limits until around age four.",
      passFailTest:
        "Cooked pieces still pass the two-finger squish test; anything raw on the plate should be grated fine or shaved thin enough to bend without snapping.",
      whyThisForm:
        "Even with first molars, toddlers cannot reliably grind hard raw apple into a safe swallow — raw apple keeps its top-hazard status well past the second birthday.",
      prepSteps: [
        "Keep serving baked, steamed, or sauteed apple pieces at family meals.",
        "Offer raw apple as fine gratings, or paper-thin peeled shavings for texture practice.",
      ],
      commonMistakes: [
        "Handing over apple slices or a whole apple to bite like an older child — that milestone belongs around age four, not two.",
      ],
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["peanut-butter", "oatmeal", "yogurt", "pork"],
  tips: [
    "Fastest safe apple ever: microwave peeled wedges in a covered bowl with a splash of water for 2–3 minutes — squish-test soft with no pot to wash.",
    "Variety matters: softer apples like McIntosh or Gala steam to tender far faster than dense types like Granny Smith or Honeycrisp.",
    "Grate raw apple at the last minute and toss with a drop of lemon juice if you need it to hold without browning.",
    "Unsweetened applesauce counts too — swirl it into oatmeal or plain yogurt for a no-prep serving with zero added sugar.",
  ],
  sources: [SOURCES.wicGuide, SOURCES.aapChoking, SOURCES.cdcChokingHazards],
  nutrients: ["fiber", "vitaminC"],
  servingGuidance: [
    {
      band: "6-8m",
      typicalAmount:
        "One or two steamed-soft wedges, or a small handful of finely grated apple — starting points, not targets; the baby sets the pace.",
    },
    {
      band: "9-12m",
      typicalAmount:
        "A small handful of pinky-nail pieces scattered a few at a time — refill while interest lasts, stop when they turn away.",
    },
    {
      band: "12-24m",
      typicalAmount:
        "A few tablespoons of cooked pieces or grated apple alongside the family meal — appetite swings day to day, and that's normal.",
    },
  ],
  watchOuts: [
    "Hold off on apple juice — it delivers the fruit's sugar without its fiber and can crowd out milk feeds.",
  ],
  emoji: "🍎",
};

export default apple;
