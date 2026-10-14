import {describe,expect,it} from 'vitest';
import {generateDungeon} from '../server/src/dungeon/generator';
import {populateDungeon} from '../server/src/dungeon/fantasyContent';
import {generateSettlement} from '../server/src/world/settlementGenerator';
import {createCharacter,grantXp,rollLoot,canUseAbility} from '../server/src/rpg/rpgSystems';

describe('fantasy content generation',()=>{
 const dungeon=generateDungeon({width:51,height:35,roomCount:12,level:5,theme:'Ashen Crypt',seed:'content-seed'});
 it('populates rooms deterministically',()=>expect(populateDungeon(dungeon)).toEqual(populateDungeon(dungeon)));
 it('gives the final room a boss role for a sufficiently large dungeon',()=>expect(populateDungeon(dungeon).at(-1)?.role).toBe('boss'));
 it('generates deterministic settlement layouts within bounds',()=>{const a=generateSettlement({seed:'town-seed',kind:'walled-city',width:80,height:60});expect(a).toEqual(generateSettlement({seed:'town-seed',kind:'walled-city',width:80,height:60}));expect(a.walls).toBe(true);expect(a.buildings.every(b=>b.x>=0&&b.x<a.width&&b.y>=0&&b.y<a.height)).toBe(true)});
 it('levels characters and updates derived resources',()=>{const c=createCharacter({id:'hero-1',name:'Arin',class:'warrior'});const next=grantXp(c,100000);expect(next.level).toBeGreaterThan(1);expect(next.maxHp).toBeGreaterThan(c.maxHp)});
 it('rolls stable loot and checks ability class/mana',()=>{expect(rollLoot('seed-7',4)).toEqual(rollLoot('seed-7',4));const mage=createCharacter({id:'mage-1',name:'Mira',class:'mage'});expect(canUseAbility(mage,{id:'smite',name:'Smite',class:'cleric',manaCost:1,cooldownSeconds:4,power:8,description:'test'}).ok).toBe(false)});
});
