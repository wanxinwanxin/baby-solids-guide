import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const venison: Food = {
  slug: "venison",
  name: "Venison",
  aliases: ["deer meat"],
  category: "protein",
  minAgeMonths: 6,
  ironRich: true,
  commonAllergen: null,
  chokingRisk: "moderate",
  chokingNotes:
    "Venison is among the leanest red meats, so it turns firm, dry, and crumbly quickly — and dry, firm meat is what lodges in an airway. Mitigate by slow-cooking fully submerged in liquid until it shreds under finger pressure, remoistening generously at every serving, and never offering cubes or dry crumbles.",
  nutritionHighlights: [
    "Exceptionally rich in heme iron, the form babies absorb most easily",
    "Provides zinc and vitamin B12 for growth and brain development",
    "One of the leanest red meats, with high-quality protein in every bite",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "A slow-cooked venison strip about the length and width of two adult fingers that shreds under gentle finger pressure and stays glossy with cooking liquid, or finely shredded mince moistened heavily and folded into a familiar puree.",
      passFailTest:
        "The shred test: pinch the strip between thumb and forefinger and twist — the fibers should pull apart with almost no effort and feel moist rather than powdery; resistance means more time in the pot.",
      whyThisForm:
        "Babies at this age gnaw on food held in a whole-fist palmar grasp, so a long, tender strip works as a handle, while heavily moistened shreds in puree carry this iron-dense meat to spoon-fed babies.",
      prepSteps: [
        "Choose a venison shoulder or neck roast, cover completely with unsalted broth or water, and slow-cook at a bare simmer for 3 hours or more — this very lean meat collapses only with long, wet cooking.",
        "Pull a piece with the grain into a strip about two adult fingers long and one wide, and run the shred test.",
        "Spoon cooking liquid generously over the strip just before it goes on the tray, and again if it sits for more than a few minutes.",
        "Alternatively, simmer ground venison gently in liquid, stir in extra broth until the mince clumps softly, and fold into a familiar vegetable puree.",
      ],
      commonMistakes: [
        "Serving dry, crumbly meat — venison has almost no internal fat, so dryness is the classic mistake and moisture must come from the pot.",
        "Roasting or pan-searing like a steak; quick-cooked venison never reaches a shreddable texture.",
        "Cutting cubes or chunks: a firm cube is exactly the size and shape that can block an airway.",
      ],
      cutDiagram: "strips",
      media: [],
    },
    {
      band: "9-12m",
      form: "Finely shredded slow-cooked venison or gently simmered ground venison, drenched in cooking liquid, in soft pieces between pea and pinky-nail size.",
      passFailTest:
        "Squeeze a pinch between two fingers — it should mash into moist fibers; dry grains that crumble apart go back into the pot with a generous splash of liquid.",
      whyThisForm:
        "Small, moist, slightly clumpy pieces suit the pincer grasp emerging around 9 months, and constant remoistening does the work the missing fat can't.",
      prepSteps: [
        "Slow-cook as for 6–8 months, then chop the shredded meat into pea-to-pinky-nail pieces.",
        "For ground venison, simmer crumbles in unsalted broth over low heat and keep folding in liquid until every piece is glossy.",
        "Scatter a few pieces at a time on the tray to prevent cheek-stuffing.",
      ],
      commonMistakes: [
        "Browning ground venison until dry and pebbly — babies pocket dry crumbs in their cheeks or gag on them.",
        "Serving leftovers straight from the fridge; lean venison dries overnight and needs liquid worked back in.",
      ],
      cutDiagram: "shred",
      media: [],
    },
    {
      band: "12-24m",
      form: "Tender slow-cooked venison cut across the grain into bite-size pieces no bigger than a pinky fingernail, coated in pan juices, unsalted gravy, or a fruit-sweetened sauce.",
      passFailTest:
        "Press a piece between thumb and finger — it should flatten and separate into fibers; a piece that stays a firm, dry nugget needs more sauce and a smaller cut.",
      whyThisForm:
        "New molars cannot yet grind tough, dry meat, so cross-grain cutting shortens the fibers while a moist sauce keeps this fat-free meat swallowable.",
      prepSteps: [
        "Serve tender stewed venison from the family meal, cut across the grain into pinky-nail pieces.",
        "Coat generously with cooking juices or a soft sauce before plating — plain and dry is never the serve.",
      ],
      commonMistakes: [
        "Offering venison steak or jerky because the toddler 'has teeth' — front teeth bite, they don't grind, and jerky is both tough and salty.",
      ],
      cutDiagram: "bite-size",
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["cherries", "sweet-potato", "potato", "carrot"],
  tips: [
    "Wet heat or nothing: venison shoulder or neck slow-cooked fully submerged for 3+ hours shreds beautifully, while any dry-heat method leaves it tough.",
    "Bank the cooking liquid — venison needs remoistening at the pot, on the tray, and again with every reheated leftover.",
    "A spoonful of fruit puree such as cherry or prune stirred through the shreds softens venison's gamey edge for first tastes.",
    "Ground venison mixed half-and-half with mashed potato or sweet potato makes soft, iron-rich spoonfuls that never dry out.",
  ],
  sources: [SOURCES.wicGuide, SOURCES.aapStartingSolids, SOURCES.cdcChokingHazards],
  nutrients: ["iron", "zinc", "protein"],
  servingGuidance: [
    {
      band: "6-8m",
      typicalAmount:
        "One slow-cooked strip or a tablespoon of well-moistened shredded mince folded into puree — even a few gnaws deliver meaningful iron.",
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
        "A few tablespoons of sauced, tender pieces from the family stew — appetite swings day to day, and that's normal.",
    },
  ],
  watchOuts: [
    "Wild venison taken with lead ammunition can carry tiny lead fragments well beyond the visible wound area — farmed venison, or wild meat harvested with lead-free ammunition, is the safer choice for babies and toddlers.",
  ],
  emoji: "🦌",
};

export default venison;
