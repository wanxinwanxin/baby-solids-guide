import type { Msg, Msgs } from "../config";

/** Landing/marketing page copy (src/app/page.tsx). */
export const landingMsgs = {
  badge: {
    en: "FREE · NO ADS · DATA STAYS ON YOUR DEVICE",
    zh: "免费 · 无广告 · 数据只存在你的设备上",
  },
  heroTitle: {
    en: "Know exactly what to serve, and how",
    zh: "宝宝吃什么、怎么做，都一清二楚",
  },
  /** Rendered inside the accent-colored span that closes the headline. */
  heroTitleDot: { en: ".", zh: "。" },
  heroLede: {
    en: "Exact safe textures for every food, daily recommendations that adapt to your baby, and allergy playbooks built on NIAID, AAP, CDC, and WHO guidance — with a citation behind every claim.",
    zh: "每种食物都有精确到月龄的安全质地，每天的推荐会跟着宝宝的进度调整，过敏原引入方案基于 NIAID、AAP、CDC 和 WHO 的权威指南——每一条建议都有出处可查。",
  },
  ctaFresh: { en: "We're starting fresh", zh: "我们才刚开始" },
  ctaStarted: { en: "We've already started", zh: "我们已经开始了" },
  statFoods: { en: "FOODS, ALL FREE", zh: "种食物，全部免费" },
  statSources: { en: "FREE PRIMARY SOURCES", zh: "个免费权威来源" },
  statOpenSource: { en: "FREE & OPEN SOURCE", zh: "免费且开源" },
  passFail: { en: "PASS/FAIL ·", zh: "合格测试 ·" },
  mockEyebrow: { en: "TODAY FOR JUNI · 6.4 MO", zh: "JUNI 的今天 · 6.4 个月" },
  mockHeadline: {
    en: "Salmon, first fish — serve early in the day.",
    zh: "三文鱼，第一种鱼——安排在白天早些时候吃。",
  },
  mockMeta: {
    en: "Iron-rich pick · fish allergen №3 of 9 · watch for 2 hours after.",
    zh: "富含铁的选择 · 鱼类过敏原（9 种中第 3 种） · 吃完后观察 2 小时。",
  },
  mockCta: { en: "+ Log it in two taps", zh: "+ 点两下就记好" },
  threeAgesTitle: {
    en: "One food, three ages — the diagram grows with your baby",
    zh: "同一种食物，三个月龄段——切法图跟着宝宝一起长大",
  },
  learnTitle: { en: "New to solids? Start here", zh: "刚开始加辅食？从这里读起" },
  /** "All <n> chapters →" — number is an inline styled span, so split around it. */
  allChaptersBefore: { en: "All ", zh: "全部 " },
  allChaptersAfter: { en: " chapters →", zh: " 章 →" },
  minRead: { en: "{n} MIN READ", zh: "{n} 分钟阅读" },
  receiptsLabel: {
    en: "EVERY CLAIM CARRIES A RECEIPT →",
    zh: "每一条建议都有出处 →",
  },
  openSource: { en: "Open source ↗", zh: "开源项目 ↗" },
  ctaBandTitle: { en: "Meet us where you are.", zh: "走到哪一步，都能开始。" },
  ctaBandBody: {
    en: "A two-minute setup, whether it's day one or month four. No account, no paywall — ever.",
    zh: "两分钟完成设置，不管你们是刚加辅食第一天，还是已经吃了四个月。不用注册，没有付费墙——永远免费。",
  },
} satisfies Msgs;

/**
 * Landing-page band chips use a compact marketing style ("6–8 MO") that
 * differs from the app-wide `bandLabel` ("6–8 months"), so the en values
 * stay pinned here; zh matches the shared BAND_MSGS wording.
 */
export const LANDING_BAND_LABELS: Record<string, Msg> = {
  "6-8m": { en: "6–8 MO", zh: "6–8个月" },
  "9-12m": { en: "9–12 MO", zh: "9–12个月" },
  "12-24m": { en: "12–24 MO", zh: "12–24个月" },
};

/** One-line band captions for the banana story (mockup 03). */
export const LANDING_BAND_CAPTIONS: Record<string, Msg> = {
  "6-8m": {
    en: "Half a banana in its own peel handle — grippy, food-safe, nothing to cut.",
    zh: "半根香蕉留着果皮当握把——好抓、安全，连刀都不用动。",
  },
  "9-12m": {
    en: "Split along its seams, chopped to pinky-nail pieces for the new pincer grasp.",
    zh: "顺着果棱掰开，切成小指指甲盖大小的小块，正好练习刚学会的二指捏取。",
  },
  "12-24m": {
    en: "Offered whole — taking measured bites is the skill itself now.",
    zh: "整根递给宝宝——学会一口一口适量地咬，正是这个阶段要练的本领。",
  },
};

/** The three "question" marketing cards. */
export const LANDING_QUESTION_CARDS: { eyebrow: Msg; title: Msg; body: Msg }[] = [
  {
    eyebrow: { en: "01 · TEXTURE-FIRST", zh: "01 · 质地优先" },
    title: {
      en: "What does “safe” actually look like?",
      zh: "“安全”到底长什么样？",
    },
    body: {
      en: "Every food comes with a precise safe form for each age — and a physical pass/fail test, like the squish test, so you know it's right.",
      zh: "每种食物在每个月龄都有明确的安全形态，还配有能上手验证的测试——比如“一压就扁”测试，做没做对，一试就知道。",
    },
  },
  {
    eyebrow: { en: "02 · ADAPTS DAILY", zh: "02 · 每天都在调整" },
    title: { en: "What should we try today?", zh: "今天该给宝宝试什么？" },
    body: {
      en: "Log what your baby tried and how it went. Tomorrow's suggestions account for iron, allergen pacing, variety, and texture progress.",
      zh: "记下宝宝今天吃了什么、反应如何，明天的推荐就会综合考虑铁摄入、过敏原节奏、食物多样性和质地进度。",
    },
  },
  {
    eyebrow: { en: "03 · ALLERGY-AWARE", zh: "03 · 过敏心中有数" },
    title: { en: "How do we do allergens safely?", zh: "过敏原怎么加才安全？" },
    body: {
      en: "Risk-based allergen schedules from NIAID guidance, one new allergen at a time, and clear playbooks for every kind of reaction.",
      zh: "基于 NIAID 指南的风险分级引入计划，一次只加一种新过敏原，出现任何反应都有清晰的应对方案。",
    },
  },
];
