export type QuestKind = "main" | "side";
export type QuestObjective = "explore" | "defeat" | "collect" | "escort" | "investigate" | "defend" | "boss";
export type LootRarity = "common" | "fine" | "superior" | "rare" | "epic" | "mythic" | "ancient" | "exalted" | "transcendent";

export interface QuestLootEntry {
  templateId: string;
  rarity: LootRarity;
  weight: number;
  minQuantity: number;
  maxQuantity: number;
}

export interface QuestLootTable {
  id: string;
  name: string;
  entries: QuestLootEntry[];
}

export interface CampaignQuest {
  id: string;
  act: number;
  chapter: number;
  kind: QuestKind;
  title: string;
  description: string;
  objective: QuestObjective;
  target: string;
  required: number;
  xpReward: number;
  goldReward: number;
  lootTableId: string;
  prerequisiteIds: string[];
}

export interface CampaignChapter {
  id: string;
  act: number;
  chapter: number;
  title: string;
  summary: string;
  mainQuestIds: string[];
  sideQuestIds: string[];
}

export interface CampaignAct {
  id: string;
  act: number;
  title: string;
  synopsis: string;
  chapters: CampaignChapter[];
}

export interface StoryCampaign {
  id: string;
  title: string;
  version: string;
  acts: CampaignAct[];
  quests: CampaignQuest[];
  lootTables: QuestLootTable[];
}

const ACT_TITLES = [
  "The Ashen Road", "Echoes Beneath Stone", "The Broken Crown", "Wardens of the Wild",
  "The Drowned Archive", "Siege of Blackglass", "The Hollow Star", "Kingdoms in Shadow",
  "The Veiled Legion", "The Last Gate", "War of the Unbound", "Dawn Beyond the Ruins"
] as const;

const CHAPTER_TITLES = [
  "The First Omen", "A Road Divided", "Into the Unknown", "The Hidden Enemy", "The Turning Point"
] as const;

const MAIN_OBJECTIVES: QuestObjective[] = ["explore", "investigate", "defeat", "collect", "defend"];
const SIDE_OBJECTIVES: QuestObjective[] = ["collect", "defeat", "escort", "explore", "investigate"];

function slug(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function lootTier(act: number, chapter: number): LootRarity {
  const tier = Math.min(8, Math.floor((act - 1) / 2) + Math.floor((chapter - 1) / 3));
  return ["common", "fine", "superior", "rare", "epic", "mythic", "ancient", "exalted", "transcendent"][tier] as LootRarity;
}

function buildLootTables(): QuestLootTable[] {
  const rarities: LootRarity[] = ["common", "fine", "superior", "rare", "epic", "mythic", "ancient", "exalted", "transcendent"];
  return rarities.map((rarity, index) => ({
    id: `quest-loot-${rarity}`,
    name: `${rarity[0].toUpperCase() + rarity.slice(1)} Quest Cache`,
    entries: [
      { templateId: `weapon-${rarity}`, rarity, weight: 30, minQuantity: 1, maxQuantity: 1 },
      { templateId: `armor-${rarity}`, rarity, weight: 25, minQuantity: 1, maxQuantity: 1 },
      { templateId: `accessory-${rarity}`, rarity, weight: 15, minQuantity: 1, maxQuantity: 1 },
      { templateId: `crafting-${rarity}`, rarity, weight: 20, minQuantity: 2, maxQuantity: 6 },
      { templateId: `currency-${rarity}`, rarity, weight: 10, minQuantity: 10 + index * 10, maxQuantity: 30 + index * 50 }
    ]
  }));
}

export function buildStoryCampaign(): StoryCampaign {
  const quests: CampaignQuest[] = [];
  const acts: CampaignAct[] = [];

  for (let act = 1; act <= 12; act++) {
    const actId = `act-${act}`;
    const chapters: CampaignChapter[] = [];

    for (let chapter = 1; chapter <= 5; chapter++) {
      const chapterId = `${actId}-chapter-${chapter}`;
      const mainQuestIds: string[] = [];
      const sideQuestIds: string[] = [];
      const mainCount = chapter === 5 ? 3 : 2;
      const sideCount = chapter === 1 || chapter === 5 ? 1 : 2;

      for (let n = 1; n <= mainCount; n++) {
        const id = `${chapterId}-main-${n}`;
        const objective = chapter === 5 && n === mainCount ? "boss" : MAIN_OBJECTIVES[(act + chapter + n) % MAIN_OBJECTIVES.length];
        mainQuestIds.push(id);
        quests.push({
          id, act, chapter, kind: "main",
          title: `${CHAPTER_TITLES[chapter - 1]}: ${objective[0].toUpperCase() + objective.slice(1)}`,
          description: `Advance the campaign through ${ACT_TITLES[act - 1]} and uncover the next part of the ancient threat.`,
          objective, target: `act-${act}-chapter-${chapter}-objective-${n}`,
          required: objective === "boss" ? 1 : 3 + ((act + chapter + n) % 4),
          xpReward: 500 + act * 175 + chapter * 75 + n * 50,
          goldReward: 50 + act * 25 + chapter * 10 + n * 5,
          lootTableId: `quest-loot-${lootTier(act, chapter)}`,
          prerequisiteIds: n === 1 && chapter === 1 ? (act > 1 ? [`act-${act - 1}-chapter-5-main-3`] : []) : [`${chapterId}-main-${n - 1}`]
        });
      }

      for (let n = 1; n <= sideCount; n++) {
        const id = `${chapterId}-side-${n}`;
        const objective = SIDE_OBJECTIVES[(act + chapter + n) % SIDE_OBJECTIVES.length];
        sideQuestIds.push(id);
        quests.push({
          id, act, chapter, kind: "side",
          title: `Side Story ${act}.${chapter}.${n}: ${objective[0].toUpperCase() + objective.slice(1)}`,
          description: `Help a local character or faction while exploring the wider story surrounding ${ACT_TITLES[act - 1]}.`,
          objective, target: `side-${act}-${chapter}-${n}`,
          required: 2 + ((act + n) % 4),
          xpReward: 250 + act * 90 + chapter * 40,
          goldReward: 25 + act * 12 + n * 5,
          lootTableId: `quest-loot-${lootTier(act, chapter)}`,
          prerequisiteIds: []
        });
      }

      chapters.push({
        id: chapterId, act, chapter,
        title: CHAPTER_TITLES[chapter - 1],
        summary: `A chapter of ${ACT_TITLES[act - 1]}, building toward the act's central confrontation.`,
        mainQuestIds, sideQuestIds
      });
    }

    acts.push({
      id: actId, act, title: ACT_TITLES[act - 1],
      synopsis: `The heroes confront a new stage of the unfolding threat in ${ACT_TITLES[act - 1]}.`,
      chapters
    });
  }

  return {
    id: "d20ds-main-story",
    title: "The Chronicle of the Unbound",
    version: "1.0.0-alpha.1",
    acts,
    quests,
    lootTables: buildLootTables()
  };
}

export const STORY_CAMPAIGN = buildStoryCampaign();
