import { chinesePoemSchema, englishPieceSchema } from "@/content-schema/read-aloud";
import { chinesePoems as rawChinese } from "./chinese";
import { chinesePoemsGenerated } from "./chinese-gen";
import { englishPieces as rawEnglish } from "./english";

/** Parse at import time so a malformed entry fails the build, not the reader. */
export const englishPieces = rawEnglish.map((p) => englishPieceSchema.parse(p));
/** Curated picks first (no `form`), then the generated 唐诗三百首 poems. */
export const chinesePoems = [...rawChinese, ...chinesePoemsGenerated].map((p) =>
  chinesePoemSchema.parse(p),
);
