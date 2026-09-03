import { allFoods } from "../../../content/foods";
import { allRecipes } from "../../../content/recipes";
import { allGuides } from "../../../content/guides";
import { allergenPrograms } from "../../../content/allergens";
import type { AllergenL10n, FoodL10n, GuideL10n, RecipeL10n } from "@/content-schema/l10n";
import type { Locale } from "@/lib/i18n/config";

/**
 * App-wide search: one flat index over destinations ("features") and the
 * content corpus. This module pulls the whole bundled corpus in, so it is
 * only ever imported from the lazily-loaded SearchDialog chunk — never from
 * the nav itself.
 */

export type SearchGroup = "feature" | "food" | "recipe" | "guide" | "allergen";

export type SearchEntry = {
  href: string;
  /** Display name in the active locale. */
  name: string;
  /** Secondary match strings: the other locale's name, aliases, synonyms. */
  alt: string[];
  group: SearchGroup;
  emoji?: string;
};

/** Optional zh overlays (loaded lazily, mirroring content-client.ts). */
export type ZhOverlays = {
  foods: Record<string, FoodL10n>;
  recipes: Record<string, RecipeL10n>;
  guides: Record<string, GuideL10n>;
  allergens: Record<string, AllergenL10n>;
};

type Feature = { href: string; en: string; zh: string; keywords: string[] };

/**
 * Hand-curated destinations with the words people actually reach for —
 * including the ones our labels do not use ("food menu", "菜单", "diary").
 * Keep keywords lowercase.
 */
const FEATURES: Feature[] = [
  {
    href: "/today",
    en: "Today",
    zh: "今日",
    keywords: ["what to feed", "picks", "daily", "home", "今天吃什么", "推荐", "首页"],
  },
  {
    href: "/log",
    en: "Log a food",
    zh: "记录喂食",
    keywords: ["log", "record", "add entry", "记一笔", "添加记录", "记录"],
  },
  {
    href: "/history",
    en: "Feeding history",
    zh: "喂养历史",
    keywords: ["journal", "diary", "past meals", "photos", "日记", "历史", "照片"],
  },
  {
    href: "/foods",
    en: "Food library",
    zh: "食物库",
    keywords: [
      "food menu", "food list", "all foods", "database", "how to cut", "texture",
      "菜单", "食物列表", "怎么切", "质地", "辅食",
    ],
  },
  {
    href: "/recipes",
    en: "Recipes",
    zh: "食谱",
    keywords: ["meal ideas", "cook", "combos", "菜谱", "做饭", "做法"],
  },
  {
    href: "/plan",
    en: "Plan",
    zh: "计划",
    keywords: ["planner", "schedule", "week", "print", "日程", "排期", "打印"],
  },
  {
    href: "/learn",
    en: "Learn",
    zh: "学习",
    keywords: ["guides", "articles", "basics", "when to start", "指南", "入门", "什么时候开始"],
  },
  {
    href: "/allergens",
    en: "Allergen tracker",
    zh: "过敏原追踪",
    keywords: ["allergy", "peanut", "egg", "exposure", "过敏", "花生", "鸡蛋"],
  },
  {
    href: "/insights",
    en: "Insights",
    zh: "洞察",
    keywords: ["stats", "charts", "progress", "variety", "统计", "图表", "进度"],
  },
  {
    href: "/safety",
    en: "Safety & emergency",
    zh: "安全与紧急",
    keywords: ["choking", "gagging", "cpr", "911", "first aid", "窒息", "干呕", "急救", "紧急"],
  },
  {
    href: "/read",
    en: "Read to baby",
    zh: "读给宝宝",
    keywords: [
      "rhymes", "poems", "poetry", "nursery", "read aloud", "pinyin",
      "唐诗", "古诗", "童谣", "拼音", "念", "朗读",
    ],
  },
  {
    href: "/account",
    en: "Account & sync",
    zh: "账户与同步",
    keywords: [
      "sign in", "login", "family", "invite", "partner", "backup", "caregiver", "export",
      "登录", "家人", "邀请", "同步", "备份", "看护", "导出",
    ],
  },
  {
    href: "/about",
    en: "About & sources",
    zh: "关于与来源",
    keywords: ["methodology", "sources", "privacy", "contact", "来源", "方法", "隐私", "联系"],
  },
  {
    href: "/onboarding",
    en: "Set up a baby",
    zh: "设置宝宝",
    keywords: ["add baby", "get started", "new baby", "profile", "添加宝宝", "开始", "档案"],
  },
];

/** Destination entries alone — the dialog shows these before any query. */
export function featureEntries(locale: Locale): SearchEntry[] {
  return FEATURES.map((f) => ({
    href: f.href,
    name: locale === "zh" ? f.zh : f.en,
    alt: [locale === "zh" ? f.en : f.zh, ...f.keywords],
    group: "feature" as const,
  }));
}

/**
 * The full index. `zh` carries the lazily-loaded overlays so Chinese names
 * are searchable in the zh locale; pass null before they arrive (or in en)
 * and the English corpus is used alone.
 */
export function buildSearchIndex(locale: Locale, zh: ZhOverlays | null): SearchEntry[] {
  const entries: SearchEntry[] = featureEntries(locale);
  for (const f of allFoods) {
    const overlay = zh?.foods[f.slug];
    const name = (locale === "zh" && overlay?.name) || f.name;
    const alt = [...f.aliases];
    if (overlay) alt.push(overlay.name, ...(overlay.aliases ?? []));
    if (name !== f.name) alt.push(f.name);
    entries.push({ href: `/foods/${f.slug}`, name, alt, group: "food", emoji: f.emoji });
  }
  for (const r of allRecipes) {
    const overlay = zh?.recipes[r.slug];
    const name = (locale === "zh" && overlay?.name) || r.name;
    const alt = overlay ? [overlay.name, r.name] : [];
    entries.push({ href: `/recipes/${r.slug}`, name, alt, group: "recipe" });
  }
  for (const g of allGuides) {
    const overlay = zh?.guides[g.slug];
    const name = (locale === "zh" && overlay?.title) || g.title;
    const alt = overlay ? [overlay.title, g.title] : [];
    entries.push({ href: `/learn/${g.slug}`, name, alt, group: "guide" });
  }
  for (const a of allergenPrograms) {
    const overlay = zh?.allergens[a.id];
    const name = (locale === "zh" && overlay?.name) || a.name;
    const alt = overlay ? [overlay.name, a.name] : [];
    entries.push({ href: `/allergens/${a.id}`, name, alt, group: "allergen" });
  }
  return entries;
}

function score(e: SearchEntry, q: string): number {
  const name = e.name.toLowerCase();
  if (name === q) return 100;
  if (name.startsWith(q)) return 90;
  if (name.includes(q)) return 70;
  let best = 0;
  for (const raw of e.alt) {
    const a = raw.toLowerCase();
    if (a === q) best = Math.max(best, 60);
    else if (a.startsWith(q)) best = Math.max(best, 50);
    else if (a.includes(q)) best = Math.max(best, 30);
  }
  return best;
}

/** Rank matches; ties break toward shorter names (the more exact hit). */
export function searchEntries(entries: SearchEntry[], query: string, limit = 14): SearchEntry[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return entries
    .map((e) => ({ e, s: score(e, q) }))
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s || a.e.name.length - b.e.name.length)
    .slice(0, limit)
    .map((x) => x.e);
}
