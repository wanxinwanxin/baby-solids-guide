import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const dill: Food = {
  slug: "dill",
  name: "Dill",
  aliases: ["fresh dill", "dill weed"],
  category: "herb-spice",
  minAgeMonths: 6,
  ironRich: false,
  commonAllergen: null,
  chokingRisk: "low",
  nutritionHighlights: [
    "The real value is flavor variety, not nutrition — a fresh, grassy-bright herb that seasons without salt or sugar",
    "Like all leafy herbs it adds a trace of plant fiber at the small amounts a baby actually eats",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "A small pinch of finely chopped fresh dill fronds stirred through plain yogurt, potato mash, or a smooth puree until the green flecks are evenly scattered with no long strands.",
      passFailTest:
        "Look for strands, then taste: no frond piece longer than a grain of rice, and a spoonful should carry a mild fresh-grass note, not a mouthful of herb.",
      whyThisForm:
        "Flavor variety without salt or sugar is the point — a baby who meets dill in familiar yogurt or potato learns early that green flecks mean flavor, not something to pick out.",
      prepSteps: [
        "Start with about 1/8 teaspoon of finely chopped fronds — feathery leaves only, no stems — per serving.",
        "Snip with kitchen scissors directly over the bowl, then stir until the flecks are even.",
        "Repeat across several meals before increasing the amount.",
      ],
      commonMistakes: [
        "Leaving long feathery strands that can string across a small tongue — chop to rice-grain size.",
        "Using the tough stems, which are stringy and bitter compared to the fronds.",
      ],
      media: [],
    },
    {
      band: "9-12m",
      form: "Finely chopped dill mixed through yogurt dips, mashed potato, flaked fish, or soft vegetables, still chopped small enough that no long stringy frond remains.",
      passFailTest:
        "Pinch-and-look: run a spoon through the dish and confirm nothing green is longer than a grain of rice, then taste for a pleasant rather than dominant herb note.",
      whyThisForm:
        "As dips and finger foods arrive, dill turns plain yogurt into a sauce for dunking — flavor learning and pincer-grasp practice in the same bowl.",
      prepSteps: [
        "Stir chopped dill into yogurt as a dip for soft vegetable pieces.",
        "Fold it through mashed potato or flaked salmon just before serving.",
      ],
      commonMistakes: [
        "Adding dill early in cooking — heat kills its flavor, so it goes in at the end.",
      ],
      media: [],
    },
    {
      band: "12-24m",
      form: "Dill snipped fine over family dishes — into yogurt sauces, potato dishes, eggs, or fish — still chopped small so no long frond can string or dangle.",
      passFailTest:
        "The shared-dish test: if the dill reads as a fresh accent to you and the pieces are confetti-small, the toddler's portion is ready.",
      whyThisForm:
        "Toddlers eat from the family table now, and herbs sprinkled visibly on shared food teach that green on food is normal — a quiet vaccine against the beige-food years.",
      prepSteps: [
        "Snip dill over the family's fish, potatoes, or yogurt sauce at the table.",
        "Let the toddler watch the sprinkling — imitation is half of flavor acceptance.",
      ],
      commonMistakes: [
        "Hiding all herbs from view so green flecks stay unfamiliar and get picked out later.",
      ],
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["yogurt", "potato", "salmon", "cucumber"],
  tips: [
    "Kitchen scissors beat a knife for dill — snip the fronds straight over the bowl into rice-grain confetti.",
    "Add dill at the end, off the heat; cooking flattens its flavor within minutes.",
    "Freeze leftover chopped dill flat in a zip bag and crumble off what you need — it keeps its flavor far better than a wilting bunch in the fridge.",
    "Dill-yogurt dip is the classic gateway: familiar yogurt, new flavor, and something to dunk soft vegetables into.",
  ],
  sources: [SOURCES.nhsFrom6Months, SOURCES.cdcFoodsAndDrinks, SOURCES.wicGuide],
  nutrients: ["fiber"],
  servingGuidance: [
    {
      band: "6-8m",
      typicalAmount:
        "A small pinch (about 1/8 teaspoon) of chopped fronds stirred into one serving — flavor exposure is the serving.",
    },
    {
      band: "9-12m",
      typicalAmount:
        "A pinch or two through dips and mashes across the day's meals.",
    },
    {
      band: "12-24m",
      typicalAmount:
        "Season family dishes normally — a pinch here and there — and serve the toddler from the shared plate.",
    },
  ],
  emoji: "🌿",
};

export default dill;
