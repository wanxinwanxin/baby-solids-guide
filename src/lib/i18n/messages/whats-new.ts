import type { Msgs } from "../config";

/** One-time "what's new" spotlight for existing users (WhatsNew.tsx). */
export const whatsNewMsgs = {
  feedbackTitle: { en: "New — tell us what to build", zh: "新功能——告诉我们做什么" },
  feedbackBody: {
    en: "Tap here anytime to request a food or a feature. We read every note and add what families ask for.",
    zh: "随时点这里反馈缺的食物或想要的功能。每条我们都会看，并按大家的需求添加。",
  },
  fullDayTitle: { en: "New — Full day view", zh: "新功能——全天视图" },
  fullDayBody: {
    en: "In Account, switch on Full day view to turn Today into a whole-day dashboard — sleep, bottles, diapers, and reading, alongside solids.",
    zh: "在“账户”里打开全天视图，“今日”就会变成一整天的面板——睡眠、奶瓶、尿布、读书都和辅食并列。",
  },
  skip: { en: "Skip", zh: "跳过" },
  done: { en: "Got it", zh: "知道了" },
} satisfies Msgs;
