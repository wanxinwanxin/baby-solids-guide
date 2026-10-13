import type { MovementIdea } from "@/content-schema/activity-ideas";

/**
 * Activity ideas for the "talking" area. Each idea is written in our own words
 * from the idea alone, and follows the house rules in movement.ts.
 */
export const talkingIdeas: MovementIdea[] = [
  {
    slug: "copy-the-babble",
    title: { en: "Copy the babble", zh: "学宝宝咿呀" },
    activity: "play",
    area: "talking",
    fromMonths: 4,
    toMonths: 10,
    steps: [
      { en: "Get face to face, close enough that the baby can see your mouth.", zh: "和宝宝面对面，近到他能看清你的嘴。" },
      { en: "When the baby makes a sound, say the same sound back.", zh: "宝宝发出一个声音，你就照着学一遍。" },
      { en: "Wait, and count to five in your head, so there is room to answer.", zh: "然后等着，在心里数到五，给他留出回应的空当。" },
      { en: "Answer whatever comes next, and keep the turns going for as long as the baby does.", zh: "他接下来发出什么声音，你都接上，他愿意轮多久，你就陪多久。" },
    ],
    why: {
      en: "This is a conversation before there are words. Taking turns with sounds teaches the rhythm of talking — I speak, you answer — and being copied shows the baby that their voice makes something happen.",
      zh: "这是还没有词语时的对话。一来一回地发声，教会宝宝说话的节奏——我说，你接；而你学他，是在告诉他：他的声音能让事情发生。",
    },
    watchFor: {
      en: "Stop when the baby turns away or goes quiet, and try again later. By about nine months, most babies babble strings like “bababa” or “mamama” — it is one of the CDC milestones. If yours does not yet, mention it to the pediatrician.",
      zh: "宝宝转开头或者不出声了，就停下，过一会儿再玩。到九个月左右，大多数宝宝会连着发出“ba-ba-ba”“ma-ma-ma”这样的音——这是美国疾控中心（CDC）列出的发育里程碑之一。如果你的宝宝还没有，跟儿科医生提一下就好。",
    },
  },
  {
    slug: "narrate-the-day",
    title: { en: "Say what you are doing", zh: "边做边说" },
    activity: "play",
    area: "talking",
    fromMonths: 4,
    toMonths: 14,
    steps: [
      { en: "Pick an ordinary job: a diaper change, getting dressed, putting the groceries away.", zh: "挑一件平常的事：换尿布、穿衣服、把买回来的菜收好。" },
      { en: "Say each step in a few short words as you do it — “Socks on. One sock. Two socks.”", zh: "一边做，一边用几个字说出每一步——“穿袜子。一只袜子。两只袜子。”" },
      { en: "Pause and look at the baby, so they can answer with a sound or a kick.", zh: "停一停，看着宝宝，让他用声音或者蹬蹬腿来回应你。" },
    ],
    why: {
      en: "Babies learn words by hearing them next to the thing they mean, again and again. Short words about what is right in front of them are the easiest to connect, and everyday jobs repeat often enough to do the teaching.",
      zh: "宝宝学词，靠的是一遍又一遍地听到这个词和它说的东西同时出现。用短短的词说眼前正在发生的事，最容易对上号，而日常的事天天重复，本身就在教。",
    },
    watchFor: {
      en: "Talk face to face where you can, and turn off a TV that is on in the background — it pulls attention away from your voice. The AAP advises no screen media before eighteen months, other than video chat with family. If the baby looks away, go quiet for a while.",
      zh: "尽量面对面说，把背景里开着的电视关掉——它会把宝宝的注意力从你的声音上拉走。美国儿科学会（AAP）建议，十八个月以前，除了和家人视频通话，不接触屏幕。宝宝把头转开，你就安静一会儿。",
    },
  },
  {
    slug: "body-parts-game",
    title: { en: "Nose, toes, tummy", zh: "认一认身体" },
    activity: "play",
    area: "talking",
    fromMonths: 6,
    toMonths: 14,
    steps: [
      { en: "At bath time or a diaper change, touch one body part gently and name it: “Nose.”", zh: "洗澡或者换尿布的时候，轻轻碰一下宝宝身上的一个地方，说出它的名字：“鼻子。”" },
      { en: "Touch your own nose and say the word again.", zh: "再摸摸你自己的鼻子，把这个词再说一遍。" },
      { en: "Move on to toes, tummy, and hands — a few each time, and the same ones often.", zh: "接着是脚趾、肚子、小手——每次说几个就够，同样的几个要常常重复。" },
      { en: "Later, ask “Where is your nose?” and wait a moment before you show them.", zh: "大一点以后，问他“鼻子在哪儿？”，先等一等，再指给他看。" },
    ],
    why: {
      en: "A baby's own body is the first thing they know well, so its words are easy to attach. Understanding comes long before speaking, so the words go in now and come out later.",
      zh: "宝宝最先熟悉的就是自己的身体，所以身体部位的词最容易对上号。听懂远远早于会说，现在听进去的词，以后才会慢慢说出来。",
    },
    watchFor: {
      en: "On a changing table, keep one hand on the baby the whole time, even to reach for a wipe. In the bath, stay within arm's reach and never step away, not even for a moment — a baby can drown in very shallow water.",
      zh: "在尿布台上，一只手始终扶着宝宝，哪怕只是伸手拿一张湿巾。洗澡时人要在伸手够得着的地方，一刻也不能走开——很浅的水也能让宝宝溺水。",
    },
  },
  {
    slug: "rhyme-with-a-bounce",
    title: { en: "A rhyme on your knee", zh: "腿上颠颠念儿歌" },
    activity: "sing",
    area: "talking",
    fromMonths: 6,
    toMonths: 14,
    steps: [
      { en: "Sit the baby on your knees facing you, with your hands around their trunk.", zh: "让宝宝面朝你坐在你腿上，你双手扶住他的身体。" },
      { en: "Say a short traditional rhyme, like “Hickory Dickory Dock”, with one small bounce on each beat.", zh: "念一首短短的传统儿歌，比如“小老鼠，上灯台”，每一拍轻轻颠一下。" },
      { en: "Slow down near the end and pause just before the last word.", zh: "快到结尾时放慢，在最后一句前停一停。" },
      { en: "Say the last word with a big smile, then wait to see if the baby asks for more.", zh: "笑着把最后一句说出来，然后等着看他要不要再来一遍。" },
    ],
    why: {
      en: "A steady beat and a rhyme make the sounds of language easy to hear and easy to predict. The pause turns the rhyme into a game of waiting, and soon the baby wriggles or laughs to ask for the ending.",
      zh: "稳定的节拍和押韵，让语言的声音好听又好猜。最后那一下停顿，把儿歌变成了等待的游戏，过不了多久，宝宝就会扭着身子、咯咯笑着催你往下说。",
    },
    watchFor: {
      en: "Hold the trunk firmly so the head and back stay steady, and keep the bounce small and soft. Never shake a baby, in play or at any other time. Skip it straight after a feed, and stop when the baby looks away or fusses.",
      zh: "双手稳稳扶住宝宝的身体，让头和背都稳当，颠的幅度要小、要轻。任何时候都不要摇晃宝宝，玩的时候也不行。刚吃完奶不要玩，宝宝转开头或者开始闹，就停下来。",
    },
  },
  {
    slug: "animal-sounds",
    title: { en: "What does the cow say?", zh: "小牛怎么叫？" },
    activity: "play",
    area: "talking",
    fromMonths: 7,
    toMonths: 14,
    steps: [
      { en: "Open a board book with animals in it, or line up two or three large toy animals.", zh: "翻开一本有动物的纸板书，或者摆出两三个大一点的动物玩具。" },
      { en: "Point and say, “The cow says moo,” in a big, happy voice.", zh: "指着说：“小牛哞哞叫。”声音大一点，开心一点。" },
      { en: "Next time, say “The cow says…” and pause, so the baby can fill the gap.", zh: "下一次只说“小牛怎么叫呀……”，然后停下来，等宝宝来接。" },
      { en: "Cheer any sound that comes, whether or not it is “moo”.", zh: "不管他发出什么声音，是不是“哞”，都为他高兴。" },
    ],
    why: {
      en: "Animal sounds are some of the easiest “words” a baby can say: short, repeated, and fun to make. Pausing gives the baby a turn, and pointing at the picture links the sound to the thing.",
      zh: "动物叫声是宝宝最容易说出口的“词”之一：短、重复，发起来还好玩。停下来等他，就是把说话的机会交给他；指着图片说，能把声音和东西连在一起。",
    },
    watchFor: {
      en: "Use board books with thick pages, and toy animals too big to fit in the mouth — anything that passes through a toilet-paper tube is small enough to choke on. Stop when the baby loses interest, even in the middle of the book.",
      zh: "用厚页的纸板书，动物玩具要大到放不进嘴里——能穿过卫生纸卷筒的东西，就小到能让宝宝噎住。宝宝没兴趣了就停，不用非得读完一整本。",
    },
  },
  {
    slug: "where-is-daddy",
    title: { en: "Where's Daddy?", zh: "爸爸在哪儿？" },
    activity: "play",
    area: "talking",
    fromMonths: 8,
    toMonths: 14,
    steps: [
      { en: "With Daddy, or another family member, across the room, ask the baby “Where's Daddy?”", zh: "让爸爸（或者别的家人）站在房间另一头，你问宝宝：“爸爸在哪儿？”" },
      { en: "Have Daddy wave and call the baby's name, so the baby turns and finds him.", zh: "请爸爸挥挥手，叫宝宝的名字，让宝宝转头找到他。" },
      { en: "Point at him and look at him yourself as you say, “There's Daddy!”", zh: "你也指着他、看着他说：“爸爸在那儿！”" },
      { en: "Swap in other people, and use everyone's names often through the day.", zh: "换别的家人再玩，平时也多叫家里每个人的称呼。" },
    ],
    why: {
      en: "The baby learns that a word can stand for a person, and that following your point or your gaze leads somewhere worth looking. Looking where someone else looks is one of the foundations of learning words.",
      zh: "宝宝会明白，一个词可以代表一个人；顺着你指的方向、顺着你的目光看过去，就能看到值得看的东西。看别人在看的地方，是学说话的基础之一。",
    },
    watchFor: {
      en: "Keep it a game and stop when the baby loses interest. By about nine months, many babies look toward a familiar person when you say their name. If, by around the first birthday, the baby rarely looks where you point or where you look, mention it to the pediatrician.",
      zh: "就当是个游戏，宝宝没兴趣了就停。到九个月左右，很多宝宝听到熟悉的人的称呼，会转头去看那个人。如果到一岁前后，宝宝还很少顺着你指的方向或你的目光去看，跟儿科医生提一下。",
    },
  },
  {
    slug: "wave-bye-bye",
    title: { en: "Wave bye-bye", zh: "挥手拜拜" },
    activity: "play",
    area: "talking",
    fromMonths: 8,
    toMonths: 14,
    steps: [
      { en: "Each time someone leaves, wave and say “Bye-bye!” the same way.", zh: "每次有人离开，都用同样的方式挥手说：“拜拜！”" },
      { en: "Hold out an open hand and say “Give me” when you want something passed to you.", zh: "想让宝宝把东西递给你时，摊开手，说“给我”。" },
      { en: "Clap and say “Yay!” when something good happens.", zh: "有好事发生时，拍拍手，说“真棒！”" },
      { en: "Wait after each one, so the baby has a turn to try it.", zh: "每做一个动作就等一等，让宝宝有机会自己试试。" },
    ],
    why: {
      en: "A gesture is easier to make than a word, and it carries the same meaning. Pairing the two again and again helps the word land, and many babies wave bye-bye around their first birthday.",
      zh: "手势比说话容易，表达的意思却一样。手势和词一遍遍地配在一起，词就更容易被宝宝记住。很多宝宝在一岁前后学会挥手拜拜。",
    },
    watchFor: {
      en: "Never move the baby's hands through the gesture for them, and never ask for a performance for visitors. Show it, wait, and stop when they lose interest — the gesture comes when it comes.",
      zh: "不要抓着宝宝的手替他做动作，也不要非让他在客人面前表演。你做给他看，等一等，他没兴趣了就停——到了该会的时候，自然就会了。",
    },
  },
  {
    slug: "feed-the-teddy",
    title: { en: "Feed the teddy", zh: "喂小熊吃饭" },
    activity: "play",
    area: "talking",
    fromMonths: 9,
    toMonths: 15,
    steps: [
      { en: "Sit a teddy up next to the baby and say, “Teddy is hungry.”", zh: "让小熊坐在宝宝旁边，说：“小熊饿啦。”" },
      { en: "Feed it from an empty spoon and name what you do: “Open wide. Yum.”", zh: "用空勺子喂它，一边喂一边说：“张大嘴。真好吃。”" },
      { en: "Hand the spoon to the baby and say, “Your turn.”", zh: "把勺子递给宝宝，说：“该你喂啦。”" },
      { en: "Name each thing they do: “You fed Teddy. Now Teddy is full.”", zh: "宝宝做什么，你就说什么：“你喂小熊了。小熊吃饱啦。”" },
    ],
    why: {
      en: "Pretend play starts with copying what you do every day, and feeding is the job the baby knows best. Naming each action as they do it puts words like “eat”, “spoon”, and “full” at the moment they mean the most.",
      zh: "假装游戏是从模仿你每天做的事开始的，而吃饭是宝宝最熟悉的一件。在他动手的时候说出每个动作，“吃”“勺子”“饱了”这些词，就出现在最有意义的那一刻。",
    },
    watchFor: {
      en: "Choose a soft toy with stitched eyes and no buttons, beads, or ribbons that can come off. Use a short, soft baby spoon, and keep the baby sitting while they hold it, so a fall does not push it into the mouth.",
      zh: "选眼睛是绣上去的毛绒玩具，不要有纽扣、珠子或缎带这类会掉下来的东西。用短柄的软头宝宝勺，宝宝拿着勺子时让他坐着，免得摔倒时勺子戳到嘴里。",
    },
  },
];
