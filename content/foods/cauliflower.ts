import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const cauliflower: Food = {
  slug: "cauliflower",
  name: "Cauliflower",
  aliases: [],
  category: "vegetable",
  minAgeMonths: 6,
  ironRich: false,
  commonAllergen: null,
  chokingRisk: "low",
  nutritionHighlights: [
    "A good source of vitamin C for iron absorption and immune function",
    "Provides choline, a nutrient involved in brain development",
    "Gentle fiber that supports digestion",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "A whole cauliflower floret steamed ten to twelve minutes until the head smashes easily between thumb and finger, served stem-down so the adult-finger-length stem becomes a built-in handle.",
      passFailTest:
        "The squish test on both ends: the head should smash under gentle finger pressure and a fork should slide through the stem with no resistance.",
      whyThisForm:
        "A fist-grasping baby holds the firm-ish stem like a lollipop stick and gnaws the soft head — the floret's own shape does the work of a handle-plus-food design.",
      prepSteps: [
        "Cut florets so each keeps a stem about the length of an adult finger.",
        "Steam 10–12 minutes until the head is squish-test soft and the stem is fork-tender.",
        "Serve one floret at a time, stem toward the baby's hand.",
      ],
      commonMistakes: [
        "Trimming the stem off — that stem is the handle that makes this cut work.",
        "Undercooking so the head still crumbles into firm little nubs.",
      ],
      cutDiagram: "wedge-handle",
      media: [],
    },
    {
      band: "9-12m",
      form: "Steamed-soft cauliflower broken into rough pieces about the size of your pinky fingernail, the crumbly floret texture giving easy traction for a new pincer grasp.",
      passFailTest:
        "Press a piece between two fingers — it should mash flat with gentle pressure and leave no hard core of stem behind.",
      whyThisForm:
        "Pincer-stage babies love cauliflower's nubbly surface: unlike slick cubes, the little branches give small fingers something to grip.",
      prepSteps: [
        "Steam florets fully soft as for 6–8 months.",
        "Break or chop into pinky-nail pieces, discarding any firm stem cores.",
        "Scatter a few pieces at a time on the tray.",
      ],
      commonMistakes: [
        "Leaving thick stem chunks in the mix — stems need noticeably longer cooking than heads.",
      ],
      cutDiagram: "bite-size",
      media: [],
    },
    {
      band: "12-24m",
      form: "Soft roasted or steamed florets in bite-size chunks, mashed into potatoes, or stirred through a cheese sauce at family meals.",
      passFailTest:
        "Chunks should still yield to firm finger pressure; browned roasted edges are fine as long as the inside mashes.",
      whyThisForm:
        "Toddlers with molars manage soft chunks and mixed dishes, and roasting's nutty caramelized edge makes cauliflower an easier sell than plain steamed.",
      prepSteps: [
        "Roast florets tossed in olive oil at 425°F for 20–25 minutes until browned and fully soft inside.",
        "Serve as chunks, or fold into mash, pasta, or cheese sauce.",
      ],
      commonMistakes: [
        "Serving raw florets from the crudité plate — raw cauliflower stays hard work for immature chewing.",
      ],
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["cheese", "olive-oil", "chickpeas", "potato"],
  tips: [
    "Roasting tames cauliflower's sulfurous edge into something sweet and nutty — try it if steamed florets keep getting rejected.",
    "Bitter-leaning brassicas like this one can take 8–15 exposures to land — keep offering small portions without pressure and let repetition win.",
    "Steam a whole head at once and freeze cooked florets flat; they rewarm in minutes and mash even softer after freezing.",
    "A squeeze of lemon or a little grated cheese on top rounds off the bitterness without hiding the vegetable.",
  ],
  sources: [SOURCES.wicGuide, SOURCES.nhsFrom6Months, SOURCES.cdcFoodsAndDrinks],
  nutrients: ["vitaminC", "fiber"],
  servingGuidance: [
    {
      band: "6-8m",
      typicalAmount:
        "One or two stem-handled florets — squeezing and gnawing count; swallowed pieces start tiny and that's expected.",
    },
    {
      band: "9-12m",
      typicalAmount:
        "A tablespoon or two of crumbly pieces, a few at a time on the tray — the baby paces the refills.",
    },
    {
      band: "12-24m",
      typicalAmount:
        "A small handful of roasted florets or a tablespoon folded into mash — offer without pressure; repetition does the persuading.",
    },
  ],
  watchOuts: [
    "Like its brassica cousins, cauliflower can bring a gassy day while the gut adjusts — start small and build up.",
  ],
  emoji: "💮",
};

export default cauliflower;
