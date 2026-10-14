export type ActivityType='dungeon'|'raid'|'trial'|'tower';
export type Rarity=1|2|3|4|5|6|7|8|9;
export type WorldLevel=1|2|3|4|5|6|7|8|9;
export type EncounterRole='mob'|'elite'|'champion'|'boss'|'raid-boss';
export type EquipmentSlot='weapon'|'shield'|'head'|'chest'|'hands'|'legs'|'feet'|'ring'|'amulet';

export interface FloorDefinition{
 floor:number; worldLevel:WorldLevel; mapFamily:string; biome:string;
 enemyBudget:number; boss:boolean; bossName?:string; rewardMultiplier:number;
}
export interface ActivityDefinition{
 id:string; name:string; type:ActivityType; minWorldLevel:WorldLevel; maxFloors:number;
 mapFamilies:string[]; bossCadence:number; partySize:number;
}
export interface EnemyDefinition{
 id:string; name:string; role:EncounterRole; levelBand:[number,number];
 tags:string[]; challenge:number; damageTypes:string[]; lootBias:Rarity;
}
export interface ItemDefinition{
 id:string; name:string; slot:EquipmentSlot; rarity:Rarity; level:number;
 power:number; tags:string[];
}
export interface LootEntry{itemId:string; weight:number; minQuantity:number; maxQuantity:number}

export const ACTIVITIES:ActivityDefinition[]=[
 {id:'dungeon',name:'Dungeon',type:'dungeon',minWorldLevel:1,maxFloors:20,mapFamilies:['crypt','ruins','caverns','temple','vault'],bossCadence:5,partySize:5},
 {id:'raid',name:'Raid',type:'raid',minWorldLevel:4,maxFloors:12,mapFamilies:['citadel','caldera','sky-fortress','abyssal-gate'],bossCadence:3,partySize:10},
 {id:'trial',name:'Trial',type:'trial',minWorldLevel:2,maxFloors:9,mapFamilies:['arena','labyrinth','elemental-court','dream-maze'],bossCadence:1,partySize:5},
 {id:'tower',name:'Tower',type:'tower',minWorldLevel:1,maxFloors:100,mapFamilies:['arcane-tower','war-tower','clockwork-spire','dread-tower'],bossCadence:10,partySize:5}
];

export const WORLD_LEVELS=Array.from({length:9},(_,i)=>({
 level:(i+1) as WorldLevel, enemyLevelMin:i*5+1, enemyLevelMax:(i+1)*5,
 hpScale:1+i*.22, damageScale:1+i*.18, lootRarityMin:(Math.min(9,Math.max(1,i+1)) as Rarity)
}));

const enemyNames=['Ashfang Hound','Gravebound Sentinel','Mire Hag','Stonehide Brute','Ember Wraith','Gloom Stalker','Ironroot Treant','Moonlit Revenant','Void Cultist','Storm Drake','Frost Revenant','Cinder Giant','Obsidian Basilisk','Aether Wyrm','Thronebreaker Colossus'];
const bossNames=['The Crypt Regent','Maw of the Deep','The Brass Sovereign','Warden of the Black Gate','The Starved Oracle','Crown of Cinders','The Hollow Titan','The Ninefold Archon','The World-Eater'];

export const ENEMIES:EnemyDefinition[]=enemyNames.map((name,i)=>({
 id:'enemy-'+(i+1),name,role:i%5===0?'elite':'mob',levelBand:[1+i,5+i],tags:['fantasy','original'],challenge:1+(i%9),damageTypes:[['slashing','fire','cold','necrotic','arcane'][i%5]],lootBias:(Math.min(9,1+Math.floor(i/2)) as Rarity)
}));

export const BOSSES:EnemyDefinition[]=bossNames.map((name,i)=>({
 id:'boss-'+(i+1),name,role:i>=6?'raid-boss':'boss',levelBand:[5+i*3,10+i*3],tags:['boss','original'],challenge:5+i,damageTypes:[['necrotic','fire','arcane','poison'][i%4]],lootBias:(Math.min(9,3+Math.floor(i/2)) as Rarity)
}));

const rarityNames=['Common','Fine','Superior','Rare','Epic','Mythic','Ancient','Exalted','Transcendent'];
const prefixes=['Iron','Silver','Runed','Stormforged','Ember','Moonsteel','Voidbound','Astral','Worldforged'];
const bases=['Longblade','Warhammer','Longbow','Spellbook','Aegis','Cuirass','Helm','Gauntlets','Greaves','Boots','Ring','Amulet'];
export const ITEMS:ItemDefinition[]=rarityNames.flatMap((rarity,index)=>bases.map((base,j)=>({
 id:'item-'+(index+1)+'-'+(j+1),name:prefixes[index]+' '+base,slot:(['weapon','weapon','weapon','weapon','shield','chest','head','hands','legs','feet','ring','amulet'] as EquipmentSlot[])[j],
 rarity:(index+1) as Rarity,level:1+index*5,power:10+index*25+j*3,tags:['equipment',rarity.toLowerCase()]
})));

export const LOOT_TABLES:Record<Rarity,LootEntry[]>=Object.fromEntries(
 Array.from({length:9},(_,i)=>[i+1,[{itemId:ITEMS[i*12].id,weight:60-i*4,minQuantity:1,maxQuantity:1},{itemId:ITEMS[Math.min(ITEMS.length-1,i*12+5)].id,weight:30+i*2,minQuantity:1,maxQuantity:1},{itemId:ITEMS[Math.min(ITEMS.length-1,i*12+11)].id,weight:10+i*2,minQuantity:1,maxQuantity:1}]])
) as Record<Rarity,LootEntry[]>;

export function buildTowerFloors(worldLevel:WorldLevel,seed='tower'):FloorDefinition[]{
 const activity=ACTIVITIES.find(x=>x.type==='tower')!;
 return Array.from({length:100},(_,i)=>{
  const floor=i+1; const boss=floor%10===0;
  const family=activity.mapFamilies[(floor+seed.length)%activity.mapFamilies.length];
  return {floor,worldLevel,mapFamily:family,biome:['crypt','forest','volcanic','frost','astral'][floor%5],enemyBudget:10+floor*worldLevel*2,boss,bossName:boss?BOSSES[(floor/10-1)%BOSSES.length].name:undefined,rewardMultiplier:1+floor*.035};
 });
}
