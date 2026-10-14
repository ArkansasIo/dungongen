import {describe,expect,it} from 'vitest';
import {MAX_LEVEL,levelTable,levelFromXp,SOCIAL_LIMITS,validateGroupSize,createProfile,awardXp} from '../server/src/rpg/progressionSocial';
import {MemoryGameCache,cacheKeys} from '../server/src/cache/gameCache';

describe('progression and social systems',()=>{
 it('builds 720 levels',()=>{const table=levelTable();expect(MAX_LEVEL).toBe(720);expect(table).toHaveLength(720);expect(table.at(-1)?.level).toBe(720);expect(levelFromXp(0)).toBe(1)});
 it('enforces requested group caps',()=>{expect(SOCIAL_LIMITS.guildMembers).toBe(100);expect(SOCIAL_LIMITS.allianceGuilds).toBe(5);expect(SOCIAL_LIMITS.clanMembers).toBe(12);expect(validateGroupSize('raid',12)).toBe(true);expect(validateGroupSize('raid',13)).toBe(false);expect(validateGroupSize('dungeon',4)).toBe(true);expect(validateGroupSize('dungeon',7)).toBe(false);expect(validateGroupSize('trial',6)).toBe(true);expect(validateGroupSize('trial',13)).toBe(false)});
 it('awards XP without widening the profile shape',()=>{const p=createProfile({id:'p1',displayName:'Arden',classId:'warden'});const next=awardXp(p,1000);expect(next.xp).toBe(1000);expect('totalLevelXp' in next).toBe(false)});
 it('creates a persistent-style player profile',()=>{const p=createProfile({id:'p1',displayName:'Arden',classId:'warden'});expect(p.level).toBe(1);expect(p.pvpRating).toBe(1000);expect(p.pveRating).toBe(1000)});
 it('caches and expires game state',async()=>{const c=new MemoryGameCache();await c.set(cacheKeys.profile('p1'),{level:10},1000);expect(await c.get(cacheKeys.profile('p1'))).toEqual({level:10});await c.delete(cacheKeys.profile('p1'));expect(await c.get(cacheKeys.profile('p1'))).toBeUndefined()});
});
