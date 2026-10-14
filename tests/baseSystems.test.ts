import { describe, expect, it } from "vitest";
import { addItem, createCombatState, createResources, createWorldState, discoverRegion, equipItem, performCombatAttack, spendResource } from "../server/src/game/baseSystems";

describe("base game systems", () => {
  it("manages resources and equipment", () => {
    const resources = spendResource(createResources(5), "mana", 10);
    expect(resources.mana).toBe(65);
    const item = { id: "sword-1", templateId: "iron-sword", name: "Iron Sword", rarity: "common", level: 1, value: 25, power: 4, slot: "mainHand" as const, quantity: 1 };
    expect(equipItem({ slots: {} }, item).slots.mainHand).toBe("sword-1");
  });

  it("stacks consumable inventory entries", () => {
    const item = { id: "potion-1", templateId: "minor-potion", name: "Minor Potion", rarity: "common", level: 1, value: 10, power: 0, quantity: 2 };
    const inventory = addItem(addItem([], item), { ...item, id: "potion-2", quantity: 3 });
    expect(inventory).toHaveLength(1);
    expect(inventory[0].quantity).toBe(5);
  });

  it("tracks world discovery and time", () => {
    let world = createWorldState();
    world = discoverRegion(world, "blackglass");
    expect(world.discoveredRegionIds).toContain("blackglass");
    world = { ...world, turn: 23, day: 1 };
    const advanced = (await import("../server/src/game/baseSystems")).advanceWorld(world, 2);
    expect(advanced.day).toBe(2);
    expect(advanced.turn).toBe(25);
  });

  it("resolves a combat turn and ends when the target falls", () => {
    const combat = createCombatState([
      { id: "hero", hp: 50, maxHp: 50, armor: 10, attackBonus: 5, damage: 10 },
      { id: "beast", hp: 8, maxHp: 8, armor: 10, attackBonus: 2, damage: 4 }
    ]);
    const result = performCombatAttack(combat, "beast", 20);
    expect(result.finished).toBe(true);
    expect(result.winnerId).toBe("hero");
    expect(result.combatants.beast.hp).toBe(0);
  });
});
