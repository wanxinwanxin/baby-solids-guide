import type { Msgs } from "../config";

/** The Full day view dashboard (src/app/today/FullDayToday.tsx). */
export const fullDayMsgs = {
  greeting: { en: "Today for {name}", zh: "{name} 的今天" },

  toDoTitle: { en: "To do today", zh: "今天要做的" },
  toDoHint: { en: "Swipe right, or tap ✓, when it's done.", zh: "做完后向右滑动，或点 ✓。" },
  allCaughtUp: { en: "All caught up for today. 🎉", zh: "今天都做完啦。🎉" },
  tryFood: { en: "Try {food}", zh: "尝试 {food}" },
  markEaten: { en: "Ate it", zh: "已吃" },
  readHabit: { en: "Read to baby", zh: "读给宝宝听" },
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
  nextWindow: { en: "Next: {a} – {b}", zh: "下次：{a} – {b}" },
  readDone: { en: "Read today ✓", zh: "今天读过 ✓" },

  // Quick actions / links
  logFood: { en: "Log food", zh: "记辅食" },
  logBottle: { en: "Bottle", zh: "奶瓶" },
  logDiaper: { en: "Diaper", zh: "尿布" },
  logSleep: { en: "Sleep", zh: "睡眠" },
  history: { en: "History", zh: "历史" },
  plan: { en: "Plan", zh: "计划" },
  open: { en: "Open", zh: "打开" },
} satisfies Msgs;
