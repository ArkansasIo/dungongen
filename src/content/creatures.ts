import type {CreatureData} from './contentTypes';
export const CREATURES:CreatureData[]=[
{id:'marsh-wolf',name:'Marsh Wolf',kind:'beast',challenge:0.5,hp:11,armor:13,speed:40,attacks:['Bite: 1d6 piercing'],traits:['Pack Hunter'],lore:'A gray predator adapted to the misty lowlands.'},
{id:'barrow-wight',name:'Barrow Wight',kind:'undead',challenge:3,hp:45,armor:14,speed:30,attacks:['Grave Blade: 1d8 necrotic','Withering Touch: 2d6 necrotic'],traits:['Undead Fortitude','Grave Whisper'],lore:'A dead oathkeeper awakened beneath a forgotten burial mound.'},
{id:'stonewarden',name:'Stonewarden',kind:'construct',challenge:5,hp:78,armor:17,speed:25,attacks:['Stone Fist: 2d8 bludgeoning'],traits:['Constructed Resilience','Runic Guard'],lore:'An ancient guardian built to protect sealed subterranean vaults.'},
{id:'emberdrake',name:'Emberdrake',kind:'dragon',challenge:4,hp:66,armor:16,speed:40,attacks:['Bite: 1d10 piercing','Claw: 1d6 slashing','Ember Breath: 4d6 fire'],traits:['Draconic Resistance','Ember Breath'],lore:'A young scaled terror nesting around volcanic ruins.'}
];
