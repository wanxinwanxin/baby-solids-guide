import type { IdeaArea } from "@/content-schema/activity-ideas";
import type { ActivityId } from "@/lib/storage/types";
import type { Msg, Msgs } from "../config";

/** Activities page copy (src/app/activities/page.tsx) + registry labels. */
export const activitiesMsgs = {
  metaTitle: { en: "Activities", zh: "亲子活动" },
  metaDescription: {
    en: "Log reading, singing, exercise, and other development activities — one tap each.",
    zh: "记录读书、唱歌、运动等亲子早教活动——点一下就记好。",
  },
  heading: { en: "Activities", zh: "亲子活动" },
  collectionLabel: { en: "Activity collection", zh: "活动集" },
  catalogTitle: { en: "Activity library", zh: "亲子活动库" },
  everydayTitle: { en: "Everyday ideas", zh: "日常活动灵感" },
  catalogIntro: {
    en: "193 activities with English and Chinese instructions. Browse by catalog age or development area, and log the activity you tried.",
    zh: "193项亲子活动，包含中英文操作说明。按目录月龄或发展领域查找，做过后可一键记录。",
  },
  catalogAgeNote: {
    en: "These are catalog age groups, not personalized recommendations or milestone deadlines. Choose for your baby's current abilities, stay close, and stop if your baby is uncomfortable. Added reminders are separate from the source instructions.",
    zh: "这些是原目录的月龄分组，不是个性化推荐或里程碑期限。请按宝宝当前能力选择，全程陪伴，不舒服时就停止。“另加提醒”与原活动说明分开显示。",
  },
  activitySearch: { en: "Search activities in English or Chinese", zh: "用中文或英文搜索活动" },
  searchButton: { en: "Search activities", zh: "搜索活动" },
  clearSearch: { en: "Clear search", zh: "清除搜索" },
  catalogAgeFilter: { en: "Catalog age", zh: "目录月龄" },
  allAges: { en: "Both age groups", zh: "两个年龄段" },
  catalog4to6: { en: "4–6 months", zh: "4–6个月" },
  catalog7to9: { en: "7–9 months", zh: "7–9个月" },
  catalogCount: { en: "{count} of {total} activities", zh: "共{total}项，显示{count}项" },
  noActivities: { en: "No activities match. Try another search or age group.", zh: "没有匹配的活动。请试试其他关键词或年龄段。" },
  activityGoal: { en: "Goal", zh: "目标" },
  activityMaterials: { en: "Materials", zh: "准备材料" },
  activityDuration: { en: "Time or repetitions", zh: "时长或次数" },
  activityInstructions: { en: "How to do it", zh: "怎么做" },
  activityMilestone: { en: "Related milestone in the source", zh: "原文相关里程碑" },
  addedReminder: { en: "Added reminder", zh: "另加提醒" },
  intro: {
    en: "One tap logs an activity for today. Reading a specific piece? Log it from the Read to baby shelf and the title comes along.",
    zh: "点一下就记录一次今天的活动。读了某一首具体的诗？从“读给宝宝”书架上记录，标题会一起记下来。",
  },
  setupTitle: { en: "Set up a profile to log activities", zh: "先建立档案才能记录活动" },
  setupBody: { en: "Activities are logged per baby.", zh: "活动按宝宝分别记录。" },
  startOnboarding: { en: "Start onboarding →", zh: "开始设置 →" },
  quickLogTitle: { en: "Log for today", zh: "记录今天" },
  todayTitle: { en: "Today", zh: "今天" },
  todayEmpty: { en: "Nothing logged today yet.", zh: "今天还没有记录。" },
  deleteAria: { en: "Delete {what}", zh: "删除{what}" },
  recentTitle: { en: "Previous days", zh: "之前几天" },
  recentEmpty: { en: "Past days will show up here.", zh: "过去几天的记录会显示在这里。" },
  readShelfLink: { en: "Read to baby shelf →", zh: "去“读给宝宝”书架 →" },
  syncNote: {
    en: "Activities sync to everyone in the family, like meals and sleep.",
    zh: "活动和喂食、睡眠一样，会同步给全家人。",
  },
  movementTitle: { en: "Things to do with the baby", zh: "可以和宝宝做的事" },
  movementIntro: {
    en: "Ideas grouped by the age they usually start working, youngest first. Pick an area to see only those ideas. Open one for the steps, the reason it helps, and the sign to stop. Every idea logs with one tap, the same way the read shelf does.",
    zh: "按通常开始有效的月龄分组，从小月龄排起。选一个方面，就只看这一类。展开一条就能看到步骤、它为什么有用，以及该停下来的信号。每一条都能一键记录，和“读给宝宝”书架一样。",
  },
  areaFilterLabel: { en: "Show ideas for", zh: "按方面筛选" },
  areaAll: { en: "All", zh: "全部" },
  movementFromAge: { en: "From {from} months", zh: "{from} 个月起" },
  /** The 0-month group. "From 0 months" and "0 个月起" both read as machine output. */
  movementFromBirth: { en: "From birth", zh: "出生起" },
  movementWhy: { en: "Why it helps", zh: "为什么有用" },
  movementWatchFor: { en: "Watch for", zh: "注意" },
  movementAgeNote: {
    en: "Ages say when an idea usually starts working, not when your baby should manage it. Babies reach these months in their own order.",
    zh: "月龄说的是一条建议通常什么时候开始有效，不是宝宝应该在什么时候做到。每个宝宝到达这些月龄的顺序都不一样。",
  },
  markDone: { en: "Did this today ✓", zh: "今天做了 ✓" },
  doneToday: { en: "Done today ✓ (tap to undo)", zh: "今天做过 ✓（点一下撤销）" },
} satisfies Msgs;

/** Display names for the activity registry (ACTIVITY_IDS). */
export const ACTIVITY_MSGS: Record<ActivityId, Msg> = {
  read: { en: "Read to baby", zh: "读给宝宝" },
  sing: { en: "Singing", zh: "唱歌" },
  music: { en: "Music time", zh: "听音乐" },
  exercise: { en: "Exercise & movement", zh: "运动" },
  "tummy-time": { en: "Tummy time", zh: "趴卧练习" },
  outdoors: { en: "Outdoor time", zh: "户外活动" },
  play: { en: "Play & learning", zh: "游戏早教" },
};

/** Display names for the idea areas (IDEA_AREAS), the shelf's filter. */
export const IDEA_AREA_MSGS: Record<IdeaArea, Msg> = {
  moving: { en: "Moving", zh: "大运动" },
  hands: { en: "Hands", zh: "精细动作" },
  senses: { en: "Senses", zh: "感官" },
  thinking: { en: "Thinking", zh: "认知" },
  talking: { en: "Talking", zh: "语言" },
  people: { en: "People & feelings", zh: "社交与情绪" },
  routines: { en: "Daily routines", zh: "生活自理" },
};

/** Locale-independent icons for the same registry. */
export const ACTIVITY_EMOJI: Record<ActivityId, string> = {
  read: "📖",
  sing: "🎤",
  music: "🎵",
  exercise: "🤸",
  "tummy-time": "🐢",
  outdoors: "🌳",
  play: "🧩",
};
