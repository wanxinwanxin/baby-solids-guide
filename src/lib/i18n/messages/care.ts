import type { Msgs } from "../config";

/** /care — formula bottles + diaper changes, synced per family. */
export const careMsgs = {
  metaTitle: { en: "Bottles & diapers", zh: "奶瓶与尿布" },
  metaDescription: {
    en: "Log formula bottles and diaper changes, synced to the whole family.",
    zh: "记录配方奶和换尿布，与全家人的设备同步。",
  },
  heading: { en: "Bottles & diapers", zh: "奶瓶与尿布" },
  intro: {
    en: "Formula and diaper changes, in the same place as everything else.",
    zh: "配方奶和尿布记录，和其他记录都在一个地方。",
  },

  setupTitle: { en: "Set up your baby first", zh: "请先填写宝宝信息" },
  setupBody: { en: "Logging needs a baby profile.", zh: "记录之前需要先建立宝宝档案。" },
  startOnboarding: { en: "Start setup", zh: "开始设置" },

  // Formula
  formulaTitle: { en: "Formula bottle", zh: "配方奶" },
  amountLabel: { en: "Amount", zh: "奶量" },
  customAmount: { en: "Custom", zh: "自定义" },
  logBottleBtn: { en: "Log bottle", zh: "记录喂奶" },
  fedAt: { en: "Fed at", zh: "喂奶时间" },

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
  recentTitle: { en: "Recent days", zh: "最近几天" },
  recentEmpty: { en: "Older days appear here as you log.", zh: "有记录后，这里会显示往日汇总。" },

  // Entry rows + edit panel
  formulaEntry: { en: "Bottle · {amount}", zh: "喂奶 · {amount}" },
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

  syncNote: {
    en: "With a signed-in family account, these logs stay in step on every member's device.",
    zh: "登录家庭账户后，这些记录会在所有成员的设备间保持同步。",
  },
} satisfies Msgs;
