import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const kiwi: Food = {
  slug: "kiwi",
  name: "Kiwi",
  aliases: ["kiwifruit"],
  category: "fruit",
  minAgeMonths: 6,
  ironRich: false,
  commonAllergen: null,
  chokingRisk: "low",
  nutritionHighlights: [
    "Gram for gram richer in vitamin C than oranges, helping absorb iron from plant foods",
    "A source of fiber that supports regular digestion",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "A very ripe kiwi peeled and cut lengthwise into quarters, giving soft wedges about the size of two adult fingers that dent under a fingertip like ripe banana.",
      passFailTest:
        "Press a wedge with a fingertip — it should dent like ripe banana. A wedge that stays firm is underripe: too tart and too hard for gums, so let it ripen a few more days.",
      whyThisForm:
        "A long soft wedge suits the whole-fist palmar grasp of this age, and only truly ripe kiwi is soft enough to mash against the palate with bare gums.",
      prepSteps: [
        "Confirm ripeness: the whole fruit should give under gentle thumb pressure like a ripe peach.",
        "Peel completely — the fuzzy skin is chewy and unpleasant for young babies.",
        "Cut lengthwise into quarters and serve one wedge at a time.",
        "If wedges are too slippery, roll the grip end in a pinch of ground oat cereal.",
      ],
      commonMistakes: [
        "Serving a firm kiwi — hard, sour kiwi is both a texture problem and a guaranteed grimace.",
        "Reading the pucker-face as a bad sign: a tartness reaction is a flavor opinion, not an allergy.",
        "Leaving the hard white core stub at the stem end on the wedge — trim it off.",
      ],
      cutDiagram: "quarter-lengthwise",
      media: [],
    },
    {
      band: "9-12m",
      form: "Ripe kiwi peeled and chopped into soft pieces about the size of your pinky fingernail, each one squashing flat between two fingers with light pressure.",
      passFailTest:
        "The two-finger squish: a serve-ready piece flattens easily. Firm pieces mean the fruit needs more counter time before it's baby food.",
      whyThisForm:
        "Small soft pieces feed the emerging pincer grasp at 9 months, and ripe kiwi's melting texture makes it safe to swallow after minimal gumming.",
      prepSteps: [
        "Peel a ripe kiwi, trim the firm core end, and chop into pinky-nail pieces.",
        "Offer a few pieces at a time; kiwi juice makes trays slick fast.",
        "Dust extra-slippery pieces with ground oat cereal for grip.",
      ],
      commonMistakes: [
        "A red ring around the mouth causing alarm — kiwi's acidity irritates skin on contact, which is not the same thing as an allergic reaction.",
      ],
      cutDiagram: "bite-size",
      media: [],
    },
    {
      band: "12-24m",
      form: "Ripe peeled kiwi in thick slices, finger-width wedges, or bite-size chunks for self-feeding, with a halved kiwi and a spoon as a fun scoop-it-yourself option.",
      passFailTest:
        "The fruit should still dent under a fingertip; if you would describe the bite as crisp, it goes back in the fruit bowl to ripen.",
      whyThisForm:
        "Toddlers handle bigger soft pieces and can practice utensil skills — a kiwi half with a small spoon is a self-contained scooping lesson.",
      prepSteps: [
        "Peel and slice, or halve the kiwi crosswise and hand it over with a toddler spoon.",
        "Keep serving it plain — the bright tartness itself is useful flavor exposure.",
      ],
      commonMistakes: [
        "Dropping kiwi after a few tart-face rejections — repeated low-pressure exposure is how sour flavors get accepted.",
      ],
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["banana", "yogurt", "oatmeal"],
  tips: [
    "Ripen firm kiwis in a paper bag with a banana for 2–3 days; a ripe one yields to gentle thumb pressure all over.",
    "The tart pucker-face is a reaction to acidity, not an allergy — mild tingle-mouth complaints are worth mentioning to your pediatrician, but a funny face alone is just flavor feedback.",
    "Gold kiwis are noticeably sweeter and softer than green ones — an easier first kiwi for a skeptical baby.",
    "Halve and spoon-scoop for prep-free serving: one clean cut and the skin becomes the bowl.",
  ],
  sources: [SOURCES.wicGuide, SOURCES.nhsFrom6Months, SOURCES.aapStartingSolids],
};

export default kiwi;
