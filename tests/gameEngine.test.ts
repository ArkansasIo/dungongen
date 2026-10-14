import { describe, expect, it } from "vitest";
import { addPlayer, completeQuest, createGameState, createPlayer, startQuest } from "../server/src/game/gameEngine";
import { resolveAttack, resolveCheck } from "../server/src/game/d20Engine";
import { getBaseCampaignQuests } from "../server/src/campaign/campaignEngine";

describe("base game engine", () => {
  it("creates a player and starts the first campaign quest", () => {
    const first = getBaseCampaignQuests()[0];
    let state = addPlayer(createGameState(), createPlayer("p1", "Hero"));
    state = startQuest(state, "p1", first.id);
    expect(state.players.p1.activeQuestIds).toContain(first.id);
  });

  it("completes a quest and applies rewards", () => {
    const first = getBaseCampaignQuests()[0];
    let state = startQuest(addPlayer(createGameState(), createPlayer("p1", "Hero")), "p1", first.id);
    const result = completeQuest(state, "p1", first.id, first.required, "test-seed");
    expect(result.completed).toBe(true);
    expect(result.rewards.xp).toBe(first.xpReward);
    expect(result.player.completedQuestIds).toContain(first.id);
    state = { ...state, players: { ...state.players, p1: result.player } };
    expect(state.players.p1.activeQuestIds).not.toContain(first.id);
  });

  it("resolves natural criticals and failures", () => {
    expect(resolveCheck(20, -10, 30).critical).toBe(true);
    expect(resolveCheck(1, 100, 5).fumble).toBe(true);
  });

  it("resolves combat without allowing negative HP", () => {
    const result = resolveAttack(
      { id: "hero", hp: 100, maxHp: 100, armor: 10, attackBonus: 5, damage: 20 },
      { id: "goblin", hp: 10, maxHp: 10, armor: 10, attackBonus: 2, damage: 3 },
      20,
      "physical"
    );
    expect(result.hit).toBe(true);
    expect(result.damage).toBe(40);
    expect(result.targetHp).toBe(0);
    expect(result.defeated).toBe(true);
  });
});
