import type { Msgs } from "../config";

/** The /more page: the phone's version of the desktop "More" menu. */
export const moreMsgs = {
  metaTitle: { en: "More", zh: "更多" },
  metaDescription: {
    en: "All app sections: foods, recipes, guides, allergens, insights, safety, and extras.",
    zh: "应用的全部板块：食物、食谱、指南、过敏原、洞察、安全与其他功能。",
  },
  heading: { en: "More", zh: "更多" },
  intro: {
    en: "Everything the tab bar doesn't fit.",
    zh: "标签栏放不下的都在这里。",
  },
  descFoods: {
    en: "Every food, with the safe cut and texture per age",
    zh: "每种食物在各月龄的安全切法与质地",
  },
  descRecipes: {
    en: "Simple meals from foods baby can already eat",
    zh: "用宝宝已经能吃的食物做的简单餐食",
  },
  descLearn: { en: "Short guides on starting solids", zh: "辅食入门短指南" },
  descAllergens: { en: "Introduce the top 9 allergens on a schedule", zh: "按计划引入九大过敏原" },
  descInsights: { en: "Progress, variety, and patterns from your logs", zh: "从记录中看进度、多样性和规律" },
  descSafety: { en: "Gagging vs. choking, and what to do", zh: "干呕与窒息的分辨和处理" },
  descRead: { en: "Rhymes and 古诗 to read aloud, with pinyin", zh: "童谣与古诗，带拼音朗读" },
  descTour: { en: "A 30-second walkthrough of the app", zh: "30 秒了解应用" },
} satisfies Msgs;
