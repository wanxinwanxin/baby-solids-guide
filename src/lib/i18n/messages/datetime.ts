import type { Msgs } from "../config";

/** Shared date + typed-time fields (DateTimeField, TimeConfirm). */
export const datetimeMsgs = {
  dateLabel: { en: "Date", zh: "日期" },
  timeLabel: { en: "Time", zh: "时间" },
  timePlaceholder: { en: "7:35 pm", zh: "19:35" },
  timeInvalid: {
    en: "Enter a time like 7:35 pm or 19:35.",
    zh: "请输入时间，例如 19:35 或 下午7:35。",
  },
  cancel: { en: "Cancel", zh: "取消" },
} satisfies Msgs;
