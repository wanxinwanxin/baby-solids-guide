import type { AgeBand } from "@/content-schema/food";
import type { Msg, Msgs } from "../config";

/**
 * Food detail page (src/app/foods/[slug]/page.tsx). English question
 * headings interpolate the lowercased food name; zh uses the localized
 * name directly — the page computes the right `{name}` per locale.
 */
export const foodDetailMsgs = {
  metaTitle: {
    en: "{name} for babies — safe texture by age",
    zh: "宝宝吃{name}——按月龄的安全形态",
  },
  // FAQPage JSON-LD questions (structured data only, never rendered).
  faqServe: {
    en: "How do I serve {name} to a baby at {age}?",
    zh: "{age}的宝宝怎么吃{name}？",
  },
  faqChoking: {
    en: "Is {name} a choking hazard for babies?",
    zh: "{name}会造成宝宝窒息风险吗？",
  },
  breadcrumbLabel: { en: "Breadcrumb", zh: "面包屑导航" },
  breadcrumbFoods: { en: "Foods", zh: "食物库" },
  greatFirstFood: { en: "Great first food", zh: "优选第一口辅食" },
  factAge: { en: "AGE", zh: "月龄" },
  factAllergen: { en: "COMMON ALLERGEN", zh: "常见过敏原" },
  factChoking: { en: "CHOKING RISK", zh: "窒息风险" },
  factIron: { en: "IRON", zh: "铁" },
  factGoodFor: { en: "GOOD FOR", zh: "营养亮点" },
  monthsPlus: { en: "{n} months +", zh: "{n}个月+" },
  no: { en: "No", zh: "不是" },
  chokingLow: { en: "Low", zh: "低" },
  chokingLowNote: { en: "· prep still matters", zh: "· 处理方式仍然重要" },
  chokingModerate: { en: "Moderate", zh: "中等" },
  chokingHigh: { en: "High — prep is the fix", zh: "高——正确处理是关键" },
  ironRich: { en: "Iron-rich", zh: "富含铁" },
  notIronRich: { en: "Not iron-rich", zh: "非富铁食物" },
  whenHeading: { en: "When can babies have {name}?", zh: "宝宝什么时候可以吃{name}？" },
  fromMonthsFirstPick: {
    en: "From {n} months (corrected age) — and it’s one of our curated great first foods.",
    zh: "从 {n} 个月起（按矫正月龄）——而且它是我们精选的第一口辅食之一。",
  },
  fromMonthsDefault: {
    en: "From {n} months (corrected age), in the age-right form below.",
    zh: "从 {n} 个月起（按矫正月龄），按下方对应月龄的形态来喂。",
  },
  serveHeading: { en: "How do I serve it at each age?", zh: "每个月龄该怎么喂？" },
  textureHeading: { en: "How do I get the texture right?", zh: "怎么把质地做对？" },
  chokingHeading: { en: "Is {name} a choking hazard?", zh: "{name}有窒息风险吗？" },
  chokingFallback: {
    en: "Low risk in the forms above — shape and texture do the safety work. Any food can be a hazard served the wrong way, so match the form to your baby’s age.",
    zh: "按上面的形态来喂，风险很低——安全靠的正是形状和质地。任何食物做法不对都可能带来窒息风险，所以一定要按宝宝的月龄选对形态。",
  },
  highChokingTitle: { en: "High choking risk — prep matters", zh: "高窒息风险——处理方式很关键" },
  chokingCareTitle: { en: "Choking care", zh: "注意防窒息" },
  allergenHeading: { en: "Is {name} a common allergen?", zh: "{name}是常见过敏原吗？" },
  commonAllergenLabel: { en: "Common allergen: {a}", zh: "常见过敏原：{a}" },
  allergenBody: {
    en: "Yes — introduce it early in the day, alongside familiar foods, and watch for 2 hours.",
    zh: "是——建议在一天中较早的时段引入，搭配宝宝熟悉的食物，之后观察 2 小时。",
  },
  allergenLink: { en: "See the {a} introduction program →", zh: "查看{a}引入计划 →" },
  watchHeading: { en: "Anything to watch for?", zh: "还有什么要注意的？" },
  nutrientsHeading: { en: "What nutrients does it bring?", zh: "它能带来哪些营养？" },
  ironTipLabel: { en: "Iron tip: ", zh: "补铁小贴士：" },
  ironTipBody: {
    en: "vitamin C boosts iron absorption — pair with ",
    zh: "维生素C能促进铁的吸收——可以搭配",
  },
  listSep: { en: ", ", zh: "、" },
  sentenceEnd: { en: ".", zh: "。" },
  pairingsHeading: { en: "What does it go with?", zh: "它和什么搭配好？" },
  recipesHeading: { en: "Recipes that use it", zh: "用到它的食谱" },
  ironCTag: { en: "IRON+C", zh: "铁+维C" },
  logCta: { en: "+ Log {name}", zh: "+ 记录{name}" },
  receiptsLabel: {
    en: "RECEIPTS — EVERY CLAIM TRACES TO A FREE PRIMARY SOURCE",
    zh: "出处——每一条建议都能追溯到免费的一手权威来源",
  },
  disclaimer: {
    en: "Educational guidance, not medical advice. Every baby develops differently — when in doubt, ask your pediatrician.",
    zh: "以上内容为教育性指导，不构成医疗建议。每个宝宝的发育节奏都不一样——拿不准时，请咨询儿科医生。",
  },
} satisfies Msgs;

/** Prep-band tabs client component (src/app/foods/[slug]/PrepBands.tsx). */
export const prepBandsMsgs = {
  ageBands: { en: "Age bands", zh: "月龄段" },
  safeFormAt: { en: "Safe form at {band}", zh: "{band}的安全形态" },
  passFailTag: { en: "PASS / FAIL", zh: "合格测试" },
  passFailSr: { en: "Pass/fail test: ", zh: "合格测试：" },
  whyThisForm: { en: "Why this form: ", zh: "为什么是这种形态：" },
  howToPrepare: { en: "How to prepare", zh: "制作步骤" },
  commonMistakes: { en: "Common mistakes", zh: "常见错误" },
  howMuch: { en: "How much?", zh: "吃多少？" },
  amountsNote: {
    en: "Amounts are starting points, not targets — watch the baby, not the numbers.",
    zh: "分量只是参考起点，不是任务指标——多看宝宝的状态，别盯着数字。",
  },
} satisfies Msgs;

/**
 * Prep-band tab chips use a compact mono style ("6–8 MO") that differs from
 * the app-wide `bandLabel` ("6–8 months"), so the en values stay pinned here.
 */
export const PREP_TAB_MSGS: Record<AgeBand, Msg> = {
  "6-8m": { en: "6–8 MO", zh: "6–8个月" },
  "9-12m": { en: "9–12 MO", zh: "9–12个月" },
  "12-24m": { en: "12–24 MO", zh: "12–24个月" },
};
