import { describe, expect, it } from "vitest";
import { ABILITIES, createCharacter, grantExperience, unlockAbility, canUseAbility } from "../server/src/game/progressionEngine";
import { createEncounter, encounterRewards } from "../server/src/game/encounterEngine";
import { clearCurrentRoom, createDungeon, enterNextRoom } from "../server/src/game/dungeonEngine";

describe("progression and encounter loop", () => {
  it("levels characters and grants skill points", () => {
    let hero = createCharacter({id:"p1",name:"Hero",class:"mage"});
    hero = grantExperience(hero, 5000);
    expect(hero.level).toBeGreaterThan(1);
    expect(hero.skillPoints).toBeGreaterThan(0);
    hero = unlockAbility(hero, "arc-bolt");
    expect(hero.unlockedAbilityIds).toContain("arc-bolt");
    expect(canUseAbility(hero, "arc-bolt").ok).toBe(true);
  });

  it("creates deterministic dungeon rooms and advances only after clearing", () => {
    const a = createDungeon("d1","Ashen Depths",4,"seed");
    const b = createDungeon("d1","Ashen Depths",4,"seed");
    expect(a.rooms.map(r=>r.encounterId)).toEqual(b.rooms.map(r=>r.encounterId));
    expect(() => enterNextRoom(a)).toThrow("current room must be cleared first");
    const cleared = clearCurrentRoom(a);
    const next = enterNextRoom(cleared);
    expect(next.currentRoom).toBe(2);
    expect(next.rooms[1].discovered).toBe(true);
  });

  it("creates encounters and deterministic reward totals", () => {
    const combat = createEncounter("hollow-star-sanctum");
    expect(combat.combatants["player"]).toBeDefined();
    expect(encounterRewards("hollow-star-sanctum").xp).toBe(2400);
    expect(ABILITIES.length).toBeGreaterThan(5);
  });
});
