import type { Msgs } from "../config";

/**
 * Emergency interrupt (src/components/EmergencyDialog.tsx). The headline and
 * action list arrive via props from the triage engine — only the dialog's own
 * fixed strings live here.
 */
export const emergencyMsgs = {
  call911: { en: "Call 911", zh: "拨打 911" },
  acknowledge: { en: "I understand — continue", zh: "我明白了——继续" },
} satisfies Msgs;
