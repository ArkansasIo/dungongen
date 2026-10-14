import type {CharacterArchetype} from './contentTypes';
export const ARCHETYPES:CharacterArchetype[]=[
{id:'vanguard',name:'Vanguard',description:'A disciplined front-line warrior trained to hold the line.',primary:['Strength','Constitution'],startingEquipment:['Iron Longblade','Oak Bulwark','Tanned Leather'],abilities:['Second Wind','Guarding Stance']},
{id:'warden',name:'Warden',description:'A wilderness hunter who combines ranged attacks with fieldcraft.',primary:['Dexterity','Wisdom'],startingEquipment:['Hunter Bow','Ash Spear','Tanned Leather'],abilities:['Hunter Mark','Trail Sense']},
{id:'arcanist',name:'Arcanist',description:'A scholar of elemental and celestial forces.',primary:['Intelligence','Wisdom'],startingEquipment:['Starwood Staff','Tanned Leather'],abilities:['Arcane Bolt','Ward Sigil']},
{id:'veilrunner',name:'Veilrunner',description:'A stealth specialist who exploits darkness and positioning.',primary:['Dexterity','Charisma'],startingEquipment:['Iron Longblade','Tanned Leather'],abilities:['Cunning Step','Ambush']},
{id:'oathkeeper',name:'Oathkeeper',description:'A protector whose sworn vows empower allies.',primary:['Strength','Charisma'],startingEquipment:['Forgehammer','Oak Bulwark','Riveted Mail'],abilities:['Rallying Oath','Judgment']}
];
