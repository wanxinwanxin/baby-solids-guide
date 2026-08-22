import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const spelt: Food = {
  slug: "spelt",
  name: "Spelt",
  aliases: ["spelt berries", "dinkel"],
  category: "grain",
  minAgeMonths: 6,
  ironRich: false,
  commonAllergen: "wheat",
  chokingRisk: "low",
  nutritionHighlights: [
    "A whole grain with more fiber than products made from refined wheat flour",
    "Delivers wheat protein — an ancient variety of wheat, so it counts toward keeping that allergen in rotation",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "A soft spelt-flour pancake cut into strips about the width of one adult finger and the length of two, tender enough to squash between two fingers.",
      passFailTest:
        "Fold a strip in half: it should bend limply and spring partway back, and a pinch between thumb and forefinger should flatten it — a crisp or rubbery pancake needs a wetter batter.",
      whyThisForm:
        "A palmar-grasping baby holds a strip in a fist and gnaws the end sticking out, and a tender pancake dissolves against bare gums without the wadding risk of fresh bread.",
      prepSteps: [
        "Whisk spelt flour with mashed banana and enough water or milk to make a pourable batter, then cook small pancakes over medium-low until just set and still soft.",
        "Cool and cut into finger-width strips about two finger-lengths long.",
        "First time with wheat: serve early in the day, keep the amount small, and watch for 2 hours.",
        "Never introduce it alongside another new food, so any reaction has one clear cause.",
      ],
      commonMistakes: [
        "Cooking the pancakes until browned and firm — crisp edges are hard on gums.",
        "Assuming spelt is a wheat-free alternative — it isn't; treat it exactly like wheat for allergy purposes.",
      ],
      cutDiagram: "strips",
      media: [],
    },
    {
      band: "9-12m",
      form: "Spelt pancake torn into pieces about the size of your pinky fingernail, or pearled spelt simmered until every single berry squashes flat between two fingers.",
      passFailTest:
        "Press one cooked berry between thumb and forefinger — it must flatten with light pressure; any berry that stays springy sends the whole batch back to the pot.",
      whyThisForm:
        "The emerging pincer grasp turns small pancake pieces and single soft berries into ideal precision targets, but spelt berries are naturally chewy, so full softness is non-negotiable.",
      prepSteps: [
        "Soak pearled spelt for a few hours, then simmer in unsalted water 45–60 minutes until every berry passes the squash test.",
        "Alternatively tear soft pancakes into pinky-nail pieces.",
        "Offer a few pieces at a time to discourage cheek-stuffing.",
      ],
      commonMistakes: [
        "Serving spelt berries cooked to an adult's nutty chew — they need to go far past that.",
      ],
      cutDiagram: "bite-size",
      media: [],
    },
    {
      band: "12-24m",
      form: "Very soft-cooked spelt berries served by the spoonful in soups and grain bowls, plus pancake strips or small bite-size pieces alongside family meals.",
      passFailTest:
        "Berries should still flatten under firm finger pressure, and a spoonful in broth should hold on a tilted toddler spoon long enough to land the bite.",
      whyThisForm:
        "Molars and rotary chewing now handle whole soft grains, and moist grain bowls double as low-stakes spoon practice.",
      prepSteps: [
        "Fold soft-cooked spelt berries into mild soups, stews, or yogurt bowls.",
        "Keep pancake strips in rotation as an easy hand-food format.",
      ],
      commonMistakes: [
        "Ladling the toddler's portion from a family soup that was salted for adults.",
      ],
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["banana", "blueberry", "yogurt", "butternut-squash"],
  tips: [
    "If wheat is already introduced via bread or pasta with no reaction, spelt is just a new texture — the first-time caution steps no longer apply.",
    "Choose pearled spelt over whole: it cooks softer, faster, and passes the squash test far more reliably.",
    "An overnight soak cuts the berry simmering time by a third and makes the texture more even.",
    "Cook berries in unsalted water and pancakes without added sugar — mashed banana sweetens the batter on its own.",
  ],
  sources: [SOURCES.eatStudy, SOURCES.aaaaiFoodAllergy, SOURCES.nhsFrom6Months],
  nutrients: ["fiber", "protein"],
  servingGuidance: [
    {
      band: "6-8m",
      typicalAmount:
        "One pancake strip is plenty to start — much of it is exploration, and gnawing counts even when little disappears.",
      frequency: "About twice a week once tolerated keeps the wheat exposure steady",
    },
    {
      band: "9-12m",
      typicalAmount:
        "A few pinky-nail pancake pieces or a couple of tablespoons of soft berries, offered a few at a time.",
    },
    {
      band: "12-24m",
      typicalAmount:
        "A quarter to half cup of soft berries in a bowl, or a couple of pancake strips with the family meal.",
    },
  ],
  watchOuts: [
    "Despite the 'ancient grain' marketing halo, spelt IS wheat — it is not safe for wheat allergy or celiac disease, and families with either in the history should talk to their pediatrician before introducing it.",
  ],
  emoji: "🌾",
};

export default spelt;
