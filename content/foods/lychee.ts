import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const lychee: Food = {
  slug: "lychee",
  name: "Lychee",
  aliases: ["litchi", "lichee"],
  category: "fruit",
  minAgeMonths: 9,
  ironRich: false,
  commonAllergen: null,
  chokingRisk: "high",
  chokingNotes:
    "A peeled lychee is the textbook aspiration hazard: a slippery, wet, airway-sized ball hiding a hard glossy pit — the same geometry as a whole grape, plus a stone. Mitigate by peeling, pitting, and quartering lengthwise every single lychee, every time, until at least age 4; a whole or halved lychee never belongs on a young child's tray, and canned lychees follow the same rule.",
  nutritionHighlights: [
    "A strong source of vitamin C, which supports immunity and boosts iron absorption from plant foods",
    "Mostly water and natural sugars — a fragrant treat for variety rather than a nutrition workhorse",
  ],
  prepSpecs: [
    {
      band: "9-12m",
      form: "Each lychee peeled completely, its hard glossy pit removed and the cavity checked for fragments, then the flesh quartered lengthwise into slim strips narrower than your pinky finger.",
      passFailTest:
        "Turn every piece in your fingers: nothing should look round or dome-shaped from any angle, and pressing the cavity side must show no trace of pit or splinter left behind.",
      whyThisForm:
        "A 9-month-old's new pincer grasp manages slim slippery strips well, and only a lengthwise quartering destroys the round cross-section — the whole fruit is airway-shaped, and the hidden pit makes it doubly dangerous.",
      prepSteps: [
        "Crack the bumpy shell at the stem end and peel it away completely.",
        "Slit the flesh down one side, pop out the pit, and sweep a fingertip through the cavity for splinters — pits sometimes crack.",
        "Quarter the flesh lengthwise so every piece is a slim, flat-sided strip.",
        "Serve two or three strips at a time; blot very wet pieces so they are grippable.",
      ],
      commonMistakes: [
        "Serving a pitted lychee whole or halved — the flesh alone is still a slick, rounded plug.",
        "Assuming canned lychees are safer: they are pitted but just as round and even more slippery, so they get quartered too.",
        "Trusting supervision over the knife — choking on smooth round fruit is fast and nearly silent.",
      ],
      cutDiagram: "quarter-lengthwise",
      media: [],
    },
    {
      band: "12-24m",
      form: "Still peeled, pitted, and quartered lengthwise into slim strips every single time, because whole and halved lychees stay off the tray until at least age four.",
      passFailTest:
        "Same tray sweep as before: rotate each piece and confirm nothing is round in any orientation, and that no piece hides pit fragments on its inner face.",
      whyThisForm:
        "Toddlers eat fast, laugh with full mouths, and run with food, and their airways are still exactly lychee-sized — molars change chewing, not the geometry of a slippery ball.",
      prepSteps: [
        "Peel, pit, check, and quarter lengthwise exactly as before — at home, at parties, and at other people's houses.",
        "Brief every caregiver explicitly: grandparents and daycare need to hear 'peeled, pitted, quartered until age four'.",
      ],
      commonMistakes: [
        "Relaxing the rule because the toddler 'chews everything now' — round slippery fruits remain top choking offenders through the preschool years.",
        "Letting a child suck the flesh off a whole lychee — that is precisely the whole-fruit-in-mouth scenario to avoid.",
      ],
      cutDiagram: "quarter-lengthwise",
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["yogurt", "chicken", "rice"],
  tips: [
    "Buy lychees with vivid pink-red shells that give slightly when pressed; brown, dry shells mean the perfumed flavor has already faded.",
    "Prep the whole batch at once — peel, pit, check, quarter — and refrigerate in a sealed container, so a safe piece is always closer than a whole fruit.",
    "The pit slides out cleanly if you slit the flesh down one side and pinch from the opposite end, keeping the strips intact for quartering.",
    "If canned is all you can find, choose fruit packed in juice rather than syrup and rinse before quartering.",
  ],
  sources: [SOURCES.cdcChokingHazards, SOURCES.aapChoking, SOURCES.nhsFrom6Months],
  nutrients: ["vitaminC"],
  servingGuidance: [
    {
      band: "9-12m",
      typicalAmount:
        "Two or three lychees' worth of quartered strips, offered a piece or two at a time alongside more substantial foods.",
    },
    {
      band: "12-24m",
      typicalAmount:
        "A small handful of quartered strips with a meal or snack — sweet and light, so let it ride sidekick to richer foods.",
    },
  ],
  watchOuts: [
    "Fragrant and sugary but light on substance — better as an occasional treat next to nutrient-dense foods than a daily staple.",
  ],
  emoji: "🔴",
};

export default lychee;
