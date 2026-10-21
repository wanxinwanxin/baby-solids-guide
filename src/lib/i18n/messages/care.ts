import type { Msgs } from "../config";

/** /care — breastfeeds, bottles, and diaper changes, synced per family. */
export const careMsgs = {
  metaTitle: { en: "Feeding & diapers", zh: "喂奶与尿布" },
  metaDescription: {
    en: "Log breastfeeds, bottles, and diaper changes, synced to the whole family.",
    zh: "记录亲喂、奶瓶和换尿布，与全家人的设备同步。",
  },
  heading: { en: "Feeding & diapers", zh: "喂奶与尿布" },
  intro: {
    en: "Breastfeeds, bottles, and diaper changes, in the same place as everything else.",
    zh: "亲喂、奶瓶和尿布记录，和其他记录都在一个地方。",
  },

  setupTitle: { en: "Set up your baby first", zh: "请先填写宝宝信息" },
  setupBody: { en: "Logging needs a baby profile.", zh: "记录之前需要先建立宝宝档案。" },
  startOnboarding: { en: "Start setup", zh: "开始设置" },

  // Breastfeeding (src/app/care/BreastfeedCard.tsx)
  breastTitle: { en: "Breastfeeding", zh: "亲喂" },
  sideLeft: { en: "Left", zh: "左侧" },
  sideRight: { en: "Right", zh: "右侧" },
  timerHint: {
    en: "Tap a side to start. Tap the other side to switch, or the same side to pause.",
    zh: "点一侧开始计时。点另一侧切换，再点同一侧暂停。",
  },
  timerRunning: { en: "running", zh: "计时中" },
  timerPaused: { en: "Paused", zh: "已暂停" },
  /** {dur} = time on both sides so far. */
  timerTotal: { en: "Total {dur}", zh: "共 {dur}" },
  nextSideTag: { en: "Next", zh: "下次" },
  /** {side} = "left"/"right" in the sentence; {ago} = "1 h 40 min". */
  lastFeedLine: {
    en: "Last feed started on the {side} side, {ago} ago.",
    zh: "上次从{side}开始，{ago}前。",
  },
  /** Last feed used both sides and nobody said which came first. {ago} = "1 h 40 min". */
  lastFeedLineNoSide: { en: "Last feed was {ago} ago.", zh: "上次喂奶是{ago}前。" },
  sideWordLeft: { en: "left", zh: "左侧" },
  sideWordRight: { en: "right", zh: "右侧" },
  finishFeed: { en: "Done", zh: "喂完了" },
  discardFeed: { en: "Discard", zh: "放弃" },
  discardConfirm: { en: "Discard this feed?", zh: "放弃这次计时？" },
  yesDiscard: { en: "Yes, discard", zh: "确认放弃" },
  keepTiming: { en: "Keep it", zh: "保留" },
  addPastFeed: { en: "Enter a past feed", zh: "补记一次" },
  startedAt: { en: "Started at", zh: "开始时间" },
  leftMinutes: { en: "Left (min)", zh: "左侧（分钟）" },
  rightMinutes: { en: "Right (min)", zh: "右侧（分钟）" },
  startedOn: { en: "Started on", zh: "先喂" },
  saveFeed: { en: "Save feed", zh: "保存" },
  breastNotePlaceholder: {
    en: "Optional — latch, sleepy, spit-up…",
    zh: "可选——衔乳、吃睡着了、吐奶……",
  },
  feedNeedsTime: {
    en: "Enter the minutes on at least one side.",
    zh: "请至少填一侧的分钟数。",
  },
  feedSideTooLong: { en: "One side can be at most 4 hours.", zh: "一侧最多 4 小时。" },
  /** Today's split under the timer. {n} feeds, {left}/{right} durations. */
  breastToday: {
    en: "Today: {n} feeds · left {left} · right {right}",
    zh: "今天：{n} 次 · 左侧 {left} · 右侧 {right}",
  },
  /** One row. {sides} = "left 12 min, right 8 min". */
  breastEntry: { en: "Breastfeed · {sides}", zh: "亲喂 · {sides}" },
  /** One side inside a row. {dur} = "12 min". */
  breastSideLeft: { en: "left {dur}", zh: "左 {dur}" },
  breastSideRight: { en: "right {dur}", zh: "右 {dur}" },
  breastSummary: { en: "{n} breastfeeds · {dur}", zh: "亲喂 {n} 次 · {dur}" },

  // Bottle
  formulaTitle: { en: "Bottle", zh: "奶瓶" },
  milkLabel: { en: "In the bottle", zh: "瓶里是" },
  milkFormula: { en: "Formula", zh: "配方奶" },
  milkBreast: { en: "Breast milk", zh: "母乳" },
  amountLabel: { en: "Amount", zh: "奶量" },
  customAmount: { en: "Custom", zh: "自定义" },
  logBottleBtn: { en: "Log bottle", zh: "记录喂奶" },
  fedAt: { en: "Fed at", zh: "喂奶时间" },
  noteLabel: { en: "Note", zh: "备注" },
  notePlaceholder: {
    en: "Optional — which formula, spit-up, how it went…",
    zh: "可选——哪种奶粉、吐奶、喝得怎么样……",
  },
  diaperNotePlaceholder: {
    en: "Optional — color, texture, rash…",
    zh: "可选——颜色、性状、红屁屁……",
  },

  // Diaper
  diaperTitle: { en: "Diaper", zh: "尿布" },
  kindWet: { en: "Wet (pee)", zh: "尿湿" },
  kindDirty: { en: "Dirty (poop)", zh: "便便" },
  kindMixed: { en: "Both", zh: "都有" },
  kindDry: { en: "Dry", zh: "干爽" },
  logDiaperBtn: { en: "Log diaper", zh: "记录换尿布" },
  changedAt: { en: "Changed at", zh: "更换时间" },

  // Lists
  todayTitle: { en: "Today", zh: "今天" },
  todayEmpty: { en: "Nothing logged today yet.", zh: "今天还没有记录。" },
  bottleSummary: { en: "{n} bottles · {total}", zh: "{n} 瓶 · {total}" },
  diaperSummary: { en: "{n} diapers", zh: "尿布 {n} 次" },
  sleepSummary: { en: "sleep {dur}", zh: "睡眠 {dur}" },
  recentTitle: { en: "Past days", zh: "往日记录" },
  recentHint: {
    en: "Tap a day to see every feed, diaper, and sleep — and to fix one.",
    zh: "点一天，查看当天每一次喂奶、尿布和睡眠，也可以在这里修改。",
  },
  recentEmpty: { en: "Older days appear here as you log.", zh: "记了几天之后，这里会按天汇总。" },
  /** Averages over the complete days listed below. {n} days, {bottles}/day, {ml}/day, {diapers}/day. */
  recentAverages: {
    en: "Average over the last {n} days: {bottles} bottles · {ml} ml · {diapers} diaper changes a day.",
    zh: "最近 {n} 天平均：每天 {bottles} 瓶 · {ml} 毫升 · 换尿布 {diapers} 次。",
  },
  /** The same window with no bottles in it. {n} days, {diapers}/day. */
  recentAveragesNoBottles: {
    en: "Average over the last {n} days: {diapers} diaper changes a day.",
    zh: "最近 {n} 天平均：每天换尿布 {diapers} 次。",
  },
  /** Added when the window holds breastfeeds. {feeds}/day, {dur}/day. */
  recentAveragesBreast: {
    en: "Breastfeeding: {feeds} feeds · {dur} a day.",
    zh: "亲喂：每天 {feeds} 次 · {dur}。",
  },
  daySleepTitle: { en: "Sleep", zh: "睡眠" },
  dayNoCare: { en: "No feeds or diapers logged.", zh: "没有喂奶或尿布记录。" },

  // Entry rows + edit panel
  formulaEntry: { en: "Bottle · {amount}", zh: "喂奶 · {amount}" },
  /** A bottle of expressed milk. {amount} = "120 ml". */
  breastMilkEntry: { en: "Bottle · {amount} · breast milk", zh: "喂奶 · {amount} · 母乳" },
  diaperEntry: { en: "Diaper · {kind}", zh: "尿布 · {kind}" },
  editEntry: { en: "Edit", zh: "编辑" },
  editAria: { en: "Edit the {what} entry at {time}", zh: "编辑 {time} 的{what}记录" },
  cancel: { en: "Cancel", zh: "取消" },
  saveChanges: { en: "Save", zh: "保存" },
  amountInvalid: { en: "Enter an amount above zero.", zh: "请输入大于零的奶量。" },
  futureTime: { en: "That time is in the future.", zh: "这个时间还没有到。" },
  deleteEntry: { en: "Delete", zh: "删除" },
  deleteConfirm: { en: "Delete this entry?", zh: "删除这条记录？" },
  yesDelete: { en: "Yes, delete", zh: "确认删除" },
  keepEntry: { en: "Keep", zh: "保留" },

  // Bottle history (src/components/FeedHistory.tsx)
  feedHistoryTitle: { en: "Bottle history", zh: "喂奶历史" },
  /** {n} complete days, {ml} avg per day, {count} avg bottles, {sips} % of bottles under the sip line. */
  feedHistorySummary: {
    en: "Last {n} days: about {ml} ml a day in {count} bottles. {sips}% of bottles were sips.",
    zh: "最近 {n} 天：每天约 {ml} 毫升，分 {count} 瓶。其中 {sips}% 是小口。",
  },
  feedHistoryPerDay: { en: "ml per day", zh: "每天毫升" },
  feedHistoryTimeline: { en: "When the bottles were", zh: "喂奶时段" },
  feedHistoryChartAria: { en: "Formula per day, oldest to newest", zh: "每天奶量，从早到近" },
  /** {ml} total, {n} bottles. */
  feedHistoryRowStat: { en: "{ml} ml · {n}", zh: "{ml} 毫升 · {n} 瓶" },
  feedHistoryRowAria: {
    en: "{date}: {ml} ml in {n} bottles, {sips} of them sips",
    zh: "{date}：{n} 瓶共 {ml} 毫升，其中 {sips} 瓶是小口",
  },
  feedLegendFull: { en: "Full, {ml} ml+", zh: "整瓶，{ml} 毫升以上" },
  feedLegendSip: { en: "Sip, under {ml} ml", zh: "小口，不到 {ml} 毫升" },
  feedLegendNight: { en: "Night sleep", zh: "夜间睡眠" },
  feedLegendWindow: { en: "Plan window", zh: "计划窗口" },

  syncNote: {
    en: "With a signed-in family account, these logs stay in step on every member's device.",
    zh: "登录家庭账户后，这些记录会在所有成员的设备间保持同步。",
  },
} satisfies Msgs;
