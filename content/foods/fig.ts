import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const fig: Food = {
  slug: "fig",
  name: "Fig",
  aliases: [],
  category: "fruit",
  minAgeMonths: 6,
  ironRich: false,
  commonAllergen: null,
  chokingRisk: "low",
  nutritionHighlights: [
    "A genuinely good fruit source of fiber, with the tiny edible seeds adding to the effect",
    "Provides potassium, which supports fluid balance and muscle function",
    "Ripe figs are jammy-sweet with zero added sugar — a natural dessert food",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "A fully ripe fresh fig, stem nub trimmed, quartered from stem to base into soft thumb-sized wedges with the skin left on as the grip surface.",
      passFailTest:
        "Press a quarter with a fingertip — the inside of a ripe fig should feel like thick jam. If the flesh is firm or dry, choose a riper fig.",
      whyThisForm:
        "A palmar-grasping baby holds the skin side in the fist and gums the jammy interior — the skin is the handle, and truly ripe fig flesh is nearly spreadable, needing no teeth at all.",
      prepSteps: [
        "Wash the fig gently and trim off the hard little stem nub.",
        "Quarter lengthwise from stem end to base so each wedge has skin along its back.",
        "Run the fingertip test on the flesh, then serve one wedge at a time, skin side into the fist.",
      ],
      commonMistakes: [
        "Serving an underripe fig — firm flesh and a milky stem end mean it is not ready for gums.",
        "Leaving the woody stem nub attached to a wedge.",
        "Offering dried figs at this age — they are dense, sticky, and belong to a later stage in a finer form.",
      ],
      cutDiagram: "wedge-handle",
      media: [],
    },
    {
      band: "9-12m",
      form: "Ripe fresh fig chopped into soft skin-on pieces about the size of your pinky fingernail, each squashing to jam between two fingers.",
      passFailTest:
        "Squeeze a piece — it should collapse into jam with gentle pressure. Firm or rubbery pieces mean an underripe fig.",
      whyThisForm:
        "Small, soft, seed-speckled pieces are ideal pincer-grasp practice, and the slight tackiness of ripe fig actually helps little fingers keep hold.",
      prepSteps: [
        "Trim the stem nub, then chop a ripe fig into pinky-nail-sized pieces.",
        "Scatter a few pieces at a time on the tray to prevent cheek-stuffing.",
        "If introducing dried fig, chop it to rice-grain bits and soak in warm water for 10 minutes first.",
      ],
      commonMistakes: [
        "Serving dried fig in halves or chunks — unsoaked dried fig is a chewy, sticky wad.",
        "Assuming the seeds are a problem — fig seeds are tiny, soft, and entirely edible.",
      ],
      cutDiagram: "bite-size",
      media: [],
    },
    {
      band: "12-24m",
      form: "Fresh fig in quarters or halves for self-feeding, and dried fig only chopped into rice-grain-sized bits or soaked until it squashes flat between two fingers.",
      passFailTest:
        "Fresh pieces should collapse to jam under a fingertip; a dried bit should flatten between two fingers after its soak or fine chop.",
      whyThisForm:
        "Toddlers handle fresh fig wedges easily, but dried figs are dense, sticky sugar-concentrates that can wad in the mouth unless cut very small or rehydrated.",
      prepSteps: [
        "Trim, quarter, and serve fresh figs alongside family meals.",
        "For dried figs, snip into rice-grain bits with kitchen scissors or soak 10 minutes in warm water before chopping.",
      ],
      commonMistakes: [
        "Handing over a whole dried fig — the texture is closer to a fruit chew than to fresh fruit, and it clings to teeth.",
      ],
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["yogurt", "cheese", "oatmeal"],
  tips: [
    "Ripeness test: a ready fig droops on its stem, gives easily to a gentle squeeze, and may show a bead of nectar at its base — firm upright figs need more time.",
    "Figs bruise rather than ripen on the counter; buy them nearly ready and use them within a day or two.",
    "Kitchen scissors beat a knife for dried figs — snip straight into rice-grain bits over the oatmeal bowl.",
    "Out of fig season, a soaked and finely chopped dried fig stirred into porridge delivers the same flavor safely.",
  ],
  sources: [SOURCES.wicGuide, SOURCES.nhsFrom6Months, SOURCES.aapStartingSolids],
  nutrients: ["fiber", "potassium"],
  servingGuidance: [
    {
      band: "6-8m",
      typicalAmount:
        "One or two soft wedges per meal — gumming the jammy flesh out of the skin counts as eating.",
    },
    {
      band: "9-12m",
      typicalAmount:
        "Half a fig to a whole fig in small pieces, offered a few pieces at a time.",
    },
    {
      band: "12-24m",
      typicalAmount:
        "One fresh fig in quarters with a meal, or a teaspoon of chopped dried fig stirred into porridge.",
    },
  ],
  watchOuts: [
    "Figs are notably laxative — the fiber and seeds add up fast, so start with small amounts.",
    "Dried figs are concentrated sticky sugar — treat them as a small stir-in, not a snack bowl, and offer water after.",
  ],
  emoji: "🤎",
};

export default fig;
