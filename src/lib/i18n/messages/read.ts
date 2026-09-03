import type { Msgs } from "../config";

/** Read-aloud shelf (/read) — an out-of-the-way page under "More". */
export const readMsgs = {
  metaTitle: { en: "Read to your baby", zh: "读给宝宝听" },
  metaDescription: {
    en: "A small public-domain shelf of things to recite at the table: English nursery rhymes and poems, and classical Chinese poems with pinyin.",
    zh: "一份公共领域的床边与餐边朗读小集：英文童谣与诗歌，以及带拼音的中文古诗。",
  },
  heading: { en: "Read to your baby", zh: "读给宝宝听" },
  intro: {
    en: "Babies do not need to understand a word — they need your voice, rhythm, and repetition. A rhyme while the pot simmers counts. Everything here is public domain.",
    zh: "宝宝不需要听懂——需要的是你的声音、节奏和重复。等饭出锅前念一首就很好。这里的作品都属于公共领域。",
  },
  englishSection: { en: "Rhymes & poems in English", zh: "英文童谣与诗歌" },
  chineseSection: { en: "古诗 · Chinese poems with pinyin", zh: "古诗（带拼音）" },
  chineseSectionNote: {
    en: "Pinyin above each line, so anyone can read along.",
    zh: "每句上方标注拼音，谁都能跟着读。",
  },
  kindRhyme: { en: "nursery rhyme", zh: "童谣" },
  kindPoem: { en: "poem", zh: "诗" },
  kindSonnet: { en: "sonnet", zh: "十四行诗" },
} satisfies Msgs;
