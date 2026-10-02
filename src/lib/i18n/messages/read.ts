import type { Msgs } from "../config";

/** Read-aloud shelf (/read) — an out-of-the-way page under "More". */
export const readMsgs = {
  metaTitle: { en: "Read to your baby", zh: "读给宝宝听" },
  metaDescription: {
    en: "A small public-domain shelf of things to recite at the table: English nursery rhymes and poems, and classical Chinese poems with pinyin.",
    zh: "一份公共领域的朗读小集，餐桌边就能念：英文童谣与诗歌，以及带拼音的中文古诗。",
  },
  heading: { en: "Read to your baby", zh: "读给宝宝听" },
  intro: {
    en: "This shelf is for the grown-up: learn a rhyme or a poem here, then put the phone down and say it to your baby face to face. Babies need your eyes, your voice, and repetition, not a screen. Everything here is public domain.",
    zh: "这个书架是给大人用的：在这里学会一首童谣或古诗，然后放下手机，面对面念给宝宝听。宝宝需要的是你的眼神、声音和重复，而不是屏幕。这里的作品都属于公共领域。",
  },
  englishSection: { en: "Rhymes & poems in English", zh: "英文童谣与诗歌" },
  chineseSection: { en: "古诗 · Chinese poems with pinyin", zh: "古诗（带拼音）" },
  chineseSectionNote: {
    en: "Pinyin above each line, so anyone can read along.",
    zh: "每句上方标注拼音，谁都能跟着读。",
  },
  groupCurated: { en: "启蒙精选 · Starter picks", zh: "启蒙精选" },
  kindRhyme: { en: "nursery rhyme", zh: "童谣" },
  kindPoem: { en: "poem", zh: "诗" },
  kindSonnet: { en: "sonnet", zh: "十四行诗" },
  markRead: { en: "Read this to baby ✓", zh: "记一次读给宝宝 ✓" },
  readToday: { en: "Read today ✓ (tap to undo)", zh: "今天读过 ✓（点一下撤销）" },
  textSize: { en: "Text size", zh: "字号" },
  sizeStandard: { en: "Standard text size", zh: "标准字号" },
  sizeLarge: { en: "Large text size", zh: "大字号" },
  sizeExtraLarge: { en: "Extra-large text size", zh: "特大字号" },
} satisfies Msgs;
