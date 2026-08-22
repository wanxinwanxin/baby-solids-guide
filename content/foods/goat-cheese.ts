import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const goatCheese: Food = {
  slug: "goat-cheese",
  name: "Goat cheese",
  aliases: ["chèvre", "soft goat cheese"],
  category: "dairy",
  minAgeMonths: 6,
  ironRich: false,
  commonAllergen: "milk",
  chokingRisk: "low",
  nutritionHighlights: [
    "Calcium and protein in a naturally spreadable fresh cheese",
    "Its bold tang widens a baby's flavor range beyond mild dairy early on",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "Soft fresh goat cheese (chèvre) spread in a knife-thin layer along a finger-length strip of lightly toasted bread, or whisked until smooth into a familiar vegetable puree.",
      passFailTest:
        "The layer should be thin enough that the toast texture shows through — if the spread is thick enough to hold a fingerprint, scrape some back off.",
      whyThisForm:
        "A toast strip suits the whole-fist palmar grasp, and keeping the tangy, salty cheese to a thin film delivers the milk protein without a claggy mouthful or a big sodium dose.",
      prepSteps: [
        "Choose a soft, spreadable, pasteurized chèvre log or tub — not an aged, crumbly, or rinded goat cheese.",
        "Spread a thin layer on a toast strip about two adult fingers long, or whisk a teaspoon into warm vegetable puree until it vanishes.",
        "First time: serve early in the day, a small amount, and watch for 2 hours.",
        "Serve alongside familiar foods, never another new food, so any reaction can be traced to the milk.",
      ],
      commonMistakes: [
        "Assuming goat cheese sidesteps a cow's-milk allergy — the proteins are close cousins and usually cross-react.",
        "Spreading it thick like cream cheese frosting; a dense paste is harder for a gummy mouth to clear.",
        "Reaching for an aged or marinated goat cheese, which piles on salt and firmness.",
      ],
      cutDiagram: "thin-spread",
      media: [],
    },
    {
      band: "9-12m",
      form: "A thin chèvre spread on toast torn into pinky-nail-sized pieces, or small crumbles mashed into roasted vegetables so no piece stands alone.",
      passFailTest:
        "Pick up a topped toast piece: it should be about pinky-nail-sized and squash easily between two fingers, spread included.",
      whyThisForm:
        "Small topped pieces feed the new pincer grasp, and mashing crumbles into vegetables keeps the strong flavor diluted while the baby's palate catches up.",
      prepSteps: [
        "Spread thin on toast and tear into pinky-nail pieces, or mash a teaspoon of chèvre into warm sweet potato or beets.",
        "Keep the cheese a supporting flavor — roughly one part chèvre to three parts vegetable.",
        "Offer water alongside; salty-tangy foods make babies thirsty.",
      ],
      commonMistakes: [
        "Serving dry crumbles solo — they're intense, and a startled face gets misread as dislike.",
        "Letting portions creep up; chèvre carries more sodium per spoonful than ricotta or yogurt.",
      ],
      media: [],
    },
    {
      band: "12-24m",
      form: "Goat cheese crumbled modestly over family dishes — roasted vegetables, pasta, eggs, or grain bowls — with each crumble soft and no bigger than a pea.",
      passFailTest:
        "Crumbles should smear under a fingertip rather than roll — a pea-sized soft crumble passes, a dry firm nugget doesn't.",
      whyThisForm:
        "Toddlers with molars and a refined pincer grasp handle soft crumbles easily, and small amounts of a big-flavored cheese season family food without much added salt.",
      prepSteps: [
        "Crumble a little fresh chèvre over the toddler's portion of vegetables, pasta, or eggs.",
        "Keep it a garnish rather than a main — a modest amount of the salty cheese goes a long way.",
      ],
      commonMistakes: [
        "Graduating to firm aged goat cheeses because the toddler likes chèvre — the aged ones are far saltier and harder.",
      ],
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["beet", "sweet-potato", "bread", "zucchini"],
  tips: [
    "Goat cheese is fine as a food from around 6 months, but milk as a drink — cow or goat — waits until 12 months.",
    "Ten seconds at room temperature makes chèvre dramatically easier to spread thin; straight from the fridge it drags and clumps.",
    "Whisk chèvre into warm (not hot) puree and it melts to a smooth cream — no lumps to manage.",
    "Pair the tang with something sweet first: beet, sweet potato, or roasted squash softens the introduction.",
  ],
  sources: [SOURCES.aaaaiFoodAllergy, SOURCES.nhsFrom6Months, SOURCES.cdcFoodsAndDrinks],
  nutrients: ["calcium", "protein"],
  servingGuidance: [
    {
      band: "6-8m",
      typicalAmount:
        "A thin smear on one toast strip, or a teaspoon whisked into puree — small on purpose while the milk introduction settles.",
      frequency: "Once tolerated, fine as a regular food in smear-sized amounts.",
    },
    {
      band: "9-12m",
      typicalAmount:
        "A few topped toast pieces or a teaspoon mashed into a vegetable — refill the vegetable, not the cheese.",
    },
    {
      band: "12-24m",
      typicalAmount:
        "A light spoonful of soft crumbles over the family dish — a seasoning-sized portion, not a cheese course.",
    },
  ],
  watchOuts: [
    "Goat's-milk protein cross-reacts with cow's-milk protein — for a baby with cow's-milk allergy, goat cheese is not a safe substitute.",
    "Chèvre is saltier than ricotta or yogurt — thin smears and small crumbles keep the sodium sensible.",
    "Only pasteurized goat cheese belongs on the tray; unpasteurized soft cheeses carry a listeria risk.",
  ],
  emoji: "🐐",
};

export default goatCheese;
