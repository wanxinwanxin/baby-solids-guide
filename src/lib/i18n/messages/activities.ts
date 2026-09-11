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
    zh: "点一下就记录一次今天的活动。读了某一首具体的诗？从「读给宝宝」书架上记录，标题会一起记下来。",
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
  readShelfLink: { en: "Read to baby shelf →", zh: "去「读给宝宝」书架 →" },
  syncNote: {
    en: "Activities sync to everyone in the family, like meals and sleep.",
    zh: "活动和喂食、睡眠一样，会同步给全家人。",
  },
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
