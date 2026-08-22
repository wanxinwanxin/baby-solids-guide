import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const salmon: Food = {
  slug: "salmon",
  name: "Salmon",
  aliases: [],
  category: "protein",
  minAgeMonths: 6,
  ironRich: true,
  commonAllergen: "fish",
  chokingRisk: "low",
  nutritionHighlights: [
    "Rich in DHA, the omega-3 fat concentrated in the developing brain and eyes",
    "Provides iron, vitamin D, and high-quality protein",
    "A low-mercury fish, appropriate for regular servings from 6 months",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "A skinless piece of salmon fillet the size of two adult fingers, cooked until it flakes at the touch of a fork, pin-bone-checked, and served whole or lightly mashed into a familiar puree.",
      passFailTest:
        "Press a fork flat on the fish — it should separate into moist flakes with no resistance, and fingertips raked through every flake should find zero pin bones.",
      whyThisForm:
        "Cooked salmon is naturally soft enough for bare gums, so a two-finger piece suits the palmar grasp while mashed flakes in puree deliver the allergen and DHA by spoon.",
      prepSteps: [
        "Run your fingers over the raw fillet against the grain and pull out every pin bone with tweezers, then bake or poach until opaque and flaking throughout.",
        "Rake the cooked fish apart with a fork and fingertips, double-checking for missed bones, then remoisten with a little cooking liquid, breast milk, or formula.",
        "Mix into or serve alongside familiar foods, never another new food.",
        "First time: serve early in the day, a small amount, and watch for 2 hours.",
      ],
      commonMistakes: [
        "Skipping the pin-bone check — a fine bone is the real hazard in an otherwise soft food.",
        "Overcooking until dry and chalky; dry fish crumbles instead of mashing.",
        "Introducing salmon at dinner, where a delayed reaction lands overnight when you can't observe.",
      ],
      media: [],
    },
    {
      band: "9-12m",
      form: "Soft, pin-bone-checked salmon broken into loose flakes about the size of a pinky fingernail, moistened so each flake mashes easily between two fingers.",
      passFailTest:
        "Squeeze a flake between two fingers — it should flatten into soft threads, and a fingertip sweep through the pile should confirm no bones slipped through.",
      whyThisForm:
        "Flakes are tailor-made for the new pincer grasp: small, soft, and irregular enough to grip, while regular servings keep the fish allergen in the diet once introduced.",
      prepSteps: [
        "Cook and de-bone exactly as for 6–8 months, then break into pinky-nail flakes.",
        "Toss the flakes with a spoonful of cooking juice, olive oil, or plain yogurt so they don't dry out.",
        "Scatter a few flakes at a time on the tray.",
      ],
      commonMistakes: [
        "Trusting 'boneless' labels instead of checking — pin bones evade filleting machines.",
        "Serving dry flakes that scatter and stick in the mouth; moisture makes fish easy.",
      ],
      cutDiagram: "bite-size",
      media: [],
    },
    {
      band: "12-24m",
      form: "Bite-size chunks of cooked, pin-bone-checked salmon about the size of a pinky fingernail, or soft salmon patties cut into finger-width strips.",
      passFailTest:
        "Each chunk should flatten between two fingers and pull apart into flakes; patties should dent easily under a fingertip press.",
      whyThisForm:
        "Toddlers chew soft fish well, so the goals shift to variety and routine — keeping low-mercury fish on the menu once or twice a week in easy self-feeding shapes.",
      prepSteps: [
        "Serve family-meal salmon in pinky-nail chunks after a final bone check.",
        "For patties, mix flaked salmon with mashed potato or breadcrumbs and egg, pan-cook gently, and cut into strips.",
      ],
      commonMistakes: [
        "Relying on breaded fish products or smoked salmon — both carry far more salt than plain cooked fillet.",
      ],
      cutDiagram: "bite-size",
      media: [],
    },
  ],
  firstFoodPick: true,
  flavorPairings: ["avocado", "sweet-potato", "peas", "yogurt"],
  tips: [
    "Poaching in a shallow pan of barely simmering water for about 10 minutes gives the moistest, easiest-to-mash result for early eaters.",
    "The pin-bone check happens twice: fingers over the raw fillet, then again through the cooked flakes — bones hide until the flesh separates.",
    "Salmon is a low-mercury choice; keeping it (and other low-mercury fish) to a couple of servings a week fits federal fish advice for young children.",
    "Canned salmon works in a pinch: choose no-salt-added, and mash thoroughly so the soft round bones crush completely.",
    "Freeze cooked, de-boned flakes flat in a zip bag and snap off a portion at a time to keep weekly fish servings effortless.",
  ],
  sources: [SOURCES.fdaFish, SOURCES.eatStudy, SOURCES.wicGuide],
};

export default salmon;
