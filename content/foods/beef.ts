import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const beef: Food = {
  slug: "beef",
  name: "Beef",
  aliases: ["ground beef"],
  category: "protein",
  minAgeMonths: 6,
  ironRich: true,
  commonAllergen: null,
  chokingRisk: "moderate",
  chokingNotes:
    "Dry, firm chunks of beef are the hazard — they don't break down against bare gums and can lodge in the airway. Mitigate by braising or slow-cooking until the meat shreds with finger pressure, always moistening with cooking liquid, and never serving cubes of steak or roast.",
  nutritionHighlights: [
    "One of the richest food sources of heme iron, the form babies absorb most easily",
    "Provides zinc, which supports growth and immune function",
    "High-quality protein and vitamin B12 for rapid brain development",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "A braised or slow-cooked beef strip about the length and width of two adult fingers that shreds under gentle finger pressure, or finely shredded moistened mince folded into a familiar puree.",
      passFailTest:
        "The shred test: pinch the strip between thumb and forefinger and twist — the fibers should pull apart with almost no effort. If you have to tug, braise it longer.",
      whyThisForm:
        "At this age babies hold food in a whole-fist palmar grasp and suck and gnaw on the end sticking out. A long, tender strip works like a handle; shredded mince in puree delivers iron to babies who aren't yet self-feeding.",
      prepSteps: [
        "Choose a well-marbled cut like chuck; braise covered in unsalted broth or water at a low simmer for 2–3 hours until it falls apart.",
        "Pull a piece with the grain into a strip about two adult fingers long and one wide, and run the shred test.",
        "Spoon a little cooking liquid over the strip just before serving so it stays glossy and moist.",
        "Alternatively, shred the meat very finely, moisten with cooking liquid, and fold into a vegetable puree.",
      ],
      commonMistakes: [
        "Serving dry, crumbly meat — dryness, not the meat itself, is what makes beef hard to manage.",
        "Cutting cubes or chunks: a firm cube is exactly the size and shape that can block an airway.",
        "Using lean, quick-cooked cuts that never reach a shreddable texture.",
      ],
      cutDiagram: "strips",
      media: [],
    },
    {
      band: "9-12m",
      form: "Finely shredded braised beef or well-cooked ground beef, kept moist with cooking liquid, in soft pieces between pea and pinky-nail size.",
      passFailTest:
        "Squeeze a pinch between two fingers — it should mash into soft fibers, not spring back or crumble into dry grains. Dry crumbs go back into the pot with a splash of liquid.",
      whyThisForm:
        "The pincer grasp emerges around 9 months, so small, soft, slightly clumpy pieces let the baby practice precise pickup while the moisture keeps each bite easy to gum and swallow.",
      prepSteps: [
        "Braise as for 6–8 months, then chop the shredded meat into pea-to-pinky-nail pieces.",
        "For ground beef, simmer crumbles in a little water or unsalted broth until fully cooked, then stir in extra liquid until the mince clumps softly.",
        "Scatter a few pieces at a time on the tray to prevent cheek-stuffing.",
      ],
      commonMistakes: [
        "Browning ground beef until it's dry and pebbly — babies pocket dry crumbs in their cheeks or gag on them.",
        "Pieces larger than a pinky nail, which outmatch a gummy chew.",
      ],
      cutDiagram: "shred",
      media: [],
    },
    {
      band: "12-24m",
      form: "Soft, slow-cooked beef cut across the grain into bite-size pieces no bigger than your pinky fingernail, still moist enough to mash between two fingers.",
      passFailTest:
        "Press a piece between thumb and finger — it should flatten and separate into fibers. If it stays a firm nugget, it needs more cooking time or a smaller cut.",
      whyThisForm:
        "First molars arrive in this window, but grinding a tough or dry piece of meat into a safe swallow is still years away — cutting across the grain shortens the fibers so each bite falls apart easily.",
      prepSteps: [
        "Serve tender braised or stewed beef from the family meal, cut across the grain into pinky-nail pieces.",
        "Moisten with pan juices, unsalted gravy, or a tomato-based sauce before plating.",
      ],
      commonMistakes: [
        "Graduating to steak cubes or dry roast because the toddler 'has teeth' — front teeth bite, they don't grind.",
      ],
      cutDiagram: "bite-size",
      media: [],
    },
  ],
  firstFoodPick: true,
  flavorPairings: ["sweet-potato", "carrot", "broccoli", "polenta"],
  tips: [
    "Fat is your friend: marbled cuts like chuck or short rib braise to a shreddable texture that lean cuts like sirloin never reach.",
    "Save every drop of the braising liquid — a spoonful stirred in just before serving rescues meat that has dried out in the fridge.",
    "A slow cooker on low for 6–8 hours turns one cheap roast into a week of baby-ready shreds; freeze portions flat in their liquid.",
    "If shredded beef slips out of a slippery fist, serve the 6–8 month strip slightly cooler — the surface gets tackier and easier to grip.",
  ],
  sources: [SOURCES.wicGuide, SOURCES.aapStartingSolids, SOURCES.cdcChokingHazards],
};

export default beef;
