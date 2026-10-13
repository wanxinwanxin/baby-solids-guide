import type { MovementIdea } from "@/content-schema/activity-ideas";

/**
 * Activity ideas for the "thinking" area. Each idea is written in our own words
 * from the idea alone, and follows the house rules in movement.ts.
 */
export const thinkingIdeas: MovementIdea[] = [
  {
    slug: "shake-it-hear-it",
    title: { en: "Shake it, hear it", zh: "摇一摇，听一听" },
    activity: "play",
    area: "thinking",
    fromMonths: 4,
    toMonths: 8,
    steps: [
      { en: "Put a rattle or a squeaky toy in the baby's hand.", zh: "把一个摇铃或者一捏就响的玩具放进宝宝手里。" },
      { en: "Help them shake or squeeze it once, so a sound happens.", zh: "帮他摇一下或者捏一下，让它响一声。" },
      { en: "Let go and wait. Give them time to make it happen again on their own.", zh: "然后松手，等着。给他时间，让他自己再弄响一次。" },
    ],
    why: {
      en: "The sound comes because of something the baby did. Making it happen again on purpose is one of the first experiments a baby runs, and the pause you leave is where they get to try.",
      zh: "声音会响，是因为宝宝自己做了什么。有意识地让它再响一次，是宝宝最早做的实验之一，而你留出的那段停顿，正是给他去尝试的空当。",
    },
    watchFor: {
      en: "Use a store-bought rattle made in one sealed piece, with no parts that come off, and throw it away if it cracks. Homemade shakers filled with rice, beans, or beads can split open, and everything inside is a choking hazard.",
      zh: "用买来的、整体密封的摇铃，不能有会掉下来的零件，裂了就扔掉。自己用米、豆子或珠子装的摇摇瓶可能会裂开，里面的每一粒都可能噎住宝宝。",
    },
  },
  {
    slug: "drop-it-and-look",
    title: { en: "Drop it and look", zh: "掉下去了，找找看" },
    activity: "play",
    area: "thinking",
    fromMonths: 6,
    toMonths: 10,
    steps: [
      { en: "When the baby drops a soft toy from the high chair, say “Down it went!”", zh: "宝宝从高脚椅上把软玩具扔下去时，说一声“掉下去啦！”" },
      { en: "Lean over and look down at the floor together.", zh: "和他一起探头往地上看。" },
      { en: "Pick it up, hand it back, and expect it to fall again.", zh: "捡起来还给他，做好它马上又会被扔下去的准备。" },
    ],
    why: {
      en: "Dropping things on purpose is a baby testing whether the toy still exists once it leaves their sight. Looking down together, and finding it every time, gives the same answer again and again until it sticks.",
      zh: "故意往下扔，是宝宝在测试：玩具离开视线之后还在不在。一起往下看、每次都能找到，同一个答案一遍又一遍地出现，直到他记住为止。",
    },
    watchFor: {
      en: "Keep the baby strapped in, because they will lean over the side to look. Use soft toys only, and never tie one to the chair with string or ribbon to save the trips: a cord near a baby's neck is a strangulation risk.",
      zh: "宝宝要系好安全带，因为他会探身到椅子外面往下看。只用软玩具，也不要为了省得来回捡，用绳子或丝带把玩具拴在椅子上：宝宝脖子附近有绳子，就有勒住的危险。",
    },
  },
  {
    slug: "pull-the-cloth-to-get-it",
    title: { en: "Pull the towel to get it", zh: "拉毛巾，拿玩具" },
    activity: "play",
    area: "thinking",
    fromMonths: 7,
    toMonths: 12,
    steps: [
      { en: "Lay a small towel on the floor in front of the baby, with the near end within reach.", zh: "在宝宝面前的地上铺一条小毛巾，靠近他的那一头要够得着。" },
      { en: "Put a toy on the far end, just out of reach.", zh: "把玩具放在毛巾远的那一头，刚好够不到。" },
      { en: "Wait. If they stay stuck, give the towel a small tug yourself so they see the toy move.", zh: "等着。如果他一直没办法，你就轻轻拽一下毛巾，让他看见玩具跟着动了。" },
    ],
    why: {
      en: "To get the toy, the baby has to stop reaching for it and do something else first. Using one thing to get another is an early form of problem solving, and a towel is the simplest tool there is.",
      zh: "想拿到玩具，宝宝得先放下直接去够的念头，改做另一件事。借一样东西去拿另一样东西，是最早的解决问题，而毛巾就是最简单的工具。",
    },
    watchFor: {
      en: "Use a towel to pull, never a string, cord, or ribbon, since those can wrap around a neck or a finger. Stay with the baby for the whole game and put the towel away afterwards.",
      zh: "用毛巾来拉，不要用绳子、带子或丝带，这些东西可能缠住脖子或手指。整个游戏你都要在旁边，玩完就把毛巾收起来。",
    },
  },
  {
    slug: "under-which-cup",
    title: { en: "Under which cup?", zh: "在哪个杯子下面？" },
    activity: "play",
    area: "thinking",
    fromMonths: 8,
    toMonths: 14,
    steps: [
      { en: "Set two upturned plastic cups in front of the baby.", zh: "在宝宝面前倒扣两个塑料杯。" },
      { en: "While they watch, hide a toy under one and ask, “Where did it go?”", zh: "当着他的面，把玩具藏到其中一个下面，问一句：“去哪儿了？”" },
      { en: "Let them lift the cup and find it.", zh: "让他自己掀开杯子找到它。" },
      { en: "Once they find it every time, hide it under the other cup instead.", zh: "他每次都能找到了，就换另一个杯子藏。" },
    ],
    why: {
      en: "Finding a toy under a cup means keeping it in mind while it is out of sight. Switching cups is harder than it sounds: younger babies often look again where they found it last time, and getting past that is memory catching up with what the eyes just saw.",
      zh: "在杯子下面找到玩具，需要宝宝在看不见它的时候，心里还记着它。换一个杯子藏比听上去难：小一点的宝宝常常还会去上次找到的地方找，能跨过这一步，就是记忆追上了眼睛刚刚看到的东西。",
    },
    watchFor: {
      en: "Hide a toy too big to fit in the mouth, and use cups that are not glass. If the baby gets frustrated, lift the cup yourself, show them the toy, and end the game on a find.",
      zh: "藏的玩具要大到放不进嘴里，杯子不要用玻璃的。如果宝宝急了，你就掀开杯子让他看到玩具，让游戏在找到的那一刻收尾。",
    },
  },
  {
    slug: "open-and-shut",
    title: { en: "Open and shut", zh: "开开关关" },
    activity: "play",
    area: "thinking",
    fromMonths: 8,
    toMonths: 14,
    steps: [
      { en: "Share a lift-the-flap board book and let the baby do the lifting.", zh: "和宝宝一起看一本纸板翻翻书，让他自己去掀那些小翻页。" },
      { en: "Give them a container with an easy lid and a toy inside.", zh: "给他一个盖子好打开的容器，里面放一个玩具。" },
      { en: "Say “open” and “shut” each time the toy appears and disappears.", zh: "玩具每出现、消失一次，就说一声“打开”“关上”。" },
    ],
    why: {
      en: "A flap or a lid makes something vanish and come back, and the baby decides when. Each time, the hidden thing is still there, and saying “open” and “shut” as it happens gives those words a meaning the baby can see.",
      zh: "翻页和盖子能让东西消失又出现，而什么时候出现由宝宝说了算。每一次，藏起来的东西都还在那里；在那一刻说“打开”“关上”，这两个词就有了宝宝看得见的意思。",
    },
    watchFor: {
      en: "Once lids and doors interest the baby, put safety locks on every cupboard that holds cleaners, medicines, or sharp tools. Watch little fingers at hinges and at lids that snap shut, and pick containers with no small parts to pull off.",
      zh: "宝宝一旦对盖子和柜门感兴趣，所有放清洁剂、药品或锋利工具的柜子都要装上安全锁。小心小手指被合页和会“啪”地合上的盖子夹到，容器上也不能有能被拽下来的小零件。",
    },
  },
  {
    slug: "nesting-cups",
    title: { en: "Nesting cups", zh: "大杯套小杯" },
    activity: "play",
    area: "thinking",
    fromMonths: 8,
    toMonths: 14,
    steps: [
      { en: "Show the baby how a small cup drops into a big one.", zh: "做给宝宝看，小杯子怎么放进大杯子里。" },
      { en: "Hand them two cups at a time to start, with sizes far apart.", zh: "一开始每次只给两个，大小相差多一点的。" },
      { en: "Add a middle size once two is easy, and let them stack the cups upside down too.", zh: "两个玩顺了，再加一个中号的，倒过来摞成一座塔也可以。" },
    ],
    why: {
      en: "Big holds small, and small does not hold big. The cups teach size by letting the baby get it wrong and see why, and two cups far apart in size make the answer easy to find before the harder ones come in.",
      zh: "大的能装小的，小的装不下大的。套杯教大小，靠的是让宝宝放错，再看出为什么不行；先用两个大小差得多的杯子，答案容易找到，之后再加难的。",
    },
    watchFor: {
      en: "Use cups too big to fit in the baby's mouth, including the smallest one in the set. Check them for cracks now and then, and throw away any cracked plastic, which can break into sharp pieces.",
      zh: "杯子要大到放不进宝宝嘴里，一套里最小的那个也一样。时不时检查有没有裂纹，裂了的塑料杯就扔掉，它可能碎成锋利的小片。",
    },
  },
];
