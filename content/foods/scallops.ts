import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const scallops: Food = {
  slug: "scallops",
  name: "Scallops",
  aliases: ["sea scallops", "bay scallops"],
  category: "protein",
  minAgeMonths: 6,
  ironRich: false,
  commonAllergen: "shellfish",
  chokingRisk: "moderate",
  chokingNotes:
    "A scallop is a dense round muscle that turns rubbery the moment it overcooks, and a whole scallop or coin-shaped slice is a springy plug that resists gumming. Mitigate by cooking gently just until opaque, mincing finely for young babies, and always cutting lengthwise before crosswise later so no piece keeps the round cross-section.",
  nutritionHighlights: [
    "Lean, complete protein with a naturally soft-sweet flavor babies tend to accept",
    "A source of vitamin B12 for nerve and brain development",
    "A naturally low-mercury seafood choice",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "Gently cooked scallop minced to rice-grain-size pieces, moistened with a spoonful of water or cooking liquid, and folded into a familiar puree or soft mash.",
      passFailTest:
        "Run a fingertip through the mince — every piece should be no bigger than a grain of rice, and nothing should spring back like an eraser when pinched between two fingers.",
      whyThisForm:
        "Scallop never softens the way fish does, so at this age the geometry does the safety work: a fine mince removes the rubbery-plug hazard while still delivering the shellfish allergen.",
      prepSteps: [
        "Pull off the small, tough side muscle from each scallop, then poach or steam just until opaque all the way through, about 2–3 minutes.",
        "Mince very finely with a sharp knife to rice-grain pieces and stir in a little liquid so the mince clumps softly.",
        "Mix into or serve alongside familiar foods, never another new food.",
        "First time: serve early in the day, a small amount, and watch for 2 hours.",
      ],
      commonMistakes: [
        "Overcooking — a scallop is done the moment it turns opaque, and every extra minute makes it bouncier and harder to chew.",
        "Chopping into rounds or leaving chunks, which keep the springy plug shape a mince is meant to eliminate.",
        "Introducing scallops at dinner, so any delayed reaction lands overnight.",
      ],
      media: [],
    },
    {
      band: "9-12m",
      form: "Cooked scallop quartered lengthwise first and then chopped crosswise into soft pinky-nail pieces, kept moist so each piece flattens rather than bounces under finger pressure.",
      passFailTest:
        "Press a piece between thumb and forefinger — it should flatten and stay flat; a piece that springs back like a pencil eraser is too thick or too rubbery.",
      whyThisForm:
        "The pincer grasp manages small pieces well by now, but scallop stays dense, so quartering lengthwise before chopping breaks the round cross-section that plugs airways.",
      prepSteps: [
        "Cook as for 6–8 months, quarter each scallop lengthwise, then chop crosswise into pinky-nail pieces.",
        "Toss with a little olive oil or cooking liquid so pieces stay slick and easy to swallow.",
        "Offer a few pieces at a time alongside familiar foods.",
      ],
      commonMistakes: [
        "Slicing crosswise only, which produces exactly the firm round coins to avoid.",
        "Searing hard for a crust — the browned exterior is chewier than a baby can manage.",
      ],
      cutDiagram: "quarter-lengthwise",
      media: [],
    },
    {
      band: "12-24m",
      form: "Gently cooked scallop quartered lengthwise and cut into moist bite-size pieces no larger than a pinky fingernail, served in soft family dishes like risotto or pasta.",
      passFailTest:
        "Each piece should flatten between two fingers without springing back, and nothing on the plate should be a whole scallop, a half, or an intact round slice.",
      whyThisForm:
        "Even with molars arriving, toddlers cannot reliably grind rubbery textures, so whole and coin-cut scallops remain off-limits — small lengthwise-cut pieces stay the rule through this band.",
      prepSteps: [
        "Quarter each cooked scallop lengthwise, then chop into pinky-nail pieces.",
        "Fold the pieces into moist dishes — soft rice, pasta, mashed potato — rather than serving them dry and plain.",
      ],
      commonMistakes: [
        "Handing over a whole bay scallop because it looks small — it is still a dense, springy round the size of an airway.",
      ],
      cutDiagram: "bite-size",
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["polenta", "peas", "butternut-squash", "potato"],
  tips: [
    "Cook just to opaque — 2–3 minutes in barely simmering water — because tenderness in a scallop is entirely a matter of not overshooting.",
    "Choose 'dry-packed' scallops when you can: 'wet-packed' ones are soaked in a salty phosphate solution that also makes them weep and steam instead of cooking evenly.",
    "Peel off the little rectangular side muscle before cooking; it stays tough no matter how gently you cook.",
    "Mince or quarter a cooked batch, moisten, and freeze in ice-cube portions so repeat shellfish exposures take no extra cooking.",
  ],
  sources: [SOURCES.fdaFish, SOURCES.aaaaiFoodAllergy, SOURCES.cdcChokingHazards],
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
        "One scallop's worth of soft pinky-nail pieces, offered a few at a time — the baby sets the count.",
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
    "'Wet-packed' scallops are soaked in a salty phosphate brine — 'dry-packed' scallops keep sodium down and cook more evenly.",
  ],
  emoji: "🐚",
};

export default scallops;
