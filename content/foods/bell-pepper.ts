import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const bellPepper: Food = {
  slug: "bell-pepper",
  name: "Bell pepper",
  aliases: ["sweet pepper", "capsicum"],
  category: "vegetable",
  minAgeMonths: 6,
  ironRich: false,
  commonAllergen: null,
  chokingRisk: "moderate",
  chokingNotes:
    "Raw bell pepper is too firm for early eaters to chew down, and the glossy skin can slip free as a slick sheet that's hard to control in the mouth. Mitigate by serving only roasted, fully softened pepper with the skin removed until about 12 months, and introducing raw pepper only as thin matchstick strips after that.",
  nutritionHighlights: [
    "Exceptionally rich in vitamin C, which also helps the body absorb plant iron eaten at the same meal",
    "Red and orange peppers provide beta-carotene for vitamin A",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "Bell pepper roasted until fully collapsed and soft, the skin slipped off, and the flesh cut into strips about the length of an adult finger and half as wide.",
      passFailTest:
        "A strip should tear apart with a light pull of two fingers and show no glossy skin on either side — if skin remains, peel more.",
      whyThisForm:
        "A fist-grasping baby needs a graspable strip soft enough to mash on gums; roasting collapses the firm raw flesh, and removing the skin eliminates the slick sheet that could slip loose.",
      prepSteps: [
        "Halve and seed a pepper, then roast cut-side down at 425°F for 25–30 minutes until the skin blisters and the flesh collapses.",
        "Cover the hot halves in a bowl for 10 minutes — the trapped steam loosens the skin so it slips off in sheets.",
        "Peel completely, then cut the soft flesh into finger-length strips.",
      ],
      commonMistakes: [
        "Leaving patches of skin on — the skin is the slip hazard, not the flesh.",
        "Serving raw pepper 'because it's soft for a vegetable' — raw is far too firm at this age.",
      ],
      cutDiagram: "strips",
      media: [],
    },
    {
      band: "9-12m",
      form: "Roasted, skinned pepper chopped into soft pieces about the size of your pinky fingernail, each piece squashable flat between two fingers.",
      passFailTest:
        "Pinch a piece: it should flatten easily and feel silky, with no glossy skin fragment attached.",
      whyThisForm:
        "Small, soft, slightly slippery pieces stretch a maturing pincer grasp, and skinned roasted flesh remains the only pepper texture gums can manage.",
      prepSteps: [
        "Roast and peel exactly as for 6–8 months.",
        "Chop the flesh into pinky-nail pieces.",
        "Scatter a few at a time, or fold into scrambled egg or beans.",
      ],
      commonMistakes: [
        "Sneaking in raw pieces early — firmness, not size, is still the problem before roughly a year.",
      ],
      cutDiagram: "bite-size",
      media: [],
    },
    {
      band: "12-24m",
      form: "Roasted strips continue as the everyday form, with raw pepper introduced only as thin matchstick strips no wider than a drinking straw from around twelve months.",
      passFailTest:
        "A raw matchstick should bend visibly before it snaps; if a strip breaks with a hard crack, cut it thinner.",
      whyThisForm:
        "New molars can start crunching thin raw pieces, but wide raw slabs still break into firm chunks that immature grinding can't reliably manage.",
      prepSteps: [
        "Cut raw pepper into matchsticks the width of a drinking straw.",
        "Keep serving roasted strips and pieces in family dishes alongside the raw practice.",
      ],
      commonMistakes: [
        "Jumping straight to wide raw rings or dip-tray slabs — thin matchsticks first, wider cuts much later.",
      ],
      cutDiagram: "strips",
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["egg", "chicken", "black-beans", "tomato"],
  tips: [
    "Color is a ripeness scale: green peppers are unripe and bitter, while red, orange, and yellow are sweeter — start with red for a friendlier first taste.",
    "The bowl-steam trick makes peeling effortless: cover roasted halves for 10 minutes and the skin slides off in whole sheets.",
    "Roast several peppers at once; peeled strips keep 4–5 days in the fridge in a little olive oil, ready to chop.",
    "Green pepper's bitter edge can take 8–15 exposures to accept — keep offering without pressure, or simply lean on the sweeter colors meanwhile.",
  ],
  sources: [SOURCES.wicGuide, SOURCES.nhsFrom6Months, SOURCES.cdcChokingHazards],
  nutrients: ["vitaminC", "vitaminA", "fiber"],
  servingGuidance: [
    {
      band: "6-8m",
      typicalAmount:
        "One or two roasted, skinned strips — an exploration portion; plenty may get squeezed rather than eaten, and that counts.",
    },
    {
      band: "9-12m",
      typicalAmount:
        "A tablespoon of soft skinned pieces, scattered a few at a time — the baby decides the refills.",
    },
    {
      band: "12-24m",
      typicalAmount:
        "A few roasted strips or a small pile of thin raw matchstick strips beside the meal — let interest lead.",
    },
  ],
  emoji: "🫑",
};

export default bellPepper;
