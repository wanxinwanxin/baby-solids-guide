import type { Msg } from "../config";

/**
 * Cut-diagram variants + localized captions/annotations. The art itself
 * lives in src/components/diagrams/CutDiagram.tsx, which re-exports
 * `DiagramVariant` so existing consumer imports keep working.
 */
export type DiagramVariant =
  | "batons"
  | "bite-size"
  | "quarter-lengthwise"
  | "thin-spread"
  | "strips"
  | "mash"
  | "shred"
  | "ribbons"
  | "wedge-handle";

/** Figure caption + SVG aria-label (en byte-identical to the original DIAGRAM_CAPTIONS). */
export const DIAGRAM_CAPTION_MSGS: Record<DiagramVariant, Msg> = {
  batons: { en: "Soft stick, about two adult fingers", zh: "软条，约两根成人手指宽" },
  "bite-size": { en: "Pinky-nail pieces for pincer grasp", zh: "小指指甲盖大小，练习二指捏取" },
  "quarter-lengthwise": {
    en: "Always quartered lengthwise — never coins",
    zh: "务必纵向切成四条——切勿切成圆片",
  },
  "thin-spread": {
    en: "Paper-thin spread or drizzly-thin mix",
    zh: "薄薄一层涂抹，或稀到能滴落的糊",
  },
  strips: { en: "Finger-width strips", zh: "手指宽的长条" },
  mash: { en: "Smooth, spoonable mash", zh: "细滑、可用勺舀的泥糊" },
  shred: { en: "Finely shredded and moist", zh: "切得细碎且湿润" },
  ribbons: { en: "Paper-thin peeler ribbons", zh: "削皮器刨出的极薄薄片" },
  "wedge-handle": { en: "Wedge with a built-in grip handle", zh: "自带抓握把手的角块" },
};

/** Short annotation rendered inside each diagram's SVG. */
export const DIAGRAM_LABEL_MSGS: Record<DiagramVariant, Msg> = {
  batons: { en: "2 fingers", zh: "两根手指" },
  "bite-size": { en: "pinky nail", zh: "小指指甲盖" },
  "quarter-lengthwise": { en: "4 long spears", zh: "4根长条" },
  "thin-spread": { en: "see-through layer", zh: "薄到透光" },
  strips: { en: "finger-width strips", zh: "手指宽长条" },
  mash: { en: "smooth & spoonable", zh: "细滑可舀" },
  shred: { en: "fine, moist shreds", zh: "细碎湿润" },
  ribbons: { en: "paper-thin ribbons", zh: "薄如纸的刨片" },
  "wedge-handle": { en: "grip zone", zh: "抓握区" },
};
