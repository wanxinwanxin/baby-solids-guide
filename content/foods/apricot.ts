import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const apricot: Food = {
  slug: "apricot",
  name: "Apricot",
  aliases: [],
  category: "fruit",
  minAgeMonths: 6,
  ironRich: false,
  commonAllergen: null,
  chokingRisk: "moderate",
  chokingNotes:
    "The small, smooth pit is deceptively close to airway size, and underripe apricot flesh is firm enough to break off in hard lumps. Mitigate by pitting every apricot and sweeping the cavity for fragments, serving only fingertip-soft or steamed flesh, and chopping sticky dried apricots into rice-grain bits.",
  nutritionHighlights: [
    "One of the best fruit sources of beta-carotene, which the body converts to vitamin A for eyes and immunity",
    "Provides vitamin C, which helps absorb iron from plant foods",
    "Skin-on flesh brings gentle fiber for digestion",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "A ripe apricot half with the pit removed and the cavity checked, skin left on for grip, about half-palm sized and soft enough to dent under gentle fingertip pressure.",
      passFailTest:
        "Press the flesh with a fingertip — it should dent like ripe avocado. A half that springs back needs 5–8 minutes in the steamer first.",
      whyThisForm:
        "At this age babies trap food in a whole-fist palmar grasp, and a soft domed half with its faintly fuzzy skin on gives a wet fist traction while the flesh mashes against bare gums.",
      prepSteps: [
        "Wash the apricot, split it along the seam with your thumbs, and lift the pit out.",
        "Run a fingertip through the cavity to catch any pit fragment before serving.",
        "Steam firm halves 5–8 minutes until they pass the fingertip-dent test, then cool.",
        "Serve one half at a time, skin side out in the baby's fist.",
      ],
      commonMistakes: [
        "Serving a firm, mealy apricot raw — only truly ripe or steamed flesh is gum-mashable.",
        "Peeling the half, which removes the natural non-slip surface.",
        "Forgetting that the small pit still needs the same respect as a peach pit.",
      ],
      cutDiagram: "wedge-handle",
      media: [],
    },
    {
      band: "9-12m",
      form: "Ripe or steamed apricot in quarters or chopped soft pieces about the size of your pinky fingernail, skin on or off, each flattening easily between two fingers.",
      passFailTest:
        "Squeeze a piece between two fingers — it should flatten with gentle pressure. Anything that resists goes back in the steamer.",
      whyThisForm:
        "The pincer grasp emerges around 9 months, and small, soft, irregular pieces feed that new skill while staying safe to gum and swallow.",
      prepSteps: [
        "Pit and check the cavity, then quarter or chop the flesh into pinky-nail-sized pieces.",
        "Scatter a few pieces at a time on the tray to prevent cheek-stuffing.",
        "Roll slippery pieces in a pinch of ground oat cereal for grip.",
      ],
      commonMistakes: [
        "Staying on purees only through this window when chewing skills are easiest to build.",
        "Serving whole dried apricots — they are dense and sticky; save them, chopped fine, for later.",
      ],
      cutDiagram: "bite-size",
      media: [],
    },
    {
      band: "12-24m",
      form: "Fresh apricot in pitted skin-on quarters or chunks, and dried apricot only chopped into rice-grain-sized bits or soaked in warm water until soft and pliable.",
      passFailTest:
        "Fresh pieces should give without a crunch when you bite one; a dried bit should squash flat between two fingers after its soak or chop.",
      whyThisForm:
        "Toddlers handle quarters with emerging molars, but dried apricots are chewy, sticky sugar-dense lumps that can wad in the mouth unless cut very small.",
      prepSteps: [
        "Pit and quarter fresh apricots for self-feeding alongside family meals.",
        "For dried apricots, choose unsulfured ones and chop into rice-grain bits, or soak 10 minutes in warm water first.",
      ],
      commonMistakes: [
        "Handing over whole or halved dried apricots — the sticky, dense texture is a wadding hazard well into toddlerhood.",
      ],
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["yogurt", "oatmeal", "chicken", "lamb"],
  tips: [
    "Ripeness test: a ready apricot is fragrant, deep orange rather than pale yellow, and yields to a gentle thumb press.",
    "Make the pit ritual automatic: split, lift, then sweep the cavity with a fingertip every single time.",
    "Ripen firm apricots in a paper bag for 1–2 days; steaming rescues any that stay stubbornly firm.",
    "For dried apricots pick the dull brown unsulfured kind — the neon-orange ones are treated with sulfites.",
  ],
  sources: [SOURCES.wicGuide, SOURCES.nhsFrom6Months, SOURCES.aapStartingSolids],
  nutrients: ["vitaminA", "vitaminC", "fiber"],
  servingGuidance: [
    {
      band: "6-8m",
      typicalAmount:
        "One skin-on half at a time — a half or two per meal; sucking and gumming the flesh is legitimate eating.",
    },
    {
      band: "9-12m",
      typicalAmount:
        "A small handful of soft pieces or a couple of quarters — refill while the interest lasts.",
    },
    {
      band: "12-24m",
      typicalAmount:
        "One to two fresh apricots in quarters with a meal, or a teaspoon or two of chopped dried bits stirred into oatmeal.",
    },
  ],
  watchOuts: [
    "Apricots carry sorbitol, which can loosen stools — build up from small servings.",
    "Most bright-orange dried apricots are preserved with sulfites, which can bother sensitive airways — choose unsulfured (brown) ones.",
    "Dried apricots are concentrated sticky sugar — treat them as a small stir-in, not a bowl food.",
  ],
  emoji: "🟠",
};

export default apricot;
