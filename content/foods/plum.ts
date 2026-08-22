import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const plum: Food = {
  slug: "plum",
  name: "Plum",
  aliases: [],
  category: "fruit",
  minAgeMonths: 6,
  ironRich: false,
  commonAllergen: null,
  chokingRisk: "moderate",
  chokingNotes:
    "The hard central pit is the hazard: it is smooth, oval, and close to airway-sized, and firm underripe flesh is too resistant for gums. Mitigate by twisting the pit out of every plum, sweeping the cavity with a finger for fragments, and serving only flesh that dents under a fingertip — steam anything firmer.",
  nutritionHighlights: [
    "Provides vitamin C, which supports the immune system and helps absorb iron from plant foods",
    "Skin-on plums bring gentle fiber that keeps digestion moving",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "A ripe plum half with the pit twisted out and the cavity checked, skin left on as the grip surface, roughly half-palm sized and soft enough to dent under a fingertip.",
      passFailTest:
        "Press the flesh with a fingertip — it should dent like a ripe avocado. If it springs back, steam the halves 5–8 minutes and re-test.",
      whyThisForm:
        "Six-to-eight-month-olds hold food in a whole-fist palmar grasp, and a domed half with its skin on gives a wet fist real traction while the flesh stays gum-mashable.",
      prepSteps: [
        "Wash the plum, cut along the natural seam all the way around, and twist the halves apart.",
        "Pop the pit out and run a fingertip through the cavity to catch any splinter left behind.",
        "If the flesh resists a fingertip, steam the halves 5–8 minutes until they pass the dent test, then cool.",
        "Serve one half at a time, skin side out in the baby's fist.",
      ],
      commonMistakes: [
        "Serving a firm, crunchy plum raw — only truly ripe or steamed flesh mashes against bare gums.",
        "Peeling the half, which throws away the only non-slip surface the baby has.",
        "Skipping the cavity check — clingstone plums often shed pit fragments during the twist.",
      ],
      cutDiagram: "wedge-handle",
      media: [],
    },
    {
      band: "9-12m",
      form: "Ripe or steamed plum chopped into soft skin-on or skin-off pieces about the size of your pinky fingernail, each flattening easily between two fingers.",
      passFailTest:
        "Squeeze a piece between two fingers — it should flatten with gentle pressure. Firm pieces go back in the steamer.",
      whyThisForm:
        "The pincer grasp arrives around 9 months, and small, soft, irregular pieces give the baby safe practice picking food up between thumb and forefinger.",
      prepSteps: [
        "Halve, pit, and check the cavity exactly as before.",
        "Chop the flesh into rough pinky-nail-sized pieces and scatter a few at a time on the tray.",
        "Roll extra-slippery pieces in a pinch of ground oat cereal for grip.",
      ],
      commonMistakes: [
        "Staying on purees only — this window is the easiest time to build chewing skills.",
        "Cutting pieces from around the pit without checking for buried fragments.",
      ],
      cutDiagram: "bite-size",
      media: [],
    },
    {
      band: "12-24m",
      form: "Ripe plum in skin-on wedges or bite-size chunks, always fully pitted, while a whole plum with the pit inside stays off the menu throughout toddlerhood.",
      passFailTest:
        "Bite a wedge yourself — it should give without an audible crunch, and a finger sweep of the pit cavity should come back clean.",
      whyThisForm:
        "Toddlers manage wedge bites with new molars, but the smooth hard pit — and any splinter of it — remains an absolute airway and tooth hazard.",
      prepSteps: [
        "Pit the plum, check the cavity, and cut into wedges or chunks for self-feeding with family meals.",
        "Steam or thinly slice any plum that is still crunchy.",
      ],
      commonMistakes: [
        "Handing over a whole plum because the toddler 'eats around the pit' — one distracted bite is all it takes.",
      ],
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["yogurt", "oatmeal", "pork"],
  tips: [
    "Ripeness test: a ready plum smells sweet at the stem end and gives slightly along the seam under gentle thumb pressure.",
    "Make the pit ritual automatic: twist, pop, then always sweep the cavity with a fingertip before the fruit touches the tray.",
    "Ripen firm plums in a paper bag on the counter for 1–3 days; refrigerate only once they yield.",
    "Very juicy varieties soak the tray — serve skin side down on the flat side so pieces don't skate around.",
  ],
  sources: [SOURCES.wicGuide, SOURCES.nhsFrom6Months, SOURCES.aapStartingSolids],
  nutrients: ["vitaminC", "fiber"],
  servingGuidance: [
    {
      band: "6-8m",
      typicalAmount:
        "One skin-on half at a time — gnawing and sucking the flesh counts as eating even when little visibly disappears.",
    },
    {
      band: "9-12m",
      typicalAmount:
        "A tablespoon or two of soft pieces, scattered a few at a time — refill while the reaching continues.",
    },
    {
      band: "12-24m",
      typicalAmount:
        "Half a plum in wedges or chunks alongside the meal — an offer, not a target.",
    },
  ],
  watchOuts: [
    "Plums are rich in sorbitol, which can loosen stools noticeably — start with small amounts and build up.",
  ],
  emoji: "🟣",
};

export default plum;
