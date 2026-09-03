import { chinesePoemSchema, englishPieceSchema } from "@/content-schema/read-aloud";
import { chinesePoems as rawChinese } from "./chinese";
import { englishPieces as rawEnglish } from "./english";

/** Parse at import time so a malformed entry fails the build, not the reader. */
export const englishPieces = rawEnglish.map((p) => englishPieceSchema.parse(p));
export const chinesePoems = rawChinese.map((p) => chinesePoemSchema.parse(p));
