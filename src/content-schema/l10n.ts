/**
 * Content-translation overlays. Each zh file under content/i18n/zh/**
 * carries ONLY the human-readable prose of one content entry; slugs, enums,
 * numbers, source URLs, and media stay in the English base file so a
 * translation can never corrupt structured data. Arrays mirror the base
 * entry index-for-index (content-lint checks the lengths).
 */

export type PrepSpecL10n = {
  form: string;
  passFailTest: string;
  whyThisForm: string;
  prepSteps: string[];
  commonMistakes: string[];
};

export type ServingGuidanceL10n = {
  typicalAmount: string;
  frequency?: string;
  note?: string;
};

export type FoodL10n = {
  slug: string;
  name: string;
  /** Extra zh search terms; the English name/aliases stay searchable. */
  aliases?: string[];
  chokingNotes?: string;
  nutritionHighlights: string[];
  prepSpecs: PrepSpecL10n[];
  tips: string[];
  watchOuts?: string[];
  servingGuidance?: ServingGuidanceL10n[];
};

export type RecipeL10n = {
  slug: string;
  name: string;
  steps: string[];
  whyItWorks: string;
  storage: string;
};

export type GuideL10n = {
  slug: string;
  title: string;
  summary: string;
  sections: { heading: string; paragraphs: string[] }[];
};

export type AllergenL10n = {
  id: string;
  name: string;
  firstServe: string;
  doseProgression: string[];
  maintenance: string;
  reactionSigns: string[];
  notes: string[];
};
