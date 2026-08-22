import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const pomegranate: Food = {
  slug: "pomegranate",
  name: "Pomegranate arils",
  aliases: ["pomegranate", "pomegranate seeds"],
  category: "fruit",
  minAgeMonths: 9,
  ironRich: false,
  commonAllergen: null,
  chokingRisk: "high",
  chokingNotes:
    "Each aril is a firm, round, slippery seed — small enough to inhale, round enough to seal an airway, and served by the handful in exactly the foods (yogurt, salads) where they hide. Mitigate by smashing every single aril flat or straining the seeds into a smooth mash until chewing is genuinely confident (roughly 12 months and beyond), and even then offering whole arils only a few at a time to a seated child.",
  nutritionHighlights: [
    "Provides vitamin C to support immunity and iron absorption",
    "The edible seeds carry genuine fiber along with the juice",
  ],
  prepSpecs: [
    {
      band: "9-12m",
      form: "Every aril pressed completely flat with the back of a fork or your thumb, or the seeds strained into a smooth mash stirred through yogurt, so nothing round or rollable is on the tray.",
      passFailTest:
        "Run your fingers through the pile: nothing should roll. Any aril that still holds its round shape gets smashed again before it goes anywhere near the tray.",
      whyThisForm:
        "A 9-month-old's pincer grasp picks up arils beautifully — that is exactly the problem, because the firm round seed can be swallowed whole and plug an airway; flattening destroys the dangerous geometry while keeping the flavor.",
      prepSteps: [
        "Score the pomegranate skin into quarters and break it apart in a bowl of water — the arils sink and the white pith floats.",
        "Drain the arils and press each one flat on a cutting board with the back of a fork or your thumb.",
        "Alternatively, blend the arils briefly and push the juice and pulp through a sieve, leaving the hard seed cores behind.",
        "Stir the smashed arils or strained mash into yogurt or oatmeal and serve by the spoonful.",
      ],
      commonMistakes: [
        "Sprinkling 'just a few' whole arils on yogurt — a hidden round seed in a spoonful of puree is the worst version of this hazard.",
        "Halving arils with a knife instead of smashing — a half aril can still present a rounded plug.",
        "Trusting supervision over preparation: aspiration of a small round seed is fast and nearly silent.",
      ],
      cutDiagram: "mash",
      media: [],
    },
    {
      band: "12-24m",
      form: "Whole arils only for a genuinely confident chewer well past the first birthday, offered a few at a time to a seated child, with any doubt resolved by pressing each one into a thin flat disc as before.",
      passFailTest:
        "Watch the first few closely: chewing should be visible and deliberate, and nothing should reappear whole in the bib. Whole arils in the bib mean going back to smashing.",
      whyThisForm:
        "Toddler molars can crush arils, but the seeds are small, hard-centered, and easy to swallow whole while laughing or moving — so the privilege stays conditional on calm, seated, confident chewing.",
      prepSteps: [
        "Start with two or three arils on the tray at a time, only at the table, never in the car or on the move.",
        "Keep smashing arils flat for any meal eaten in motion, at daycare, or under looser supervision.",
      ],
      commonMistakes: [
        "Handing over a wedge of pomegranate to gnaw — a toddler will strip mouthfuls of whole arils faster than anyone can react.",
        "Letting the rule lapse at parties where bowls of whole arils sit within reach.",
      ],
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["yogurt", "oatmeal", "pear"],
  tips: [
    "The underwater trick makes short work of seeding: score, submerge, break apart, and the pith floats away from the sinking arils.",
    "Smash the arils in a shallow container with a flat-bottomed glass — a dozen at a press instead of one at a time.",
    "The strained-mash route wastes nothing: blitz, sieve, and stir the ruby puree into yogurt, oatmeal, or a smoothie.",
    "Deep red juice stains — do this prep away from anything porous and dress the baby accordingly.",
  ],
  sources: [SOURCES.cdcChokingHazards, SOURCES.aapChoking, SOURCES.nhsFrom6Months],
  nutrients: ["vitaminC", "fiber"],
  servingGuidance: [
    {
      band: "9-12m",
      typicalAmount:
        "A spoonful or two of smashed arils or strained mash stirred through yogurt or oatmeal — flavor exposure is the goal.",
    },
    {
      band: "12-24m",
      typicalAmount:
        "A small handful of arils' worth — smashed by default, whole only a few pieces at a time for a seated, confident chewer.",
    },
  ],
  watchOuts: [
    "Pomegranate juice stains bibs, trays, clothing, and grout more or less permanently — prep and serve with that in mind.",
  ],
  emoji: "🔴",
};

export default pomegranate;
