import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const pumpkin: Food = {
  slug: "pumpkin",
  name: "Pumpkin",
  aliases: ["sugar pumpkin", "pie pumpkin"],
  category: "vegetable",
  minAgeMonths: 6,
  ironRich: false,
  commonAllergen: null,
  chokingRisk: "low",
  nutritionHighlights: [
    "Loaded with beta-carotene, which the body converts to vitamin A for eyes and immunity",
    "Gentle fiber that supports digestion",
    "Contributes potassium alongside its natural sweetness",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "Roasted pumpkin served as a thick, smooth mash on a preloaded spoon, or as skin-on wedges about two adult fingers long with flesh soft enough to smash.",
      passFailTest:
        "The flesh should mash under a fork with no resisting lumps, and a wedge should squish between two fingers while the roasted skin still holds its shape as a handle.",
      whyThisForm:
        "Sweet, silky pumpkin suits brand-new eaters two ways: spoonable mash for scooping practice, and a skin-backed wedge that gives the palmar grasp something to hold.",
      prepSteps: [
        "Halve a small sugar pumpkin and scoop out the seeds and strings.",
        "Roast cut-side down at 400°F for 35–45 minutes, until a fork slides through effortlessly.",
        "Scoop and mash the flesh smooth, or cut soft wedges leaving the skin on as the grip.",
        "Serve warm — mash on a preloaded spoon, or one wedge at a time.",
      ],
      commonMistakes: [
        "Using carving-pumpkin flesh, which cooks up watery and stringy instead of silky.",
        "Pulling it from the oven while the flesh is merely fork-pierceable but not collapsing.",
        "Grabbing canned pumpkin pie filling instead of plain pumpkin — the filling carries sugar and spice.",
      ],
      cutDiagram: "wedge-handle",
      media: [],
    },
    {
      band: "9-12m",
      form: "Fully roasted pumpkin cut into soft cubes about the size of a pinky fingernail, alongside thick mash stirred into oatmeal or yogurt.",
      passFailTest:
        "Pinch a cube — it should flatten with almost no pressure; pumpkin at this stage should be closer to fudge-soft than firm.",
      whyThisForm:
        "Small soft cubes give the emerging pincer grasp an easy win, and pumpkin's sweetness makes it a reliable vehicle for practicing new textures.",
      prepSteps: [
        "Roast as for 6–8 months, until collapsing-soft.",
        "Remove the skin and cut the flesh into pinky-nail cubes.",
        "Serve cubes a few at a time, or fold mash through oatmeal or plain yogurt.",
      ],
      commonMistakes: [
        "Serving slippery cubes on a bare tray — a dusting of ground oat cereal adds grip.",
      ],
      cutDiagram: "bite-size",
      media: [],
    },
    {
      band: "12-24m",
      form: "Soft roasted pumpkin chunks with family meals, or smooth pumpkin mash stirred through oatmeal, pasta sauce, and soups for self-fed spoon practice.",
      passFailTest:
        "A chunk should yield to gentle finger pressure throughout, and mash should be thick enough to cling to a self-loaded spoon.",
      whyThisForm:
        "Toddlers can chew soft chunks and are learning to drive their own spoon, and thick pumpkin mash is forgiving material for that messy apprenticeship.",
      prepSteps: [
        "Roast chunks until fully soft and serve alongside whatever the family eats.",
        "Stir mash into oatmeal, blended soups, or a cheesy pasta sauce.",
      ],
      commonMistakes: [
        "Only ever serving pumpkin sweet — its savory side in soups and sauces builds broader acceptance.",
      ],
      media: [],
    },
  ],
  firstFoodPick: true,
  flavorPairings: ["oatmeal", "yogurt", "rice", "cheese"],
  tips: [
    "Buy sugar or pie pumpkins for eating — carving pumpkins grow for size, not flavor, and cook up watery.",
    "Roast cut-side down so the flesh steams in its own moisture and turns silky.",
    "Canned 100% pumpkin is a legitimate shortcut — just confirm the label says plain pumpkin, not pie filling.",
    "A spoonful of pumpkin mash stirred into morning oatmeal is one of the easiest daily vegetable wins there is.",
  ],
  sources: [SOURCES.wicGuide, SOURCES.nhsFrom6Months, SOURCES.cdcFoodsAndDrinks],
  nutrients: ["vitaminA", "fiber", "potassium"],
  servingGuidance: [
    {
      band: "6-8m",
      typicalAmount:
        "A few spoonfuls of mash or one soft wedge — follow the baby's lead on how much lands.",
    },
    {
      band: "9-12m",
      typicalAmount:
        "A tablespoon or two of soft cubes, or mash folded through oatmeal or yogurt.",
    },
    {
      band: "12-24m",
      typicalAmount:
        "A small handful of chunks or a couple of spoonfuls stirred into the family meal.",
    },
  ],
  watchOuts: [
    "Plenty of pumpkin most days can tint skin faintly orange (carotenemia) — harmless, and it fades as the menu varies.",
  ],
  emoji: "🎃",
};

export default pumpkin;
