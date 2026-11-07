import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const quailEgg: Food = {
  slug: "quail-egg",
  name: "Quail egg",
  aliases: ["quail eggs", "quail's egg", "quail's eggs"],
  category: "protein",
  minAgeMonths: 6,
  ironRich: true,
  commonAllergen: "egg",
  chokingRisk: "high",
  chokingNotes:
    "A whole hard-cooked quail egg is round, firm, and about the size of a grape — the classic shape that plugs a young child's airway — so whole or halved quail eggs stay off-limits until at least age 4. Mitigate by mashing the egg with liquid for new eaters, chopping it into pinky-nail pieces from about 9 months, and quartering every egg lengthwise for toddlers.",
  nutritionHighlights: [
    "Yolks are a concentrated source of choline, which supports brain development",
    "Provides complete protein plus iron — the same kind of nourishment as a hen's egg, in a smaller shell",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "A hard-cooked quail egg yolk, or the whole egg with the white chopped very fine, mashed smooth with a few drops of breast milk, formula, or water, or a thin plain omelette of beaten quail eggs cooked firm and cut into strips about two adult fingers wide.",
      passFailTest:
        "Cut one egg open before you mash: the yolk must be pale and set all the way through, with nothing glossy or runny in the center. A pinch of mash rubbed between finger and thumb should feel smooth and moist, with no rubbery bits of white.",
      whyThisForm:
        "A whole quail egg is the round, firm, grape-sized shape that blocks an airway, so at this age it arrives as a mash or as wide omelette strips: the mash needs no chewing, and a strip gives the whole-fist grasp a handle to gnaw. Full cooking is non-negotiable — runny yolks carry Salmonella risk.",
      prepSteps: [
        "Lower quail eggs into boiling water with a spoon, boil 4–5 minutes, then move them to cold water for a few minutes and peel.",
        "Mash the yolk with breast milk, formula, or water added a few drops at a time until smooth; to include the white, chop it very fine first and mash it in.",
        "Or beat 4–5 quail eggs, cook a thin plain omelette until firm with no wet spots, cool it, and cut strips two adult fingers wide.",
        "First time: serve early in the day, a small amount, and watch for 2 hours — even if hen's egg is already in the diet.",
        "Serve alongside familiar foods, never another new food, so any reaction can be traced to the quail egg.",
      ],
      commonMistakes: [
        "Handing over a whole or halved quail egg because it looks baby-sized — that size is exactly what makes it an airway plug.",
        "Offering quail egg as a 'gentler' egg to a baby with a known or suspected egg allergy — its proteins cross-react strongly with hen's egg.",
        "Serving a soft-boiled quail egg or a runny yolk — a tiny egg still needs full cooking, every time.",
      ],
      cutDiagram: "mash",
      media: [],
    },
    {
      band: "9-12m",
      form: "Fully cooked quail eggs chopped into rough pieces about the size of your pinky fingernail, never whole or halved, or beaten quail eggs scrambled into soft curds that are set all the way through.",
      passFailTest:
        "Pick up a piece and turn it: nothing should look round or dome-shaped from any side, and every piece should squash easily between two fingers with no wet or glossy spot.",
      whyThisForm:
        "Chopping removes the round, grape-sized shape that seals an airway, and pinky-nail pieces give the emerging pincer grasp ideal practice — easy to pick up, easy to mash with gums.",
      prepSteps: [
        "Hard-cook quail eggs 4–5 minutes, cool them in cold water, peel, and chop each egg into pinky-nail pieces.",
        "Let the pieces cool to warm, then scatter a few at a time on the tray.",
        "Once quail egg is tolerated, rotate it with hen's egg in family meals.",
      ],
      commonMistakes: [
        "Cutting a quail egg in half and calling it done — a half is still a rounded, airway-sized dome.",
        "Dumping the whole portion on the tray at once, which invites cheek-stuffing.",
      ],
      cutDiagram: "bite-size",
      media: [],
    },
    {
      band: "12-24m",
      form: "Every hard-cooked quail egg quartered lengthwise from end to end into four slim wedges, or chopped into bite-size pieces, with no whole or halved quail egg on the plate until at least age four.",
      passFailTest:
        "Pick up any piece and turn it: nothing should look round in any direction, and the yolk inside must be pale and fully set.",
      whyThisForm:
        "Toddlers eat fast and talk and laugh with full mouths, and their airways are still about grape-sized — a whole quail egg can block one completely, so the lengthwise cut holds until at least age 4.",
      prepSteps: [
        "Quarter every quail egg lengthwise, every time — including eggs fished out of a family soup or stir-fry.",
        "Brief every caregiver: grandparents and daycare need to hear 'quail eggs quartered lengthwise until age 4' explicitly.",
      ],
      commonMistakes: [
        "Handing over a whole quail egg from a skewer, a hot-pot bowl, or a snack pack because it looks made for small hands.",
        "Sharing a raw quail yolk from a sushi topping — undercooked egg stays off the menu through toddlerhood.",
        "Serving pickled, canned, soy-braised, or tea-stewed quail eggs — they are steeped in salt and far too salty for a small child.",
      ],
      cutDiagram: "quarter-lengthwise",
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["avocado", "sweet-potato", "rice", "spinach"],
  tips: [
    "Lower quail eggs into water that is already boiling and cook 4–5 minutes; the yolk should then be pale and firm all the way through — cut one open to check before serving.",
    "To peel, chill the eggs in cold water, roll each one gently on the board to crackle the whole shell, and peel under running water from the wide end; then run a fingertip over each egg, because quail shell breaks into tiny sharp flecks that cling to the white.",
    "Five quail eggs equal about one hen's egg — use that ratio to swap quail eggs into any egg recipe, from omelette strips to egg muffins.",
    "To crack raw quail eggs for an omelette, saw a small cap off one end with a serrated knife; a tap on the bowl edge often only dents the tough inner membrane.",
  ],
  sources: [
    SOURCES.eatStudy,
    SOURCES.aaaaiFoodAllergy,
    SOURCES.aapChoking,
    SOURCES.cdcChokingHazards,
    SOURCES.nhsFrom6Months,
  ],
  nutrients: ["protein", "iron", "folate"],
  servingGuidance: [
    {
      band: "6-8m",
      typicalAmount:
        "A teaspoon or two of mash — about one quail egg — or one or two omelette strips; on introduction day a taste is a win.",
      frequency: "About twice a week once tolerated, taking turns with hen's egg.",
      note: "Passing hen's egg does not cover quail egg — it needs its own watched first serving.",
    },
    {
      band: "9-12m",
      typicalAmount:
        "From a few pieces up to two or three chopped quail eggs — some days it's two bites, some days the lot.",
    },
    {
      band: "12-24m",
      typicalAmount:
        "Two to five quail eggs, each quartered lengthwise — about half to one hen's egg; let appetite, not the plate, decide.",
      frequency: "A couple of times a week, taking turns with hen's egg.",
    },
  ],
  watchOuts: [
    "Quail egg counts as egg: its proteins cross-react strongly with hen's-egg proteins, so for a baby with a known or suspected egg allergy it is not a gentler substitute — keep it off the menu unless the baby's allergist says otherwise.",
    "Passing hen's egg does not guarantee quail egg — give quail egg its own day with no other new food, a small first amount, and a 2-hour watch.",
    "Pickled, brined, canned, soy-braised, and tea-stewed quail eggs are steeped in salt — for a baby, boil plain quail eggs at home.",
  ],
  emoji: "🥚",
};

export default quailEgg;
