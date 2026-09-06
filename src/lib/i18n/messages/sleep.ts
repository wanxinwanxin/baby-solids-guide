import type { Msgs } from "../config";

/** /sleep — the sleep window predictor (Extras). */
export const sleepMsgs = {
  metaTitle: { en: "Sleep windows", zh: "睡眠时段" },
  metaDescription: {
    en: "Nap and bedtime windows predicted from your baby's age and own sleep rhythm.",
    zh: "根据宝宝月龄和自身睡眠节律推算的小睡与就寝时段。",
  },
  heading: { en: "Sleep", zh: "睡眠" },
  intro: {
    en: "Nap and bedtime windows from your baby's own rhythm.",
    zh: "根据宝宝自己的节律推算小睡与就寝时段。",
  },

  setupTitle: { en: "Set up your baby first", zh: "请先填写宝宝信息" },
  setupBody: {
    en: "The predictor needs your baby's age.",
    zh: "预测需要宝宝的月龄。",
  },
  startOnboarding: { en: "Start setup", zh: "开始设置" },

  // Status card
  asleepTitle: { en: "Asleep", zh: "睡着了" },
  asleepFor: { en: "Asleep for {dur}", zh: "已睡 {dur}" },
  asleepSince: { en: "since {time}", zh: "{time} 入睡" },
  wokeUpBtn: { en: "Woke up now", zh: "刚醒了" },
  fellAsleepBtn: { en: "Fell asleep now", zh: "刚睡着了" },
  nextNapTitle: { en: "Next nap window", zh: "下次小睡时段" },
  bedtimeTitle: { en: "Bedtime window", zh: "就寝时段" },
  awakeFor: { en: "Awake for {dur} (woke at {time}).", zh: "已清醒 {dur}（{time} 醒来）。" },
  stateBefore: { en: "The window opens in {dur}.", zh: "距离时段开始还有 {dur}。" },
  stateOpen: {
    en: "Now is a good time to start the wind-down.",
    zh: "现在适合开始哄睡。",
  },
  statePast: {
    en: "The window has passed — try for sleep soon.",
    zh: "时段已过——请尽快安排入睡。",
  },
  askLastWake: { en: "When did your baby last wake up?", zh: "宝宝上次是什么时候醒的？" },
  justWokeBtn: { en: "Just now", zh: "刚刚" },
  orPickTime: { en: "Or pick the time", zh: "或选择时间" },
  setWakeBtn: { en: "Set wake time", zh: "确定" },

  // Why this window
  whyTitle: { en: "Why this window", zh: "为什么是这个时段" },
  whyAgePrior: {
    en: "Typical wake window at {age} months: {min}–{max}.",
    zh: "{age} 个月的典型清醒时长：{min}–{max}。",
  },
  whyPersonal: {
    en: "Your baby's median wake window over the last 14 days: {dur} ({n} logged).",
    zh: "过去 14 天宝宝清醒时长的中位数：{dur}（记录 {n} 次）。",
  },
  whyCollecting: {
    en: "Still learning your baby's pattern — {n} of {need} wake windows logged. The age range leads for now.",
    zh: "还在学习宝宝的规律——已记录 {n}/{need} 个清醒时段，目前以月龄范围为主。",
  },
  whyShortNap: {
    en: "The last nap was short ({dur}), so the window opens earlier.",
    zh: "上次小睡较短（{dur}），时段相应提前。",
  },
  whyLongNap: {
    en: "The last nap was long ({dur}), so the window opens later.",
    zh: "上次小睡较长（{dur}），时段相应推后。",
  },
  whyBedtimeLogs: {
    en: "Estimated bedtime tonight: {time} (from your logs).",
    zh: "今晚预计就寝时间：{time}（来自你的记录）。",
  },
  whyBedtimeDefault: {
    en: "Estimated bedtime tonight: {time} (age default).",
    zh: "今晚预计就寝时间：{time}（按月龄默认）。",
  },
  newbornNote: {
    en: "Under 2 months, the day–night rhythm is still forming. Treat the window as a loose guide and follow sleepy cues.",
    zh: "两个月以内昼夜节律仍在形成。时段仅供参考，请以宝宝的睡意信号为准。",
  },

  // Today's sessions
  todayTitle: { en: "Today's sleep", zh: "今天的睡眠" },
  todayEmpty: { en: "No sleep logged today yet.", zh: "今天还没有睡眠记录。" },
  totalToday: { en: "Total: {dur}", zh: "合计：{dur}" },
  ongoing: { en: "ongoing", zh: "进行中" },
  deleteBtn: { en: "Delete", zh: "删除" },

  // Manual entry
  addTitle: { en: "Add a sleep by hand", zh: "手动补记一段睡眠" },
  addStart: { en: "Fell asleep", zh: "入睡时间" },
  addEnd: { en: "Woke up", zh: "醒来时间" },
  addBtn: { en: "Add sleep", zh: "添加" },
  addInvalid: {
    en: "The wake time must come after the sleep time.",
    zh: "醒来时间必须晚于入睡时间。",
  },

  // Notes
  localNote: {
    en: "The sleep log stays on this device. It does not sync to your family yet.",
    zh: "睡眠记录仅保存在本机，暂不与家人同步。",
  },
  medicalNote: {
    en: "This is an educational guide, not medical advice. Talk to your pediatrician about sleep concerns.",
    zh: "本功能仅供参考，不构成医疗建议。如有睡眠方面的疑问，请咨询儿科医生。",
  },
} satisfies Msgs;
