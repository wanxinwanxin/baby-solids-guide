import type { MovementIdea } from "@/content-schema/activity-ideas";

/**
 * Activity ideas for the "senses" area. Each idea is written in our own words
 * from the idea alone, and follows the house rules in movement.ts.
 */
export const sensesIdeas: MovementIdea[] = [
  // ——— 4 months: eyes and ears start to find things ———
  {
    slug: "watch-the-bubbles",
    title: { en: "Watch the bubbles", zh: "看泡泡" },
    activity: "play",
    area: "senses",
    fromMonths: 4,
    toMonths: 10,
    steps: [
      { en: "Hold the baby on your lap, or lay them on their back on a blanket.", zh: "让宝宝坐在你腿上，或者仰躺在毯子上。" },
      { en: "Blow a few bubbles slowly, up and out in front of them, away from the face.", zh: "慢慢吹几个泡泡，往上、往他前方吹，不要对着脸。" },
      { en: "Let the eyes follow each one down, and say “pop” when it bursts.", zh: "让他的眼睛跟着泡泡往下落，泡泡一破，你就说“啪”。" },
      { en: "Once they start to reach, let a bubble drift close enough for a hand to touch.", zh: "等他开始伸手了，就让一个泡泡飘到他手能碰到的地方。" },
    ],
    why: {
      en: "A bubble drifts slowly, catches the light, and changes direction on its own, which makes it good practice for eyes learning to follow a moving thing. When a reaching hand makes it vanish, looking turns into a reason to move.",
      zh: "泡泡飘得慢，会反光，方向还会自己变，正好用来练眼睛追着动的东西看。等到伸手一碰它就没了，看就变成了动起来的理由。",
    },
    watchFor: {
      en: "Blow up and away from the baby's face, so no drops land in the eyes or the mouth. The liquid is soap: keep the bottle in your own hand and then out of reach, and wipe the baby's hands afterwards, because they go straight to the mouth.",
      zh: "泡泡往上、往外吹，不要对着宝宝的脸，免得泡泡水溅进眼睛或嘴里。泡泡水是肥皂水：瓶子拿在你自己手里，玩完就收到他够不着的地方。结束后给宝宝擦擦手，因为手很快就会塞进嘴里。",
    },
  },
  {
    slug: "where-is-the-sound",
    title: { en: "Where is that sound?", zh: "声音在哪儿？" },
    activity: "play",
    area: "senses",
    fromMonths: 4,
    toMonths: 9,
    steps: [
      { en: "Sit the baby on your lap facing out, or lay them on their back.", zh: "让宝宝面朝外坐在你腿上，或者仰躺着。" },
      { en: "Hold a rattle out of sight on one side and shake it softly.", zh: "把摇铃拿到他一侧看不见的地方，轻轻摇几下。" },
      { en: "Wait for the head to turn, and show the rattle when they find it.", zh: "等他转头去找，找到了就把摇铃拿出来给他看。" },
      { en: "Try the other side next, and later from behind.", zh: "接着换另一侧，之后再试试从身后摇。" },
    ],
    why: {
      en: "Turning toward a sound means the two ears are working out where it came from, and the eyes go to check the answer. It is also a quiet, everyday way to see that hearing is on track.",
      zh: "转头找声音，是两只耳朵在判断声音从哪儿来，眼睛再过去核对答案。这也是一个平常就能做的小观察，看看宝宝的听力是不是一切正常。",
    },
    watchFor: {
      en: "Shake softly, about an arm's length away, and never right next to the ear. If the baby still does not turn toward sounds by about six months, mention it to your pediatrician, who can check their hearing.",
      zh: "摇得轻一点，离宝宝大约一臂远，千万不要贴着耳朵摇。如果宝宝到六个月左右还不会转头找声音，跟儿科医生说一声，医生可以帮他查查听力。",
    },
  },

  // ——— 5 months: hands, skin, and a moving target ———
  {
    slug: "roll-a-ball-past",
    title: { en: "Watch the ball roll by", zh: "看球滚过去" },
    activity: "play",
    area: "senses",
    fromMonths: 5,
    toMonths: 9,
    steps: [
      { en: "Sit the baby against you with support, or lay them on their tummy, facing a clear stretch of floor.", zh: "让宝宝靠着你坐好，或者趴在地上，面前留一片空地。" },
      { en: "Roll a bright ball slowly across in front of them, from one side to the other.", zh: "把一个颜色鲜艳的球，从一侧慢慢滚到另一侧，从他面前经过。" },
      { en: "Pause at the end so the eyes can catch up, then roll it back.", zh: "滚到头停一下，等他的眼睛跟上，再滚回来。" },
    ],
    why: {
      en: "A ball rolling at an even speed asks the eyes to keep up with it smoothly, all the way across. That steady following is what a baby uses later to watch a toy roll across the room and go after it.",
      zh: "匀速滚动的球，要求眼睛一路平稳地跟着它走完全程。以后宝宝看着玩具滚过房间、再爬过去追，用的就是这种稳稳的追视。",
    },
    watchFor: {
      en: "Use a ball too big to fit in the baby's mouth and light enough not to hurt if it bumps them. Stop when they look away or start to fuss, because that is how they tell you they have had enough.",
      zh: "球要大到塞不进宝宝嘴里，也要轻，碰到他也不疼。宝宝转头不看了，或者开始闹，就停下，这是他在告诉你“看够了”。",
    },
  },
  {
    slug: "texture-basket",
    title: { en: "A basket of textures", zh: "触感小篮子" },
    activity: "play",
    area: "senses",
    fromMonths: 5,
    toMonths: 12,
    steps: [
      { en: "Fill a low basket with a few safe things that feel different: a soft baby brush, a wooden spoon, a satin cloth, a crinkle cloth, a silicone teether.", zh: "在一个矮篮子里放几样摸起来不一样的安全物品：宝宝用的软毛刷、木勺、一块缎面布、一块会沙沙响的响纸布、硅胶牙胶。" },
      { en: "Set it where the baby can reach and let them pull things out one at a time.", zh: "把篮子放在宝宝够得着的地方，让他一样一样往外拿。" },
      { en: "Name each one as they touch it: soft, smooth, hard, bumpy.", zh: "他摸到哪样，你就说哪样：软软的、滑滑的、硬硬的、疙疙瘩瘩的。" },
      { en: "Swap one or two things every few days, so there is always something new.", zh: "过几天换掉一两样，让篮子里总有新东西。" },
    ],
    why: {
      en: "Babies find out what things are by handling them, and at this age the mouth is part of the exploring too. Soft next to hard, and smooth next to bumpy, with your word for each, links what the hands feel to a word long before the baby can say it.",
      zh: "宝宝靠拿在手里、放进嘴里来认识东西，这个月龄的嘴也是探索的一部分。软的挨着硬的，滑的挨着糙的，再配上你说的词，手上的感觉就和词连在了一起，比他自己会说早得多。",
    },
    watchFor: {
      en: "Everything in the basket will go in the mouth, so use only things bigger than the mouth, and nothing that crumbles or tears into pieces when bitten — no sponges, foam, or paper. Check cloth edges for loose threads, and stay close the whole time.",
      zh: "篮子里的每样东西都会进嘴，所以只放比嘴大的东西，咬了会掉渣、会撕成碎片的都不要——海绵、泡沫、纸都不行。检查布边有没有脱线，全程待在旁边。",
    },
  },
  {
    slug: "splash-in-the-bath",
    title: { en: "Splash in the bath", zh: "洗澡时拍拍水" },
    activity: "play",
    area: "senses",
    fromMonths: 5,
    toMonths: 14,
    steps: [
      { en: "Run a shallow bath, about five centimeters of water for a young baby.", zh: "放一盆浅水，小宝宝的话，五厘米左右深就够了。" },
      { en: "Test it with your elbow or the inside of your wrist: warm, never hot.", zh: "用手肘或手腕内侧试一下水温：温的，不能烫。" },
      { en: "Let the baby pat and kick the water, and say “splash!” when it flies.", zh: "让宝宝用手拍水、用脚踢水，水花一溅起来，你就说“哗啦！”" },
      { en: "Pour water slowly from a cup over their hands.", zh: "用杯子把水慢慢浇在他手上。" },
    ],
    why: {
      en: "Water answers every movement — a pat makes a splash, a kick makes a wave — so the baby learns that what they do changes something. The warmth on the skin, the sound, and the shine all arrive at once, which is a lot for the senses in one small tub.",
      zh: "水对每个动作都有回应——拍一下溅起水花，蹬一下起个浪——宝宝由此知道，自己做的事会带来变化。皮肤上的温热、水声、水面的光一起到来，一个小澡盆就能给感官这么多东西。",
    },
    watchFor: {
      en: "Keep a hand on the baby and never leave, not even for a second to fetch a towel — a baby can drown in a few centimeters of water, quickly and silently. Have everything within reach before you start, and treat a bath seat as a seat, not a safety device.",
      zh: "手不离宝宝，人不离澡盆，哪怕转身拿条毛巾也不行——几厘米深的水就能让宝宝溺水，又快又没有声音。开始前把要用的东西都放到手边。洗澡椅只是个座椅，不是安全装置。",
    },
  },

  // ——— 6 months: smell, sound, taste, and the beat ———
  {
    slug: "smell-the-kitchen",
    title: { en: "Smell the kitchen", zh: "闻闻厨房里的味道" },
    activity: "play",
    area: "senses",
    fromMonths: 6,
    toMonths: 14,
    steps: [
      { en: "Pick one thing with a clear smell: a sprig of mint, half a lemon, or a cinnamon stick.", zh: "挑一样气味明显的东西：一小枝薄荷、半个柠檬，或者一根肉桂。" },
      { en: "Hold it a little way from the baby's nose, and sniff it yourself first.", zh: "把它拿到离宝宝鼻子不远的地方，你自己先闻一下给他看。" },
      { en: "Name the smell — “lemon, fresh and sour” — and watch their face.", zh: "说出这是什么味道——“柠檬，酸酸的，很清爽”——再看看他的表情。" },
      { en: "Offer one smell at a time, with a pause between them.", zh: "一次只闻一种，中间歇一会儿。" },
    ],
    why: {
      en: "Smell is the sense parents name out loud least often, though a baby has used it since birth. Naming each smell, and letting them see your face as you sniff, links it to a word and to foods that will later turn up on the plate.",
      zh: "嗅觉是大人最少说出口的一种感觉，可宝宝从出生起就在用它。把每种气味说出来，再让他看到你闻的时候的表情，气味就和词连在了一起，也和以后会出现在饭桌上的食物连在了一起。",
    },
    watchFor: {
      en: "You hold it the whole time and the baby only sniffs, so nothing reaches the mouth or the eyes. Skip essential oils completely — they are toxic if swallowed and harsh on small airways — and keep chili and pepper well away from the face.",
      zh: "东西全程拿在你手里，宝宝只闻不碰，这样就进不了嘴，也碰不到眼睛。精油完全不要用——误食有毒，对小宝宝的气道刺激也大。辣椒和胡椒要离脸远远的。",
    },
  },
  {
    slug: "fast-and-slow-music",
    title: { en: "Dance fast, dance slow", zh: "快快慢慢跳个舞" },
    activity: "music",
    area: "senses",
    fromMonths: 6,
    toMonths: 14,
    steps: [
      { en: "Put on some music and hold the baby close, one arm under the bottom and one across the back.", zh: "放上音乐，把宝宝抱在胸前，一只手托住屁股，一只手护住后背。" },
      { en: "Sway slowly to a slow song, then step a little quicker when a fast one comes on.", zh: "慢歌就慢慢摇，换成快歌，就把脚步加快一点。" },
      { en: "Hum along, quiet in one part and louder in the next.", zh: "跟着哼，这一段小声，下一段大声一点。" },
      { en: "Say the words as it changes: “slow… fast!”, “soft… loud!”", zh: "变的时候说出来：“慢——快！”“小声——大声！”" },
    ],
    why: {
      en: "The baby hears the music and feels it in your steps at the same time, so fast and slow become something they know with the whole body. Hearing the music change, and then feeling you change with it, is early practice in noticing a pattern.",
      zh: "宝宝一边听音乐，一边从你的步子里感受节奏，快和慢就成了全身都能感觉到的东西。听到音乐变了，紧接着感觉到你的动作也变了，这是在早早地练习发现规律。",
    },
    watchFor: {
      en: "Support the head and trunk the whole time, and keep every movement smooth — never shake, toss, or jolt a baby, even in play. Keep the music at about the level of ordinary conversation, and stop if they turn away or fuss.",
      zh: "全程托住宝宝的头和身体，动作要平稳——就算是玩，也绝不要摇晃、往上抛或者猛地颠他。音乐开到和平常说话差不多的音量就好，宝宝扭开头或者开始闹，就停下。",
    },
  },
  {
    slug: "sounds-of-the-house",
    title: { en: "Sounds around the house", zh: "家里的声音" },
    activity: "play",
    area: "senses",
    fromMonths: 6,
    toMonths: 12,
    steps: [
      { en: "When the doorbell rings or the washing machine starts, stop and say “Listen!”", zh: "门铃一响，或者洗衣机一转起来，就停一下，说：“听！”" },
      { en: "Carry the baby to see where the sound came from.", zh: "抱着宝宝去看声音是从哪儿来的。" },
      { en: "Name it simply: “That's the kettle. The water is boiling.”", zh: "简单地说出来：“这是水壶，水开了。”" },
      { en: "Next time, pause and let them look toward it before you go.", zh: "下一次先停一下，等他自己往那边看，你再走过去。" },
    ],
    why: {
      en: "A home is full of sounds a baby hears all day but cannot yet place. Going to look, and hearing you name it, links each sound to the thing that makes it, which is the start of understanding what they hear.",
      zh: "家里一天到晚都有各种声音，宝宝听得到，却还不知道是什么。去看一看，再听你说出名字，每种声音就和发出它的东西对上了号，这是听懂周围世界的开始。",
    },
    watchFor: {
      en: "Look from a safe distance: stay well back from kettle steam, the stove, the oven, and anything hot, and hold the baby on the side away from it. A reaching hand moves faster than you can.",
      zh: "隔着安全距离看：离水壶的蒸汽、炉灶、烤箱和一切烫的东西都远一点，把宝宝抱在远离它们的那一侧。宝宝伸手比你反应还快。",
    },
  },
  {
    slug: "squish-the-food",
    title: { en: "Squish the food", zh: "用手捏捏饭" },
    activity: "play",
    area: "senses",
    fromMonths: 6,
    toMonths: 12,
    steps: [
      { en: "Seat the baby upright in the high chair, with the straps done up.", zh: "让宝宝坐直在餐椅里，系好安全带。" },
      { en: "Put a little soft food straight on the tray, like mashed banana or soft-cooked pasta.", zh: "直接在餐盘上放一点软的食物，比如香蕉泥，或者煮软的意面。" },
      { en: "Let them squish, smear, and spread it — the mess is the point.", zh: "让他去捏、去抹、去摊开——弄得一塌糊涂，正是这个游戏的意义。" },
      { en: "Name what they feel, “squishy” or “slippery”, and let the hand find the mouth on its own.", zh: "把他摸到的感觉说出来，“软软的”“滑滑的”，然后等他自己把手送到嘴边。" },
    ],
    why: {
      en: "Squishing is how a baby finds out what a new food is before deciding to eat it. The feel of soft, sticky, and slippery on the fingers is part of learning to eat, and it gives the fingers practice for picking food up later.",
      zh: "捏一捏，是宝宝在决定吃不吃之前，弄清这个新食物是什么的方式。手指上软的、黏的、滑的感觉，本身就是学吃饭的一部分，也让手指为以后自己抓东西吃做准备。",
    },
    watchFor: {
      en: "Use only foods that are safe for the baby's age and soft enough to squash between your finger and thumb, and allergenic foods only once they have already been introduced. Keep the baby seated upright and watched for the whole meal, and end it when they push the tray away or turn their head.",
      zh: "只给适合宝宝月龄的食物，要软到用拇指和食指一捏就扁。容易过敏的食物，只用已经引入过的。整顿饭都让宝宝坐直、有人看着，他把餐盘推开或者扭头不要了，就结束。",
    },
  },

  // ——— 7 months: naming how things feel ———
  {
    slug: "cool-and-warm",
    title: { en: "Cool and warm", zh: "凉凉的，暖暖的" },
    activity: "play",
    area: "senses",
    fromMonths: 7,
    toMonths: 12,
    steps: [
      { en: "Wet two washcloths, one with cool tap water and one with warm.", zh: "打湿两块小毛巾，一块用凉的自来水，一块用温水。" },
      { en: "Test the warm one on the inside of your wrist first.", zh: "温的那块，先在你手腕内侧试一下。" },
      { en: "Let the baby touch the cool one as you say “cool”, then the warm one as you say “warm”.", zh: "让宝宝摸摸凉的那块，你说“凉凉的”，再摸温的那块，你说“暖暖的”。" },
      { en: "Let them go back and forth, and watch which one they reach for.", zh: "让他来回摸，看看他更想去拿哪一块。" },
    ],
    why: {
      en: "A baby feels warm and cool all day long without a word for either. Touching the two side by side, with a word for each, makes the difference clear and gives the baby their first words for how things feel.",
      zh: "宝宝一整天都在感受冷和暖，却还没有词来形容。两块毛巾挨着摸，每种感觉配一个词，差别一下就清楚了，宝宝也有了描述感觉的第一批词。",
    },
    watchFor: {
      en: "Check the warm cloth on the inside of your wrist before it touches the baby — comfortably warm, never hot. Keep hot water and hot mugs out of the game and out of reach, and never put anything straight from the freezer on the baby's skin.",
      zh: "温毛巾碰到宝宝之前，先在你手腕内侧试一下——是舒服的温，绝不能烫。热水和热杯子都不要拿来玩，也要放到他够不着的地方。刚从冷冻室拿出来的东西，绝不要直接贴在宝宝皮肤上。",
    },
  },
];
