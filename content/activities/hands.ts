import type { MovementIdea } from "@/content-schema/activity-ideas";

/**
 * Activity ideas for the "hands" area. Each idea is written in our own words
 * from the idea alone, and follows the house rules in movement.ts.
 */
export const handsIdeas: MovementIdea[] = [
  {
    slug: "two-handed-hold",
    title: { en: "Hold it with both hands", zh: "两只手一起抱住" },
    activity: "play",
    area: "hands",
    fromMonths: 4,
    toMonths: 8,
    steps: [
      { en: "Pick a toy too wide for one hand, like a soft fabric ring or a light ball.", zh: "挑一个一只手拿不住的玩具，比如布做的软圈，或者轻的球。" },
      { en: "With the baby on their back or sitting in your lap, hold it at the middle of their chest.", zh: "宝宝仰躺着或者坐在你腿上，你把玩具举在他胸口正中间。" },
      { en: "Wait until both hands close on it before you let go.", zh: "等两只手都抓牢了，你再松手。" },
    ],
    why: {
      en: "A toy too wide for one hand brings both hands to the middle of the body to share the job. Working as a pair in the middle is what later holds a cup steady, or turns a toy over to look at the other side.",
      zh: "一只手拿不住的玩具，会让两只手一起来到身体正中间，合力完成一件事。两只手在中间配合，正是以后端稳杯子、把玩具翻过来看另一面所靠的能力。",
    },
    watchFor: {
      en: "Use a toy bigger than the baby's mouth, with no parts that can come off. A quick check is an empty toilet-paper tube: anything that fits inside it is small enough to choke on, so keep it out of reach.",
      zh: "玩具要比宝宝的嘴大，不能有会掉下来的零件。有个简单的检查办法：能塞进空卫生纸卷筒里的东西，就小到能噎住宝宝，要放到他够不着的地方。",
    },
  },
  {
    slug: "heavy-and-light",
    title: { en: "Heavy and light", zh: "一轻一重" },
    activity: "play",
    area: "hands",
    fromMonths: 5,
    toMonths: 9,
    steps: [
      { en: "Take two small, matching plastic bottles: fill one halfway with water and leave the other empty.", zh: "找两个一样的小塑料瓶，一个灌半瓶水，一个空着。" },
      { en: "Screw both lids on as tight as they go.", zh: "两个盖子都拧到拧不动为止。" },
      { en: "Hand the baby the empty one first and let them hold it for a while.", zh: "先把空瓶递给宝宝，让他拿一会儿。" },
      { en: "Swap in the heavier one and watch the arm dip, then adjust.", zh: "再换成装了水的那个，看他的手臂先往下一沉，再调整过来。" },
    ],
    why: {
      en: "The dip is the interesting part: the arm was ready for the weight of the first bottle and had to correct. Holding things of different weights is how the hands and arms learn to match their effort to what they hold.",
      zh: "手臂往下一沉，正是有意思的地方：它准备好的是第一个瓶子的重量，只好临时调整。拿不同重量的东西，手和手臂就是这样学会按手里的东西来用力的。",
    },
    watchFor: {
      en: "Use small, sturdy plastic bottles, never glass, because sooner or later one lands on a face. A cap that comes off is small enough to choke on, so check the lids every time, and throw a bottle away at the first crack or leak.",
      zh: "用小的、结实的塑料瓶，绝不用玻璃瓶，因为迟早会砸到脸上。掉下来的瓶盖小到能噎住宝宝，所以每次都要检查盖子；一发现裂缝或者漏水，就把瓶子扔掉。",
    },
  },
  {
    slug: "bang-two-blocks",
    title: { en: "Bang two blocks together", zh: "两块积木对着敲" },
    activity: "play",
    area: "hands",
    fromMonths: 6,
    toMonths: 12,
    steps: [
      { en: "Sit facing the baby and put a block in each of their hands.", zh: "和宝宝面对面坐，在他两只手里各放一块积木。" },
      { en: "Take two blocks yourself and bang them together slowly, saying “bang” each time.", zh: "你自己也拿两块，慢慢地对着敲，每敲一下就说一声“咚”。" },
      { en: "Pause and wait for them to try. Any clack counts, even a lopsided one.", zh: "停下来，等他自己试。只要敲响了就算，歪着碰上也算。" },
    ],
    why: {
      en: "Hitting two things together means both arms aim at the same point at the same moment, which is harder than it looks. The clack is instant proof that it worked, and watching you first turns it into a copying game.",
      zh: "两样东西对着敲，意味着两只手臂要在同一时刻对准同一个点，这比看上去难。“咚”的一声就是成功的证明，而先看你做一遍，又让它变成了一个模仿游戏。",
    },
    watchFor: {
      en: "Use blocks bigger than the baby's mouth and light enough that a wild swing does no harm. Stop if the blocks start landing on their own face or fingers, and switch to soft fabric blocks for a while.",
      zh: "积木要比宝宝的嘴大，也要轻，挥偏了也伤不着人。如果积木开始砸到他自己的脸或手指，就停下，先换成布积木玩一阵。",
    },
  },
  {
    slug: "pull-scarves-from-a-box",
    title: { en: "Pull scarves from a box", zh: "从盒子里抽丝巾" },
    activity: "play",
    area: "hands",
    fromMonths: 7,
    toMonths: 12,
    steps: [
      { en: "Empty a tissue box and tear away the plastic film around the opening.", zh: "把一个纸巾盒掏空，撕掉开口处的那层塑料膜。" },
      { en: "Push three or four light scarves inside, with a corner of the first one poking out.", zh: "往里塞三四条轻薄的丝巾，第一条露出一个角。" },
      { en: "Let the baby pull them out one by one, then stuff them back in for another round.", zh: "让宝宝一条一条往外抽，抽完了再塞回去，玩下一轮。" },
    ],
    why: {
      en: "Pinching a corner and pulling against the light drag of the fabric gives the fingers and the wrist real work. And there is always one more inside, which keeps the baby reaching back in long after a single toy would have lost them.",
      zh: "捏住一个角，再顶着布料那一点点阻力往外拉，手指和手腕都得真正用上劲。而且盒子里总还有下一条，宝宝会一次又一次伸手进去，比玩一个玩具坚持得久得多。",
    },
    watchFor: {
      en: "Scarves are for play you are watching, and they go away the moment it ends, because fabric can wrap around a baby's neck. Choose plain scarves with no ribbons, strings, or tassels, and check that no plastic film is left on the box.",
      zh: "丝巾只在你看着的时候玩，一结束就收起来，因为布料可能缠住宝宝的脖子。选素面的丝巾，不要带丝带、绳子或流苏，也要检查盒口没有残留的塑料膜。",
    },
  },
  {
    slug: "crumple-and-tear-paper",
    title: { en: "Crumple and tear paper", zh: "揉纸撕纸" },
    activity: "play",
    area: "hands",
    fromMonths: 7,
    toMonths: 12,
    steps: [
      { en: "Give the baby a sheet of plain paper or a clean paper bag.", zh: "给宝宝一张白纸，或者一个干净的纸袋。" },
      { en: "Scrunch it into a ball and shake it, so they hear the crackle.", zh: "把纸揉成一团再晃一晃，让他听听沙沙的声音。" },
      { en: "Start a small tear at the edge and let them pull it the rest of the way.", zh: "在纸边先撕开一个小口，让他自己接着撕下去。" },
    ],
    why: {
      en: "Paper answers every movement with a sound and a change of shape, so the baby sees at once what their hands did. Tearing takes two hands pulling in opposite directions, which is a different kind of teamwork from holding.",
      zh: "纸对每一个动作都有回应，有声音，也会变形，宝宝马上就能看到自己的手做了什么。撕纸要两只手往相反的方向用力，这和两只手一起拿东西是另一种配合。",
    },
    watchFor: {
      en: "Torn paper goes straight into the mouth, so sit right beside the baby and take out any wet, chewed pieces. Use plain paper only: no glossy or printed paper, no tape or foil, and never a plastic bag, which can cling over the nose and mouth.",
      zh: "撕下来的纸会直接进嘴，所以要紧挨着宝宝坐，把湿了、嚼过的纸片掏出来。只用白纸：不要光面纸，也不要印了字和图案的纸，不要胶带和锡纸，更不能用塑料袋，它会贴住口鼻。",
    },
  },
  {
    slug: "rake-food-off-the-tray",
    title: { en: "Rake food off the tray", zh: "用手扒拉吃的" },
    activity: "play",
    area: "hands",
    fromMonths: 7,
    toMonths: 10,
    steps: [
      { en: "Strap the baby upright in the high chair and sit at the table with them.", zh: "让宝宝在高脚椅上坐直、系好安全带，你也在桌边陪着坐。" },
      { en: "Scatter a few soft pieces on the tray, food that squashes easily between your finger and thumb.", zh: "在餐盘上撒几小块软的食物，用你的拇指和食指一捏就扁的那种。" },
      { en: "Let them sweep the pieces in with the whole hand, however messy it gets.", zh: "让他用整只手把食物扒拉过来，弄得多乱都没关系。" },
    ],
    why: {
      en: "Before the fingers can pinch, the whole hand works like a rake, sweeping small things into a fist. Food on a tray gives that rake something worth collecting, and the reward goes straight into the mouth.",
      zh: "在手指学会捏之前，整只手就像一把耙子，把小东西扒进拳头里。餐盘上的食物，给了这把“耙子”值得去扒的东西，而奖励直接就送进嘴里。",
    },
    watchFor: {
      en: "The baby sits upright and strapped in, with an adult at the table for the whole meal. Keep to pieces that squash easily, and leave out the foods pediatric guidance names as choking hazards: whole nuts, raisins, whole grapes, and popcorn.",
      zh: "宝宝要坐直、系好安全带，整顿饭都要有大人在桌边。只给一捏就扁的小块，儿科建议里列为噎食风险的食物都不要给：整颗坚果、葡萄干、整颗葡萄和爆米花。",
    },
  },
  {
    slug: "pots-and-a-wooden-spoon",
    title: { en: "A pot and a wooden spoon", zh: "锅当鼓，勺当槌" },
    activity: "music",
    area: "hands",
    fromMonths: 7,
    toMonths: 14,
    steps: [
      { en: "Turn a pot upside down on the floor.", zh: "把一口锅倒扣在地上。" },
      { en: "Give the baby a wooden spoon and tap out a few beats yourself first.", zh: "给宝宝一把木勺，你先敲几下给他听。" },
      { en: "Let them bang, then copy their rhythm back to them.", zh: "让他自己敲，然后你照着他的节奏敲回去。" },
    ],
    why: {
      en: "A drum gives a big sound for a small movement, which makes cause and effect easy to see. Copying the baby's beats back turns the noise into a conversation, with turns and pauses, long before there are words for one.",
      zh: "小小一个动作就换来一声大响，因果关系一目了然。你照着他的节奏敲回去，噪音就变成了一场对话——早在会说话之前，他就在学你一下、我一下。",
    },
    watchFor: {
      en: "Set up on the floor well away from the stove, the oven, and anyone carrying hot food. Use a light pot and a smooth wooden spoon with no cracks or splinters, and stop if the noise makes the baby startle or cry.",
      zh: "在地上玩，远离灶台和烤箱，也别在端热菜的人会经过的地方。用轻一点的锅，木勺要光滑，没有裂缝和毛刺；如果声音让宝宝吓一跳或者哭了，就停下。",
    },
  },
  {
    slug: "pinch-a-pea",
    title: { en: "Pinch a pea", zh: "捏起一颗豌豆" },
    activity: "play",
    area: "hands",
    fromMonths: 8,
    toMonths: 12,
    steps: [
      { en: "Seat the baby upright and strapped in, with you at the table.", zh: "让宝宝在高脚椅上坐直、系好安全带，你在旁边陪着。" },
      { en: "Put one soft, pea-sized piece on the tray at a time, like a cooked pea or a blueberry pressed flat.", zh: "每次只往餐盘上放一小块豌豆大小的软食物，比如压扁的熟豌豆或者压扁的蓝莓。" },
      { en: "Wait while they work out how to pick it up with the thumb and first finger.", zh: "等着，让他自己琢磨怎么用拇指和食指把它捏起来。" },
    ],
    why: {
      en: "One small piece on an empty tray is too small to rake, so the fingers have to try something new. The thumb-and-finger pinch that comes out of it is the grip that later holds a crayon and does up a button.",
      zh: "空餐盘上只有一小块，太小了扒不起来，手指就得想新办法。由此练出来的拇指食指对捏，就是以后握蜡笔、扣扣子要用的那种抓法。",
    },
    watchFor: {
      en: "Press round foods like peas and blueberries flat first, because round is the shape that blocks a small airway. Keep the baby seated and watched, and practice only with soft food, never with beads, buttons, coins, or anything else small.",
      zh: "豌豆、蓝莓这类圆的食物要先压扁，因为圆形正是最容易堵住小气道的形状。宝宝要坐着、有人看着，而且只用软的食物来练，绝不用珠子、纽扣、硬币这类小东西。",
    },
  },
  {
    slug: "poke-and-point",
    title: { en: "Poke and point", zh: "戳一戳，指一指" },
    activity: "play",
    area: "hands",
    fromMonths: 8,
    toMonths: 14,
    steps: [
      { en: "Put a ball in each cup of a muffin tin, big enough to fill the cup.", zh: "在松饼烤盘的每个格子里放一个球，大到把格子占满。" },
      { en: "Show the baby how to poke one with a single finger, then dig it out.", zh: "做给宝宝看：伸出一根手指戳一戳，再把球抠出来。" },
      { en: "Around the house, point at things and name them, and see whether their finger follows.", zh: "平时在家里，你也指着东西说出名字，看看他的手指会不会跟着指。" },
    ],
    why: {
      en: "Using one finger on its own, with the others tucked away, is new control for a hand that has mostly grabbed with everything at once. The same finger later becomes a way to ask: pointing at what they want, then looking back to check that you saw.",
      zh: "单独伸出一根手指、其他手指收起来，对一只习惯整把抓的小手来说，是一种新的控制。这根手指以后还会变成提要求的方式：指着想要的东西，再回头看看你有没有看到。",
    },
    watchFor: {
      en: "Every ball must be too big to fit in the mouth: anything that slips inside an empty toilet-paper tube is too small. Check the tin for sharp or rusty edges before you hand it over.",
      zh: "每个球都要大到放不进嘴里：能塞进空卫生纸卷筒的就太小了。拿给宝宝之前，先检查烤盘边缘有没有锋利或生锈的地方。",
    },
  },
];
