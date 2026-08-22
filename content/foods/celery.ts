import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const celery: Food = {
  slug: "celery",
  name: "Celery",
  aliases: ["celery stalks"],
  category: "vegetable",
  minAgeMonths: 9,
  ironRich: false,
  commonAllergen: null,
  chokingRisk: "high",
  chokingNotes:
    "Celery carries two hazards: long, tough strings that can trail into the throat, and the hard, crisp geometry of the raw stalk. Mitigate by peeling the strings off with a vegetable peeler, cooking until fully soft, and always slicing thin across the grain so every string is cut short; raw celery sticks wait until around age 4.",
  nutritionHighlights: [
    "Mostly water with a little gentle fiber — a hydrating vegetable that adds crunch training later on",
    "Contributes a modest amount of potassium",
  ],
  prepSpecs: [
    {
      band: "9-12m",
      form: "Celery stalks peeled of their strings, simmered until fully soft, then sliced crosswise into thin pieces no thicker than a pinky nail so every remaining fiber is cut short.",
      passFailTest:
        "Pinch a piece — it should flatten without any crunch, and pulling it apart should reveal no long string trailing out.",
      whyThisForm:
        "Pincer-stage babies handle small pieces well, but only the crosswise cut defeats celery's long fibers, and only real cooking defeats its hardness.",
      prepSteps: [
        "Run a vegetable peeler along the ribbed back of each stalk to strip the strings in one pass.",
        "Simmer or steam 10–15 minutes, until a stalk bends limply and pinches soft.",
        "Slice crosswise — never lengthwise — into thin, pinky-nail pieces.",
        "Stir into soup, rice, or mashed potato rather than serving a slippery pile alone.",
      ],
      commonMistakes: [
        "Chopping lengthwise into little sticks, which preserves full-length strings instead of cutting them.",
        "Handing over a raw stalk 'just to gnaw' — pieces snap off exactly when teething pressure is hardest.",
        "Skipping the peel because the celery will be cooked — strings survive cooking.",
      ],
      cutDiagram: "bite-size",
      media: [],
    },
    {
      band: "12-24m",
      form: "String-peeled, soft-cooked celery in small, thin crosswise pieces, or diced fine and melted into soups and stews, while raw sticks stay off the menu until around age four.",
      passFailTest:
        "A piece should squash between two fingers with no crunch, and a spoonful of the finished dish should pull apart with no strings bridging the gap.",
      whyThisForm:
        "New molars still can't grind crisp raw celery to a safe swallow, so it keeps arriving cooked, cut across the grain, and mostly as a flavor base inside other dishes.",
      prepSteps: [
        "Keep peeling the strings and cooking until fully soft.",
        "Dice fine and simmer into soups, stews, and rice dishes as an aromatic base.",
      ],
      commonMistakes: [
        "Graduating to raw celery sticks because molars have arrived — grinding raw celery reliably takes years more practice.",
      ],
      cutDiagram: "bite-size",
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["chicken", "potato", "lentils", "rice"],
  tips: [
    "A Y-peeler down the curved back of the stalk lifts every string in a single stroke — thirty seconds that changes the whole texture.",
    "Simmer celery directly in the soup or stew it will be served in, so its flavor stays in the meal instead of the cooking water.",
    "Diced fine with onion and carrot, celery becomes the classic aromatic base — an easy way to serve it many times without it ever being the star.",
    "The tender inner leaves are string-free and full of flavor — chop them into the pot along with the stalks.",
  ],
  sources: [SOURCES.aapChoking, SOURCES.cdcChokingHazards, SOURCES.nhsFrom6Months],
  nutrients: ["fiber", "potassium"],
  servingGuidance: [
    {
      band: "9-12m",
      typicalAmount:
        "A spoonful or two of thin, soft-cooked pieces stirred through rice, soup, or mash.",
    },
    {
      band: "12-24m",
      typicalAmount:
        "A couple of tablespoons diced into a stew or soup — celery mostly rides along inside other dishes at this age.",
    },
  ],
  watchOuts: [],
  emoji: "🥬",
};

export default celery;
