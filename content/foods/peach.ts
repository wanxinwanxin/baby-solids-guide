import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const peach: Food = {
  slug: "peach",
  name: "Peach",
  aliases: ["nectarine"],
  category: "fruit",
  minAgeMonths: 6,
  ironRich: false,
  commonAllergen: null,
  chokingRisk: "low",
  nutritionHighlights: [
    "Provides vitamin C to support the immune system and help absorb iron from plant foods",
    "A source of beta-carotene, which the body converts to vitamin A",
    "Gentle fiber that supports digestion",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "A ripe peach wedge about the length and width of two adult fingers, pit removed, skin left on as the grip surface, soft enough to smash between thumb and finger.",
      passFailTest:
        "Press the flesh with a fingertip — it should dent like ripe avocado. A wedge that springs back needs 5–8 minutes in the steamer first.",
      whyThisForm:
        "Six-to-eight-month-olds hold food in a whole-fist palmar grasp, and the fuzzy skin acts as natural traction so the slippery wedge doesn't shoot out of a wet fist.",
      prepSteps: [
        "Wash the peach, halve it along the crease, and twist to remove the pit completely.",
        "Cut each half into wedges roughly two adult fingers in size, skin on.",
        "If the peach is firm, steam the wedges 5–8 minutes until they pass the fingertip-dent test, then cool.",
        "Serve one wedge at a time, skin side in the baby's fist.",
      ],
      commonMistakes: [
        "Serving a firm, crunchy peach raw — only truly ripe or steamed flesh is gum-mashable.",
        "Peeling the wedge, which removes the only non-slip surface the baby has.",
        "Missing a pit fragment after a messy twist — run a finger through the cavity to check.",
      ],
      cutDiagram: "wedge-handle",
      media: [],
    },
    {
      band: "9-12m",
      form: "Ripe or steamed peach chopped into soft pieces about the size of your pinky fingernail, skin on or off, each piece flattening easily between two fingers.",
      passFailTest:
        "Squeeze a piece between two fingers — it should flatten with gentle pressure. Firm pieces go back in the steamer.",
      whyThisForm:
        "The pincer grasp arrives around 9 months, and small, soft, irregular pieces give the baby something to practice on that is safe to swallow after minimal gumming.",
      prepSteps: [
        "Pit and chop a ripe peach into rough pinky-nail-sized pieces.",
        "Scatter a few pieces on the tray at a time to prevent cheek-stuffing.",
        "Roll extra-slippery pieces in a pinch of ground oat cereal for grip.",
      ],
      commonMistakes: [
        "Sticking with purees all the way to 12 months — this window is the easiest time to build chewing skills.",
        "Serving pieces straight from the fridge in mid-winter when a cold-sensitive baby refuses them — room temperature is an easy fix.",
      ],
      cutDiagram: "bite-size",
      media: [],
    },
    {
      band: "12-24m",
      form: "Ripe peach in wedges or bite-size chunks with skin on, always fully pitted, while rock-hard peaches still get steamed or sliced paper-thin.",
      passFailTest:
        "Bite a piece yourself: it should give without an audible crunch. Crunchy means steam it or slice it thinner.",
      whyThisForm:
        "Toddlers manage larger soft pieces and bites from a wedge, but the hard pit — and any fragment of it — remains an absolute hazard.",
      prepSteps: [
        "Pit the peach and cut into wedges or chunks for self-feeding alongside family meals.",
        "Double-check the pit cavity for splinters before serving, especially with clingstone varieties.",
      ],
      commonMistakes: [
        "Handing a toddler a whole peach with the pit still in — pits crack teeth and block airways.",
      ],
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["yogurt", "oatmeal", "chicken", "raspberry"],
  tips: [
    "Ripeness test: smell the stem end — a ripe peach is fragrant there and gives slightly under gentle thumb pressure.",
    "Ripen firm peaches in a paper bag on the counter for 1–3 days; refrigerate only after they're ripe.",
    "Out of season, frozen peach slices steamed or thawed until squishable work exactly as well as fresh.",
    "A cold (not frozen) steamed peach wedge doubles as gum relief for a teething baby.",
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
        "Half a peach in wedges or chunks alongside the meal — an offer, not a target.",
    },
  ],
  emoji: "🍑",
};

export default peach;
