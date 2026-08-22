import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const mungBeans: Food = {
  slug: "mung-beans",
  name: "Mung beans",
  aliases: ["moong dal", "green gram"],
  category: "legume",
  minAgeMonths: 6,
  ironRich: true,
  commonAllergen: null,
  chokingRisk: "low",
  nutritionHighlights: [
    "Plant iron, protein, and folate in one of the fastest-cooking legumes",
    "Traditionally a first weaning food across South and East Asia for its gentle digestibility",
    "Split hulled mung (yellow moong dal) cooks into a naturally smooth, skin-free mash",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "Split hulled mung beans (yellow moong dal) simmered until they dissolve into a thick, smooth, spoonable mash about the consistency of oatmeal, with no intact halves left.",
      passFailTest:
        "Rub a spoonful between your fingers: silky-soft with no gritty bits, and the mash should mound on a lifted spoon instead of running off.",
      whyThisForm:
        "Hulled split mung has no skins to break down, so it cooks into one of the smoothest, gentlest legume mashes there is — ideal for a gum-only eater and clingy enough for preloaded spoons and fists.",
      prepSteps: [
        "Rinse ½ cup of yellow moong dal and simmer in about 2 cups of unsalted water for 20–25 minutes until fully collapsed.",
        "Stir briskly at the end to finish the collapse, then adjust with warm water to an oatmeal-like thickness.",
        "Serve warm on a preloaded spoon or spread a layer on the tray.",
      ],
      commonMistakes: [
        "Using whole green mung with skins for this age and fighting a texture the baby can't manage — buy the split yellow kind.",
        "Cooking it soup-thin: a khichdi-style thickness is the target, not broth.",
        "Salting the pot before the baby's portion is out.",
      ],
      cutDiagram: "mash",
      media: [],
    },
    {
      band: "9-12m",
      form: "Soft mung dal cooked down with rice into a thick, clumping khichdi the baby can rake up by hand or work with a preloaded spoon.",
      passFailTest:
        "Pinch up a bite: it should clump together in your fingers for a moment, and any whole mung beans in the mix should squash instantly under a fingertip.",
      whyThisForm:
        "A soft rice-and-dal clump self-adheres for raking and early pincer practice, adding real texture progression while every component stays gum-soft.",
      prepSteps: [
        "Simmer dal and rice together (about one part dal to one part rice) until both are fully soft and the mixture clumps.",
        "Stir in a half-teaspoon of unsalted butter or ghee for richness.",
        "Let it cool a few minutes — khichdi clumps better once it's not piping hot.",
      ],
      commonMistakes: [
        "Serving it fresh-off-the-stove loose and watery instead of letting it set into scoopable clumps.",
        "Staying on the smooth 6–8 month mash long after clumps became manageable.",
      ],
      media: [],
    },
    {
      band: "12-24m",
      form: "Whole soft-cooked mung beans served loose in dal, soups, and rice bowls, every bean squashing between two fingers with no firm center.",
      passFailTest:
        "Press a few whole beans from the pot between two fingers — each should flatten completely; springy beans keep simmering.",
      whyThisForm:
        "Mung beans are small and cook very soft, so once molars and a mature pincer grasp arrive, the whole beans are among the easiest legumes to serve loose.",
      prepSteps: [
        "Cook whole green mung until fully soft (35–40 minutes) and fold into family dal, soup, or rice.",
        "Portion the toddler's serving before the salt and chili go into the family pot.",
      ],
      commonMistakes: [
        "Serving raw mung sprouts — raw sprouts are a food-poisoning risk for young children; mung comes to the tray cooked.",
      ],
      media: [],
    },
  ],
  firstFoodPick: true,
  flavorPairings: ["rice", "carrot", "spinach", "butternut-squash"],
  tips: [
    "Buy the split yellow kind (moong dal) for babies — no skins, 20-minute cook time, and the smoothest result of any bean.",
    "Khichdi is the one-pot cheat code: dal and rice in one pot make a complete, thick, spoonable meal with no blender.",
    "Flavor with turmeric, cumin, or a bay leaf rather than salt; a spoonful of ghee or butter rounds out the bitterness.",
    "The mash freezes and thaws without changing texture — ice-cube portions rewarm in under a minute.",
  ],
  sources: [SOURCES.wicGuide, SOURCES.whoComplementary, SOURCES.nhsFrom6Months],
  nutrients: ["iron", "protein", "fiber", "folate"],
  servingGuidance: [
    {
      band: "6-8m",
      typicalAmount:
        "One to two tablespoons of smooth thick dal on a preloaded spoon — refill while the interest lasts.",
    },
    {
      band: "9-12m",
      typicalAmount:
        "Two to three tablespoons of clumping khichdi dropped on the tray — the baby sets the tempo.",
    },
    {
      band: "12-24m",
      typicalAmount:
        "A half cup or so of dal or khichdi with the family meal — some days it vanishes, some days it doesn't.",
    },
  ],
  watchOuts: [
    "Raw mung bean sprouts carry a real food-poisoning risk for babies and toddlers — mung is always served cooked at this age.",
    "As with any bean, ramp portions up gradually to give a new gut time to adjust.",
  ],
  emoji: "🫘",
};

export default mungBeans;
