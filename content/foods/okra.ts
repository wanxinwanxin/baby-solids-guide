import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const okra: Food = {
  slug: "okra",
  name: "Okra",
  aliases: ["lady's fingers", "bhindi"],
  category: "vegetable",
  minAgeMonths: 6,
  ironRich: false,
  commonAllergen: null,
  chokingRisk: "low",
  nutritionHighlights: [
    "Rich in soluble fiber — the famous slipperiness is the fiber itself",
    "Provides folate for rapid cell growth",
    "A source of vitamin C",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "Whole large okra pods stewed or roasted until fully tender, stem caps trimmed off, each pod about the length of two adult fingers for a fist grip.",
      passFailTest:
        "Pinch the fat middle of a pod between thumb and forefinger — it should flatten easily, and the tip should bend rather than snap.",
      whyThisForm:
        "A whole soft pod is a natural palmar-grasp shape — the baby fists it and gnaws the end — and keeping it uncut also keeps the slippery juices mostly inside.",
      prepSteps: [
        "Pick the biggest pods in the pile and trim the stem cap without opening the seed chamber.",
        "Roast at 425°F for 15–20 minutes, or stew in tomato sauce until fully tender.",
        "Squish-test the fattest pod before serving.",
        "Serve one or two warm pods at a time.",
      ],
      commonMistakes: [
        "Undercooking to avoid slime — a squeaky, firm pod is harder to gum and no less slippery inside.",
        "Choosing tiny pods that disappear entirely inside a fist.",
        "Fighting the texture with heavy breading or frying instead of simply cooking it soft.",
      ],
      cutDiagram: "batons",
      media: [],
    },
    {
      band: "9-12m",
      form: "Stewed-soft okra sliced crosswise into thin pieces no bigger than a pinky nail, stirred through rice or a tomato-based stew for grip.",
      passFailTest:
        "Pinch a slice — it should squash flat immediately; the little seeds inside are soft and fine to serve.",
      whyThisForm:
        "Small soft pieces suit the pincer grasp, and serving them inside rice or stew turns the slippery juices into a sauce instead of a handling problem.",
      prepSteps: [
        "Stew or roast until fully tender, as for 6–8 months.",
        "Slice crosswise into thin, pinky-nail pieces.",
        "Fold through rice, lentils, or a tomato stew before serving.",
      ],
      commonMistakes: [
        "Serving bare slippery pieces on a smooth tray, where they skid away from little fingers.",
      ],
      cutDiagram: "bite-size",
      media: [],
    },
    {
      band: "12-24m",
      form: "Tender stewed or roasted okra in bite-size pieces with rice and family stews, or whole soft pods for confident self-feeders to bite from.",
      passFailTest:
        "A piece should squash between two fingers, and a sampled pod should chew tender with no squeaky resistance.",
      whyThisForm:
        "Toddlers manage okra's soft seeds and juicy interior easily, and gumbo-style stews and okra-rice dishes make it a recurring family food rather than a one-off.",
      prepSteps: [
        "Keep cooking pods fully tender in stews, curries, or a hot oven.",
        "Serve pieces over rice, or hand a whole soft pod to bite from.",
      ],
      commonMistakes: [
        "Only serving okra deep-fried and crisp — the coating adds salt and the crunch hides an undercooked pod.",
      ],
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["tomato", "rice", "chicken"],
  tips: [
    "The slippery mucilage is just soluble fiber — it looks odd but is harmless, and it even helps food slide down easily.",
    "High-heat roasting or a tomato-based stew both tame the slime if the texture bothers the adults at the table.",
    "Whole pods stay far less slimy than cut ones — a bonus for the youngest band, where whole is the right shape anyway.",
    "Frozen okra is picked young and works beautifully in stews — no prep beyond a trim.",
  ],
  sources: [SOURCES.wicGuide, SOURCES.nhsFrom6Months, SOURCES.cdcFoodsAndDrinks],
  nutrients: ["fiber", "folate", "vitaminC"],
  servingGuidance: [
    {
      band: "6-8m",
      typicalAmount:
        "One or two soft whole pods — each piece gets gnawed and explored at the baby's own pace.",
    },
    {
      band: "9-12m",
      typicalAmount:
        "A tablespoon of soft slices folded through rice or stew.",
    },
    {
      band: "12-24m",
      typicalAmount:
        "A couple of spoonfuls over rice, or a soft whole pod alongside the family meal.",
    },
  ],
  watchOuts: [],
  emoji: "🌿",
};

export default okra;
