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
    en: "Ideas grouped by the age they usually start working, youngest first. Open one for the steps, the reason it helps, and the sign to stop. Every idea logs with one tap, the same way the read shelf does.",
    zh: "按通常开始有效的月龄分组，从小月龄排起。展开一条就能看到步骤、它为什么有用，以及该停下来的信号。每一条都能一键记录，和“读给宝宝”书架一样。",
  },
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
