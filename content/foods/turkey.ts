import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const turkey: Food = {
  slug: "turkey",
  name: "Turkey",
  aliases: ["ground turkey"],
  category: "protein",
  minAgeMonths: 6,
  ironRich: true,
  commonAllergen: null,
  chokingRisk: "moderate",
  chokingNotes:
    "Dry, crumbly turkey — especially roasted breast — is the hazard: dry wads are hard to gum into a safe swallow. Mitigate by choosing dark meat, slow-cooking until shreddable, and moistening every serving with cooking liquid; never serve firm cubes or deli slices rolled into plugs.",
  nutritionHighlights: [
    "Dark turkey meat is a solid source of heme iron and zinc",
    "Lean, complete protein with vitamin B12 for brain and blood development",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "A strip of braised turkey thigh about the length and width of two adult fingers that pulls into soft strands under gentle pressure, or finely shredded moistened turkey folded into a familiar puree.",
      passFailTest:
        "The shred test: twist the strip lightly between thumb and forefinger — fibers should separate without effort. If the strip resists, return it to the braise.",
      whyThisForm:
        "Babies this age clamp food in a whole-fist grasp and work on the exposed end, so a long tender strip acts as a handle, while moist shreds in puree deliver iron on a spoon.",
      prepSteps: [
        "Braise boneless turkey thigh in unsalted water or broth at a low simmer for 60–90 minutes until it falls apart.",
        "Pull with the grain into strips about two adult fingers long and one finger wide, then run the shred test.",
        "Spoon braising liquid over the strip right before it goes on the tray.",
        "Or shred finely, stir in enough cooking liquid to make it glossy, and fold into a vegetable puree.",
      ],
      commonMistakes: [
        "Using roasted breast — it dries into crumbles that scatter in the mouth instead of mashing.",
        "Serving cubes or chunks: firm pieces are the airway-blocking geometry.",
        "Skipping the moistening step, which is what separates safe turkey from dry turkey.",
      ],
      cutDiagram: "strips",
      media: [],
    },
    {
      band: "9-12m",
      form: "Finely shredded braised turkey or soft-simmered ground turkey, kept moist with cooking liquid, in pieces between pea and pinky-nail size.",
      passFailTest:
        "Pinch a piece between two fingers — it should flatten into damp fibers; if it crumbles dry, stir in a spoonful of broth before serving.",
      whyThisForm:
        "The emerging pincer grasp at around 9 months thrives on small, soft, slightly tacky pieces the baby can pick up one at a time and mash with the gums.",
      prepSteps: [
        "Chop braised thigh shreds into pea-to-pinky-nail pieces.",
        "For ground turkey, simmer gently in a splash of water or unsalted broth and stir until it forms soft, moist clumps.",
        "Scatter a few pieces at a time on the tray to keep mouthfuls small.",
      ],
      commonMistakes: [
        "Browning ground turkey hard in a dry pan — the pebbly crumbs are the classic mistake.",
        "Reheating without added liquid, which re-dries meat that was safe the day before.",
      ],
      cutDiagram: "shred",
      media: [],
    },
    {
      band: "12-24m",
      form: "Soft, slow-cooked turkey cut across the grain into bite-size pieces no larger than a pinky fingernail, moist enough to flatten between two fingers.",
      passFailTest:
        "Press a piece between thumb and forefinger — it should give way into strands. A piece that stays a dense nugget needs more braising or a finer cut.",
      whyThisForm:
        "Molars are just arriving and cannot yet grind dry fibrous meat, so short cross-grain pieces and gravy-level moisture keep family-meal turkey manageable.",
      prepSteps: [
        "Cut tender dark meat from the family meal across the grain into pinky-nail pieces.",
        "Moisten with pan juices or an unsalted gravy before plating.",
      ],
      commonMistakes: [
        "Holiday-dinner dry breast slices handed over whole — even toddlers with teeth pocket or gag on dry turkey.",
      ],
      cutDiagram: "bite-size",
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["sweet-potato", "butternut-squash", "avocado", "quinoa"],
  tips: [
    "Choose thigh over breast every time: dark meat carries more fat and collagen, so it stays moist where breast turns to sawdust.",
    "Braise in liquid to cover and store the meat submerged — turkey re-dries in the fridge overnight if kept dry.",
    "Ground turkey labeled 93% lean or lower makes noticeably softer, moister crumbles than 99% lean.",
    "Batch-cook one thigh braise, freeze flat in its liquid, and thaw portions overnight for near-instant iron-rich meals.",
  ],
  sources: [SOURCES.wicGuide, SOURCES.aapStartingSolids, SOURCES.cdcFoodsAndDrinks],
  nutrients: ["iron", "zinc", "protein"],
  servingGuidance: [
    {
      band: "6-8m",
      typicalAmount:
        "One braised strip, or a teaspoon or two of glossy shreds folded into a puree — iron-rich, so offer it often; the amount stays the baby's call.",
    },
    {
      band: "9-12m",
      typicalAmount:
        "A small handful of moist pea-size pieces, scattered a few at a time.",
    },
    {
      band: "12-24m",
      typicalAmount:
        "A few tablespoons of moist cross-grain pieces with the family meal — some days most comes back, and that's normal.",
    },
  ],
  watchOuts: [
    "Deli and smoked turkey are salt-cured — home-cooked meat is the everyday form for babies and toddlers.",
  ],
  emoji: "🦃",
};

export default turkey;
