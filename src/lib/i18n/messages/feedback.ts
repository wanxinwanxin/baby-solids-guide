import type { Msgs } from "../config";

/** The always-available feedback button + dialog. */
export const feedbackMsgs = {
  open: { en: "Send feedback", zh: "反馈" },
  title: { en: "Tell us anything", zh: "随便跟我们说" },
  intro: {
    en: "A missing food, a bug, an idea, or just how it's going — we read every note.",
    zh: "缺了某种食物、遇到问题、有想法，或只是说说用得怎么样——每条我们都会看。",
  },
  catGeneral: { en: "General", zh: "随便说说" },
  catFood: { en: "Missing food", zh: "缺食物" },
  catIdea: { en: "Idea", zh: "想法" },
  catBug: { en: "Something's broken", zh: "有问题" },
  messageLabel: { en: "Your message", zh: "你的留言" },
  messagePlaceholder: {
    en: "Type or dictate here…",
    zh: "在这里打字或语音输入…",
  },
  foodPlaceholder: {
    en: "Which food is missing? Add any names you use for it.",
    zh: "缺哪种食物？把你常用的叫法都写上。",
  },
  emailLabel: { en: "Email (optional, if you'd like a reply)", zh: "邮箱（选填，想收到回复就留下）" },
  send: { en: "Send", zh: "发送" },
  sending: { en: "Sending…", zh: "发送中…" },
  cancel: { en: "Cancel", zh: "取消" },
  thanksTitle: { en: "Thank you 🙏", zh: "谢谢你 🙏" },
  thanksBody: {
    en: "Got it. We look at feedback often and add what people ask for.",
    zh: "收到啦。我们会经常查看反馈，并补上大家想要的。",
  },
  errorBody: {
    en: "That didn't send. Please check your connection and try again.",
    zh: "没能发送出去。请检查网络后再试一次。",
  },
  close: { en: "Close", zh: "关闭" },
  // The /more card
  moreLabel: { en: "Send feedback", zh: "发送反馈" },
  moreDesc: {
    en: "Request a food, report a bug, or share an idea",
    zh: "反馈缺失的食物、报告问题，或分享想法",
  },
} satisfies Msgs;
