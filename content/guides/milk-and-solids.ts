import type { Guide } from "@/content-schema/food";
import { SOURCES } from "../sources";

const milkAndSolids: Guide = {
  slug: "milk-and-solids",
  title: "Milk still matters",
  summary:
    "How milk and solids share the job between 6 and 12 months — and why watching your baby beats counting ounces.",
  minRead: 3,
  sections: [
    {
      heading: "A slow handover, not a switch",
      paragraphs: [
        "Between 6 and 12 months, milk and solids trade places in slow motion. At 6 months, meals are tiny and breast milk or formula provides nearly everything. By around 9 months, solids contribute real nutrition and some milk feeds naturally shrink or drop away. By 12 months, food has quietly become the main event. At every point along the way, milk still leads — you never need to cut feeds to 'make room' for solids. Offer the meals, keep offering the milk, and let the ratio shift on its own.",
      ],
    },
    {
      heading: "What goes in the cup",
      paragraphs: [
        "One firm rule: no cow's milk as a drink before 12 months. It's low in iron, and as a beverage it crowds out the breast milk or formula that's still doing the nutritional heavy lifting. Dairy as food is a different story entirely — plain whole-milk yogurt and cheese are fine from around 6 months, and both make excellent early foods.",
        "Alongside meals, offer small sips of plain water in an open cup. Your baby will mostly play with it, wear it, and tip it over at first — that's the point. Open-cup practice now builds a real drinking skill and starts the long, gradual goodbye to bottles.",
      ],
    },
    {
      heading: "Your job, their job",
      paragraphs: [
        "The most useful feeding framework fits in one sentence: you decide what food is offered, and when and where it's offered — your baby decides whether to eat it and how much. This is responsive feeding, and it's the approach every major health body endorses. It means you never need to coax, count bites, play airplane past a closed mouth, or finish what's on the tray.",
        "It also means honoring the 'no.' A baby who turns their head, clamps their lips, or starts throwing food is telling you they're done, and believing them keeps mealtimes calm. Just as importantly, it keeps your baby's own appetite signals intact — the best lifelong tool anyone has for eating well.",
      ],
    },
    {
      heading: "Watch the baby, not the numbers",
      paragraphs: [
        "Appetite at this age swings wildly from day to day — a huge Tuesday, a two-bite Wednesday — driven by teething, sleep, growth spurts, and pure mystery. That's normal, and it's why counting ounces and grams meal by meal mostly manufactures anxiety. Zoom out to the week instead of the meal.",
        "The signals worth watching: your baby is growing along their own curve, producing wet diapers, and showing up to the tray curious more often than not. If those hold, feeding is going well — and if growth ever genuinely worries you, that's a conversation for your pediatrician, who has the chart, the history, and the judgment the internet doesn't.",
      ],
    },
  ],
  sources: [SOURCES.cdcFoodsAndDrinks, SOURCES.wicGuide, SOURCES.aapStartingSolids],
};

export default milkAndSolids;
