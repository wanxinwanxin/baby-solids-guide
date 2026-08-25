import type { Msgs } from "../config";

/** Learn surfaces (src/app/learn/page.tsx, src/app/learn/[slug]/page.tsx). */
export const learnMsgs = {
  metaTitle: {
    en: "Learn: the big picture of starting solids",
    zh: "学习：辅食添加的全貌",
  },
  metaDescription: {
    en: "Why solids at all, when to start, how fast to go, and how allergens really work — the five-minute grounding for brand-new solid-food parents.",
    zh: "为什么要加辅食、什么时候开始、节奏怎么把握、过敏原到底怎么回事——给辅食新手爸妈的五分钟入门。",
  },
  heading: { en: "Learn", zh: "学习" },
  intro: {
    en: "New to all of this? These short chapters give you the big picture — why solids matter (hint: it's not mainly calories), when to start, how fast to go, and how allergens really work. Each one cites its sources.",
    zh: "刚接触这些？这几个小章节带你看清全局——为什么辅食重要（提示：主要不是为了热量）、什么时候开始、节奏怎么把握、过敏原到底怎么回事。每一章都注明了资料来源。",
  },
  minRead: { en: "{n} min", zh: "{n} 分钟" },
  eyebrow: { en: "Learn · {n} min read", zh: "学习 · 阅读约 {n} 分钟" },
  readyCta: { en: "Ready to put it into practice?", zh: "准备好动手实践了吗？" },
  setupLink: { en: "Set up your plan →", zh: "设置你的计划 →" },
  nextLabel: { en: "Next: {title} →", zh: "下一篇：{title} →" },
  sources: { en: "Sources", zh: "资料来源" },
  retrieved: { en: "(retrieved {date})", zh: "（检索于 {date}）" },
  disclaimer: {
    en: "Educational guidance, not medical advice — your pediatrician's word wins.",
    zh: "科普内容，不是医疗建议——一切以你家儿科医生的意见为准。",
  },
} satisfies Msgs;
