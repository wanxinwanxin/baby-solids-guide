import type { MovementIdea } from "@/content-schema/activity-ideas";

/**
 * Movement ideas, oldest gate first within each age window.
 *
 * The windows overlap on purpose. A baby who rolls at five months and a baby
 * who rolls at seven months are both ordinary, so an idea stays available
 * for a few months past the age it usually starts working.
 *
 * Ages are a guide to what usually works, never a target to hit. Every
 * `watchFor` names the sign to stop, because that is the field a tired
 * parent reads at eight in the evening.
 */
export const movementIdeas: MovementIdea[] = [
  // ——— 0–4 months: head control, and learning that the floor exists ———
  {
    slug: "chest-tummy-time",
    title: { en: "Tummy time on your chest", zh: "趴在你胸口" },
    activity: "tummy-time",
    fromMonths: 0,
    toMonths: 4,
    steps: [
      { en: "Lie back on a sofa or bed, propped at roughly forty-five degrees.", zh: "你半躺在沙发或床上，上身大约斜四十五度。" },
      { en: "Lay the baby tummy-down on your chest, face turned toward yours.", zh: "让宝宝趴在你胸口，脸朝着你。" },
      { en: "Talk and let the baby lift their head to find your face.", zh: "和宝宝说话，让他自己抬头找你的脸。" },
    ],
    why: {
      en: "The easiest possible tummy time. Your chest is warm and it slopes, so the baby works against much less gravity than the floor asks for — and the reward for lifting their head is your face.",
      zh: "这是最容易的趴卧。你的胸口是暖的，又是斜的，宝宝要对抗的重力比平地上小得多，而抬头的奖励就是看见你的脸。",
    },
    watchFor: {
      en: "Stay awake and keep your hand on the baby the whole time. If you feel yourself getting drowsy, stop and put the baby on their back in the crib — tummy time is only ever for an awake, watched baby.",
      zh: "全程保持清醒，手一直扶着宝宝。一旦你觉得自己要睡着，就结束，把宝宝仰面放回床上——趴卧只能在宝宝清醒、有人看着时进行。",
    },
  },
  {
    slug: "floor-tummy-time-short",
    title: { en: "First tummy time on the floor", zh: "第一次在地上趴" },
    activity: "tummy-time",
    fromMonths: 0,
    toMonths: 5,
    steps: [
      { en: "Spread a firm blanket on the floor, away from soft bedding and pillows.", zh: "在地上铺一张硬一点的毯子，旁边不要有软被子和枕头。" },
      { en: "Put the baby tummy-down and lie on the floor facing them.", zh: "让宝宝趴下，你也趴在地上，和他面对面。" },
      { en: "Aim for three to five minutes, two or three times a day, and build up from there.", zh: "先做三到五分钟，一天两三次，之后再慢慢加。" },
    ],
    why: {
      en: "Flat ground is harder than your chest, and that difficulty is the point: pushing up on the forearms is what builds the neck, shoulder, and back strength that rolling, sitting, and crawling are all made of.",
      zh: "平地比你的胸口难，而这个难度正是重点：用小臂撑起身体，练的是脖子、肩膀和背的力量，而翻身、坐和爬都建立在这上面。",
    },
    watchFor: {
      en: "Awake and watched, every time, with you on the floor beside them — and back in the crib on their back for any sleep. Fussing after a minute is normal at this age and is not a reason to push on: pick the baby up, try again later, and count the short attempts, because they add up.",
      zh: "每一次都必须是清醒的、有人看着的，你就在旁边的地上——一睡就仰面放回床上。这个月龄趴一分钟就开始闹很正常，不用硬撑：把宝宝抱起来，过一会儿再试，短短几次也算数。",
    },
  },
  {
    slug: "track-a-face",
    title: { en: "Follow my face", zh: "追着脸看" },
    activity: "play",
    fromMonths: 0,
    toMonths: 4,
    steps: [
      { en: "Hold your face about thirty centimeters above the baby's, close enough to be in focus.", zh: "把你的脸放在宝宝上方三十厘米左右，近到他能看清。" },
      { en: "Talk, then move your head slowly to one side and wait for the eyes to come with you.", zh: "一边说话，一边把头慢慢移到一侧，等宝宝的眼睛跟过来。" },
      { en: "Move back through the middle and over to the other side.", zh: "再慢慢移回中间，然后移到另一侧。" },
    ],
    why: {
      en: "A newborn sees a face more clearly than anything else in the room. Tracking it turns the eye muscles and the neck into one system, which is the beginning of reaching for what you look at.",
      zh: "新生儿看脸比看房间里任何东西都清楚。追着脸看，会把眼部肌肉和脖子练成一套动作，这是“看到什么就去拿什么”的起点。",
    },
    watchFor: {
      en: "Move slowly and stop if the baby looks away, arches, or goes still and glassy. Turning away is how a young baby says they have had enough input, not that they are bored.",
      zh: "动作要慢，如果宝宝转头躲开、身体后仰，或者眼神发直不动了，就停下。小宝宝转头是在说“我受不了了”，不是嫌没意思。",
    },
  },
  {
    slug: "bicycle-legs",
    title: { en: "Bicycle legs", zh: "蹬自行车" },
    activity: "exercise",
    fromMonths: 0,
    toMonths: 7,
    steps: [
      { en: "Lay the baby on their back and hold both shins gently.", zh: "让宝宝仰卧，轻轻握住他的两条小腿。" },
      { en: "Cycle the legs slowly, one bend as the other straightens.", zh: "慢慢交替蹬动，一条腿弯的时候另一条伸。" },
      { en: "Stop as soon as you feel the legs pushing back against you.", zh: "一感觉到腿在往回顶你，就停下。" },
    ],
    why: {
      en: "Slow hip and knee movement after a feed is comfortable, and it gives you a clear read on how the legs move — a baby who pushes back is telling you the hips are working well.",
      zh: "吃完奶之后慢慢活动髋和膝，宝宝会觉得舒服，你也能清楚看出腿的活动情况——会往回顶你的宝宝，说明髋关节很好。",
    },
    watchFor: {
      en: "Follow the baby's own range and never push a joint past where it stops easily. Resistance means stop, not press harder.",
      zh: "顺着宝宝自己的活动范围，不要把关节掰过它自然停住的位置。感觉到阻力就停，不要再用力。",
    },
  },
  {
    slug: "side-lying-settle",
    title: { en: "Side-lying play", zh: "侧躺着玩" },
    activity: "play",
    fromMonths: 0,
    toMonths: 5,
    steps: [
      { en: "Roll a towel and lay the baby on one side, back against the roll.", zh: "卷一条毛巾，让宝宝侧躺，背靠着毛巾卷。" },
      { en: "Put a rattle where the upper hand can find it.", zh: "把摇铃放在上面那只手能碰到的地方。" },
      { en: "Swap sides the next time, so both get a turn.", zh: "下一次换另一侧，两边轮着来。" },
    ],
    why: {
      en: "On their side the arms fall together in front of the chest, which is where hands discover each other. It also takes the pressure off the back of the head for a while.",
      zh: "侧躺的时候，两只手会自然落到胸前，双手就是在这里发现彼此的。同时也能让后脑勺歇一会儿，不用一直受压。",
    },
    watchFor: {
      en: "This is a play position and never a sleep position. Stay in the room, and put the baby on their back in the crib for any sleep, including a short one.",
      zh: "这只是玩的姿势，不是睡的姿势。你要留在房间里，宝宝一睡就仰面放回床上，就算只睡一小会儿也一样。",
    },
  },

  // ——— 3–7 months: rolling, reaching, and sitting with help ———
  {
    slug: "propped-forearm-push",
    title: { en: "Push up on the forearms", zh: "用小臂撑起来" },
    activity: "tummy-time",
    fromMonths: 3,
    toMonths: 8,
    steps: [
      { en: "With the baby on their tummy, slide a rolled towel under the chest, armpit to armpit.", zh: "宝宝趴着的时候，把一条卷好的毛巾垫在胸下，从一侧腋下到另一侧。" },
      { en: "Bring both forearms forward so the elbows sit under the shoulders.", zh: "把两只小臂往前摆，让肘部落在肩膀正下方。" },
      { en: "Put something worth looking at just above eye level.", zh: "在略高于视线的位置放一样值得看的东西。" },
    ],
    why: {
      en: "The towel lends the baby a few centimeters of height so the chest clears the floor, and from there the head comes up and the world opens out. This is the position crawling grows out of.",
      zh: "毛巾给宝宝垫高几厘米，胸口离开地面，头就能抬起来，视野一下打开。爬就是从这个姿势长出来的。",
    },
    watchFor: {
      en: "Use a firm towel roll, never a pillow or a cushion, and take it away the moment you leave the mat. Soft props and an unwatched baby are the combination to avoid.",
      zh: "用结实的毛巾卷，不要用枕头或靠垫，你一离开垫子就把它拿走。软垫子加上没人看着，正是要避免的组合。",
    },
  },
  {
    slug: "reach-for-a-dangling-toy",
    title: { en: "Reach for what you want", zh: "伸手去拿" },
    activity: "play",
    fromMonths: 3,
    toMonths: 8,
    steps: [
      { en: "Hold a light rattle within arm's reach of the baby, slightly off to one side.", zh: "把一个轻的摇铃举在宝宝手能碰到的距离，稍微偏向一侧。" },
      { en: "Wait. Let the baby swipe, miss, and try again without moving it closer.", zh: "等着。让宝宝去挥、去抓空，再试一次，你不要把玩具往近处递。" },
      { en: "Let them have it when they connect, then start again on the other side.", zh: "抓到了就给他，然后换另一侧重新开始。" },
    ],
    why: {
      en: "The misses are the practice. Every failed swipe is the arm and the eye calibrating against each other, and handing the toy over too early removes exactly the part that teaches.",
      zh: "抓空才是练习。每一次挥空，都是手臂和眼睛在互相校准，太早把玩具递过去，恰好拿掉了起作用的那一部分。",
    },
    watchFor: {
      en: "Keep it to a light, graspable toy with nothing on a string or a cord, and put away anything small enough to reach the mouth whole.",
      zh: "只用轻、好抓的玩具，不要带绳子或挂绳，能整个塞进嘴里的小东西都收走。",
    },
  },
  {
    slug: "assisted-rolling",
    title: { en: "Roll with a little help", zh: "帮一把翻身" },
    activity: "exercise",
    fromMonths: 3,
    toMonths: 8,
    steps: [
      { en: "Lay the baby on their back and bring one knee up and across the body.", zh: "让宝宝仰卧，把一侧膝盖抬起来，往身体另一边带。" },
      { en: "Pause there and wait — most of the turn comes from the baby once the hips lead.", zh: "在那里停一下，等一等——髋部一带头，剩下大半都是宝宝自己转的。" },
      { en: "Help the trailing arm out from underneath as they land on their tummy.", zh: "宝宝翻成趴着的时候，帮他把压在下面的那只手抽出来。" },
    ],
    why: {
      en: "Rolling starts at the hips, not the shoulders. Starting the turn with a knee shows the baby the shape of the movement and leaves the effort to them.",
      zh: "翻身是从髋部开始的，不是从肩膀。用膝盖带出这个动作，让宝宝看到它的样子，力气还是他自己出。",
    },
    watchFor: {
      en: "Guide, never twist, and stop if the arm gets trapped or the baby protests. Once rolling happens on its own, the changing table and the bed both stop being safe places to turn away from.",
      zh: "只做引导，不要扭转，手被压住或者宝宝抗议就停。宝宝一旦会自己翻身，尿布台和床都不再是能转身离开的地方。",
    },
  },
  {
    slug: "find-your-feet",
    title: { en: "Find your own feet", zh: "找到自己的脚" },
    activity: "exercise",
    fromMonths: 4,
    toMonths: 9,
    steps: [
      { en: "Lay the baby on their back and bring one foot up toward their hands.", zh: "让宝宝仰卧，把他的一只脚往手的方向抬。" },
      { en: "Let go once the hands take hold, and let them hang on by themselves.", zh: "手一抓住就松开，让他自己抓着。" },
      { en: "Put a bright sock on one foot if the feet have not been noticed yet.", zh: "如果他还没注意到自己的脚，就给一只脚穿上颜色鲜艳的袜子。" },
    ],
    why: {
      en: "Holding both feet curls the whole body into a ball, which is real work for the stomach muscles that later sit a baby up. The discovery matters as much as the exercise: these feet turn out to be attached to me.",
      zh: "两手抓住脚，身体会卷成一个球，这对以后帮宝宝坐起来的腹部肌肉来说是实实在在的锻炼。而这个发现和锻炼一样重要：原来这两只脚是长在我身上的。",
    },
    watchFor: {
      en: "Let the baby set how far the legs come up and stop if the hips resist at all. A loose sock comes off and goes in the mouth, so stay with them and take it away at the end.",
      zh: "腿抬多高由宝宝自己决定，髋部一有阻力就停。松的袜子会掉下来被塞进嘴里，所以你要在旁边，结束就把它拿走。",
    },
  },
  {
    slug: "supported-sitting",
    title: { en: "Sit inside your lap", zh: "坐在你腿中间" },
    activity: "exercise",
    fromMonths: 4,
    toMonths: 9,
    steps: [
      { en: "Sit on the floor with your legs in a V and the baby between them, facing out.", zh: "你坐在地上，两腿张成V字，宝宝坐在中间，面朝外。" },
      { en: "Support low, at the hips rather than the chest, and let the back do its own work.", zh: "扶的位置要低，扶髋部而不是胸口，让后背自己出力。" },
      { en: "Put a toy on the floor in front so the baby leans forward to get it.", zh: "在前面地上放个玩具，让宝宝往前倾去拿。" },
    ],
    why: {
      en: "Holding a baby at the chest does the work for them. Holding at the hips leaves the trunk something to do, and the small wobbles they correct are the muscles learning to sit alone.",
      zh: "扶胸口等于替宝宝把活干了。扶髋部，躯干才有事做，而他自己纠正的那些小晃动，就是肌肉在学怎么独立坐。",
    },
    watchFor: {
      en: "Your legs are the sides, so a tip-over lands on you. Skip the propped seats and cushions that hold a baby upright before they can get there alone.",
      zh: "你的腿就是两边的围挡，倒下来也是倒在你身上。不要用那种在宝宝还不会自己坐之前就把他撑直的坐垫和座椅。",
    },
  },

  // ——— 6–10 months: sitting steady, and getting across the room ———
  {
    slug: "sitting-reach-across",
    title: { en: "Reach across while sitting", zh: "坐着够远处" },
    activity: "exercise",
    fromMonths: 6,
    toMonths: 11,
    steps: [
      { en: "Sit the baby on the floor with a toy just out of reach on one side.", zh: "让宝宝坐在地上，把玩具放在一侧刚好够不到的地方。" },
      { en: "Wait while they turn, lean, and plant a hand to stay up.", zh: "等着看他转身、侧倾，然后撑一只手保持不倒。" },
      { en: "Move the toy to the other side and do it again.", zh: "把玩具换到另一侧，再来一次。" },
    ],
    why: {
      en: "Sitting still is only half of sitting. Leaning out past your own base and catching yourself with a hand is the reflex that decides whether a wobble becomes a bump on the head.",
      zh: "坐稳只是坐的一半。身体倾出重心之外、再用手撑住自己，这个反应决定了一次晃动会不会变成磕到头。",
    },
    watchFor: {
      en: "Clear the floor around the baby of hard edges first, and stay close enough to catch a fall backwards, which is the one they cannot yet stop.",
      zh: "先把宝宝周围地上的硬角清掉，人守在旁边，能接住向后倒——向后倒是他现在还挡不住的那一种。",
    },
  },
  {
    slug: "crawl-to-a-target",
    title: { en: "Crawl to something you want", zh: "爬去拿想要的东西" },
    activity: "exercise",
    fromMonths: 6,
    toMonths: 12,
    steps: [
      { en: "Put the baby on hands and knees and set a favorite toy a body length away.", zh: "让宝宝手膝着地，把他最喜欢的玩具放在一个身长远的地方。" },
      { en: "Press a flat palm against one foot so there is something to push off.", zh: "用手掌平贴住他的一只脚，给他一个可以蹬的地方。" },
      { en: "Let them get all the way there and keep the toy.", zh: "让他一路爬到，玩具就归他。" },
    ],
    why: {
      en: "A crawl needs a reason. A toy one body length away is close enough to be worth it and far enough to require real travel, and the hand at the foot gives the push-off that a smooth floor takes away.",
      zh: "爬需要一个理由。一个身长远的玩具，近到值得去拿，又远到必须真的移动，而贴在脚上的手，补上了光滑地板拿走的那个蹬力。",
    },
    watchFor: {
      en: "Once the baby covers ground, go around the room at their eye level and clear cords, cables, and anything on a low shelf that comes loose when pulled.",
      zh: "宝宝能移动之后，蹲到他的视线高度绕房间一圈，把电线、插头，以及矮架子上一拉就掉的东西都清掉。",
    },
  },
  {
    slug: "pass-it-hand-to-hand",
    title: { en: "Pass it hand to hand", zh: "两手倒着拿" },
    activity: "play",
    fromMonths: 6,
    toMonths: 11,
    steps: [
      { en: "Give the baby a light block or a teether in one hand.", zh: "给宝宝一只手里放一块轻的积木或牙胶。" },
      { en: "Offer a second one to the same hand, so the first has to move across.", zh: "再往同一只手递第二个，第一个就得倒到另一只手去。" },
      { en: "Say what happened and let them work out the order themselves.", zh: "把发生的事说出来，让他自己摸索先后顺序。" },
    ],
    why: {
      en: "Moving an object from one hand to the other means the two sides of the body are trading information. The same skill later loads a spoon and holds a cup steady with the other hand.",
      zh: "把东西从一只手换到另一只手，意味着身体两侧在交换信息。以后用勺子舀东西、另一只手扶稳杯子，靠的是同一种能力。",
    },
    watchFor: {
      en: "Everything offered will go in the mouth, so use objects too big to swallow, with no batteries, magnets, or parts that twist off.",
      zh: "给什么都会进嘴，所以只用大到吞不下去的东西，不能有电池、磁铁或者能拧下来的零件。",
    },
  },
  {
    slug: "peekaboo-under-a-cloth",
    title: { en: "Peekaboo under a cloth", zh: "盖布躲猫猫" },
    activity: "play",
    fromMonths: 6,
    toMonths: 13,
    steps: [
      { en: "Put a thin cloth over your own head and wait.", zh: "把一块薄布盖在你自己头上，等着。" },
      { en: "Let the baby pull it off, and be pleased when they do.", zh: "让宝宝把布拉下来，他一拉下来你就高兴起来。" },
      { en: "Next round, cover a toy instead and let them uncover that.", zh: "下一轮改成盖住一个玩具，让他自己揭开。" },
    ],
    why: {
      en: "Pulling the cloth away is a whole arm movement with a reason behind it, and the reason is worth more than the movement: things still exist when you cannot see them. Reaching under the cloth for a hidden toy is that idea becoming certain.",
      zh: "拉开布是一个有理由的整臂动作，而这个理由比动作本身更重要：看不见的东西依然存在。伸手到布下面去找藏起来的玩具，就是这个念头变确定的过程。",
    },
    watchFor: {
      en: "Use a single thin, breathable cloth and keep it in your hand between rounds. Nothing that covers a face stays on the mat with the baby.",
      zh: "只用一块薄的、透气的布，两轮之间拿在你手里。任何会盖住脸的东西，都不要留在垫子上和宝宝一起。",
    },
  },
  {
    slug: "blanket-on-the-grass",
    title: { en: "A blanket on the grass", zh: "草地上铺块毯子" },
    activity: "outdoors",
    fromMonths: 6,
    toMonths: 15,
    steps: [
      { en: "Find shade, spread a blanket, and sit the baby on it.", zh: "找一块阴凉地，铺好毯子，让宝宝坐上去。" },
      { en: "Fold one corner back so a hand or a foot reaches the grass.", zh: "把一角折回来，让手或脚能碰到草。" },
      { en: "Follow what they notice — a leaf, a bird, the wind in a tree.", zh: "跟着他注意到的东西走——一片叶子、一只鸟、树上的风。" },
    ],
    why: {
      en: "Grass, wind, and uneven ground give the hands and feet a kind of information a flat indoor floor never does, and the whole session costs you nothing but a blanket.",
      zh: "草、风和不平的地面，能给手和脚一种室内平地永远给不了的信息，而这一整场活动，你只需要一块毯子。",
    },
    watchFor: {
      en: "Keep a baby under six months out of direct sun and in the shade rather than in sunscreen. Check the ground for cigarette ends, glass, and anything small enough to reach a mouth.",
      zh: "六个月以下的宝宝要避开直射阳光，用阴凉而不是防晒霜。先检查地面有没有烟头、玻璃，以及小到能进嘴的东西。",
    },
  },

  // ——— 9–13 months: up onto the feet ———
  {
    slug: "pull-to-stand-at-the-couch",
    title: { en: "Pull up at the couch", zh: "扶着沙发站起来" },
    activity: "exercise",
    fromMonths: 9,
    toMonths: 15,
    steps: [
      { en: "Sit the baby facing the sofa and put a toy up on the cushion.", zh: "让宝宝面朝沙发坐着，把玩具放在坐垫上。" },
      { en: "Let them grab the edge and pull themselves up to standing.", zh: "让他自己抓住沙发边，把身体拉起来站住。" },
      { en: "Show them how to bend the knees and sit back down, which is the harder half.", zh: "教他怎么屈膝坐回去，这才是难的那一半。" },
    ],
    why: {
      en: "Getting up is mostly arms. Getting down is legs and nerve, and a baby who can only get up ends up stuck and shouting at the furniture until someone comes.",
      zh: "站起来主要靠手臂。坐下来靠腿，也靠胆子，而只会站起来的宝宝，只能卡在那里对着家具喊人来。",
    },
    watchFor: {
      en: "Anchor or remove anything that tips when it takes a baby's weight — floor lamps, bookcases, open drawers, the television. This is the month a room has to be checked for what comes down.",
      zh: "凡是承受宝宝体重就会倒的东西，都要固定或搬走——落地灯、书架、拉开的抽屉、电视。这个月就是该检查房间里有什么会倒下来的时候。",
    },
  },
  {
    slug: "cruise-along-the-couch",
    title: { en: "Cruise along the couch", zh: "扶着沙发横着走" },
    activity: "exercise",
    fromMonths: 9,
    toMonths: 16,
    steps: [
      { en: "Stand the baby holding the sofa and put a toy an arm's length along it.", zh: "让宝宝扶着沙发站好，把玩具放在沿着沙发一臂远的地方。" },
      { en: "Let them shuffle sideways to reach it, both hands on the cushion.", zh: "让他两手扶着坐垫，横着挪过去拿。" },
      { en: "Move the toy a little farther each time they arrive.", zh: "他每到一次，就把玩具再放远一点。" },
    ],
    why: {
      en: "Sideways steps with the hands taking some weight are how a baby learns to shift onto one leg. Standing on one leg for a moment is what a first unaided step actually is.",
      zh: "手上分担一部分体重、横着迈步，是宝宝学会把重心移到一条腿上的方式。而所谓第一步，其实就是能单腿站住那一瞬间。",
    },
    watchFor: {
      en: "Bare feet, or grip socks, on a floor you have checked for rugs that slide. Skip an infant walker — pediatric guidance is against them, and they get a baby to a hazard faster than you can cross the room.",
      zh: "光脚或者穿防滑袜，地面要先检查有没有会滑动的地毯。不要用学步车——儿科建议不使用，而且它能让宝宝比你穿过房间更快地到达危险的地方。",
    },
  },
  {
    slug: "push-a-weighted-box",
    title: { en: "Push a loaded box", zh: "推装了东西的箱子" },
    activity: "exercise",
    fromMonths: 9,
    toMonths: 16,
    steps: [
      { en: "Put a few books in a sturdy cardboard box so it slides without running away.", zh: "在结实的纸箱里放几本书，让它能推动又不会一下溜走。" },
      { en: "Stand the baby behind it with both hands on the near edge.", zh: "让宝宝站在箱子后面，两手扶住靠近自己的一边。" },
      { en: "Walk beside them across the room and back.", zh: "陪着他推过房间，再推回来。" },
    ],
    why: {
      en: "The weight is what makes this work. A box that slides too easily gets away and the baby falls forward, while a loaded one pushes back and becomes a walking frame that costs nothing.",
      zh: "重量正是有用的地方。太滑的箱子会溜走，宝宝就会往前扑，而装了东西的箱子会往回顶，变成一个不花钱的学步架。",
    },
    watchFor: {
      en: "Do this on a level floor, away from stairs and doorways. Add or remove books until the box moves steadily instead of sliding or sticking.",
      zh: "在平地上做，远离楼梯和门口。书可以加也可以减，直到箱子推起来是稳的，不会滑走也不会卡住。",
    },
  },
  {
    slug: "drop-it-in-the-bucket",
    title: { en: "Drop it in the bucket", zh: "扔进桶里" },
    activity: "play",
    fromMonths: 9,
    toMonths: 16,
    steps: [
      { en: "Set an open bucket or a pot on the floor with big blocks beside it.", zh: "在地上放一个敞口的桶或锅，旁边放几块大积木。" },
      { en: "Let the baby pick each one up and let go of it over the opening.", zh: "让宝宝一块块捡起来，在桶口上方松手放下去。" },
      { en: "Tip the bucket out and let them fill it again.", zh: "把桶倒空，让他再装一遍。" },
    ],
    why: {
      en: "Letting go on purpose is a separate skill from grasping, and it arrives later. It also involves sitting down, standing up, and bending over many times, which is more leg work than it looks.",
      zh: "有意识地松手和抓住是两种能力，而松手来得更晚。这个游戏还要反复坐下、站起、弯腰，腿上的运动量比看起来大。",
    },
    watchFor: {
      en: "Blocks bigger than the baby's mouth, and a light bucket that does nothing if it lands on a foot. Take away any container a baby could get their head inside.",
      zh: "积木要比宝宝的嘴大，桶要轻到掉在脚上也没事。任何宝宝能把头伸进去的容器都要拿走。",
    },
  },
  {
    slug: "cushion-hill-climb",
    title: { en: "Climb the cushion hill", zh: "爬靠垫小山" },
    activity: "exercise",
    fromMonths: 9,
    toMonths: 18,
    steps: [
      { en: "Pile two or three sofa cushions into a low slope on the floor.", zh: "把两三个沙发靠垫在地上堆成一个矮坡。" },
      { en: "Put something worth having at the top.", zh: "在坡顶上放一样值得拿的东西。" },
      { en: "Kneel on the far side and let them climb up and slide down.", zh: "你跪在另一侧，让他爬上去再滑下来。" },
    ],
    why: {
      en: "An uneven, soft slope makes every step a slightly different problem, so the ankles, knees, and hips have to solve each one. That is balance being built, and a flat floor cannot ask for it.",
      zh: "一个不平的软坡，让每一步都变成一个略有不同的问题，踝、膝和髋必须逐个解决。这就是平衡的建立过程，平地做不到这一点。",
    },
    watchFor: {
      en: "Keep the pile low, put it on a soft floor, and stay within arm's reach on the descending side. Break the pile up when the game ends, so it is not there to climb unwatched.",
      zh: "堆得矮一点，放在软地面上，人守在下坡那一侧、伸手就能碰到的距离。游戏结束就把靠垫拆掉，别留在那里让宝宝没人看着时去爬。",
    },
  },

  // ——— 12–19 months: walking, carrying, and stairs ———
  {
    slug: "carry-and-deliver",
    title: { en: "Carry it to someone", zh: "拿给别人" },
    activity: "exercise",
    fromMonths: 12,
    toMonths: 20,
    steps: [
      { en: "Hand the toddler something light but bulky, like a cushion or an empty box.", zh: "给宝宝一样轻但是占手的东西，比如靠垫或空盒子。" },
      { en: "Ask them to take it to another person in the room.", zh: "请他把东西送给房间里的另一个人。" },
      { en: "Have that person send it back.", zh: "让那个人再把东西送回来。" },
    ],
    why: {
      en: "Walking while holding something raises the difficulty a long way: the arms are busy, so they cannot help with balance, and a bulky object blocks the view of the floor.",
      zh: "抱着东西走路，难度上升很多：手臂占着，就帮不上平衡，而占手的东西还会挡住看地面的视线。",
    },
    watchFor: {
      en: "Light and soft only, nothing breakable, nothing with a hard corner at face height. Keep the route clear, since they cannot see their own feet.",
      zh: "只用轻的、软的东西，不要易碎的，也不要在脸的高度有硬角的。路线要清空，因为他看不见自己的脚。",
    },
  },
  {
    slug: "walk-on-uneven-ground",
    title: { en: "Walk on uneven ground", zh: "在不平的地面上走" },
    activity: "outdoors",
    fromMonths: 12,
    toMonths: 24,
    steps: [
      { en: "Find grass, sand, or a gentle slope in a park.", zh: "在公园找一片草地、沙地，或者一个缓坡。" },
      { en: "Hold one hand at first and let go when they are steady.", zh: "先牵一只手，等他站稳了就放开。" },
      { en: "Let them stop as often as they want to look at things.", zh: "让他想停多少次就停多少次，去看那些东西。" },
    ],
    why: {
      en: "Indoor floors are flat and honest, and they ask the ankles almost nothing. Grass and sand change under each step, which is the work that turns new walking into steady walking.",
      zh: "室内地面又平又老实，几乎不考验脚踝。草地和沙地每一步都在变化，而正是这种变化，把刚学会的走路练成稳当的走路。",
    },
    watchFor: {
      en: "Check the ground before you set them down, keep well back from water and roads, and expect more falls here than at home — that is the surface doing its job, on a surface that is kinder to land on.",
      zh: "放他下来之前先看看地面，离水和马路远一些，也要预料到这里会比家里摔得多——那正是这种地面在起作用，而它摔上去也更不疼。",
    },
  },
  {
    slug: "stair-practice-on-all-fours",
    title: { en: "Stairs on all fours", zh: "手脚并用上楼梯" },
    activity: "exercise",
    fromMonths: 12,
    toMonths: 22,
    steps: [
      { en: "Open the stair gate and sit on the step behind the toddler.", zh: "打开楼梯门，你坐在宝宝身后的台阶上。" },
      { en: "Let them go up on hands and knees, two or three steps only.", zh: "让他手膝并用往上爬，只爬两三级。" },
      { en: "Turn them around and teach coming down feet first, on their tummy.", zh: "把他转过来，教他趴着、脚朝前地下来。" },
    ],
    why: {
      en: "A toddler will meet stairs whether or not you practice, so the question is only whether they meet them with you sitting behind them. Coming down feet first is the half that prevents a head-first fall.",
      zh: "不管你练不练，宝宝都会遇到楼梯，唯一的区别是遇到的时候你有没有坐在他身后。脚朝前下来，正是能避免头朝下摔落的那一半。",
    },
    watchFor: {
      en: "Stay one step below them the entire time, within arm's reach. Close the gate the moment you finish — practicing stairs does not make a staircase safe to leave open.",
      zh: "全程待在他下面一级，保持伸手能碰到的距离。练完立刻关上楼梯门——练过楼梯并不等于楼梯可以敞开不管。",
    },
  },
  {
    slug: "squat-to-pick-up",
    title: { en: "Squat down and stand back up", zh: "蹲下再站起来" },
    activity: "exercise",
    fromMonths: 12,
    toMonths: 24,
    steps: [
      { en: "Scatter a handful of blocks around the toddler's feet.", zh: "在宝宝脚边撒一把积木。" },
      { en: "Hold the bucket at their chest height so they must stand up to post each one.", zh: "把桶举在他胸口的高度，这样每放一块他都得站起来。" },
      { en: "Keep going until the floor is clear.", zh: "一直玩到地上清空。" },
    ],
    why: {
      en: "Squatting and rising without a hand on the furniture is a real leg exercise, and holding the bucket high is what forces the full movement instead of a lean and a grab.",
      zh: "不扶家具地蹲下再起来，是实实在在的腿部运动，而把桶举高，正是逼出完整动作、而不是只弯个腰去抓的原因。",
    },
    watchFor: {
      en: "Bare feet on a non-slip floor, and stop when the squats turn into sitting down. Tired legs are how a good game becomes a hard landing.",
      zh: "光脚、地面防滑，一旦蹲变成直接坐下就停。腿累了，好玩的游戏就会变成一次重重的落地。",
    },
  },

  // ——— 18–25 months: running, kicking, and games with rules ———
  {
    slug: "kick-a-ball",
    title: { en: "Kick a ball", zh: "踢球" },
    activity: "exercise",
    fromMonths: 18,
    toMonths: 30,
    steps: [
      { en: "Put a light ball still on the floor, right in front of one foot.", zh: "把一个轻的球静止放在地上，就放在一只脚前面。" },
      { en: "Let them walk into it first — that is the beginning of a kick.", zh: "先让他直接走上去撞到球——踢就是从这里开始的。" },
      { en: "Later, hold a hand while they swing one leg at it.", zh: "之后可以牵着一只手，让他用一条腿去踢。" },
    ],
    why: {
      en: "A kick means standing on one leg and swinging the other, which is the hardest balance a toddler attempts. Walking into a still ball is the version that works months before the real kick arrives.",
      zh: "踢球意味着单腿站立、另一条腿摆动，这是这个阶段最难的平衡动作。走上去撞静止的球，是真正会踢之前好几个月就能做到的版本。",
    },
    watchFor: {
      en: "A light ball, away from furniture and glass, and never on a street or a driveway. A ball that rolls out of view is how a toddler follows it somewhere you did not intend.",
      zh: "球要轻，远离家具和玻璃，绝不能在马路或车道上玩。球一滚出视线，宝宝就会追着它跑到你没打算让他去的地方。",
    },
  },
  {
    slug: "animal-walks",
    title: { en: "Walk like animals", zh: "学动物走" },
    activity: "exercise",
    fromMonths: 18,
    toMonths: 30,
    steps: [
      { en: "Show them a bear walk, on hands and feet with the bottom up.", zh: "先做给他看：小熊走，手脚着地、屁股朝上。" },
      { en: "Then a duck waddle in a low squat, and a rabbit hop with both feet.", zh: "然后是鸭子走，蹲低了摇着走，再是兔子跳，两脚一起跳。" },
      { en: "Let them pick the next animal.", zh: "让他决定下一个学什么动物。" },
    ],
    why: {
      en: "Each animal loads the body differently — a bear walk puts weight through the shoulders, a duck waddle holds a deep squat, a rabbit hop needs both feet to leave the ground together. Together they cover more ground than any single exercise.",
      zh: "每种动物对身体的要求不一样——小熊走把重量压在肩上，鸭子走要一直保持深蹲，兔子跳要两脚同时离地。合起来，比任何单一动作练到的都多。",
    },
    watchFor: {
      en: "Clear floor, no hard corners, and let a hop wait until both feet leave the ground easily. Copy along and stop when they stop, rather than counting repetitions.",
      zh: "地面清空，没有硬角，跳可以等到两脚能轻松同时离地再练。你跟着一起做，他停你就停，不要数次数。",
    },
  },
  {
    slug: "dance-and-stop",
    title: { en: "Dance and stop", zh: "跳舞和停住" },
    activity: "play",
    fromMonths: 18,
    toMonths: 30,
    steps: [
      { en: "Put music on and dance with them.", zh: "放上音乐，和他一起跳。" },
      { en: "Stop the music and freeze completely still.", zh: "把音乐停掉，整个人一动不动。" },
      { en: "Start it again and carry on.", zh: "再放起来，继续跳。" },
    ],
    why: {
      en: "Stopping on cue is harder than moving. Holding still on purpose asks the brain to override a body already in motion, and that is the same control that will one day stop at a curb.",
      zh: "听信号停下来，比动起来更难。有意识地静住，要求大脑压住已经动起来的身体，而这正是将来走到路边会停住所用的同一种控制力。",
    },
    watchFor: {
      en: "Keep the volume moderate and the space clear of furniture edges. Follow their lead — if the freeze turns into falling over on purpose, that is a fine game too.",
      zh: "音量适中，场地里不要有家具的边角。跟着他的节奏——如果“停住”变成了故意往地上倒，那也是个不错的游戏。",
    },
  },
];
