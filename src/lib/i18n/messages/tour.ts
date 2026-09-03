import type { Msgs } from "../config";

/** Guided walkthrough (Tour.tsx): the one-time offer card + the spotlight steps. */
export const tourMsgs = {
  offerTitle: { en: "New here?", zh: "第一次来？" },
  offerBody: {
    en: "Take a 30-second tour of the buttons that matter.",
    zh: "花 30 秒，认识几个最有用的按钮。",
  },
  showMeAround: { en: "Show me around", zh: "带我看看" },
  offerDismiss: { en: "No thanks", zh: "不用了" },
  back: { en: "Back", zh: "上一步" },
  next: { en: "Next", zh: "下一步" },
  done: { en: "Done", zh: "完成" },
  skip: { en: "Skip tour", zh: "跳过" },
  stepLabel: { en: "{n} of {total}", zh: "第 {n} 步，共 {total} 步" },

  navTitle: { en: "Your daily loop", zh: "每天的主线" },
  navBody: {
    en: "Today shows what to serve, History keeps the feeding journal, and Plan lays out the days ahead.",
    zh: "「今日」告诉你今天吃什么，「历史」是喂养日记，「计划」排好接下来的日子。",
  },
  logTitle: { en: "Log every taste", zh: "记录每一口" },
  logBody: {
    en: "One tap after each meal. The log drives tomorrow's picks, allergen tracking, and insights.",
    zh: "每餐后点一下。记录会驱动明日推荐、过敏原追踪和洞察。",
  },
  foodsTitle: { en: "The food library", zh: "食物库" },
  foodsBody: {
    en: "Every food, with the safe cut and texture for your baby's age. Look a food up here before you serve it the first time.",
    zh: "每种食物在当前月龄的安全切法和质地。第一次喂之前，先来这里查一查。",
  },
  moreTitle: { en: "More lives here", zh: "更多都在这里" },
  moreBody: {
    en: "Guides, allergens, and insights — plus extras like the read-aloud shelf of rhymes and 古诗.",
    zh: "学习指南、过敏原、洞察，还有「读给宝宝」的童谣与古诗。",
  },
  emergencyTitle: { en: "Emergency, one tap away", zh: "紧急情况，一键直达" },
  emergencyBody: {
    en: "Gagging vs. choking, and what to do. Read it once now, before you need it.",
    zh: "干呕与窒息的分辨和处理。建议现在先读一遍，有备无患。",
  },
  searchTitle: { en: "Search everything", zh: "搜索一切" },
  searchBody: {
    en: "Any food, recipe, or feature. English or 中文 both work.",
    zh: "任何食物、食谱或功能，中文英文都能搜。",
  },
  languageTitle: { en: "English · 中文", zh: "中英切换" },
  languageBody: {
    en: "The whole app switches languages here — handy for grandparents.",
    zh: "整个应用在这里切换语言——给爷爷奶奶用很方便。",
  },
} satisfies Msgs;
