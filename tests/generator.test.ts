import {describe,expect,it} from 'vitest';
import {generateDungeon} from '../server/src/dungeon/generator';
const options={width:51,height:35,roomCount:12,level:3,theme:'Forgotten Crypt',seed:'stable-seed'};
describe('generateDungeon',()=>{
it('is deterministic for same seed and settings',()=>expect(generateDungeon(options)).toEqual(generateDungeon(options)));
it('keeps grid dimensions and room coordinates in bounds',()=>{const d=generateDungeon(options);expect(d.grid).toHaveLength(d.height);expect(d.grid.every(r=>r.length===d.width)).toBe(true);for(const r of d.rooms){expect(r.x).toBeGreaterThanOrEqual(1);expect(r.y).toBeGreaterThanOrEqual(1);expect(r.x+r.width).toBeLessThan(d.width);expect(r.y+r.height).toBeLessThan(d.height)}});
it('marks entrance and exit',()=>{const cells=generateDungeon(options).grid.flat();expect(cells).toContain('start');expect(cells).toContain('exit')});
});
