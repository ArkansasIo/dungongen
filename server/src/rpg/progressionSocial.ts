export type PlayerMode='pve'|'pvp';
export type SocialType='guild'|'alliance'|'clan';
export type EquipmentSlot='weapon'|'offhand'|'head'|'chest'|'hands'|'legs'|'feet'|'ring1'|'ring2'|'amulet';

export interface LevelBand{level:number;xpToNext:number;powerBudget:number}
export interface PlayerProfile{
 id:string;displayName:string;level:number;xp:number;worldLevel:number;
 classId:string;subclassId?:string;title?:string;avatarUrl?:string;
 stats:{strength:number;dexterity:number;constitution:number;intelligence:number;wisdom:number;charisma:number};
 currencies:{gold:number;premium:number;tokens:number};
 pveRating:number;pvpRating:number;createdAt:string;lastSeenAt:string;
}
export interface InventoryItem{
 instanceId:string;templateId:string;name:string;rarity:1|2|3|4|5|6|7|8|9;
 level:number;slot?:EquipmentSlot;quantity:number;power:number;bound:boolean;tags:string[];
}
export interface EquipmentLoadout{
 slots:Partial<Record<EquipmentSlot,string>>;score:number;
}
export interface Guild{ id:string;name:string;leaderId:string;memberIds:string[];maxMembers:100;level:number;xp:number;allianceId?:string; }
export interface Alliance{ id:string;name:string;leaderGuildId:string;guildIds:string[];maxGuilds:5;level:number; }
export interface Clan{ id:string;name:string;leaderId:string;memberIds:string[];maxMembers:12; }
export interface MatchRules{mode:PlayerMode;teamSize:number;ratingFloor:number;ratingCeiling:number;friendlyFire:boolean;permadeath:boolean}
export interface MatchResult{matchId:string;mode:PlayerMode;winnerTeam:number;durationSeconds:number;ratingDelta:number;xpAward:number;lootSeed:string}

export const MAX_LEVEL=720;
export const SOCIAL_LIMITS={guildMembers:100,allianceGuilds:5,clanMembers:12,raidPlayers:12,dungeonPlayersMin:4,dungeonPlayersMax:6,trialPlayersMin:6,trialPlayersMax:12} as const;

export function xpForLevel(level:number):number{
 const l=Math.max(1,Math.min(MAX_LEVEL,Math.floor(level)));
 return Math.floor(500*Math.pow(l,1.82)+250*l*l);
}
export function levelTable():LevelBand[]{
 return Array.from({length:MAX_LEVEL},(_,i)=>{const level=i+1;return {level,xpToNext:xpForLevel(level),powerBudget:100+level*24+Math.floor(Math.pow(level,1.35)*12)}});
}
export function levelFromXp(totalXp:number):number{
 let xp=Math.max(0,Math.floor(totalXp)),level=1;
 while(level<MAX_LEVEL&&xp>=xpForLevel(level)){xp-=xpForLevel(level);level++}
 return level;
}
export function createProfile(input:Pick<PlayerProfile,'id'|'displayName'|'classId'> & Partial<Pick<PlayerProfile,'subclassId'>>):PlayerProfile{
 const now=new Date().toISOString();
 return {id:input.id,displayName:input.displayName.slice(0,40),level:1,xp:0,worldLevel:1,classId:input.classId,subclassId:input.subclassId,stats:{strength:5,dexterity:5,constitution:5,intelligence:5,wisdom:5,charisma:5},currencies:{gold:0,premium:0,tokens:0},pveRating:1000,pvpRating:1000,createdAt:now,lastSeenAt:now};
}
export function awardXp(profile:PlayerProfile,amount:number):PlayerProfile{
 const xp=Math.max(0,profile.xp+Math.floor(amount));
 const total=xp+Array.from({length:Math.max(0,profile.level-1)},(_,i)=>xpForLevel(i+1)).reduce((a,b)=>a+b,0);
 const level=levelFromXp(total);
 return {...profile,xp,level,lastSeenAt:new Date().toISOString()};
}
export function validateGroupSize(type:'raid'|'dungeon'|'trial',size:number):boolean{
 return type==='raid'?size>=1&&size<=SOCIAL_LIMITS.raidPlayers:type==='dungeon'?size>=SOCIAL_LIMITS.dungeonPlayersMin&&size<=SOCIAL_LIMITS.dungeonPlayersMax:size>=SOCIAL_LIMITS.trialPlayersMin&&size<=SOCIAL_LIMITS.trialPlayersMax;
}
export function createMatchRules(mode:PlayerMode,teamSize:number):MatchRules{
 return {mode,teamSize,ratingFloor:0,ratingCeiling:3000,friendlyFire:false,permadeath:false};
}
