import { getBaseCampaignQuests, rollQuestLoot, type GeneratedQuest } from "../campaign/campaignEngine.js";
import { STORY_CAMPAIGN } from "../campaign/storyCampaign.js";

export interface PlayerState {
  id: string;
  name: string;
  level: number;
  xp: number;
  currency: number;
  hp: number;
  maxHp: number;
  activeQuestIds: string[];
  completedQuestIds: string[];
  inventory: Array<{ templateId: string; rarity: string; quantity: number }>;
}

export interface GameState {
  version: 1;
  turn: number;
  campaignId: string;
  players: Record<string, PlayerState>;
}

export interface QuestProgressResult {
  questId: string;
  progress: number;
  required: number;
  completed: boolean;
  player: PlayerState;
  rewards: { xp: number; currency: number; loot: Array<{ templateId: string; rarity: string; quantity: number }> };
}

const XP_PER_LEVEL = 1000;

export function createGameState(): GameState {
  return { version: 1, turn: 0, campaignId: STORY_CAMPAIGN.id, players: {} };
}

export function createPlayer(id: string, name: string): PlayerState {
  if (!id.trim()) throw new Error("player id is required");
  if (!name.trim()) throw new Error("player name is required");
  return {
    id, name, level: 1, xp: 0, currency: 100, hp: 100, maxHp: 100,
    activeQuestIds: [], completedQuestIds: [], inventory: []
  };
}

export function addPlayer(state: GameState, player: PlayerState): GameState {
  if (state.players[player.id]) throw new Error("player already exists");
  return { ...state, players: { ...state.players, [player.id]: player } };
}

export function advanceTurn(state: GameState): GameState {
  return { ...state, turn: state.turn + 1 };
}

function findQuest(questId: string): GeneratedQuest {
  const quest = getBaseCampaignQuests().find((candidate) => candidate.id === questId);
  if (!quest) throw new Error(`unknown quest: ${questId}`);
  return quest;
}

function canStartQuest(player: PlayerState, quest: GeneratedQuest): boolean {
  return quest.prerequisiteIds.every((id) => player.completedQuestIds.includes(id));
}

export function startQuest(state: GameState, playerId: string, questId: string): GameState {
  const player = state.players[playerId];
  if (!player) throw new Error("player not found");
  const quest = findQuest(questId);
  if (player.completedQuestIds.includes(questId)) throw new Error("quest already completed");
  if (!canStartQuest(player, quest)) throw new Error("quest prerequisites are not complete");
  if (player.activeQuestIds.includes(questId)) return state;
  const updated = { ...player, activeQuestIds: [...player.activeQuestIds, questId] };
  return { ...state, players: { ...state.players, [playerId]: updated } };
}

export function completeQuest(
  state: GameState,
  playerId: string,
  questId: string,
  progress = 1,
  seed = "quest"
): QuestProgressResult {
  const player = state.players[playerId];
  if (!player) throw new Error("player not found");
  const quest = findQuest(questId);
  if (!player.activeQuestIds.includes(questId)) throw new Error("quest is not active");
  const completed = progress >= quest.required;
  if (!completed) {
    return { questId, progress, required: quest.required, completed: false, player, rewards: { xp: 0, currency: 0, loot: [] } };
  }

  const lootTable = STORY_CAMPAIGN.lootTables.find((table) => table.id === quest.lootTableId);
  const loot = lootTable ? rollQuestLoot(lootTable, seed + ":" + questId, 1) : [];
  const xp = quest.xpReward;
  const currency = quest.currencyReward;
  const nextXp = player.xp + xp;
  const levelUps = Math.floor(nextXp / XP_PER_LEVEL);
  const nextPlayer: PlayerState = {
    ...player,
    level: Math.max(player.level, 1 + levelUps),
    xp: nextXp % XP_PER_LEVEL,
    currency: player.currency + currency,
    activeQuestIds: player.activeQuestIds.filter((id) => id !== questId),
    completedQuestIds: [...player.completedQuestIds, questId],
    inventory: [...player.inventory, ...loot]
  };
  return { questId, progress: quest.required, required: quest.required, completed: true, player: nextPlayer, rewards: { xp, currency, loot } };
}

export function applyQuestCompletion(state: GameState, result: QuestProgressResult, playerId: string): GameState {
  return { ...state, players: { ...state.players, [playerId]: result.player }, turn: state.turn + 1 };
}
