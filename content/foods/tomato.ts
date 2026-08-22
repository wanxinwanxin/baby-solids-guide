import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const tomato: Food = {
  slug: "tomato",
  name: "Tomato",
  aliases: ["cherry tomato", "grape tomato"],
  category: "vegetable",
  minAgeMonths: 6,
  ironRich: false,
  commonAllergen: null,
  chokingRisk: "high",
  chokingNotes:
    "Cherry and grape tomatoes are among the top choking hazards for young children: smooth, round, slippery, and almost exactly airway-sized. Mitigate by ALWAYS quartering them lengthwise — never whole, never merely halved — a rule that holds until at least age 4, and by serving large tomatoes as soft wedges instead.",
  nutritionHighlights: [
    "A good source of vitamin C, which helps the body absorb plant iron served at the same meal",
    "Provides lycopene, an antioxidant pigment, along with potassium",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "A wedge of a large, fully ripe tomato about the size of two adult fingers, soft enough to dent with a fingertip, with the seeds and jelly left in.",
      passFailTest:
        "Press a fingertip into the flesh — it should dent easily and the wedge should tear apart with a light pull. A tomato that feels springy-firm needs more ripening time.",
      whyThisForm:
        "A fist-grasping baby clamps the wedge and sucks and gnaws the soft flesh off the top; a ripe large-tomato wedge is graspable, collapsible, and nothing like the round small-tomato shape that causes trouble.",
      prepSteps: [
        "Choose a large, deeply ripe tomato — it should smell like tomato at the stem.",
        "Cut into wedges about two adult fingers in size.",
        "Serve one wedge at a time; expect gloriously messy squeezing.",
      ],
      commonMistakes: [
        "Reaching for cherry tomatoes because they're 'baby-sized' — small round tomatoes are the single riskiest form.",
        "Serving an underripe, firm tomato whose flesh can break into resilient chunks.",
        "Mistaking the harmless red rash tomato acid can leave around the mouth for an allergic reaction — it's contact irritation from acidity, not an allergy, and it fades on its own.",
      ],
      cutDiagram: "wedge-handle",
      media: [],
    },
    {
      band: "9-12m",
      form: "Bite-size pieces of ripe large tomato, and any cherry or grape tomato always quartered lengthwise into four slim strips — never served whole or merely halved.",
      passFailTest:
        "Scan the tray: every small-tomato piece must show a cut face and be a slim quarter, not a dome. A halved cherry tomato is still a plug-shaped hazard.",
      whyThisForm:
        "Pincer-stage babies pick up soft tomato pieces well, and quartering lengthwise turns the dangerous sphere into four flat strips that can't seal an airway.",
      prepSteps: [
        "Cut large tomatoes into pinky-nail-sized pieces.",
        "Quarter every cherry or grape tomato lengthwise, stem end to tip, without exception.",
        "Offer a few pieces at a time — slippery pieces invite fistfuls.",
      ],
      commonMistakes: [
        "Halving cherry tomatoes instead of quartering — a half is still round enough to lodge.",
        "Trusting daycare or relatives to know the rule — say 'quartered lengthwise, always' out loud.",
      ],
      cutDiagram: "quarter-lengthwise",
      media: [],
    },
    {
      band: "12-24m",
      form: "Tomato in any soft form at family meals, with every cherry and grape tomato still quartered lengthwise — a rule that holds until at least age four.",
      passFailTest:
        "The same tray scan: no whole or halved small tomatoes anywhere, even for a confident eater with a full set of first molars.",
      whyThisForm:
        "Chewing keeps maturing, but a whole cherry tomato can slip backward and lodge before a single chew lands — the shape stays dangerous long after most texture rules relax.",
      prepSteps: [
        "Serve tomato in sauces, on pasta, in eggs, and as fresh quartered pieces.",
        "Keep a 'quarter it first' habit for every small round fruit — grapes and cherries follow the same rule.",
      ],
      commonMistakes: [
        "Relaxing the quartering rule because the toddler 'eats everything now' — this is the one rule to keep past toddlerhood.",
      ],
      cutDiagram: "quarter-lengthwise",
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["egg", "pasta", "cheese", "avocado"],
  tips: [
    "If tomato acid keeps leaving a red ring around the mouth, dab a thin layer of plain barrier balm on the chin before the meal and wipe gently (don't scrub) afterward — and remember the rash is irritation, not allergy.",
    "Ripeness test: a ready tomato smells like tomato at the stem end and dents under a fingertip — underripe ones are both firmer and more acidic.",
    "Off-season, roasted or canned no-salt-added tomatoes fold beautifully into eggs, beans, and pasta with softer texture than raw winter tomatoes.",
    "Batch the quartering: quarter a whole punnet of cherry tomatoes at once and store them cut in the fridge, so the safe shape is the convenient one.",
  ],
  sources: [SOURCES.wicGuide, SOURCES.cdcChokingHazards, SOURCES.aapChoking],
  nutrients: ["vitaminC"],
  servingGuidance: [
    {
      band: "6-8m",
      typicalAmount:
        "One soft ripe piece about two fingers in size, served one at a time — early on, squeezing and tasting count as success.",
    },
    {
      band: "9-12m",
      typicalAmount:
        "A small handful of soft pieces and lengthwise-quartered strips, put down a few at a time.",
    },
    {
      band: "12-24m",
      typicalAmount:
        "A few quartered cherry tomatoes or a small handful of soft pieces at family meals — appetite sets the amount.",
    },
  ],
  watchOuts: [
    "Tomato acid can leave a harmless red ring of contact rash around the mouth — barrier balm before, a gentle water wipe after.",
  ],
  emoji: "🍅",
};

export default tomato;
