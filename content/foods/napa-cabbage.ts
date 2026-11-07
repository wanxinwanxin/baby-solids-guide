import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const napaCabbage: Food = {
  slug: "napa-cabbage",
  name: "Napa cabbage",
  aliases: [
    "chinese cabbage",
    "chinese leaf",
    "nappa cabbage",
    "napa",
    "baby napa",
    "wombok",
    "celery cabbage",
  ],
  category: "vegetable",
  minAgeMonths: 6,
  ironRich: false,
  commonAllergen: null,
  chokingRisk: "moderate",
  chokingNotes:
    "A cooked napa leaf turns thin and slick and can drape flat over the airway like a piece of film — the same hazard as cabbage and spinach — while the white rib is crunchy raw and carries long strings that run its full length. Mitigate by slicing the rib crosswise, simmering until it squashes flat, and mincing or chopping finely; never serve an intact cooked leaf, a long rib strip, or raw rib chunks.",
  nutritionHighlights: [
    "Provides vitamin C, which also helps plant iron absorb from foods served alongside",
    "Provides folate, needed for rapid cell growth",
    "A source of vitamin K for normal blood clotting",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "Napa cabbage simmered until the white rib squashes flat, then minced into flecks no bigger than your pinky nail or blended smooth, and stirred through rice porridge or a puree.",
      passFailTest:
        "Squash a cooked rib slice between thumb and finger: it should flatten with no crunch. Then spread the mince out: no fleck bigger than a pinky nail, no string longer than the flecks, and nothing that lifts away as a sheet of leaf.",
      whyThisForm:
        "A fist-grasping baby eats napa as a passenger in porridge or puree; minced flecks carried by a thick base cannot drape over the airway like a whole soft leaf or trail a string like a rib strip.",
      prepSteps: [
        "Use the pale inner leaves first. Cut off the base, then slice the white ribs crosswise into thin strips so every string is cut short.",
        "Simmer the rib strips in unsalted water or broth for 5 minutes, add the shredded leaves, and cook about 5 minutes more, until the rib is translucent and squashes flat.",
        "Drain, then chop in both directions to fine flecks — or blend with a spoonful of the cooking water until smooth.",
        "Stir into rice porridge, mashed potato, or another puree the baby already knows.",
      ],
      commonMistakes: [
        "Cutting the rib lengthwise — the strings run along the rib, so long strips stay stringy however long they cook.",
        "Serving a whole soft leaf — cooked napa leaves are thin and slick, exactly the draping shape to avoid.",
        "A quick adult-style stir-fry that leaves the rib crisp and squeaky — too firm for gums.",
      ],
      cutDiagram: "shred",
      media: [],
    },
    {
      band: "9-12m",
      form: "Soft-cooked napa cabbage, rib and leaf together, finely chopped to pieces no bigger than a pinky nail and mixed through porridge, soft rice, tofu, scrambled egg, or soft noodles.",
      passFailTest:
        "Pull a spoonful apart: any leaf you can peel off as a sheet bigger than a pinky nail needs more chopping, and any rib piece that still crunches needs more cooking.",
      whyThisForm:
        "Pincer-stage babies manage soft mixed pieces well, but a free-floating slick leaf or a long rib string is still a hazard, so napa keeps riding inside foods with body.",
      prepSteps: [
        "Slice, simmer, and chop as for 6–8 months; the chop can now be a little coarser, up to pinky-nail size.",
        "Stir into soft rice, thick porridge, crumbled tofu, scrambled egg, or short soft noodles.",
        "Serve a few self-feedable spoonfuls or pieces at a time.",
      ],
      commonMistakes: [
        "Fishing leaves straight out of the family's napa-and-tofu soup — they are soft but whole, and the broth is usually salted.",
      ],
      cutDiagram: "shred",
      media: [],
    },
    {
      band: "12-24m",
      form: "Soft-cooked napa chopped into pinky-nail pieces as its own small side or through family dishes, with raw napa limited to a few short, paper-thin shreds of the green leaf.",
      passFailTest:
        "A cooked rib piece should squash between two fingers with no string trailing; any raw shred should be thin enough to tear instantly between your fingers.",
      whyThisForm:
        "Toddlers chew better, but thin, slippery leaves and crunchy raw rib stay hard to control, so cooked napa stays chopped and raw napa stays minimal until chewing is truly strong.",
      prepSteps: [
        "When the family cooks napa, take the toddler's portion out before salt, soy sauce, or oyster sauce goes in, then chop it on the board.",
        "Late in this band, offer a few short, paper-thin raw shreds from the green leaf part, tossed with a few drops of oil and no salt.",
      ],
      commonMistakes: [
        "Sharing a plate of adult napa slaw — long, crunchy shreds of raw rib are hard to manage, and the dressing is salted.",
      ],
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["tofu", "pork", "rice", "mushrooms"],
  tips: [
    "Start with the pale inner leaves near the heart — they are the most tender and the sweetest; save the dark outer leaves for the family pot.",
    "Slice the white rib crosswise into thin strips before it goes in the pan: the strings run the length of the rib, so a crosswise cut keeps every string short.",
    "Napa is mostly water and shrinks hard in the pot — a big handful becomes a spoonful or two, and the unsalted cooking water makes a mild, sweet base for the baby's rice porridge.",
    "Baby napa — the small heads sold in Asian grocers — is the same vegetable and takes the same prep.",
    "On dumpling night, squeeze the toddler's minced napa dry in a clean cloth instead of salting it, mix a small unsalted pork-and-napa batch, and cut each cooked dumpling into small bite-size pieces.",
  ],
  sources: [SOURCES.nhsFrom6Months, SOURCES.wicGuide, SOURCES.cdcFoodsAndDrinks],
  nutrients: ["vitaminC", "folate"],
  servingGuidance: [
    {
      band: "6-8m",
      typicalAmount:
        "A teaspoon or two of minced napa stirred through porridge or puree — a garnish-scale start is exactly right.",
    },
    {
      band: "9-12m",
      typicalAmount:
        "A tablespoon of chopped cooked napa stirred through porridge, soft rice, tofu, or eggs.",
    },
    {
      band: "12-24m",
      typicalAmount:
        "A couple of tablespoons as its own small side or through family dishes, offered without pressure and eaten or not.",
    },
  ],
  watchOuts: [
    "Napa is a brassica like cabbage, so expect some extra wind at first; it usually settles as the gut gets used to brassicas.",
    "Pickled and fermented napa — kimchi, Chinese suan cai, and spicy pickled napa — is very salty and stays off the baby's plate; cook fresh napa with no added salt.",
  ],
  emoji: "🥬",
  cuisineTags: ["chinese"],
};

export default napaCabbage;
