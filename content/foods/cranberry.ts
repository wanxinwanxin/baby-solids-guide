import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const cranberry: Food = {
  slug: "cranberry",
  name: "Cranberry (cooked)",
  aliases: ["cranberry sauce"],
  category: "fruit",
  minAgeMonths: 6,
  ironRich: false,
  commonAllergen: null,
  chokingRisk: "moderate",
  chokingNotes:
    "A raw cranberry is hard, round, and close to airway-sized — one of the worst shapes a food can have — and it stays firm even when it looks harmless bobbing in a bowl. Mitigate by always cooking cranberries until every berry has burst and softened, then mashing them into other foods; raw whole cranberries stay off the tray entirely, and chewy dried cranberries wait for confident chewing and are chopped even then.",
  nutritionHighlights: [
    "Provides vitamin C and a solid dose of fiber once cooked into a sauce",
    "Its natural tartness is a genuinely different flavor note in a menu that skews sweet — useful palate training",
    "A no-sugar-added homemade sauce delivers the flavor without the sugar load of the canned version",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "Fresh or frozen cranberries simmered in a splash of water until every single berry pops open, then mashed smooth and stirred into oatmeal, applesauce, or a vegetable mash.",
      passFailTest:
        "Stir the pot and look: no intact berries anywhere, and a spoonful pressed against the pot wall should mash flat with no firm lumps. An unpopped berry means a few more minutes of simmering.",
      whyThisForm:
        "Cooking until burst destroys the hard round geometry that makes raw cranberries dangerous, and folding the tart mash into a familiar food softens the sourness to an interesting note instead of a shock.",
      prepSteps: [
        "Rinse fresh or frozen cranberries and discard any shriveled ones.",
        "Simmer with a splash of water for 8–10 minutes until every berry has audibly popped and collapsed.",
        "Mash the sauce smooth against the pot, checking for holdout whole berries.",
        "Stir a spoonful into oatmeal, yogurt, applesauce, or mashed sweet potato — no sugar needed.",
      ],
      commonMistakes: [
        "Pulling the pot off the heat while a few berries are still intact — every berry must burst.",
        "Sweetening the sauce to make it 'palatable' — mixed into a naturally sweet food, it needs no sugar at all.",
        "Letting a raw berry roll off the counter into reach: they bounce, they roll, and they are exactly the wrong shape.",
      ],
      cutDiagram: "mash",
      media: [],
    },
    {
      band: "9-12m",
      form: "Cooked-and-burst cranberries roughly mashed with a fork so skins are broken and soft, folded through porridge, yogurt, or mashed sweet potato rather than served alone.",
      passFailTest:
        "Drag a fork through the sauce: every skin should be torn and every piece should smear under the tines with no firm, intact berries hiding in the mix.",
      whyThisForm:
        "A rough mash adds texture practice for a baby now managing lumps, while keeping the tartness diluted in a carrier food and the hard-round hazard cooked away.",
      prepSteps: [
        "Cook until fully burst exactly as before, but stop mashing at 'rough' — soft skins and small pieces are the goal.",
        "Fold a spoonful or two through a familiar base food and serve.",
      ],
      commonMistakes: [
        "Serving the tart sauce solo and concluding the baby hates cranberries — carried by oatmeal or sweet potato, the same sauce disappears.",
      ],
      cutDiagram: "mash",
      media: [],
    },
    {
      band: "12-24m",
      form: "Unsweetened cranberry sauce spooned over oatmeal, yogurt, or shredded turkey as a tart topping, with raw whole cranberries still completely off the menu.",
      passFailTest:
        "Same pot check as always: every berry burst, every piece smearable under a fork — plus a label check for added sugar if the sauce isn't homemade.",
      whyThisForm:
        "Toddlers can enjoy cranberry as a bright condiment on family foods, but their airways are still small enough that the raw berry's hard-marble geometry remains off-limits.",
      prepSteps: [
        "Keep a jar of homemade no-sugar sauce in the fridge; it keeps about a week.",
        "Spoon it over porridge, plain yogurt, or holiday turkey the same way the adults use it.",
      ],
      commonMistakes: [
        "Handing over canned cranberry sauce without reading the label — most are essentially fruit-flavored sugar.",
        "Offering dried cranberries as a snack: chewy, sugar-dense, and gummy enough to be their own hazard at this age.",
      ],
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["turkey", "oatmeal", "apple", "sweet-potato"],
  tips: [
    "Cook cranberries with chopped apple or pear and the fruit's own sweetness rounds off the tartness — no added sugar required.",
    "Frozen cranberries work exactly like fresh and are available year-round; simmer straight from frozen.",
    "The pop is your progress bar: when the pot goes quiet and every berry has split, the sauce is baby-ready after a quick mash.",
    "Make one batch at the holidays before the sugared version hits the table — the baby's portion comes out first, then sweeten the rest for adults.",
  ],
  sources: [SOURCES.cdcChokingHazards, SOURCES.aapChoking, SOURCES.cdcFoodsAndDrinks],
  nutrients: ["fiber", "vitaminC"],
  servingGuidance: [
    {
      band: "6-8m",
      typicalAmount:
        "A spoonful of smooth burst-berry mash stirred through a serving of porridge or mash — tart is a feature, not a failure.",
    },
    {
      band: "9-12m",
      typicalAmount:
        "One or two spoonfuls of rough mash folded through a base food at the meal.",
    },
    {
      band: "12-24m",
      typicalAmount:
        "A dollop of no-sugar sauce as a topping wherever the family uses it — the toddler decides how much gets eaten.",
    },
  ],
  watchOuts: [
    "Store-bought cranberry sauce and juice are heavily sweetened — homemade no-sugar sauce is the version this guide means.",
    "Dried cranberries are chewy, sticky, and almost always sugar-coated — not a baby snack.",
  ],
  emoji: "🍒",
};

export default cranberry;
