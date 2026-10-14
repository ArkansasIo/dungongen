export interface CampaignExpansion {
  id: string;
  number: number;
  title: string;
  theme: string;
  acts: number;
  chaptersPerAct: number;
  mainQuests: number;
  sideQuests: number;
  totalQuests: number;
  synopsis: string;
  systems: string[];
}

const DEFINITIONS = [
  ["expansion-01", "The Frostbound March", "winter survival and frontier war", "A northern frontier freezes around a buried citadel whose defenses are waking."],
  ["expansion-02", "The Emerald Deep", "forest kingdoms and ancient nature magic", "A living wilderness expands across settled lands and demands a dangerous pact."],
  ["expansion-03", "The Sunken Crown", "underwater ruins and maritime exploration", "Lost cities rise from the sea while rival fleets race to claim their relics."],
  ["expansion-04", "The Iron Concord", "industrial fantasy and faction warfare", "Five city-states compete to control a new source of magical machinery."],
  ["expansion-05", "The Shattered Sky", "planar exploration and celestial mystery", "Broken portals connect the realm to hostile skies and impossible worlds."],
  ["expansion-06", "The Crimson Frontier", "desert exploration and caravan warfare", "A desert empire fractures when an ancient blood-oath is rediscovered."],
  ["expansion-07", "The Moonlit Court", "faerie politics and supernatural intrigue", "A hidden court offers peace at a price that alters memory and identity."],
  ["expansion-08", "The Ashen Empire", "undead armies and fallen kingdoms", "A dead empire returns beneath a commander who cannot remember dying."],
  ["expansion-09", "The Eternal Forge", "endgame war and mythic crafting", "The heroes seek the forge capable of remaking the ancient engine before its enemies reach it."]
] as const;

export const CAMPAIGN_EXPANSIONS: CampaignExpansion[] = DEFINITIONS.map(
  ([id, title, theme, synopsis], index) => ({
    id,
    number: index + 1,
    title,
    theme,
    acts: 6,
    chaptersPerAct: 5,
    mainQuests: 30,
    sideQuests: 30,
    totalQuests: 60,
    synopsis,
    systems: [
      "story-campaign",
      "quest-prerequisites",
      "d20-resolution",
      "loot-tables",
      "faction-reputation",
      "regional-events",
      "new-dungeons",
      "new-equipment",
    ],
  }),
);

export const EXPANSION_TOTALS = {
  expansionCount: CAMPAIGN_EXPANSIONS.length,
  totalActs: CAMPAIGN_EXPANSIONS.reduce((sum, expansion) => sum + expansion.acts, 0),
  totalChapters: CAMPAIGN_EXPANSIONS.reduce((sum, expansion) => sum + expansion.acts * expansion.chaptersPerAct, 0),
  totalQuests: CAMPAIGN_EXPANSIONS.reduce((sum, expansion) => sum + expansion.totalQuests, 0),
  totalMainQuests: CAMPAIGN_EXPANSIONS.reduce((sum, expansion) => sum + expansion.mainQuests, 0),
  totalSideQuests: CAMPAIGN_EXPANSIONS.reduce((sum, expansion) => sum + expansion.sideQuests, 0),
} as const;
