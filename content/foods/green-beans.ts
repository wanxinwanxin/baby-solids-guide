import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const greenBeans: Food = {
  slug: "green-beans",
  name: "Green beans",
  aliases: ["string beans", "snap beans"],
  category: "vegetable",
  minAgeMonths: 6,
  ironRich: false,
  commonAllergen: null,
  chokingRisk: "low",
  nutritionHighlights: [
    "A source of vitamin K, which supports normal blood clotting and growing bones",
    "Provides folate, a B vitamin involved in rapid cell growth",
    "Gentle fiber that supports regular digestion",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "A whole trimmed green bean, steamed for eight to ten minutes until it droops limply when held by one end, served whole so the bean acts as its own adult-finger-length handle.",
      passFailTest:
        "The floppy test: hold the bean by one end — it should flop over like a wet noodle. A bean that stands out straight goes back in the steamer.",
      whyThisForm:
        "With a palmar (whole-fist) grasp, a baby traps the bean in a fist and gnaws the end sticking out. A whole floppy bean is its own handle, and the soft flesh mashes against bare gums.",
      prepSteps: [
        "Snap or trim the stem ends off a handful of green beans.",
        "Steam for 8–10 minutes (or simmer in unsalted water) until completely limp.",
        "Run the floppy test on the thickest bean before serving.",
        "Offer one or two whole beans at a time, cooled to warm.",
      ],
      commonMistakes: [
        "Cooking to crisp-tender the way adults like them — a bean that snaps is too firm for gums.",
        "Chopping into small pieces at this age, which takes away the handle a fist-grasper needs.",
      ],
      media: [],
    },
    {
      band: "9-12m",
      form: "Floppy steamed green beans chopped into pieces about the size of your pinky fingernail, each one still soft enough to flatten between two fingers.",
      passFailTest:
        "Press a piece between your thumb and forefinger — it should flatten with gentle pressure and never feel squeaky or crisp.",
      whyThisForm:
        "Around 9 months the pincer grasp emerges, and small soft pieces let the baby practice picking food up between thumb and forefinger while staying easy to gum.",
      prepSteps: [
        "Steam beans exactly as for 6–8 months, until fully limp.",
        "Chop crosswise into pinky-nail-sized pieces.",
        "Scatter a few pieces at a time on the tray to discourage cheek-stuffing.",
      ],
      commonMistakes: [
        "Backsliding to firmer beans because the baby has a few teeth — front teeth bite, they don't grind.",
        "Piling the tray high, which invites a whole-handful mouthful.",
      ],
      cutDiagram: "bite-size",
      media: [],
    },
    {
      band: "12-24m",
      form: "Soft-cooked green beans halved crosswise into bite-size lengths, still floppy enough to bend easily, served alongside the family's vegetables at shared meals.",
      passFailTest:
        "A piece should bend in a U without breaking and yield to firm finger pressure; anything that snaps cleanly needs more cooking.",
      whyThisForm:
        "Toddlers are gaining molars but still chew unevenly; short soft lengths are manageable while raw or crisp-cooked beans remain hard work for immature grinding.",
      prepSteps: [
        "Cook beans until fully soft, then halve crosswise.",
        "Serve as a side dish alongside family meals, seasoned with a little olive oil if you like.",
      ],
      commonMistakes: [
        "Jumping to raw or barely blanched beans before the child chews firm textures reliably.",
      ],
      cutDiagram: "bite-size",
      media: [],
    },
  ],
  firstFoodPick: true,
  flavorPairings: ["olive-oil", "potato", "chicken", "tofu"],
  tips: [
    "Steam a whole bag at once, freeze the cooked beans flat on a tray, and rewarm a few at a time for effortless repeat servings.",
    "Frozen green beans are picked ripe and cook to floppy even faster than fresh — a fine everyday shortcut.",
    "If a slick bean keeps sliding out of a fist, roll it in a pinch of dry infant oat cereal for traction.",
    "The floppy test beats any timer: bean thickness varies, so always check the fattest bean by holding it up by one end.",
  ],
  sources: [SOURCES.wicGuide, SOURCES.nhsFrom6Months, SOURCES.cdcFoodsAndDrinks],
};

export default greenBeans;
