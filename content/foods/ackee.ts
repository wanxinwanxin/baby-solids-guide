import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const ackee: Food = {
  slug: "ackee",
  name: "Ackee",
  aliases: ["ackee fruit", "canned ackee", "achee"],
  category: "fruit",
  minAgeMonths: 6,
  ironRich: false,
  commonAllergen: null,
  chokingRisk: "low",
  nutritionHighlights: [
    "Unusually rich in healthy fats for a fruit — its soft, buttery arils eat more like scrambled egg than like apple",
    "A good source of fiber and potassium",
    "The heart of Jamaica's national dish, ackee and saltfish — a first taste of home cooking for many families",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "Canned ackee arils, drained and rinsed well, warmed through and mashed with a fork into a soft, scrambled-egg-like mound that holds together on a spoon with no brine pooling around it.",
      passFailTest:
        "Press a mashed spoonful between two fingers: it should smear like soft scrambled egg with zero resistance. Taste it yourself — it should taste mild and buttery, not salty, after rinsing.",
      whyThisForm:
        "Ackee's cooked arils are naturally one of the softest foods there is, so mashing is less about texture safety and more about washing off the canning brine and serving it plain for a first eater.",
      prepSteps: [
        "Use CANNED ackee only — drain the brine and rinse the arils gently in a sieve under cold water.",
        "Warm the arils in a dry pan or steamer for a few minutes — they are already cooked in the can.",
        "Mash lightly with a fork and serve plain, or folded into a familiar vegetable mash.",
        "Skip the saltfish for now — it is far too salty for a baby this age.",
      ],
      commonMistakes: [
        "Serving the brine along with the arils — canned ackee is packed in salted water, and the rinse is what makes it baby-appropriate.",
        "Cooking fresh ackee from an unopened pod — unripe ackee is genuinely poisonous, not merely less tasty.",
        "Stirring in seasoned saltfish at this age — the sodium load is the problem, not the fish.",
      ],
      cutDiagram: "mash",
      media: [],
    },
    {
      band: "9-12m",
      form: "Rinsed, warmed canned ackee arils broken into soft bite-size pieces — each about the size of a chickpea — served alone or gently folded with soft scrambled egg or flaked, well-rinsed cod.",
      passFailTest:
        "Every piece should squash flat between your thumb and finger with no effort, and a piece resting on your tongue should start falling apart on its own.",
      whyThisForm:
        "A baby with a developing pincer grasp can pick up soft aril pieces herself, and the custardy texture keeps self-feeding safe while the flavors of the family dish start to appear.",
      prepSteps: [
        "Drain, rinse, and warm the canned arils as before.",
        "Break them into chickpea-size pieces rather than cutting — they separate naturally along their lobes.",
        "Fold with soft scrambled egg, or with plain flaked cod that you soaked and rinsed to pull the salt out.",
      ],
      commonMistakes: [
        "Adding the scotch-bonnet-seasoned family portion — keep the baby's serving mild and low-salt.",
      ],
      cutDiagram: "mash",
      media: [],
    },
    {
      band: "12-24m",
      form: "A toddler-size portion of family ackee and saltfish — a few spoonfuls over rice — made with well-desalted fish and soft sautéed tomato, onion, and bell pepper, every ackee lobe still a bite-size piece that squashes easily.",
      passFailTest:
        "Taste the toddler's portion: it should taste noticeably milder and less salty than the adult pot, and every ackee piece should still squash between two fingers.",
      whyThisForm:
        "By now the point is joining the family meal — the same plate, in a softer, low-salt corner of it. Desalting the fish hard (long soak, two water changes) is what makes the dish toddler-ready.",
      prepSteps: [
        "Soak the saltfish overnight with at least two water changes, then boil and flake it — the toddler's portion comes from this well-rinsed fish.",
        "Sauté tomato, onion, and bell pepper until fully soft, fold in the flaked fish and rinsed ackee, and set aside the toddler's spoonfuls before final seasoning.",
        "Serve a small scoop over soft rice and let her handle her own spoon.",
      ],
      commonMistakes: [
        "Judging saltiness by the adult palate — if it tastes right to you, it is usually still too salty for a toddler.",
      ],
      cutDiagram: "mash",
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["egg", "tomato", "onion", "bell-pepper", "cod", "rice"],
  watchOuts: [
    "Unripe ackee is poisonous: it contains hypoglycin A, which causes severe vomiting and dangerously low blood sugar (Jamaican vomiting sickness). Only arils from pods that opened fully on their own are safe, and the seeds and rind are never edible.",
    "Outside the Caribbean, serve canned ackee only — the FDA restricts imports to approved brands tested for hypoglycin A. Never cook a fresh, closed pod for anyone, least of all a baby.",
    "Canned ackee comes in salty brine and the classic partner is salted cod — drain, rinse, and desalt thoroughly before any of it reaches a baby's plate.",
  ],
  tips: [
    "Think of ackee as a savory ingredient with the texture of soft scrambled egg — it slots into breakfasts the way egg does.",
    "Buy cans from major Jamaican brands sold through normal grocers; those are the FDA-cleared, tested ones.",
    "The arils separate into soft lobes on their own — you rarely need a knife at all.",
    "Ackee is fragile: fold it in at the end of cooking so it stays in soft pieces instead of dissolving.",
  ],
  sources: [SOURCES.fdaAckee, SOURCES.cdcFoodsAndDrinks, SOURCES.aapStartingSolids],
  nutrients: ["healthyFats", "fiber", "potassium"],
  servingGuidance: [
    {
      band: "6-8m",
      typicalAmount:
        "A spoonful or two of rinsed, mashed arils — a taste-size introduction alongside familiar foods.",
    },
    {
      band: "9-12m",
      typicalAmount: "A small handful of chickpea-size soft pieces, self-fed or on a preloaded spoon.",
    },
    {
      band: "12-24m",
      typicalAmount:
        "A few spoonfuls of the low-salt family dish over a small scoop of rice.",
    },
  ],
  emoji: "🍈",
};

export default ackee;
