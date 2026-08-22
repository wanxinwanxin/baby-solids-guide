import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const lamb: Food = {
  slug: "lamb",
  name: "Lamb",
  aliases: [],
  category: "protein",
  minAgeMonths: 6,
  ironRich: true,
  commonAllergen: null,
  chokingRisk: "moderate",
  chokingNotes:
    "Dry or chewy lamb pieces — grilled chop meat, firm cubes — are the hazard, since infant gums can't grind them into a safe swallow. Mitigate by slow-cooking shoulder or leg until it shreds at a touch and moistening every serving with the braising liquid.",
  nutritionHighlights: [
    "Rich in heme iron and zinc, two nutrients breastfed babies need most from 6 months",
    "Complete protein with vitamin B12 for nervous-system development",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "A strip of slow-cooked lamb shoulder or leg about the length and width of two adult fingers that pulls into soft strands, or finely shredded moistened lamb folded into a familiar puree.",
      passFailTest:
        "Twist the strip between thumb and forefinger — fibers should separate with almost no force, and the surface should feel wet, not tacky-dry.",
      whyThisForm:
        "With a whole-fist palmar grasp, the baby gnaws whatever sticks out of the fist, so a long tender strip is a handle; moist shreds stirred into puree reach spoon-fed babies too.",
      prepSteps: [
        "Braise boneless lamb shoulder or leg in unsalted water or broth at a low simmer for 2–3 hours until it collapses off a fork.",
        "Pull with the grain into strips two adult fingers long and one wide; run the twist test on the thickest strip.",
        "Spoon braising liquid over the strip just before serving so it glistens.",
        "Or shred finely, moisten well, and fold into a vegetable puree the baby already accepts.",
      ],
      commonMistakes: [
        "Serving grilled or pan-seared lamb — quick cooking leaves it far too chewy for gums.",
        "Cutting cubes: firm chunks are the airway-plugging shape.",
        "Skimping on the moistening step; lamb dries quickly once pulled.",
      ],
      cutDiagram: "strips",
      media: [],
    },
    {
      band: "9-12m",
      form: "Finely shredded slow-cooked lamb or gently simmered ground lamb, kept moist with cooking liquid, in soft pieces between pea and pinky-nail size.",
      passFailTest:
        "Pinch a piece between two fingers — it should mash flat into damp fibers; dry, springy pieces go back into the pot with a splash of liquid.",
      whyThisForm:
        "The pincer grasp emerging around 9 months is built for small, soft, pick-up-able pieces, and lamb's natural fat keeps small shreds moist enough to gum safely.",
      prepSteps: [
        "Chop braised shreds into pea-to-pinky-nail pieces and stir in a little braising liquid.",
        "For ground lamb, simmer in a splash of water until cooked through and softly clumped, not browned crisp.",
        "Offer a few pieces at a time so the baby can't overfill the mouth.",
      ],
      commonMistakes: [
        "Frying ground lamb until crumbly and dry — the moist-clump texture is the target.",
        "Pieces bigger than a pinky nail, which invite pocketing in the cheeks.",
      ],
      cutDiagram: "shred",
      media: [],
    },
    {
      band: "12-24m",
      form: "Soft braised or stewed lamb cut across the grain into bite-size pieces no bigger than a pinky fingernail, moist enough to flatten between two fingers.",
      passFailTest:
        "Press a piece between thumb and finger — it should give way into short fibers; a dense piece needs a longer braise or a finer cut.",
      whyThisForm:
        "Erupting molars still can't grind chewy meat, so cutting across the grain shortens the fibers and lets a toddler's mash-and-swallow chew succeed.",
      prepSteps: [
        "Cut tender lamb from a family stew or braise across the grain into pinky-nail pieces.",
        "Moisten with defatted pan juices or the stew's sauce before serving.",
      ],
      commonMistakes: [
        "Serving chop or kebab pieces because the toddler has front teeth — biting is not grinding, and kebab meat is too chewy.",
      ],
      cutDiagram: "bite-size",
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["carrot", "chickpeas", "yogurt", "quinoa"],
  tips: [
    "Shoulder and leg are the braising cuts — rib and loin chops cook fast and chewy, which is the opposite of what a baby needs.",
    "Lamb fat solidifies as it cools, so rewarm shreds gently with a spoonful of braising liquid to bring back the soft texture.",
    "One weekend braise, frozen flat in its liquid in meal-size pouches, covers weeks of iron-rich servings.",
    "A dollop of plain whole-milk yogurt stirred into shredded lamb adds moisture and mellows the flavor for hesitant eaters.",
  ],
  sources: [SOURCES.wicGuide, SOURCES.nhsFrom6Months, SOURCES.aapStartingSolids],
};

export default lamb;
