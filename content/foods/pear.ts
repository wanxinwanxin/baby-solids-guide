import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const pear: Food = {
  slug: "pear",
  name: "Pear",
  aliases: [],
  category: "fruit",
  minAgeMonths: 6,
  ironRich: false,
  commonAllergen: null,
  chokingRisk: "moderate",
  chokingNotes:
    "A firm, underripe pear is as hard as raw apple and can break into airway-sized chunks. Mitigate by serving only pears ripe enough to squish like avocado, or by steaming firm wedges until a fork slides in with no resistance.",
  nutritionHighlights: [
    "Gentle fiber plus natural sorbitol, which helps keep stools soft during the transition to solids",
    "A source of vitamin C to support the immune system",
    "High water content that contributes to hydration",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "A wedge of very ripe pear about the length and width of two adult fingers, skin left on the lower half as a non-slip handle, with the flesh soft enough to squish like ripe avocado.",
      passFailTest:
        "Press the flesh with a fingertip — it should dent as easily as ripe avocado. If it resists, steam the wedges for 8–10 minutes and test again.",
      whyThisForm:
        "At this age babies trap food in a whole-fist palmar grasp and gnaw on the part sticking out, so a long wedge with a skin-covered grip end stays in the fist instead of shooting out.",
      prepSteps: [
        "Confirm ripeness: the flesh near the stem should give under gentle thumb pressure.",
        "Quarter the pear lengthwise, cut out the core and seeds, and slice into two-finger-sized wedges.",
        "Peel only the top half of each wedge, leaving skin on the lower half as the baby's handle.",
        "If the pear is firm, steam the wedges 8–10 minutes until they pass the avocado-squish test, then cool.",
      ],
      commonMistakes: [
        "Serving a crunchy, underripe pear raw — firmness, not the fruit itself, is the hazard.",
        "Peeling the whole wedge, which turns it into a bar of soap that slides out of a wet fist.",
        "Cutting pieces too small for a palmar grasp, leaving the baby frustrated and unfed.",
      ],
      cutDiagram: "wedge-handle",
      media: [],
    },
    {
      band: "9-12m",
      form: "Very ripe or steamed pear, skin removed, chopped into soft irregular pieces about the size of your pinky fingernail that flatten easily between two fingers.",
      passFailTest:
        "Press a piece between thumb and forefinger — it should flatten with almost no effort. Pieces that hold their shape under pressure need more ripening or a few minutes of steaming.",
      whyThisForm:
        "Around 9 months the pincer grasp emerges, and small, soft, irregular pieces let the baby practice picking food up between thumb and forefinger while staying easy to mash with bare gums.",
      prepSteps: [
        "Peel, quarter, and core a ripe pear (or use steamed wedges from the freezer stash).",
        "Chop into rough pinky-nail-sized pieces — ragged edges grip better than smooth cubes.",
        "Offer a few pieces at a time to discourage cheek-stuffing.",
      ],
      commonMistakes: [
        "Pieces so juicy and slick they frustrate the baby — roll them in a pinch of ground oat cereal for traction.",
        "Reverting to firm raw pear because the baby handles soft pieces well — texture, not skill, is what changed.",
      ],
      cutDiagram: "bite-size",
      media: [],
    },
    {
      band: "12-24m",
      form: "Ripe pear in thin slices or bite-size chunks with the skin on or off, while hard, crunchy pears still get steamed or thinly shaved before serving.",
      passFailTest:
        "Bite a slice yourself: if it crunches audibly, it is too firm to serve as-is — steam it soft or shave it paper-thin.",
      whyThisForm:
        "Toddlers are gaining molars but still grind unevenly, so soft slices are safe practice while a hard raw pear chunk behaves like raw apple in the airway.",
      prepSteps: [
        "Slice ripe pear into thin wedges or chunks and serve alongside family meals.",
        "For a firm pear, steam wedges until fork-tender or shave paper-thin ribbons with a vegetable peeler.",
      ],
      commonMistakes: [
        "Handing over a whole hard pear to bite from — large bites of firm fruit are still a choking risk at this age.",
      ],
      media: [],
    },
  ],
  firstFoodPick: true,
  flavorPairings: ["oatmeal", "yogurt", "chicken", "almond-butter"],
  tips: [
    "Ripeness check: press gently next to the stem — pears ripen from the inside out, so a stem end that yields means the whole fruit is ready.",
    "Speed up a rock-hard pear by sealing it in a paper bag with a banana for 1–2 days at room temperature.",
    "Batch-steam firm pear wedges, freeze them flat on a tray, and thaw a few at a time — thawed steamed pear is reliably squishable.",
    "If ripe pear pieces keep slipping out of little fingers, a dusting of dry infant oat cereal adds grip without changing the flavor much.",
  ],
  sources: [SOURCES.wicGuide, SOURCES.nhsFrom6Months, SOURCES.aapChoking],
  nutrients: ["fiber", "vitaminC"],
  servingGuidance: [
    {
      band: "6-8m",
      typicalAmount:
        "One ripe wedge at a time — a piece or two per meal is plenty of practice material.",
    },
    {
      band: "9-12m",
      typicalAmount:
        "A small handful of soft pieces — top up while interest lasts.",
    },
    {
      band: "12-24m",
      typicalAmount:
        "Half a pear in slices or chunks with a meal — the toddler sets the amount.",
    },
  ],
  watchOuts: [
    "Pear's natural sorbitol gently loosens stools — handy during constipated stretches, worth easing off during loose ones.",
  ],
  emoji: "🍐",
};

export default pear;
