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
  /** The forward arrow stops here; say so rather than just greying it out. */
  previewCap: {
    en: "Preview stops {n} days out — further than that, the picks depend on what actually gets eaten.",
    zh: "预览最多只能看到 {n} 天后——再往后，推荐取决于宝宝实际吃了什么。",
  },
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
  manageHolds: { en: "Manage holds →", zh: "管理暂停 →" },
  hideNote: { en: "Hide", zh: "隐藏" },
  /** {message} = the note being hidden, so the button says what it hides. */
  hideNoteAria: { en: "Hide this note: {message}", zh: "隐藏这条提示：{message}" },
  hiddenNotesOne: { en: "1 note hidden.", zh: "已隐藏 1 条提示。" },
  hiddenNotesMany: { en: "{n} notes hidden.", zh: "已隐藏 {n} 条提示。" },
  showHiddenNotes: { en: "Show them", zh: "重新显示" },
  hidingKeepsHold: {
    en: "Hiding a note changes nothing it describes: a hold stays in force, and the note comes back if it happens again.",
    zh: "隐藏提示不会改变它所描述的情况：暂停依然有效，如果再次发生，提示会重新出现。",
  },

  // ——— Coming up (the plan, read forward) ———
  comingUp: { en: "Coming up", zh: "接下来" },
  /** {name} = baby nickname. */
  comingUpLede: {
    en: "The next foods on {name}'s plan, with enough notice to shop or batch-cook.",
    zh: "{name}计划里接下来的食物——提前知道，好去采购或提前做好。",
  },
  comingUpNowLabel: { en: "On the tray now", zh: "正在引入" },
  comingUpNothingNew: {
    en: "Nothing new on the tray today. The next food and its date are below.",
    zh: "今天托盘上没有新食物。下一种食物和它的日期在下面。",
  },
  comingUpEmpty: {
    en: "Every food on the plan has had its turn. Add more to keep the run going.",
    zh: "计划里的食物都轮过一遍了。再加一些，继续这个节奏。",
  },
  comingUpOnHold: { en: "Waiting on a hold", zh: "因暂停而搁置" },
  wholePlanLink: { en: "The whole plan →", zh: "完整计划 →" },
  /** {done} / {total} = foods introduced out of the plan's length. */
  planProgressStat: { en: "{done} of {total} introduced", zh: "{total} 种中已引入 {done} 种" },
  noPlanTitle: { en: "No plan yet", zh: "还没有计划" },
  /** {name} = baby nickname. */
  noPlanBody: {
    en: "A plan paces new foods so a reaction always points at one of them — and it's what fills this list with what to buy next.",
    zh: "计划会安排新食物的节奏，让出现反应时总能追溯到具体某一种——也正是它让这份清单告诉你接下来要买什么。",
  },
  buildPlanLink: { en: "Build a plan →", zh: "生成计划 →" },

  // ——— Today's picks ———
  todaysPicks: { en: "Today's picks", zh: "今日推荐" },
  tomorrowsPicks: { en: "Tomorrow's picks", zh: "明日推荐" },
  picksForDay: { en: "Picks for {day}", zh: "{day} 的推荐" },
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

  // ——— Nutrient profile + benefits (src/components/NutrientProfile.tsx) ———
  nutrientMixTitle: { en: "Today's nutrient mix", zh: "今日营养构成" },
  nutrientMixSub: {
    en: "How many of today's {n} picks carry each nutrient.",
    zh: "今日 {n} 种推荐里，各有几种能提供这项营养。",
  },
  nutrientMixSubOne: {
    en: "What today's pick brings to the table.",
    zh: "今天这一种推荐能提供什么。",
  },
  nutrientChartLabel: {
    en: "Nutrients across today's {n} picks — {list}",
    zh: "今日 {n} 种推荐覆盖的营养——{list}",
  },
  nutrientChartLabelOne: {
    en: "Nutrients in today's pick — {list}",
    zh: "今日这一种推荐覆盖的营养——{list}",
  },
  nutrientAriaItem: { en: "{nutrient} in {n} of {m}", zh: "{nutrient}：{m} 种中有 {n} 种" },
  nutrientAlso: { en: "Also: {list}", zh: "还有：{list}" },
  foodGroups: { en: "Food groups: {list}", zh: "食物类别：{list}" },
  listSep: { en: ", ", zh: "、" },
  benefitsTitle: { en: "What these picks bring", zh: "这些推荐能带来什么" },
  benefitSep: { en: " — ", zh: "：" },

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

/** Caregiver view (src/app/today/CaregiverToday.tsx) — the simplified Today
 * a helper sees on their own device: just the day's foods and their prep. */
export const caregiverMsgs = {
  emergencyLink: {
    en: "Worried right now? Emergency guide",
    zh: "现在就担心？看急救指南",
  },
  serveLede: {
    en: "What to serve {name} today, and exactly how to prepare it.",
    zh: "今天给{name}吃什么，以及具体怎么准备。",
  },
  howToPrepare: { en: "How to prepare", zh: "如何准备" },
  textureCheck: { en: "Safe-texture check:", zh: "安全质地检查：" },
  typicalAmount: { en: "Typical amount:", zh: "常见分量：" },
  fullGuide: { en: "Full guide →", zh: "查看完整指南 →" },
  nothingPlanned: {
    en: "No planned foods today — any familiar favorite is a great choice.",
    zh: "今天没有安排新食物——任何吃惯的食物都是好选择。",
  },
  caregiverNote: {
    en: "You're in caregiver view — just today's foods and how to prepare them.",
    zh: "当前是看护人视图——只显示今天的食物和做法。",
  },
  showFullApp: { en: "Show the full app", zh: "显示完整应用" },
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
