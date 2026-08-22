import type { Food } from "@/content-schema/food";
import { SOURCES } from "../sources";

const blueberry: Food = {
  slug: "blueberry",
  name: "Blueberry",
  aliases: [],
  category: "fruit",
  minAgeMonths: 6,
  ironRich: false,
  commonAllergen: null,
  chokingRisk: "high",
  chokingNotes:
    "A whole firm blueberry is small, round, and smooth — the classic geometry for plugging an infant airway. Mitigate by smashing every berry flat between your fingers or quartering large ones until chewing matures; only around 12 months, and only for soft ripe berries, is whole reasonable.",
  nutritionHighlights: [
    "Rich in anthocyanins, the antioxidant pigments that give the berries their color",
    "A source of vitamin C and gentle fiber",
  ],
  prepSpecs: [
    {
      band: "6-8m",
      form: "Each blueberry individually smashed flat between your thumb and forefinger into a little pancake, or large berries quartered lengthwise, then served alone or stirred into oatmeal or yogurt.",
      passFailTest:
        "Scan the tray: no berry should still be round. Every piece should already be flattened or cut so there is nothing left with a ball shape.",
      whyThisForm:
        "A six-month-old cannot chew a small round object before swallowing it, so removing the round shape in the kitchen — by smashing or quartering — is the only thing that makes blueberries safe this early.",
      prepSteps: [
        "Wash the berries and pick out any hard, shriveled, or underripe ones.",
        "Press each berry flat between two fingers, or quarter big berries from stem end to tip.",
        "Serve the flattened berries on the tray or stir them into a familiar puree or oatmeal.",
      ],
      commonMistakes: [
        "Tossing a handful of whole berries on the tray because they look tiny — small, round, and firm is the most dangerous combination there is.",
        "Smashing only most of the batch: one missed whole berry defeats the whole exercise.",
        "Using firm, sour early-season berries that resist flattening — save those for baking.",
      ],
      cutDiagram: "quarter-lengthwise",
      media: [],
    },
    {
      band: "9-12m",
      form: "Blueberries still served flattened between your fingers or quartered lengthwise, now offered a few at a time as pincer-grasp practice pieces.",
      passFailTest:
        "Press a berry between two fingers before it goes on the tray — a serve-ready berry squashes flat easily, and anything that resists gets quartered instead.",
      whyThisForm:
        "Flattened berries are perfect pincer-grasp targets for a 9-month-old, but chewing is still too immature to trust with an intact round berry.",
      prepSteps: [
        "Flatten or quarter each berry exactly as before.",
        "Scatter three or four pieces at a time so the baby practices precise pick-ups without stuffing.",
        "Batch-smash a cup of berries with a fork on a cutting board to speed up prep.",
      ],
      commonMistakes: [
        "Relaxing to whole berries because the baby now has a few front teeth — front teeth don't grind, molars do.",
        "Serving so many at once that the baby palms a fistful into one cheek.",
      ],
      cutDiagram: "quarter-lengthwise",
      media: [],
    },
    {
      band: "12-24m",
      form: "Soft, ripe blueberries may go whole around 12 months for a toddler who chews well, while any firm berry still gets the finger-smash or a lengthwise quartering first.",
      passFailTest:
        "The two-finger test decides berry by berry: a berry that squashes flat with light pressure can be served whole; one that resists gets flattened or quartered.",
      whyThisForm:
        "By about a year, maturing chewing skills can manage a soft berry that collapses under gum pressure, but a firm berry is still an intact round plug and gets treated like one.",
      prepSteps: [
        "Sort the batch: squash-test a few — a soft ripe punnet can go whole, a firm one gets flattened.",
        "Keep seated, supervised eating as the rule; berries scattered for a walking toddler is asking for trouble.",
      ],
      commonMistakes: [
        "Treating the 12-month birthday as a switch — ripeness and chewing skill, not the calendar, are what make whole berries safe.",
      ],
      cutDiagram: "quarter-lengthwise",
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: ["yogurt", "oatmeal", "banana"],
  tips: [
    "Buy the biggest berries you can find — jumbo blueberries are far easier to quarter or flatten than tiny ones.",
    "Batch trick: spread a cup of berries on a cutting board and press them all at once with the flat of a fork or the bottom of a glass.",
    "Frozen blueberries thawed in a bowl come out softer than fresh and flatten almost on their own — a genuinely easier starting point.",
    "Stirred into oatmeal or yogurt, smashed berries stain less of the kitchen than loose ones rolling off the tray.",
  ],
  sources: [SOURCES.cdcChokingHazards, SOURCES.aapChoking, SOURCES.nhsFrom6Months],
  nutrients: ["vitaminC", "fiber"],
  servingGuidance: [
    {
      band: "6-8m",
      typicalAmount:
        "A small handful of flattened berries, solo or stirred into oatmeal — offer a few at a time and follow the baby's lead.",
    },
    {
      band: "9-12m",
      typicalAmount:
        "Three or four flattened berries or quarters at a time, refilled as the tray clears — the baby sets the total.",
    },
    {
      band: "12-24m",
      typicalAmount:
        "A small handful of squash-tested berries — some days they demolish it and ask for more, some days two is plenty.",
    },
  ],
  emoji: "🫐",
};

export default blueberry;
