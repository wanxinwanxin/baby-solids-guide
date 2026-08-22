import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const egg: Food = {
  slug: "egg",
  name: "Egg",
  aliases: ["hen's egg", "chicken egg"],
  category: "protein",
  minAgeMonths: 6,
  ironRich: true,
  commonAllergen: "egg",
  chokingRisk: "low",
  nutritionHighlights: [
    "Yolks are a concentrated source of choline, which supports brain development",
    "Provides complete protein plus iron in a form babies can eat from the first weeks of solids",
    "One of the few everyday foods that naturally contains some vitamin D",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "A hard-cooked yolk mashed smooth with a spoonful of breast milk, formula, or water, or a plain omelette cooked firm all the way through and cut into strips about two adult fingers wide.",
      passFailTest:
        "Cut the egg open and check the center: yolk and white must be fully set with nothing glossy, wet, or runny. A mashed yolk should be moist and lump-free, not dry and crumbly.",
      whyThisForm:
        "At this age babies grip with the whole fist, so a wide omelette strip gives them a handle to gnaw, while a moistened yolk mash is easy to move around a mouth that can't yet chew. Full cooking is non-negotiable for infants — runny yolks and soft-set whites carry Salmonella risk.",
      prepSteps: [
        "Hard-cook an egg (boil 10–12 minutes) or cook a thin plain omelette until firm with no wet spots, then cool.",
        "Mash the yolk with 1–2 teaspoons of breast milk, formula, or water until smooth, or cut the omelette into strips two adult fingers wide.",
        "First time: serve early in the day, a small amount, and watch for 2 hours.",
        "Serve alongside familiar foods, never another new food, so any reaction can be traced to the egg.",
      ],
      commonMistakes: [
        "Serving a soft-boiled or runny yolk — infants need eggs fully cooked, every time.",
        "Offering plain crumbled yolk with no liquid: it's dry, pasty, and hard for a new eater to swallow.",
        "Adding salt or cooking the omelette in heavily salted butter.",
      ],
      cutDiagram: "strips",
      media: [],
    },
    {
      band: "9-12m",
      form: "Fully cooked scrambled egg broken into soft curds, or hard-cooked egg chopped into rough pieces about the size of your pinky fingernail.",
      passFailTest:
        "Press a curd or piece between two fingers — it should break apart easily — and check that no part of the white or yolk is wet or translucent.",
      whyThisForm:
        "Around 9 months the pincer grasp emerges, and small soft curds and pinky-nail pieces are ideal practice material: easy to pick up, easy to mash with gums.",
      prepSteps: [
        "Scramble an egg over medium heat until every curd is set and dry to the touch, or chop a hard-cooked egg into pinky-nail pieces.",
        "Let it cool to warm, then scatter a few pieces at a time on the tray.",
        "Keep egg in the rotation a couple of times a week once it's tolerated.",
      ],
      commonMistakes: [
        "Taking scrambled eggs off the heat while still glossy and soft-set — fully cooked still applies.",
        "Dumping the whole portion on the tray at once, which invites cheek-stuffing.",
      ],
      cutDiagram: "bite-size",
      media: [],
    },
    {
      band: "12-24m",
      form: "Any fully cooked egg dish — scrambled, omelette cut into bite-size wedges, egg muffins, or chopped hard-cooked egg — with whites and yolks always set firm, never runny or soft-poached.",
      passFailTest:
        "Slice into the thickest part: if anything flows, jiggles, or looks glossy-wet, it goes back on the heat.",
      whyThisForm:
        "Toddlers can manage nearly any egg texture, but their immune systems still warrant fully cooked eggs — runny yolks, sunny-side-up, and soft-poached remain off the menu through toddlerhood.",
      prepSteps: [
        "Cook eggs into family meals — frittata, egg fried rice, omelette wedges — always to fully set.",
        "Cut larger preparations into bite-size pieces or wedges a toddler can hold.",
      ],
      commonMistakes: [
        "Sharing a runny-yolk egg from an adult plate because the child 'eats everything now' — undercooked egg is a food-safety issue, not a texture issue.",
      ],
      media: [],
    },
  ],
  firstFoodPick: true,
  flavorPairings: ["avocado", "spinach", "cheese", "bread"],
  tips: [
    "Boil a 10–12 minute egg: at that point the yolk is uniformly pale and powdery-firm at the edge — that's your visual proof it's fully cooked.",
    "A dry yolk mash is the most common failure — mix in breast milk, formula, or water a teaspoon at a time until it's the texture of thick hummus.",
    "For omelette strips that hold together in a fist, cook the omelette thin (one egg in a small pan) and let it set completely before cutting.",
    "Hard-cook a few eggs at the start of the week and refrigerate in the shell — a safe, fully cooked serving is then two minutes away.",
  ],
  sources: [SOURCES.eatStudy, SOURCES.aapStartingSolids, SOURCES.nhsFrom6Months],
  nutrients: ["protein", "iron", "vitaminD", "folate"],
  servingGuidance: [
    {
      band: "6-8m",
      typicalAmount:
        "A teaspoon or two of yolk mash, or half an omelette strip — on introduction day a taste is a win.",
      frequency: "About twice a week once tolerated, to keep egg familiar.",
    },
    {
      band: "9-12m",
      typicalAmount:
        "From a small handful of curds up to a whole scrambled egg — some days it's two bites, some days the lot.",
    },
    {
      band: "12-24m",
      typicalAmount:
        "Half to one egg in whatever form the meal takes — let appetite, not the plate, decide.",
      frequency: "A couple of times a week keeps it in the rotation.",
    },
  ],
  emoji: "🥚",
};

export default egg;
