import {BOSSES,ENEMIES,LOOT_TABLES,ITEMS,type EnemyDefinition,type Rarity,type WorldLevel} from './endgameContent';

export type EncounterKind='standard'|'elite'|'boss'|'raid-boss'|'trial';
export type AffixKind='berserk'|'fortified'|'frenzied'|'venomous'|'arcane'|'vampiric'|'warded'|'unstable';
export type TrapKind='dart'|'flame'|'collapse'|'rune'|'frost'|'void';

export interface PartyMember{ id:string; level:number; role:'tank'|'damage'|'support'|'controller'; }
export interface EncounterUnit{ id:string; definitionId:string; name:string; role:EnemyDefinition['role']; level:number; hp:number; damage:number; challenge:number; affixes:AffixKind[]; }
export interface TrapDefinition{kind:TrapKind; difficulty:number; damage:number; telegraphed:boolean}
export interface TreasureChest{ id:string; rarity:Rarity; rolls:number; locked:boolean; keyRequired?:string }
export interface Encounter{ id:string; kind:EncounterKind; level:WorldLevel; floor:number; units:EncounterUnit[]; traps:TrapDefinition[]; treasure:TreasureChest[]; bossPhaseCount:number; objective:string }

const affixes:AffixKind[]=['berserk','fortified','frenzied','venomous','arcane','vampiric','warded','unstable'];
const traps:TrapKind[]=['dart','flame','collapse','rune','frost','void'];
function hash(seed:string){let h=2166136261;for(const c of seed)h=Math.imul(h^c.charCodeAt(0),16777619);return h>>>0}
function pick<T>(list:T[],seed:string,index:number){return list[(hash(seed+':'+index))%list.length]}
function clamp(n:number,min:number,max:number){return Math.max(min,Math.min(max,n))}

export function partyMultiplier(party:PartyMember[]):number{
 if(!party.length)return 1;
 const avg=party.reduce((s,p)=>s+p.level,0)/party.length;
 return 1+clamp(party.length-1,0,9)*.18+Math.max(0,avg-1)*.025;
}

export function generateEncounter(seed:string,level:WorldLevel,floor:number,kind:EncounterKind,party:PartyMember[]=[]):Encounter{
 const boss=kind==='boss'||kind==='raid-boss';
 const count=boss?1:clamp(Math.floor(2+party.length*.7+level*.45),2,12);
 const mult=partyMultiplier(party);
 const source=boss?BOSSES:ENEMIES;
 const units=Array.from({length:count},(_,i)=>{
  const def=pick(source,seed,i);
  const unitLevel=clamp(Math.round((def.levelBand[0]+def.levelBand[1])/2)+level+Math.floor(floor/10),1,60);
  const affixCount=boss?Math.min(3,1+Math.floor(floor/25)):Math.min(2,Math.floor(level/4));
  const unitAffixes=Array.from({length:affixCount},(_,j)=>pick(affixes,seed,i+j+17)).filter((x,j,a)=>a.indexOf(x)===j);
  return {id:seed+'-u'+i,definitionId:def.id,name:def.name,role:def.role,level:unitLevel,hp:Math.round((35+unitLevel*18+def.challenge*12)*mult),damage:Math.round((5+unitLevel*3+def.challenge*2)*mult),challenge:def.challenge,affixes:unitAffixes};
 });
 const trapCount=kind==='trial'?Math.max(1,Math.floor(floor/2)):Math.floor(floor/4);
 const trapList=Array.from({length:trapCount},(_,i)=>{const k=pick(traps,seed,i+50);return {kind:k,difficulty:10+level*2+floor%7,damage:5+level*4+floor,telegraphed:k!=='void'}});
 const rarity=clamp(Math.ceil(level*.9+(boss?2:0)),1,9) as Rarity;
 const treasureCount=boss?2:1;
 return {id:seed+'-enc-'+floor,kind,level,floor,units,traps:trapList,treasure:Array.from({length:treasureCount},(_,i)=>({id:seed+'-chest-'+i,rarity,rolls:boss?3:1,locked:boss&&i===0,keyRequired:boss&&i===0?'boss-key-'+floor:undefined})),bossPhaseCount:boss?3+Math.floor(floor/30):0,objective:kind==='trial'?'Complete the trial objective':boss?'Defeat the encounter boss':'Defeat all hostile units'};
}

export function rollLoot(seed:string,rarity:Rarity,rolls=1):string[]{
 const table=LOOT_TABLES[rarity]; const total=table.reduce((s,e)=>s+e.weight,0); const result:string[]=[];
 for(let i=0;i<rolls;i++){let n=hash(seed+':loot:'+i)%total;for(const entry of table){n-=entry.weight;if(n<0){result.push(entry.itemId);break;}}}
 return result.map(id=>ITEMS.find(item=>item.id===id)?.name??id);
}

export function resolveBossPhase(current:number,phaseCount:number,hpPercent:number):number{
 if(phaseCount<=0)return 0;
 return clamp(Math.min(phaseCount-1,Math.floor((1-hpPercent)*phaseCount)),0,phaseCount-1);
}
