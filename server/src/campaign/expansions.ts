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
  inspirationPatterns: string[];
  systems: string[];
}

const DEFINITIONS = [
  ["expansion-01", "The Frostbound March", "winter survival and frontier war", "A northern frontier freezes around a buried citadel whose defenses are waking."],
  ["expansion-02", "The Emerald Deep", "mythic nature magic and wilderness factions", "A living wilderness expands across settled lands and demands a dangerous pact."],
  ["expansion-03", "The Sunken Crown", "maritime exploration and coastal mysteries", "Lost cities rise from the sea while rival fleets race to claim their relics."],
  ["expansion-04", "The Iron Concord", "magical invention, urban factions, and political intrigue", "Five city-states compete to control a new source of magical machinery."],
  ["expansion-05", "The Shattered Sky", "planar travel and multiverse exploration", "Broken portals connect the realm to hostile skies and impossible worlds."],
  ["expansion-06", "The Crimson Frontier", "mythic heroes, desert travel, and epic trials", "A desert empire fractures when an ancient blood-oath is rediscovered."],
  ["expansion-07", "The Moonlit Court", "magical academies, faerie bargains, and social mysteries", "A hidden court offers peace at a price that alters memory and identity."],
  ["expansion-08", "The Ashen Empire", "gothic horror, cursed regions, and undead politics", "A dead empire returns beneath a commander who cannot remember dying."],
  ["expansion-09", "The Eternal Forge", "high-level planar conflict, bastions, and mythic crafting", "The heroes seek the forge capable of remaking the ancient engine before its enemies reach it."]
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
    inspirationPatterns: [
      ["survival campaign design", "environmental hazards", "regional conflict"],
      ["wilderness exploration", "nature magic", "faction diplomacy"],
      ["maritime adventure", "underwater exploration", "coastal mysteries"],
      ["urban intrigue", "magical invention", "guild politics"],
      ["planar cosmology", "portal travel", "multiverse consequences"],
      ["mythic trials", "desert expedition", "heroic legends"],
      ["magical school life", "social mysteries", "faerie bargains"],
      ["gothic horror", "cursed territories", "undead factions"],
      ["high-level campaign design", "strongholds and allies", "mythic crafting"],
    ][index],
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
