import type { AmountEaten, Enjoyment } from "@/lib/storage/types";
import type { Msg, Msgs } from "../config";

/** Log page metadata (src/app/log/page.tsx). */
export const logPageMsgs = {
  metaTitle: { en: "Log a food", zh: "记录食物" },
} satisfies Msgs;

/** Log form copy (src/app/log/LogForm.tsx). */
export const logFormMsgs = {
  setupTitle: { en: "Set up your baby's profile first", zh: "先设置宝宝的档案" },
  setupBody: {
    en: "Logging needs a profile so recommendations can adapt.",
    zh: "需要先有档案，推荐才能跟着宝宝调整。",
  },
  startHere: { en: "Start here →", zh: "从这里开始 →" },
  loggedNice: { en: "Logged — nice work. 🎉", zh: "已记录——干得漂亮。🎉" },
  inTheBook: {
    en: "{food} is in the book for {name}.",
    zh: "已经把{food}记进{name}的记录里了。",
  },
  backToToday: { en: "Back to Today", zh: "返回今天" },
  logAnother: { en: "Log another food", zh: "再记一种食物" },
  allergenPaused: {
    en: "The {allergen} group is now paused in your plan.",
    zh: "{allergen}这一组已在你的计划中暂停。",
  },
  reactionPlaybook: { en: "See the reaction playbook →", zh: "查看反应应对手册 →" },
  emergencyGuide: { en: "Emergency guide", zh: "急救指南" },
  checkInTitle: { en: "Check-in", zh: "反应观察" },
  logAFood: { en: "Log a food", zh: "记录食物" },
  worriedNow: {
    en: "Worried right now? Emergency guide",
    zh: "现在就担心？看急救指南",
  },
  howLooks: {
    en: "How does {name} look after {food}?",
    zh: "吃过{food}后，{name}看起来怎么样？",
  },
  tickAnything: {
    en: "Tick anything you're seeing below, or give the all-clear.",
    zh: "在下面勾选你观察到的情况，或直接报平安。",
  },
  allClear: { en: "All clear — no symptoms ✓", zh: "一切正常——没有症状 ✓" },
  foodSection: { en: "Food", zh: "食物" },
  change: { en: "change", zh: "更换" },
  searchPlaceholder: { en: "Type to search (e.g. carrot)…", zh: "输入搜索（如：胡萝卜）…" },
  searchAria: { en: "Search food to log", zh: "搜索要记录的食物" },
  prepUsed: { en: "Prep used", zh: "所用做法" },
  howMuch: { en: "How much went in?", zh: "吃进去多少？" },
  howDidItGo: { en: "How did it go?", zh: "吃得怎么样？" },
  /** Trailing space in `en` is intentional — it sits before the inline link. */
  gaggingBefore: { en: "Some gagging (normal reflex — see ", zh: "有点干呕（正常反射——见" },
  gaggingLink: { en: "gagging vs. choking", zh: "干呕与窒息的区别" },
  gaggingAfter: { en: ")", zh: "）" },
  anySymptoms: {
    en: "Any symptoms? (rash, hives, vomiting…)",
    zh: "有症状吗？（皮疹、荨麻疹、呕吐…）",
  },
  dateLabel: { en: "Date", zh: "日期" },
  saveLog: { en: "Save log", zh: "保存记录" },
} satisfies Msgs;

/** Mirrors the former AMOUNTS labels in LogForm (en byte-identical). */
export const AMOUNT_MSGS: Record<AmountEaten, Msg> = {
  none: { en: "None", zh: "没吃" },
  taste: { en: "A taste", zh: "尝了一口" },
  some: { en: "Some", zh: "吃了一些" },
  lots: { en: "Lots!", zh: "吃了很多！" },
};

/** Mirrors the former ENJOYMENT labels in LogForm (en byte-identical). */
export const ENJOYMENT_MSGS: Record<Enjoyment, Msg> = {
  loved: { en: "😍 Loved", zh: "😍 超爱" },
  neutral: { en: "😐 Neutral", zh: "😐 一般" },
  disliked: { en: "😖 Disliked", zh: "😖 不喜欢" },
  refused: { en: "🙅 Refused", zh: "🙅 拒绝" },
};

/** Check-in offer copy (src/app/log/CheckInOffer.tsx). */
export const checkInOfferMsgs = {
  allergenPrompt: {
    en: "{food} is a common allergen — want a reminder to check for symptoms?",
    zh: "{food}是常见过敏原——要不要设个提醒，回头看看有没有症状？",
  },
  genericPrompt: {
    en: "Want a reminder to check on how this went down?",
    zh: "要不要设个提醒，回头看看这餐吃得怎么样？",
  },
  /** Where a scheduled reminder actually shows up — set before scheduling. */
  remindersWhere: {
    en: "Reminders pop up on your Today screen — and arrive as a push notification on this device when you're signed in.",
    zh: "提醒会出现在「今天」页面——登录后还会以推送通知的形式发送到这台设备。",
  },
  /** Why the schedule button is inert until something is picked. */
  schedulePickFirst: {
    en: "Pick at least one reminder above to schedule it.",
    zh: "请先在上面选择至少一项提醒。",
  },
  scheduleOne: { en: "Schedule check-in", zh: "安排观察提醒" },
  scheduleMany: { en: "Schedule check-ins", zh: "安排观察提醒" },
  scheduledOne: {
    en: "✓ {n} check-in scheduled — they'll wait for you on the Today screen.",
    zh: "✓ 已安排 {n} 个观察提醒——它们会在「今天」页面等你。",
  },
  scheduledMany: {
    en: "✓ {n} check-ins scheduled — they'll wait for you on the Today screen.",
    zh: "✓ 已安排 {n} 个观察提醒——它们会在「今天」页面等你。",
  },
  putInCalendar: {
    en: "Closing the browser? Put them in your calendar so nothing slips:",
    zh: "会关掉浏览器？把提醒放进日历，一个都不漏：",
  },
  /** Product name — stays "Google Calendar" in zh too. */
  googleCalendar: { en: "Google Calendar", zh: "Google Calendar" },
  icsButton: { en: "⬇ .ics for Apple/Outlook", zh: "⬇ .ics（Apple/Outlook 日历用）" },
  /** Push notification copy (user-visible notification text). */
  pushTitle: { en: "Check {nickname} — {food}", zh: "查看{nickname}——{food}" },
  pushBody: {
    en: "Watch for: {signs}. Tap to log what you see.",
    zh: "注意观察：{signs}。点一下记录你看到的情况。",
  },
} satisfies Msgs;

/** Fallback reaction signs for non-allergen foods (en byte-identical to the old inline list). */
export const FALLBACK_REACTION_SIGNS: Msg[] = [
  { en: "hives or rash", zh: "荨麻疹或皮疹" },
  { en: "vomiting", zh: "呕吐" },
  { en: "swelling", zh: "肿胀" },
  { en: "unusual sleepiness", zh: "异常嗜睡" },
];
