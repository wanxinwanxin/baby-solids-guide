import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const strawberry: Food = {
  slug: "strawberry",
  name: "Strawberry",
  aliases: [],
  category: "fruit",
  minAgeMonths: 6,
  ironRich: false,
  commonAllergen: null,
  chokingRisk: "moderate",
  chokingNotes:
    "A firm whole strawberry is round enough and dense enough to wedge in a small airway. Mitigate by mashing large ripe berries flat, slicing them thin, and quartering any small or firm berry — never serve a firm berry whole.",
  nutritionHighlights: [
    "One of the richest common fruits in vitamin C, which also helps absorb iron from plant foods",
    "A source of folate for cell growth",
    "Provides gentle fiber for digestion",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "A large, deeply ripe strawberry with the leafy hull removed, either mashed flat between your fingers into a rough pancake or sliced into thin, floppy slices.",
      passFailTest:
        "Press the berry between thumb and forefinger — a serve-ready berry flattens with light pressure. A berry that holds its round shape must be sliced thin or mashed, never served whole.",
      whyThisForm:
        "Babies this age mash food against the palate with their gums, so a flattened or thin-sliced berry has no round profile left to lodge in the airway while staying easy to rake into a fist.",
      prepSteps: [
        "Wash the berries and cut off the leafy hull and any hard white shoulder.",
        "For a big ripe berry, smash it flat between your fingers or the back of a fork.",
        "Alternatively slice lengthwise into thin, floppy slices, or stir mashed berry into oatmeal or yogurt.",
      ],
      commonMistakes: [
        "Serving a firm whole berry because it looks small — round and firm is exactly the dangerous combination.",
        "Skipping strawberries entirely over a red ring around the mouth: acid contact rash is skin irritation, not an allergic reaction.",
        "Leaving the hard white core in an underripe berry instead of trimming it out.",
      ],
      cutDiagram: "mash",
      media: [],
    },
    {
      band: "9-12m",
      form: "Ripe strawberries cut into thin slices or quartered lengthwise into slim wedges, with any small firm berry always quartered rather than halved or left whole.",
      passFailTest:
        "Look at each piece: nothing on the tray should be round in any orientation, and every piece should squash between two fingers without effort.",
      whyThisForm:
        "The pincer grasp is developing, so slim quarters and slices are pick-up-able practice pieces while the cut geometry removes the round shape that makes berries risky.",
      prepSteps: [
        "Hull the berries, then quarter lengthwise from stem end to tip, or slice thin.",
        "Quarter even the small berries — small plus firm is the riskiest kind.",
        "Serve a few pieces at a time; strawberry juice makes slick fingers fast.",
      ],
      commonMistakes: [
        "Halving small berries instead of quartering — a half can still present a rounded dome.",
        "Serving pieces so juicy they slide: a light dusting of ground oat cereal restores grip.",
      ],
      cutDiagram: "quarter-lengthwise",
      media: [],
    },
    {
      band: "12-24m",
      form: "Ripe strawberries quartered or sliced for most toddlers, moving to halves of soft berries late in this window once chewing is reliably strong.",
      passFailTest:
        "The two-finger squish still applies: any berry that resists flattening gets sliced or quartered no matter how old the toddler is.",
      whyThisForm:
        "Molars are arriving but grinding is inconsistent, so cut geometry remains the safety layer while bigger pieces build biting confidence.",
      prepSteps: [
        "Hull, then quarter or slice; offer halves of very soft berries only when chewing is consistently good.",
        "Keep serving them plain or stirred into yogurt — no added sugar needed.",
      ],
      commonMistakes: [
        "Graduating to whole berries because the toddler has front teeth — front teeth bite, they don't grind.",
      ],
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["yogurt", "oatmeal", "banana"],
  tips: [
    "A red, blotchy ring around the mouth or chin after strawberries is almost always acid contact rash, not an allergy — a smear of barrier balm before eating and a water wipe after usually prevents it.",
    "Buy the biggest, ripest berries you can find for babies: big and ripe means easy to mash flat, while small firm berries are the ones that demand careful quartering.",
    "Underripe berries with white shoulders can be simmered for 2–3 minutes to soften before mashing.",
    "Mash a batch into plain yogurt or oatmeal and freeze in cubes for instant fruit servings.",
  ],
  sources: [SOURCES.wicGuide, SOURCES.nhsFrom6Months, SOURCES.aapChoking],
};

export default strawberry;
