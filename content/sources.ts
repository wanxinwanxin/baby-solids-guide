import type { SourceRef } from "@/content-schema/food";

/**
 * Registry of verified free/authoritative sources (ROADMAP §3).
 * Every URL below was HTTP-verified on the retrievedOn date.
 * cdc.gov serves 403 to automated clients (bot guard) — those URLs were
 * verified manually in a browser and are allowlisted in scripts/check-links.ts.
 */
export const SOURCES = {
  wicGuide: {
    label: "USDA WIC — Infant Nutrition and Feeding Guide",
    url: "https://wicworks.fns.usda.gov/resources/infant-nutrition-and-feeding-guide",
    retrievedOn: "2026-08-22",
  },
  niaid2017: {
    label: "NIAID — Addendum Guidelines for the Prevention of Peanut Allergy (2017)",
    url: "https://www.niaid.nih.gov/diseases-conditions/guidelines-clinicians-and-patients-food-allergy",
    retrievedOn: "2026-08-22",
  },
  aapStartingSolids: {
    label: "AAP healthychildren.org — Starting Solid Foods",
    url: "https://www.healthychildren.org/English/ages-stages/baby/feeding-nutrition/Pages/Starting-Solid-Foods.aspx",
    retrievedOn: "2026-08-22",
  },
  aapChoking: {
    label: "AAP healthychildren.org — Choking Prevention",
    url: "https://www.healthychildren.org/English/health-issues/injuries-emergencies/Pages/Choking-Prevention.aspx",
    retrievedOn: "2026-08-22",
  },
  aapMenu8to12: {
    label: "AAP healthychildren.org — Sample Menu for an 8 to 12 Month Old",
    url: "https://www.healthychildren.org/English/ages-stages/baby/feeding-nutrition/Pages/Sample-One-Day-Menu-for-an-8-to-12-Month-Old.aspx",
    retrievedOn: "2026-08-22",
  },
  nhsWeaning: {
    label: "NHS Start for Life — Weaning",
    url: "https://www.nhs.uk/start-for-life/baby/weaning/",
    retrievedOn: "2026-08-22",
  },
  nhsFrom6Months: {
    label: "NHS Start for Life — What to feed your baby from around 6 months",
    url: "https://www.nhs.uk/start-for-life/baby/weaning/what-to-feed-your-baby/from-around-6-months/",
    retrievedOn: "2026-08-22",
  },
  whoComplementary: {
    label: "WHO — Complementary feeding",
    url: "https://www.who.int/health-topics/complementary-feeding",
    retrievedOn: "2026-08-22",
  },
  fdaFish: {
    label: "FDA/EPA — Advice About Eating Fish",
    url: "https://www.fda.gov/food/consumers/advice-about-eating-fish",
    retrievedOn: "2026-08-22",
  },
  fdaArsenic: {
    label: "FDA — Arsenic in Food and Dietary Supplements",
    url: "https://www.fda.gov/food/environmental-contaminants-food/arsenic-food-and-dietary-supplements",
    retrievedOn: "2026-08-22",
  },
  leapStudy: {
    label: "LEAP study — Randomized trial of peanut consumption in infants at risk (PubMed)",
    url: "https://pubmed.ncbi.nlm.nih.gov/25705822/",
    retrievedOn: "2026-08-22",
  },
  eatStudy: {
    label: "EAT study — Randomized trial of early allergenic food introduction (PubMed)",
    url: "https://pubmed.ncbi.nlm.nih.gov/26943128/",
    retrievedOn: "2026-08-22",
  },
  aaaaiFoodAllergy: {
    label: "AAAAI — Food allergy overview",
    url: "https://www.aaaai.org/conditions-treatments/allergies/food-allergy",
    retrievedOn: "2026-08-22",
  },
  fareEmergencyPlan: {
    label: "FARE — Food Allergy & Anaphylaxis Emergency Care Plan",
    url: "https://www.foodallergy.org/living-food-allergies/food-allergy-essentials/food-allergy-anaphylaxis-emergency-care-plan",
    retrievedOn: "2026-08-22",
  },
  cdcFoodsAndDrinks: {
    label: "CDC — Infant and Toddler Nutrition: Foods and Drinks",
    url: "https://www.cdc.gov/infant-toddler-nutrition/foods-and-drinks/index.html",
    retrievedOn: "2026-08-22",
  },
  cdcChokingHazards: {
    label: "CDC — Infant and Toddler Nutrition: Choking Hazards",
    url: "https://www.cdc.gov/infant-toddler-nutrition/foods-and-drinks/choking-hazards.html",
    retrievedOn: "2026-08-22",
  },
} satisfies Record<string, SourceRef>;

export type SourceKey = keyof typeof SOURCES;
