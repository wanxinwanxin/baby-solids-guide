import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const nori: Food = {
  slug: "nori",
  name: "Nori (seaweed)",
  aliases: ["seaweed", "laver", "sushi seaweed"],
  category: "fat-other",
  minAgeMonths: 6,
  ironRich: false,
  commonAllergen: null,
  chokingRisk: "moderate",
  chokingNotes:
    "Moistened nori turns into a clinging film that can paste itself across the roof of the mouth or over the airway, much like plastic wrap. Mitigate by crumbling it into tiny flecks that soften into food, or serving freshly toasted pieces so crisp they shatter — never a large, chewy sheet.",
  nutritionHighlights: [
    "One of the few everyday foods that supplies iodine, which thyroid hormones need for brain development",
    "Carries some vitamin A and folate in a nearly calorie-free wrapper",
    "An early introduction to savory umami flavor with no salt added — if you buy the plain sheets",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "A quarter of a plain toasted nori sheet crumbled into confetti flecks smaller than your pinky fingernail, stirred into rice porridge, mashed avocado, or another moist food so each fleck softens.",
      passFailTest:
        "Stir the flecks in and wait a minute: each should soften and merge into the food. A piece that stays film-like and clings to a wet fingertip is too big — crumble finer.",
      whyThisForm:
        "A wet strip of nori behaves like clingfilm in a small mouth, so the safe format is flecks tiny enough to dissolve into the dish they ride in on.",
      prepSteps: [
        "Choose plain toasted nori sheets — not the seasoned snack packs, which carry salt and oil.",
        "Crumble a quarter sheet between your fingers into flecks smaller than a pinky nail.",
        "Stir the flecks into rice porridge, mash, or puree and give them a minute to soften before serving.",
      ],
      commonMistakes: [
        "Handing over a strip or corner of the sheet to suck on — wet nori is exactly the clinging texture to avoid.",
        "Using seasoned 'snack nori' — the crinkly single-serve packs are salted and oiled for adult snacking.",
        "Scattering the flecks on dry food where they never soften.",
      ],
      media: [],
    },
    {
      band: "9-12m",
      form: "Freshly toasted, crackly nori broken into pieces about the size of a postage stamp that shatter between your fingers, offered one or two at a time, or flecks crumbled over rice and mash as before.",
      passFailTest:
        "The snap test: a piece should shatter crisply when you bend it. If it flexes or tears limply, the air has softened it back into clinging film — re-toast before serving.",
      whyThisForm:
        "A truly crisp piece shatters and dissolves almost instantly on a wet tongue, giving the pincer-grasp stage a dramatic, safe texture — but only while it stays crackly.",
      prepSteps: [
        "Wave a plain sheet briefly over low stove heat or warm it in a dry pan until it crisps and turns a deeper green.",
        "Break it into postage-stamp pieces and serve immediately, one or two at a time.",
        "Keep crumbling flecks into rice, porridge, and mashes as the everyday format.",
      ],
      commonMistakes: [
        "Serving pieces that sat out and went leathery — nori absorbs room moisture within minutes and turns back into film.",
      ],
      media: [],
    },
    {
      band: "12-24m",
      form: "Crisp nori pieces as an occasional snack, flecks stirred through rice and noodle dishes, or a thin single layer of nori pressed around a small soft rice ball — still no large chewy sheets to gnaw.",
      passFailTest:
        "Any piece offered whole still has to pass the snap test, and a nori-wrapped rice ball should be small enough to disappear in two toddler bites.",
      whyThisForm:
        "Toddlers manage crisp nori and thin wrapped layers well, but a big sheet gone chewy can still drape and cling in a small throat, so size and crispness remain the rules.",
      prepSteps: [
        "Press a small strip of nori around a soft, slightly sticky rice ball so the layer is thin and bonded to the rice.",
        "Offer crisp pieces straight from a freshly opened or re-toasted sheet as a snack.",
      ],
      commonMistakes: [
        "Letting a toddler gnaw a whole dried sheet like a cracker — saliva turns it into a large clinging film mid-chew.",
      ],
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["rice", "avocado", "salmon", "egg"],
  tips: [
    "Buy the plain sushi-style sheets from the international aisle — the ingredient list should read seaweed, full stop.",
    "Ten seconds over low heat re-crisps a leathery sheet and makes it shatter-safe again.",
    "Store sheets airtight with the little desiccant packet kept well out of reach — nori goes limp in humid air fast.",
    "Crumbled nori is a savory bridge food: a pinch over rice or mashed avocado often wins over babies who refuse plain versions.",
  ],
  sources: [SOURCES.wicGuide, SOURCES.cdcFoodsAndDrinks, SOURCES.cdcChokingHazards],
  nutrients: ["folate", "vitaminA"],
  servingGuidance: [
    {
      band: "6-8m",
      typicalAmount:
        "A pinch of crumbled flecks — up to about a quarter sheet — stirred into a dish, a few times a week rather than daily.",
      note: "Seaweed concentrates iodine, so small and occasional is the right rhythm.",
    },
    {
      band: "9-12m",
      typicalAmount:
        "Up to about half a sheet's worth as flecks or crisp pieces on the days it appears.",
      frequency: "A few times a week is plenty.",
    },
    {
      band: "12-24m",
      typicalAmount:
        "Around half to one sheet on nori days — a snack portion, not a bowl to graze through.",
      frequency: "Keep it an occasional player, a few times a week.",
    },
  ],
  watchOuts: [
    "Seaweed concentrates iodine — a small pinch a few times a week is helpful, but daily heaps can be too much for a small thyroid.",
    "Seasoned snack nori carries real salt and oil — choose plain toasted sheets for babies.",
    "Nori's habits don't transfer to other seaweeds: kelp and kombu run far higher in iodine, and hijiki is flagged for arsenic — skip those entirely.",
  ],
  emoji: "🍙",
};

export default nori;
