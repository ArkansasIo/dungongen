export type DamageType='slashing'|'piercing'|'bludgeoning'|'fire'|'cold'|'lightning'|'thunder'|'acid'|'poison'|'psychic'|'necrotic'|'radiant'|'force';
export interface WeaponData{id:string;name:string;category:'simple'|'martial'|'exotic';damage:string;damageType:DamageType;weight:number;value:number;properties:string[];lore:string}
export interface ArmorData{id:string;name:string;category:'light'|'medium'|'heavy'|'shield';armorClass:string;weight:number;value:number;properties:string[];lore:string}
export interface CreatureData{id:string;name:string;kind:'beast'|'humanoid'|'undead'|'construct'|'dragon'|'fiend'|'fey'|'elemental'|'monstrosity';challenge:number;hp:number;armor:number;speed:number;attacks:string[];traits:string[];lore:string}
export interface CharacterArchetype{id:string;name:string;description:string;primary:string[];startingEquipment:string[];abilities:string[]}
export interface SettingEntry{id:string;name:string;category:'region'|'settlement'|'faction'|'npc'|'legend';description:string}
