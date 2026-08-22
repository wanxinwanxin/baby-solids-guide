import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const yogurt: Food = {
  slug: "yogurt",
  name: "Yogurt",
  aliases: ["plain yogurt", "whole-milk yogurt"],
  category: "dairy",
  minAgeMonths: 6,
  ironRich: false,
  commonAllergen: "milk",
  chokingRisk: "low",
  nutritionHighlights: [
    "Calcium and protein that support growing bones and muscles",
    "Whole-milk fat supplies energy dense enough for tiny stomachs",
    "Contains live cultures, which many babies digest more comfortably than fluid milk",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "Plain, unsweetened whole-milk yogurt served thick and spoonable, offered on a preloaded spoon or stirred into a fruit or vegetable puree the baby already knows.",
      passFailTest:
        "Read the label first — the ingredient list should say milk and live cultures, nothing more — then tilt a loaded spoon: the yogurt should cling rather than dribble straight off.",
      whyThisForm:
        "A thick, clinging texture survives the wobbly journey of a palmar-grasp baby steering a preloaded spoon, and yogurt is one of the gentlest vehicles for the cow's-milk-protein introduction.",
      prepSteps: [
        "Choose plain, unsweetened, whole-milk (full-fat) yogurt — no vanilla, honey, or fruit-on-the-bottom varieties.",
        "Load a small spoon and hand it over, or stir a spoonful into a familiar puree.",
        "First time: serve early in the day, a small amount, and watch for 2 hours.",
        "Serve alongside familiar foods, never another new food, so any reaction can be traced to the milk.",
      ],
      commonMistakes: [
        "Grabbing low-fat or flavored yogurt — babies need the fat, not the added sugar.",
        "Using a honey-sweetened yogurt: honey in any form is off-limits before 12 months.",
        "Confusing yogurt-the-food with milk-the-drink — yogurt is fine now, but cow's milk shouldn't replace breast milk or formula as a drink before 12 months.",
      ],
      media: [],
    },
    {
      band: "9-12m",
      form: "Thick plain whole-milk yogurt the baby self-feeds with a preloaded spoon or scoops by hand, also used as a dip for soft finger-food strips.",
      passFailTest:
        "Stand a spoon upright in the cup for a second — a thick (Greek-style or strained) yogurt holds it briefly; a watery one that lets it clatter over will end up everywhere but the mouth.",
      whyThisForm:
        "Babies this age are practicing utensils and dipping; a thick yogurt rewards those attempts by actually staying on the spoon and on the dipped food.",
      prepSteps: [
        "Offer a small cup of thick plain yogurt with a short-handled baby spoon.",
        "Set out soft vegetable sticks or toast strips for dipping.",
        "Stir in a spoonful of mashed fruit for flavor rather than buying pre-sweetened cups.",
      ],
      commonMistakes: [
        "Switching to squeezable yogurt pouches as the default — they skip spoon practice and are often sweetened.",
        "Taking the bowl away at the first mess; messy self-feeding is the skill being built.",
      ],
      media: [],
    },
    {
      band: "12-24m",
      form: "Plain whole-milk yogurt with soft, pinky-nail-sized pieces of fruit stirred in, served with a toddler spoon at meals and snacks in place of sweetened varieties.",
      passFailTest:
        "Check the mix-ins the same way as any finger food: every fruit piece should squash between two fingers and be no bigger than a pinky nail.",
      whyThisForm:
        "Toddlers can handle mixed textures — smooth yogurt with soft lumps — which is genuinely useful practice, and plain yogurt keeps daily added sugar out of a habit-forming snack.",
      prepSteps: [
        "Stir soft, pinky-nail-sized fruit pieces (banana, ripe peach, berries quartered) into plain whole-milk yogurt.",
        "Keep whole-milk yogurt the default until age 2 unless your pediatrician advises otherwise.",
      ],
      commonMistakes: [
        "Defaulting to 'toddler' yogurts and drinkable yogurts, which are usually the most sugared products in the dairy aisle.",
      ],
      media: [],
    },
  ],
  firstFoodPick: true,
  flavorPairings: ["banana", "blueberry", "peach", "oatmeal"],
  tips: [
    "Yogurt and cheese are fine as foods from 6 months, but cow's milk must not replace breast milk or formula as a drink before 12 months.",
    "Label shortcut: the ingredient list should read like 'milk, live cultures' — anything longer usually means added sugar.",
    "Too-thin yogurt fix: strain regular plain yogurt through a coffee filter for 20 minutes, or just start with plain Greek-style.",
    "Thick plain yogurt is the house allergen vehicle: a smooth base for stirring in thinned peanut butter or other nut butters later.",
    "Tame the tang gradually by stirring in mashed banana or fruit puree, then step the fruit down as the baby acclimates.",
  ],
  sources: [SOURCES.eatStudy, SOURCES.aapStartingSolids, SOURCES.cdcFoodsAndDrinks],
};

export default yogurt;
