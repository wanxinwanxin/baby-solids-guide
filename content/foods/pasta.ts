import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const pasta: Food = {
  slug: "pasta",
  name: "Pasta",
  aliases: ["noodles", "macaroni"],
  category: "grain",
  minAgeMonths: 6,
  ironRich: false,
  commonAllergen: "wheat",
  chokingRisk: "low",
  nutritionHighlights: [
    "Enriched pasta contributes iron and B vitamins alongside steady carbohydrate energy",
    "Made from wheat, so it doubles as an easy vehicle for early wheat allergen exposure",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "Whole large pasta shapes such as rigatoni or fusilli, boiled in unsalted water several minutes past the package time until each piece squashes flat between your thumb and finger.",
      passFailTest:
        "The squish test: press one piece between thumb and forefinger — it should flatten with gentle pressure and feel soft all the way through, with no firm core.",
      whyThisForm:
        "A big tube or spiral fills a whole-fist palmar grasp with plenty sticking out to gnaw, and pasta cooked far past al dente mashes against bare gums without needing teeth.",
      prepSteps: [
        "Choose a large graspable shape — rigatoni, fusilli, or penne — roughly the size of an adult finger segment.",
        "Boil in plain unsalted water 2–4 minutes past the package time, until a piece squashes easily between two fingers.",
        "Toss with a little olive oil or a familiar vegetable puree so it is moist but not slippery-wet.",
        "First time: serve early in the day, a small amount, and watch for 2 hours.",
      ],
      commonMistakes: [
        "Cooking al dente the way adults like it — firm pasta is hard work for a gummy mouth.",
        "Salting the cooking water out of habit; a baby's sodium budget is tiny.",
        "Serving tiny shapes like orzo at this age, which frustrate a fist grip.",
      ],
      media: [],
    },
    {
      band: "9-12m",
      form: "Very soft-cooked pasta cut or chosen small — pieces about the size of your pinky fingernail, such as chopped fusilli or small shells — each still squashing easily between two fingers.",
      passFailTest:
        "Pick one piece up and press it between two fingers — it should flatten easily with no resistant center.",
      whyThisForm:
        "The pincer grasp arriving around 9 months turns small, slightly tacky pasta pieces into perfect pick-up practice that rewards the effort with an easy chew.",
      prepSteps: [
        "Cook well past al dente in unsalted water, exactly as for 6–8 months.",
        "Cut large shapes into pinky-nail pieces, or use small shapes like mini shells.",
        "Coat lightly in sauce or olive oil and scatter a few pieces at a time on the tray.",
      ],
      commonMistakes: [
        "Pieces so slick with sauce they escape little fingers — a lighter coating grips better.",
        "Switching to firm adult pasta because the baby has front teeth — front teeth bite, they don't grind.",
      ],
      cutDiagram: "bite-size",
      media: [],
    },
    {
      band: "12-24m",
      form: "Family pasta dishes cooked soft, with long strands like spaghetti chopped once or twice and larger shapes halved so no piece outsizes two adult thumbnails.",
      passFailTest:
        "Squeeze a piece from the family pot between two fingers — if it holds its shape under gentle pressure, cook the toddler's portion a few minutes longer.",
      whyThisForm:
        "Molars are erupting and rotary chewing is developing, so toddlers can manage more shape variety, but soft cooking and modest piece sizes still make every bite manageable.",
      prepSteps: [
        "Serve the family pasta, cooked a little softer than adults prefer.",
        "Chop long strands roughly and halve large shapes before plating.",
        "Add salt to the adult portions at the table, not the shared pot.",
      ],
      commonMistakes: [
        "Serving heavily salted restaurant-style pasta straight from a shared dish.",
      ],
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["broccoli", "zucchini", "cheese", "olive-oil"],
  tips: [
    "Never salt the cooking water for a baby's portion — cook the pasta plain and season adult servings afterward.",
    "Overcook on purpose: 2–4 minutes past the package time is the difference between adult pasta and baby pasta.",
    "A thin coat of olive oil or vegetable puree keeps pieces moist and graspable; a heavy slick of sauce makes them squirt out of small fists.",
    "Batch-cook soft pasta, freeze it flat in a bag, and revive portions in a splash of boiling water for near-instant meals.",
  ],
  sources: [SOURCES.aaaaiFoodAllergy, SOURCES.wicGuide, SOURCES.nhsWeaning],
  nutrients: ["iron"],
  servingGuidance: [
    {
      band: "6-8m",
      typicalAmount:
        "One or two big soft pieces — a rigatoni or spiral each — gnawing practice first, eating second.",
      frequency: "Wheat on the menu a couple of times a week keeps the exposure steady.",
    },
    {
      band: "9-12m",
      typicalAmount:
        "A small handful of pinky-nail pieces, scattered a few at a time and topped up on demand.",
    },
    {
      band: "12-24m",
      typicalAmount:
        "A quarter to half cup of soft-cooked pasta from the family pot — appetite sets the finish line.",
    },
  ],
  watchOuts: [
    "Jarred sauces and restaurant pasta run salty — a plain or lightly sauced portion suits a baby's tiny sodium budget.",
  ],
  emoji: "🍝",
};

export default pasta;
