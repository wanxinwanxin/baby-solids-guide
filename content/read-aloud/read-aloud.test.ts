import { describe, expect, it } from "vitest";
import { chinesePoems, englishPieces } from "./index";

const CJK = /[一-鿿]/;

describe("read-aloud content", () => {
  it("collections are non-trivial and slugs are unique", () => {
    expect(englishPieces.length).toBeGreaterThanOrEqual(15);
    expect(chinesePoems.length).toBeGreaterThanOrEqual(12);
    const slugs = [...englishPieces, ...chinesePoems].map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("every English piece has at least two lines of text", () => {
    for (const p of englishPieces) {
      expect(p.stanzas.flat().length, p.slug).toBeGreaterThanOrEqual(2);
    }
  });

  it("Chinese lines keep hanzi and pinyin in the right fields", () => {
    for (const poem of chinesePoems) {
      for (const line of poem.lines) {
        expect(CJK.test(line.hanzi), `${poem.slug}: ${line.hanzi}`).toBe(true);
        expect(CJK.test(line.pinyin), `${poem.slug}: ${line.pinyin}`).toBe(false);
      }
    }
  });

  it("English pieces carry no leftover source-format artifacts", () => {
    for (const p of englishPieces) {
      for (const line of p.stanzas.flat()) {
        expect(/gutenberg|\[Illustration|\*\*\*/i.test(line), `${p.slug}: ${line}`).toBe(false);
      }
    }
  });
});
