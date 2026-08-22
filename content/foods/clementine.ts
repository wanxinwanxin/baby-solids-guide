import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const clementine: Food = {
  slug: "clementine",
  name: "Clementine",
  aliases: ["mandarin", "tangerine", "satsuma"],
  category: "fruit",
  minAgeMonths: 6,
  ironRich: false,
  commonAllergen: null,
  chokingRisk: "moderate",
  chokingNotes:
    "The hazard is the membrane wrapped around each segment: in the mouth it can peel away as a clingy, skin-like sheet that drapes over the airway. Mitigate by cutting every trace of membrane away and chopping the flesh for young babies; membrane-on segments wait until chewing is strong, and even then each segment gets halved so no intact sheet survives.",
  nutritionHighlights: [
    "An excellent source of vitamin C, which markedly improves iron absorption from plant foods in the same meal",
    "Provides folate for rapid cell growth",
    "High water content makes it a hydrating snack",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "Clementine segments with every bit of membrane peeled or cut away, the bare juicy flesh chopped into pieces about the size of your pinky fingernail or mashed lightly into yogurt.",
      passFailTest:
        "Pull a piece apart with your fingers: it should separate into juicy little vesicles with no papery film clinging anywhere. Any piece trailing a skin-like sheet fails.",
      whyThisForm:
        "Young babies can neither chew through nor spit out a membrane sheet, so removing it entirely in the kitchen is what makes citrus safe; the freed flesh then collapses into juice against bare gums.",
      prepSteps: [
        "Peel the clementine and separate the segments, pulling off loose strings of pith.",
        "Nick the thin edge of each segment with a knife or your thumbnail and peel the membrane away, or slice the flesh free supreme-style.",
        "Check for the occasional seed, then chop the bare flesh into pinky-nail pieces or mash into yogurt or oatmeal.",
      ],
      commonMistakes: [
        "Serving ordinary peeled segments with the membrane on — the membrane is the entire hazard at this age.",
        "Reading acid-contact redness around the mouth as an allergic reaction — it is simple skin irritation and fades on its own.",
        "Assuming every clementine is seedless; a stray seed turns up often enough to warrant a squeeze-check.",
      ],
      cutDiagram: "bite-size",
      media: [],
    },
    {
      band: "9-12m",
      form: "Whole membrane-free clementine segments, or the same flesh chopped small, each piece bursting into juice when squeezed gently between two adult fingers.",
      passFailTest:
        "Squeeze a segment: it should burst into juice and vesicles under light pressure, with no rubbery film resisting you anywhere.",
      whyThisForm:
        "The new pincer grasp loves a whole slippery segment, and with the membrane gone the piece simply dissolves in the mouth — a satisfying, safe self-feeding win.",
      prepSteps: [
        "Skin the membrane off each segment exactly as before, keeping segments whole for grabbing or chopping them for precision practice.",
        "Blot very juicy segments on a paper towel or roll in a pinch of ground oat cereal so small fingers can keep hold.",
      ],
      commonMistakes: [
        "Sliding back to membrane-on segments because the baby seems capable — chewing through membrane takes molars, not enthusiasm.",
      ],
      media: [],
    },
    {
      band: "12-24m",
      form: "Membrane-free segments freely, plus thin-skinned membrane-on segments once chewing is strong, each one halved crosswise and squeezed to check for seeds before serving.",
      passFailTest:
        "Bite a membrane-on segment yourself: the film should be tissue-thin and tear instantly. If it feels chewy to an adult, keep peeling membranes for now.",
      whyThisForm:
        "Clementine membranes are among the thinnest in citrus, so emerging molars can start to manage them — and halving each segment breaks the sheet so no intact film can drape over the airway.",
      prepSteps: [
        "Keep membrane-free flesh as the default at meals.",
        "For membrane-on practice, halve each segment crosswise, flick out any seeds, and offer a few pieces at a time.",
      ],
      commonMistakes: [
        "Handing over whole segments straight from the fruit bowl — halving and seed-checking each one remains the rule through this window.",
      ],
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["lentils", "spinach", "yogurt", "oatmeal"],
  tips: [
    "Serve clementine in the same meal as iron-rich plants like lentils or fortified oat cereal — the vitamin C meaningfully boosts iron absorption.",
    "Membranes peel off fastest when the fruit is at room temperature; cold segments cling to their film.",
    "Redness around the mouth or a flare of diaper rash after citrus is acid irritation, not allergy — a barrier balm before and a plain-water wipe after keeps it calm.",
    "Choose seedless-labeled clementines to skip the seed check, but still give each segment a quick squeeze — labels are optimistic.",
  ],
  sources: [SOURCES.wicGuide, SOURCES.nhsFrom6Months, SOURCES.aapChoking],
  nutrients: ["vitaminC", "folate"],
  servingGuidance: [
    {
      band: "6-8m",
      typicalAmount:
        "A few chopped membrane-free pieces, or a spoonful mashed into yogurt — a bright new taste, not a quota.",
    },
    {
      band: "9-12m",
      typicalAmount:
        "Two to four whole membrane-free segments, offered a piece at a time.",
    },
    {
      band: "12-24m",
      typicalAmount:
        "Half to one clementine's worth of segments with a meal — pairing it with iron-rich food puts the vitamin C to work.",
    },
  ],
  watchOuts: [
    "Citrus acid can redden the skin around the mouth and aggravate diaper rash — irritation, not allergy; a plain-water wipe helps.",
    "Serve the fruit, not the juice — juice strips the fiber, concentrates the sugars, and isn't recommended in the first year.",
  ],
  emoji: "🍊",
};

export default clementine;
