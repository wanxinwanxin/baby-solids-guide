import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const blackBeans: Food = {
  slug: "black-beans",
  name: "Black beans",
  aliases: ["black turtle beans"],
  category: "legume",
  minAgeMonths: 6,
  ironRich: true,
  commonAllergen: null,
  chokingRisk: "moderate",
  chokingNotes:
    "A whole black bean with its skin intact is a small, smooth-coated oval that can slip backward before a baby manages it, and underdone beans are firm enough to lodge. Mitigate by smashing each bean flat between your fingers (splitting the skin) for early eaters, and serving whole beans only once they're cooked soft and the child chews reliably.",
  nutritionHighlights: [
    "A solid plant source of iron for the second half of the first year",
    "Plant protein plus folate in an inexpensive pantry staple",
    "Fiber that supports regular digestion",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "Soft-cooked black beans smashed into a coarse mash with every skin broken, thinned with cooking liquid or water until it spreads as easily as thick hummus.",
      passFailTest:
        "Drag a fork through the mash: no whole, skin-intact bean should surface. A dab should spread on the tray under one finger without rolling anywhere.",
      whyThisForm:
        "Babies this age can't chew, and the bean's slick skin is exactly what lets a whole bean slide back unmanaged — a broken-skin mash removes the hazard while keeping the iron.",
      prepSteps: [
        "Simmer soaked beans until completely soft (or rinse no-salt-added canned beans thoroughly).",
        "Mash with a fork or potato masher until every skin is visibly split, then loosen with cooking liquid or water to a thick, spreadable texture.",
        "Serve on a preloaded spoon, or spread a stripe on the tray for hand-scooping.",
      ],
      commonMistakes: [
        "Mashing lightly and leaving whole, skin-intact beans buried in the mash.",
        "Using standard canned beans without rinsing — the salt in the canning liquid is substantial.",
        "Serving beans that still feel firm at the center; underdone beans don't mash, they fragment.",
      ],
      cutDiagram: "mash",
      media: [],
    },
    {
      band: "9-12m",
      form: "Individual soft-cooked black beans, each pressed flat between your thumb and forefinger so the skin splits, served a few at a time for pincer-grasp practice.",
      passFailTest:
        "Inspect the tray: every bean should be a flattened disc with a visibly split skin. Any bean still oval and glossy gets pressed again.",
      whyThisForm:
        "Flattened beans are near-perfect pincer practice — small, soft, grippable — and splitting the skin removes the slick coating that would otherwise let a whole bean slip back whole.",
      prepSteps: [
        "Cook (or rinse canned) beans until each squashes with no resistance.",
        "Press each bean flat between thumb and forefinger, or flatten a row at once with the back of a fork.",
        "Scatter four or five flattened beans at a time to discourage cheek-stuffing.",
      ],
      commonMistakes: [
        "Flattening most beans but letting a handful of whole ones through — the check is every bean.",
        "Pouring out a big pile at once, which invites shoveling by the fistful.",
      ],
      cutDiagram: "mash",
      media: [],
    },
    {
      band: "12-24m",
      form: "Whole soft-cooked black beans mixed into family dishes like rice bowls and low-salt chili, every bean still soft enough to flatten easily under one finger.",
      passFailTest:
        "Sample a few beans from the pot and press each under one finger — all should flatten with no firm center before the toddler's bowl is served.",
      whyThisForm:
        "With reliable chewing and emerging molars, a toddler can manage whole soft beans; the remaining jobs are keeping them truly soft and keeping the portion low-salt.",
      prepSteps: [
        "Fold soft whole beans into rice, soft tacos, or mild chili, pulling the toddler portion before heavy salting.",
        "Keep smashing any batch that turned out firm — doneness, not age, decides the form.",
      ],
      commonMistakes: [
        "Serving firm or al dente beans from a salad or an undercooked batch — soft is still the requirement.",
      ],
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["avocado", "sweet-potato", "rice", "bell-pepper"],
  tips: [
    "No-salt-added canned beans, rinsed well under running water, are a legitimate shortcut — softness is what matters, not cooking from dry.",
    "The two-finger smash doubles as the safety check: a bean that flattens easily is cooked enough, and flattening it is exactly the prep.",
    "If the mash turns gluey, loosen it with warm water or unsalted cooking liquid a spoonful at a time.",
    "Cook once, serve for days: mashed beans keep 3 days refrigerated and freeze well in ice-cube portions.",
  ],
  sources: [SOURCES.wicGuide, SOURCES.cdcChokingHazards, SOURCES.aapMenu8to12],
};

export default blackBeans;
