import type { AgeBand } from "@/content-schema/food";
import type { AmountEaten } from "@/lib/storage/types";
import type { Msg, Msgs } from "../config";

/** History page copy (src/app/history/page.tsx). */
export const historyMsgs = {
  title: { en: "History", zh: "记录" },
  exportJson: { en: "Export JSON", zh: "导出 JSON" },
  importJson: { en: "Import JSON", zh: "导入 JSON" },
  importFileAria: { en: "Import backup file", zh: "导入备份文件" },
  imported: { en: "Imported {n} log(s).", zh: "已导入 {n} 条记录。" },
  importedSkipped: {
    en: "Imported {n} log(s) — skipped {m} invalid row(s).",
    zh: "已导入 {n} 条记录——已跳过 {m} 条无效数据。",
  },
  nameLogs: { en: "{name} · {n} logs", zh: "{name} · {n} 条记录" },
  editProfile: { en: "edit profile", zh: "编辑档案" },
  addAnotherBaby: { en: "add another baby", zh: "再添加一个宝宝" },
  noLogsTitle: { en: "No logs yet", zh: "还没有记录" },
  logFirstFood: { en: "Log your first food →", zh: "记录第一种食物 →" },
  orImport: {
    en: "Or import a backup with the button above.",
    zh: "或用上方按钮导入备份。",
  },
  mostLogged: { en: "Most-logged foods", zh: "记录最多的食物" },
  ateLine: { en: "· ate {amount} · {band}", zh: "· {amount} · {band}" },
  gagging: { en: "gagging", zh: "干呕" },
  deleteBtn: { en: "delete", zh: "删除" },
  deleteLogAria: {
    en: "Delete log of {food} on {date}",
    zh: "删除 {date} 的 {food} 记录",
  },
  confirmDelete: {
    en: "Delete the profile and all logs from this device?",
    zh: "要从这台设备上删除档案和所有记录吗？",
  },
  yesDeleteEverything: { en: "Yes, delete everything", zh: "是的，全部删除" },
  cancel: { en: "Cancel", zh: "取消" },
  deleteAllData: {
    en: "Delete all data on this device",
    zh: "删除这台设备上的所有数据",
  },
} satisfies Msgs;

/**
 * `amountEaten` shown in a log row. English renders the raw enum word
 * (byte-identical to the previous output); zh folds in the "ate" verb.
 */
export const AMOUNT_MSGS: Record<AmountEaten, Msg> = {
  none: { en: "none", zh: "没吃" },
  taste: { en: "taste", zh: "尝了一口" },
  some: { en: "some", zh: "吃了一些" },
  lots: { en: "lots", zh: "吃了很多" },
};

/**
 * `prepBandUsed` shown in a log row. English renders the raw band id
 * (byte-identical to the previous output); zh spells the age range out.
 */
export const BAND_ID_MSGS: Record<AgeBand, Msg> = {
  "6-8m": { en: "6-8m", zh: "6–8个月" },
  "9-12m": { en: "9-12m", zh: "9–12个月" },
  "12-24m": { en: "12-24m", zh: "12–24个月" },
};
