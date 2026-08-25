import type { FoodCategory } from "@/content-schema/food";
import type { Msg, Msgs } from "../config";

/** Insights page copy (src/app/insights/page.tsx). */
export const insightsMsgs = {
  title: { en: "Insights", zh: "洞察" },
  setupTitle: { en: "Set up a profile to see insights", zh: "先建立档案才能查看洞察" },
  setupBody: { en: "Insights are built from your own logs.", zh: "洞察由你自己的记录生成。" },
  startOnboarding: { en: "Start onboarding →", zh: "开始设置 →" },
  nothingTitle: { en: "Nothing to chart yet", zh: "还没有可展示的数据" },
  nothingBody: {
    en: "Insights grow out of your logs — variety, iron, allergens, textures. Log a meal or two and this page fills in.",
    zh: "洞察来自你的记录——食物种类、铁、过敏原、质地。记上一两餐，这个页面就会丰富起来。",
  },
  logAFood: { en: "Log a food →", zh: "记录一种食物 →" },
  nameLogs: { en: "{name} · {n} logs", zh: "{name} · {n} 条记录" },
  varietyTitle: { en: "Variety, last 14 days", zh: "食物种类，最近 14 天" },
  varietyAria: {
    en: "Distinct foods eaten per category in the last 14 days",
    zh: "最近 14 天每个类别吃过的不同食物数",
  },
  gapSentence: {
    en: "Nothing from {label} in 2 weeks — {suggestion}.",
    zh: "已经两周没吃{label}了——{suggestion}。",
  },
  ironTitle: { en: "Iron-rich exposures per week", zh: "每周富含铁食物次数" },
  ironAria: {
    en: "Iron-rich foods eaten per week over the last 4 weeks",
    zh: "最近 4 周每周吃到的富含铁食物次数",
  },
  weekEnding: { en: "week ending {date}", zh: "截至 {date} 的一周" },
  ironNote: {
    en: "Iron stores dip around 6 months — iron-rich foods are the priority.",
    zh: "宝宝体内的铁储备在 6 个月左右开始下降——富含铁的食物是重中之重。",
  },
  allergenTitle: { en: "Allergen coverage", zh: "过敏原覆盖" },
  statIntroduced: { en: "Introduced", zh: "已引入" },
  statMaintaining: { en: "Maintaining", zh: "保持中" },
  statPaused: { en: "Paused", zh: "已暂停" },
  statNotStarted: { en: "Not started", zh: "未开始" },
  ofNine: { en: "Of the 9 common allergens.", zh: "以 9 种常见过敏原计。" },
  manageTracker: { en: "Manage in the tracker →", zh: "在追踪器中管理 →" },
  textureTitle: { en: "Texture practice", zh: "质地练习" },
  noRecentLogs: { en: "No logs in the last 8 weeks yet.", zh: "最近 8 周还没有记录。" },
  textureNote: {
    en: "Which prep bands you practiced, week by week.",
    zh: "每周练习过哪些月龄段的质地。",
  },
  refusalsTitle: { en: "Worth another relaxed try", zh: "值得再轻松试一次" },
  noRefusals: {
    en: "No stuck refusals right now — everything offered lately landed okay.",
    zh: "目前没有一直被拒绝的食物——最近提供的都还不错。",
  },
  offersNote: { en: "It can take 8–15 relaxed offers.", zh: "可能需要 8–15 次轻松的尝试。" },
  tries: { en: "· {n} tries", zh: "· 试过 {n} 次" },
  nutrientTitle: { en: "Nutrient variety, last 7 days", zh: "营养种类，最近 7 天" },
  nutrientNote: {
    en: "How many eaten foods this week carried each nutrient — a rough picture of the mix, not a target.",
    zh: "这一周吃下的食物里有多少含有每种营养——只是大致的搭配情况，不是目标。",
  },
  historyLink: { en: "See the logs behind this →", zh: "查看背后的记录 →" },
} satisfies Msgs;

/** Descriptive gap nudges — suggestions, never judgments. */
export const GAP_SUGGESTION_MSGS: Record<FoodCategory, Msg> = {
  vegetable: {
    en: "soft-steamed veg sticks are an easy add",
    zh: "蒸软的蔬菜条很容易加上",
  },
  fruit: { en: "a ripe banana needs no prep", zh: "熟透的香蕉无需任何准备" },
  protein: {
    en: "shredded chicken folds into most meals",
    zh: "鸡肉撕成丝，大多数餐里都能拌进去",
  },
  grain: { en: "oatmeal is a five-minute serve", zh: "燕麦粥五分钟就能上桌" },
  dairy: {
    en: "plain whole-milk yogurt is a one-spoon serve",
    zh: "原味全脂酸奶舀一勺就能吃",
  },
  legume: { en: "lentils reheat well", zh: "小扁豆加热一下就能吃" },
  "herb-spice": {
    en: "a pinch of cinnamon on a familiar food counts",
    zh: "在熟悉的食物上撒一小撮肉桂粉也算",
  },
  "fat-other": {
    en: "a drizzle of olive oil on veg counts",
    zh: "在蔬菜上淋一点橄榄油也算",
  },
};
