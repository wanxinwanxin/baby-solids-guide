import type { Guide } from "@/content-schema/food";
import { SOURCES } from "../sources";

const whySolids: Guide = {
  slug: "why-solids",
  title: "Why solids at all?",
  summary:
    "Early solids are less about calories and more about skills, iron, flavors, and allergy prevention — milk stays the main event until around 12 months.",
  minRead: 3,
  sections: [
    {
      heading: "Milk is still doing the heavy lifting",
      paragraphs: [
        "Here is the single most reassuring fact about starting solids: breast milk or formula remains your baby's main source of nutrition until about 12 months. The first months of solid food add surprisingly few calories, and that is completely fine — it is how this stage is designed to work.",
        "So when the first weeks feel less like feeding and more like a science experiment conducted mostly on the floor, nothing has gone wrong. The milk feeds are still carrying the nutrition. The meals are doing other jobs — four of them, and they're worth knowing, because they change how you'll think about every messy tray.",
      ],
    },
    {
      heading: "Eating is a skill your baby has to learn",
      paragraphs: [
        "Swallowing milk is a reflex; eating food is not. Chewing, moving a lump from the side of the mouth to the middle, keeping a soft solid together long enough to swallow it — each of these is a physical skill, and like every physical skill it only develops through practice.",
        "Every gummed carrot stick and squished piece of toast is a rep. Babies who get relaxed, regular practice with real textures handle them with growing confidence — which is exactly what you want heading into toddlerhood, when the menu widens and opinions arrive.",
      ],
    },
    {
      heading: "The iron and zinc dip",
      paragraphs: [
        "Around 6 months, the iron stores your baby built up during pregnancy start to run low, and breast milk alone can't refill them. Zinc follows a similar curve. This is the one place where the food itself matters nutritionally from day one: iron-rich foods — meat, lentils, beans, eggs, fortified infant cereal — deserve a regular spot on the tray from the very first weeks.",
      ],
    },
    {
      heading: "Training the palate",
      paragraphs: [
        "Babies are figuring out what food even is right now, and they figure it out through repetition. A flavor rejected today is often accepted on the eighth or twelfth relaxed offer. These early months are a low-stakes window to build acceptance of a wide range of flavors and textures — bitterness, lumps, and all — while the audience is still open-minded and nobody expects a full meal to get eaten anyway.",
      ],
    },
    {
      heading: "The allergy-prevention window",
      paragraphs: [
        "This is the newest reason, and one of the most important. Large randomized trials — LEAP for peanut, EAT for a wider set of foods — showed that deliberately introducing common allergens in infancy, rather than delaying them, dramatically reduces the risk of developing food allergies. The first year isn't merely a safe time to serve peanut and egg; it is the best time.",
        "Put it all together: early solids are about learning to eat, protecting iron and zinc, training the palate, and preventing allergies. The calories come along for the ride — and by 12 months the balance will have quietly shifted toward food all on its own.",
      ],
    },
  ],
  sources: [SOURCES.aapStartingSolids, SOURCES.leapStudy, SOURCES.eatStudy],
};

export default whySolids;
