import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const blackberry: Food = {
  slug: "blackberry",
  name: "Blackberry",
  aliases: [],
  category: "fruit",
  minAgeMonths: 6,
  ironRich: false,
  commonAllergen: null,
  chokingRisk: "moderate",
  chokingNotes:
    "A large, firm blackberry is springy and rounded enough to lodge in a small airway, and supermarket berries are often picked firm. Mitigate by pressing every berry flat between your fingers or halving it lengthwise before serving; a truly ripe berry collapses at a touch, and any berry that resists a gentle squeeze gets flattened or cut, not served whole.",
  nutritionHighlights: [
    "One of the highest-fiber fruits, a real ally for baby digestion",
    "A good source of vitamin C, which helps the body absorb iron from plant foods",
    "Deep purple color comes from anthocyanins — the same pigments behind its antioxidant reputation",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "Each washed blackberry pressed completely flat between your thumb and finger before it reaches the tray, or the berries mashed into yogurt or oatmeal until no whole berry remains.",
      passFailTest:
        "Look at the tray: every berry should be a flattened disc or part of a mash, with nothing plump or rounded left. A berry that springs back after squeezing needs to be fully smashed or cut.",
      whyThisForm:
        "Flattening destroys the rounded, springy geometry that can plug an airway, and the resulting soft patty is easy for a palmar-grasp baby to rake up and gum with no teeth at all.",
      prepSteps: [
        "Wash the berries and pick out any with hard, pale, underripe drupelets.",
        "Press each berry flat between thumb and forefinger — a ripe one collapses instantly.",
        "Alternatively mash a handful into yogurt, oatmeal, or a fruit puree until uniform.",
        "Serve a few flattened berries at a time on the tray.",
      ],
      commonMistakes: [
        "Serving whole berries because they look soft — firmness varies wildly within one box, so every berry gets the squeeze.",
        "Panicking at the deep-purple mess: the staining is cosmetic, and dark flecks in the next diaper are normal.",
        "Choosing the biggest, firmest berries for the baby when the small squishy ones are the safer pick.",
      ],
      cutDiagram: "mash",
      media: [],
    },
    {
      band: "9-12m",
      form: "Soft ripe blackberries halved or quartered lengthwise into slim pieces for pincer practice, with any berry too firm to squash between two fingers pressed flat first.",
      passFailTest:
        "Squeeze one piece from the batch between two fingers — it should flatten without resistance, and no piece on the tray should look round from any angle.",
      whyThisForm:
        "Halved and quartered berries are ideal pincer-grasp targets, and cutting lengthwise removes the rounded cross-section that makes a firm whole berry risky.",
      prepSteps: [
        "Wash, then sort: soft ripe berries get halved or quartered lengthwise; firm ones get flattened or saved for the adults.",
        "Offer a few pieces at a time to keep pace with chewing.",
      ],
      commonMistakes: [
        "Cutting crosswise into rounds instead of lengthwise into strips.",
        "Skipping the squeeze test on a new box because last week's berries were soft.",
      ],
      cutDiagram: "quarter-lengthwise",
      media: [],
    },
    {
      band: "12-24m",
      form: "Whole soft ripe blackberries that dent under a light fingertip press, while the big firm berries in the same box still get halved lengthwise or flattened.",
      passFailTest:
        "The one-berry audit: press a berry from the serving — if it collapses easily it can go down whole; if it springs back, the knife or your thumb finishes the job.",
      whyThisForm:
        "Toddlers chew well enough for genuinely soft whole berries, but a firm oversized blackberry keeps the same risky springy-round profile, so the sorting habit stays.",
      prepSteps: [
        "Wash and sort by squeeze: soft ones serve whole, firm ones get halved or flattened.",
        "Serve alongside the family meal or stirred through yogurt.",
      ],
      commonMistakes: [
        "Letting the toddler graze from the open box, where the firmest berries are exactly the ones they will grab.",
      ],
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["yogurt", "oatmeal", "apple", "banana"],
  tips: [
    "Ripeness sorts itself with a gentle squeeze: a ready blackberry collapses at a touch, while an underripe one is springy and sour — flatten or cook the firm ones.",
    "Frozen blackberries, thawed until fingertip-soft, mash beautifully into porridge and cost far less out of season.",
    "The purple stains on hands, bib, and highchair lift with cold water first — hot water sets berry stains.",
    "Simmer a handful of firm berries for a few minutes and they collapse into an instant no-sugar compote for yogurt or oatmeal.",
  ],
  sources: [SOURCES.nhsFrom6Months, SOURCES.aapChoking, SOURCES.wicGuide],
  nutrients: ["fiber", "vitaminC"],
  servingGuidance: [
    {
      band: "6-8m",
      typicalAmount:
        "Three or four flattened berries, or a spoonful of mash stirred through porridge — dark flecks in the diaper afterward are normal.",
    },
    {
      band: "9-12m",
      typicalAmount:
        "A small handful of halved or quartered berries, offered a few pieces at a time.",
    },
    {
      band: "12-24m",
      typicalAmount:
        "A handful of soft whole berries with a meal or snack — fiber-rich, so let thirst and appetite set the pace.",
    },
  ],
  watchOuts: [
    "Blackberry seeds and skins pass through visibly in the diaper — startling in dark purple, completely harmless.",
    "Very generous servings of this high-fiber fruit can loosen stools; scale back if diapers say so.",
  ],
  emoji: "🫐",
};

export default blackberry;
