import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const chicken: Food = {
  slug: "chicken",
  name: "Chicken",
  aliases: [],
  category: "protein",
  minAgeMonths: 6,
  ironRich: true,
  commonAllergen: null,
  chokingRisk: "moderate",
  chokingNotes:
    "Dry chicken chunks and stray bits of bone, cartilage, or slippery skin are the hazards. Mitigate by cooking dark meat until it shreds, moistening every serving with cooking liquid, and stripping skin, cartilage, and any loose bone fragments before the drumstick handle goes on the tray.",
  nutritionHighlights: [
    "Dark meat (thigh and drumstick) supplies well-absorbed heme iron and zinc",
    "Complete protein that supports rapid growth in the second half of the first year",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "A whole braised drumstick with the skin, cartilage, and any loose bone bits removed so the bone works as a built-in handle, or a slow-cooked thigh strip the length and width of two adult fingers.",
      passFailTest:
        "Pinch the meat between thumb and forefinger — it should shred into soft strands without tugging, and a fingertip run over the whole drumstick should find no gristle or bone splinters.",
      whyThisForm:
        "A 6-month-old grips with the whole fist and gnaws whatever sticks out — a drumstick bone is a ready-made handle, and shreddable dark meat yields to bare gums where breast chunks will not.",
      prepSteps: [
        "Braise drumsticks or boneless thighs in unsalted water or broth at a gentle simmer for 45–60 minutes until the meat pulls apart easily.",
        "For the drumstick: peel off all skin, snap off and discard the cartilage cap and the thin splinter bone alongside the main bone, and check the surface with a fingertip.",
        "Spoon cooking liquid over the meat just before serving so it stays moist.",
        "Alternatively, shred thigh meat finely, moisten well, and fold it into a familiar vegetable puree.",
      ],
      commonMistakes: [
        "Serving dry roasted or grilled breast — it crumbles into dry wads that are hard to gum and swallow.",
        "Leaving skin or cartilage on the drumstick: both can peel off in a slick, unchewable sheet.",
        "Forgetting the thin pin-like fibula bone that runs beside the drumstick's main bone.",
      ],
      cutDiagram: "wedge-handle",
      media: [],
    },
    {
      band: "9-12m",
      form: "Finely shredded or ground dark-meat chicken, kept glossy with cooking liquid, in soft pieces between pea and pinky-nail size.",
      passFailTest:
        "Press a pinch between two fingers — it should mash flat into moist fibers; dry crumbs that scatter mean it needs a splash of broth and a stir.",
      whyThisForm:
        "The pincer grasp arrives around 9 months, and small moist shreds let the baby practice thumb-and-finger pickup while staying soft enough to manage without molars.",
      prepSteps: [
        "Cook thighs as for 6–8 months, then chop the shreds into pea-to-pinky-nail pieces.",
        "For ground chicken, simmer in a little unsalted broth until cooked through and stir until it clumps softly.",
        "Offer a small scatter of pieces at a time, refilling as the tray clears.",
      ],
      commonMistakes: [
        "Letting shredded chicken sit uncovered and dry out — remoisten every serving.",
        "Switching to chunks of breast meat before the texture skills are there.",
      ],
      cutDiagram: "shred",
      media: [],
    },
    {
      band: "12-24m",
      form: "Soft, well-cooked chicken cut across the grain into bite-size pieces no bigger than a pinky fingernail, moist enough to flatten between two fingers.",
      passFailTest:
        "Squash a piece between thumb and finger — it should separate into strands rather than stay a firm nugget; firm pieces get diced smaller or braised longer.",
      whyThisForm:
        "Molars are only starting to erupt, so short cross-grain fibers and plenty of moisture still do the grinding work the toddler's jaw cannot.",
      prepSteps: [
        "Cut tender chicken from the family meal across the grain into pinky-nail pieces.",
        "Toss with pan juices, unsalted gravy, or a soft sauce before serving.",
      ],
      commonMistakes: [
        "Serving dry cubed breast or nugget-style pieces because the toddler 'eats everything now' — dryness remains the hazard.",
      ],
      cutDiagram: "bite-size",
      media: [],
    },
  ],
  firstFoodPick: true,
  flavorPairings: ["carrot", "sweet-potato", "rice", "avocado"],
  tips: [
    "Reach for thighs and drumsticks over breast: dark meat has more fat and connective tissue, so it braises moist and shreddable instead of dry and stringy.",
    "Poach in enough liquid to cover, and store leftovers submerged in that liquid — chicken dries out in the fridge faster than any other meat.",
    "One batch of braised thighs shreds into a week of meals: freeze flat in cooking liquid and rewarm portions in a covered pan.",
    "If a drumstick is too heavy for little hands, a two-finger strip of thigh meat gives the same palmar-grasp handle at half the weight.",
  ],
  sources: [SOURCES.wicGuide, SOURCES.aapStartingSolids, SOURCES.aapChoking],
};

export default chicken;
