import type { Combatant, DamageType } from "./d20Engine.js";
import { createCombatState, performCombatAttack, type CombatState } from "./baseSystems.js";

export type EnemyRole = "minion"|"elite"|"boss";
export interface EnemyDefinition {
  id:string; name:string; role:EnemyRole; level:number; hp:number; armor:number; attackBonus:number; damage:number; damageType:DamageType; xpReward:number; goldReward:number; lootTier:string;
}
export const ENEMIES: EnemyDefinition[] = [
  {id:"ashen-raider",name:"Ashen Raider",role:"minion",level:1,hp:35,armor:10,attackBonus:3,damage:6,damageType:"physical",xpReward:80,goldReward:15,lootTier:"common"},
  {id:"stone-watcher",name:"Stone Watcher",role:"minion",level:3,hp:55,armor:12,attackBonus:5,damage:8,damageType:"physical",xpReward:130,goldReward:25,lootTier:"fine"},
  {id:"bog-hunter",name:"Bog Hunter",role:"elite",level:5,hp:90,armor:13,attackBonus:7,damage:12,damageType:"poison",xpReward:240,goldReward:50,lootTier:"superior"},
  {id:"blackglass-knight",name:"Blackglass Knight",role:"elite",level:8,hp:145,armor:16,attackBonus:10,damage:18,damageType:"shadow",xpReward:420,goldReward:90,lootTier:"rare"},
  {id:"hollow-star-warden",name:"Hollow-Star Warden",role:"boss",level:12,hp:300,armor:18,attackBonus:13,damage:26,damageType:"arcane",xpReward:1200,goldReward:350,lootTier:"epic"},
  {id:"veiled-legion-commander",name:"Veiled Legion Commander",role:"boss",level:20,hp:650,armor:21,attackBonus:17,damage:38,damageType:"shadow",xpReward:3000,goldReward:900,lootTier:"mythic"}
];

export interface EncounterDefinition { id:string; name:string; level:number; enemyIds:string[]; rewardMultiplier:number; }

export const ENCOUNTERS: EncounterDefinition[] = [
  {id:"ashen-road-patrol",name:"Ashen Road Patrol",level:1,enemyIds:["ashen-raider","ashen-raider"],rewardMultiplier:1},
  {id:"stone-vault",name:"Stone Vault",level:3,enemyIds:["stone-watcher","ashen-raider"],rewardMultiplier:1.2},
  {id:"blackglass-siege",name:"Blackglass Siege",level:8,enemyIds:["blackglass-knight","bog-hunter"],rewardMultiplier:1.5},
  {id:"hollow-star-sanctum",name:"Hollow-Star Sanctum",level:12,enemyIds:["hollow-star-warden"],rewardMultiplier:2},
  {id:"veiled-legion-throne",name:"Veiled Legion Throne",level:20,enemyIds:["veiled-legion-commander"],rewardMultiplier:2.5}
];

export function createEncounter(encounterId:string):CombatState {
  const encounter=ENCOUNTERS.find(e=>e.id===encounterId);
  if(!encounter) throw new Error("encounter not found");
  const enemies=encounter.enemyIds.map((id,index)=>{
    const enemy=ENEMIES.find(e=>e.id===id);
    if(!enemy) throw new Error(`enemy not found: ${id}`);
    return {id:`${enemy.id}-${index+1}`,hp:enemy.hp,maxHp:enemy.hp,armor:enemy.armor,attackBonus:enemy.attackBonus,damage:enemy.damage};
  });
  return createCombatState([{id:"player",hp:120,maxHp:120,armor:12,attackBonus:6,damage:12},...enemies],"player");
}

export function performEncounterAttack(state:CombatState,targetId:string,roll:number,damageType:DamageType="physical") {
  return performCombatAttack(state,targetId,roll,damageType);
}

export function encounterRewards(encounterId:string) {
  const encounter=ENCOUNTERS.find(e=>e.id===encounterId);
  if(!encounter) throw new Error("encounter not found");
  return encounter.enemyIds.reduce((total,id)=>{
    const enemy=ENEMIES.find(e=>e.id===id)!;
    return {xp:total.xp+Math.floor(enemy.xpReward*encounter.rewardMultiplier),gold:total.gold+Math.floor(enemy.goldReward*encounter.rewardMultiplier)};
  },{xp:0,gold:0});
}
