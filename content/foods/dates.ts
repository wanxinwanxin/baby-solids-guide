import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const dates: Food = {
  slug: "dates",
  name: "Dates",
  aliases: ["medjool date", "date paste"],
  category: "fruit",
  minAgeMonths: 9,
  ironRich: false,
  commonAllergen: null,
  chokingRisk: "high",
  chokingNotes:
    "Dates are dense, sticky sugar-bombs: a chunk compresses in the mouth like caramel and can mold itself into an airway-shaped plug, and the hard oval pit is a hazard in its own right. Mitigate by splitting and pit-checking every date — including ones sold as pitted — and serving only as paper-thin slivers or as paste blended into other foods, in tiny amounts.",
  nutritionHighlights: [
    "Genuinely high in fiber for such a small package",
    "Provides potassium along with its natural sugars",
    "Best understood as a whole-fruit sweetener — flavor and stickiness of caramel, so tiny amounts go far",
  ],
  prepSpecs: [
    {
      band: "9-12m",
      form: "A pitted, pit-checked date blended into a smooth paste and stirred completely through oatmeal or yogurt, or sliced into paper-thin slivers that smear rather than bounce when pressed.",
      passFailTest:
        "Press a sliver between two fingers — it should smear like soft caramel, not spring back. Anything with chew-resistance gets re-sliced thinner or blended into paste.",
      whyThisForm:
        "A 9-month-old's pincer grasp can pick up a date chunk and swallow it barely chewed — and dense sticky chunks plug airways — so thin geometry and full dispersal through other food are the only safe formats.",
      prepSteps: [
        "Split every date fully open with your fingers and check for the pit and its hard cap ends, even from a 'pitted' package.",
        "Soak firm dates in warm water for 10 minutes until pliable.",
        "Blend with a splash of warm water into a smooth paste and stir a small spoonful through oatmeal or yogurt, or slice into paper-thin slivers.",
        "Serve the paste-laced food by the spoonful, or press slivers flat onto the tray a couple at a time.",
      ],
      commonMistakes: [
        "Trusting the 'pitted' label — stray pits and cap fragments turn up regularly, so split and check every single date.",
        "Serving halves or chunks because the date is soft — soft and sticky is exactly what makes it moldable into a plug.",
        "Sweetening every meal with date paste — it is still concentrated sugar, whatever the wrapper says.",
      ],
      cutDiagram: "thin-spread",
      media: [],
    },
    {
      band: "12-24m",
      form: "Still pit-checked and paper-thin — slivers pressed flat into porridge or bread, or paste spread thinly, never a whole or halved date at any point in toddlerhood.",
      passFailTest:
        "The smear test still rules: a sliver pressed between two fingers should flatten and smear; anything that holds a chewy chunk shape gets cut again.",
      whyThisForm:
        "Molars do not fix stickiness — a toddler-sized bite of date can still compress into a dense wad that clings to the airway, and pits still crack teeth.",
      prepSteps: [
        "Keep splitting and pit-checking every date, then slice paper-thin or blend to paste.",
        "Fold slivers into oatmeal, yogurt, or a smear of nut butter on bread rather than serving them loose in a pile.",
      ],
      commonMistakes: [
        "Handing over a whole 'soft' medjool date as a treat — this stays off the menu throughout the toddler years.",
        "Letting date-sweetened snack bars stand in for meals — the stickiness and sugar remain, just rebranded.",
      ],
      cutDiagram: "thin-spread",
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["oatmeal", "yogurt", "banana", "peanut-butter"],
  tips: [
    "Make the pit ritual non-negotiable: split every date fully open and run a thumb down the middle — pits and hard cap ends hide even in pitted packs.",
    "Blend a batch of paste at once (dates plus a splash of warm water) and keep it in the fridge for a week of oatmeal stir-ins.",
    "A sharp knife dipped in hot water slices sticky dates into clean paper-thin slivers instead of ragged clumps.",
    "Treat date paste as your sugar substitute in baking and porridge — a teaspoon does the work of much more sugar in flavor.",
  ],
  sources: [SOURCES.cdcChokingHazards, SOURCES.aapChoking, SOURCES.wicGuide],
  nutrients: ["fiber", "potassium"],
  servingGuidance: [
    {
      band: "9-12m",
      typicalAmount:
        "A teaspoon of date paste stirred through a meal, or two or three paper-thin slivers — a flavoring, not a portion.",
    },
    {
      band: "12-24m",
      typicalAmount:
        "Up to one date's worth per day as paste or slivers folded into other foods — still a spoonful-scale food.",
    },
  ],
  watchOuts: [
    "Dates are among the most sugar-dense whole foods there are — keep them a tiny stir-in so sweet-first eating doesn't become the habit.",
    "The sticky sugar clings to emerging teeth — offer water after, and brush as usual.",
  ],
  emoji: "🌴",
};

export default dates;
