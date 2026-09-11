import type { FamilyRecipe } from "@/content-schema/recipe";

const recipe: FamilyRecipe = {
  slug: "egg-fried-rice",
  name: "Egg fried rice with peas & carrots",
  emoji: "🍳",
  time: "15 min",
  serves: "Family of 4",
  ingredients: [
    "4 cups cooked rice, ideally day-old and cold",
    "3 large eggs, beaten",
    "1 cup frozen peas and diced carrots",
    "2 scallions, sliced",
    "2 tbsp neutral oil, divided",
    "1 tbsp soy sauce",
    "1/2 tsp toasted sesame oil",
    "Diced ham or leftover chicken (optional)",
  ],
  steps: [
    "Break the cold rice apart with wet hands so no clumps go into the wok.",
    "Heat 1 tbsp oil over high heat, scramble the eggs into small pieces, and set aside.",
    "Add the remaining oil, stir-fry the peas and carrots (and ham, if using) for 2 minutes.",
    "Add the rice and toss 2–3 minutes, pressing clumps flat, until every grain is hot and separate.",
    "Return the eggs, season with soy sauce and sesame oil, toss with the scallions, and serve.",
  ],
  whyItWorks:
    "Fried rice is the great leftovers laundromat — yesterday's rice and whatever vegetables are around become the dinner kids ask for. Small egg pieces and sweet peas hide in every bite.",
  tips: [
    "Day-old rice fries into separate grains; fresh rice steams into mush. Spread fresh rice on a tray to cool if that's all you have.",
    "Let kids pick one add-in each — ownership is the best seasoning for a picky eater.",
  ],
};

export default recipe;
