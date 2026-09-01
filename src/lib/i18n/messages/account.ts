import type { Msg, Msgs } from "../config";

/** Account page (src/app/account/page.tsx). */
export const accountMsgs = {
  title: { en: "Account", zh: "账户" },
  // Sync-disabled deployment notice.
  noSyncTitle: {
    en: "Sync isn't configured in this deployment",
    zh: "这个部署没有配置同步功能",
  },
  noSyncBefore: {
    en: "Your data still lives safely on this device, and you can ",
    zh: "你的数据仍然安全地保存在这台设备上，你随时可以",
  },
  noSyncLink: { en: "export a backup", zh: "导出备份" },
  noSyncAfter: { en: " any time.", zh: "。" },
  // Errors / notices.
  genericError: { en: "Something went wrong — try again.", zh: "出了点问题——请再试一次。" },
  resetNeedEmail: {
    en: "Enter your email above first, then tap the reset link again.",
    zh: "请先在上面填写你的邮箱，再点一次重置链接。",
  },
  resetSendError: {
    en: "Couldn't send the reset email — try again.",
    zh: "重置邮件发送失败——请再试一次。",
  },
  resetSent: {
    en: "If that address has an account, a reset link is on its way.",
    zh: "如果这个邮箱注册过账户，重置链接已经在路上了。",
  },
  // Signed-in view.
  syncedExplainer: {
    en: "Your babies' profiles and logs sync to this account and follow you to any device. Nothing else is stored — no analytics, no tracking.",
    zh: "宝宝的档案和记录会同步到这个账户，换设备也随时跟着你。除此之外什么都不存——没有分析统计，也没有跟踪。",
  },
  /** Honest freshness line: when this device last heard from the server. */
  lastChecked: { en: "Last checked for updates at {time}.", zh: "上次检查更新：{time}。" },
  lastCheckedNever: {
    en: "Checking for updates from your other devices…",
    zh: "正在检查其他设备上的更新……",
  },
  lastCheckedStale: {
    en: "Last checked at {time} — other devices' changes may not be here yet.",
    zh: "上次检查是 {time}——其他设备上的改动可能还没同步过来。",
  },
  downloadData: { en: "Download my data from the server", zh: "从服务器下载我的数据" },
  signOut: { en: "Sign out", zh: "退出登录" },
  deleteConfirmBody: {
    en: "Delete the account and ALL server-side data? Data on this device stays until you clear it from History.",
    zh: "确定要删除账户以及服务器上的全部数据吗？这台设备上的数据会保留，直到你在“历史”页里清除。",
  },
  deleteYes: { en: "Yes, delete my account", zh: "是的，删除我的账户" },
  cancel: { en: "Cancel", zh: "取消" },
  deleteLink: { en: "Delete account and server data", zh: "删除账户和服务器数据" },
  // Signed-out view.
  saveTitle: { en: "Save your data", zh: "保存你的数据" },
  saveLede: {
    en: "An account keeps your baby's history safe across devices and browser cleanups. Free, no ads, no tracking — and guest mode keeps working if you skip this.",
    zh: "有了账户，宝宝的记录在换设备、清理浏览器时也不会丢。免费、无广告、无跟踪——就算跳过这一步，访客模式也照常可用。",
  },
  tabSignIn: { en: "Sign in", zh: "登录" },
  tabCreate: { en: "Create account", zh: "创建账户" },
  emailLabel: { en: "Email", zh: "邮箱" },
  passwordLabel: { en: "Password", zh: "密码" },
  forgotPassword: {
    en: "Forgot password? Email me a reset link",
    zh: "忘记密码？把重置链接发到我的邮箱",
  },
  firstSignInNote: {
    en: "On first sign-in, everything on this device is uploaded and merged with anything already in the account — nothing is lost in either direction.",
    zh: "首次登录时，这台设备上的所有数据都会上传，并与账户里已有的数据合并——两边都不会丢失任何东西。",
  },
  // Google OAuth. The `en` label stays "Continue with Google" (a Google-approved
  // button label) rather than "Sign in with Google" so it can't collide with the
  // e2e locator getByRole("button", { name: "Sign in" }), which matches on
  // substring by default.
  continueGoogle: { en: "Continue with Google", zh: "使用 Google 账号登录" },
  orDivider: { en: "or", zh: "或" },
} satisfies Msgs;

/** Sync status pill next to the Account heading (e2e pins the en strings). */
export const SYNC_STATUS_LABELS: Record<
  "off" | "idle" | "syncing" | "synced" | "error",
  Msg
> = {
  off: { en: "", zh: "" },
  idle: { en: "", zh: "" },
  syncing: { en: "syncing…", zh: "同步中…" },
  synced: { en: "synced ✓", zh: "已同步 ✓" },
  error: { en: "sync error — will retry", zh: "同步出错——会自动重试" },
};

/** Reset-password page (src/app/account/reset-password/page.tsx). */
export const resetPasswordMsgs = {
  title: { en: "Reset password", zh: "重置密码" },
  linkInvalid: {
    en: "This reset link is invalid or has expired. ",
    zh: "这个重置链接无效或已过期。",
  },
  linkInvalidLink: {
    en: "Request a new one from the sign-in page.",
    zh: "去登录页重新申请一个。",
  },
  updated: { en: "Password updated. ", zh: "密码已更新。" },
  updatedLink: { en: "Sign in with it now →", zh: "现在就用新密码登录 →" },
  resetFailed: {
    en: "Couldn't reset the password — the link may have expired.",
    zh: "密码重置失败——链接可能已过期。",
  },
  newPasswordLabel: { en: "New password", zh: "新密码" },
  submit: { en: "Set new password", zh: "设置新密码" },
} satisfies Msgs;

/** Caregiver-mode card (src/components/CaregiverModeCard.tsx). */
export const caregiverCardMsgs = {
  title: { en: "Who uses this device?", zh: "这台设备谁在用？" },
  body: {
    en: "Helping with feeding, but not with planning? Caregiver view hides the planning tools and shows just what to serve today and how to prepare it. It changes only this device.",
    zh: "只负责喂，不负责规划？看护人视图会隐藏规划工具，只显示今天吃什么、怎么做。此设置只影响这台设备。",
  },
  onNote: {
    en: "Caregiver view is on for this device.",
    zh: "这台设备已开启看护人视图。",
  },
  toggleOn: { en: "Switch to caregiver view", zh: "切换到看护人视图" },
  toggleOff: { en: "Show the full app", zh: "显示完整应用" },
} satisfies Msgs;
