import type { Msgs } from "../config";

/**
 * About page copy (src/app/about/page.tsx).
 *
 * Source citation labels and URLs (SOURCES entries) stay English in both
 * locales; only the surrounding prose is translated.
 */
export const aboutMsgs = {
  metaTitle: {
    en: "Sources, methodology & privacy",
    zh: "来源、方法论与隐私",
  },
  metaDescription: {
    en: "Where every OpenSolids recommendation comes from: the primary sources, the methodology behind textures and allergen schedules, and the local-first privacy model.",
    zh: "OpenSolids 每条建议的依据：一手来源、质地与过敏原引入方案背后的方法论，以及本地优先的隐私模型。",
  },
  title: { en: "About OpenSolids", zh: "关于 OpenSolids" },
  whatTitle: { en: "What this is", zh: "这是什么" },
  what1: {
    en: "OpenSolids is a free, open guide for starting a baby on solid foods. The research behind safe solids introduction — when to start, how to cut food safely, how and when to introduce allergens — is public and freely available. This app organizes it into something practical: an exact safe texture for every food at every age, a daily plan that adapts to your logs, and clear playbooks for allergic reactions.",
    zh: "OpenSolids 是一份免费、开放的宝宝辅食添加指南。关于如何安全添加辅食的研究——什么时候开始、食物怎么切才安全、过敏原何时以及如何引入——都是公开且免费可查的。这个应用把这些研究整理成真正可上手的工具：每种食物在每个月龄都有精确的安全质地，每天的计划会根据你的记录自动调整，过敏反应也有清晰的应对方案。",
  },
  what2: {
    en: "It is educational guidance, not medical advice. Your pediatrician knows your baby; when the app and your clinician disagree, the clinician wins, every time.",
    zh: "它是教育性指导，不是医疗建议。你的儿科医生最了解你的宝宝；当应用和医生的意见不一致时，永远听医生的。",
  },
  methodTitle: { en: "Methodology", zh: "方法论" },
  /** {n} = allFoods.length. */
  method1: {
    en: "Every one of the {n} food entries and each engine rule cites at least one source from the list below. A CI check fails the build if a claim ships without a citation, if a choking-risk food lacks a mitigation, or if a texture spec is vague.",
    zh: "全部 {n} 条食物条目和每一条引擎规则，都至少引用下方列表中的一个来源。如果某条论断没有引用来源、某个有窒息风险的食物缺少应对措施，或某条质地要求写得含糊，CI 检查会让构建直接失败。",
  },
  method2: {
    en: "All text is written from primary, freely available sources — never copied from commercial products. Illustrations are our own original diagrams.",
    zh: "所有文字都基于公开、免费的一手来源撰写——绝不从商业产品中抄录。插图均为我们自己绘制的原创示意图。",
  },
  method3: {
    en: "Allergen scheduling follows the NIAID 2017 addendum guidelines and the LEAP/EAT evidence: early introduction, one new allergen at a time, risk-stratified peanut guidance, and consistent maintenance once tolerated.",
    zh: "过敏原引入安排遵循 NIAID 2017 补充指南以及 LEAP/EAT 研究证据：尽早引入、一次只加一种新过敏原、按风险分层的花生引入建议，以及耐受后持续保持喂食。",
  },
  method4: {
    en: "Links are re-verified weekly by an automated check, and each citation records the date it was retrieved.",
    zh: "链接由自动检查每周重新验证，每条引用都记录了检索日期。",
  },
  sourcesTitle: { en: "Sources", zh: "参考来源" },
  /** {date} = SOURCES[*].retrievedOn. */
  retrieved: { en: "(retrieved {date})", zh: "（检索于 {date}）" },
  privacyTitle: { en: "Privacy", zh: "隐私" },
  privacyBody: {
    en: "Everything you enter — your baby's profile and every log — lives in your browser's storage on your device. An account is optional and only syncs that same data to your other devices. There are no ads, no cookies for analytics, and no individual tracking: the server counts page loads in aggregate only (which page, on which day — never who). The Export button gives you a complete JSON copy of your data; \"Delete all data\" on the History page removes everything instantly. If you clear your browser data, your logs go with it, so export a backup now and then.",
    zh: "你输入的一切——宝宝的档案和每一条记录——都只保存在你设备上的浏览器存储里。账户是可选的，只用于把这些数据同步到你的其他设备。没有广告、没有用于分析的 Cookie、也不会跟踪个人：服务器只做汇总的页面计数（哪个页面、哪一天——从不记录是谁）。“导出”按钮可以给你一份完整的 JSON 数据副本；历史页面上的“删除所有数据”会立即清除全部数据。如果你清除了浏览器数据，记录也会一起消失，所以记得时不时导出一份备份。",
  },
  contactTitle: { en: "Getting in touch", zh: "联系我们" },
  contactBody: {
    en: "Questions about the app, a food entry that looks wrong, a confusing screen, or a bug — email {email} and a person will read it. Replies can take a few days.",
    zh: "对这个应用有疑问、发现某种食物的信息有误、某个页面让人困惑，或是遇到了程序问题——请发邮件到 {email}，会有真人阅读。回复可能需要几天。",
  },
  /**
   * Email is the slow channel, and this is a health-adjacent app. The two
   * faster paths are named explicitly so nobody waits on a reply during a
   * reaction or a medical question.
   */
  contactUrgent: {
    en: "Email is slow. For a reaction happening right now, open the emergency guide or call your local emergency number. For medical questions about your baby, your pediatrician comes first.",
    zh: "邮件回复较慢。如果宝宝正在出现过敏反应，请打开紧急指南或拨打当地急救电话。关于宝宝的医疗问题，请优先咨询儿科医生。",
  },
  contactEmergencyLink: { en: "Emergency guide", zh: "紧急指南" },
  nameTitle: { en: "Name & trademarks", zh: "名称与商标" },
  nameBody: {
    en: "\"OpenSolids\" is a working name. This project is not affiliated with, endorsed by, or connected to any commercial infant-feeding program or brand.",
    zh: "“OpenSolids”是一个暂用名。本项目与任何商业婴儿喂养项目或品牌均无隶属、背书或关联关系。",
  },
} satisfies Msgs;
