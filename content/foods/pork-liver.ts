import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const porkLiver: Food = {
  slug: "pork-liver",
  name: "Pork liver",
  aliases: ["pig liver", "pork liver powder"],
  category: "protein",
  minAgeMonths: 6,
  ironRich: true,
  commonAllergen: null,
  chokingRisk: "low",
  nutritionHighlights: [
    "Among the most iron-dense foods in any kitchen, and it is the well-absorbed heme form",
    "Very high in preformed vitamin A — the reason a serving stays a teaspoon and roughly weekly",
    "Rich in vitamin B12, folate, and copper",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "About one teaspoon of fully cooked pork liver, blended with its cooking liquid into a completely smooth paste the consistency of thick yogurt, stirred into a congee or vegetable puree the baby already knows.",
      passFailTest:
        "Rub a little between two fingers — it should feel velvety with no grit and no fibrous threads, and it should slide off the spoon as one soft mound.",
      whyThisForm:
        "A six-month-old manages spoonable purees best, and pork liver's strong mineral flavor lands more easily inside a familiar food, as a teaspoon-scale taste rather than a full serving.",
      prepSteps: [
        "Soak the liver in cold water for 20–30 minutes, changing the water once or twice, until the water stays almost clear — this is the step that takes out the strong blood taste.",
        "Blanch for one minute in boiling water and discard that water, then simmer in fresh unsalted water with a slice of ginger for 10–12 minutes, until the center is evenly brown with no pink left.",
        "Blend with a few spoonfuls of the cooking liquid until completely smooth, and press the paste through a fine sieve if any grain remains.",
        "Serve about one teaspoon, stirred into congee or a familiar puree, no more than about once a week.",
      ],
      commonMistakes: [
        "Skipping the soak and the blanch: the liver then tastes strongly of blood, and a first taste that strong rarely gets a second chance.",
        "Spreading liver across several days of one week — preformed vitamin A accumulates, so the roughly weekly teaspoon is the ceiling.",
        "Undercooking: pork liver must be cooked through, with no pink at the center, before it goes in the blender.",
      ],
      cutDiagram: "mash",
      media: [],
    },
    {
      band: "9-12m",
      form: "Half a teaspoon of dried pork-liver powder stirred through congee, or a paper-thin smear of liver paste on a soft toast strip the width of one adult finger.",
      passFailTest:
        "The powder should disappear into the congee as you stir, and a smear should be thin enough that you still see the bread through it.",
      whyThisForm:
        "Self-feeding takes over around nine months, so a graspable strip or a bowl of congee the baby digs into keeps liver in the rotation at the same small weekly dose.",
      prepSteps: [
        "For the powder: dry cooked liver slices in a low oven or a dry pan until brittle, grind them fine, and keep the powder in a sealed jar for up to two weeks.",
        "Stir about half a teaspoon through a bowl of congee, or spread the thinnest possible layer of paste on a lightly toasted finger-width strip.",
        "Keep the week to one liver serving, whichever of the two forms you use.",
      ],
      commonMistakes: [
        "Treating the powder as a daily seasoning: it is concentrated liver, and the weekly ceiling counts it.",
        "Buying a ready-made liver powder — most are salted and seasoned for adults, and the baby version is the plain homemade one.",
      ],
      cutDiagram: "thin-spread",
      media: [],
    },
    {
      band: "12-24m",
      form: "A teaspoon or two of soft-cooked pork liver, chopped or blended into meatballs, congee, or a family stir-fry, with no piece bigger than a grain of rice.",
      passFailTest:
        "Any visible piece should flatten into a soft paste under gentle finger pressure, and nothing should feel springy or rubbery.",
      whyThisForm:
        "A toddler chews soft liver without difficulty, so the limit here is nutritional and not mechanical: preformed vitamin A keeps the amount small through the second year.",
      prepSteps: [
        "Blend a teaspoon or two of cooked liver into ground-pork meatballs, a congee, or a vegetable stir-fry the family already eats.",
        "Or stay with the liver powder over congee from the earlier band.",
      ],
      commonMistakes: [
        "Letting liver become an everyday food once the toddler likes it — frequency, not texture, is the constraint.",
        "Stir-frying slices until they are rubbery: liver turns tough within about a minute of overcooking.",
      ],
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["rice", "spinach", "ginger", "sweet-potato"],
  tips: [
    "Soak, blanch, then simmer. Those three steps are what turn pork liver from strong to mild, and they are why homemade tastes nothing like the smell of the butcher counter.",
    "Freeze the blended paste in an ice-cube tray and thaw one cube a week — a cube is about one serving, so the portion keeps itself.",
    "A slice of ginger in the simmering water is the standard Chinese fix for the iron smell, and at that dilution it leaves no ginger taste behind.",
    "Stir a teaspoon into congee with a spoonful of spinach or sweet potato: the vegetable carries the mineral edge for a baby meeting liver for the first time.",
  ],
  sources: [SOURCES.wicGuide, SOURCES.nhsFrom6Months, SOURCES.cdcFoodsAndDrinks],
  nutrients: ["iron", "zinc", "protein", "vitaminA"],
  servingGuidance: [
    {
      band: "6-8m",
      typicalAmount: "About one teaspoon of smooth paste, stirred into congee or a familiar puree.",
      frequency: "No more than about once a week — the vitamin A adds up.",
    },
    {
      band: "9-12m",
      typicalAmount: "Half a teaspoon of liver powder over congee, or a teaspoon of paste smeared thin.",
      frequency: "Roughly once a week at most.",
    },
    {
      band: "12-24m",
      typicalAmount: "A teaspoon or two blended into meatballs, congee, or a stir-fry.",
      frequency: "Still capped at about one small serving a week.",
    },
  ],
  watchOuts: [
    "Preformed vitamin A is stored rather than flushed, so the small weekly serving is a ceiling and not a suggestion — and it counts liver in every form, powder included.",
    "Organ meat spoils faster than muscle meat: buy pork liver fresh from a source you trust, keep it cold, and cook it the same day.",
  ],
  emoji: "🐖",
  cuisineTags: ["chinese"],
};

export default porkLiver;
