import type { AgeBand, AllergenId, Food, FoodCategory } from "@/content-schema/food";
import { ALLERGEN_IDS } from "@/content-schema/food";
import { correctedAgeMonths, daysBetween } from "@/lib/age";
import type { Locale, Msg } from "@/lib/i18n/config";
import { msg } from "@/lib/i18n/config";
import { allergenLabel, bandLabel, categoryLabel } from "@/lib/i18n/labels";
import { triage } from "@/lib/triage";
import type {
  AllergenOverride,
  AllergenStatus,
  BabyProfile,
  ExposureLog,
  Plan,
  TextureStage,
} from "@/lib/storage/types";
import { TEXTURE_STAGES } from "@/lib/storage/types";

/**
 * Recommendation engine (ROADMAP §7). Pure: no I/O, no Date.now() — the
 * clock is injected via `today`. Same input ⇒ same output (tie-breaks are
 * fully specified in R9).
 */

// ——— Tunables (rule constants; each is exercised by a test) ———
export const READY_MONTHS = 6;
export const EARLY_START_MONTHS = 4;
export const IRON_DISTINCT_TARGET = 5; // R1
export const IRON_EXPOSURE_TARGET = 12; // R1
export const ALLERGEN_SUCCESS_DAYS = 3; // R2: successful solid days before first allergen
export const ALLERGEN_COOLDOWN_DAYS = 3; // R2: days between new allergens
export const MAINTENANCE_NUDGE_DAYS = 5; // R3
export const MAINTENANCE_WARN_DAYS = 14; // R3
export const RETRY_MIN_DAYS = 3; // R6
export const RETRY_MAX_ATTEMPTS = 15; // R6
export const IRON_BONUS = 2.0; // R1
export const ALLERGEN_BONUS = 1.5; // R2
export const PLAN_BONUS = 1.25; // R10
export const VARIETY_BONUS = 1.0; // R5
export const RETRY_BONUS = 0.8; // R6

export const DEFAULT_ALLERGEN_ORDER: AllergenId[] = [
  "peanut",
  "egg",
  "milk",
  "wheat",
  "soy",
  "sesame",
  "tree-nut",
  "fish",
  "shellfish",
];

/**
 * Age used for food eligibility. A pediatrician-guided early start
 * (earlyStartApproved, 4–6 months corrected) unlocks the 6-month starter
 * foods: the pediatrician's program supersedes our floor, and the first
 * prep band on every food is already the smooth texture an early starter
 * needs. Under 4 months nothing is clamped — that gate is hard.
 */
export function eligibilityAgeMonths(baby: BabyProfile, today: Date): number {
  const age = correctedAgeMonths(baby, today);
  if (
    baby.readiness.earlyStartApproved === true &&
    age >= EARLY_START_MONTHS &&
    age < READY_MONTHS
  ) {
    return READY_MONTHS;
  }
  return age;
}

export type EngineInput = {
  baby: BabyProfile;
  logs: ExposureLog[];
  overrides: AllergenOverride[];
  foods: Food[];
  today: Date;
  /** Optional 12-week plan (Phase 11) — reorders allergens and boosts planned foods (R10). */
  plan?: Plan | null;
};

/**
 * Deterministic string hash for the R12 day rotation: FNV-1a plus a final
 * avalanche. (djb2 is affine per appended character, so strings sharing a
 * suffix keep their relative order — no rotation. The avalanche fixes that.)
 */
function dayHash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  h ^= h >>> 15;
  h = Math.imul(h, 2246822519);
  h ^= h >>> 13;
  h = Math.imul(h, 3266489917);
  h ^= h >>> 16;
  return h >>> 0;
}

/** Allergen order implied by a plan: first-appearance week, ties broken by the default order. */
export function allergenOrderFromPlan(plan: Plan, foods: Food[]): AllergenId[] {
  const allergenOfFood = new Map(foods.map((f) => [f.slug, f.commonAllergen]));
  const firstWeek = new Map<AllergenId, number>();
  for (const entry of plan.entries) {
    const allergen = allergenOfFood.get(entry.foodSlug);
    if (!allergen) continue;
    const prev = firstWeek.get(allergen);
    if (prev === undefined || entry.weekIndex < prev) firstWeek.set(allergen, entry.weekIndex);
  }
  const planned = [...firstWeek.entries()].sort(
    (a, b) =>
      a[1] - b[1] ||
      DEFAULT_ALLERGEN_ORDER.indexOf(a[0]) - DEFAULT_ALLERGEN_ORDER.indexOf(b[0]),
  );
  const rest = DEFAULT_ALLERGEN_ORDER.filter((id) => !firstWeek.has(id));
  return [...planned.map(([id]) => id), ...rest];
}

/** Which plan week `today` falls in (negative before the anchor week). */
export function planWeekIndex(plan: Plan, today: Date): number {
  return Math.floor(daysBetween(plan.anchorMonday, today) / 7);
}

export type ScoredFood = {
  slug: string;
  name: string;
  score: number;
  reason: string;
  suggestedBand: AgeBand;
};

export type Warning = {
  kind: "symptom-hold" | "hard-block" | "maintenance-lapse" | "food-hold" | "early-start";
  message: string;
  allergenId?: AllergenId;
  foodSlug?: string;
};

export type AllergenPlanItem = {
  allergenId: AllergenId;
  foodSlugs: string[];
  gated: boolean;
  gateReason?: string;
  guidance: string;
};

export type MaintenanceNudge = {
  allergenId: AllergenId;
  daysSince: number;
  message: string;
  urgent: boolean;
};

export type AllergenStateView = {
  allergenId: AllergenId;
  status: AllergenStatus;
  exposureCount: number;
  lastExposureDate?: string;
};

export type Recommendation = {
  gate: "not-ready" | "ready";
  gateReasons: string[];
  todaysPicks: ScoredFood[];
  allergenRail: { next: AllergenPlanItem | null; maintenance: MaintenanceNudge[] };
  allergenStates: AllergenStateView[];
  textureStage: { current: TextureStage; nudge?: string };
  retryQueue: ScoredFood[];
  warnings: Warning[];
};

// ——— Derivation helpers ———

type FoodStats = {
  attempts: number;
  exposures: number; // attempts where something was eaten
  lastDate?: string;
  lastEnjoyment?: ExposureLog["enjoyment"];
  hasPausingSymptoms: boolean;
};

export function deriveFoodStats(logs: ExposureLog[]): Map<string, FoodStats> {
  const stats = new Map<string, FoodStats>();
  const sorted = [...logs].sort((a, b) => a.date.localeCompare(b.date));
  for (const log of sorted) {
    const s = stats.get(log.foodSlug) ?? {
      attempts: 0,
      exposures: 0,
      hasPausingSymptoms: false,
    };
    s.attempts += 1;
    if (log.amountEaten !== "none") s.exposures += 1;
    s.lastDate = log.date;
    s.lastEnjoyment = log.enjoyment;
    if (triage(log.symptoms).pausesAllergen) s.hasPausingSymptoms = true;
    stats.set(log.foodSlug, s);
  }
  return stats;
}

export function deriveAllergenStates(input: {
  baby: BabyProfile;
  logs: ExposureLog[];
  overrides: AllergenOverride[];
  foods: Food[];
}): Map<AllergenId, AllergenStateView & { firstExposureDate?: string }> {
  const { baby, logs, overrides, foods } = input;
  const allergenOfFood = new Map(foods.map((f) => [f.slug, f.commonAllergen]));
  const result = new Map<AllergenId, AllergenStateView & { firstExposureDate?: string }>();

  for (const id of ALLERGEN_IDS) {
    result.set(id, { allergenId: id, status: "not-started", exposureCount: 0 });
  }

  const sorted = [...logs].sort((a, b) => a.date.localeCompare(b.date));
  for (const log of sorted) {
    const allergen = allergenOfFood.get(log.foodSlug);
    if (!allergen) continue;
    const state = result.get(allergen)!;
    if (log.amountEaten !== "none") {
      state.exposureCount += 1;
      state.firstExposureDate ??= log.date;
      state.lastExposureDate = log.date;
    }
    if (triage(log.symptoms).pausesAllergen) state.status = "reacted-paused";
  }

  for (const id of ALLERGEN_IDS) {
    const state = result.get(id)!;
    if (state.status !== "reacted-paused") {
      state.status =
        state.exposureCount === 0
          ? "not-started"
          : state.exposureCount < 3
            ? "introducing"
            : "maintaining";
    }
    if (baby.knownAllergies.includes(id)) state.status = "avoid-per-doctor";
  }

  // Explicit user/doctor overrides win over derived state.
  for (const o of overrides) {
    const state = result.get(o.allergenId)!;
    state.status = o.status;
  }

  return result;
}

function bandForAge(food: Food, ageMonths: number): AgeBand {
  const preferred: AgeBand = ageMonths < 9 ? "6-8m" : ageMonths < 12 ? "9-12m" : "12-24m";
  if (food.prepSpecs.some((p) => p.band === preferred)) return preferred;
  return food.prepSpecs[0].band;
}

function isoDay(d: Date): string {
  return d.toISOString().slice(0, 10);
}

/** NIAID risk tier (ROADMAP §8.2). */
export function riskTier(baby: BabyProfile): "high" | "moderate" | "low" {
  if (baby.allergyRisk.eczema === "severe" || baby.allergyRisk.existingFoodAllergy) return "high";
  if (baby.allergyRisk.eczema === "mild-moderate") return "moderate";
  return "low";
}

// ——— Localized copy ———
// The `en` strings are pinned by unit and e2e tests — keep them byte-for-byte.
// English deliberately interpolates the raw allergen/category/band ids (that is
// what the tests match); zh swaps in the localized labels instead.

const zhAllergen = (id: AllergenId) => allergenLabel(id, "zh");

const TEXTURE_STAGE_ZH: Record<TextureStage, { label: string; typicalAge: string }> = {
  S1: { label: "细腻泥糊＋可抓握的软条", typicalAge: "约6–7个月" },
  S2: { label: "带小颗粒的泥＋一口大小的软块", typicalAge: "约8–9个月" },
  S3: { label: "切碎的软质家常食物", typicalAge: "约10–12个月" },
  S4: { label: "安全切分的家庭餐", typicalAge: "12个月以上" },
};

const COPY = {
  gateUnderFour: {
    en: "Most babies are ready around 6 months (corrected age), and even pediatrician-guided programs wait until at least 4 months. It's early yet — watch for the readiness signs.",
    zh: "大多数宝宝在6个月左右（按矫正月龄）才准备好吃辅食，即使是儿科医生指导的方案也至少要等到4个月。现在还早——先留意宝宝的准备信号吧。",
  },
  gateFourToSix: {
    en: "Between 4 and 6 months, start solids only if your pediatrician specifically advised it — if they have, tell us below and you can start today.",
    zh: "4到6个月之间，只有在儿科医生明确建议的情况下才开始添加辅食——如果医生已经建议了，请在下方告诉我们，今天就可以开始。",
  },
  gateConfirmSigns: {
    en: "Confirm the readiness signs first: sits with minimal support, steady head control, brings objects to the mouth, shows interest in food, and the tongue-thrust reflex has faded.",
    zh: "请先确认宝宝的准备信号：几乎不用支撑就能坐稳、头部控制稳定、会把东西送到嘴边、对食物表现出兴趣，而且吐舌反射已经消退。",
  },
  warnEarlyStart: (beforeSix: boolean): Msg => ({
    en:
      "You're starting on your pediatrician's guidance" +
      (beforeSix ? " before 6 months" : "") +
      ". Stick to smooth, thin textures (the first prep option on each food page) and let their advice override anything suggested here.",
    zh:
      (beforeSix
        ? "你们是在儿科医生的指导下、不满6个月就开始添加辅食的。"
        : "你们是在儿科医生的指导下开始添加辅食的。") +
      "请坚持使用细腻稀薄的质地（每个食物页面的第一个制作方式），一切以医生的建议为准，优先于这里的任何推荐。",
  }),
  exclTooYoung: (minMonths: number): Msg => ({
    en: `Not before ${minMonths} months (corrected age).`,
    zh: `未满${minMonths}个月（矫正月龄）不建议尝试。`,
  }),
  exclAllergenPaused: (id: AllergenId): Msg => ({
    en: `Paused: the ${id} group is on hold after a logged reaction or per medical advice.`,
    zh: `已暂停：${zhAllergen(id)}类食物因记录到反应或遵医嘱而暂缓。`,
  }),
  exclDoctorAvoid: {
    en: "On your doctor-avoid list.",
    zh: "在医生建议避免的清单上。",
  },
  exclFoodHold: {
    en: "On hold: symptoms were logged with this food — check with your pediatrician.",
    zh: "暂缓中：这种食物曾记录到症状——请咨询儿科医生。",
  },
  warnFoodHold: (name: string): Msg => ({
    en: `${name} is on hold after logged symptoms. Discuss with your pediatrician before re-offering.`,
    zh: `${name}因记录到症状而暂缓。再次提供前，请先与儿科医生讨论。`,
  }),
  warnAvoidPerDoctor: (id: AllergenId): Msg => ({
    en: `The ${id} group is excluded (known allergy / medical advice).`,
    zh: `${zhAllergen(id)}类食物已排除（已知过敏／遵医嘱）。`,
  }),
  warnReactionPaused: (id: AllergenId): Msg => ({
    en: `The ${id} group is paused after a logged reaction. See the reaction playbook, and clear it only after talking to your pediatrician.`,
    zh: `${zhAllergen(id)}类食物在记录到反应后已暂停。请查看反应应对指南，并且只有在与儿科医生沟通后再解除暂停。`,
  }),
  peanutGateReason: {
    en: "Severe eczema or an existing food allergy puts your baby in the higher-risk group for peanut allergy. Talk to your pediatrician or allergist before introducing peanut — they may recommend testing or a supervised first exposure, ideally around 4–6 months. Once they clear you, confirm it in the allergen tracker.",
    zh: "重度湿疹或已有食物过敏，意味着宝宝属于花生过敏的较高风险人群。引入花生前，请先咨询儿科医生或过敏专科医生——他们可能会建议先做检测，或在监护下进行首次尝试，最好在4–6个月左右。医生确认可以后，请在过敏原追踪中确认。",
  },
  peanutGateGuidance: {
    en: "Talk to your pediatrician first, then confirm clearance in the tracker.",
    zh: "请先咨询儿科医生，再在追踪页确认已获许可。",
  },
  allergenGuidance: {
    en: "Serve early in the day so you can watch for a reaction for the next 2 hours, alongside familiar foods — never with another brand-new food.",
    zh: "请在一天较早的时候提供，方便在接下来的2小时里观察有无反应；搭配熟悉的食物一起吃——绝不要和另一种全新食物同时尝试。",
  },
  gateNeedSmoothDays: (days: number, id: AllergenId): Msg => ({
    en: `Get ${days} smooth days of solids in first, then start ${id}.`,
    zh: `先顺利吃满${days}天辅食，再开始尝试${zhAllergen(id)}。`,
  }),
  gateResolveReaction: {
    en: "Resolve the paused reaction before starting a new allergen.",
    zh: "请先处理已暂停的反应，再开始新的过敏原。",
  },
  gateCooldown: (days: number, id: AllergenId): Msg => ({
    en: `Wait ${days} more day(s) after the last new allergen before starting ${id}.`,
    zh: `距离上一种新过敏原还需再等${days}天，之后再开始尝试${zhAllergen(id)}。`,
  }),
  maintUrgent: (id: AllergenId, days: number): Msg => ({
    en: `It's been ${days} days since ${id}. Consistent ongoing exposure (about twice a week) is what maintains tolerance — get it back in the rotation soon.`,
    zh: `距离上次吃${zhAllergen(id)}已经${days}天了。持续规律地接触（大约每周两次）才能维持耐受——尽快让它回到日常轮换中吧。`,
  }),
  warnMaintLapse: (id: AllergenId, days: number): Msg => ({
    en: `${id} hasn't been served in ${days} days — long gaps can undo the benefit of early introduction.`,
    zh: `${zhAllergen(id)}已经${days}天没有提供了——间隔太久可能会抵消早期引入的益处。`,
  }),
  maintNudge: (id: AllergenId, days: number): Msg => ({
    en: `Keep ${id} in the rotation — aim for about twice a week (last served ${days} days ago).`,
    zh: `让${zhAllergen(id)}保持在日常轮换中——目标是大约每周两次（上次提供是${days}天前）。`,
  }),
  retryReason: (attempts: number, pairing: string | undefined): Msg => ({
    en: `Refused ${attempts} time(s) so far — normal! Try a different prep or pair it with ${pairing ?? "a favorite"}. It can take 8–15 tries.`,
    zh: `到目前为止已拒绝${attempts}次——很正常！试试换一种做法，或和${pairing ?? "宝宝爱吃的食物"}搭配。接受一种新食物可能需要8–15次尝试。`,
  }),
  reasonGoodFit: (band: AgeBand): Msg => ({
    en: `A good fit for ${band} right now.`,
    zh: `现在正适合${bandLabel(band, "zh")}这个阶段。`,
  }),
  reasonVariety: (category: FoodCategory): Msg => ({
    en: `Nothing from the ${category} group this week — variety builds acceptance.`,
    zh: `这周还没吃过${categoryLabel(category, "zh")}类——多样化有助于宝宝接受新食物。`,
  }),
  reasonAllergen: (id: AllergenId): Msg => ({
    en: `Time to introduce ${id}: serve early in the day and watch for 2 hours.`,
    zh: `该引入${zhAllergen(id)}了：请在一天较早时提供，并观察2小时。`,
  }),
  reasonIron: {
    en: "Iron stores dip around 6 months — iron-rich foods are the priority.",
    zh: "宝宝的铁储备在6个月左右开始下降——富含铁的食物是当前的重点。",
  },
  reasonPlanned: {
    en: "On your plan for this week.",
    zh: "在你本周的计划里。",
  },
  reasonPinned: (attempts: number, name: string): Msg => ({
    en: `Offered ${attempts} time(s) — keep ${name.toLowerCase()} going for 2–3 days while you watch, before adding the next new food.`,
    zh: `已提供${attempts}次——继续让宝宝吃${name}并观察2–3天，再添加下一种新食物。`,
  }),
  textureNudge: (count: number, next: (typeof TEXTURE_STAGES)[number]): Msg => ({
    en: `Ready for the next texture? The last ${count} logs show confident eating. Consider moving to ${next.id}: ${next.label.toLowerCase()} (${next.typicalAge}). You confirm the switch — the app never auto-advances.`,
    zh: `准备好进入下一个质地阶段了吗？最近${count}条记录显示宝宝吃得很有信心。可以考虑进入${next.id}：${TEXTURE_STAGE_ZH[next.id].label}（${TEXTURE_STAGE_ZH[next.id].typicalAge}）。是否切换由你来确认——应用绝不会自动升级。`,
  }),
};

// ——— The engine ———

export function recommend(input: EngineInput, locale: Locale = "en"): Recommendation {
  const t = (m: Msg) => msg(m, locale);
  const { baby, logs, overrides, foods, today, plan } = input;
  const age = correctedAgeMonths(baby, today);
  const stats = deriveFoodStats(logs);
  const allergenStates = deriveAllergenStates({ baby, logs, overrides, foods });
  const warnings: Warning[] = [];

  // R0 — readiness gate. Pediatrician guidance supersedes both the 6-month
  // default and the readiness checklist (many supervised programs start at
  // 4 months, before all the classic signs appear). Under 4 months stays a
  // hard floor — no supervised program starts earlier.
  const pediatricianGuided = baby.readiness.earlyStartApproved === true;
  const gateReasons: string[] = [];
  if (age < EARLY_START_MONTHS) {
    gateReasons.push(t(COPY.gateUnderFour));
  } else if (!pediatricianGuided) {
    if (age < READY_MONTHS) {
      gateReasons.push(t(COPY.gateFourToSix));
    }
    if (!baby.readiness.confirmedAt) {
      gateReasons.push(t(COPY.gateConfirmSigns));
    }
  }
  if (gateReasons.length > 0) {
    return {
      gate: "not-ready",
      gateReasons,
      todaysPicks: [],
      allergenRail: { next: null, maintenance: [] },
      allergenStates: [...allergenStates.values()],
      textureStage: { current: baby.textureStage },
      retryQueue: [],
      warnings,
    };
  }

  // A pediatrician-guided early starter (4–6 months) is deliberately on the
  // program before our 6-month food floor, so eligibility uses the clamped
  // age — every food's first prep band is already the smooth purée/mash an
  // early starter needs. Surface the caveat once instead of gating.
  const eligibilityAge = eligibilityAgeMonths(baby, today);
  if (pediatricianGuided && (age < READY_MONTHS || !baby.readiness.confirmedAt)) {
    warnings.push({
      kind: "early-start",
      message: t(COPY.warnEarlyStart(age < READY_MONTHS)),
    });
  }

  // ——— Exclusions (R7, R8) ———
  const excludedSlugs = new Map<string, string>(); // slug → reason
  const pausedAllergens = new Set<AllergenId>();
  for (const [id, state] of allergenStates) {
    if (state.status === "reacted-paused" || state.status === "avoid-per-doctor") {
      pausedAllergens.add(id);
    }
  }

  for (const food of foods) {
    if (eligibilityAge < food.minAgeMonths) {
      excludedSlugs.set(food.slug, t(COPY.exclTooYoung(food.minAgeMonths)));
      continue;
    }
    if (food.commonAllergen && pausedAllergens.has(food.commonAllergen)) {
      excludedSlugs.set(food.slug, t(COPY.exclAllergenPaused(food.commonAllergen)));
      continue;
    }
    if (baby.doctorAvoidList.includes(food.slug)) {
      excludedSlugs.set(food.slug, t(COPY.exclDoctorAvoid));
      continue;
    }
    const s = stats.get(food.slug);
    if (s?.hasPausingSymptoms && !food.commonAllergen) {
      excludedSlugs.set(food.slug, t(COPY.exclFoodHold));
      warnings.push({
        kind: "food-hold",
        foodSlug: food.slug,
        message: t(COPY.warnFoodHold(food.name)),
      });
    }
  }

  for (const id of pausedAllergens) {
    const state = allergenStates.get(id)!;
    warnings.push({
      kind: "symptom-hold",
      allergenId: id,
      message:
        state.status === "avoid-per-doctor"
          ? t(COPY.warnAvoidPerDoctor(id))
          : t(COPY.warnReactionPaused(id)),
    });
  }

  // ——— R2: next allergen ———
  const successfulDays = new Set(
    logs.filter((l) => l.amountEaten !== "none" && !triage(l.symptoms).pausesAllergen).map((l) => l.date),
  ).size;

  // Plan-derived order wins when a plan exists; then the user's manual order.
  const order =
    plan && plan.entries.length > 0
      ? allergenOrderFromPlan(plan, foods)
      : (baby.allergenOrder ?? DEFAULT_ALLERGEN_ORDER);
  const lastNewAllergenFirstExposure = [...allergenStates.values()]
    .map((s) => (s as { firstExposureDate?: string }).firstExposureDate)
    .filter((d): d is string => !!d)
    .sort()
    .at(-1);
  const daysSinceNewAllergen = lastNewAllergenFirstExposure
    ? daysBetween(lastNewAllergenFirstExposure, today)
    : Infinity;

  const tier = riskTier(baby);
  let next: AllergenPlanItem | null = null;
  const anyUnresolvedSymptoms = [...allergenStates.values()].some((s) => s.status === "reacted-paused");

  const nextCandidate = order.find((id) => allergenStates.get(id)!.status === "not-started");
  if (nextCandidate) {
    const candidateFoods = foods
      .filter((f) => f.commonAllergen === nextCandidate && !excludedSlugs.has(f.slug))
      .map((f) => f.slug)
      .sort();
    const gatedByRisk =
      tier === "high" && nextCandidate === "peanut" && !baby.doctorClearances.includes("peanut");
    if (gatedByRisk) {
      next = {
        allergenId: "peanut",
        foodSlugs: [],
        gated: true,
        gateReason: t(COPY.peanutGateReason),
        guidance: t(COPY.peanutGateGuidance),
      };
    } else if (
      successfulDays >= ALLERGEN_SUCCESS_DAYS &&
      !anyUnresolvedSymptoms &&
      daysSinceNewAllergen >= ALLERGEN_COOLDOWN_DAYS &&
      candidateFoods.length > 0
    ) {
      next = {
        allergenId: nextCandidate,
        foodSlugs: candidateFoods,
        gated: false,
        guidance: t(COPY.allergenGuidance),
      };
    } else if (candidateFoods.length > 0 || successfulDays < ALLERGEN_SUCCESS_DAYS) {
      const why =
        successfulDays < ALLERGEN_SUCCESS_DAYS
          ? t(COPY.gateNeedSmoothDays(ALLERGEN_SUCCESS_DAYS, nextCandidate))
          : anyUnresolvedSymptoms
            ? t(COPY.gateResolveReaction)
            : t(
                COPY.gateCooldown(
                  Math.ceil(ALLERGEN_COOLDOWN_DAYS - daysSinceNewAllergen),
                  nextCandidate,
                ),
              );
      next = {
        allergenId: nextCandidate,
        foodSlugs: [],
        gated: true,
        gateReason: why,
        guidance: why,
      };
    }
  }

  // ——— R3: maintenance nudges ———
  const maintenance: MaintenanceNudge[] = [];
  for (const [id, state] of allergenStates) {
    if (state.status !== "maintaining" || !state.lastExposureDate) continue;
    const days = Math.floor(daysBetween(state.lastExposureDate, today));
    if (days > MAINTENANCE_WARN_DAYS) {
      maintenance.push({
        allergenId: id,
        daysSince: days,
        urgent: true,
        message: t(COPY.maintUrgent(id, days)),
      });
      warnings.push({
        kind: "maintenance-lapse",
        allergenId: id,
        message: t(COPY.warnMaintLapse(id, days)),
      });
    } else if (days > MAINTENANCE_NUDGE_DAYS) {
      maintenance.push({
        allergenId: id,
        daysSince: days,
        urgent: false,
        message: t(COPY.maintNudge(id, days)),
      });
    }
  }
  maintenance.sort((a, b) => b.daysSince - a.daysSince || a.allergenId.localeCompare(b.allergenId));

  // ——— R1 iron pressure ———
  const ironFoods = foods.filter((f) => f.ironRich);
  const ironDistinct = ironFoods.filter((f) => (stats.get(f.slug)?.exposures ?? 0) > 0).length;
  const ironExposures = ironFoods.reduce((n, f) => n + (stats.get(f.slug)?.exposures ?? 0), 0);
  const ironPressure = ironDistinct < IRON_DISTINCT_TARGET || ironExposures < IRON_EXPOSURE_TARGET;

  // ——— R5 variety pressure ———
  const recentCutoff = isoDay(new Date(today.getTime() - 7 * 86400000));
  const recentCategories = new Set(
    logs
      .filter((l) => l.date >= recentCutoff)
      .map((l) => foods.find((f) => f.slug === l.foodSlug)?.category)
      .filter(Boolean),
  );

  // ——— R6 retry queue ———
  const retryQueue: ScoredFood[] = [];
  for (const food of foods) {
    if (excludedSlugs.has(food.slug)) continue;
    const s = stats.get(food.slug);
    if (!s?.lastDate) continue;
    if (s.lastEnjoyment !== "refused" && s.lastEnjoyment !== "disliked") continue;
    if (s.attempts >= RETRY_MAX_ATTEMPTS) continue;
    if (daysBetween(s.lastDate, today) < RETRY_MIN_DAYS) continue;
    retryQueue.push({
      slug: food.slug,
      name: food.name,
      score: RETRY_BONUS,
      suggestedBand: bandForAge(food, age),
      reason: t(COPY.retryReason(s.attempts, food.flavorPairings[0])),
    });
  }
  retryQueue.sort(
    (a, b) => (stats.get(a.slug)!.attempts - stats.get(b.slug)!.attempts) || a.slug.localeCompare(b.slug),
  );

  // ——— R10: foods planned for the current week ———
  const currentWeek = plan && plan.entries.length > 0 ? planWeekIndex(plan, today) : null;
  const plannedThisWeek = new Set(
    currentWeek === null
      ? []
      : plan!.entries.filter((e) => e.weekIndex === currentWeek).map((e) => e.foodSlug),
  );

  // ——— R9 scoring ———
  const eligibleNextAllergen = next && !next.gated ? next.allergenId : null;
  const scored: ScoredFood[] = [];
  for (const food of foods) {
    if (excludedSlugs.has(food.slug)) continue;
    // New-allergen foods live on the allergen rail until their allergen is eligible.
    const state = food.commonAllergen ? allergenStates.get(food.commonAllergen)! : null;
    if (state && state.status === "not-started" && food.commonAllergen !== eligibleNextAllergen) continue;

    let score = 1.0;
    let reason = t(COPY.reasonGoodFit(bandForAge(food, age)));
    if (!recentCategories.has(food.category)) {
      score += VARIETY_BONUS;
      reason = t(COPY.reasonVariety(food.category));
    }
    const s = stats.get(food.slug);
    if (
      s?.lastDate &&
      (s.lastEnjoyment === "refused" || s.lastEnjoyment === "disliked") &&
      daysBetween(s.lastDate, today) >= RETRY_MIN_DAYS &&
      s.attempts < RETRY_MAX_ATTEMPTS
    ) {
      score += RETRY_BONUS;
    }
    if (food.commonAllergen && food.commonAllergen === eligibleNextAllergen) {
      score += ALLERGEN_BONUS;
      reason = t(COPY.reasonAllergen(food.commonAllergen));
    }
    if (food.ironRich && ironPressure) {
      score += IRON_BONUS;
      reason = t(COPY.reasonIron);
    }
    // R10 last: when a food is both planned and otherwise prioritized, the
    // user's own plan is the clearest reason to surface.
    if (plannedThisWeek.has(food.slug)) {
      score += PLAN_BONUS;
      reason = t(COPY.reasonPlanned);
    }
    scored.push({
      slug: food.slug,
      name: food.name,
      score,
      reason,
      suggestedBand: bandForAge(food, age),
    });
  }
  // ——— R12: day-keyed rotation ———
  // The final tie-break hashes slug + calendar day instead of plain slug
  // order, so equal-priority foods rotate day to day (no seven identical
  // days in a row) while staying fully deterministic for a given date.
  const dayKey = isoDay(today);
  const isFirstPick = new Map(foods.map((f) => [f.slug, f.firstFoodPick]));
  scored.sort(
    (a, b) =>
      b.score - a.score ||
      (stats.get(a.slug)?.exposures ?? 0) - (stats.get(b.slug)?.exposures ?? 0) ||
      Number(isFirstPick.get(b.slug) ?? false) - Number(isFirstPick.get(a.slug) ?? false) ||
      dayHash(`${dayKey}:${a.slug}`) - dayHash(`${dayKey}:${b.slug}`) ||
      a.slug.localeCompare(b.slug),
  );

  // ——— R11: gentle start ———
  // One food at a time until introductions accumulate: 0 foods introduced →
  // 1 pick, 1–2 → 2 picks, 3+ → the full 3. While ramping, the food most
  // recently eaten (within 3 days, not on hold) is pinned first — repeat it
  // a couple of days while watching before adding the next.
  const distinctIntroduced = new Set(logs.map((l) => l.foodSlug)).size;
  const pickCount = distinctIntroduced === 0 ? 1 : distinctIntroduced <= 2 ? 2 : 3;
  let todaysPicks = scored.slice(0, pickCount);
  if (distinctIntroduced >= 1 && distinctIntroduced <= 2) {
    const lastEaten = [...logs]
      .filter((l) => l.amountEaten !== "none")
      .sort((a, b) => b.date.localeCompare(a.date))[0];
    const pinFood = lastEaten ? foods.find((f) => f.slug === lastEaten.foodSlug) : undefined;
    if (
      lastEaten &&
      pinFood &&
      !excludedSlugs.has(pinFood.slug) &&
      daysBetween(lastEaten.date, today) <= 3
    ) {
      const attempts = stats.get(pinFood.slug)?.attempts ?? 1;
      const pinned: ScoredFood = {
        slug: pinFood.slug,
        name: pinFood.name,
        score: scored.find((s) => s.slug === pinFood.slug)?.score ?? 1,
        suggestedBand: bandForAge(pinFood, age),
        reason: t(COPY.reasonPinned(attempts, pinFood.name)),
      };
      todaysPicks = [pinned, ...scored.filter((s) => s.slug !== pinFood.slug)].slice(0, pickCount);
    }
  }

  // ——— R4 texture progression ———
  const stageIdx = TEXTURE_STAGES.findIndex((s) => s.id === baby.textureStage);
  const nextStage = TEXTURE_STAGES[stageIdx + 1];
  let nudge: string | undefined;
  if (nextStage && age >= nextStage.minAgeMonths) {
    const recent = [...logs].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 10);
    const ateWell = recent.filter((l) => l.amountEaten === "some" || l.amountEaten === "lots").length;
    const gaggingCount = recent.filter((l) => l.gagging).length;
    const noSymptoms = recent.every((l) => !triage(l.symptoms).pausesAllergen);
    if (recent.length >= 10 && ateWell >= 8 && gaggingCount <= 2 && noSymptoms) {
      nudge = t(COPY.textureNudge(recent.length, nextStage));
    }
  }

  return {
    gate: "ready",
    gateReasons: [],
    todaysPicks,
    allergenRail: { next, maintenance },
    allergenStates: [...allergenStates.values()].map(({ allergenId, status, exposureCount, lastExposureDate }) => ({
      allergenId,
      status,
      exposureCount,
      lastExposureDate,
    })),
    textureStage: { current: baby.textureStage, nudge },
    retryQueue: retryQueue.slice(0, 5),
    warnings,
  };
}
