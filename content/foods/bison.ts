import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const bison: Food = {
  slug: "bison",
  name: "Bison",
  aliases: ["buffalo", "ground bison"],
  category: "protein",
  minAgeMonths: 6,
  ironRich: true,
  commonAllergen: null,
  chokingRisk: "moderate",
  chokingNotes:
    "Bison is leaner than beef, so it dries into firm, crumbly pieces faster — and dry, firm meat is what lodges in an airway. Mitigate by braising low and slow with plenty of liquid, remoistening heavily at every serving, and never offering cubes or dry crumbles.",
  nutritionHighlights: [
    "Dense in heme iron, the form babies absorb most easily",
    "Provides zinc and vitamin B12 for growth and immune function",
    "Very lean, high-quality protein",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "A braised bison strip about the length and width of two adult fingers that shreds under gentle finger pressure and glistens with cooking liquid, or finely shredded mince moistened heavily and folded into a familiar puree.",
      passFailTest:
        "The shred test: pinch the strip between thumb and forefinger and twist — fibers should pull apart with almost no effort and feel moist, not powdery; a strip that fights back needs more time in the pot.",
      whyThisForm:
        "Babies at this age gnaw on food held in a whole-fist palmar grasp, so a long, tender strip works as a handle, while heavily moistened shreds in puree deliver iron to spoon-fed babies.",
      prepSteps: [
        "Choose a bison chuck or shoulder roast, cover with unsalted broth or water, and braise at a bare simmer for 2.5–3 hours until it collapses — lean bison needs the full time and full liquid coverage.",
        "Pull a piece with the grain into a strip about two adult fingers long and one wide, and run the shred test.",
        "Spoon cooking liquid generously over the strip just before serving — bison dries in minutes on an open tray.",
        "Alternatively, simmer ground bison gently in liquid, then stir in extra broth until the mince clumps softly, and fold into a familiar puree.",
      ],
      commonMistakes: [
        "Serving dry, crumbly meat — with a cut this lean, dryness arrives faster than with beef and is the classic mistake.",
        "Cooking bison by beef timings at beef heat; its low fat means it toughens sooner and needs gentler, longer braising.",
        "Cutting cubes or chunks: a firm cube is exactly the size and shape that can block an airway.",
      ],
      cutDiagram: "strips",
      media: [],
    },
    {
      band: "9-12m",
      form: "Finely shredded braised bison or gently simmered ground bison, drenched in cooking liquid, in soft pieces between pea and pinky-nail size.",
      passFailTest:
        "Squeeze a pinch between two fingers — it should mash into moist fibers; if it crumbles into dry grains, return it to the pot with a big splash of liquid before serving.",
      whyThisForm:
        "Small, moist, slightly clumpy pieces give the emerging pincer grasp precise-pickup practice while enough added liquid compensates for the fat this lean meat lacks.",
      prepSteps: [
        "Braise as for 6–8 months, then chop the shredded meat into pea-to-pinky-nail pieces.",
        "For ground bison, simmer crumbles in unsalted broth over low heat, then keep stirring in liquid until every piece looks glossy.",
        "Scatter a few pieces at a time on the tray to prevent cheek-stuffing.",
      ],
      commonMistakes: [
        "Browning ground bison hard like beef — it dries into pebbles that babies pocket in their cheeks or gag on.",
        "Serving refrigerated leftovers without remoistening; lean meat dries further overnight.",
      ],
      cutDiagram: "shred",
      media: [],
    },
    {
      band: "12-24m",
      form: "Slow-cooked bison cut across the grain into bite-size pieces no bigger than a pinky fingernail, kept moist with pan juices, unsalted gravy, or a tomato-based sauce.",
      passFailTest:
        "Press a piece between thumb and finger — it should flatten and separate into fibers; a firm, dry nugget goes back into the sauce, not onto the tray.",
      whyThisForm:
        "Molars are arriving but cannot yet grind tough or dry meat, so cross-grain cuts shorten the fibers and sauce supplies the moisture this lean meat cannot supply itself.",
      prepSteps: [
        "Serve tender braised or stewed bison from the family meal, cut across the grain into pinky-nail pieces.",
        "Coat the pieces in pan juices or a soft sauce before plating — never serve them dry.",
      ],
      commonMistakes: [
        "Offering bison burgers cooked to a firm, dry middle — lean patties need gentle cooking and a moist accompaniment.",
      ],
      cutDiagram: "bite-size",
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["sweet-potato", "broccoli", "polenta", "carrot"],
  tips: [
    "Treat bison as beef's leaner cousin: same braising method, gentler heat, more liquid, and roughly half the margin for error on dryness.",
    "Keep every drop of the braising liquid — bison needs remoistening at the pot, at the tray, and again with any leftovers.",
    "A slow cooker on low for 7–8 hours with the roast fully submerged is the most forgiving route to shreddable bison.",
    "Mixing ground bison half-and-half with a moist vegetable mash makes soft, iron-rich spoonfuls that never read as dry.",
  ],
  sources: [SOURCES.wicGuide, SOURCES.aapStartingSolids, SOURCES.cdcChokingHazards],
  nutrients: ["iron", "zinc", "protein"],
  servingGuidance: [
    {
      band: "6-8m",
      typicalAmount:
        "One braised strip or a tablespoon of well-moistened shredded mince folded into puree — even a few gnaws deliver meaningful iron.",
      frequency: "A few times a week works well as part of a daily iron-rich rotation.",
    },
    {
      band: "9-12m",
      typicalAmount:
        "One to two tablespoons of glossy shredded pieces, offered a scatter at a time — the baby sets the pace.",
    },
    {
      band: "12-24m",
      typicalAmount:
        "A few tablespoons of sauced, tender pieces from the family meal — appetite swings day to day, and that's normal.",
    },
  ],
  emoji: "🦬",
};

export default bison;
