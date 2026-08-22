import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const mushrooms: Food = {
  slug: "mushrooms",
  name: "Mushrooms",
  aliases: ["button mushrooms", "cremini", "portobello"],
  category: "vegetable",
  minAgeMonths: 6,
  ironRich: false,
  commonAllergen: null,
  chokingRisk: "moderate",
  chokingNotes:
    "An undercooked mushroom is rubbery and springy — a bitten-off piece stays a slick, bouncy plug that resists gumming. Mitigate by cooking mushrooms fully soft every single time (never raw), slicing into thin strips or small pieces, and simmering well past the squeaky stage.",
  nutritionHighlights: [
    "Provide B vitamins that help the body turn food into energy",
    "A plant-side source of potassium",
    "Deliver some vitamin D when the label says UV-treated or sun-grown",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "Large mushroom caps sautéed and then simmered until fully tender, sliced into strips about the width of an adult finger and long enough to poke out of a small fist.",
      passFailTest:
        "Press a strip between thumb and forefinger — it should squash flat and tear apart with no rubbery spring; if it bounces back, keep simmering.",
      whyThisForm:
        "A finger-width strip gives a palmar-grasping baby something to fist and gnaw, and only long, gentle cooking takes mushroom from bouncy to gummable.",
      prepSteps: [
        "Slice large caps — portobello or big cremini — into finger-width strips.",
        "Sauté in a little olive oil for 3–4 minutes, then add a splash of water, cover, and simmer 5–8 minutes more.",
        "Squish-test the thickest strip; any spring means more time under the lid.",
        "Cool and serve one or two strips at a time.",
      ],
      commonMistakes: [
        "A quick adult-style sauté that leaves the center rubbery — mushrooms need the full simmer.",
        "Serving small button mushrooms whole or halved: rounded, slippery, and the wrong geometry.",
        "Seasoning with salt or soy sauce — babies get the umami for free without the sodium.",
      ],
      cutDiagram: "strips",
      media: [],
    },
    {
      band: "9-12m",
      form: "Fully cooked, tender mushrooms chopped into pieces about the size of a pinky fingernail and stirred through eggs, pasta, or rice.",
      passFailTest:
        "Pinch a piece — it should flatten without any bounce, and it should tear rather than stretch when pulled apart.",
      whyThisForm:
        "Pincer-stage babies pick up small pieces well, and chopping fully cooked mushrooms small removes the slick-plug hazard while their chew matures.",
      prepSteps: [
        "Cook as for 6–8 months, until strips pass the no-spring squish test.",
        "Chop into pinky-nail pieces.",
        "Stir into scrambled eggs, pasta, or rice so the slippery pieces arrive with grip.",
      ],
      commonMistakes: [
        "Chopping first and rushing the cook — small raw pieces sear outside and stay rubbery inside.",
        "Serving the pieces alone on a smooth tray, where they skate away from little fingers.",
      ],
      cutDiagram: "bite-size",
      media: [],
    },
    {
      band: "12-24m",
      form: "Well-cooked mushrooms quartered or chopped into soft bite-size pieces and served in family dishes, always fully cooked and never raw.",
      passFailTest:
        "A quartered piece should squash easily between two fingers and chew tender when you sample one yourself — no squeak, no spring.",
      whyThisForm:
        "Molars handle soft quartered mushrooms well, but raw mushroom stays both a chewing hazard and hard to digest, so the fully-cooked rule holds throughout this range.",
      prepSteps: [
        "Quarter small mushrooms or chop large ones, then cook until fully tender in sauces, stews, or a covered pan.",
        "Fold into pasta sauce, rice, or eggs at family meals.",
      ],
      commonMistakes: [
        "Offering raw mushroom slices from the salad bowl — raw stays off the menu for texture and digestibility alike.",
      ],
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["beef", "pasta", "egg", "rice"],
  tips: [
    "The lid is the trick: a splash of water and a cover steams mushrooms past their rubbery stage in minutes.",
    "Big caps beat buttons — one portobello cuts into perfect grippy strips, while buttons stay stubbornly round.",
    "Mushrooms shrink hard as they cook, so cut pieces bigger than the size you want on the tray.",
    "Their savory depth makes other vegetables more interesting — stir chopped mushrooms into whatever the family is simmering.",
  ],
  sources: [SOURCES.wicGuide, SOURCES.cdcFoodsAndDrinks, SOURCES.nhsFrom6Months],
  nutrients: ["potassium", "fiber"],
  servingGuidance: [
    {
      band: "6-8m",
      typicalAmount:
        "One or two soft strips at a time — gnawed, squeezed, and dropped all count as learning.",
    },
    {
      band: "9-12m",
      typicalAmount:
        "A tablespoon of chopped pieces stirred through eggs or pasta — refill while interest holds.",
    },
    {
      band: "12-24m",
      typicalAmount:
        "A small handful of soft quartered pieces in the family dish — let appetite set the amount.",
    },
  ],
  watchOuts: [
    "Serve only store-bought culinary mushrooms — never foraged or wild-picked ones, whose look-alikes can be genuinely dangerous.",
  ],
  emoji: "🍄",
};

export default mushrooms;
