import type { Msgs } from "../config";

/** App chrome: top nav, mobile tab bar, footer, root metadata. */
export const chromeMsgs = {
  navToday: { en: "Today", zh: "今日" },
  navFoods: { en: "Foods", zh: "食物" },
  navRecipes: { en: "Recipes", zh: "食谱" },
  navPlan: { en: "Plan", zh: "计划" },
  navLearn: { en: "Learn", zh: "学习" },
  navMore: { en: "More", zh: "更多" },
  navAllergens: { en: "Allergens", zh: "过敏原" },
  navHistory: { en: "History", zh: "历史" },
  navInsights: { en: "Insights", zh: "洞察" },
  navSafety: { en: "Safety", zh: "安全" },
  navEmergency: { en: "Emergency", zh: "紧急" },
  navLog: { en: "+ Log", zh: "+ 记录" },
  navLogAria: { en: "Log a food", zh: "记录一种食物" },
  navSignIn: { en: "Sign in", zh: "登录" },
  navAccount: { en: "Account", zh: "账户" },
  navSwitchBaby: { en: "Switch baby", zh: "切换宝宝" },
  navMain: { en: "Main", zh: "主导航" },
  navPrimary: { en: "Primary", zh: "主导航" },
  tagline: { en: "free, science-based baby solids guide", zh: "免费、科学的宝宝辅食指南" },
  share: { en: "Share", zh: "分享" },
  shareCopied: { en: "Link copied", zh: "链接已复制" },
  siteDescription: {
    en: "A free, open, science-based guide for starting your baby on solid foods: exact safe textures for every food, dynamic daily recommendations, and allergy playbooks grounded in NIAID and AAP guidance.",
    zh: "一份免费、开放、以科学为依据的宝宝辅食添加指南：每种食物在各月龄的安全质地、每日动态推荐，以及基于 NIAID 和 AAP 指南的过敏原引入方案。",
  },
  footerDisclaimer: {
    en: "{brand} is a free educational guide, not medical advice. Every baby is different — always follow your pediatrician's guidance. In an emergency, call 911.",
    zh: "{brand} 是一份免费的科普指南，不构成医疗建议。每个宝宝都不一样——请始终遵循儿科医生的指导。遇到紧急情况请拨打 911。",
  },
  footerSources: { en: "Sources & methodology", zh: "资料来源与方法" },
  footerSafety: { en: "Gagging vs. choking & emergencies", zh: "干呕与窒息 · 紧急情况" },
  footerAccount: { en: "Account & sync", zh: "账户与同步" },
  footerContact: { en: "Contact us", zh: "联系我们" },
} satisfies Msgs;
