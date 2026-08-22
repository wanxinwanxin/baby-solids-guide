import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const watermelon: Food = {
  slug: "watermelon",
  name: "Watermelon",
  aliases: [],
  category: "fruit",
  minAgeMonths: 6,
  ironRich: false,
  commonAllergen: null,
  chokingRisk: "low",
  nutritionHighlights: [
    "About nine-tenths water, making it a genuinely hydrating food in hot weather",
    "A source of vitamin C and the red pigment lycopene",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "A thin slab of seedless watermelon about the length and width of two adult fingers, hard rind completely removed and any stray white seeds picked out.",
      passFailTest:
        "Run a finger across both faces of the slab feeling for seeds, then squeeze one end — ripe watermelon crushes to juice between two fingers with almost no pressure.",
      whyThisForm:
        "A long, thin slab suits the whole-fist palmar grasp, and watermelon is soft enough that gums alone crush it — the only real hazards are the hard rind and hidden seeds.",
      prepSteps: [
        "Cut a slice from a seedless melon and trim off every bit of the hard rind, including the pale green layer.",
        "Cut into slabs roughly two adult fingers long and wide and about one finger thick.",
        "Inspect both faces and the edges for stray seeds — 'seedless' melons still hide soft white ones and the odd hard black one.",
        "Serve chilled from the fridge; cold melon soothes teething gums.",
      ],
      commonMistakes: [
        "Leaving rind on as a 'handle' — a gnawed-off chunk of hard rind is a real choking hazard, unlike the flesh.",
        "Skipping the seed check because the label says seedless.",
        "Serving over-thick blocks the baby can bite big crumbly chunks from.",
      ],
      cutDiagram: "strips",
      media: [],
    },
    {
      band: "9-12m",
      form: "Seedless watermelon in soft cubes about the size of your pinky fingernail, rind and seeds removed, served a few pieces at a time.",
      passFailTest:
        "Press a cube between two fingers — it should crush instantly to juice. Then double-check the pile for any seed fragments.",
      whyThisForm:
        "Small drippy cubes are easy pincer-grasp practice, and melon's crush-on-contact texture makes it one of the safer fruits for new self-feeders.",
      prepSteps: [
        "Cube the rind-free flesh into pinky-nail pieces and remove any seeds you uncover.",
        "Offer a few cubes at a time — a tray flooded with juice makes everything slippery.",
      ],
      commonMistakes: [
        "Serving watermelon as the whole meal — it is mostly water, so pair it with something calorie-dense.",
      ],
      cutDiagram: "bite-size",
      media: [],
    },
    {
      band: "12-24m",
      form: "Small rind-free wedges or bite-size chunks of seedless watermelon for biting practice, with seeds still checked and the hard rind still off-limits.",
      passFailTest:
        "The flesh should still crush between two fingers, and a quick visual sweep of each wedge should turn up zero seeds.",
      whyThisForm:
        "Toddlers can take bites from a larger wedge, which builds bite-sizing judgment, while the rind stays a hazard because a toddler will happily gnaw through it.",
      prepSteps: [
        "Cut rind-free wedges sized for two-handed toddler holding.",
        "Keep melon eating seated — a mouthful of juice plus running is a cough waiting to happen.",
      ],
      commonMistakes: [
        "Handing over a classic rind-on smile slice — toddlers gnaw into the rind long before they know to stop.",
      ],
      cutDiagram: "wedge-handle",
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["yogurt", "cucumber", "cheese"],
  tips: [
    "A cold slab of watermelon straight from the fridge is a favorite teething soother — chill, don't freeze.",
    "Watermelon is mostly water, so treat it as the drink-adjacent part of a meal and pair it with yogurt, egg, or another calorie-dense food.",
    "Even seedless melons hide soft white seeds — a 10-second finger sweep of each piece is the habit worth building.",
    "Cut the whole melon into rind-free slabs on day one and store them in a covered container; prep-once means easy servings all week.",
  ],
  sources: [SOURCES.wicGuide, SOURCES.nhsFrom6Months, SOURCES.aapStartingSolids],
  nutrients: ["potassium"],
  servingGuidance: [
    {
      band: "6-8m",
      typicalAmount:
        "One thin rind-free strip at a time — early serves are more gnaw and juice than swallow, and that's the point.",
    },
    {
      band: "9-12m",
      typicalAmount:
        "A small handful of juicy cubes, put down a few at a time so the tray stays grippable.",
    },
    {
      band: "12-24m",
      typicalAmount:
        "A rind-free slice or a small handful of chunks — hydrating, so serve it beside something more substantial.",
    },
  ],
  watchOuts: [
    "Mostly water — refreshing but light, so pair it with a calorie-dense food rather than letting it stand in for the meal.",
  ],
  emoji: "🍉",
};

export default watermelon;
