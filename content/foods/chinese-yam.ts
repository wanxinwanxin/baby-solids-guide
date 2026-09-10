import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const chineseYam: Food = {
  slug: "chinese-yam",
  name: "Chinese yam",
  aliases: ["shan yao", "nagaimo", "mountain yam", "huai shan"],
  category: "vegetable",
  minAgeMonths: 6,
  ironRich: false,
  commonAllergen: null,
  chokingRisk: "moderate",
  chokingNotes:
    "The hazard is texture, not shape: stir-fried Chinese yam is deliberately crisp and crunchy, which is unsafe for a baby. Serve it only steamed or simmered until it mashes with no resistance, and never the firm, slippery raw or crisp-cooked forms.",
  nutritionHighlights: [
    "A source of potassium, which supports fluid balance and muscle function",
    "Its soft mucilage and starch make a gentle, easily digested carbohydrate",
    "Provides fiber that supports regular, comfortable digestion",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "Peeled Chinese yam steamed until it smashes with no lumps, served as soft batons about two adult fingers long and one finger wide.",
      passFailTest:
        "The squish test: a baton should flatten between thumb and forefinger with gentle pressure, and a fork should slide through with no resistance.",
      whyThisForm:
        "A fist-grasping baby clamps the baton and gnaws the end sticking out; a soft two-finger baton is graspable, and fully steamed yam mashes on bare gums.",
      prepSteps: [
        "Peel the yam under running water — the raw surface is slippery and its sap can itch bare hands.",
        "Cut into two-finger batons and steam 12–15 minutes until a fork meets no resistance.",
        "Cool to warm and run the squish test on the thickest baton before serving.",
        "Serve one baton at a time; a thin coat of oil keeps the surface from drying out.",
      ],
      commonMistakes: [
        "Serving it stir-fried and crunchy the way adults eat it — that crisp texture is a choking hazard; steam it soft instead.",
        "Undercooked batons with a firm, slippery center that can slide back whole or snap into chunks.",
      ],
      cutDiagram: "batons",
      media: [],
    },
    {
      band: "9-12m",
      form: "Soft-steamed Chinese yam broken into rough chunks about the size of your pinky fingernail, or a smooth mash loosened until it slides off a tilted spoon.",
      passFailTest:
        "Chunks should flatten easily between two fingers; a spoonful of mash turned sideways should slump off within a couple of seconds rather than cling.",
      whyThisForm:
        "Rough, slightly sticky yam chunks are forgiving pincer-grasp practice, while a properly loosened mash builds spoon skills without a pasty bolus.",
      prepSteps: [
        "Steam the yam fully soft as for 6–8 months.",
        "Break into pinky-nail chunks with a fork — ragged edges grip small fingers better than knife-cut cubes.",
        "For mash, whip in warm breast milk, formula, or a little oil until glossy and loose.",
      ],
      commonMistakes: [
        "Letting the mash sit and stiffen — reheated yam dries out and needs re-loosening every time.",
      ],
      cutDiagram: "bite-size",
      media: [],
    },
    {
      band: "12-24m",
      form: "Soft-cooked Chinese yam in bite-size pieces at family meals — steamed, simmered in soup, or mashed — kept soft enough to squish, never crisp-fried.",
      passFailTest:
        "Pieces should still yield to firm finger pressure; if a piece stays crunchy or rubbery, it is too firm — cook it longer or cut it smaller.",
      whyThisForm:
        "Toddlers handle most soft family yam dishes now; the rule that persists is avoiding the crisp, slippery textures that do not give way on the gums.",
      prepSteps: [
        "Serve the family's steamed or simmered yam, cut into bite-size pieces.",
        "Keep salt low by portioning the toddler's share before salting the dish.",
      ],
      commonMistakes: [
        "Offering the crunchy stir-fried yam from the adults' plates — the very texture that makes it a treat makes it unsafe here.",
      ],
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["carrot", "pork", "chicken", "jujube"],
  tips: [
    "Peel Chinese yam under running water and, if your hands are sensitive, wear a glove — the raw sap can leave a harmless but itchy tingle on the skin.",
    "Steam a longer piece with dinner and refrigerate the rest; cold cooked yam re-steams to squish-soft in a couple of minutes.",
    "A little breast milk, formula, or neutral oil whipped into the mash keeps it from drying into a pasty ball as it cools.",
    "Choose a firm, unblemished root and cook it the same day you peel it — cut yam browns and turns slippery quickly.",
  ],
  sources: [SOURCES.wicGuide, SOURCES.nhsFrom6Months, SOURCES.aapMenu8to12],
  nutrients: ["potassium", "fiber"],
  servingGuidance: [
    {
      band: "6-8m",
      typicalAmount:
        "One or two soft batons, offered one piece at a time — some meals a nibble, some meals the whole piece, both are the baby self-regulating.",
    },
    {
      band: "9-12m",
      typicalAmount:
        "A small handful of soft chunks, or a tablespoon or two of loose mash — top up while interest lasts.",
    },
    {
      band: "12-24m",
      typicalAmount:
        "A few bite-size pieces alongside the family meal is plenty for many toddlers — a starting point, never a quota.",
    },
  ],
  watchOuts: [
    "Serve it fully soft only — the crisp, crunchy texture of stir-fried yam is a choking hazard for babies and toddlers.",
    "Introduce it on its own for a couple of days, like any new food, so a reaction is easy to trace back.",
  ],
  emoji: "🫚",
  cuisineTags: ["chinese"],
};

export default chineseYam;
