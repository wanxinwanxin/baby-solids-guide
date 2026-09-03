import type { Msgs } from "../config";

/** App-wide search dialog (SearchButton / SearchDialog). */
export const searchMsgs = {
  open: { en: "Search", zh: "搜索" },
  placeholder: { en: "Search foods, recipes, features…", zh: "搜索食物、食谱、功能……" },
  empty: {
    en: "No matches. Try another word — English and 中文 both work.",
    zh: "没有找到。换个词试试——中文和英文都可以。",
  },
  quickLinks: { en: "Jump to", zh: "快速前往" },
  groupFeatures: { en: "In the app", zh: "应用功能" },
  groupFoods: { en: "Foods", zh: "食物" },
  groupRecipes: { en: "Recipes", zh: "食谱" },
  groupGuides: { en: "Guides", zh: "指南" },
  groupAllergens: { en: "Allergens", zh: "过敏原" },
  hintKeys: { en: "↑↓ select · Enter open · Esc close", zh: "↑↓ 选择 · Enter 打开 · Esc 关闭" },
} satisfies Msgs;
