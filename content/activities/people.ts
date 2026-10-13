import type { MovementIdea } from "@/content-schema/activity-ideas";

/**
 * Activity ideas for the "people" area. Each idea is written in our own words
 * from the idea alone, and follows the house rules in movement.ts.
 */
export const peopleIdeas: MovementIdea[] = [
  {
    slug: "mirror-play",
    title: { en: "Who's in the mirror?", zh: "镜子里是谁？" },
    activity: "play",
    area: "people",
    fromMonths: 4,
    toMonths: 12,
    steps: [
      { en: "Hold the baby in front of a shatterproof baby mirror, or stand it beside them during tummy time.", zh: "抱着宝宝站在宝宝专用的防碎镜前，或者趴着玩的时候把镜子立在他旁边。" },
      { en: "Point to the baby in the mirror and say their name.", zh: "指着镜子里的宝宝，叫他的名字。" },
      { en: "Make a face — a big smile, a surprised mouth — and wait to see what they do.", zh: "做个表情——咧嘴大笑，或者惊讶地张大嘴——等着看他怎么反应。" },
      { en: "Point to yourself in the mirror and say “Mommy” or “Daddy”.", zh: "再指指镜子里的你，说“妈妈”或者“爸爸”。" },
    ],
    why: {
      en: "Babies love faces, and a mirror shows them two at once that move when they move. It will be a long while before they know the face in the mirror is their own, but the smiling, watching, and copying are all practice with people.",
      zh: "宝宝喜欢看脸，镜子一下给他两张，还会跟着他一起动。要过很久他才会知道镜子里的就是自己，但对着镜子笑、看、模仿，都是在练习和人打交道。",
    },
    watchFor: {
      en: "Use only a shatterproof baby mirror, held in your hand or fixed in place. Never put a glass mirror on the floor or lean one against a wall where the baby can tip it. Stop when the baby looks away.",
      zh: "只用宝宝专用的防碎镜，拿在手里或者固定好。绝不要把玻璃镜子放在地上，或者斜靠在宝宝能碰倒的墙边。宝宝转开头，就停下。",
    },
  },
  {
    slug: "copy-my-face",
    title: { en: "Copy my face", zh: "跟我做表情" },
    activity: "play",
    area: "people",
    fromMonths: 4,
    toMonths: 10,
    steps: [
      { en: "Hold the baby face to face, about thirty centimeters from you.", zh: "和宝宝面对面，离他三十厘米左右。" },
      { en: "Make one big, slow face: open your mouth wide, stick out your tongue, or raise your eyebrows.", zh: "慢慢做一个夸张的表情：张大嘴、吐舌头，或者把眉毛高高挑起来。" },
      { en: "Hold it, then wait several seconds for the baby to try.", zh: "保持一会儿，然后等几秒钟，看宝宝会不会学。" },
      { en: "When the baby makes a face, copy theirs back.", zh: "宝宝做出什么表情，你就学他的。" },
    ],
    why: {
      en: "Faces are the first thing a baby learns to read. Watching yours closely, and trying to move their own to match, is early practice in reading and sharing feelings — and copying them back tells them their face is worth answering.",
      zh: "脸是宝宝最先学着“读”的东西。仔细看你的脸、再试着让自己的脸跟着动，是在早早练习读懂和表达情绪；而你学回去，是在告诉他：他的表情值得回应。",
    },
    watchFor: {
      en: "Stop when the baby looks away, yawns, or starts to fuss — those are signs of too much input, not boredom. Keep each round short and try again after a rest.",
      zh: "宝宝转开头、打哈欠、开始闹，就停下——这是他接收的东西太多了，不是没兴趣。每轮都短一点，歇一会儿再来。",
    },
  },
  {
    slug: "pat-a-cake",
    title: { en: "Pat-a-cake", zh: "拍拍手" },
    activity: "sing",
    area: "people",
    fromMonths: 5,
    toMonths: 14,
    steps: [
      { en: "Sit the baby on your lap facing you, with your knees up behind their back.", zh: "让宝宝面朝你坐在你腿上，你把膝盖立起来，让他靠着。" },
      { en: "Clap your own hands slowly as you say “Pat-a-cake, pat-a-cake, baker's man”.", zh: "一边念拍手儿歌，比如“你拍一，我拍一”，一边慢慢拍你自己的手。" },
      { en: "Hold their forearms loosely and bring their hands together on the beat.", zh: "轻轻托住他的小臂，跟着节拍让他的两只手拍在一起。" },
      { en: "Let go and leave a gap, in case they want to clap on their own.", zh: "然后松开手，留一段空当，看他想不想自己拍。" },
    ],
    why: {
      en: "Clapping to a rhyme ties a sound, a beat, and a movement together, and the shared routine is one of the first real games a baby plays with you. Many babies play pat-a-cake back by their first birthday.",
      zh: "跟着儿歌拍手，把声音、节拍和动作连在了一起；而这个固定的小游戏，也是宝宝最早能和你一起玩的真正游戏之一。很多宝宝到一岁左右，就能和你玩拍手游戏了。",
    },
    watchFor: {
      en: "Guide gently at the forearms, and never swing or lift the baby by the hands or arms. A sudden pull can slip the elbow partly out of place, an injury called nursemaid's elbow. Stop if the baby pulls their hands away.",
      zh: "只在小臂上轻轻带动，千万不要拉着宝宝的手或胳膊把他甩起来、提起来。胳膊被猛地一拉，肘关节可能会错位，也就是常说的“牵拉肘”。宝宝把手抽回去，就停下。",
    },
  },
  {
    slug: "say-their-name",
    title: { en: "Say their name", zh: "多叫他的名字" },
    activity: "play",
    area: "people",
    fromMonths: 5,
    toMonths: 12,
    steps: [
      { en: "Say the baby's name each time you come into the room, before anything else.", zh: "每次走进房间，先叫宝宝的名字。" },
      { en: "Call it from a little way off, and smile when they turn to find you.", zh: "站远一点叫他，他转头找到你时，冲他笑一笑。" },
      { en: "Put their name into songs and rhymes in place of the name in the words.", zh: "唱歌、念儿歌的时候，把里面的名字换成他的。" },
    ],
    why: {
      en: "Hearing the same word with every greeting teaches the baby that this sound is about them. Turning to their name is also the first step toward answering when someone calls.",
      zh: "每次打招呼都听到同一个词，宝宝就会知道：这个声音说的是我。听到名字转过头，也是以后别人叫他时会回应的第一步。",
    },
    watchFor: {
      en: "Call in a normal voice, not a shout, and do not keep calling while the baby is busy with something — try again later. By about nine months, most babies look when they hear their name — it is one of the CDC milestones. If yours does not, mention it to the pediatrician.",
      zh: "用平常的音量叫，不要喊；宝宝正专心玩别的，就不要一直叫，过一会儿再试。到九个月左右，大多数宝宝听到自己的名字会转头看——这是美国疾控中心（CDC）列出的发育里程碑之一。如果你的宝宝还不会，跟儿科医生提一下。",
    },
  },
  {
    slug: "meet-new-people-slowly",
    title: { en: "Meet new people slowly", zh: "慢慢认识新面孔" },
    activity: "play",
    area: "people",
    fromMonths: 6,
    toMonths: 14,
    steps: [
      { en: "Hold the baby in your arms when a new person arrives.", zh: "有新面孔来的时候，你把宝宝抱在怀里。" },
      { en: "Ask the visitor to talk to you first, warmly, while the baby watches.", zh: "请客人先和你聊天，语气亲切，让宝宝在你怀里看着。" },
      { en: "After a while, have the visitor offer a toy without reaching for the baby.", zh: "过一会儿，再请客人递一个玩具过来，先别伸手抱宝宝。" },
      { en: "Let the baby decide whether to go closer.", zh: "要不要再靠近，让宝宝自己决定。" },
    ],
    why: {
      en: "A baby checks your face to decide whether something new is safe. Seeing you relaxed and chatting with a stranger gives them the answer, and letting them set the pace builds trust instead of fear.",
      zh: "宝宝会看你的脸色，来判断新的人和事安不安全。看到你和陌生人放松地聊天，他就有了答案；让他自己掌握节奏，建立起来的是信任，而不是害怕。",
    },
    watchFor: {
      en: "Fear of strangers is normal around eight to ten months, and it is a sign the baby knows who their people are. Do not hand over a crying baby to be won over. Anyone who is sick, or has a cold sore, waits for another visit.",
      zh: "八到十个月左右怕生很正常，这说明宝宝已经分得清谁是自己人。宝宝哭着的时候，不要硬塞给客人去哄。生病的人，或者嘴边长了唇疱疹的人，下次再来看宝宝。",
    },
  },
  {
    slug: "babies-together",
    title: { en: "Time with other babies", zh: "和别的宝宝待一会儿" },
    activity: "play",
    area: "people",
    fromMonths: 7,
    toMonths: 14,
    steps: [
      { en: "Sit the baby on the floor near another baby or a toddler, with a grown-up beside each child.", zh: "让宝宝坐在地上，旁边是另一个小宝宝或者小朋友，每个孩子身边都有一个大人。" },
      { en: "Put out a few toys for each of them and let them play side by side.", zh: "每人面前放几个玩具，让他们挨着各玩各的。" },
      { en: "Let them watch each other — at this age, staring is the main event.", zh: "让他们互相看——这个月龄，盯着看就是最主要的“社交”。" },
      { en: "Say what the other child is doing: “Look, she is banging the drum.”", zh: "把另一个孩子在做的事说出来：“你看，姐姐在敲鼓。”" },
    ],
    why: {
      en: "Babies this age play next to each other rather than together, and they learn a great deal just from watching. Another child is the most interesting thing in the room, and copying them is how new ideas travel.",
      zh: "这个月龄的宝宝还不会一起玩，只会挨着玩，但光是看，就能学到很多。另一个孩子是房间里最有意思的东西，而模仿他，正是新本领传过来的方式。",
    },
    watchFor: {
      en: "Older children's toys often have small pieces, so clear the floor of anything small enough to choke on before the babies sit down. A child who is sick stays home for another day. Stay close, and step in for rough hugs, hair pulls, and toys grabbed from hands.",
      zh: "大一点的孩子的玩具常有小零件，宝宝坐下之前，先把地上小到能噎住的东西都清走。生病的孩子改天再来。大人要守在旁边，遇到抱得太用力、揪头发、抢东西，马上把他们分开。",
    },
  },
  {
    slug: "calm-no-and-redirect",
    title: { en: "A calm “no”, then something else", zh: "说“不行”，再给他别的" },
    activity: "play",
    area: "people",
    fromMonths: 7,
    toMonths: 14,
    steps: [
      { en: "When the baby reaches for something unsafe, say “No” once, calmly and briefly.", zh: "宝宝伸手去够危险的东西时，平静、简短地说一次“不行”。" },
      { en: "Move the baby, or move the thing, out of reach.", zh: "把宝宝抱开，或者把东西拿走。" },
      { en: "Offer something they can have instead, and name it: “Here's the cup.”", zh: "递给他一样可以玩的东西，说出它的名字：“这个杯子给你。”" },
    ],
    why: {
      en: "A short, calm word followed every time by the same action is something a baby can learn. Offering something else gives the reach somewhere to go, and many babies begin to pause at “no” around their first birthday.",
      zh: "简短平静的一个词，每次后面都跟着同样的动作，这是宝宝学得会的。再给他一样别的东西，他伸出去的手就有了去处。很多宝宝到一岁左右，听到“不行”会停一下。",
    },
    watchFor: {
      en: "Never shout, slap hands, or shake a baby. Babies this age cannot yet hold back an impulse, so the real protection is moving hazards out of reach — cleaners, medicines, button batteries, cords, and outlets. The word “no” only starts the habit.",
      zh: "不要吼，不要打手，更不能摇晃宝宝。这个月龄的宝宝还管不住自己的冲动，真正的保护是把危险的东西放到他够不着的地方——清洁剂、药、纽扣电池、电线和插座。“不行”这个词，只是开始培养一个习惯。",
    },
  },
  {
    slug: "give-and-take",
    title: { en: "Give and take", zh: "你给我，我给你" },
    activity: "play",
    area: "people",
    fromMonths: 8,
    toMonths: 14,
    steps: [
      { en: "Hand the baby a toy and say, “Here you go.”", zh: "递给宝宝一个玩具，说：“给你。”" },
      { en: "Hold out an open hand and ask, “My turn?”", zh: "摊开手，问他：“给我玩一下好吗？”" },
      { en: "If they let go of it into your hand, say “Thank you!”", zh: "如果他松手放到你手里，就说：“谢谢！”" },
      { en: "Give it straight back, so the turn always comes around again.", zh: "马上还给他，让他知道东西总会回到自己手里。" },
    ],
    why: {
      en: "Letting go on purpose is a new skill at this age, and handing something over is the first step toward taking turns and, much later, sharing. Giving the toy straight back teaches that a turn is not a loss.",
      zh: "有意识地松手，是这个月龄刚出现的本领；把东西递给别人，是学会轮流、乃至很久以后学会分享的第一步。马上还给他，是在告诉他：轮一下，不会失去。",
    },
    watchFor: {
      en: "Never take a toy by force or pull it from the baby's grip. If they do not let go, that is fine — holding on is normal, and the game can wait. Use toys too big to fit in the mouth.",
      zh: "不要硬抢，也不要从宝宝手里往外拽。他不松手也没关系——抓着不放很正常，游戏可以以后再玩。玩具要大到放不进嘴里。",
    },
  },
];
