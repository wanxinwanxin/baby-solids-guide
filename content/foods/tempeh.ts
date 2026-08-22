import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const tempeh: Food = {
  slug: "tempeh",
  name: "Tempeh",
  aliases: ["fermented soybean cake"],
  category: "legume",
  minAgeMonths: 6,
  ironRich: true,
  commonAllergen: "soy",
  chokingRisk: "moderate",
  chokingNotes:
    "Tempeh is a dense, firm cake, and dry-baked or fried pieces turn hard and can break off in dense chunks. Mitigate by steaming or simmering until fork-tender before every serve in the first year, and shaping to strips early on rather than cubes.",
  nutritionHighlights: [
    "Iron and complete soy protein in one of the densest plant packages",
    "Fermentation of the whole soybean makes its minerals easier to absorb than in many soy foods",
    "Delivers the soy allergen in a whole-food form for early, steady exposure",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "Tempeh steamed or simmered for 15–20 minutes until a fork slides in easily, cut into one strip about the length and width of an adult pinky finger.",
      passFailTest:
        "Poke the thickest part with a fork — it should slide in without pressure — and a firm thumb-press should visibly dent the strip rather than bounce off.",
      whyThisForm:
        "A palmar-grasp baby traps the strip in a fist and gnaws the protruding end, so the simmer has to take tempeh from its firm packaged state to a texture bare gums can actually wear down.",
      prepSteps: [
        "Cut plain (unflavored) tempeh into pinky-width strips about two adult fingers long.",
        "Steam or simmer the strips in unsalted water for 15–20 minutes until fork-tender — this also mellows tempeh's natural bitterness.",
        "First time: serve early in the day, a small amount, and watch for 2 hours.",
        "Serve alongside familiar foods, never another new food, so any reaction can be traced to the soy.",
      ],
      commonMistakes: [
        "Serving tempeh straight from the package — it's pasteurized but far too firm and dry for a gumming baby.",
        "Baking or frying it crisp; the crust is exactly the texture to avoid this year.",
        "Buying pre-marinated tempeh, which front-loads salt and sweeteners.",
      ],
      cutDiagram: "strips",
      media: [],
    },
    {
      band: "9-12m",
      form: "Simmered fork-tender tempeh crumbled or diced into pieces about the size of a pinky fingernail, soft enough to squash between two fingers.",
      passFailTest:
        "Take a piece from the batch and press it between two fingers — it should crumble or flatten easily; pieces that resist go back in the steamer.",
      whyThisForm:
        "Tempeh's naturally crumbly grain breaks into ideal pincer-sized pieces once softened, giving picking-up practice with a protein-dense payoff.",
      prepSteps: [
        "Simmer or steam as before, then crumble or dice the softened tempeh into pinky-nail pieces.",
        "Fold the crumbles into rice, mashed sweet potato, or a mild unsalted sauce for moisture and grip.",
        "Scatter a few pieces at a time on the tray.",
      ],
      commonMistakes: [
        "Serving dry loose crumbles with nothing to bind them — a little sauce keeps them manageable and appealing.",
        "Skipping the softening step because the pieces are small.",
      ],
      media: [],
    },
    {
      band: "12-24m",
      form: "Bite-size cubes of braised or sauce-simmered tempeh served in family stir-fries, curries, and grain bowls, each cube denting easily under a fingertip.",
      passFailTest:
        "Press a cube from the pan — a fingertip should leave a clear dent; cubes with a hard seared shell are for the adults' plates.",
      whyThisForm:
        "Molars handle soft braised cubes well, and sauce-simmering lets tempeh join family meals while keeping the toddler's version tender and low-salt.",
      prepSteps: [
        "Simmer cubes in a mild tomato or coconut-based sauce until tender, portioning the toddler's serving before soy sauce or salt goes in.",
        "Offer cubes with rice and soft vegetables as a self-serve bowl.",
      ],
      commonMistakes: [
        "Sharing adult stir-fry tempeh glazed in soy sauce — the sodium load lands hardest on the smallest eater.",
      ],
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["rice", "broccoli", "sweet-potato", "avocado"],
  tips: [
    "The 15–20 minute simmer does double duty: it softens the cake to baby-safe and steams off the bitter edge adults notice too.",
    "Simmer the whole block at once, then portion — softened tempeh keeps three days in the fridge and freezes well in strips.",
    "Tempeh drinks up whatever it sits in: a few minutes in warm no-salt broth or mild sauce adds flavor without any salt shaker.",
    "Keeping soy in the rotation is the point — steady, repeated exposure is how early allergen tolerance is maintained.",
  ],
  sources: [SOURCES.eatStudy, SOURCES.cdcFoodsAndDrinks, SOURCES.aapChoking],
  nutrients: ["iron", "protein", "fiber"],
  servingGuidance: [
    {
      band: "6-8m",
      typicalAmount:
        "One softened strip at a time — gnawing and tasting count even before much is swallowed.",
      frequency: "Once tolerated, offer soy foods regularly — steady exposure helps maintain tolerance.",
    },
    {
      band: "9-12m",
      typicalAmount:
        "A tablespoon or two of soft crumbles folded into rice or mash — refill while the reaching continues.",
    },
    {
      band: "12-24m",
      typicalAmount:
        "A few soft cubes in the toddler's bowl at family meals — the toddler decides how many disappear.",
    },
  ],
  watchOuts: [
    "Pre-marinated and 'bacon-style' tempeh products are heavily salted and sweetened — buy the plain cake.",
    "Serve tempeh cooked through at this age, even though packaged tempeh is technically pasteurized.",
  ],
  emoji: "🫘",
};

export default tempeh;
