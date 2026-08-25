import type { Msgs } from "../config";

/** D4 family sharing card (src/components/FamilyCard.tsx). */
export const familyCardMsgs = {
  family: { en: "Family", zh: "家庭" },
  explainer: {
    en: "Co-parents sign in with their own account and see the same baby — every log flows both ways. Co-parents have full access, including editing and deleting.",
    zh: "另一位家长用自己的账户登录，看到的是同一个宝宝——每条记录都双向同步。对方拥有完整权限，包括编辑和删除。",
  },
  sendLink: {
    en: "Send this link to your co-parent — it works for 72 hours:",
    zh: "把这个链接发给另一位家长——72 小时内有效：",
  },
  copied: { en: "Copied ✓", zh: "已复制 ✓" },
  copy: { en: "Copy", zh: "复制" },
  invite: { en: "Invite a co-parent", zh: "邀请另一位家长" },
  remove: { en: "remove", zh: "移除" },
  you: { en: "you", zh: "你" },
} satisfies Msgs;

/** D4 invite landing page (src/app/join/[token]/page.tsx). */
export const joinMsgs = {
  title: { en: "Join the family", zh: "加入这个家庭" },
  /** Rendered inside the accent-colored span that closes the headline. */
  titleDot: { en: ".", zh: "。" },
  checking: { en: "Checking the invite…", zh: "正在检查邀请…" },
  loadError: {
    en: "Couldn't load this invite — check the link.",
    zh: "无法加载这个邀请——请检查链接。",
  },
  /** Between the bold inviter name and the bold baby nickname. */
  invitedMid: { en: " invited you to co-parent ", zh: "邀请你共同参与" },
  /** Right after the bold baby nickname. */
  invitedAfter: {
    en: "'s food journey — same baby, same logs, your own account.",
    zh: "的辅食之旅——同一个宝宝、同样的记录，各自用自己的账户。",
  },
  acceptAs: { en: "Accept as {email}", zh: "以 {email} 的身份接受" },
  acceptError: {
    en: "Couldn't accept the invite — try again.",
    zh: "接受邀请失败——请再试一次。",
  },
  signInFirstBefore: { en: "First, ", zh: "请先" },
  signInFirstLink: {
    en: "sign in or create your own account",
    zh: "登录或创建你自己的账户",
  },
  signInFirstAfter: {
    en: ", then reopen this link — it's good for 72 hours.",
    zh: "，然后重新打开这个链接——72 小时内有效。",
  },
} satisfies Msgs;
