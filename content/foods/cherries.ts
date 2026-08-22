import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const cherries: Food = {
  slug: "cherries",
  name: "Cherries",
  aliases: ["sweet cherry"],
  category: "fruit",
  minAgeMonths: 6,
  ironRich: false,
  commonAllergen: null,
  chokingRisk: "high",
  chokingNotes:
    "Cherries carry two hazards at once: a hard, smooth pit that is exactly airway-sized, and round, firm flesh the same shape as a grape. Mitigate by pitting every single cherry by hand-check, then quartering (or at minimum halving for older, confident chewers) so nothing round or hard ever reaches the tray.",
  nutritionHighlights: [
    "A source of vitamin C and gentle fiber",
    "Contains anthocyanins, the antioxidant pigments behind the deep red color",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "Fully pitted ripe sweet cherries quartered lengthwise and lightly flattened between your fingers, or finely chopped and stirred into oatmeal or plain yogurt.",
      passFailTest:
        "Squeeze every piece between two fingers before serving — you are feeling for softness and confirming by touch that no pit or pit fragment survived the pitter.",
      whyThisForm:
        "A six-month-old mashes food with gums and cannot manage anything round or hard, so pitting removes the deadly core and quartering-plus-flattening removes the round geometry.",
      prepSteps: [
        "Wash and stem the cherries, then pit each one with a cherry pitter, a sturdy straw pushed through, or a paring knife.",
        "Feel inside every cherry with a fingertip — pitters miss whole pits and leave fragments more often than you'd think.",
        "Quarter lengthwise, flatten each piece lightly, or chop fine and stir into a familiar food.",
      ],
      commonMistakes: [
        "Trusting the pitter without the finger check — one missed pit is a smooth, hard, airway-sized object.",
        "Halving instead of quartering at this age — a half cherry still presents a rounded dome.",
        "Alarm at deep red drool and stains — cherry pigment looks dramatic but is harmless.",
      ],
      cutDiagram: "quarter-lengthwise",
      media: [],
    },
    {
      band: "9-12m",
      form: "Pitted, hand-checked cherries quartered lengthwise into slim wedges, served a few at a time as pincer-grasp practice pieces.",
      passFailTest:
        "Rotate a piece in your fingers: nothing should look round in any orientation, and every piece should yield to a two-finger squeeze.",
      whyThisForm:
        "Quartered cherry wedges are ideal pincer targets at 9 months, while the pit-and-round-flesh double hazard means the kitchen prep cannot relax yet.",
      prepSteps: [
        "Pit, finger-check, and quarter lengthwise exactly as before.",
        "Scatter three or four quarters at a time to keep pace with the baby's chewing.",
      ],
      commonMistakes: [
        "Buying pre-pitted frozen cherries and skipping the check — even commercial pitting lines miss fragments, so thaw and feel each one.",
      ],
      cutDiagram: "quarter-lengthwise",
      media: [],
    },
    {
      band: "12-24m",
      form: "Pitted cherries quartered as the default, with halves acceptable late in this window for a reliably strong chewer — whole cherries with pits remain completely off-limits.",
      passFailTest:
        "For any half you serve, press it flat-side down under a finger — it should squash rather than hold a dome. If it resists, quarter it.",
      whyThisForm:
        "Molars are arriving but grinding is inconsistent, and a whole cherry hides a pit surprise no toddler can be trusted to spit out — geometry and pitting stay the safety layers.",
      prepSteps: [
        "Continue to pit, finger-check, and cut every cherry before it reaches the table.",
        "Keep bowls of whole cherries out of toddler reach — self-service is where pit accidents happen.",
      ],
      commonMistakes: [
        "Letting a toddler eat from the family cherry bowl 'and spit the pit' — pit-spitting is a skill for well past this age.",
      ],
      cutDiagram: "quarter-lengthwise",
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["yogurt", "oatmeal", "pork"],
  tips: [
    "No pitter? Push a sturdy reusable straw or a piping tip through the stem end over a bottle neck — the pit pops into the bottle and the cherry stays intact for clean quartering.",
    "Frozen pitted dark sweet cherries are a year-round shortcut: thaw, finger-check for fragments, quarter, and serve — thawed cherries are even softer than fresh.",
    "Cherry juice stains like nothing else; a long-sleeved bib and a tray away from the wall save the kitchen.",
    "Batch-prep a pound at once and refrigerate the quarters in a covered container for 2–3 days of easy servings.",
  ],
  sources: [SOURCES.cdcChokingHazards, SOURCES.aapChoking, SOURCES.nhsFrom6Months],
};

export default cherries;
