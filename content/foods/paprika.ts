import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const paprika: Food = {
  slug: "paprika",
  name: "Paprika",
  aliases: ["sweet paprika"],
  category: "herb-spice",
  minAgeMonths: 6,
  ironRich: false,
  commonAllergen: null,
  chokingRisk: "low",
  nutritionHighlights: [
    "The real value is flavor variety, not nutrition — a pinch is about taste, not measurable nutrients",
    "As a concentrated dried plant powder it contributes at most a trace of fiber",
    "Sweet paprika's gentle, fruity pepper flavor is one of the easiest first spices for a baby to accept",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "A small pinch of sweet — not hot — paprika stirred evenly through a familiar puree, mash, or porridge until the color is uniform with no streaks or dry pockets.",
      passFailTest:
        "Look and taste: the food should be one even warm-red shade throughout, and your own spoonful should taste gently fruity-peppery with zero chili burn.",
      whyThisForm:
        "Spices exist here to widen the flavor world without salt or sugar, and mild sweet paprika — made from sweet peppers, not chilies — adds color and warmth a young palate can enjoy.",
      prepSteps: [
        "Check the jar says sweet paprika (or just 'paprika') — not hot paprika and not a chili blend.",
        "Stir about 1/8 teaspoon through mashed potato, egg yolk mash, or a vegetable puree until evenly colored.",
        "Taste it yourself first, and repeat the same gentle amount across several meals before increasing.",
      ],
      commonMistakes: [
        "Grabbing hot paprika or a paprika-based chili blend — the word to verify on the label is 'sweet'.",
        "Stirring lazily and leaving a red pocket that lands as one intense bite.",
        "Giving up after one suspicious face — new flavors usually need many easygoing exposures.",
      ],
      media: [],
    },
    {
      band: "9-12m",
      form: "A pinch of sweet paprika dusted thinly over scrambled eggs, soft potato wedges, or mashed beans before cooking, so the powder blooms into the food instead of sitting dry.",
      passFailTest:
        "Rub a piece of the food between two fingers — the color should be baked or stirred in, with no dry red dust that lifts off onto your skin.",
      whyThisForm:
        "Seasoning the finger foods themselves teaches a self-feeding baby that eggs, potatoes, and beans carry interesting flavors, keeping mealtime curiosity high without any salt.",
      prepSteps: [
        "Dust a thin, even layer over potato wedges or stir a pinch into eggs before they hit the pan.",
        "Cook as usual so the paprika toasts gently into the food — it clings, deepens in color, and loses any dustiness.",
        "Salt the adults' portions separately at the table.",
      ],
      commonMistakes: [
        "Shaking paprika over already-cooked food, where it stays a dry powder that can taste raw and dusty.",
      ],
      media: [],
    },
    {
      band: "12-24m",
      form: "Sweet paprika cooked into the family pot — goulash-style stews, roast chicken, potatoes — with the toddler's portion, mashed or chopped as needed, scooped out before any salt is added.",
      passFailTest:
        "Taste the toddler's scooped-out serving: full paprika warmth, no chili heat, and no salt. If it tastes like the adults' finished dish, it came out of the pot too late.",
      whyThisForm:
        "One shared pot is the goal by toddlerhood: paprika carries enormous flavor on its own, so holding back only the salt lets the child eat exactly what the family eats.",
      prepSteps: [
        "Cook paprika into the stew, traybake, or eggs as the recipe directs.",
        "Portion the toddler's serving before salting and before any hot-pepper finish for the adults.",
      ],
      commonMistakes: [
        "Letting a smoky-hot paprika sneak in for the whole pot — keep the heat as a table-side addition for adults.",
      ],
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["egg", "potato", "chicken"],
  tips: [
    "The jar matters: 'sweet paprika' is mild ground sweet pepper, 'hot paprika' carries real chili heat, and smoked versions range widely — sweet is the baby's lane.",
    "Paprika burns fast in a dry hot pan and turns bitter — add it to moist food or oil over gentle heat.",
    "A pinch stirred into scrambled eggs or mashed potato is the lowest-effort flavor exposure in this whole guide.",
    "Paprika's red pigment stains bibs and sleeves; it also fades from plastic containers with a sunny windowsill day.",
  ],
  sources: [SOURCES.nhsFrom6Months, SOURCES.cdcFoodsAndDrinks, SOURCES.wicGuide],
  nutrients: ["fiber"],
  servingGuidance: [
    {
      band: "6-8m",
      typicalAmount:
        "A small pinch — about 1/8 teaspoon — stirred through one serving; the exposure is the goal, not the amount.",
    },
    {
      band: "9-12m",
      typicalAmount:
        "A pinch or two across the meal's finger foods, repeated over many meals.",
    },
    {
      band: "12-24m",
      typicalAmount:
        "Whatever a normally seasoned, unsalted family portion carries — no pinch-counting required.",
    },
  ],
  watchOuts: [
    "Verify 'sweet' on the label — hot paprika and paprika-forward chili blends bring real heat a baby can't opt out of.",
    "Adult spice blends built on paprika (BBQ rubs, seasoned salts) usually lead with salt — skip them for the baby's portion.",
  ],
  emoji: "🌶️",
};

export default paprika;
