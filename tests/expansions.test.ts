import { describe, expect, it } from "vitest";
import { CAMPAIGN_EXPANSIONS, EXPANSION_TOTALS } from "../server/src/campaign/expansions";

describe("campaign expansions", () => {
  it("defines nine expansions", () => {
    expect(CAMPAIGN_EXPANSIONS).toHaveLength(9);
  });

  it("provides sixty quests per expansion", () => {
    for (const expansion of CAMPAIGN_EXPANSIONS) {
      expect(expansion.acts).toBe(6);
      expect(expansion.chaptersPerAct).toBe(5);
      expect(expansion.mainQuests).toBe(30);
      expect(expansion.sideQuests).toBe(30);
      expect(expansion.totalQuests).toBe(60);
    }
  });

  it("calculates the complete expansion scope", () => {
    expect(EXPANSION_TOTALS).toEqual({
      expansionCount: 9,
      totalActs: 54,
      totalChapters: 270,
      totalQuests: 540,
      totalMainQuests: 270,
      totalSideQuests: 270,
    });
  });
});
