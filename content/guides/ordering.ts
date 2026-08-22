import type { Guide } from "@/content-schema/food";
import { SOURCES } from "../sources";

const ordering: Guide = {
  slug: "ordering",
  title: "Does order matter?",
  summary:
    "Only two ordering rules have real evidence behind them — everything else, including vegetables-before-fruits, is preference dressed up as science.",
  minRead: 2,
  sections: [
    {
      heading: "The two rules with real evidence",
      paragraphs: [
        "Strip away the folklore, and the evidence supports exactly two rules about food order. First: iron-rich foods belong early and often. Your baby's iron stores are dipping right as solids begin, so meat, lentils, beans, eggs, and fortified infant cereal should appear in the first weeks — not after a long tour through purees of everything else.",
        "Second: the common allergens belong early too — introduced one at a time, then kept in the diet regularly once they're in. The window in which early exposure prevents allergy is real, and it's open now. Those are the rules. There is no third.",
      ],
    },
    {
      heading: "Vegetables before fruits? Not a thing",
      paragraphs: [
        "The classic advice to serve vegetables first 'so the baby doesn't develop a sweet tooth' sounds sensible and has no evidence behind it. Babies arrive preferring sweet — breast milk itself is sweet — and eating banana in week one doesn't rewire that. No feeding sequence can, because the preference is innate, not learned at the high chair.",
        "What actually builds acceptance of bitter and savory foods is repeated, relaxed exposure. Broccoli offered ten calm times beats broccoli offered first. The order you present foods in matters far less than whether the less-loved ones keep showing up without pressure.",
      ],
    },
    {
      heading: "There is no master sequence",
      paragraphs: [
        "Beyond iron and allergens, no medically 'correct' order of foods exists. No major health body publishes one, because the evidence doesn't support one. Cucumber before chicken or chicken before cucumber, mango in week two or month four — genuinely, it does not matter, and anyone selling you a rigid master sequence is selling certainty the science doesn't offer.",
        "That's not a gap in the research; it's freedom. Serve foods your family already eats, foods in season, foods from your own food culture, foods you're simply curious to watch your baby meet for the first time. They all count.",
      ],
    },
    {
      heading: "What this means in practice",
      paragraphs: [
        "Get iron on the tray early. Work through the allergens one at a time, and keep each one coming after its debut. Then fill everything around those two threads however you like — which is exactly what this app's planner is built for: it quietly holds the two evidence-based rules for you, and leaves every other choice where it belongs, with you.",
        "And if you catch yourself agonizing over whether pear should have come before zucchini — let it go. Your baby will meet hundreds of foods over the next two years. The sequence of the first twenty will not be what mattered; the calm, curious table you built around them will be.",
      ],
    },
  ],
  sources: [SOURCES.wicGuide, SOURCES.niaid2017, SOURCES.nhsFrom6Months],
};

export default ordering;
