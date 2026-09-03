import { z } from "zod";

/**
 * Read-aloud shelf (/read) — an auxiliary, deliberately out-of-the-way
 * collection of things to recite to a baby. Everything here MUST be public
 * domain: the repo is public and open source, so copyrighted poems cannot
 * ship in it. The English and Chinese collections are independent works,
 * not translations of each other, so the zh-overlay pipeline does not apply.
 */

export const englishPieceSchema = z.object({
  slug: z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "kebab-case slug"),
  title: z.string().min(2),
  /** "Traditional" for anonymous nursery rhymes. */
  author: z.string().min(2),
  kind: z.enum(["rhyme", "poem", "sonnet"]),
  /** Stanzas, each a list of lines. */
  stanzas: z.array(z.array(z.string().min(1)).min(1)).min(1),
});
export type EnglishPiece = z.infer<typeof englishPieceSchema>;

export const chinesePoemLineSchema = z.object({
  hanzi: z.string().min(1),
  /** Full-line pinyin with tone marks, so hard characters stay readable. */
  pinyin: z.string().min(1),
});

export const chinesePoemSchema = z.object({
  slug: z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "kebab-case slug"),
  title: z.string().min(1),
  pinyinTitle: z.string().min(1),
  author: z.string().min(1),
  dynasty: z.string().min(1),
  lines: z.array(chinesePoemLineSchema).min(2),
});
export type ChinesePoem = z.infer<typeof chinesePoemSchema>;
