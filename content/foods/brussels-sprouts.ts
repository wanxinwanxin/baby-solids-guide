import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const brusselsSprouts: Food = {
  slug: "brussels-sprouts",
  name: "Brussels sprouts",
  aliases: ["sprouts"],
  category: "vegetable",
  minAgeMonths: 6,
  ironRich: false,
  commonAllergen: null,
  chokingRisk: "moderate",
  chokingNotes:
    "A whole Brussels sprout is a firm, round, airway-sized plug — exactly the geometry to avoid. Mitigate by always halving or quartering lengthwise before serving and cooking until the core is fully squish-soft; never serve one whole at any age in this guide.",
  nutritionHighlights: [
    "Packed with vitamin C, which also helps plant iron absorb from foods alongside",
    "A good source of folate for rapid cell growth",
    "Fiber that keeps digestion moving",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "Large Brussels sprouts steamed until the core smashes between two fingers, then quartered lengthwise into wedge-shaped pieces — never served whole and never cut into rounds.",
      passFailTest:
        "Squish the core end of the biggest wedge between thumb and forefinger — it should flatten with gentle pressure; the loose outer leaves always pass first and the core last.",
      whyThisForm:
        "Quartering destroys the dangerous ball shape while leaving wedges big enough for a palmar grasp, and full-soft cooking lets bare gums mash the dense core.",
      prepSteps: [
        "Trim the stem end and any ragged outer leaves, then halve each sprout lengthwise.",
        "Steam 10–14 minutes, until the core of the biggest half passes the squish test.",
        "Cut each half lengthwise again into quarters.",
        "Serve one or two warm wedges at a time.",
      ],
      commonMistakes: [
        "Serving a sprout whole because it looks conveniently bite-size — that is precisely the hazard.",
        "Testing the loose leaves instead of the core, which softens minutes later.",
        "Roasting to crispy-brown while the centers are still firm.",
      ],
      cutDiagram: "quarter-lengthwise",
      media: [],
    },
    {
      band: "9-12m",
      form: "Squish-soft Brussels sprouts chopped into pieces about the size of a pinky fingernail, mixing tender core bits with the soft loose leaves.",
      passFailTest:
        "Pinch a core piece between two fingers — it should flatten easily; the leafy shreds are always soft, so the core pieces are the ones to test.",
      whyThisForm:
        "Small irregular pieces suit the emerging pincer grasp, and chopping keeps the round-plug geometry permanently off the tray.",
      prepSteps: [
        "Steam until the cores pass the squish test, as for 6–8 months.",
        "Chop the quarters into pinky-nail pieces.",
        "Scatter a few pieces at a time, alone or stirred into pasta or mash.",
      ],
      commonMistakes: [
        "Serving halves 'to save cutting' — a half from a small sprout is still nearly a ball.",
      ],
      cutDiagram: "bite-size",
      media: [],
    },
    {
      band: "12-24m",
      form: "Fully tender steamed-then-roasted sprouts served as quarters or soft bite-size chunks, still never whole, alongside whatever the family is eating.",
      passFailTest:
        "Press the core of the largest quarter between two fingers — it should give without a fight, and roasted edges should be tender, not crisp-chewy.",
      whyThisForm:
        "Molars manage soft quarters well, but a whole sprout stays a round plug regardless of age, so the always-cut rule holds through toddlerhood.",
      prepSteps: [
        "Steam until soft, then roast quarters briefly with olive oil for sweetness.",
        "Serve with a squeeze of lemon or a little grated cheese to soften the bitter edge.",
      ],
      commonMistakes: [
        "Letting a whole sprout roll off the serving dish onto a toddler's plate — keep the cutting board rule absolute.",
      ],
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["olive-oil", "cheese", "apple", "potato"],
  tips: [
    "Buy the biggest sprouts in the bin — they're easier to quarter, easier to grip, and less bitter than tiny ones.",
    "Steam first, roast second: the steam guarantees a soft core, the roast adds the caramelized sweetness that wins babies over.",
    "The bitter edge is normal to refuse early on — it can take 8–15 relaxed exposures, so keep offering small amounts without pressure.",
    "Pair with apple or cheese in the same meal; sweetness and fat both take the edge off brassica bitterness.",
  ],
  sources: [SOURCES.nhsFrom6Months, SOURCES.wicGuide, SOURCES.cdcChokingHazards],
  nutrients: ["vitaminC", "folate", "fiber"],
  servingGuidance: [
    {
      band: "6-8m",
      typicalAmount:
        "One or two soft quartered wedges — gnawing and squeezing count as progress at this stage.",
    },
    {
      band: "9-12m",
      typicalAmount:
        "A tablespoon of chopped pieces, scattered a few at a time — refill while the reaching continues.",
    },
    {
      band: "12-24m",
      typicalAmount:
        "A small handful of soft quarters beside the family meal — offer without pressure and let appetite lead.",
    },
  ],
  watchOuts: [
    "Brussels sprouts are famous gas-makers — expect extra wind at first; it settles as the gut adjusts to brassicas.",
  ],
  emoji: "🥦",
};

export default brusselsSprouts;
