import type { AmountUnit, Enjoyment, MealSlot } from "@/lib/storage/types";
import type { Msg, Msgs } from "../config";

/**
 * Journal copy — the timeline on /history plus the optional detail fields
 * shared by the log form and the journal's edit dialog.
 */
export const journalMsgs = {
  journalHeading: { en: "Feeding journal", zh: "喂养日记" },
  entriesFor: { en: "{n} entries for {name}", zh: "{name} 的 {n} 条记录" },
  oneEntryFor: { en: "1 entry for {name}", zh: "{name} 的 1 条记录" },
  firstTry: { en: "first try", zh: "第一次尝试" },
  dayFirstTries: { en: "{n} new", zh: "{n} 种新食物" },
  noTime: { en: "no time set", zh: "未记录时间" },
  addedDetails: { en: "Details", zh: "详情" },
  editEntry: { en: "Edit", zh: "编辑" },
  editEntryAria: { en: "Edit the {food} entry on {date}", zh: "编辑 {date} 的{food}记录" },
  editTitle: { en: "Edit entry", zh: "编辑记录" },
  saveChanges: { en: "Save changes", zh: "保存修改" },
  cancel: { en: "Cancel", zh: "取消" },
  photoAlt: { en: "Photo of {food}", zh: "{food}的照片" },
  /**
   * Shown where a photo would be when the log carries a photo id but this
   * device doesn't hold the bytes — see lib/media/photos for why images stay
   * on the device that took them.
   */
  photoElsewhere: {
    en: "Photo is on the device that added it",
    zh: "照片保存在添加它的那台设备上",
  },
  dataTools: { en: "Data & backup", zh: "数据与备份" },
  showDataTools: { en: "Show data & backup tools", zh: "显示数据与备份工具" },
  jumpToOldest: { en: "Oldest first", zh: "最早在前" },
  jumpToNewest: { en: "Newest first", zh: "最新在前" },
  filterLabel: { en: "Show", zh: "筛选" },
  filterAll: { en: "Everything", zh: "全部" },
  filterFirsts: { en: "First tries", zh: "第一次尝试" },
  filterReactions: { en: "Reactions", zh: "有反应" },
  filterEmpty: {
    en: "No entries match this filter yet.",
    zh: "还没有符合此筛选条件的记录。",
  },
  loggedAt: { en: "at {time}", zh: "{time}" },
} satisfies Msgs;

/**
 * Labels for the optional detail fields. Shared verbatim by the log form and
 * the journal edit dialog so the same field never gets two names.
 */
export const logDetailMsgs = {
  detailsToggle: { en: "Add details", zh: "添加详情" },
  detailsHint: {
    en: "All optional — time, a measured amount, a photo.",
    zh: "都是可选的——时间、具体分量、照片。",
  },
  timeLabel: { en: "Time", zh: "时间" },
  timeClear: { en: "clear", zh: "清除" },
  mealLabel: { en: "Meal", zh: "餐次" },
  mealNone: { en: "Not set", zh: "未设置" },
  quantityLabel: { en: "Measured amount", zh: "具体分量" },
  quantityPlaceholder: { en: "e.g. 20", zh: "例如 20" },
  quantityAria: { en: "Measured amount value", zh: "具体分量数值" },
  unitAria: { en: "Measured amount unit", zh: "分量单位" },
  notesLabel: { en: "Notes", zh: "备注" },
  notesPlaceholder: {
    en: "Anything you want to remember about this feed…",
    zh: "关于这次进食，想记下的任何事…",
  },
  photoLabel: { en: "Photo", zh: "照片" },
  addPhoto: { en: "Add photo", zh: "添加照片" },
  replacePhoto: { en: "Replace", zh: "替换" },
  removePhoto: { en: "Remove", zh: "移除" },
  photoPending: { en: "Processing photo…", zh: "正在处理照片…" },
  /** Sets the expectation before someone relies on photos syncing. */
  photoLocalOnly: {
    en: "Photos stay on this device — they aren't uploaded or synced.",
    zh: "照片只保存在这台设备上——不会上传，也不会同步。",
  },
  photoFailed: {
    en: "Couldn't save that photo on this device. The entry saved without it.",
    zh: "无法在这台设备上保存该照片。记录已保存，但不含照片。",
  },
} satisfies Msgs;

export const MEAL_SLOT_MSGS: Record<MealSlot, Msg> = {
  breakfast: { en: "Breakfast", zh: "早餐" },
  lunch: { en: "Lunch", zh: "午餐" },
  dinner: { en: "Dinner", zh: "晚餐" },
  snack: { en: "Snack", zh: "加餐" },
};

/** Unit labels. The metric symbols are universal; the spoons are not. */
export const UNIT_MSGS: Record<AmountUnit, Msg> = {
  ml: { en: "ml", zh: "毫升" },
  g: { en: "g", zh: "克" },
  oz: { en: "oz", zh: "盎司" },
  tbsp: { en: "tbsp", zh: "汤匙" },
  tsp: { en: "tsp", zh: "茶匙" },
};

/** Short reaction labels for the journal row (the log form uses its own set). */
export const ENJOYMENT_SHORT_MSGS: Record<Enjoyment, Msg> = {
  loved: { en: "Loved it", zh: "超爱" },
  neutral: { en: "Neutral", zh: "一般" },
  disliked: { en: "Disliked", zh: "不喜欢" },
  refused: { en: "Refused", zh: "拒绝" },
};
