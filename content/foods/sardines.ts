import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const sardines: Food = {
  slug: "sardines",
  name: "Sardines",
  aliases: ["canned sardines"],
  category: "protein",
  minAgeMonths: 6,
  ironRich: true,
  commonAllergen: "fish",
  chokingRisk: "moderate",
  chokingNotes:
    "The backbone and any intact spine segments are the hazard for early eaters, along with firm unmashed chunks. Mitigate by splitting each sardine, lifting out the backbone for babies under 12 months, and mashing the flesh thoroughly — the remaining hair-fine bones crush safely when the fish is well mashed.",
  nutritionHighlights: [
    "Soft, edible bones make sardines one of the best non-dairy calcium sources",
    "Rich in DHA omega-3s and vitamin D",
    "A low-mercury small fish, provides iron for the second half of the first year",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "One water-packed, no-salt-added sardine split open, backbone lifted out, and the flesh mashed with a fork to a uniform paste that is stirred into a familiar puree or spread on a spoon.",
      passFailTest:
        "Smear the mash between two fingers — it should feel uniformly soft with no gritty spine pieces; anything that feels like a hard fleck gets picked out or mashed again.",
      whyThisForm:
        "Young infants need sardine delivered as a smooth mash: it removes the backbone hazard, crushes the fine bones completely, and carries the fish allergen in a spoonable, familiar-textured form.",
      prepSteps: [
        "Choose sardines canned in water with no added salt; drain and split one lengthwise with a fork.",
        "Lift out the backbone and tail, then mash the flesh thoroughly until no distinct bone fragments remain.",
        "Mix into or serve alongside familiar foods, never another new food.",
        "First time: serve early in the day, a small amount, and watch for 2 hours.",
      ],
      commonMistakes: [
        "Leaving the backbone in for a young baby — it softens with canning but can still hold its shape in a small mouth.",
        "Buying oil-packed or salted varieties: the sodium is the problem, not the oil.",
        "A rough mash with intact chunks instead of a uniform paste.",
      ],
      cutDiagram: "mash",
      media: [],
    },
    {
      band: "9-12m",
      form: "Thoroughly mashed, backbone-removed sardine spread in a thin layer on a soft finger-width toast strip, or broken into moist pinky-nail flakes checked between the fingers.",
      passFailTest:
        "Rub each flake between your fingertips — it should mash to paste with no rigid bone pieces; the toast spread should be thin enough to see texture through.",
      whyThisForm:
        "A graspable strip suits new pincer-and-hand self-feeding, while the mash-or-fine-flake rule keeps bone fragments crushed until chewing is more capable.",
      prepSteps: [
        "Prepare as for 6–8 months (drained, split, backbone out, well mashed).",
        "Spread thinly on lightly toasted bread strips, or scatter small checked flakes on the tray.",
        "Keep servings to a whole sardine or less — they are rich, dense little fish.",
      ],
      commonMistakes: [
        "Handing over an intact sardine half with the spine still in it.",
        "A thick sardine layer on soft bread, which can gum into a sticky wad.",
      ],
      cutDiagram: "thin-spread",
      media: [],
    },
    {
      band: "12-24m",
      form: "Well-mashed whole sardine — soft bones and all — folded into pasta, mashed potato, or spread on toast, or soft bite-size pieces with the backbone crushed or removed.",
      passFailTest:
        "Press any piece between two fingers — flesh and bone should flatten together into a soft paste with nothing rigid left behind.",
      whyThisForm:
        "By this age the canning-softened bones are safe when thoroughly mashed into the flesh, turning the whole fish into a calcium-rich toddler food; intact spine segments are still worth crushing.",
      prepSteps: [
        "Mash a whole drained sardine, bones included, until completely uniform.",
        "Fold into pasta sauce, mashed potato, or avocado, or spread on toast fingers.",
      ],
      commonMistakes: [
        "Serving sardines straight from a salted or brined can — sodium stays the main watch-out through toddlerhood.",
      ],
      cutDiagram: "mash",
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["tomato", "bread", "avocado", "potato"],
  tips: [
    "Read the label twice: 'in water, no salt added' is the phrase you want — most sardine cans are brined or packed in salted oil.",
    "Mash with the back of a fork against the side of a bowl; a proper mash crushes the fine bones so completely you can't feel them.",
    "Sardines are among the lowest-mercury fish available, an easy pick for the couple of weekly fish servings recommended for young children.",
    "Mashed sardine disappears into tomato-based pasta sauce — a painless route for babies who balk at fish flavor on its own.",
  ],
  sources: [SOURCES.fdaFish, SOURCES.eatStudy, SOURCES.nhsFrom6Months],
  nutrients: ["calcium", "omega3", "vitaminD", "iron"],
  servingGuidance: [
    {
      band: "6-8m",
      typicalAmount:
        "A teaspoon or two of sardine mash stirred into a familiar puree — a rich little fish, so small serves go a long way.",
      frequency: "1–2 times a week once tolerated, counting toward the weekly fish servings.",
    },
    {
      band: "9-12m",
      typicalAmount:
        "Half a sardine to one whole sardine, spread thin on a toast strip or flaked into small checked pieces.",
      frequency: "1–2 times a week — sardines are among the lowest-mercury fish.",
    },
    {
      band: "12-24m",
      typicalAmount:
        "One well-mashed sardine folded into pasta, potato, or a toast slice at a family meal.",
      frequency: "1–2 times a week keeps low-mercury fish in the routine.",
    },
  ],
  watchOuts: [
    "Most cans are brined or packed in salted oil — 'in water, no salt added' is the label that keeps sodium in check.",
  ],
  emoji: "🥫",
};

export default sardines;
