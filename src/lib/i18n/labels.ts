import type { AgeBand, AllergenId, Food, FoodCategory, NutrientTag } from "@/content-schema/food";
import type { RecipeMethod } from "@/content-schema/recipe";
import type { SymptomId, TextureStage } from "@/lib/storage/types";
import type { Locale, Msg } from "./config";

/**
 * Localized labels for content enums. The English strings mirror the
 * canonical maps in src/lib/food-utils.ts (which stay for en-only callers);
 * locale-aware surfaces should use these helpers instead.
 */

export const ALLERGEN_MSGS: Record<AllergenId, Msg> = {
  peanut: { en: "Peanut", zh: "花生" },
  egg: { en: "Egg", zh: "鸡蛋" },
  milk: { en: "Milk (dairy)", zh: "牛奶（乳制品）" },
  wheat: { en: "Wheat", zh: "小麦" },
  soy: { en: "Soy", zh: "大豆" },
  sesame: { en: "Sesame", zh: "芝麻" },
  "tree-nut": { en: "Tree nuts", zh: "坚果" },
  fish: { en: "Fish", zh: "鱼类" },
  shellfish: { en: "Shellfish", zh: "甲壳类海鲜" },
};

export const CATEGORY_MSGS: Record<FoodCategory, Msg> = {
  vegetable: { en: "Vegetables", zh: "蔬菜" },
  fruit: { en: "Fruits", zh: "水果" },
  protein: { en: "Proteins", zh: "蛋白质" },
  grain: { en: "Grains", zh: "谷物" },
  dairy: { en: "Dairy", zh: "乳制品" },
  legume: { en: "Legumes", zh: "豆类" },
  "herb-spice": { en: "Herbs & spices", zh: "香草与香料" },
  "fat-other": { en: "Fats & other", zh: "油脂及其他" },
};

export const NUTRIENT_MSGS: Record<NutrientTag, Msg> = {
  iron: { en: "Iron", zh: "铁" },
  zinc: { en: "Zinc", zh: "锌" },
  protein: { en: "Protein", zh: "蛋白质" },
  omega3: { en: "Omega-3", zh: "Omega-3" },
  vitaminA: { en: "Vitamin A", zh: "维生素A" },
  vitaminC: { en: "Vitamin C", zh: "维生素C" },
  vitaminD: { en: "Vitamin D", zh: "维生素D" },
  calcium: { en: "Calcium", zh: "钙" },
  folate: { en: "Folate", zh: "叶酸" },
  fiber: { en: "Fiber", zh: "膳食纤维" },
  healthyFats: { en: "Healthy fats", zh: "健康脂肪" },
  potassium: { en: "Potassium", zh: "钾" },
};

export const BAND_MSGS: Record<AgeBand, Msg> = {
  "6-8m": { en: "6–8 months", zh: "6–8个月" },
  "9-12m": { en: "9–12 months", zh: "9–12个月" },
  "12-24m": { en: "12–24 months", zh: "12–24个月" },
};

export const CHOKING_MSGS: Record<Food["chokingRisk"], Msg> = {
  low: { en: "Low choking risk", zh: "低窒息风险" },
  moderate: { en: "Moderate choking risk", zh: "中等窒息风险" },
  high: { en: "High choking risk", zh: "高窒息风险" },
};

export const METHOD_MSGS: Record<RecipeMethod, Msg> = {
  blend: { en: "Blend", zh: "搅打" },
  mash: { en: "Mash", zh: "压泥" },
  stir: { en: "Stir", zh: "拌匀" },
  assemble: { en: "Assemble", zh: "组合" },
  "freeze-cubes": { en: "Freeze into cubes", zh: "冷冻成块" },
};

/** Mirrors SYMPTOM_LABELS in src/lib/storage/types.ts (en byte-identical). */
export const SYMPTOM_MSGS: Record<SymptomId, Msg> = {
  "hives-few-near-mouth": { en: "A few hives near the mouth", zh: "嘴巴周围有少量荨麻疹" },
  "hives-widespread": { en: "Widespread hives (body/limbs)", zh: "大面积荨麻疹（躯干/四肢）" },
  "redness-resolving": { en: "Mild redness or rash that faded", zh: "轻微发红或皮疹，已自行消退" },
  "swelling-face": { en: "Swelling of the face or eyes", zh: "面部或眼部肿胀" },
  "swelling-tongue-lips-drooling": {
    en: "Swelling of tongue/lips, drooling, or trouble swallowing",
    zh: "舌头/嘴唇肿胀、流口水或吞咽困难",
  },
  "trouble-breathing": {
    en: "Trouble breathing, wheezing, or persistent cough",
    zh: "呼吸困难、喘息或持续咳嗽",
  },
  "vomiting-shortly-after": { en: "Vomiting shortly after eating", zh: "进食后不久呕吐" },
  "vomiting-repetitive": { en: "Repeated, forceful vomiting", zh: "反复剧烈呕吐" },
  "vomiting-delayed-1-4h": {
    en: "Profuse vomiting 1–4 hours after eating",
    zh: "进食后1–4小时大量呕吐",
  },
  "lethargy-floppy": {
    en: "Unusually pale, floppy, or hard to rouse",
    zh: "异常苍白、浑身发软或难以唤醒",
  },
  diarrhea: { en: "Diarrhea", zh: "腹泻" },
  "gagging-only": {
    en: "Gagging (worked it out on their own)",
    zh: "干呕（自己把食物弄出来了）",
  },
  "contact-redness-acidic": {
    en: "Red skin only where food touched (acidic food)",
    zh: "仅食物接触处皮肤发红（酸性食物）",
  },
};

/** Mirrors TEXTURE_STAGES in src/lib/storage/types.ts (en byte-identical). */
export const TEXTURE_STAGE_MSGS: Record<TextureStage, { label: Msg; typicalAge: Msg }> = {
  S1: {
    label: { en: "Smooth mash + soft graspable strips", zh: "细滑泥糊 + 易抓握的软条" },
    typicalAge: { en: "≈6–7 months", zh: "约6–7个月" },
  },
  S2: {
    label: { en: "Lumpy mash + soft bite-size pieces", zh: "带颗粒泥糊 + 一口大小的软块" },
    typicalAge: { en: "≈8–9 months", zh: "约8–9个月" },
  },
  S3: {
    label: { en: "Chopped soft table food", zh: "切碎的软质家常饭菜" },
    typicalAge: { en: "≈10–12 months", zh: "约10–12个月" },
  },
  S4: {
    label: { en: "Safely-cut family meals", zh: "安全切分的家庭餐食" },
    typicalAge: { en: "12 months +", zh: "12个月以上" },
  },
};

export const allergenLabel = (id: AllergenId, l: Locale) => ALLERGEN_MSGS[id][l];
export const categoryLabel = (c: FoodCategory, l: Locale) => CATEGORY_MSGS[c][l];
export const nutrientLabel = (n: NutrientTag, l: Locale) => NUTRIENT_MSGS[n][l];
export const bandLabel = (b: AgeBand, l: Locale) => BAND_MSGS[b][l];
export const chokingLabel = (r: Food["chokingRisk"], l: Locale) => CHOKING_MSGS[r][l];
export const methodLabel = (m: RecipeMethod, l: Locale) => METHOD_MSGS[m][l];
export const symptomLabel = (id: SymptomId, l: Locale) => SYMPTOM_MSGS[id][l];
export const textureStageLabel = (id: TextureStage, l: Locale) => TEXTURE_STAGE_MSGS[id].label[l];
export const textureStageTypicalAge = (id: TextureStage, l: Locale) =>
  TEXTURE_STAGE_MSGS[id].typicalAge[l];
