import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const orange: Food = {
  slug: "orange",
  name: "Orange",
  aliases: ["mandarin", "clementine"],
  category: "fruit",
  minAgeMonths: 6,
  ironRich: false,
  commonAllergen: null,
  chokingRisk: "moderate",
  chokingNotes:
    "The hazard is the tough membrane around each segment: it can peel off in the mouth as a clingy sheet that drapes over the airway. Mitigate by serving supremes — segments with every trace of membrane cut away — chopped for young babies, or whole large membrane-free segments once the pincer grasp arrives.",
  nutritionHighlights: [
    "An excellent source of vitamin C, which boosts absorption of iron from plant foods served alongside",
    "Provides folate for cell growth",
    "High water content contributes to hydration",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "Orange supremes — segments cut free of every bit of membrane and seed — chopped into soft pieces about the size of your pinky fingernail or lightly mashed into yogurt.",
      passFailTest:
        "Pull a piece apart with your fingers: it should separate into juicy vesicles with no papery film clinging anywhere. Any piece with a skin-like sheet on it fails.",
      whyThisForm:
        "Young babies cannot spit out or chew through the membrane sheet, so removing it entirely in the kitchen is what makes citrus safe; small chopped pieces then rake easily into a fist.",
      prepSteps: [
        "Slice the top and bottom off the orange, then cut away peel and white pith in strips, following the fruit's curve.",
        "Cut along both sides of each membrane wall to free the supremes, flicking out any seeds.",
        "Chop the supremes into pinky-nail pieces, or mash lightly into yogurt or oatmeal.",
      ],
      commonMistakes: [
        "Serving ordinary peeled segments with the membrane on — the membrane is the entire hazard at this age.",
        "Mistaking the acid-contact redness around the mouth for an allergic reaction — it is skin irritation and fades on its own.",
        "Missing a seed inside a segment; run each supreme between your fingers first.",
      ],
      cutDiagram: "bite-size",
      media: [],
    },
    {
      band: "9-12m",
      form: "Whole large supremes — full membrane-free segments — or chopped supreme pieces, each soft enough to squash between two fingers with light pressure.",
      passFailTest:
        "Squeeze a segment: it should burst into juice and vesicles at light pressure with no rubbery film resisting you.",
      whyThisForm:
        "With the pincer grasp arriving, a whole slippery supreme is satisfying to grab and gum, and with the membrane gone it simply dissolves into juice in the mouth.",
      prepSteps: [
        "Supreme the orange exactly as before, keeping segments whole for grabbing or chopping them for precision practice.",
        "Blot very juicy segments on a paper towel or roll in a pinch of ground oat cereal so they're grippable.",
      ],
      commonMistakes: [
        "Sliding back to membrane-on segments because the baby seems capable — chewing through membrane takes molars, not confidence.",
      ],
      media: [],
    },
    {
      band: "12-24m",
      form: "Membrane-free supremes freely, and thin-skinned mandarin or clementine segments with the membrane on only once chewing is strong, each segment halved and checked for seeds.",
      passFailTest:
        "For membrane-on mandarin segments, bite one yourself: the membrane should be tissue-thin and tear instantly. If it is chewy to an adult, keep supreming.",
      whyThisForm:
        "Emerging molars can start to manage the thinnest mandarin membranes, but halving each segment breaks up the sheet so no intact film can drape over the airway.",
      prepSteps: [
        "Continue offering supremes of larger oranges as the default.",
        "For thin-skinned mandarins, halve each segment crosswise, remove seeds, and serve a few at a time.",
      ],
      commonMistakes: [
        "Handing over whole mandarin segments from the fruit bowl — halving and seed-checking each one remains the rule for this whole window.",
      ],
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["lentils", "beef", "spinach", "yogurt"],
  tips: [
    "Serve citrus in the same meal as iron-rich plant foods like lentils or fortified oat cereal — the vitamin C meaningfully improves iron absorption.",
    "Redness around the mouth or a diaper rash after citrus is acid irritation, not allergy; a barrier balm on the chin before eating and a plain-water wipe after helps.",
    "Supreming is a two-minute skill: top and bottom off, peel carved away in strips, then a knife stroke down each side of every membrane wall frees perfect segments.",
    "Choose seedless navel oranges or seedless mandarins to eliminate the seed check on busy mornings.",
  ],
  sources: [SOURCES.wicGuide, SOURCES.nhsFrom6Months, SOURCES.aapChoking],
  nutrients: ["vitaminC", "folate"],
  servingGuidance: [
    {
      band: "6-8m",
      typicalAmount:
        "A few chopped supreme pieces, or a spoonful mashed into yogurt — a taste of tart is the goal, not a quota.",
    },
    {
      band: "9-12m",
      typicalAmount:
        "One to three whole supremes, offered a piece at a time.",
    },
    {
      band: "12-24m",
      typicalAmount:
        "Half a small orange's worth of segments with a meal — pairing it with iron-rich food puts the vitamin C to work.",
    },
  ],
  watchOuts: [
    "Citrus acid can redden the skin around the mouth and aggravate diaper rash — irritation, not allergy; a plain-water wipe helps.",
    "Serve the fruit, not the juice — juice concentrates the sugars, drops the fiber, and isn't recommended in the first year.",
  ],
  emoji: "🍊",
};

export default orange;
