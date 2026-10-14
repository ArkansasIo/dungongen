import type {ArmorData} from './contentTypes';
export const ARMOR:ArmorData[]=[
{id:'leather',name:'Tanned Leather',category:'light',armorClass:'11 + Dexterity',weight:10,value:10,properties:[],lore:'Flexible hide armor used by scouts and travelers.'},
{id:'chain-shirt',name:'Riveted Mail',category:'medium',armorClass:'13 + Dexterity (max 2)',weight:20,value:50,properties:[],lore:'Interlocking iron rings provide practical protection without full plate.'},
{id:'iron-plate',name:'Iron Plate',category:'heavy',armorClass:'16',weight:55,value:500,properties:['strength requirement'],lore:'Layered iron plates worn by elite household guards.'},
{id:'oak-shield',name:'Oak Bulwark',category:'shield',armorClass:'+2',weight:6,value:10,properties:['shield'],lore:'A reinforced shield bearing the heraldry of the border kingdoms.'}
];
