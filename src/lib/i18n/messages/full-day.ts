import type { Msgs } from "../config";

/** The Full day view dashboard (src/app/today/FullDayToday.tsx). */
export const fullDayMsgs = {
  greeting: { en: "Today for {name}", zh: "{name}的今天" },

  // Today's progress bar (src/app/today/DayProgress.tsx)
  progressTitle: { en: "Today's progress", zh: "今天的进度" },
  /** {done} of {total} goals. */
  progressAria: { en: "{done} of {total} goals done today", zh: "今天完成了 {done}/{total} 个目标" },
  /** {food} = the plan's food for today. */
  progressPlanFood: { en: "Plan food: {food}", zh: "计划食物：{food}" },
  progressSolids: { en: "Solids today", zh: "今天吃辅食" },
  /** {n} activities logged today, {goal} = the daily goal. */
  progressActivities: { en: "Activities {n} of {goal}", zh: "亲子活动 {n}/{goal}" },
  progressAllDone: { en: "Every goal done today. 🎉", zh: "今天的目标都完成啦。🎉" },
  toDoTitle: { en: "To do today", zh: "今天要做的" },
  toDoHint: { en: "Swipe right, or tap ✓, when it's done.", zh: "做完后向右滑动，或点 ✓。" },
  allCaughtUp: { en: "All caught up for today. 🎉", zh: "今天都做完啦。🎉" },
  tryFood: { en: "Try {food}", zh: "尝试{food}" },
  /** A food the baby already eats — it fills the tray around the plan. */
  keepOffering: { en: "Keep offering {food}", zh: "继续给{food}" },
  /** The plan step being introduced again inside its observation window. */
  offerAgain: { en: "Offer {food} again", zh: "再给一次{food}" },
  /** {k} = position of the step, {total} = steps in the plan. */
  planStep: { en: "On the plan · step {k} of {total}", zh: "计划中 · 第 {k}/{total} 步" },
  /** {day} = day inside the observation window, {days} = its length. */
  planWatching: {
    en: "On the plan · day {day} of {days}, watching for a reaction",
    zh: "计划中 · 观察期第 {day}/{days} 天，留意反应",
  },
  markEaten: { en: "Ate it", zh: "已吃" },
  /** {name} = baby nickname. Shown at the top of the list when there is no plan. */
  noPlanRow: { en: "Build {name}'s plan first", zh: "先给{name}搭一个计划" },
  noPlanRowBody: {
    en: "The picks below are a best guess until there is a plan for them to follow.",
    zh: "有了计划，下面的推荐才会照着计划走。现在只是大致的猜测。",
  },
  /** {n} = distinct eaten foods the plan never listed. */
  offPlanRow: { en: "{n} foods eaten were never on the plan", zh: "已吃的 {n} 种食物不在计划里" },
  /** {name} = baby nickname. */
  offPlanRowBody: {
    en: "Re-suggest the rest of the plan from what {name} actually eats.",
    zh: "根据{name}实际吃过的食物，重新生成剩下的计划。",
  },

  doneTitle: { en: "Done today", zh: "今天已完成" },
  solidsTitle: { en: "Solids", zh: "辅食" },
  sleepTitle: { en: "Sleep", zh: "睡眠" },
  feedingTitle: { en: "Feeding", zh: "喂奶" },
  diapersTitle: { en: "Diapers", zh: "尿布" },

  solidsEaten: { en: "{n} eaten", zh: "已吃 {n} 种" },
  noneYet: { en: "None yet", zh: "还没有" },
  bottlesToday: { en: "{n} bottles · {total}", zh: "{n} 瓶 · {total}" },
  /** {n} feeds at the breast, {dur} on both sides together. */
  breastfeedsToday: { en: "{n} breastfeeds · {dur}", zh: "亲喂 {n} 次 · {dur}" },
  diapersCount: { en: "{n} changes", zh: "换了 {n} 次" },
  sleepSoFar: { en: "{dur} so far", zh: "已睡 {dur}" },
  nextWindow: { en: "Next: {a} – {b}", zh: "下次：{a}–{b}" },
  activitiesTitle: { en: "Activities", zh: "亲子活动" },
  activitiesCount: { en: "{n} logged", zh: "记了 {n} 次" },
  logActivity: { en: "Log activity", zh: "记录活动" },

  // Quick actions / links
  logFood: { en: "Log food", zh: "记辅食" },
  logBottle: { en: "Bottle", zh: "奶瓶" },
  logBreast: { en: "Breastfeed", zh: "亲喂" },
  logFeed: { en: "Log feed", zh: "记喂奶" },
  logDiaper: { en: "Diaper", zh: "尿布" },
  logSleep: { en: "Sleep", zh: "睡眠" },
  history: { en: "History", zh: "历史" },
  plan: { en: "Plan", zh: "计划" },
  open: { en: "Open", zh: "打开" },

  // Choose your cards (2026-10-28 feedback; design/today-widgets.md)
  customize: { en: "Customize", zh: "自定义" },
  customizeTitle: { en: "Choose your cards", zh: "选择要显示的卡片" },
  customizeHint: {
    en: "Turn off the cards you don't use, and move the ones you check most to the top. This changes only this phone.",
    zh: "关掉用不上的卡片，把最常看的移到上面。只影响这台手机。",
  },
  customizeDone: { en: "Done", zh: "完成" },
  customizeReset: { en: "Reset", zh: "恢复默认" },
  /** {card} = a card name. */
  moveUp: { en: "Move {card} up", zh: "把“{card}”上移" },
  moveDown: { en: "Move {card} down", zh: "把“{card}”下移" },
  showCard: { en: "Show {card}", zh: "显示“{card}”" },
  allHidden: { en: "All cards are hidden.", zh: "所有卡片都已隐藏。" },
  allHiddenLink: { en: "Choose cards", zh: "选择卡片" },
  tipTitle: { en: "New: choose your cards", zh: "新功能：自选卡片" },
  tipBody: {
    en: "Hide the cards you don't use, and put the ones you check most at the top.",
    zh: "隐藏用不上的卡片，把最常看的放在最上面。",
  },
  tipCustomize: { en: "Customize", zh: "去设置" },
  tipDismiss: { en: "Got it", zh: "知道了" },
  cardProgressBody: { en: "The plan food and the 5-activity goal", zh: "计划食物和 5 个亲子活动的目标" },
  cardTodoBody: { en: "The plan food and foods to try — swipe to log", zh: "计划食物和推荐食物，滑动即可记录" },
  cardSolidsBody: { en: "Foods eaten today", zh: "今天吃过的辅食" },
  cardSleepBody: { en: "Sleep so far and the next window", zh: "今天的睡眠和下一个入睡窗口" },
  cardFeedingBody: { en: "Bottles and breastfeeds today", zh: "今天的奶瓶和亲喂" },
  cardDiapersBody: { en: "Diaper changes today", zh: "今天换尿布的次数" },
  cardActivitiesBody: { en: "Activities done today", zh: "今天做过的亲子活动" },
} satisfies Msgs;
