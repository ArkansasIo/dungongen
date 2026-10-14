import { getBaseCampaignQuests, type GeneratedQuest } from "../campaign/campaignEngine.js";
import { createCharacter, grantExperience, type CharacterState } from "./progressionEngine.js";
import { addItem, createResources, createWorldState, type ItemInstance, type ResourceState, type WorldState } from "./baseSystems.js";

export interface PersistentPlayerState {
  character: CharacterState;
  resources: ResourceState;
  world: WorldState;
  activeQuestIds: string[];
  completedQuestIds: string[];
  inventory: ItemInstance[];
}

export function createPersistentPlayer(id:string,name:string,className:Parameters<typeof createCharacter>[0]["class"]):PersistentPlayerState {
  return {
    character:createCharacter({id,name,class:className}),
    resources:createResources(1),
    world:createWorldState(),
    activeQuestIds:[],
    completedQuestIds:[],
    inventory:[]
  };
}

export function getAvailableQuests(player:PersistentPlayerState):GeneratedQuest[] {
  const completed=new Set(player.completedQuestIds);
  const active=new Set(player.activeQuestIds);
  return getBaseCampaignQuests().filter(q=>!completed.has(q.id)&&!active.has(q.id)&&q.prerequisiteIds.every(id=>completed.has(id)));
}

export function startCampaignQuest(player:PersistentPlayerState,questId:string):PersistentPlayerState {
  const quest=getBaseCampaignQuests().find(q=>q.id===questId);
  if(!quest) throw new Error("quest not found");
  if(player.completedQuestIds.includes(questId)) throw new Error("quest already completed");
  if(player.activeQuestIds.includes(questId)) return player;
  if(!quest.prerequisiteIds.every(id=>player.completedQuestIds.includes(id))) throw new Error("quest prerequisites are not complete");
  return {...player,activeQuestIds:[...player.activeQuestIds,questId]};
}

export function completeCampaignQuest(player:PersistentPlayerState,questId:string,rewardItem?:ItemInstance):PersistentPlayerState {
  const quest=getBaseCampaignQuests().find(q=>q.id===questId);
  if(!quest) throw new Error("quest not found");
  if(!player.activeQuestIds.includes(questId)) throw new Error("quest is not active");
  const character=grantExperience(player.character,quest.xpReward);
  const resources={...player.resources,gold:player.resources.gold+quest.currencyReward};
  const inventory=rewardItem?addItem(player.inventory,rewardItem):player.inventory;
  return {
    ...player,
    character:{...character,gold:character.gold+quest.currencyReward},
    resources,
    inventory,
    activeQuestIds:player.activeQuestIds.filter(id=>id!==questId),
    completedQuestIds:[...player.completedQuestIds,questId]
  };
}
