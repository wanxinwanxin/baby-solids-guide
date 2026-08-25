import type { AgeBand } from "@/content-schema/food";
import type { Msg, Msgs } from "../config";

/** Food library index page (src/app/foods/page.tsx). */
export const foodsIndexMsgs = {
  metaTitle: { en: "Food library", zh: "食物库" },
  metaDescription: {
    en: "Every food with an exact safe texture per age, choking-hazard notes, allergen flags, and prep tips.",
    zh: "每种食物都有按月龄的精确安全质地、窒息风险提示、过敏原标注和处理技巧。",
  },
  heading: { en: "{n} foods, all free", zh: "{n} 种食物，全部免费" },
  /** Rendered inside the accent-colored span that closes the headline. */
  headingDot: { en: ".", zh: "。" },
  recipesLink: { en: "{n} recipes →", zh: "{n} 道食谱 →" },
} satisfies Msgs;

/** Food browser client component (src/app/foods/FoodBrowser.tsx). */
export const foodBrowserMsgs = {
  searchPlaceholder: {
    en: 'Search foods — try "salmon" or "sweet potato"',
    zh: "搜索食物——试试“三文鱼”或“红薯”",
  },
  searchLabel: { en: "Search foods", zh: "搜索食物" },
  filtersLabel: { en: "Filters", zh: "筛选" },
  bandGroup: { en: "BAND", zh: "月龄段" },
  showGroup: { en: "SHOW", zh: "显示" },
  yoursGroup: { en: "YOURS", zh: "你的记录" },
  categoryGroup: { en: "CATEGORY", zh: "分类" },
  greatFirstFoods: { en: "Great first foods", zh: "优选第一口辅食" },
  ironRich: { en: "Iron-rich", zh: "富含铁" },
  commonAllergens: { en: "{n} common allergens", zh: "{n} 种常见过敏原" },
  omega3: { en: "Omega-3", zh: "Omega-3" },
  vitaminC: { en: "Vitamin C", zh: "维生素C" },
  safeSoFar: { en: "Safe so far", zh: "目前安全" },
  notYetTried: { en: "Not yet tried", zh: "还没试过" },
  resultCount: { en: "{n} FOODS · SORTED A–Z", zh: "{n} 种食物 · 按名称排序" },
  monthsPlus: { en: "{n}m+", zh: "{n}个月+" },
  allergenBadge: { en: "Allergen: {a}", zh: "过敏原：{a}" },
  highChokingRisk: { en: "High choking risk", zh: "高窒息风险" },
  chokingCare: { en: "Choking care", zh: "注意防窒息" },
  greatFirstFood: { en: "Great first food", zh: "优选第一口辅食" },
} satisfies Msgs;

/**
 * Browser band chips use a compact style ("6–8 mo") that differs from the
 * app-wide `bandLabel` ("6–8 months"), so the en values stay pinned here.
 */
export const BROWSER_BAND_MSGS: Record<AgeBand, Msg> = {
  "6-8m": { en: "6–8 mo", zh: "6–8个月" },
  "9-12m": { en: "9–12 mo", zh: "9–12个月" },
  "12-24m": { en: "12–24 mo", zh: "12–24个月" },
};
