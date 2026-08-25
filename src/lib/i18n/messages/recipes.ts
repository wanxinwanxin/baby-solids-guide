import type { RecipeMethod } from "@/content-schema/recipe";
import type { Msg, Msgs } from "../config";

/** Recipe surfaces (src/app/recipes/page.tsx, src/app/recipes/[slug]/page.tsx). */
export const recipesMsgs = {
  metaTitle: { en: "Recipes", zh: "食谱" },
  metaDescription: {
    en: "Blender-simple baby recipes: blend, mash, stir, or freeze into cubes. Built only from foods in the database, with iron + vitamin-C pairings marked.",
    zh: "适合宝宝的极简食谱：搅打、压泥、拌匀，或冷冻成小方块。全部由食物库里的食材组成，并标注了铁 + 维生素C 的搭配。",
  },
  heading: { en: "{n} blender-simple recipes", zh: "{n} 道搅一搅就好的食谱" },
  /** Rendered inside the accent-colored span that closes the headline. */
  headingDot: { en: ".", zh: "。" },
  intro: {
    en: "Nothing here is a cooking project: blend, mash, stir, or freeze into cubes and reheat. Every ingredient links to its safe-prep page, and iron + vitamin-C pairings are marked — that combination helps plant iron absorb.",
    zh: "这里没有什么大工程：搅一搅、压一压、拌一拌，或冷冻成小方块再加热就行。每种食材都链接到它的安全做法页面，铁 + 维生素C 的搭配也已标出——这种组合能帮助植物性铁吸收。",
  },
  ironShort: { en: "Iron + vit C", zh: "铁 + 维C" },
  ironLong: { en: "Iron + vitamin C", zh: "铁 + 维生素C" },
  breadcrumbRecipes: { en: "Recipes", zh: "食谱" },
  whatsInIt: { en: "What's in it", zh: "有什么食材" },
  ingredientNote: {
    en: "Tap any ingredient for its safe form at your baby's age — the recipe assumes those preps.",
    zh: "点任意食材，查看适合宝宝月龄的安全形态——食谱默认按这些做法准备。",
  },
  steps: { en: "Steps", zh: "步骤" },
  whyItWorks: { en: "Why it works", zh: "为什么这样搭" },
  storage: { en: "Storage", zh: "储存" },
  allRecipes: { en: "All recipes →", zh: "全部食谱 →" },
  recipeFallback: { en: "Recipe", zh: "食谱" },
} satisfies Msgs;

/**
 * Method labels as these pages currently render them. They intentionally
 * differ from METHOD_MSGS in @/lib/i18n/labels ("Freezer cubes" here vs
 * "Freeze into cubes" there), so the pages' English stays byte-identical.
 */
export const RECIPE_METHOD_MSGS: Record<RecipeMethod, Msg> = {
  blend: { en: "Blend", zh: "搅打" },
  mash: { en: "Mash", zh: "压泥" },
  stir: { en: "Stir", zh: "拌匀" },
  assemble: { en: "Assemble", zh: "组合" },
  "freeze-cubes": { en: "Freezer cubes", zh: "冷冻小方块" },
};
