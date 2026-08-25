import type { Msg, Msgs } from "../config";

/**
 * Safety guide page copy (src/app/safety/page.tsx).
 *
 * Life-safety copy: zh must lose no information. Glossary is pinned —
 * gagging → 干呕, choking → 窒息 — and 911 stays 911 in both locales.
 */
export const safetyMsgs = {
  metaTitle: {
    en: "Safety: gagging vs. choking & emergencies",
    zh: "安全指南：干呕与窒息的区别及紧急处理",
  },
  metaDescription: {
    en: "How to tell gagging from choking, the foods that must always be modified, and a printable emergency plan.",
    zh: "如何分辨干呕和窒息、必须处理后才能给的食物清单，以及一份可打印的紧急处理方案。",
  },
  title: { en: "Safety guide", zh: "安全指南" },
  call911Title: {
    en: "Call 911 immediately if your baby:",
    zh: "宝宝出现以下任一情况，请立即拨打 911：",
  },
  gvcTitle: { en: "Gagging vs. choking", zh: "干呕与窒息" },
  gvcIntro: {
    en: "Gagging is a normal, protective reflex that moves food forward in the mouth — nearly every baby gags while learning. Choking is a blocked airway. The difference is sound:",
    zh: "干呕是一种正常的保护性反射，会把食物往嘴巴前方推——几乎每个宝宝在学吃的过程中都会干呕。窒息则是气道被堵住了。两者的区别在于声音：",
  },
  gagTitle: { en: "Gagging — normal, stay calm", zh: "干呕——正常现象，保持冷静" },
  gagWhat: {
    en: "What to do: nothing. Stay calm, don't reach into the mouth — a finger sweep can push food deeper.",
    zh: "该怎么做：什么都不用做。保持冷静，不要把手伸进宝宝嘴里——用手指去抠反而可能把食物推得更深。",
  },
  chokeTitle: { en: "Choking — act now", zh: "窒息——立即行动" },
  chokeWhat: {
    en: "What to do: have someone call 911 while you start infant back blows and chest thrusts. Take an infant CPR class before starting solids if you can — it's the single best preparation.",
    zh: "该怎么做：让身边的人拨打 911，你同时开始婴儿拍背法和胸部冲击法。条件允许的话，在开始辅食前先上一节婴儿心肺复苏（CPR）课——这是最有效的准备。",
  },
  neverTitle: { en: "Never serve unmodified", zh: "绝不能不处理就直接给" },
  neverIntro: {
    en: "These are the classic airway-shaped hazards. Most are fine with the right prep — each food's page shows exactly how.",
    zh: "以下是典型的、形状容易卡住气道的高危食物。大多数只要处理得当就可以吃——每种食物的页面都写明了具体做法。",
  },
  thHazard: { en: "Hazard", zh: "高危食物" },
  thAlt: { en: "Safe alternative", zh: "安全做法" },
  planTitle: { en: "Emergency action plan", zh: "紧急处理方案" },
  planIntro: {
    en: "Post this where you feed your baby. Fill in the blanks and review it with everyone who feeds them.",
    zh: "把这份方案贴在你喂宝宝吃饭的地方。填好空白处，并和每一位会喂宝宝的人一起过一遍。",
  },
  severeLead: { en: "Severe reaction", zh: "严重反应" },
  severeMid: {
    en: " (trouble breathing; tongue/lip swelling; widespread hives with vomiting; pale or floppy): ",
    zh: "（呼吸困难；舌头或嘴唇肿胀；全身大面积荨麻疹并伴呕吐；面色苍白或四肢发软）：",
  },
  severeCall: { en: "call 911 first.", zh: "先拨打 911。" },
  severeTail: {
    en: " If infant epinephrine has been prescribed, use it as directed, then call.",
    zh: "如果医生开过婴儿肾上腺素，先按医嘱使用，再打电话。",
  },
  milderLead: { en: "Milder reaction", zh: "较轻反应" },
  milderTail: {
    en: " (a few hives, localized rash, one vomit): stop the food, photograph the symptoms, call the pediatrician today, and pause that allergen in the app.",
    zh: "（少量荨麻疹、局部皮疹、吐了一次）：停掉这种食物，给症状拍照，当天联系儿科医生，并在应用里暂停这个过敏原。",
  },
  delayedLead: { en: "Delayed heavy vomiting", zh: "延迟性剧烈呕吐" },
  delayedTail: {
    en: " (1–4 hours after a meal, baby wiped out): can be FPIES — call the pediatrician urgently; go to the ER if baby can't keep fluids down.",
    zh: "（进食后 1–4 小时出现，宝宝虚弱无力）：可能是 FPIES——立即联系儿科医生；如果宝宝喝什么吐什么、连液体都留不住，就直接去急诊。",
  },
  chokingLead: { en: "Choking", zh: "窒息" },
  chokingTail: {
    en: " (silent, can't cough or cry): shout for someone to call 911 and begin infant back blows and chest thrusts.",
    zh: "（安静无声，无法咳嗽或哭）：大声喊人拨打 911，同时开始婴儿拍背法和胸部冲击法。",
  },
  /** {fare} / {aap} are the English citation labels from SOURCES (not translated). */
  planSourcesNote: {
    en: "Structure informed by FARE's emergency care plan and AAP choking-prevention guidance ({fare}; {aap}).",
    zh: "本方案的结构参考了 FARE 的紧急护理计划和 AAP 的防窒息指南（{fare}；{aap}）。",
  },
  footerSources: { en: "Sources:", zh: "参考来源：" },
  footerDisclaimer: {
    en: ". Educational guidance, not medical advice.",
    zh: "。以上为教育性指导，不构成医疗建议。",
  },
} satisfies Msgs;

/** Bullets in the "Call 911 immediately" alert. */
export const CALL_911_SIGNS: Msg[] = [
  {
    en: "• Cannot cry, cough, or make sound (silent = choking)",
    zh: "• 无法哭、无法咳嗽、发不出声音（安静无声 = 窒息）",
  },
  {
    en: "• Has trouble breathing, wheezing, or a persistent cough after eating",
    zh: "• 进食后呼吸困难、喘鸣，或持续咳嗽",
  },
  {
    en: "• Has swelling of the tongue or lips, or is drooling and can't swallow",
    zh: "• 舌头或嘴唇肿胀，或不停流口水、无法吞咽",
  },
  {
    en: "• Has widespread hives together with vomiting",
    zh: "• 全身大面积荨麻疹并伴有呕吐",
  },
  {
    en: "• Is pale, floppy, or hard to rouse",
    zh: "• 面色苍白、四肢发软，或很难唤醒",
  },
];

/** Bullets in the gagging card (before the "What to do" line). */
export const GAG_SIGNS: Msg[] = [
  { en: "• Noisy: coughing, sputtering, retching", zh: "• 有声音：咳嗽、噗噗吐气、作呕" },
  { en: "• Face may turn red", zh: "• 脸可能会涨红" },
  {
    en: "• Baby works the food forward on their own",
    zh: "• 宝宝会自己把食物往前送出来",
  },
];

/** Bullets in the choking card (before the "What to do" line). */
export const CHOKE_SIGNS: Msg[] = [
  {
    en: "• Silent: can't cry, cough, or make sound",
    zh: "• 安静无声：无法哭、无法咳嗽、发不出声音",
  },
  { en: "• Face/lips turning blue or gray", zh: "• 脸色或嘴唇发青、发灰" },
  { en: "• Panicked look, or losing consciousness", zh: "• 表情惊恐，或正在失去意识" },
];

/** Rows of the "Never serve unmodified" table. */
export const NEVER_SERVE_ROWS: { hazard: Msg; alt: Msg }[] = [
  {
    hazard: {
      en: "Whole grapes, cherry tomatoes, large blueberries, cherries",
      zh: "整颗葡萄、圣女果、大颗蓝莓、樱桃",
    },
    alt: {
      en: "Quarter lengthwise (never coin-shaped slices); pit cherries",
      zh: "纵向切成四瓣（绝不要切成圆片）；樱桃要去核",
    },
  },
  {
    hazard: {
      en: "Whole nuts and thick globs of nut butter",
      zh: "整粒坚果和厚厚一坨的坚果酱",
    },
    alt: {
      en: "Finely ground nuts or nut butter thinned to a drizzle / spread paper-thin (whole nuts: not until ~age 4)",
      zh: "把坚果磨成细粉，或把坚果酱稀释到能淋洒的程度/涂成极薄一层（整粒坚果：大约 4 岁前都不要给）",
    },
  },
  {
    hazard: { en: "Hot dogs and sausage rounds", zh: "热狗和香肠圆片" },
    alt: {
      en: "Skip, or slice lengthwise into thin strips (watch sodium)",
      zh: "最好不给；要给就纵向切成细条（注意钠含量）",
    },
  },
  {
    hazard: { en: "Popcorn, marshmallows, hard candy", zh: "爆米花、棉花糖、硬糖" },
    alt: {
      en: "None — wait until at least age 4",
      zh: "没有安全做法——至少等到 4 岁",
    },
  },
  {
    hazard: {
      en: "Raw apple chunks, raw carrot sticks/coins, other hard raw produce",
      zh: "生苹果块、生胡萝卜条或圆片，以及其他硬质生蔬果",
    },
    alt: {
      en: "Steam until squish-test soft, or grate finely raw",
      zh: "蒸到能通过“一压就扁”测试的软度，或生着擦成细丝",
    },
  },
  {
    hazard: { en: "Honey (in any form)", zh: "蜂蜜（任何形式）" },
    alt: {
      en: "None before 12 months — infant botulism risk",
      zh: "12 个月前一律不能吃——有婴儿肉毒中毒风险",
    },
  },
  {
    hazard: { en: "Cow's milk as a drink", zh: "把牛奶当饮品喝" },
    alt: {
      en: "Not before 12 months (yogurt and cheese as foods are fine from ~6 months)",
      zh: "12 个月前不要喝（酸奶和奶酪作为食物，约 6 个月起就可以吃）",
    },
  },
  {
    hazard: {
      en: "Added salt and sugar, unpasteurized dairy/juice",
      zh: "额外添加的盐和糖、未经巴氏杀菌的奶制品或果汁",
    },
    alt: {
      en: "Cook without salt; babies don't need sweeteners",
      zh: "做饭不放盐；宝宝不需要甜味剂",
    },
  },
  {
    hazard: {
      en: "High-mercury fish (shark, swordfish, king mackerel, Gulf of Mexico tilefish, bigeye tuna, marlin, orange roughy)",
      zh: "高汞鱼类（鲨鱼、剑鱼、大耳马鲛、墨西哥湾方头鱼、大眼金枪鱼、旗鱼、胸棘鲷）",
    },
    alt: {
      en: "Low-mercury choices: salmon, cod, sardines",
      zh: "选低汞鱼：三文鱼、鳕鱼、沙丁鱼",
    },
  },
];

/** Fill-in-the-blank lines on the printable emergency plan. */
export const PLAN_BLANKS: Msg[] = [
  { en: "Baby's name: ______________________", zh: "宝宝姓名：______________________" },
  { en: "Date of birth: ______________________", zh: "出生日期：______________________" },
  { en: "Known allergies: ____________________", zh: "已知过敏：____________________" },
  { en: "Pediatrician: _______________________", zh: "儿科医生：_______________________" },
  { en: "Pediatrician phone: _________________", zh: "儿科医生电话：_________________" },
  { en: "Emergency contact: __________________", zh: "紧急联系人：__________________" },
];
