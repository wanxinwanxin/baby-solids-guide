import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const duck: Food = {
  slug: "duck",
  name: "Duck",
  aliases: ["duck leg", "duck breast"],
  category: "protein",
  minAgeMonths: 6,
  ironRich: true,
  commonAllergen: null,
  chokingRisk: "moderate",
  chokingNotes:
    "Firm slices of quick-cooked duck breast and chewy sheets of skin are the hazards — neither yields to bare gums. Mitigate by braising legs or thighs until the meat shreds under finger pressure, removing the skin, skimming the rendered fat, and never serving cubes or rare slices.",
  nutritionHighlights: [
    "Dark meat throughout, making duck one of the richer poultry sources of heme iron",
    "Provides zinc and vitamin B12 for growth and brain development",
    "High-quality protein with a deep flavor that broadens a baby's palate",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "A skinless braised duck-leg strip about the length and width of two adult fingers that shreds under gentle finger pressure, or finely shredded duck moistened with defatted braising liquid and folded into a familiar puree.",
      passFailTest:
        "The shred test: pinch the strip between thumb and forefinger and twist — the fibers should pull apart with almost no effort, and the surface should look glossy, never dry.",
      whyThisForm:
        "Babies at this age trap food in a whole-fist palmar grasp and gnaw the end sticking out, so a long, tender strip works as a handle while moist shreds in puree deliver iron by spoon.",
      prepSteps: [
        "Remove the skin from duck legs or thighs, then braise covered in unsalted water or broth at a low simmer for 1.5–2 hours until the meat falls off the bone.",
        "Skim the rendered fat off the braising liquid, pull the meat with the grain into two-finger strips, and check every piece for slivers of bone.",
        "Spoon a little of the skimmed liquid over the strip just before serving so it stays moist.",
        "Alternatively, shred the meat finely, moisten well, and fold into a vegetable puree the baby knows.",
      ],
      commonMistakes: [
        "Serving dry, crumbly meat — duck legs that braised long enough stay silky, and dryness is what makes meat hard to manage.",
        "Leaving the skin on: even crisped, it turns into a chewy sheet a baby cannot break down.",
        "Serving quick-seared duck breast, which is firm and often pink — only long-cooked, shreddable duck belongs at this age.",
      ],
      cutDiagram: "strips",
      media: [],
    },
    {
      band: "9-12m",
      form: "Finely shredded braised duck kept glossy with defatted braising liquid, in soft pieces between pea and pinky-nail size that mash between two fingers.",
      passFailTest:
        "Squeeze a pinch between two fingers — it should mash into soft fibers rather than spring back or crumble into dry grains; dry crumbs go back into the pot with a splash of liquid.",
      whyThisForm:
        "The pincer grasp emerges around 9 months, so small, moist, slightly clumpy shreds give precise-pickup practice while staying easy to gum and swallow.",
      prepSteps: [
        "Braise and skim as for 6–8 months, then chop the shredded meat into pea-to-pinky-nail pieces.",
        "Stir in enough braising liquid that the shreds clump softly instead of scattering.",
        "Scatter a few pieces at a time on the tray to prevent cheek-stuffing.",
      ],
      commonMistakes: [
        "Letting the shreds sit uncovered until they dry and toughen — moisture is the whole game with duck.",
        "Pieces larger than a pinky nail, which outmatch a gummy chew.",
      ],
      cutDiagram: "shred",
      media: [],
    },
    {
      band: "12-24m",
      form: "Tender braised duck cut across the grain into bite-size pieces no bigger than a pinky fingernail, moistened with skimmed pan juices before plating.",
      passFailTest:
        "Press a piece between thumb and finger — it should flatten and separate into fibers; a piece that stays a firm nugget needs more cooking time or a smaller cut.",
      whyThisForm:
        "First molars arrive in this window but real grinding is years away, so cutting across the grain shortens the fibers and keeps each bite falling apart easily.",
      prepSteps: [
        "Serve braised or slow-roasted duck from the family meal, skin removed, cut across the grain into pinky-nail pieces.",
        "Moisten with defatted pan juices or fold into a soft grain dish before plating.",
      ],
      commonMistakes: [
        "Graduating to sliced medium-rare duck breast because the toddler 'has teeth' — front teeth bite, they don't grind.",
      ],
      cutDiagram: "bite-size",
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["cherries", "orange", "sweet-potato", "lentils"],
  tips: [
    "Legs and thighs, not breast: duck breast is built for quick searing and never turns shreddable, while legs braise into exactly the silky texture babies need.",
    "Duck renders a remarkable amount of fat — skim it off the braising liquid, save it in a jar, and use a teaspoon of it to roast vegetables the baby already eats.",
    "Save the skimmed braising liquid itself as your remoistener; a spoonful stirred in just before serving rescues meat that dried in the fridge.",
    "Fruit is duck's best friend: a spoonful of cherry or orange puree stirred through the shreds softens the rich flavor for a first-timer.",
  ],
  sources: [SOURCES.wicGuide, SOURCES.aapStartingSolids, SOURCES.cdcChokingHazards],
  nutrients: ["iron", "protein", "zinc"],
  servingGuidance: [
    {
      band: "6-8m",
      typicalAmount:
        "One braised strip or a tablespoon of moist shreds folded into puree — even a few gnaws deliver meaningful iron.",
      frequency: "A few times a week works well as part of a daily iron-rich rotation.",
    },
    {
      band: "9-12m",
      typicalAmount:
        "One to two tablespoons of glossy shredded pieces, offered a scatter at a time — the baby sets the pace.",
    },
    {
      band: "12-24m",
      typicalAmount:
        "A few tablespoons of tender cross-grain pieces from the family braise — appetite swings day to day, and that's normal.",
    },
  ],
  watchOuts: [
    "Cured duck products — confit packed in salt, smoked duck, duck prosciutto — are heavily salted; plain braised or roasted duck is the baby-friendly version.",
  ],
  emoji: "🦆",
};

export default duck;
