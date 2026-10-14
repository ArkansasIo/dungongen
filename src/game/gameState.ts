export interface CharacterState{id:string;name:string;archetypeId:string;level:number;xp:number;hp:number;maxHp:number;armor:number;inventory:string[];conditions:string[]}
export interface PartyState{id:string;name:string;memberIds:string[];leaderId:string}
export interface SettlementState{id:string;name:string;ownerId:string;x:number;y:number;population:number;food:number;gold:number;buildings:string[]}
export interface QuestState{id:string;title:string;description:string;status:'available'|'active'|'completed'|'failed';rewardGold:number;rewardXp:number}
export interface CombatantState{id:string;name:string;team:'heroes'|'enemies';initiative:number;hp:number;maxHp:number;conditions:string[]}
export interface CombatState{id:string;round:number;activeIndex:number;status:'planning'|'active'|'ended';combatants:CombatantState[]}
export interface CampaignState{version:number;campaignId:string;turn:number;year:number;phase:'planning'|'resolution'|'aftermath';characters:CharacterState[];parties:PartyState[];settlements:SettlementState[];quests:QuestState[];combat?:CombatState}
