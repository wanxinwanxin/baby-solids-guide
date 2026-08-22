import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const halibut: Food = {
  slug: "halibut",
  name: "Halibut",
  aliases: [],
  category: "protein",
  minAgeMonths: 6,
  ironRich: false,
  commonAllergen: "fish",
  chokingRisk: "low",
  nutritionHighlights: [
    "Lean, complete protein in firm, meaty flakes",
    "A natural source of vitamin B12, selenium, and potassium",
    "A moderate-mercury fish — about one serving a week fits federal fish advice",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "A skinless piece of halibut fillet about the size of two adult fingers, cooked gently until its firm flakes separate at a fork's touch, checked for bones, generously remoistened, and served whole or mashed into a familiar puree.",
      passFailTest:
        "Press with a fork — the fish should break into moist flakes with no translucent center, each flake soft enough to flatten between two fingers, and a fingertip rake should find no bones.",
      whyThisForm:
        "A two-finger piece fits the whole-fist palmar grasp, and because halibut flakes are firmer and drier than most fish, the added moisture is what keeps them gummable.",
      prepSteps: [
        "Run fingertips over the raw fillet and remove any stray bones, then poach or bake gently until just opaque, about 8–10 minutes — halibut overcooks quickly.",
        "Flake with a fork, re-check for bones, and stir in a generous spoonful of cooking liquid, breast milk, or formula, because this lean fish dries faster than almost any other.",
        "Mix into or serve alongside familiar foods, never another new food.",
        "First time: serve early in the day, a small amount, and watch for 2 hours.",
      ],
      commonMistakes: [
        "Overcooking — halibut goes from moist to dry and fibrous in a minute or two, and dry flakes are hard to swallow.",
        "Serving the flakes without remoistening; halibut needs more added liquid than softer fish.",
        "Introducing halibut at dinner, where a delayed reaction lands overnight when you can't observe.",
      ],
      media: [],
    },
    {
      band: "9-12m",
      form: "Firm, bone-checked halibut flakes broken to pinky-fingernail size and tossed with enough olive oil or cooking liquid that each flake flattens softly between two fingers.",
      passFailTest:
        "Pinch a flake — it should flatten into moist threads rather than crumble; dry, springy flakes go back into a splash of warm liquid.",
      whyThisForm:
        "Halibut's large, distinct flakes are easy targets for the emerging pincer grasp, and moisture keeps this firmer fish as swallowable as softer species.",
      prepSteps: [
        "Cook and de-bone as for 6–8 months, then break into pinky-nail flakes.",
        "Toss with olive oil, unsalted broth, or a soft sauce until every flake looks glossy.",
        "Offer a few flakes at a time alongside a vegetable the baby knows.",
      ],
      commonMistakes: [
        "Serving dry, plain flakes that stick in the mouth — moisture matters more with halibut than with any softer fish.",
        "Pieces bigger than a pinky nail, which outmatch a gummy chew.",
      ],
      cutDiagram: "bite-size",
      media: [],
    },
    {
      band: "12-24m",
      form: "Bite-size chunks of cooked, bone-checked halibut no bigger than a pinky fingernail, kept moist with pan juices or a mild sauce and served in family dishes.",
      passFailTest:
        "Each chunk should flatten between two fingers and pull apart into flakes; a piece that stays a firm nugget needs a smaller cut or more liquid.",
      whyThisForm:
        "Toddlers handle firm fish chunks once molars start arriving, so the goals shift to portion rhythm — halibut about once a week, with lower-mercury fish covering the other servings.",
      prepSteps: [
        "Serve family-meal halibut in pinky-nail chunks after a final fingertip bone check.",
        "Spoon over pan juices or fold into rice or mashed potato before plating.",
      ],
      commonMistakes: [
        "Making halibut the everyday fish — its mercury level suits roughly one serving a week, not a daily habit.",
      ],
      cutDiagram: "bite-size",
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["potato", "green-beans", "carrot"],
  tips: [
    "Pull halibut off the heat the moment it turns opaque — its low fat means one extra minute is the difference between moist flakes and dry ones.",
    "Poaching in barely simmering water is the most forgiving method, and the liquid becomes the remoistener the flakes will need.",
    "Halibut sits on the FDA's 'good choice' list, so serve it about once a week and let low-mercury fish like salmon or trout fill the other fish meals.",
    "A spoonful of plain yogurt or mashed avocado folded through the flakes adds the fat and slip this lean fish lacks on its own.",
  ],
  sources: [SOURCES.fdaFish, SOURCES.eatStudy, SOURCES.wicGuide],
  nutrients: ["protein", "potassium"],
  servingGuidance: [
    {
      band: "6-8m",
      typicalAmount:
        "A teaspoon or two of well-moistened mashed flakes in a familiar puree, or one soft two-finger piece — first serves stay small.",
      frequency: "About once a week — halibut is a moderate-mercury fish.",
    },
    {
      band: "9-12m",
      typicalAmount:
        "A small handful of glossy, moistened pinky-nail flakes, scattered a few at a time.",
      frequency: "About once a week, with lower-mercury fish filling the other fish meals.",
    },
    {
      band: "12-24m",
      typicalAmount:
        "A few tablespoons of moist chunks with the family meal — appetite swings day to day.",
      frequency: "About once a week fits federal fish advice for a moderate-mercury species.",
    },
  ],
  watchOuts: [
    "Halibut is a 'good choice' rather than a 'best choice' on the FDA/EPA mercury lists — about one serving a week is the right rhythm, with low-mercury fish covering the rest.",
  ],
  emoji: "🐟",
};

export default halibut;
