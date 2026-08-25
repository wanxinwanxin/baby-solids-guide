import type { Msg, Msgs } from "../config";
import type { AllergenStatus } from "@/lib/storage/types";

/** Import flow copy (src/app/onboarding/import/page.tsx + ImportFlow.tsx). */
export const importFlowMsgs = {
  metaTitle: { en: "Import where you are", zh: "导入当前进度" },

  // No-profile gate
  noProfileTitle: { en: "First, a 2-minute profile", zh: "先花 2 分钟建个档案" },
  noProfileBefore: {
    en: "The import needs a baby profile to attach to.",
    zh: "导入的记录需要挂在一个宝宝档案下。",
  },
  noProfileLink: { en: "Set it up →", zh: "去设置 →" },
  noProfileAfter: {
    en: "(the last step brings you right back here).",
    zh: "（最后一步会把你带回这里）。",
  },

  // Header
  h1: { en: "Where are you already?", zh: "你们已经进行到哪儿了？" },
  lede: {
    en: "Tap everything {name} has tried. The plan picks up from exactly here — no starting over.",
    zh: "点选{name}已经尝试过的所有食物。计划会从这里接着走——不用从头再来。",
  },

  // Backup restore
  backupTitle: { en: "Have a backup file?", zh: "有备份文件？" },
  backupDesc: {
    en: "Restore a full OpenSolids export instead of ticking boxes.",
    zh: "直接恢复完整的 OpenSolids 导出文件，不用逐个勾选。",
  },
  restoreBtn: { en: "Restore from JSON", zh: "从 JSON 恢复" },
  restoreAria: { en: "Restore backup file", zh: "恢复备份文件" },

  // Allergen statuses
  allergenTitle: {
    en: "Allergen status (where the checklist isn't enough)",
    zh: "过敏原状态（勾选清单不够用时）",
  },
  allergenDesc: {
    en: "One try vs. an established routine matters for allergens. Adjust any that need it.",
    zh: "对过敏原来说，只试过一次和已经形成规律很不一样。需要的话请逐项调整。",
  },

  // Texture stage
  textureTitle: { en: "Current texture stage", zh: "当前质地阶段" },

  // Footer actions
  doneBtn: {
    en: "Done — build my plan ({count} foods)",
    zh: "完成——生成我的计划（{count} 种食物）",
  },
  skip: { en: "Skip for now", zh: "先跳过" },
} satisfies Msgs;

/** Option labels for the allergen status pickers — option VALUES (ids) never change. */
export const IMPORT_STATUS_MSGS: { id: AllergenStatus | "auto"; label: Msg }[] = [
  { id: "auto", label: { en: "From the checklist", zh: "按勾选清单" } },
  { id: "introducing", label: { en: "Started (1–2 tries)", zh: "已开始（试过 1–2 次）" } },
  { id: "maintaining", label: { en: "Going well (3+ tries)", zh: "进展顺利（3 次以上）" } },
  { id: "reacted-paused", label: { en: "Reacted — paused", zh: "有过反应——已暂停" } },
  { id: "avoid-per-doctor", label: { en: "Avoiding per doctor", zh: "遵医嘱回避" } },
];
