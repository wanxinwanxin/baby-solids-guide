import type { Msg, Msgs } from "../config";
import type { AllergenStatus } from "@/lib/storage/types";

/** Allergen tracker (/allergens) and per-allergen program pages (/allergens/[id]). */
export const allergensMsgs = {
  // /allergens — tracker
  title: { en: "Allergen tracker", zh: "过敏原追踪" },
  intro: {
    en: "The nine common allergens, one at a time, early in the day, with ~3 days between new ones. Once a food is tolerated, keeping it in the diet (about twice a week) is what maintains tolerance.",
    zh: "九大常见过敏原：一次只引入一种，安排在一天的早些时候，两种新过敏原之间间隔约 3 天。一种食物耐受后，让它留在日常饮食里（大约每周两次）才能维持耐受。",
  },
  higherRiskTitle: { en: "Higher-risk profile", zh: "较高风险档案" },
  higherRiskBody: {
    en: "Severe eczema or an existing food allergy means peanut should wait for your pediatrician or allergist's go-ahead (ideally discussed around 4–6 months). When they clear you, record it below.",
    zh: "如果宝宝有严重湿疹或已确诊食物过敏，花生应等儿科医生或过敏专科医生点头后再引入（最好在 4–6 个月左右就和医生讨论）。医生同意后，请在下方记录。",
  },
  setupBefore: { en: "", zh: "先" },
  setupLink: { en: "Set up a profile", zh: "设置宝宝档案" },
  setupAfter: {
    en: " to track allergen progress. You can still read each program below.",
    zh: "，即可跟踪过敏原进度。下面的每个引入方案现在也可以阅读。",
  },
  exposureOne: { en: "{n} exposure", zh: "已尝试 {n} 次" },
  exposureOther: { en: "{n} exposures", zh: "已尝试 {n} 次" },
  lastExposure: { en: " · last {date}", zh: " · 最近 {date}" },
  doctorCleared: { en: "My doctor cleared us ✓", zh: "医生已同意我们尝试 ✓" },
  setStatus: { en: "Set status", zh: "设置状态" },
  autoFromLogs: { en: "auto (from logs)", zh: "自动（根据记录）" },
  programLink: { en: "Introduction program →", zh: "引入方案 →" },
  overrideHint: {
    en: 'Use "set status" when your reality differs from the logs — e.g. your allergist said to avoid a food, or a reaction was later ruled out. Overrides always win.',
    zh: "当实际情况与记录不符时，用“设置状态”手动调整——例如过敏专科医生要求回避某种食物，或之前的反应后来被排除了。手动设置始终优先。",
  },
  orderTitle: { en: "Introduction order", zh: "引入顺序" },
  orderPlanNote: {
    en: "Your plan currently sets the order (first appearance on the board wins). This list applies when no plan is active.",
    zh: "目前顺序由你的计划决定（以在计划板上首次出现的先后为准）。没有生效的计划时，才使用这里的列表。",
  },
  moveEarlier: { en: "Move {name} earlier", zh: "将{name}提前" },
  moveLater: { en: "Move {name} later", zh: "将{name}推后" },
  remindersTitle: { en: "Maintenance reminders", zh: "维持耐受提醒" },
  remindersBody: {
    en: "Once an allergen is tolerated, serving it about twice a week is what maintains tolerance. Put a weekly nudge in your own calendar — it works even when this app is closed.",
    zh: "一种过敏原耐受后，大约每周吃两次才能维持耐受。在你自己的日历里加一个每周提醒——即使不打开这个应用也能生效。",
  },
  downloadIcs: {
    en: "⬇ Add weekly reminders to my calendar (.ics)",
    zh: "⬇ 将每周提醒添加到我的日历（.ics）",
  },
  icsUnavailable: {
    en: 'Available once at least one allergen reaches "maintaining" (3+ exposures).',
    zh: "至少有一种过敏原达到“保持中”（尝试 3 次以上）后即可使用。",
  },

  // /allergens/[id] — program page
  introducing: { en: "Introducing {name}", zh: "引入{name}" },
  firstServe: { en: "First serve", zh: "首次尝试" },
  buildUp: { en: "Build up like this:", zh: "按这样逐步加量：" },
  keepGoing: { en: "Then keep it going: ", zh: "然后坚持下去：" },
  reactionTitle: { en: "What a reaction can look like", zh: "过敏反应可能的表现" },
  reactionBefore: {
    en: "Trouble breathing, tongue or lip swelling, widespread hives with vomiting, or a pale, floppy baby means ",
    zh: "如果出现呼吸困难、舌头或嘴唇肿胀、伴随呕吐的大面积荨麻疹，或宝宝面色苍白、浑身发软，请",
  },
  reactionCall: { en: "call 911 now", zh: "立即拨打 911" },
  reactionSee: { en: ". See the ", zh: "。另请参阅" },
  emergencyGuide: { en: "emergency guide", zh: "紧急情况指南" },
  reactionEnd: { en: ".", zh: "。" },
  goodToKnow: { en: "Good to know", zh: "值得了解" },
  foodsDeliver: { en: "Foods that deliver it", zh: "含有这种过敏原的食物" },
  sources: { en: "Sources", zh: "资料来源" },
  retrieved: { en: "(retrieved {date})", zh: "（检索于 {date}）" },
  disclaimer: {
    en: "Educational guidance, not medical advice — allergy decisions belong with your pediatrician or allergist.",
    zh: "本内容为科普指导，不构成医疗建议——有关过敏的决定，请交给你的儿科医生或过敏专科医生。",
  },
} satisfies Msgs;

/**
 * Allergen status labels keyed by the stored status VALUE — the record keys
 * double as the <option> values, so they must never change.
 */
export const ALLERGEN_STATUS_MSGS: Record<AllergenStatus, Msg> = {
  "not-started": { en: "Not started", zh: "未开始" },
  introducing: { en: "Introducing", zh: "引入中" },
  maintaining: { en: "Maintaining", zh: "保持中" },
  "reacted-paused": { en: "Paused after a reaction", zh: "出现反应，已暂停" },
  "avoid-per-doctor": { en: "Avoiding per doctor", zh: "遵医嘱回避" },
};
