import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const farina: Food = {
  slug: "farina",
  name: "Iron-fortified wheat cereal (farina)",
  aliases: ["wheat farina", "hot wheat cereal"],
  category: "grain",
  minAgeMonths: 6,
  ironRich: true,
  commonAllergen: "wheat",
  chokingRisk: "low",
  nutritionHighlights: [
    "Iron-fortified — that fortification is the point, landing just as a baby's iron stores from birth run out around 6 months",
    "Doubles as an early, easy-to-dose introduction to wheat",
    "Usually fortified with B vitamins alongside the iron",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "Iron-fortified farina whisked into cold liquid, simmered 2–3 minutes until silky, then loosened with breast milk, formula, or water to a smooth, lump-free consistency that drops slowly from a tilted spoon.",
      passFailTest:
        "Tilt a loaded spoon: the cereal should release in one slow, glossy dollop with no lumps riding in it. Drag the spoon across the surface — any pebbly graininess means more whisking or more liquid.",
      whyThisForm:
        "A 6-month-old is still mastering the deliberate swallow, so this first wheat exposure should arrive as the smoothest, most pourable-but-not-liquid texture — easy to move front-to-back and impossible to choke on.",
      prepSteps: [
        "Whisk the farina into cold water before it goes on the heat — this is the classic anti-lump move — then simmer 2–3 minutes, stirring constantly, until silky.",
        "Cool to warm and thin with breast milk, formula, or water to a smooth, spoonable consistency.",
        "Stir the first serving into a familiar food, never another new food, so any reaction can be traced to wheat.",
        "First time: serve early in the day, a small amount, and watch for 2 hours.",
      ],
      commonMistakes: [
        "Raining dry farina into boiling water — the guaranteed recipe for lumps a first eater can't manage.",
        "Delaying wheat 'to be safe' — evidence favors introducing common allergens around 6 months rather than waiting.",
        "Serving it at dinner, so a delayed reaction would land overnight when no one is watching.",
      ],
      cutDiagram: "mash",
      media: [],
    },
    {
      band: "9-12m",
      form: "Farina cooked thicker so it mounds softly on the spoon, with mashed banana or fruit puree folded through, sturdy enough to stay on a preloaded spoon a baby grabs herself.",
      passFailTest:
        "Turn the spoon on its side: the mound should slump slowly, not pour, and any folded-in fruit lump should smear flat between two fingers.",
      whyThisForm:
        "With the pincer grasp arriving, babies want to drive the spoon — a thicker, clinging farina survives the self-steered trip to the mouth while gentle fruit lumps build chewing tolerance.",
      prepSteps: [
        "Use less liquid, or simmer a minute longer, for a soft-mounding texture.",
        "Fold through mashed banana, pear, or prunes for flavor and mild lumps.",
        "Preload a spoon, set it on the tray, and reload as it comes back.",
      ],
      commonMistakes: [
        "Keeping the mix silky-thin for months — the lump-tolerance window is easiest to use now, not later.",
      ],
      cutDiagram: "mash",
      media: [],
    },
    {
      band: "12-24m",
      form: "Thick, spoon-clinging farina porridge served warm at family breakfast, self-fed with a toddler spoon and finished with chopped soft fruit or a thin drizzle of thinned nut butter.",
      passFailTest:
        "Flip a loaded spoon upside down for a second: the porridge should cling. Toppings must each pass their own squish or see-through test before they go on.",
      whyThisForm:
        "Toddlers are consolidating utensil independence, and a cohesive porridge rewards every self-fed spoonful — while the fortified iron keeps working through the picky-eating stretch.",
      prepSteps: [
        "Cook a family pot; keep the toddler's portion unsalted and unsweetened.",
        "Top with soft fruit and hand over the spoon.",
      ],
      commonMistakes: [
        "Dropping fortified cereal at the first birthday — for a selective toddler it remains one of the easiest reliable iron sources.",
      ],
      cutDiagram: "mash",
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["banana", "peach", "prunes"],
  tips: [
    "Lump-free every time: whisk farina into cold liquid first, then bring it up to a simmer while stirring — never sprinkle it into already-hot water.",
    "It sets as it cools — mix it slightly looser than you want, or re-thin the cooled bowl with a splash of breast milk or formula.",
    "Pair the bowl with a vitamin C fruit (mashed strawberry, orange, kiwi) to boost absorption of the fortified iron.",
    "After a successful introduction, keep wheat in the diet weekly — regular exposure, not a one-time test, is the goal.",
  ],
  sources: [SOURCES.eatStudy, SOURCES.wicGuide, SOURCES.cdcFoodsAndDrinks],
};

export default farina;
