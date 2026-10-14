import { describe, expect, it } from "vitest";
import { CAMPAIGN_EXPANSIONS } from "../server/src/campaign/expansions";
import {
  generateExpansionQuests,
  getBaseCampaignQuests,
  getCampaignStats,
  rollQuestLoot
} from "../server/src/campaign/campaignEngine";

describe("base campaign engine", () => {
  it("generates the complete base quest set", () => {
    const quests = getBaseCampaignQuests();
    expect(quests).toHaveLength(240);
    expect(quests.filter((quest) => quest.kind === "main")).toHaveLength(120);
    expect(quests.filter((quest) => quest.kind === "side")).toHaveLength(120);
    expect(new Set(quests.map((quest) => quest.id)).size).toBe(240);
  });

  it("generates sixty quests for every expansion", () => {
    for (const expansion of CAMPAIGN_EXPANSIONS) {
      const quests = generateExpansionQuests(expansion.number);
      expect(quests).toHaveLength(60);
      expect(quests.filter((quest) => quest.kind === "main")).toHaveLength(30);
      expect(quests.filter((quest) => quest.kind === "side")).toHaveLength(30);
      expect(quests.some((quest) => quest.objective === "boss")).toBe(true);
    }
  });

  it("reports the complete campaign totals", () => {
    expect(getCampaignStats()).toEqual({
      baseQuests: 240,
      expansionQuests: 540,
      totalQuests: 780,
      mainQuests: 390,
      sideQuests: 390
    });
  });

  it("makes deterministic weighted loot rolls", () => {
    const table = {
      entries: [
        { templateId: "test-a", rarity: "common", weight: 70, minQuantity: 1, maxQuantity: 2 },
        { templateId: "test-b", rarity: "rare", weight: 30, minQuantity: 2, maxQuantity: 4 }
      ]
    };
    expect(rollQuestLoot(table, "alpha", 5)).toEqual(rollQuestLoot(table, "alpha", 5));
    expect(() => rollQuestLoot(table, "alpha", 0)).toThrow();
  });
});
