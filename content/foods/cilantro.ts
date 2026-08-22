import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const cilantro: Food = {
  slug: "cilantro",
  name: "Cilantro",
  aliases: ["coriander leaf", "fresh coriander"],
  category: "herb-spice",
  minAgeMonths: 6,
  ironRich: false,
  commonAllergen: null,
  chokingRisk: "low",
  nutritionHighlights: [
    "The real value is flavor variety, not nutrition — a sprinkle of chopped leaves is a taste lesson, not a nutrient source",
    "Like all herbs it is concentrated plant matter contributing at most a trace of fiber",
    "Its citrusy-green note anchors beans, rice, and countless family dishes across many cuisines",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "A few fresh cilantro leaves washed, dried, and chopped as fine as confetti, stirred evenly through a familiar bean puree, mash, or mild yogurt until just flecked green.",
      passFailTest:
        "Taste a spoonful: a fresh citrusy-green note with no intact leaves — nothing papery left that could plaster itself to a small tongue or palate.",
      whyThisForm:
        "Herbs bring flavor variety without the salt and sugar babies must avoid, and a fine mince releases cilantro's brightness while removing the clingy texture of whole soft leaves.",
      prepSteps: [
        "Rinse a small handful, pat dry, and pull the leaves and tender top stems from the thicker stalks.",
        "Chop to a fine confetti — tender stems included, they carry the most flavor.",
        "Stir a modest pinch through mashed black beans, avocado mash, or a vegetable puree.",
      ],
      commonMistakes: [
        "Leaving leaf pieces whole — soft leaves cling to the roof of a small mouth.",
        "Tossing the tender stems, which are actually the most flavorful part, while chopping in the tough lower stalks.",
        "Deciding after one grimace that the baby hates it — most new flavors take many relaxed tries.",
      ],
      media: [],
    },
    {
      band: "9-12m",
      form: "Finely chopped cilantro folded through soft rice, mashed beans, shredded chicken, or a yogurt dip, still minced small enough that no piece reads as a leaf.",
      passFailTest:
        "Stir the dish and look: tiny even green flecks only, and a fingertip rubbed through it picks up flavor but no whole leaf pieces.",
      whyThisForm:
        "With finger foods leading the meals, herbs move into the foods themselves — a baby who meets cilantro in beans and rice now will recognize family cooking later.",
      prepSteps: [
        "Mince cilantro fine and fold it into warm rice, mashed beans, or a yogurt-based dip.",
        "Add it just before serving so it stays bright instead of wilting to slime in hot food.",
      ],
      commonMistakes: [
        "Stirring cilantro into a steaming pot far ahead of the meal — it wilts, darkens, and dulls within minutes.",
      ],
      media: [],
    },
    {
      band: "12-24m",
      form: "Chopped cilantro used family-style over beans, rice bowls, soups, and mashed avocado, with the toddler's unsalted portion scooped out before final adult seasoning.",
      passFailTest:
        "Taste the toddler's portion: herby and fresh but unsalted, with the cilantro still in small flecks rather than long stems or whole sprigs.",
      whyThisForm:
        "The shared family pot is the destination — cilantro-heavy cuisines season generously with herbs, so holding back only the salt keeps the toddler on the same menu as everyone else.",
      prepSteps: [
        "Finish the family beans, soup, or rice bowl with chopped cilantro as usual.",
        "Serve the toddler's portion before salt, lime-salt finishes, or salty toppings go on for the adults.",
      ],
      commonMistakes: [
        "Garnishing the toddler's bowl with long whole sprigs — keep their share to fine flecks a while longer.",
      ],
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["black-beans", "rice", "avocado"],
  tips: [
    "A small share of people carry a gene that makes cilantro taste soapy — if this baby consistently grimaces at cilantro while taking other herbs happily, it may simply taste different to them, and no harm done either way.",
    "Chop and add cilantro at the last moment: heat and time turn it dark and flat, while fresh-cut flecks stay citrusy.",
    "The tender upper stems pack more flavor than the leaves — mince them right in and save only the thick lower stalks for the stock pot.",
    "Revive a tired bunch by trimming the stalks and standing it in a glass of water in the fridge like a bouquet.",
  ],
  sources: [SOURCES.nhsFrom6Months, SOURCES.cdcFoodsAndDrinks, SOURCES.wicGuide],
  nutrients: ["fiber"],
  servingGuidance: [
    {
      band: "6-8m",
      typicalAmount:
        "A pinch of finely minced leaves — a few leaves' worth — stirred through one serving; the exposure is the point.",
    },
    {
      band: "9-12m",
      typicalAmount:
        "A pinch or two folded through the meal's beans, rice, or dip.",
    },
    {
      band: "12-24m",
      typicalAmount:
        "Whatever the family dish carries in the toddler's unsalted portion — a spoonful of herby beans covers it.",
    },
  ],
  watchOuts: [
    "Adult finishing touches that travel with cilantro — salted lime seasoning, salsas, and brothy soups — are often salty; season the toddler's portion out first.",
  ],
  emoji: "🌱",
};

export default cilantro;
