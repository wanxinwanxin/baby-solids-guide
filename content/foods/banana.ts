import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const banana: Food = {
  slug: "banana",
  name: "Banana",
  aliases: [],
  category: "fruit",
  minAgeMonths: 6,
  ironRich: false,
  commonAllergen: null,
  chokingRisk: "low",
  nutritionHighlights: [
    "A source of potassium, which supports fluid balance and muscle function",
    "Provides vitamin B6 for brain development",
    "Soft, energy-dense carbohydrate that needs no cooking at all",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "A ripe banana snapped in half with the bottom half of the peel left on, so a two-adult-finger length of fruit sticks up out of a non-slip peel handle.",
      passFailTest:
        "The ripeness press: a fingertip should dent the fruit easily and the flesh should show no green firmness. Then grip the peel handle yourself — the fruit shouldn't slide out of it.",
      whyThisForm:
        "Peeled banana shoots out of a small fist like a bar of wet soap; leaving the bottom half of the peel on gives a palmar-grasping baby a grippy, food-safe handle with soft fruit on top.",
      prepSteps: [
        "Choose a ripe banana — yellow with brown speckles, no green shoulders.",
        "Snap or cut it in half crosswise, keeping the peel on the serving half.",
        "Peel the top half of that piece down and trim the peel level, leaving a two-finger length of fruit exposed above a peel-covered base.",
        "Hand it over peel-end down and let the baby gnaw the exposed fruit.",
      ],
      commonMistakes: [
        "Serving a fully peeled chunk that squirts out of the fist and frustrates the baby.",
        "Using an underripe banana — firm, starchy fruit is harder to mash on gums and harsher on digestion.",
      ],
      cutDiagram: "wedge-handle",
      media: [],
    },
    {
      band: "9-12m",
      form: "Ripe banana split lengthwise into three natural segments by pressing a fingertip into the cut end, then chopped into pieces about the size of your pinky fingernail.",
      passFailTest:
        "Each piece should smash flat between two fingers with almost no pressure — ripe banana always passes; underripe pieces that hold their shape don't.",
      whyThisForm:
        "Splitting along the natural seams gives flat-sided pieces that are far easier for a new pincer grasp to hold than slippery round slices.",
      prepSteps: [
        "Peel the banana and press a fingertip gently into the cut end — it splits into three long segments along its natural seams.",
        "Chop the segments into pinky-nail pieces.",
        "If pieces still slip away, dust them lightly with dry infant oat cereal or finely ground peanut.",
      ],
      commonMistakes: [
        "Cutting round coin slices, which are both slippery and a less safe shape than irregular segment pieces.",
      ],
      cutDiagram: "bite-size",
      media: [],
    },
    {
      band: "12-24m",
      form: "A whole peeled ripe banana, or large hand-held pieces, that your toddler bites from directly, taking over the portioning with front teeth.",
      passFailTest:
        "Watch the first few bites: the toddler should bite off and chew modest mouthfuls; if they cram half the banana in at once, go back to cut pieces for a while.",
      whyThisForm:
        "Taking bites from a whole soft food teaches bite-size regulation — a skill toddlers need for bread, fruit, and everything else they'll hold and eat.",
      prepSteps: [
        "Peel fully or peel halfway and let the toddler manage the rest.",
        "Offer the banana whole and let them practice taking single bites.",
      ],
      commonMistakes: [
        "Only ever serving pre-cut pieces, which delays learning to take a measured bite.",
      ],
      media: [],
    },
  ],
  firstFoodPick: true,
  flavorPairings: ["peanut-butter", "oatmeal", "yogurt", "avocado"],
  tips: [
    "Ripeness is the whole recipe: yellow with brown speckles means sweet and gum-mashable; green shoulders mean starchy, firm, and constipating.",
    "The peel-handle trick works anywhere — no knife, no plate, no cooking — which makes banana the ultimate diaper-bag first food.",
    "For slippery pieces, a light dusting of dry infant oat cereal, hemp seeds, or finely ground peanut adds grip and a nutrition bonus.",
    "Too-ripe bananas aren't waste: mash into oatmeal or plain yogurt, or freeze peeled halves for smoothies and future banana bread.",
  ],
  sources: [SOURCES.wicGuide, SOURCES.nhsFrom6Months, SOURCES.aapStartingSolids],
};

export default banana;
