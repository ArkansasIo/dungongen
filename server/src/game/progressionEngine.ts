export type CharacterClass = "warrior" | "ranger" | "mage" | "cleric" | "rogue";

export interface Attributes { strength:number; dexterity:number; constitution:number; intelligence:number; wisdom:number; charisma:number; }
export interface CharacterState {
  id:string; name:string; class:CharacterClass; level:number; xp:number;
  attributes:Attributes; hp:number; maxHp:number; mana:number; maxMana:number;
  gold:number; skillPoints:number; unlockedAbilityIds:string[];
}
export interface AbilityDefinition {
  id:string; name:string; class:CharacterClass|"any"; levelRequired:number;
  manaCost:number; staminaCost:number; power:number; cooldownTurns:number; damageType:"physical"|"fire"|"frost"|"arcane"|"poison"|"shadow";
}
export const ABILITIES: AbilityDefinition[] = [
  {id:"basic-strike",name:"Basic Strike",class:"any",levelRequired:1,manaCost:0,staminaCost:5,power:10,cooldownTurns:0,damageType:"physical"},
  {id:"shield-break",name:"Shield Break",class:"warrior",levelRequired:2,manaCost:0,staminaCost:15,power:18,cooldownTurns:2,damageType:"physical"},
  {id:"precise-shot",name:"Precise Shot",class:"ranger",levelRequired:2,manaCost:0,staminaCost:12,power:17,cooldownTurns:2,damageType:"physical"},
  {id:"arc-bolt",name:"Arc Bolt",class:"mage",levelRequired:2,manaCost:12,staminaCost:0,power:22,cooldownTurns:2,damageType:"arcane"},
  {id:"restoring-light",name:"Restoring Light",class:"cleric",levelRequired:2,manaCost:15,staminaCost:0,power:24,cooldownTurns:3,damageType:"arcane"},
  {id:"shadow-step",name:"Shadow Step",class:"rogue",levelRequired:2,manaCost:8,staminaCost:8,power:20,cooldownTurns:3,damageType:"shadow"}
];

export function xpToNextLevel(level:number):number {
  const safe = Math.max(1, Math.floor(level));
  return 500 + safe * 250 + safe * safe * 50;
}

export function deriveCharacterStats(attributes:Attributes, level:number) {
  const l=Math.max(1,Math.floor(level));
  return {
    maxHp: Math.max(1, attributes.constitution*12 + attributes.strength*2 + l*15),
    maxMana: Math.max(0, attributes.intelligence*8 + attributes.wisdom*5 + l*6),
    attack: Math.max(1, attributes.strength*2 + attributes.dexterity + l),
    defense: Math.max(0, attributes.constitution + Math.floor(attributes.dexterity/2) + Math.floor(l/2)),
    spellPower: Math.max(0, attributes.intelligence*2 + attributes.wisdom + l)
  };
}

export function createCharacter(input:{id:string;name:string;class:CharacterClass;attributes?:Partial<Attributes>}):CharacterState {
  const base:Attributes={strength:5,dexterity:5,constitution:5,intelligence:5,wisdom:5,charisma:5};
  const bonus:Record<CharacterClass,Partial<Attributes>>={
    warrior:{strength:3,constitution:2}, ranger:{dexterity:3,wisdom:1},
    mage:{intelligence:4,wisdom:2}, cleric:{wisdom:4,constitution:1}, rogue:{dexterity:4,charisma:1}
  };
  const attributes={...base,...input.attributes};
  for(const [key,value] of Object.entries(bonus[input.class])) attributes[key as keyof Attributes]+=value||0;
  const stats=deriveCharacterStats(attributes,1);
  return {id:input.id,name:input.name.trim().slice(0,60),class:input.class,level:1,xp:0,attributes,
    hp:stats.maxHp,maxHp:stats.maxHp,mana:stats.maxMana,maxMana:stats.maxMana,gold:100,skillPoints:0,unlockedAbilityIds:["basic-strike"]};
}

export function grantExperience(character:CharacterState, amount:number):CharacterState {
  let xp=character.xp+Math.max(0,Math.floor(amount)), level=character.level, skillPoints=character.skillPoints;
  while(level<100 && xp>=xpToNextLevel(level)){xp-=xpToNextLevel(level);level++;skillPoints++;}
  const stats=deriveCharacterStats(character.attributes,level);
  return {...character,level,xp,skillPoints,maxHp:stats.maxHp,hp:Math.min(stats.maxHp,character.hp+(level-character.level)*stats.maxHp),
    maxMana:stats.maxMana,mana:Math.min(stats.maxMana,character.mana+(level-character.level)*stats.maxMana)};
}

export function unlockAbility(character:CharacterState, abilityId:string):CharacterState {
  const ability=ABILITIES.find(a=>a.id===abilityId);
  if(!ability) throw new Error("ability not found");
  if(ability.class!=="any"&&ability.class!==character.class) throw new Error("ability is not available to this class");
  if(character.level<ability.levelRequired) throw new Error("character level is too low");
  if(character.unlockedAbilityIds.includes(abilityId)) return character;
  if(character.skillPoints<1) throw new Error("no skill points available");
  return {...character,skillPoints:character.skillPoints-1,unlockedAbilityIds:[...character.unlockedAbilityIds,abilityId]};
}

export function canUseAbility(character:CharacterState, abilityId:string, cooldownRemaining=0):{ok:boolean;reason?:string} {
  const ability=ABILITIES.find(a=>a.id===abilityId);
  if(!ability) return {ok:false,reason:"ability not found"};
  if(!character.unlockedAbilityIds.includes(abilityId)) return {ok:false,reason:"ability is not unlocked"};
  if(cooldownRemaining>0) return {ok:false,reason:"ability is on cooldown"};
  if(character.mana<ability.manaCost) return {ok:false,reason:"not enough mana"};
  return {ok:true};
}
