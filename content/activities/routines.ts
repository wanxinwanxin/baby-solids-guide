import type { MovementIdea } from "@/content-schema/activity-ideas";

/**
 * Activity ideas for the "routines" area. Each idea is written in our own words
 * from the idea alone, and follows the house rules in movement.ts.
 */
export const routinesIdeas: MovementIdea[] = [
  {
    slug: "hands-on-the-bottle",
    title: { en: "Hands on the bottle", zh: "小手扶奶瓶" },
    activity: "play",
    area: "routines",
    fromMonths: 4,
    toMonths: 9,
    steps: [
      { en: "Hold the baby semi-upright in the crook of your arm for the bottle.", zh: "喂奶的时候，让宝宝半坐着靠在你的臂弯里。" },
      { en: "Bring the bottle close and let their hands find it.", zh: "把奶瓶递到他面前，让他的小手自己摸上来。" },
      { en: "Keep your own hand on the bottle while theirs rest on it beside yours.", zh: "你的手一直握着奶瓶，他的小手就搭在你的手旁边。" },
    ],
    why: {
      en: "For a young baby, feeding is something that happens to them. Hands on the bottle make them part of it, and holding on with both hands in front of the body is good practice for the two hands working together.",
      zh: "对小宝宝来说，喂奶一直是别人替他做的事。小手扶上奶瓶，他就成了参与的人。而两只手一起在身体正前方抓住东西，也正好练了双手配合。",
    },
    watchFor: {
      en: "Keep holding the bottle yourself, even when the baby's grip looks strong. Never prop a bottle on a pillow or leave a baby to feed alone, and never put a baby to bed with a bottle — propping is a choking risk, and milk in the mouth at sleep can lead to tooth decay.",
      zh: "就算宝宝看起来抓得很牢，你也要一直握着奶瓶。不要把奶瓶架在枕头上让宝宝自己吃，也不要让宝宝含着奶瓶睡觉——架着奶瓶喂容易呛到，睡觉时嘴里含着奶还容易蛀牙。",
    },
  },
  {
    slug: "a-song-for-bath-time",
    title: { en: "A song for bath time", zh: "洗澡歌" },
    activity: "sing",
    area: "routines",
    fromMonths: 5,
    toMonths: 12,
    steps: [
      { en: "Pick one short song or phrase for each part of the day — one for the bath, one for bed, one for meals. A made-up tune works well.", zh: "给一天里的几件事各挑一首短歌或一句话——洗澡一首，睡觉一首，吃饭一首。自己随口编的调子就很好。" },
      { en: "Sing the bath song as you carry the baby to the bath, before the water.", zh: "抱宝宝去洗澡的路上就唱洗澡歌，在下水之前唱。" },
      { en: "Use the same words and the same tune every time.", zh: "每次都用一样的词、一样的调。" },
    ],
    why: {
      en: "A baby cannot read a clock, but they can learn that one song always comes before the water. Knowing what comes next makes a change easier to accept, and the song becomes a small signal that the day is moving on.",
      zh: "宝宝看不懂钟表，但能记住：这首歌一唱，接下来就要洗澡了。知道下一步是什么，宝宝就更容易接受变化，这首歌也成了一个小小的信号：一天在往前走。",
    },
    watchFor: {
      en: "Never leave the baby alone in the bath, not even for a moment to fetch a towel — a baby can drown in a few centimeters of water, quickly and without a sound. Gather everything you need before the water goes in, and if you must leave, wrap the baby in a towel and take them with you.",
      zh: "绝不能把宝宝单独留在澡盆里，哪怕只是转身去拿条毛巾——几厘米深的水就能让宝宝溺水，而且又快又没有声音。放水之前先把要用的东西都备齐。如果一定要走开，就用浴巾把宝宝裹起来一起带走。",
    },
  },
  {
    slug: "same-seat-name-the-food",
    title: { en: "Same seat, name the food", zh: "固定座位，说出食物的名字" },
    activity: "play",
    area: "routines",
    fromMonths: 6,
    toMonths: 12,
    steps: [
      { en: "Serve each meal in the same high chair, pulled up to the family table.", zh: "每顿饭都让宝宝坐同一把餐椅，拉到全家吃饭的桌边。" },
      { en: "Before each bite, hold the food where the baby can see it.", zh: "每一口之前，先把食物拿到宝宝看得见的地方。" },
      { en: "Say its name plainly, like “carrot”, then offer it.", zh: "清清楚楚地说出它的名字，比如“胡萝卜”，然后再喂给他。" },
    ],
    why: {
      en: "The same seat at the same table tells the baby that a meal is starting before the first bite. Hearing a food's name each time it appears links the word to the taste, the color, and the feel in the mouth.",
      zh: "同一把椅子、同一张桌子，还没吃第一口，宝宝就知道要吃饭了。每次看到一样食物都听到它的名字，名字就和味道、颜色、嘴里的口感连在了一起。",
    },
    watchFor: {
      en: "Seat the baby upright with the straps done up, and stay at the table for the whole meal. Turn screens off, so the baby's attention is on the food and on your face.",
      zh: "宝宝要坐直、系好安全带，整顿饭你都要在桌边。把屏幕都关掉，让他的注意力放在食物和你的脸上。",
    },
  },
  {
    slug: "open-cup-sips",
    title: { en: "Sips from an open cup", zh: "用小敞口杯喝水" },
    activity: "play",
    area: "routines",
    fromMonths: 6,
    toMonths: 12,
    steps: [
      { en: "Pour a little water into a small open cup, a few sips at most.", zh: "在一个小敞口杯里倒一点水，最多够喝几口。" },
      { en: "Hold it to the baby's lower lip and tip it just enough for one sip.", zh: "把杯子贴着宝宝的下嘴唇，倾斜到刚好能喝一小口。" },
      { en: "Wait for the swallow before you offer the next sip.", zh: "等他咽下去，再喂下一口。" },
      { en: "Later, put their hands on the cup with yours and drink together.", zh: "过一阵子，让他的手和你的手一起扶着杯子喝。" },
    ],
    why: {
      en: "Drinking from an open cup takes months of small sips and spills to learn, and around six months, when solids start, is a good time to begin. The lips have to close on the rim and control the flow, which a bottle never asks of them.",
      zh: "从敞口杯里喝水，要经过好几个月的小口练习和洒洒漏漏才能学会。六个月左右开始吃辅食的时候，正是开始练的好时机。嘴唇要贴住杯沿、控制水流，这是用奶瓶时从来不需要的动作。",
    },
    watchFor: {
      en: "Plain water only, a few sips at a time. Water does not replace breast milk or formula, which stay the main drink until twelve months, and no juice before twelve months. Keep the baby seated upright, and stop if they cough or turn away.",
      zh: "只喝白开水，每次几口就够。水不能代替母乳或配方奶，一岁以前奶仍然是主要的饮品，一岁以前也不要喝果汁。宝宝要坐直，一呛咳或者扭头不喝，就停下。",
    },
  },
  {
    slug: "hold-a-loaded-spoon",
    title: { en: "Hold a loaded spoon", zh: "自己拿勺子吃" },
    activity: "play",
    area: "routines",
    fromMonths: 7,
    toMonths: 12,
    steps: [
      { en: "Load a short, soft-tipped spoon with thick puree.", zh: "用一把短柄软头的勺子，舀上一勺稠一点的泥。" },
      { en: "Hold it out handle first and let the baby take it.", zh: "把勺柄朝着宝宝递过去，让他自己接。" },
      { en: "Let them bring it to their mouth, even if most of it lands on the chin.", zh: "让他自己往嘴里送，就算大半都吃到了下巴上也没关系。" },
      { en: "Load a second spoon while they work on the first.", zh: "他忙着吃这一勺的时候，你把下一勺舀好。" },
    ],
    why: {
      en: "Getting a spoon to the mouth is a chain of small skills: grip, lift, aim, and turn. Thick puree stays on the spoon, so the effort ends in a taste, and that reward keeps the baby trying.",
      zh: "把勺子送进嘴里，是一串小动作连起来的：握住、抬起、对准、翻转。稠的泥不容易掉，宝宝努力一下就能尝到味道，这个奖励会让他一直愿意试。",
    },
    watchFor: {
      en: "Seat the baby upright and stay beside them. Gagging is noisy and common while they learn — it is the body pushing food forward. Choking is silent: if the baby cannot cry, cough, or breathe, start infant choking first aid (back blows and chest thrusts) and call emergency services.",
      zh: "宝宝要坐直，你守在旁边。学的过程中干呕很常见，声音很大，那是身体在把食物往前推。真正的噎住是没有声音的：宝宝哭不出、咳不出、喘不上气，就要立刻做婴儿噎呛急救（拍背和胸部按压），同时拨打急救电话。",
    },
  },
  {
    slug: "arm-through-the-sleeve",
    title: { en: "Push your arm through", zh: "小手钻袖子" },
    activity: "play",
    area: "routines",
    fromMonths: 8,
    toMonths: 14,
    steps: [
      { en: "Gather the sleeve up and hold it open at the baby's hand.", zh: "把袖子堆拢，在宝宝手边撑开袖口。" },
      { en: "Say “push your arm through”, and wait for the push.", zh: "说一句“小手伸进来”，然后等他自己往里伸。" },
      { en: "When the hand comes out at the cuff, say hello to it.", zh: "小手从袖口钻出来的时候，跟它打个招呼。" },
    ],
    why: {
      en: "A baby who pushes an arm through is helping to get dressed. It is an early way to join in with a routine, and the words “push your arm through” become a request they learn to understand and answer.",
      zh: "自己把胳膊伸进袖子的宝宝，是在帮你一起穿衣服。这是参与日常小事的一个开始，而“小手伸进来”这句话，也会慢慢变成他能听懂、会回应的请求。",
    },
    watchFor: {
      en: "Guide at the elbow or the upper arm, and never pull the arm through by the hand or wrist — a sharp tug can slip the elbow out of place, which is called nursemaid's elbow. If the baby fights it, stop the game and finish dressing quickly.",
      zh: "引导的时候扶着手肘或上臂，不要拉着手或手腕往袖子里拽——猛地一拉，可能造成肘关节半脱位（也叫“牵拉肘”）。宝宝要是不配合，就别玩了，快点把衣服穿好。",
    },
  },
];
