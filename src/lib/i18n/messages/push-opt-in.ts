import type { Msgs } from "../config";

/** Push notification opt-in (src/components/PushOptIn.tsx). */
export const pushOptInMsgs = {
  on: {
    en: "📳 Phone notifications are on for check-ins.",
    zh: "📳 观察提醒的手机通知已开启。",
  },
  enable: {
    en: "📳 Get check-ins as phone notifications, even with the app closed →",
    zh: "📳 把观察提醒变成手机通知，不打开应用也能收到 →",
  },
} satisfies Msgs;
