import type { Msgs } from "../config";

/** Plan board copy (src/app/plan/page.tsx + PlanBoard.tsx). */
export const planMsgs = {
  title: { en: "Introduction plan", zh: "引入计划" },
  metaDescription: {
    en: "Drag foods onto a 12-week timeline. Iron early and allergens one at a time are the science; the rest of the order is yours.",
    zh: "把食物拖到 12 周的时间线上。富含铁的食物先吃、过敏原一次一种是科学结论；其余的顺序由你决定。",
  },
  setupTitle: { en: "Set up a profile to plan", zh: "先建立宝宝档案再开始规划" },
  setupBody: {
    en: "The planner uses your baby's age and allergy profile to sanity-check every week.",
    zh: "规划器会根据宝宝的月龄和过敏档案，逐周帮你把关。",
  },
  setupLink: { en: "Start here →", zh: "从这里开始 →" },
  suggestPlan: { en: "Suggest a plan", zh: "生成建议计划" },
  resuggestPlan: { en: "Re-suggest plan", zh: "重新生成计划" },
  clearConfirm: { en: "Clear everything?", zh: "全部清空？" },
  yes: { en: "Yes", zh: "是" },
  no: { en: "No", zh: "否" },
  clearPlan: { en: "Clear plan", zh: "清空计划" },
  intro: {
    en: "Two rules are science: iron-rich foods early, and common allergens one at a time (then kept in rotation). Beyond that, the order is genuinely yours — drag foods around, or tap a food below to add it to the selected week. The board warns, it never dictates.",
    zh: "只有两条规则来自科学：富含铁的食物要早吃，常见过敏原一次引入一种（之后保持轮换）。除此之外，顺序完全由你决定——可以拖动食物，也可以点按下方的食物，把它加进选中的那一周。看板只会提醒，从不替你做主。",
  },
  introLink: { en: "Does order matter? →", zh: "顺序重要吗？→" },
  noPlanTitle: { en: "No plan yet", zh: "还没有计划" },
  /** {name} = baby nickname. */
  noPlanBody: {
    en: "\"Suggest a plan\" builds a 12-week starting point from {name}'s age, allergy profile, and what you've already logged — every bit of it editable.",
    zh: "“生成建议计划”会根据{name}的月龄、过敏档案和你已记录的内容，搭好一个 12 周的起点——每一处都可以修改。",
  },
  worthALook: { en: "Worth a look", zh: "值得看一眼" },
  thisWeek: { en: "This week", zh: "本周" },
  thisWeekBadge: { en: "this week", zh: "本周" },
  /** {n} = 1-based week number. */
  weekN: { en: "Week {n}", zh: "第 {n} 周" },
  dropFoodsHere: { en: "drop foods here", zh: "把食物拖到这里" },
  /** {label} = emoji + food name chip label. */
  moveChip: { en: "Move {label}", zh: "移动{label}" },
  moveChipWarning: {
    en: "Move {label} — warning: {message}",
    zh: "移动{label}——警告：{message}",
  },
  removeFromPlan: { en: "Remove {label} from plan", zh: "把{label}从计划中移除" },
  unplannedFoods: { en: "Unplanned foods", zh: "未安排的食物" },
  searchPlaceholder: { en: "Search…", zh: "搜索…" },
  searchAria: { en: "Search unplanned foods", zh: "搜索未安排的食物" },
  tapAddsTo: { en: "Tap adds to", zh: "点按添加到" },
  weekSelectAria: {
    en: "Week that tapped foods are added to",
    zh: "点按食物将添加到的那一周",
  },
  startEmpty: { en: "start with an empty board", zh: "从空白看板开始" },
  trayHint: {
    en: "Drag onto a week, or tap to add to the selected week. Drop a planned food back here to remove it.",
    zh: "把食物拖到某一周，或点按加入选中的那一周。把已安排的食物拖回这里即可移除。",
  },

  // --- Day-level scheduling (spacing explainer + chip start dates) ---
  /** {days} = INTRO_SPACING_DAYS. */
  spacingNote: {
    en: "New foods start about {days} days apart, so a reaction can be traced back to one food.",
    zh: "每种新食物之间大约相隔 {days} 天，这样一旦出现反应，就能追溯到具体是哪一种。",
  },
  /** {label} = chip label, {date} = localized start date. */
  startsOn: { en: "{label} starts {date}", zh: "{label}从{date}开始" },

  // --- Per-week "add a food" combobox ---
  addFood: { en: "+ Add food", zh: "+ 添加食物" },
  /** {week} = week lane label. */
  addFoodAria: { en: "Add a food to {week}", zh: "添加食物到{week}" },
  closeAddFood: { en: "Close", zh: "收起" },
  /** {week} = week lane label. Kept distinct from the tray's search label. */
  addFoodSearchAria: { en: "Find a food to add to {week}", zh: "查找要添加到{week}的食物" },
  addFoodPlaceholder: { en: "Type a food name…", zh: "输入食物名称…" },
  addFoodListAria: { en: "Matching foods", zh: "匹配的食物" },
  addFoodNoMatch: { en: "No foods match that.", zh: "没有匹配的食物。" },
  /** {n} = matches beyond the visible cap. */
  addFoodMore: { en: "{n} more match — keep typing to narrow it down.", zh: "还有 {n} 个匹配——继续输入可以缩小范围。" },
  /** {months} = food.minAgeMonths. */
  hintMinAge: { en: "{months}m+", zh: "{months} 个月以上" },
  /** {allergen} = localized allergen label. */
  hintAllergen: { en: "allergen: {allergen}", zh: "过敏原：{allergen}" },
  hintChoking: { en: "high choking risk", zh: "高窒息风险" },
  /** {n} = 1-based week number the food already sits in. */
  hintAlreadyIn: { en: "already in week {n} — picking it moves it", zh: "已在第 {n} 周——选中即可移过来" },
} satisfies Msgs;
