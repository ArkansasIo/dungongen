import { describe, expect, it } from "vitest";
import { createPersistentPlayer, getAvailableQuests, startCampaignQuest, completeCampaignQuest } from "../server/src/game/campaignGameService";

describe("persistent campaign integration", () => {
  it("starts and completes the first campaign quest", () => {
    let player = createPersistentPlayer("p1","Hero","warrior");
    const first = getAvailableQuests(player)[0];
    expect(first).toBeDefined();
    player = startCampaignQuest(player, first.id);
    player = completeCampaignQuest(player, first.id);
    expect(player.completedQuestIds).toContain(first.id);
    expect(player.character.xp).toBeGreaterThanOrEqual(0);
    expect(player.resources.gold).toBeGreaterThan(100);
  });

  it("requires the previous act finale before the next act begins", () => {
    let player = createPersistentPlayer("p1","Hero","warrior");
    const actTwoFirst = "act-2-chapter-1-main-1";
    expect(() => startCampaignQuest(player, actTwoFirst)).toThrow("quest prerequisites are not complete");
    expect(getAvailableQuests(player).some(q=>q.id===actTwoFirst)).toBe(false);
  });
});
