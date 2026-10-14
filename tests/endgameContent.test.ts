import {describe,expect,it} from 'vitest';
import {buildTowerFloors,WORLD_LEVELS,ITEMS,ACTIVITIES} from '../server/src/rpg/endgameContent';
import {generateEncounter,partyMultiplier,rollLoot,resolveBossPhase} from '../server/src/rpg/encounterEngine';

describe('endgame content',()=>{
 it('defines all four activity types and nine world levels',()=>{
  expect(ACTIVITIES.map(x=>x.type)).toEqual(['dungeon','raid','trial','tower']);
  expect(WORLD_LEVELS).toHaveLength(9);
 });
 it('builds exactly 100 deterministic tower floors',()=>{
  const a=buildTowerFloors(4,'alpha'),b=buildTowerFloors(4,'alpha');
  expect(a).toEqual(b); expect(a).toHaveLength(100);
  expect(a.filter(x=>x.boss).map(x=>x.floor)).toEqual([10,20,30,40,50,60,70,80,90,100]);
 });
 it('scales encounters with party size and remains deterministic',()=>{
  const party=[{id:'a',level:5,role:'tank' as const},{id:'b',level:5,role:'damage' as const},{id:'c',level:5,role:'support' as const}];
  expect(partyMultiplier(party)).toBeGreaterThan(1);
  expect(generateEncounter('seed',4,20,'boss',party)).toEqual(generateEncounter('seed',4,20,'boss',party));
 });
 it('rolls deterministic loot from nine-tier tables',()=>{
  expect(ITEMS).toHaveLength(108);
  expect(rollLoot('loot-seed',9,3)).toEqual(rollLoot('loot-seed',9,3));
 });
 it('advances boss phases as health falls',()=>{
  expect(resolveBossPhase(0,3,1)).toBe(0);
  expect(resolveBossPhase(0,3,.4)).toBe(1);
  expect(resolveBossPhase(0,3,.05)).toBe(2);
 });
});
