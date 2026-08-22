import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const mint: Food = {
  slug: "mint",
  name: "Mint",
  aliases: ["fresh mint", "spearmint"],
  category: "herb-spice",
  minAgeMonths: 6,
  ironRich: false,
  commonAllergen: null,
  chokingRisk: "low",
  nutritionHighlights: [
    "The real value is flavor variety, not nutrition — a few chopped leaves are a palate lesson, not a nutrient source",
    "Like all herbs it is concentrated plant matter contributing at most a trace of fiber",
    "Its cool, bright note shows a baby that 'fresh' is a flavor too, not just sweet and savory",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "A few fresh mint leaves washed, dried, and chopped as fine as you can manage, stirred through plain yogurt or a fruit mash until evenly flecked with green.",
      passFailTest:
        "Taste a spoonful: a cool, gentle mint note with no intact leaf pieces — nothing papery that could cling to a small tongue or the roof of the mouth.",
      whyThisForm:
        "Fresh herbs deliver flavor variety without salt or sugar, and mincing mint to near-dust lets its brightness through while eliminating the clingy, papery texture of whole leaves.",
      prepSteps: [
        "Rinse a small sprig, pat it dry, and strip the leaves off the tough stem.",
        "Stack, roll, and chop the leaves to a fine confetti — then chop again for good measure.",
        "Stir a modest pinch of the minced leaf through yogurt, mashed banana, or a fruit puree.",
      ],
      commonMistakes: [
        "Leaving leaf pieces large — a whole soft leaf can plaster itself to the roof of a small mouth.",
        "Including the stems, which are stringy and bitter compared to the leaves.",
        "Starting with a strong peppermint variety when milder spearmint is the friendlier first mint.",
      ],
      media: [],
    },
    {
      band: "9-12m",
      form: "Finely chopped mint stirred through yogurt dips, mashed peas, or soft fruit pieces, still cut small enough that no piece reads as a whole leaf.",
      passFailTest:
        "Drag a spoon through the dish: only tiny green flecks, no intact leaves — and your own taste finds mint as a note, never a menthol punch.",
      whyThisForm:
        "A self-feeding baby now eats dips and dressed fruit, so herbs move onto the finger-food menu itself — building the habit that fresh green flavors belong in everyday food.",
      prepSteps: [
        "Mince mint fine and fold it into a yogurt dip for vegetable sticks or into mashed peas.",
        "Toss soft fruit pieces like melon or peach with a pinch of minced mint just before serving.",
      ],
      commonMistakes: [
        "Adding mint long before serving — it blackens and turns bitter as it sits; chop and add last-minute.",
      ],
      media: [],
    },
    {
      band: "12-24m",
      form: "Chopped mint used family-style — through yogurt sauces, grain salads, or mashed peas — with the toddler's unsalted portion taken out before finishing the adults' dish.",
      passFailTest:
        "Taste the toddler's portion: fresh and minty but unsalted, and any mint pieces should still be small flecks rather than whole leaves.",
      whyThisForm:
        "Toddlers eating shared meals can meet mint everywhere the family uses it; keeping the chop fine and the salt back is all the adaptation the dish needs.",
      prepSteps: [
        "Stir chopped mint into the family yogurt sauce, couscous, or pea mash as usual.",
        "Portion the toddler's serving before salt, brined feta, or dressing joins the adults' version.",
      ],
      commonMistakes: [
        "Serving adult mint salads dressed with salty feta or brined ingredients without portioning the toddler's share first.",
      ],
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["yogurt", "peas", "watermelon"],
  tips: [
    "Chop mint at the last minute — cut leaves blacken and go bitter within the hour, and fresh-cut flecks taste far brighter.",
    "Spearmint (the common garden and grocery mint) is gentler than peppermint, which can read as sharp menthol to a baby.",
    "Mint and peas is a classic for a reason: a pinch of minced mint makes mashed peas taste like a restaurant made them.",
    "A pot of mint on the windowsill outproduces any grocery bunch — snip two leaves at a time and it keeps giving.",
  ],
  sources: [SOURCES.nhsFrom6Months, SOURCES.cdcFoodsAndDrinks, SOURCES.wicGuide],
  nutrients: ["fiber"],
  servingGuidance: [
    {
      band: "6-8m",
      typicalAmount:
        "A pinch of finely minced leaves — one or two leaves' worth — stirred through a single serving.",
    },
    {
      band: "9-12m",
      typicalAmount:
        "A pinch or two folded through dips and fruit at the meal; frequency beats quantity.",
    },
    {
      band: "12-24m",
      typicalAmount:
        "Whatever the family dish carries in the toddler's unsalted portion — a spoonful of minted yogurt sauce is plenty.",
    },
  ],
  watchOuts: [
    "Mint tea, mint sweets, and menthol products are not the same thing as culinary mint leaves — the fresh herb in food is the only form this entry covers.",
  ],
  emoji: "🍃",
};

export default mint;
