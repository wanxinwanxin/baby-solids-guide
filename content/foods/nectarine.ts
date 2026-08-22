import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const nectarine: Food = {
  slug: "nectarine",
  name: "Nectarine",
  aliases: [],
  category: "fruit",
  minAgeMonths: 6,
  ironRich: false,
  commonAllergen: null,
  chokingRisk: "moderate",
  chokingNotes:
    "Like its fuzzy twin the peach, the nectarine hides a hard, ridged pit that can splinter, and firm underripe flesh breaks into crunchy lumps gums cannot manage. Mitigate by pitting completely and sweeping the cavity, serving only fingertip-soft or steamed flesh — and remember the smooth skin is slipperier than peach fuzz, so grip prep matters more here.",
  nutritionHighlights: [
    "Provides vitamin C to support immunity and boost iron absorption from plant foods",
    "A source of beta-carotene, which the body converts to vitamin A",
    "Skin-on flesh adds gentle fiber for digestion",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "A ripe nectarine wedge about the length and width of two adult fingers, pit removed, smooth skin left on, patted dry for grip and soft enough to smash between thumb and finger.",
      passFailTest:
        "Press the flesh with a fingertip — it should dent like ripe avocado. A wedge that springs back needs 5–8 minutes in the steamer first.",
      whyThisForm:
        "Babies this age use a whole-fist palmar grasp, and because nectarine skin lacks peach fuzz, a dry skin-on wedge is the difference between a graspable handle and a bar of soap.",
      prepSteps: [
        "Wash the nectarine, halve it along the crease, and twist to remove the pit completely.",
        "Cut each half into wedges roughly two adult fingers in size, skin on, and pat them dry.",
        "Steam firm wedges 5–8 minutes until they pass the fingertip-dent test, then cool.",
        "Serve one wedge at a time, skin side in the baby's fist.",
      ],
      commonMistakes: [
        "Serving a crunchy underripe nectarine raw — only ripe or steamed flesh is gum-mashable.",
        "Peeling the wedge, which removes the only traction the slick fruit offers.",
        "Missing a pit splinter after a messy twist — sweep the cavity with a fingertip.",
      ],
      cutDiagram: "wedge-handle",
      media: [],
    },
    {
      band: "9-12m",
      form: "Ripe or steamed nectarine chopped into soft pieces about the size of your pinky fingernail, skin on or off, each flattening easily between two fingers.",
      passFailTest:
        "Squeeze a piece between two fingers — it should flatten with gentle pressure. Firm pieces go back in the steamer.",
      whyThisForm:
        "The pincer grasp arrives around 9 months, and small, soft, irregular pieces give the baby safe chewing practice piece by piece.",
      prepSteps: [
        "Pit and chop a ripe nectarine into rough pinky-nail-sized pieces.",
        "Scatter a few pieces on the tray at a time to prevent cheek-stuffing.",
        "Roll extra-slippery pieces in a pinch of ground oat cereal for grip.",
      ],
      commonMistakes: [
        "Staying on purees all the way to 12 months — this window is when chewing skills come easiest.",
        "Serving glassy-slick pieces with nothing for traction, then blaming the baby's interest.",
      ],
      cutDiagram: "bite-size",
      media: [],
    },
    {
      band: "12-24m",
      form: "Ripe nectarine in skin-on wedges or bite-size chunks, always fully pitted, while rock-hard fruit still gets steamed or sliced paper-thin.",
      passFailTest:
        "Bite a piece yourself — it should give without an audible crunch. Crunchy means steam it or slice it thinner.",
      whyThisForm:
        "Toddlers manage bites from a wedge with new molars, but the hard ridged pit — and any fragment of it — remains an absolute hazard.",
      prepSteps: [
        "Pit the nectarine and cut into wedges or chunks for self-feeding alongside family meals.",
        "Double-check the cavity for splinters before serving, especially with clingstone varieties.",
      ],
      commonMistakes: [
        "Handing a toddler a whole nectarine with the pit still in — pits crack teeth and block airways.",
      ],
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["yogurt", "oatmeal", "raspberry"],
  tips: [
    "Ripeness test: smell the stem end — a ripe nectarine is fragrant there and gives slightly under gentle thumb pressure.",
    "Everything you do for a peach applies here; the one difference is the slick skin, so pat wedges dry before serving.",
    "Ripen firm nectarines in a paper bag on the counter for 1–3 days; refrigerate only after they are ripe.",
    "Out of season, frozen peach slices steamed until squishable are an honest stand-in — the two fruits are interchangeable in every recipe.",
  ],
  sources: [SOURCES.wicGuide, SOURCES.nhsFrom6Months, SOURCES.aapStartingSolids],
  nutrients: ["vitaminC", "vitaminA", "fiber"],
  servingGuidance: [
    {
      band: "6-8m",
      typicalAmount:
        "One skin-on wedge at a time — a piece or two per meal; squeezing and sucking are legitimate eating at this age.",
    },
    {
      band: "9-12m",
      typicalAmount:
        "A small handful of soft pieces — refill while the reaching continues.",
    },
    {
      band: "12-24m",
      typicalAmount:
        "Half a nectarine in wedges or chunks alongside the meal — an offer, not a target.",
    },
  ],
  watchOuts: [
    "Like other stone fruit, nectarines carry sorbitol that can loosen stools — start small and build up.",
  ],
  emoji: "🍑",
};

export default nectarine;
