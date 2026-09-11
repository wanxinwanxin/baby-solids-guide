import type { FamilyRecipe } from "@/content-schema/recipe";

const recipe: FamilyRecipe = {
  slug: "banana-oat-pancakes",
  name: "Banana oat pancakes",
  emoji: "🥞",
  time: "20 min",
  serves: "Makes about 12 small pancakes",
  ingredients: [
    "2 ripe bananas",
    "2 large eggs",
    "1 cup rolled oats",
    "1/2 cup milk (any kind)",
    "1 tsp baking powder",
    "1/2 tsp cinnamon",
    "Pinch of salt",
    "Butter or oil for the pan; berries and yogurt to serve",
  ],
  steps: [
    "Blend everything into a thick, pourable batter and rest it 5 minutes so the oats soften.",
    "Heat a lightly buttered pan over medium-low and pour small pancakes, about 3 tablespoons each.",
    "Cook until bubbles pop on top and stay open, 2–3 minutes, then flip for another 1–2 minutes.",
    "Stack and serve with berries and a dollop of yogurt.",
  ],
  whyItWorks:
    "The bananas do the sweetening, so these are pancakes a parent can say yes to on a school morning — whole-grain oats, eggs, and no syrup required. Small size means kids can flip their own.",
  tips: [
    "Medium-LOW heat: banana batter burns before it sets on a hot pan.",
    "Leftovers freeze flat in a bag and revive in the toaster for weekday breakfasts.",
  ],
};

export default recipe;
