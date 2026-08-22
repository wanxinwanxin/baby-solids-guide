import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const limaBeans: Food = {
  slug: "lima-beans",
  name: "Lima beans",
  aliases: ["butter beans", "baby limas"],
  category: "legume",
  minAgeMonths: 6,
  ironRich: true,
  commonAllergen: null,
  chokingRisk: "moderate",
  chokingNotes:
    "Limas are among the largest common beans — a whole butter bean approaches grape scale, and its skin can hold it together on the way down. Mitigate by mashing or smashing completely flat before 9 months, flattening or quartering through 12 months, and even in toddlerhood halving the biggest butter beans.",
  nutritionHighlights: [
    "Plant iron and protein for the 6-month iron gap onward",
    "Notably rich in potassium alongside the usual bean folate",
    "A starchy, buttery flesh that mashes exceptionally creamy",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "Fully cooked lima beans mashed into a thick, buttery-smooth paste with every skin broken down and not a single intact or half-intact bean remaining.",
      passFailTest:
        "Rub a spoonful between your fingers — creamy with no firm pieces or papery skin flaps — and a scan of the bowl finds zero whole beans.",
      whyThisForm:
        "A lima's starchy flesh mashes creamier than almost any bean, but its large size and cohesive skin make an intact one genuinely risky — so at this age the mash must be total.",
      prepSteps: [
        "Boil frozen baby limas for 12–15 minutes (or simmer soaked dried limas until they crush effortlessly) — fully cooked, never crisp-tender.",
        "Mash warm with a fork or masher until skins disappear into the paste, loosening with water, breast milk, or formula.",
        "Serve as a thick spread on the tray or on a preloaded spoon.",
      ],
      commonMistakes: [
        "Stopping at 'mostly mashed' — with a bean this large, the strays are the whole hazard.",
        "Blanching only until bright green; limas need a full boil to be squash-soft and fully cooked.",
        "Using canned seasoned butter beans without rinsing off the salty liquid.",
      ],
      cutDiagram: "mash",
      media: [],
    },
    {
      band: "9-12m",
      form: "Soft-cooked limas smashed flat one by one between your fingers or quartered, served as a small scatter of squashed bite-size pieces.",
      passFailTest:
        "Every piece on the tray should already be flat or quartered, and a sampled piece should smear under light fingertip pressure with no springy skin.",
      whyThisForm:
        "Flattened or quartered pieces give the new pincer grasp something substantial to practice on while eliminating the large rounded geometry that makes a whole lima unsafe.",
      prepSteps: [
        "Cook until a sample bean squashes with zero resistance.",
        "Press each bean flat between thumb and finger, or cut into quarters.",
        "Scatter a few pieces at a time rather than serving a pile.",
      ],
      commonMistakes: [
        "Halving a big butter bean and calling it done — for the largest beans at this age, flat or quartered is the standard.",
        "Serving straight from a salty canned-bean salad.",
      ],
      cutDiagram: "bite-size",
      media: [],
    },
    {
      band: "12-24m",
      form: "Whole soft baby limas served loose in succotash-style mixes, soups, and grain bowls, with any bean wider than a thumbnail still halved before serving.",
      passFailTest:
        "Press a few from the pot: each flattens between two fingers with no firm center, and anything wider than a thumbnail has been halved.",
      whyThisForm:
        "Molars and a practiced chew make whole soft baby limas manageable, but the jumbo butter-bean sizes stay halved a while longer purely because of their scale.",
      prepSteps: [
        "Fold soft limas into family vegetable soups, rice dishes, or a no-salt succotash, portioning before seasoning.",
        "Halve any jumbo butter beans in the toddler's serving.",
      ],
      commonMistakes: [
        "Treating all limas as one size — a jumbo butter bean is several times the volume of a baby lima and needs the extra cut.",
      ],
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["carrot", "tomato", "potato", "chicken"],
  tips: [
    "Frozen baby limas are the easy route: smaller, skin-tender, and boil to squash-soft in about 12 minutes.",
    "Mash them warm — a lima's starch locks up as it cools and the creamy window closes.",
    "Their mild buttery flavor hides well: fold lima mash into mashed potato to raise the iron and protein quietly.",
    "Pair with tomato or another vitamin-C food in the same meal to help the plant iron absorb.",
  ],
  sources: [SOURCES.wicGuide, SOURCES.cdcChokingHazards, SOURCES.aapChoking],
  nutrients: ["iron", "protein", "fiber", "potassium"],
  servingGuidance: [
    {
      band: "6-8m",
      typicalAmount:
        "One to two tablespoons of buttery mash on a preloaded spoon or the tray — refill while the mouth keeps opening.",
    },
    {
      band: "9-12m",
      typicalAmount:
        "Two to three tablespoons of flattened or quartered pieces offered a small scatter at a time.",
    },
    {
      band: "12-24m",
      typicalAmount:
        "A quarter cup or so of whole soft baby limas in the family dish — an offer, not an assignment.",
    },
  ],
  watchOuts: [
    "Cook limas fully — never raw or barely blanched; thorough boiling neutralizes naturally occurring compounds in the raw bean.",
    "Canned butter beans sit in salty liquid — drain and rinse before mashing or serving.",
    "New bean eaters may have a gassy day or two — scale portions gradually.",
  ],
  emoji: "🫘",
};

export default limaBeans;
