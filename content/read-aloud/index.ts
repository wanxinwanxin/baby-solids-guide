import { chinesePoemSchema, englishPieceSchema } from "@/content-schema/read-aloud";
import { chinesePoems as rawChinese } from "./chinese";
import { chinesePoemsGenerated } from "./chinese-gen";
import { chineseRhymesGenerated } from "./chinese-rhymes";
import { englishPieces as rawEnglish } from "./english";

/** Parse at import time so a malformed entry fails the build, not the reader. */
export const englishPieces = rawEnglish.map((p) => englishPieceSchema.parse(p));
/**
 * Curated picks first (no `form`), then the 蒙学顺口溜 chants (their group
 * renders right after the starter picks), then the 唐诗三百首 poems.
 */
export const chinesePoems = [...rawChinese, ...chineseRhymesGenerated, ...chinesePoemsGenerated].map(
  (p) => chinesePoemSchema.parse(p),
);
