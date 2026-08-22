import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const shrimp: Food = {
  slug: "shrimp",
  name: "Shrimp",
  aliases: ["prawns"],
  category: "protein",
  minAgeMonths: 6,
  ironRich: false,
  commonAllergen: "shellfish",
  chokingRisk: "moderate",
  chokingNotes:
    "Shrimp's firm, rubbery flesh and curled round shape are the hazard — a whole shrimp or a thick round segment is exactly the plug shape and springy texture that resists gumming. Mitigate by cooking through, then chopping finely for young babies and never serving whole shrimp or thick rounds to anyone under about age four.",
  nutritionHighlights: [
    "Lean, complete protein with vitamin B12 and selenium",
    "A source of iodine for thyroid and brain development",
    "Naturally a low-mercury seafood choice",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "Peeled, deveined, fully cooked shrimp minced to rice-grain-size pieces, moistened with a little water or cooking liquid and folded into a familiar puree or soft mash.",
      passFailTest:
        "Run a fingertip through the mince — every piece should be no bigger than a grain of rice, with no springy chunks that survive a pinch between two fingers.",
      whyThisForm:
        "Shrimp never softens the way meat or fish does, so at this age the geometry does the safety work: a fine mince removes the rubbery-plug hazard while still delivering the shellfish allergen.",
      prepSteps: [
        "Peel and devein raw shrimp (remove tail and every scrap of shell), then simmer or steam until opaque and pink throughout, 2–3 minutes.",
        "Mince very finely with a sharp knife to rice-grain pieces and stir in a spoonful of liquid so the mince clumps softly.",
        "Mix into or serve alongside familiar foods, never another new food.",
        "First time: serve early in the day, a small amount, and watch for 2 hours.",
      ],
      commonMistakes: [
        "Chopping into rounds or segments instead of a true mince — a curled shrimp piece keeps its plug shape.",
        "Leaving tail or shell fragments behind, which are sharp and unchewable.",
        "Introducing shrimp at dinner, so any delayed reaction lands overnight.",
      ],
      media: [],
    },
    {
      band: "9-12m",
      form: "Cooked, peeled shrimp cut lengthwise first and then crosswise into soft pinky-nail pieces, kept moist so each piece flattens rather than bounces under finger pressure.",
      passFailTest:
        "Press a piece between thumb and forefinger — it should flatten and stay flat; a piece that springs back like an eraser is too big or too thick.",
      whyThisForm:
        "The pincer grasp handles small pieces well by now, but shrimp stays rubbery, so halving lengthwise before chopping breaks the round cross-section that plugs airways.",
      prepSteps: [
        "Cook as for 6–8 months, slice each shrimp in half lengthwise, then chop crosswise into pinky-nail pieces.",
        "Toss with a little olive oil or cooking liquid so pieces stay slick and easy to swallow.",
        "Offer a few pieces at a time alongside familiar foods.",
      ],
      commonMistakes: [
        "Cutting crosswise only, which produces exactly the firm round coins to avoid.",
        "Overcooking until tough — shrimp is done the moment it turns opaque.",
      ],
      cutDiagram: "quarter-lengthwise",
      media: [],
    },
    {
      band: "12-24m",
      form: "Well-cooked shrimp quartered lengthwise and cut into soft bite-size pieces no larger than a pinky fingernail, served moist in family dishes like rice bowls or pasta.",
      passFailTest:
        "Each piece should flatten between two fingers without springing back, and no piece should be a whole segment or an intact curled round.",
      whyThisForm:
        "Even with molars coming in, toddlers cannot reliably grind rubbery textures, so whole and halved shrimp remain off-limits — small lengthwise-cut pieces stay the rule through this band.",
      prepSteps: [
        "Quarter each cooked shrimp lengthwise, then chop into pinky-nail pieces.",
        "Fold the pieces into moist family dishes — rice, pasta, soft vegetables — rather than serving them dry and plain.",
      ],
      commonMistakes: [
        "Handing a toddler a whole shrimp because they 'chew everything now' — whole shrimp stay a choking hazard until around age four.",
      ],
      cutDiagram: "bite-size",
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["rice", "avocado", "zucchini", "peas"],
  tips: [
    "Cook shrimp just to opaque — about 2–3 minutes in simmering water — because every extra minute makes the flesh bouncier and harder to chew.",
    "Cut lengthwise before crosswise: splitting the curl is what eliminates the round plug shape, and it matters more than piece count.",
    "Buy raw shell-on shrimp and peel them yourself if you can — pre-cooked cocktail shrimp are often brined and noticeably saltier.",
    "Mince a batch, moisten, and freeze in ice-cube portions so keeping shellfish in the routine after introduction takes no extra cooking.",
  ],
  sources: [SOURCES.aaaaiFoodAllergy, SOURCES.eatStudy, SOURCES.cdcChokingHazards],
  nutrients: ["protein"],
  servingGuidance: [
    {
      band: "6-8m",
      typicalAmount:
        "A teaspoon or two of rice-grain mince folded into a familiar mash — a taste-size first serve that grows with tolerance.",
      frequency: "About twice a week once tolerated, to keep the shellfish exposure steady.",
    },
    {
      band: "9-12m",
      typicalAmount:
        "One or two shrimp's worth of soft pinky-nail pieces, offered a few at a time — the baby sets the count.",
      frequency: "About twice a week once tolerated.",
    },
    {
      band: "12-24m",
      typicalAmount:
        "A few tablespoons of small lengthwise-cut pieces folded into a moist family dish.",
      frequency: "Keep shellfish in the rotation about twice a week.",
    },
  ],
  watchOuts: [
    "Pre-cooked cocktail shrimp are often brined and noticeably salty — raw shrimp you cook yourself keeps sodium down.",
  ],
  emoji: "🦐",
};

export default shrimp;
