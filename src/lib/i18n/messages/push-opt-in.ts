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
  // iOS only sends web notifications to an installed (home-screen) app, so a
  // parent in Safari has to install first — otherwise the button silently
  // can't work.
  iosInstallFirst: {
    en: "📳 To get check-in notifications on iPhone, add OpenSolids to your Home Screen first (Share → Add to Home Screen), then open it from there.",
    zh: "📳 想在 iPhone 上收到观察提醒通知，请先把 OpenSolids 添加到主屏幕（分享 → 添加到主屏幕），再从主屏幕打开。",
  },
} satisfies Msgs;
