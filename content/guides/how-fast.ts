import type { Guide } from "@/content-schema/food";
import { SOURCES } from "../sources";

const howFast: Guide = {
  slug: "how-fast",
  title: "How fast to go",
  summary:
    "A realistic pace for the first months: one relaxed meal to start, faster than you'd think on everyday foods, slower on allergens, and never a forced bite.",
  minRead: 3,
  sections: [
    {
      heading: "The first weeks: one meal, zero pressure",
      paragraphs: [
        "Start with one relaxed 'meal' a day, at a moment when your baby is rested and mildly hungry — not ravenous, not freshly full of milk. And define success generously: a single taste that actually goes down counts as a win. So does a meal where everything gets squished, dropped, and worn as a hat. Exploring is the job right now; eating is a side effect that shows up on its own schedule.",
      ],
    },
    {
      heading: "How quickly to add new foods",
      paragraphs: [
        "For everyday foods — vegetables, fruits, grains, and meats that aren't common allergens — you can move faster than most parents expect. A new food every day or two is completely fine. The old advice to wait several days between every single food isn't necessary for foods that rarely cause reactions, and moving briskly means more variety during the months when your baby is most open to it.",
        "The nine common allergens are the exception. Introduce those one at a time, with about 3 days between new allergens, and serve each debut early in the day so you have waking hours to watch for a reaction. Between allergen debuts, keep adding everyday foods at whatever pace suits you — the two tracks run in parallel.",
      ],
    },
    {
      heading: "Ramping up toward nine months",
      paragraphs: [
        "There's no fixed schedule, but the arc usually looks like this: one meal a day for the first few weeks, a second meal once the first feels routine, and by around 9 months most babies are taking 2–3 meals a day alongside their milk feeds. Follow your baby's interest rather than a timetable — some babies ramp up in a month, others take three, and both are normal. Milk feeds stay on demand throughout; you're adding meals around them, not swapping them out.",
        "Textures can ramp too. If you started with smooth purees, keep moving — thicker mashes, then lumps, then soft finger foods within a few weeks. Lingering on smooth food for months makes lumps harder to accept later.",
      ],
    },
    {
      heading: "Refusals are part of the plan",
      paragraphs: [
        "Your baby will refuse foods, sometimes theatrically. This is not a verdict. Research on infant feeding consistently finds it can take 8 to 15 relaxed exposures before a new food is accepted — the broccoli that gets thrown today is often eaten next month, provided it keeps showing up without drama.",
        "The one rule with no exceptions: never pressure, and never force-feed. No sneaking the spoon in during a distracted moment, no 'just one more bite,' no feeding in front of a screen to get food down. Keep offering, keep it calm, and let repetition do the work. Pressure teaches a baby to distrust the tray; patience teaches them to eat.",
      ],
    },
  ],
  sources: [SOURCES.nhsWeaning, SOURCES.wicGuide, SOURCES.aapMenu8to12],
};

export default howFast;
