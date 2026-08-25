import type { Msgs } from "../config";

/** Add-to-home-screen prompt (src/components/InstallPrompt.tsx). */
export const installMsgs = {
  /* Android / Chromium — a real one-tap install via beforeinstallprompt. */
  androidTitle: {
    en: "📱 Install {brand}",
    zh: "📱 安装 {brand}",
  },
  androidBody: {
    en: "Put it on your home screen — it opens full-screen and keeps working offline.",
    zh: "把它放到主屏幕——全屏打开，离线也能用。",
  },
  install: {
    en: "Install app",
    zh: "安装应用",
  },

  /* iOS Safari — no install API exists, so we show the manual steps. */
  iosTitle: {
    en: "📱 Add {brand} to your home screen",
    zh: "📱 把 {brand} 添加到主屏幕",
  },
  iosBody: {
    en: "It opens full-screen like an app and keeps working offline. Three taps:",
    zh: "添加后像应用一样全屏打开，离线也能用。三步就好：",
  },
  // Browser-neutral: Chrome and Edge on iOS have the same share sheet, and
  // saying "Safari" would send those readers hunting for a toolbar they can't see.
  iosStep1: {
    en: "Tap the Share icon in the browser toolbar",
    zh: "点击浏览器工具栏中的分享图标",
  },
  iosStep2: {
    en: "Scroll down and choose “Add to Home Screen”",
    zh: "向下滑动，选择“添加到主屏幕”",
  },
  iosStep3: {
    en: "Tap “Add” — that's it.",
    zh: "点击“添加”，就完成了。",
  },

  dismiss: {
    en: "Not now",
    zh: "以后再说",
  },
} satisfies Msgs;
