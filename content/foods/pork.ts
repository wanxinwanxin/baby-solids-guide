import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const pork: Food = {
  slug: "pork",
  name: "Pork",
  aliases: [],
  category: "protein",
  minAgeMonths: 6,
  ironRich: true,
  commonAllergen: null,
  chokingRisk: "moderate",
  chokingNotes:
    "Dry, firm pork pieces — chops, tenderloin medallions, crisped edges — are the hazard because they won't mash against bare gums. Mitigate by braising shoulder until it shreds at a touch, moistening every serving with cooking liquid, and never serving cubes or tough crusty bits.",
  nutritionHighlights: [
    "Supplies heme iron and zinc in a form babies absorb well",
    "One of the best food sources of thiamine (vitamin B1) for energy metabolism",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "A strip of slow-braised pork shoulder about the length and width of two adult fingers that pulls apart into soft strands, or finely shredded moistened pork folded into a familiar puree.",
      passFailTest:
        "Twist the strip gently between thumb and forefinger — it should separate into moist fibers with no tugging; resistance means it goes back into the braise.",
      whyThisForm:
        "A palmar-grasping 6-month-old traps food in a fist and gnaws the exposed end, so a long shreddable strip works as a handle while shredded pork in puree covers spoon feeds.",
      prepSteps: [
        "Braise a piece of unseasoned, uncured pork shoulder in unsalted water or broth at a bare simmer for 2–3 hours until fork-collapse tender.",
        "Pull with the grain into two-finger strips and run the twist test on the thickest one.",
        "Spoon braising liquid over each strip just before serving.",
        "Or shred finely, moisten generously, and fold into a vegetable puree the baby already knows.",
      ],
      commonMistakes: [
        "Serving quick-cooked chops or tenderloin — lean cuts never reach a shreddable texture.",
        "Offering cured pork like ham or bacon: the sodium load is far too high for infants.",
        "Letting shreds dry out between cooking and serving instead of storing them in their liquid.",
      ],
      cutDiagram: "strips",
      media: [],
    },
    {
      band: "9-12m",
      form: "Finely shredded braised pork shoulder or soft-simmered ground pork, glossed with cooking liquid, in pieces between pea and pinky-nail size.",
      passFailTest:
        "Pinch a piece between two fingers — it should flatten into damp strands rather than crumble; dry crumbs get a stir of broth before they reach the tray.",
      whyThisForm:
        "Around 9 months the pincer grasp lets babies pick up small pieces one by one, and moist pea-size shreds reward that practice while staying gummable.",
      prepSteps: [
        "Chop braised shoulder shreds into pea-to-pinky-nail pieces and remoisten.",
        "For ground pork, simmer gently in a little water until cooked through and softly clumped.",
        "Scatter a small handful at a time to keep each mouthful manageable.",
      ],
      commonMistakes: [
        "Crisping ground pork like taco filling — browned, dry crumbles are the classic meat mistake.",
        "Sneaking in salty cured products (sausage, ham cubes) as 'pork' — they are a different food entirely.",
      ],
      cutDiagram: "shred",
      media: [],
    },
    {
      band: "12-24m",
      form: "Soft braised or stewed pork cut across the grain into bite-size pieces no bigger than a pinky fingernail, still wet enough to flatten between two fingers.",
      passFailTest:
        "Press a piece flat between thumb and finger — it should yield into fibers; a piece that springs back needs longer cooking or a smaller dice.",
      whyThisForm:
        "New molars still can't grind a dry chop, so short cross-grain fibers plus sauce-level moisture keep family-meal pork within a toddler's chewing ability.",
      prepSteps: [
        "Cut tender braised pork from the family meal across the grain into pinky-nail pieces.",
        "Moisten with defatted pan juices or a soft unsalted sauce before plating.",
      ],
      commonMistakes: [
        "Handing over bacon, ham, or sausage as everyday toddler food — cured pork stays a sodium problem well past age two.",
      ],
      cutDiagram: "bite-size",
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["apple", "sweet-potato", "rice", "green-beans"],
  tips: [
    "Shoulder (also sold as pork butt or Boston butt) is the cut that braises shreddable — skip lean chops and tenderloin for baby prep.",
    "Buy fresh, uncured pork only: ham, bacon, and most sausages are salt-cured and don't belong on an infant's tray.",
    "A slow cooker on low for 6–8 hours with a cup of water turns shoulder into weeks of freezer-ready shreds — freeze flat in the cooking liquid.",
    "Pork pairs naturally with fruit: a spoonful of unsweetened applesauce stirred into shreds adds both moisture and flavor.",
  ],
  sources: [SOURCES.wicGuide, SOURCES.aapStartingSolids, SOURCES.nhsFrom6Months],
};

export default pork;
