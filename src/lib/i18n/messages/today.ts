import type { Msg, Msgs } from "../config";

/** Today dashboard copy (src/app/today/page.tsx). */
export const todayMsgs = {
  // ——— Progress ring ———
  pctFoodsTried: { en: "{pct}% of foods tried", zh: "已尝试 {pct}% 的食物" },

  // ——— State C: no profile yet ———
  meetTitle: { en: "Let's meet your baby", zh: "来认识一下你的宝宝" },
  meetTitleDot: { en: ".", zh: "。" },
  meetLede: {
    en: "Two minutes of setup and we'll build a day-by-day plan — whether you're starting from scratch or already mid-journey.",
    zh: "只需两分钟设置，我们就会为你搭建一份逐日计划——无论你是从零开始，还是已经在半路上。",
  },
  startFresh: { en: "We're starting fresh", zh: "我们才刚开始" },
  alreadyStarted: { en: "We've already started", zh: "我们已经开始了" },
  browseBefore: { en: "Prefer to look around first? ", zh: "想先随便看看？" },
  browseFoodsLink: { en: "Browse all {n} foods", zh: "浏览全部 {n} 种食物" },
  browseAfter: { en: " without a profile.", zh: "，无需创建档案。" },

  // ——— State B: gated (not quite solids time) ———
  gatedEyebrow: { en: "{name} · {age} mo corrected", zh: "{name} · 矫正月龄 {age} 个月" },
  almostThere: { en: "Almost there", zh: "就快到了" },
  almostThereDot: { en: ".", zh: "。" },
  gatedLede: {
    en: "Not quite solids time yet — and that's exactly what today is for. Here's what to watch for; we'll flip to food picks the moment the signs line up.",
    zh: "还没到吃辅食的时候——而今天要做的正是等待和观察。下面是要留意的信号；只要信号都齐了，我们马上切换到食物推荐。",
  },
  readinessTitle: { en: "Readiness watch list", zh: "准备度观察清单" },
  fiveSigns: { en: "5 signs", zh: "5 个信号" },
  notAllThereYet: {
    en: "Not all there yet? Totally normal — most babies show all five around 6 months.",
    zh: "还没全部出现？完全正常——大多数宝宝要到 6 个月左右才会五个信号齐全。",
  },
  pedsTitle: { en: "Starting on your pediatrician's advice?", zh: "在儿科医生的建议下开始？" },
  pedsBody: {
    en: "Plenty of families start solids between 4 and 6 months on their pediatrician's specific guidance — sometimes before every readiness sign has appeared. If that's you, start the program today: we'll keep suggestions to smooth, mashable first foods, and your pediatrician's advice always comes first.",
    zh: "不少家庭会遵照儿科医生的明确指导，在 4 到 6 个月之间开始添加辅食——有时并不是每个准备信号都已出现。如果你正是这种情况，今天就可以开始：我们会把建议限定在细滑、易压成泥的初期食物，而儿科医生的建议永远优先。",
  },
  pedsButton: {
    en: "Our pediatrician advised us to start — begin today",
    zh: "儿科医生建议我们开始——今天就开始",
  },
  meanwhileBefore: { en: "Meanwhile, browse the ", zh: "在此期间，可以先浏览" },
  foodLibraryLink: { en: "food library", zh: "食物库" },
  meanwhileMid: { en: " or update the ", zh: "，或更新" },
  readinessChecklistLink: { en: "readiness checklist", zh: "准备度清单" },
  meanwhileEnd: { en: ".", zh: "。" },

  // ——— State A: ready — header row ———
  eyebrow: { en: "{date} · {age} mo · stage {stage}", zh: "{date} · {age} 个月 · 阶段 {stage}" },
  eyebrowCorrected: {
    en: "{date} · {age} mo corrected · stage {stage}",
    zh: "{date} · 矫正月龄 {age} 个月 · 阶段 {stage}",
  },
  prevDay: { en: "Previous day", zh: "上一天" },
  nextDay: { en: "Next day", zh: "下一天" },
  backToToday: { en: "← back to today", zh: "← 回到今天" },
  todayFor: { en: "Today for {name}", zh: "{name} 的今天" },
  tomorrowFor: { en: "Tomorrow for {name}", zh: "{name} 的明天" },
  dayFor: { en: "{day} for {name}", zh: "{name} 的 {day}" },
  syncing: { en: "syncing…", zh: "同步中…" },
  syncRetrying: { en: "sync retrying", zh: "同步重试中" },
  synced: { en: "synced ✓", zh: "已同步 ✓" },
  foodsAllergensStat: {
    en: "{tried} / {total} foods · {n} / 9 allergens",
    zh: "{tried} / {total} 种食物 · {n} / 9 种过敏原",
  },

  // ——— Preview banner ———
  previewingTomorrow: { en: "Previewing tomorrow", zh: "预览明天" },
  previewingDay: { en: "Previewing {day}", zh: "预览 {day}" },
  previewBefore: {
    en: "Suggestions assume the history you have today — each food you actually log sharpens the days after it. Changes on the ",
    zh: "这些建议基于你今天已有的记录——每实际记录一种食物，之后几天的建议就会更准。你在",
  },
  planBoardLink: { en: "plan board", zh: "计划板" },
  previewAfter: { en: " show up here instantly.", zh: "上的改动会立刻显示在这里。" },

  // ——— Account / backup nudges ———
  saveDataTitle: { en: "Save {name}'s data", zh: "保存 {name} 的数据" },
  accountBody: {
    en: "{n} logs live only on this device. Sign in once and everything follows you to any phone or laptop — free, no tracking.",
    zh: "{n} 条记录只保存在这台设备上。登录一次，数据就会跟着你出现在任何手机或电脑上——免费，也不追踪你。",
  },
  accountLink: { en: "Sign in with Google or email →", zh: "用 Google 或邮箱登录 →" },
  backupTitle: { en: "Back up {name}'s history", zh: "备份 {name} 的记录" },
  backupBody: {
    en: "{n} logs live only on this device. A one-tap export keeps them safe if the browser clears its storage.",
    zh: "{n} 条记录只保存在这台设备上。一键导出即可留个备份，就算浏览器清除了存储也不怕。",
  },
  exportNow: { en: "Export now →", zh: "立即导出 →" },
  remindNextWeek: { en: "remind me next week", zh: "下周再提醒我" },

  // ——— Check-ins ———
  checkIns: { en: "Check-ins", zh: "观察提醒" },
  checkReaction: { en: "Check for a reaction to {food}", zh: "看看 {food} 有没有引起反应" },
  dueAt: { en: "due {time}", zh: "{time} 到期" },
  logWhatYouSee: { en: "Log what you see", zh: "记录你的观察" },
  allClear: { en: "All clear ✓", zh: "一切正常 ✓" },
  upcomingCheck: {
    en: "Upcoming: {food} check at {time}",
    zh: "接下来：{time} 观察 {food} 的反应",
  },
  dismiss: { en: "dismiss", zh: "忽略" },

  // ——— Warnings ———
  playbook: { en: "Playbook →", zh: "应对手册 →" },

  // ——— Today's picks ———
  todaysPicks: { en: "Today's picks", zh: "今日推荐" },
  picksCriteria: {
    en: "Iron · allergen pace · variety · texture",
    zh: "铁 · 过敏原节奏 · 多样性 · 质地",
  },
  gentleStart: {
    en: "Starting gently: one new food at a time, kept going for 2–3 days while you watch — more picks unlock as foods are introduced.",
    zh: "温和起步：一次只引入一种新食物，连着吃 2–3 天并留心观察——引入的食物多了，推荐也会随之增多。",
  },
  allergenBadge: { en: "Allergen: {allergen}", zh: "过敏原：{allergen}" },
  familiar: { en: "Familiar", zh: "已熟悉" },
  greatFirstFood: { en: "Great first food", zh: "初食优选" },
  newFood: { en: "New food", zh: "新食物" },
  ironRichSuffix: { en: " · iron-rich", zh: " · 富含铁" },
  howToServe: { en: "How to serve →", zh: "做法 →" },
  logIt: { en: "Log it", zh: "记录" },

  // ——— Allergen plan ———
  allergenPlan: { en: "Allergen plan", zh: "过敏原计划" },
  nOf9Underway: { en: "{n} of 9 underway", zh: "已开始 {n}/9" },
  nOf9AllergensUnderway: {
    en: "{n} of 9 allergens underway",
    zh: "9 种过敏原中已开始 {n} 种",
  },
  nextUpAllergen: { en: "Next up: {allergen}", zh: "下一个：{allergen}" },
  onHold: { en: "on hold", zh: "暂缓" },
  manageTracker: { en: "Manage in the allergen tracker →", zh: "去过敏原追踪器管理 →" },
  allNineUnderway: {
    en: "All nine common allergens are underway or done — keep them in rotation.",
    zh: "九大常见过敏原都已开始或完成——记得保持轮换。",
  },

  // ——— Texture stage ———
  textureStage: { en: "Texture stage", zh: "质地阶段" },
  moveTo: { en: "Move to {stage} →", zh: "进入 {stage} →" },
  keepPracticing: {
    en: "Keep practicing at this stage — the app will suggest moving up when the logs show consistent, confident eating.",
    zh: "先在这个阶段继续练习——等记录显示宝宝吃得稳定、自信时，应用会建议升级。",
  },

  // ——— Meals / combos ———
  mealIdeasBefore: {
    en: "Meal ideas appear here once a few foods are logged safe — in the meantime, browse all ",
    zh: "等几种食物被记录为安全后，这里会出现餐食灵感——现在可以先浏览全部",
  },
  recipesLink: { en: "{n} blender-simple recipes", zh: "{n} 道用搅拌机就能做的简单食谱" },
  mealIdeasAfter: { en: ".", zh: "。" },
  makeItAMeal: { en: "Make it a meal", zh: "凑成一餐" },
  allRecipesLink: { en: "All recipes →", zh: "全部食谱 →" },
  todayBadgeSuffix: { en: " · today", zh: " · 今日" },
  comboFootnote: {
    en: "Only foods {name} has already handled safely (plus today's picks) make this list.",
    zh: "只有 {name} 已经安全吃过的食物（加上今日推荐）才会列在这里。",
  },

  // ——— Safe so far ———
  safeSoFar: { en: "Safe so far", zh: "目前安全" },
  oneFood: { en: "{n} food", zh: "{n} 种食物" },
  manyFoods: { en: "{n} foods", zh: "{n} 种食物" },
  safeLede: {
    en: "Eaten at least once with no reaction logged — {name}'s growing pantry. Keep favorites in rotation while the new ones arrive.",
    zh: "至少吃过一次且没有记录到反应——这是 {name} 不断扩充的食物库。在新食物陆续加入的同时，让喜欢的食物保持轮换。",
  },
  nMore: { en: "+{n} more →", zh: "还有 {n} 种 →" },

  // ——— Retry queue ———
  worthAnotherTry: { en: "Worth another try →", zh: "值得再试 →" },
  tryOne: { en: "try", zh: "次尝试" },
  tryMany: { en: "tries", zh: "次尝试" },
  refusalsNormal: {
    en: "Refusals are normal — it can take 8–15 relaxed offers before a food clicks.",
    zh: "被拒绝很正常——一种食物往往要轻松地试上 8–15 次才会被接受。",
  },

  // ——— Footer CTA ———
  quickLog: { en: "+ Quick log", zh: "+ 快速记录" },
} satisfies Msgs;

/** The 5 readiness signs shown in onboarding (OnboardingWizard.tsx) — we
 * don't store per-sign answers, so the gated state renders them as an
 * unchecked watch list, never as fabricated progress. */
export const READINESS_SIGNS: Msg[] = [
  {
    en: "Sits upright with little or no support",
    zh: "几乎不用扶就能坐直",
  },
  {
    en: "Steady head control",
    zh: "头部稳定，不摇晃",
  },
  {
    en: "Brings hands and toys to the mouth",
    zh: "会把手和玩具送进嘴里",
  },
  {
    en: "Watches your food with real interest",
    zh: "盯着你的食物，兴趣十足",
  },
  {
    en: "The tongue-thrust reflex has faded (food isn't automatically pushed back out)",
    zh: "挺舌反射已消退（食物不会被自动顶出来）",
  },
];
