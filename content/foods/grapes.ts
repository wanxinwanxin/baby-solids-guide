import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const grapes: Food = {
  slug: "grapes",
  name: "Grapes",
  aliases: [],
  category: "fruit",
  minAgeMonths: 9,
  ironRich: false,
  commonAllergen: null,
  chokingRisk: "high",
  chokingNotes:
    "Whole grapes are one of the top three foods that kill young children by choking: they are exactly airway-sized, and their smooth wet skin forms a complete seal that back blows struggle to dislodge. Mitigate by quartering every grape lengthwise — stem end to bottom, never crosswise into coins — until at least age 4, with no exceptions for supervision or teeth.",
  nutritionHighlights: [
    "Mostly water and natural sugars — a hydrating fruit best served for variety alongside more nutrient-dense foods",
    "Provides small amounts of vitamin C and vitamin K",
  ],
  prepSpecs: [
    {
      band: "9-12m",
      form: "Every grape washed and quartered lengthwise from stem end to blossom end, producing four long slim strips each narrower than your pinky finger, with nothing round left on the tray.",
      passFailTest:
        "Pick up any piece and turn it: no orientation should look round or coin-like. Each quarter should be a long, flat-sided sliver you could easily flatten between two fingers.",
      whyThisForm:
        "A 9-month-old's pincer grasp handles slim quarters well, and cutting lengthwise is the only geometry that destroys the round cross-section — a crosswise cut just makes two smaller airway-shaped plugs.",
      prepSteps: [
        "Wash the grapes and pull them off the stems.",
        "Hold each grape stem-end up and cut lengthwise in half, then lay each half flat and halve lengthwise again.",
        "Check the pile — any piece that still looks like a coin or dome gets cut again.",
        "Serve a few quarters at a time; discard any with seeds or cut the seeds out.",
      ],
      commonMistakes: [
        "Cutting crosswise into coins — a round slice is still a round plug, which defeats the entire point of cutting.",
        "Halving instead of quartering — a half grape can still present a rounded, airway-sized dome.",
        "Trusting supervision instead of the knife: choking on a whole grape is fast and nearly silent, and no adult reaction time beats correct cutting.",
      ],
      cutDiagram: "quarter-lengthwise",
      media: [],
    },
    {
      band: "12-24m",
      form: "Still every single grape quartered lengthwise into slim strips — a rule that does not relax at this age and should hold until at least age 4.",
      passFailTest:
        "Same sweep of the tray: rotate a piece in your fingers and confirm nothing is round in any orientation before it goes down.",
      whyThisForm:
        "Toddlers eat fast, laugh with full mouths, and run with food, and their airways are still grape-sized — the deaths in choking statistics are overwhelmingly in exactly this age range.",
      prepSteps: [
        "Quarter lengthwise exactly as before, every grape, every time — including at parties, snack trays, and other people's houses.",
        "Brief every caregiver: grandparents and daycare need to hear 'quartered lengthwise until age 4' explicitly.",
      ],
      commonMistakes: [
        "Relaxing the rule because the toddler has molars and 'chews everything' — whole grapes remain a leading choking killer through the preschool years.",
        "Forgetting the identical rule applies to cherry tomatoes and any other grape-shaped food.",
      ],
      cutDiagram: "quarter-lengthwise",
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["cheese", "yogurt", "chicken"],
  tips: [
    "Speed technique: steady each grape stem-end up on the board and make two quick lengthwise cuts in a cross — with a sharp paring knife a whole bunch takes about two minutes.",
    "Quarter a whole bunch at once and store the pieces in an airtight container in the fridge — pre-cut grapes remove the temptation to hand over a whole one in a rush.",
    "Seedless varieties save a step, but still check — 'seedless' bunches occasionally hide a seed worth flicking out.",
    "Make 'nothing round goes on the tray' the house rule and apply it to grapes, cherry tomatoes, and large blueberries alike.",
  ],
  sources: [SOURCES.cdcChokingHazards, SOURCES.aapChoking, SOURCES.nhsFrom6Months],
};

export default grapes;
