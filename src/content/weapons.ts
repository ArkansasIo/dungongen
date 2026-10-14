import type {WeaponData} from './contentTypes';
export const WEAPONS:WeaponData[]=[
{id:'iron-longblade',name:'Iron Longblade',category:'martial',damage:'1d8',damageType:'slashing',weight:3,value:15,properties:['versatile'],lore:'A dependable frontier sword forged for mounted and foot warfare.'},
{id:'ash-spear',name:'Ash Spear',category:'simple',damage:'1d6',damageType:'piercing',weight:3,value:5,properties:['reach','thrown'],lore:'A militia spear reinforced with a dark ashwood shaft.'},
{id:'hunter-bow',name:'Hunter Bow',category:'martial',damage:'1d6',damageType:'piercing',weight:2,value:25,properties:['ammunition','two-handed'],lore:'A recurved bow favored by wardens of the old forests.'},
{id:'warhammer',name:'Forgehammer',category:'martial',damage:'1d8',damageType:'bludgeoning',weight:2,value:12,properties:['versatile'],lore:'A compact battlefield hammer carrying the mark of mountain smiths.'},
{id:'ritual-staff',name:'Starwood Staff',category:'simple',damage:'1d6',damageType:'bludgeoning',weight:4,value:10,properties:['focus'],lore:'Living starwood said to remember every spell cast through it.'}
];
