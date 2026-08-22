import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const liver: Food = {
  slug: "liver",
  name: "Chicken liver",
  aliases: ["chicken livers", "liver pâté"],
  category: "protein",
  minAgeMonths: 6,
  ironRich: true,
  commonAllergen: null,
  chokingRisk: "low",
  nutritionHighlights: [
    "Among the most concentrated food sources of iron, ounce for ounce",
    "Very high in preformed vitamin A — the reason servings stay small and roughly weekly",
    "Excellent source of vitamin B12, folate, and choline",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "About one teaspoon of fully cooked chicken liver blended with cooking liquid to a completely smooth, pâté-like puree the consistency of thick yogurt, offered on a spoon or stirred into a familiar vegetable puree.",
      passFailTest:
        "Drag a spoon through the puree — it should be uniformly smooth with no grainy flecks or firm lumps, and it should mound softly like thick yogurt rather than stand stiff.",
      whyThisForm:
        "Young infants manage smooth, spoonable textures best, and liver's intensity plus its vitamin A content mean a teaspoon-scale taste — not a full serving — is the right dose at this age.",
      prepSteps: [
        "Rinse chicken livers, trim any greenish spots or connective bits, and simmer in unsalted water for 8–10 minutes until no pink remains in the center.",
        "Blend with a few spoonfuls of the cooking water or breast milk/formula until perfectly smooth.",
        "Serve about one teaspoon, alone or folded into a familiar puree, no more than about once a week.",
      ],
      commonMistakes: [
        "Undercooking — liver must be cooked through, with no pink center, before pureeing.",
        "Serving liver daily or in large amounts: its preformed vitamin A accumulates, so small weekly tastes are the ceiling.",
        "Leaving the puree grainy instead of pâté-smooth, which makes an intense food harder to accept.",
      ],
      cutDiagram: "mash",
      media: [],
    },
    {
      band: "9-12m",
      form: "A paper-thin, see-through layer of smooth chicken-liver pâté spread on a soft toast strip about the size of one adult finger, or a teaspoon stirred into a lumpier mash.",
      passFailTest:
        "Hold the toast strip up — you should nearly see the bread through the pâté; a layer with visible thickness gets scraped back.",
      whyThisForm:
        "Self-feeding takes over around 9 months, and a graspable strip with a thin smear keeps liver in the rotation at the same small, roughly weekly dose.",
      prepSteps: [
        "Cook and blend the livers exactly as for 6–8 months; chill so the pâté firms slightly and spreads thin.",
        "Spread the thinnest possible layer on a lightly toasted, finger-width strip of bread.",
        "Keep the portion to about a teaspoon of pâté, roughly once a week.",
      ],
      commonMistakes: [
        "Spreading pâté thick like a sandwich filling — the weekly teaspoon-scale dose is the point.",
        "Using store-bought pâté, which is typically high in salt and may contain other ingredients not meant for babies.",
      ],
      cutDiagram: "thin-spread",
      media: [],
    },
    {
      band: "12-24m",
      form: "Small amounts of soft-cooked liver — a thin pâté smear on toast, a teaspoon blended into meatballs, bolognese, or a family stew — still capped at roughly one small serving a week.",
      passFailTest:
        "Any solid piece should flatten easily between two fingers into a soft paste; blended dishes should show no firm liver lumps.",
      whyThisForm:
        "Toddlers can handle liver's soft texture easily; the limit is nutritional, not mechanical — preformed vitamin A means small weekly amounts remain the rule through toddlerhood.",
      prepSteps: [
        "Blend a teaspoon or two of cooked liver into ground-meat dishes the family already eats.",
        "Or keep offering the thin pâté-on-toast strip from the earlier band.",
      ],
      commonMistakes: [
        "Treating liver like an everyday meat once the toddler likes it — frequency, not texture, is the constraint.",
      ],
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["apple", "sweet-potato", "beef", "bread"],
  tips: [
    "Simmering in water is the most reliable route to a smooth pâté — sautéed livers develop crusty edges that blend grainy.",
    "Blend a whole batch at once, then freeze teaspoon-size dollops in an ice-cube tray; one cube is exactly one weekly serving.",
    "Stir a teaspoon of liver puree into beef or lentil dishes — it disappears into the flavor while quietly boosting iron.",
    "A squeeze of apple or a spoonful of sweet-potato puree mellows liver's mineral edge for a baby meeting it for the first time.",
  ],
  sources: [SOURCES.wicGuide, SOURCES.nhsFrom6Months, SOURCES.cdcFoodsAndDrinks],
};

export default liver;
