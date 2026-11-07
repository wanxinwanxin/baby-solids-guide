import type { AchievementId } from "@/lib/gallery";
import type { Msg } from "../config";

/** Food gallery page copy (src/app/gallery/page.tsx). */
export const galleryMsgs = {
  metaTitle: { en: "Food gallery", zh: "食物图鉴" },
  metaDescription: {
    en: "Light up every food your baby has cleared, and earn badges along the way.",
    zh: "点亮宝宝吃过的每一种食物，一路收集成就徽章。",
  },
  title: { en: "Food gallery", zh: "食物图鉴" },
  intro: {
    en: "Every food is a tile. Eat it on 3 different days with no reaction and it lights up.",
    zh: "每种食物都是一格图鉴。在 3 个不同的日子吃到且没有反应，就会点亮。",
  },
  setupTitle: { en: "Set up a profile to start collecting", zh: "先建立档案才能开始收集" },
  setupBody: { en: "The gallery is built from your own logs.", zh: "图鉴由你自己的记录点亮。" },
  startOnboarding: { en: "Start onboarding →", zh: "开始设置 →" },
  unlockedOfTotal: { en: "{n} of {total} foods unlocked", zh: "已点亮 {n} / {total} 种食物" },
  achievementsTitle: { en: "Achievements", zh: "成就" },
  noTierYet: {
    en: "Unlock your first food to earn your first badge.",
    zh: "点亮第一种食物，就能拿到第一个徽章。",
  },
  nextTier: { en: "{n} more to “{name}”", zh: "再点亮 {n} 种就是“{name}”" },
  allTiersEarned: { en: "Every badge earned — the whole table is yours.", zh: "所有徽章都已收集——整张餐桌都是你们的。" },
  progressAria: { en: "Progress toward the next badge", zh: "距离下一个徽章的进度" },
  tierEarnedAria: { en: "{name} — earned", zh: "{name}——已达成" },
  tierLockedAria: { en: "{name} — at {n} foods", zh: "{name}——点亮 {n} 种后达成" },
  legendUnlocked: { en: "Unlocked", zh: "已点亮" },
  legendInProgress: { en: "In progress", zh: "进行中" },
  legendNotTried: { en: "Not tried", zh: "未尝试" },
  legendReacted: { en: "Reacted", zh: "有反应" },
  stateProgress: { en: "{n} of {total} eating days", zh: "已吃 {n} / {total} 天" },
  reactionsTitle: { en: "Reactions", zh: "有反应记录的食物" },
  reactionsBody: {
    en: "These foods have a logged reaction. Talk to your pediatrician before offering them again.",
    zh: "这些食物记录过反应。再次提供之前，先和儿科医生确认。",
  },
  logMore: { en: "Log a food →", zh: "记录一种食物 →" },
  // Mark cleared without a log (user feedback, 2026-10-25).
  markStart: { en: "Mark foods already cleared", zh: "标记已排敏的食物" },
  markDone: { en: "Done", zh: "完成" },
  markTitle: { en: "Mark foods already cleared", zh: "标记已排敏的食物" },
  markHint: {
    en: "Tap each food your baby already ate on 3 days with no reaction, for example before you used the app, or on a day nobody logged. It lights up and counts as cleared. No day in the history changes. Tap it again to undo.",
    zh: "点一下宝宝已经在 3 天里吃过、没有反应的食物，比如用这个 App 之前吃过的，或者某天漏记了不知道是哪天的。它会点亮并算作已排敏，历史记录里的任何一天都不会改变。再点一下可以撤销。",
  },
  markAllergenNote: {
    en: "Mark a common allergen only when you are sure. The plan then stops introducing it and treats it as one to keep in the diet.",
    zh: "常见过敏原请确认无误后再标记。标记后，计划不再安排引入它，而是把它当作需要保持常吃的食物。",
  },
  markCount: { en: "{n} marked without a log", zh: "{n} 种为手动标记" },
  markTapAria: { en: "{name} — tap to mark cleared", zh: "{name}——点一下标记为已排敏" },
  markedAria: { en: "{name} — marked cleared, tap to undo", zh: "{name}——已标记排敏，点一下撤销" },
  markLoggedAria: { en: "{name} — already cleared from logs", zh: "{name}——已通过记录点亮" },
  markReactedAria: { en: "{name} — has a logged reaction, cannot mark", zh: "{name}——有反应记录，不能标记" },
} as const;

export const ACHIEVEMENT_NAME_MSGS: Record<AchievementId, Msg> = {
  "first-bite": { en: "First bite", zh: "第一口" },
  "first-forays": { en: "First forays", zh: "小试牛刀" },
  "little-snacker": { en: "Little snacker", zh: "小吃家" },
  "brave-taster": { en: "Brave taster", zh: "勇敢尝新" },
  "food-explorer": { en: "Food explorer", zh: "美食探险家" },
  "little-gourmet": { en: "Little gourmet", zh: "大美食家" },
  "table-legend": { en: "Table legend", zh: "传奇食客" },
};
