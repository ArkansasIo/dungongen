export type CharacterClass = 'warrior' | 'ranger' | 'mage' | 'cleric' | 'rogue';
export interface Attributes { strength:number; dexterity:number; constitution:number; intelligence:number; wisdom:number; charisma:number; }
export interface CharacterState { id:string; name:string; class:CharacterClass; level:number; xp:number; attributes:Attributes; hp:number; maxHp:number; mana:number; maxMana:number; gold:number; }
export interface Ability { id:string; name:string; class:CharacterClass|'any'; manaCost:number; cooldownSeconds:number; power:number; description:string; }
export interface LootDrop { id:string; name:string; rarity:'common'|'uncommon'|'rare'|'epic'|'legendary'; value:number; }
export interface QuestTemplate { id:string; title:string; description:string; objective:'kill'|'explore'|'collect'|'talk'; target:string; required:number; xpReward:number; goldReward:number; }
export function xpForNextLevel(level:number):number { const safe=Math.max(1,Math.min(100,Math.floor(level))); return Math.floor(Math.pow(safe,2.5)*500); }
export function deriveStats(attributes:Attributes, level:number) {
 const safeLevel=Math.max(1,Math.floor(level));
 return { maxHp:Math.max(1,attributes.constitution*10+attributes.strength*2+safeLevel*12), maxMana:Math.max(0,attributes.intelligence*8+attributes.wisdom*4+safeLevel*5), attack:Math.max(1,attributes.strength*2+safeLevel), defense:Math.max(0,attributes.constitution+Math.floor(attributes.dexterity/2)), spellPower:Math.max(0,attributes.intelligence*2+attributes.wisdom) };
}
export function createCharacter(input:{id:string;name:string;class:CharacterClass;attributes?:Partial<Attributes>}):CharacterState {
 const base:Attributes={strength:5,dexterity:5,constitution:5,intelligence:5,wisdom:5,charisma:5};
 const classBonuses:Record<CharacterClass,Partial<Attributes>>={warrior:{strength:3,constitution:2},ranger:{dexterity:3,wisdom:1},mage:{intelligence:4,wisdom:2},cleric:{wisdom:4,constitution:1},rogue:{dexterity:4,charisma:1}};
 const attributes={...base,...input.attributes};
 for(const [key,value] of Object.entries(classBonuses[input.class])) attributes[key as keyof Attributes]+=value||0;
 const derived=deriveStats(attributes,1);
 return {id:input.id,name:input.name.slice(0,60),class:input.class,level:1,xp:0,attributes,hp:derived.maxHp,maxHp:derived.maxHp,mana:derived.maxMana,maxMana:derived.maxMana,gold:0};
}
export function grantXp(character:CharacterState,amount:number):CharacterState {
 let xp=character.xp+Math.max(0,Math.floor(amount)),level=character.level;
 while(level<100 && xp>=xpForNextLevel(level)){xp-=xpForNextLevel(level);level++}
 const derived=deriveStats(character.attributes,level),levelGain=level-character.level;
 return {...character,level,xp,maxHp:derived.maxHp,hp:Math.min(derived.maxHp,character.hp+levelGain*12),maxMana:derived.maxMana,mana:Math.min(derived.maxMana,character.mana+levelGain*5)};
}
export function rollLoot(seed:string,depth:number):LootDrop {
 let h=2166136261;for(const c of seed){h^=c.charCodeAt(0);h=Math.imul(h,16777619)}const r=(h>>>0)/4294967296;
 const rarity:LootDrop['rarity']=r>.995?'legendary':r>.96?'epic':r>.78?'rare':r>.45?'uncommon':'common';
 const names:Record<LootDrop['rarity'],string[]>={common:['Iron Token','Field Rations','Worn Ring'],uncommon:['Runed Buckle','Scout Cloak','Amber Flask'],rare:['Moonsteel Dagger','Warden Sigil','Sapphire Focus'],epic:['Crown of Cinders','Aetherbound Mantle','Stormglass Staff'],legendary:['Worldroot Relic','Dawnfire Crown','Starfall Blade']};
 return {id:seed+'-'+Math.floor(depth),name:names[rarity][Math.abs(h)%names[rarity].length],rarity,value:Math.max(1,Math.floor(depth*8*({common:1,uncommon:2,rare:5,epic:12,legendary:30}[rarity])))};
}
export function canUseAbility(character:CharacterState,ability:Ability):{ok:boolean;reason?:string} {
 if(ability.class!=='any'&&ability.class!==character.class)return {ok:false,reason:'This ability is not available to this class.'};
 if(character.mana<ability.manaCost)return {ok:false,reason:'Not enough mana.'};
 return {ok:true};
}
