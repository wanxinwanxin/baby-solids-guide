import type { Locale, Msg } from "@/lib/i18n/config";
import type { SymptomId } from "@/lib/storage/types";

/**
 * Reaction triage decision table (ROADMAP §8.4). Pure lookup — the symptom
 * vocabulary maps 1:1 onto severity rows, checked in strict priority order.
 */
export type TriageSeverity =
  | "emergency"
  | "same-day"
  | "monitor"
  | "fpies-pattern"
  | "educate"
  | "none";

export type TriageResult = {
  severity: TriageSeverity;
  headline: string;
  actions: string[];
  /** Whether the food's allergen group should be paused pending clearance. */
  pausesAllergen: boolean;
};

const EMERGENCY: SymptomId[] = [
  "trouble-breathing",
  "swelling-tongue-lips-drooling",
  "vomiting-repetitive",
  "lethargy-floppy",
];

const SAME_DAY: SymptomId[] = ["hives-widespread", "swelling-face", "vomiting-shortly-after"];

const MONITOR: SymptomId[] = ["hives-few-near-mouth", "redness-resolving", "diarrhea"];

/** Per-severity copy. `en` strings are pinned by tests — do not reword them. */
type TriageCopy = { headline: Msg; actions: Msg[] };

const EMERGENCY_COPY: TriageCopy = {
  headline: { en: "Call 911 now.", zh: "立即拨打 911。" },
  actions: [
    {
      en: "Call 911 (or your local emergency number) immediately.",
      zh: "立即拨打 911（或当地的急救电话）。",
    },
    {
      en: "Do not wait to see if it improves, and do not drive alone with the baby.",
      zh: "不要等着看会不会好转，也不要独自一人开车带宝宝就医。",
    },
    {
      en: "If you have been prescribed infant epinephrine, use it as directed while waiting.",
      zh: "如果医生给宝宝开过婴儿肾上腺素，请在等待时按医嘱使用。",
    },
    {
      en: "Keep the baby upright or lying on their side; stay with them.",
      zh: "让宝宝保持直立或侧躺，并且寸步不离地陪着。",
    },
  ],
};

const FPIES_COPY: TriageCopy = {
  headline: {
    en: "This pattern can be FPIES — get urgent medical advice.",
    zh: "这种情况可能是 FPIES——请立即寻求紧急医疗建议。",
  },
  actions: [
    {
      en: "Profuse vomiting 1–4 hours after a food can be FPIES (food protein-induced enterocolitis syndrome).",
      zh: "进食后 1–4 小时出现大量呕吐，可能是 FPIES（食物蛋白诱发性小肠结肠炎综合征）。",
    },
    {
      en: "If the baby is pale, floppy, or can't keep fluids down, go to urgent care or the ER now.",
      zh: "如果宝宝面色苍白、软弱无力，或喝什么吐什么，请立即去急诊或紧急护理中心。",
    },
    {
      en: "Avoid the trigger food until you've spoken with your pediatrician; ask about an allergist referral.",
      zh: "在与儿科医生沟通之前，先回避这种诱发食物；并询问是否需要转诊过敏专科医生。",
    },
  ],
};

const SAME_DAY_COPY: TriageCopy = {
  headline: { en: "Contact your pediatrician today.", zh: "今天就联系儿科医生。" },
  actions: [
    {
      en: "Call your pediatrician's office today and describe exactly what was eaten and what you saw.",
      zh: "今天就致电儿科医生诊所，准确描述宝宝吃了什么、你看到了什么。",
    },
    {
      en: "Pause this food (and its allergen group) until they advise you.",
      zh: "在医生给出建议之前，先暂停这种食物（以及它所属的过敏原组）。",
    },
    {
      en: "Take photos of any rash or swelling — they help the clinician.",
      zh: "给皮疹或肿胀拍照——这对医生的判断很有帮助。",
    },
    {
      en: "If symptoms worsen — breathing trouble, tongue/lip swelling, floppiness — call 911.",
      zh: "如果症状加重——呼吸困难、舌头或嘴唇肿胀、软弱无力——立即拨打 911。",
    },
  ],
};

const MONITOR_COPY: TriageCopy = {
  headline: {
    en: "Note it, and check with your pediatrician before offering this again.",
    zh: "记录下来，并在再次尝试之前先咨询儿科医生。",
  },
  actions: [
    {
      en: "Mild, localized, resolving symptoms are usually not dangerous, but they can be an early signal.",
      zh: "轻微、局部、正在消退的症状通常并不危险，但可能是一个早期信号。",
    },
    {
      en: "Pause this allergen and mention it at (or before) your next pediatrician contact.",
      zh: "先暂停这种过敏原，并在下次联系儿科医生时（或提前）提及。",
    },
    {
      en: "Watch for anything more with the next feeds; photograph any rash.",
      zh: "接下来几次喂食注意观察有没有更多症状；如有皮疹请拍照留存。",
    },
  ],
};

const EDUCATE_COPY: TriageCopy = {
  headline: {
    en: "That's normal — not an allergic reaction.",
    zh: "这是正常现象——不是过敏反应。",
  },
  actions: [
    {
      en: "Gagging is a protective reflex that moves food forward — noisy and red-faced is normal; silent and unable to cry is choking (see the Safety guide).",
      zh: "干呕是把食物往前推的保护性反射——有声音、憋红脸是正常的；无声且哭不出来才是窒息（见安全指南）。",
    },
    {
      en: "Redness only where acidic food (tomato, citrus, strawberry) touched the skin is contact irritation, not an allergy.",
      zh: "只在酸性食物（番茄、柑橘、草莓）接触到皮肤的地方发红，是接触性刺激，不是过敏。",
    },
    {
      en: "No need to pause the food; a smear of barrier cream around the mouth prevents contact redness.",
      zh: "不需要暂停这种食物；在嘴巴周围薄薄涂一层隔离霜就能预防接触性发红。",
    },
  ],
};

function resolve(
  severity: TriageSeverity,
  copy: TriageCopy,
  pausesAllergen: boolean,
  locale: Locale,
): TriageResult {
  return {
    severity,
    headline: copy.headline[locale],
    actions: copy.actions.map((a) => a[locale]),
    pausesAllergen,
  };
}

export function triage(symptoms: SymptomId[], locale: Locale = "en"): TriageResult {
  const has = (id: SymptomId) => symptoms.includes(id);

  // Emergency: any single red-flag sign, or widespread hives WITH vomiting.
  if (
    EMERGENCY.some(has) ||
    (has("hives-widespread") && (has("vomiting-shortly-after") || has("vomiting-delayed-1-4h")))
  ) {
    return resolve("emergency", EMERGENCY_COPY, true, locale);
  }

  // FPIES pattern: profuse delayed vomiting without the acute red flags above.
  if (has("vomiting-delayed-1-4h")) {
    return resolve("fpies-pattern", FPIES_COPY, true, locale);
  }

  if (SAME_DAY.some(has)) {
    return resolve("same-day", SAME_DAY_COPY, true, locale);
  }

  if (MONITOR.some(has)) {
    return resolve("monitor", MONITOR_COPY, true, locale);
  }

  if (symptoms.includes("gagging-only") || symptoms.includes("contact-redness-acidic")) {
    return resolve("educate", EDUCATE_COPY, false, locale);
  }

  return {
    severity: "none",
    headline: "",
    actions: [],
    pausesAllergen: false,
  };
}
