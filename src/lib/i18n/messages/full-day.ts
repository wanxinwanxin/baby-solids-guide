import type { Msgs } from "../config";

/** The Full day view dashboard (src/app/today/FullDayToday.tsx). */
export const fullDayMsgs = {
  greeting: { en: "Today for {name}", zh: "{name}的今天" },

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
  readHabit: { en: "📖 Read a book to {name}", zh: "📖 给{name}读一本书" },
  readHabitBody: {
    en: "A rhyme or a page counts. The Read to baby shelf has some.",
    zh: "一首童谣或一页书都算。“读给宝宝”里有现成的。",
  },
  markRead: { en: "Read it", zh: "已读" },

  doneTitle: { en: "Done today", zh: "今天已完成" },
  solidsTitle: { en: "Solids", zh: "辅食" },
  sleepTitle: { en: "Sleep", zh: "睡眠" },
  formulaTitle: { en: "Formula", zh: "配方奶" },
  diapersTitle: { en: "Diapers", zh: "尿布" },
  readingTitle: { en: "Reading", zh: "读书" },

  solidsEaten: { en: "{n} eaten", zh: "已吃 {n} 种" },
  noneYet: { en: "None yet", zh: "还没有" },
  bottlesToday: { en: "{n} bottles · {total}", zh: "{n} 瓶 · {total}" },
  diapersCount: { en: "{n} changes", zh: "换了 {n} 次" },
  sleepSoFar: { en: "{dur} so far", zh: "已睡 {dur}" },
  nextWindow: { en: "Next: {a} – {b}", zh: "下次：{a}–{b}" },
  readDone: { en: "Read today ✓", zh: "今天读过 ✓" },
  activitiesTitle: { en: "Activities", zh: "亲子活动" },
  activitiesCount: { en: "{n} logged", zh: "记了 {n} 次" },
  logActivity: { en: "Log activity", zh: "记录活动" },

  // Quick actions / links
  logFood: { en: "Log food", zh: "记辅食" },
  logBottle: { en: "Bottle", zh: "奶瓶" },
  logDiaper: { en: "Diaper", zh: "尿布" },
  logSleep: { en: "Sleep", zh: "睡眠" },
  history: { en: "History", zh: "历史" },
  plan: { en: "Plan", zh: "计划" },
  open: { en: "Open", zh: "打开" },
} satisfies Msgs;
