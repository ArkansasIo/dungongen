import { CAMPAIGN_EXPANSIONS } from "./expansions.js";
import { STORY_CAMPAIGN } from "./storyCampaign.js";

export type QuestKind = "main" | "side";
export type QuestObjective =
  | "explore" | "investigate" | "defeat" | "collect" | "escort"
  | "defend" | "dialogue" | "craft" | "deliver" | "stealth" | "boss";

export interface GeneratedQuest {
  id: string; campaignId: string; expansionId?: string;
  act: number; chapter: number; index: number; kind: QuestKind;
  title: string; summary: string; objective: QuestObjective; required: number;
  xpReward: number; currencyReward: number; lootTableId: string; prerequisiteIds: string[];
}

export interface LootEntry {
  templateId: string; rarity: string; weight: number; minQuantity: number; maxQuantity: number;
}
export interface LootRoll { templateId: string; rarity: string; quantity: number; }

const OBJECTIVES: QuestObjective[] = [
  "explore","investigate","defeat","collect","escort","defend","dialogue","craft","deliver","stealth"
];
const CHAPTER_LABELS = [
  "First Signs","The Long Road","A Door Opens","The Hidden Faction","The Great Confrontation"
];
const RARITIES = [
  "common","fine","superior","rare","epic","mythic","ancient","exalted","transcendent"
];

function hashSeed(seed: string): number {
  let hash = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    hash ^= seed.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function random01(seed: string): number {
  return hashSeed(seed) / 0xffffffff;
}

function rarityForProgress(progress: number): string {
  return RARITIES[Math.min(RARITIES.length - 1, Math.max(0, Math.floor(progress * RARITIES.length)))];
}

export function rollQuestLoot(table: { entries: LootEntry[] }, seed: string, rolls = 1): LootRoll[] {
  if (!Number.isInteger(rolls) || rolls < 1) throw new Error("rolls must be a positive integer");
  const totalWeight = table.entries.reduce((sum, entry) => sum + Math.max(0, entry.weight), 0);
  if (totalWeight <= 0) throw new Error("loot table has no positive weights");

  return Array.from({ length: rolls }, (_, index) => {
    const pick = random01(seed + ":" + index) * totalWeight;
    let cursor = 0;
    const entry = table.entries.find((candidate) => {
      cursor += Math.max(0, candidate.weight);
      return pick < cursor;
    }) ?? table.entries[table.entries.length - 1];
    const range = Math.max(0, entry.maxQuantity - entry.minQuantity);
    return {
      templateId: entry.templateId,
      rarity: entry.rarity,
      quantity: entry.minQuantity + Math.floor(random01(seed + ":qty:" + index) * (range + 1))
    };
  });
}

export function generateExpansionQuests(expansionNumber: number): GeneratedQuest[] {
  const expansion = CAMPAIGN_EXPANSIONS.find((item) => item.number === expansionNumber);
  if (!expansion) throw new Error(`Unknown expansion: ${expansionNumber}`);

  const quests: GeneratedQuest[] = [];
  for (let act = 1; act <= expansion.acts; act++) {
    for (let chapter = 1; chapter <= expansion.chaptersPerAct; chapter++) {
      for (let n = 1; n <= 2; n++) {
        const kind: QuestKind = n === 1 ? "main" : "side";
        const index = 1;
        const objective: QuestObjective =
          chapter === expansion.chaptersPerAct && n === 1 ? "boss" : OBJECTIVES[(act + chapter + n) % OBJECTIVES.length];
        quests.push({
          id: `${expansion.id}-act-${act}-chapter-${chapter}-${kind}-${index}`,
          campaignId: expansion.id,
          expansionId: expansion.id,
          act, chapter, index, kind,
          title: `${CHAPTER_LABELS[chapter - 1]} ${kind === "main" ? "Mission" : "Optional Task"} ${act}.${chapter}`,
          summary: `Advance the original story of ${expansion.title} through its ${expansion.theme} setting.`,
          objective,
          required: objective === "boss" ? 1 : 2 + ((act + chapter + n) % 4),
          xpReward: (kind === "main" ? 700 : 350) + act * 150 + chapter * 60,
          currencyReward: (kind === "main" ? 100 : 50) + act * 25 + chapter * 5,
          lootTableId: `expansion-${expansion.number}-${rarityForProgress((act - 1) / Math.max(1, expansion.acts - 1))}`,
          prerequisiteIds: kind === "main"
            ? (chapter === 1 && act > 1
              ? [`${expansion.id}-act-${act - 1}-chapter-${expansion.chaptersPerAct}-main-1`]
              : chapter > 1
                ? [`${expansion.id}-act-${act}-chapter-${chapter - 1}-main-1`]
                : [])
            : [`${expansion.id}-act-${act}-chapter-${chapter}-main-1`]
        });
      }
    }
  }
  return quests;
}

export function getBaseCampaignQuests(): GeneratedQuest[] {
  return STORY_CAMPAIGN.quests.map((quest, index) => ({
    id: quest.id,
    campaignId: STORY_CAMPAIGN.id,
    act: quest.act,
    chapter: quest.chapter,
    index: index + 1,
    kind: quest.kind,
    title: quest.title,
    summary: quest.description,
    objective: quest.objective as QuestObjective,
    required: quest.required,
    xpReward: quest.xpReward,
    currencyReward: quest.goldReward,
    lootTableId: quest.lootTableId,
    prerequisiteIds: quest.prerequisiteIds
  }));
}

export function getCampaignStats() {
  const base = getBaseCampaignQuests();
  const expansions = CAMPAIGN_EXPANSIONS.flatMap((expansion) => generateExpansionQuests(expansion.number));
  const all = [...base, ...expansions];
  return {
    baseQuests: base.length,
    expansionQuests: expansions.length,
    totalQuests: all.length,
    mainQuests: all.filter((quest) => quest.kind === "main").length,
    sideQuests: all.filter((quest) => quest.kind === "side").length
  };
}
