import type { Guide } from "@/content-schema/food";
import { SOURCES } from "../sources";

const whenToStart: Guide = {
  slug: "when-to-start",
  title: "When to start",
  summary:
    "Most babies are ready for solids around 6 months — but the real green light is a set of readiness signs, not a date on the calendar.",
  minRead: 3,
  sections: [
    {
      heading: "The readiness signs",
      paragraphs: [
        "Your baby, not the calendar, gives the green light. Look for all of these together: sitting upright with minimal support, steady head control that doesn't wobble when they reach for something, deliberately bringing hands and toys to the mouth, and genuine interest in your food — leaning in, tracking your fork, opening their mouth when a bite goes past. The signs matter as a set: a baby who stares hungrily at your plate but still folds sideways in the high chair isn't ready yet.",
        "A few things that are not readiness signs, despite the folklore: waking more at night, chewing on fists, hitting a certain weight. Those all happen to plenty of babies who are months away from solids.",
        "One more sign is invisible until you test it: the tongue-thrust reflex, which automatically pushes solids back out of the mouth, fades. If every taste comes straight back out on the tongue — not spat in protest, just reflexively pushed — that reflex is likely still active. Wait a week or two and try again; it costs nothing.",
      ],
    },
    {
      heading: "Around six months, for most babies",
      paragraphs: [
        "For most babies the signs converge around 6 months, which is why the AAP, WHO, and NHS all point to roughly that age. A few babies are ready a bit before, plenty a bit after. 'Around 6 months' means what it says — it's a zone, not a deadline. If you're unsure whether your baby qualifies, that's a question for your pediatrician, and it's a completely normal one to ask at the 4- or 6-month visit.",
      ],
    },
    {
      heading: "Premature babies: count from the due date",
      paragraphs: [
        "If your baby arrived early, use corrected age: count months from your original due date, not the birth date. A baby born two months early will typically hit readiness around 6 months corrected — about 8 months after birth. Preemies also vary more in their development than term babies, so plan the timing with your pediatrician rather than against a chart.",
      ],
    },
    {
      heading: "Why the window matters on both sides",
      paragraphs: [
        "Starting much earlier than the signs appear isn't a head start. A younger baby's digestive system and oral-motor skills simply aren't ready, and early solids mostly displace the milk that is doing the real nutritional work. A 4-month-old who 'seems interested' is usually interested in you, not the spinach.",
        "Waiting much past 6 or 7 months carries its own costs: iron stores keep dropping with nothing to replace them, the window in which introducing allergens actually prevents allergy begins to close, and babies who meet lumps and textures late tend to resist them harder. When the signs are there, there's no prize for waiting — pull up the high chair.",
      ],
    },
  ],
  sources: [SOURCES.aapStartingSolids, SOURCES.nhsWeaning, SOURCES.whoComplementary],
};

export default whenToStart;
