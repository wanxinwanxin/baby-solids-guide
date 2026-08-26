import type { Msg, Msgs } from "../config";

/** Onboarding wizard copy (src/app/onboarding/page.tsx + OnboardingWizard.tsx). */
export const onboardingMsgs = {
  metaTitle: { en: "Set up your plan", zh: "设置你的计划" },
  /** aria-label on the step progress segments. */
  stepAria: { en: "Step {step} of {total}", zh: "第 {step} 步，共 {total} 步" },

  // Step 0 — basics
  aboutTitle: { en: "About your baby", zh: "关于你的宝宝" },
  nameLabel: { en: "Name or nickname", zh: "名字或昵称" },
  namePlaceholder: { en: "e.g. Mango", zh: "例如：芒果" },
  birthDateLabel: { en: "Birth date", zh: "出生日期" },
  prematureCheck: { en: "Born more than 3 weeks early", zh: "早产超过 3 周" },
  dueDateLabel: { en: "Original due date", zh: "原预产期" },
  correctedAgeNote: {
    en: "We'll use corrected age for every recommendation — standard practice for babies born early.",
    zh: "所有建议都会按矫正月龄计算——这是针对早产宝宝的标准做法。",
  },
  feedHow: { en: "How do you want to feed?", zh: "你想怎么喂？" },
  pureesLabel: { en: "Purées & mashes first", zh: "先吃泥糊" },
  pureesDesc: {
    en: "Spoon-led, moving to finger foods over time",
    zh: "以勺喂为主，逐步过渡到手指食物",
  },
  babyLedLabel: { en: "Baby-led (finger foods)", zh: "宝宝自主进食（手指食物）" },
  babyLedDesc: {
    en: "Soft graspable pieces from the start",
    zh: "从一开始就吃软的、好抓握的小块",
  },
  mixedLabel: { en: "A mix of both", zh: "两种都来" },
  mixedDesc: {
    en: "We'll show both preps — most families land here",
    zh: "两种做法都会展示——大多数家庭都是这样",
  },
  nextAllergy: { en: "Next: allergy questions", zh: "下一步：过敏问题" },

  // Step 1 — allergy risk quiz
  riskTitle: { en: "A few quick allergy questions", zh: "几个简短的过敏问题" },
  riskLede: {
    en: "These set the allergen introduction plan (based on the NIAID guidelines).",
    zh: "这些问题决定过敏原引入计划（基于 NIAID 指南）。",
  },
  eczemaQ: { en: "Does your baby have eczema?", zh: "宝宝有湿疹吗？" },
  no: { en: "No", zh: "没有" },
  yes: { en: "Yes", zh: "有" },
  mildModerate: { en: "Mild to moderate", zh: "轻到中度" },
  severe: { en: "Severe", zh: "重度" },
  eczemaHelp: {
    en: "Mild–moderate: occasional patches, managed with moisturizer or mild treatment. Severe: persistent or widespread, needs prescription treatment.",
    zh: "轻到中度：偶尔出现斑块，用润肤霜或温和治疗就能控制。重度：持续或大面积出现，需要处方药治疗。",
  },
  allergyQ: { en: "Any diagnosed food allergy already?", zh: "已经确诊过食物过敏吗？" },
  knownWhichQ: { en: "Which one(s)?", zh: "是哪一种？" },
  knownWhichHelp: {
    en: "Tap any that apply. We'll keep these — and the foods that contain them — out of your suggestions and your plan.",
    zh: "点选所有相关的。我们会把这些以及含有它们的食物从推荐和计划中排除。",
  },
  /** Shown under both allergen pickers — CMPA is the one parents ask about most. */
  cmpaHint: {
    en: "Cow's milk protein allergy (CMPA) is the most common one in the first year — that's “Milk (dairy)”.",
    zh: "牛奶蛋白过敏（CMPA）是第一年里最常见的一种——对应“牛奶（乳制品）”。",
  },
  avoidingTitle: {
    en: "We're avoiding a food, but nothing is confirmed.",
    zh: "我们在回避某种食物，但还没有确诊。",
  },
  avoidingDesc: {
    en: "Optional — a reaction you suspect, or something you've been advised to hold off on for now.",
    zh: "可选——你怀疑有反应，或者被建议暂时先别吃的食物。",
  },
  avoidingWhichQ: { en: "What are you holding off on?", zh: "你们暂时不打算给宝宝吃什么？" },
  avoidingWhichHelp: {
    en: "We'll leave it out of your suggestions for now, and you can change this any time. It's worth mentioning at your next pediatrician visit — OpenSolids can't tell whether a food is really the cause.",
    zh: "我们暂时不会在推荐里安排它，你随时可以修改。这件事值得在下次儿科就诊时提一下——OpenSolids 无法判断某种食物是不是真正的原因。",
  },
  familyQ: {
    en: "Parent or sibling with food allergy, eczema, or asthma?",
    zh: "父母或兄弟姐妹有食物过敏、湿疹或哮喘吗？",
  },
  highRiskNote: {
    en: "This puts your baby in the higher-risk group for peanut allergy. We'll hold peanut until you confirm your pediatrician or allergist has cleared it — worth asking about at the 4- or 6-month visit.",
    zh: "这意味着宝宝属于花生过敏的较高风险人群。我们会先不安排花生，直到你确认儿科医生或过敏专科医生已同意引入——可以在 4 个月或 6 个月体检时问一下。",
  },
  back: { en: "Back", zh: "返回" },
  nextReadiness: { en: "Next: readiness", zh: "下一步：准备信号" },

  // Step 2 — readiness quiz
  readinessTitle: {
    en: "Is {name} showing the readiness signs?",
    zh: "{name}出现准备好的信号了吗？",
  },
  yourBaby: { en: "your baby", zh: "宝宝" },
  yourBabyCap: { en: "Your baby", zh: "宝宝" },
  readinessLede: {
    en: "Most babies show all of these around 6 months. Check what you're seeing:",
    zh: "大多数宝宝在 6 个月左右会出现所有这些信号。勾选你已经观察到的：",
  },
  notAllYet: {
    en: "Not all there yet? Totally normal — save the profile anyway and we'll show you what to watch for instead of food picks. Or, if your pediatrician told you to start, check the box below and the program unlocks today.",
    zh: "还没全部出现？完全正常——照样保存档案，我们会告诉你该观察什么，而不是推荐食物。如果儿科医生让你现在开始，勾选下面的选项，计划今天就会解锁。",
  },
  earlyStartTitle: {
    en: "We're starting on our pediatrician's specific advice.",
    zh: "我们是按儿科医生的明确建议开始的。",
  },
  earlyStartDesc: {
    en: "This unlocks the program from 4 months, even before every readiness sign appears — pediatrician-guided programs often start early.",
    zh: "这会从 4 个月起解锁计划，即使准备信号还没全部出现——医生指导下的方案常常提前开始。",
  },
  nextLastThing: { en: "Next: one last thing", zh: "下一步：最后一件事" },

  // Step 3 — disclaimer + verdict + branch
  finishTitle: { en: "One last thing", zh: "最后一件事" },
  disclaimer: {
    en: "I understand OpenSolids is a free educational guide, not medical advice, and that my pediatrician's guidance comes first. All data stays on this device unless I export it.",
    zh: "我了解 OpenSolids 是免费的科普指南，不是医疗建议；儿科医生的意见永远优先。所有数据都保存在这台设备上，除非我自己导出。",
  },
  verdictEyebrow: {
    en: "Readiness verdict · {count} of {total} signs",
    zh: "准备程度判定 · {count}/{total} 个信号",
  },
  itsTime: { en: "It's time", zh: "是时候了" },
  /** Rendered inside the accent-colored span that closes the headline. */
  itsTimeDot: { en: ".", zh: "。" },
  allSignsBody: {
    en: "{name} is showing all {total} readiness signs. Tomorrow morning is a perfectly good day one — your first week is built around iron-rich, one-ingredient starts.",
    zh: "{name}已经出现全部 {total} 个准备信号。明天早上就是很好的第一天——第一周的安排以富含铁的单一食材为主。",
  },
  earlyStartBody: {
    en: "You're starting on your pediatrician's specific advice — the plan unlocks today, and we'll keep picks to smooth, mashable first foods.",
    zh: "你们是按儿科医生的明确建议开始的——计划今天解锁，我们会把推荐控制在顺滑、可压成泥的初期食物。",
  },
  notYetTitle: { en: "Not yet — and that's normal", zh: "还没到时候——这很正常" },
  /** Rendered inside the accent-colored span that closes the headline. */
  notYetDot: { en: ".", zh: "。" },
  notYetBody: {
    en: "{name} isn't showing all the signs, so we won't suggest foods yet. We'll show you exactly what to watch for, and the plan flips on the day the signs line up.",
    zh: "{name}还没出现全部信号，所以我们暂时不推荐食物。我们会明确告诉你该观察什么，等信号齐了，计划当天就会开启。",
  },
  watchingFor: { en: "Watching for", zh: "正在观察" },
  pedAdviceQ: {
    en: "Starting on your pediatrician's advice?",
    zh: "是按儿科医生的建议开始的？",
  },
  pedAdviceDesc: {
    en: "That unlocks the program from 4 months — we'll keep picks to smooth, mashable first foods.",
    zh: "这会从 4 个月起解锁计划——推荐会控制在顺滑、可压成泥的初期食物。",
  },
  beginToday: { en: "Begin today", zh: "今天就开始" },
  saveProfile: { en: "Save profile", zh: "保存档案" },
  startFresh: { en: "Start fresh → see today's plan", zh: "从头开始 → 看今天的计划" },
  alreadyStarted: { en: "We've already started → import", zh: "我们已经开始了 → 导入进度" },

  // Shell
  h1Edit: { en: "Edit profile", zh: "编辑档案" },
  h1Add: { en: "Add another baby", zh: "再添加一个宝宝" },
  h1Setup: { en: "Let's set up your plan", zh: "来设置你的计划吧" },
  stepOf: { en: "STEP {step} OF {total}", zh: "第 {step} 步，共 {total} 步" },
  twoMin: { en: "~2 MIN TOTAL", zh: "总共约 2 分钟" },
  browseBefore: { en: "Prefer to look around first?", zh: "想先随便看看？" },
  browseLink: { en: "Browse the food library", zh: "浏览食物库" },
  browseAfter: { en: "without a profile.", zh: "不需要先建档案。" },
} satisfies Msgs;

/** The five readiness signs, in display order (checkbox rows + "watching for" list). */
export const READINESS_SIGN_MSGS: Msg[] = [
  { en: "Sits upright with little or no support", zh: "几乎不需要支撑就能坐直" },
  { en: "Steady head control", zh: "头部控制稳定" },
  { en: "Brings hands and toys to the mouth", zh: "会把手和玩具放进嘴里" },
  { en: "Watches your food with real interest", zh: "对你吃的食物表现出浓厚兴趣" },
  {
    en: "The tongue-thrust reflex has faded (food isn't automatically pushed back out)",
    zh: "吐舌反射已经消退（食物不会被自动顶出来）",
  },
];
