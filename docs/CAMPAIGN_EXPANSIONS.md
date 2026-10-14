# Nine Original Campaign Expansions

These expansions extend **The Chronicle of the Unbound** using broad fantasy-RPG design patterns found across the wider fifth-edition publication ecosystem: survival, wilderness, maritime exploration, urban faction play, planar travel, mythic trials, magical institutions, gothic horror, and high-level campaign play.

The publication catalog contains multiple editions, official and partnered material, adventures, rules supplements, and setting books. It is not a one-to-one list of story campaigns. These expansions therefore synthesize high-level themes rather than claiming to adapt every remaining publication. All plots, names, locations, characters, dialogue, creatures, and item identities are original.

## Expansion source scope

Each expansion contains 6 acts × 5 chapters, with 5 main quests and 5 side quests per chapter. That is 30 main quests + 30 side quests = 60 quests per expansion.

| # | Expansion | Broad inspiration pattern | Core feature |
|---:|---|---|---|
| 1 | The Frostbound March | Survival-focused adventures and environmental hazards | Exposure, shelter, frontier supply lines, and a buried citadel |
| 2 | The Emerald Deep | Wilderness exploration and nature-focused settings | Living biomes, guardian factions, and ecological consequences |
| 3 | The Sunken Crown | Coastal adventures and underwater exploration | Naval travel, diving expeditions, and rising ruins |
| 4 | The Iron Concord | Urban campaigns, invention, and faction politics | Five rival city-states, magical industry, and guild reputation |
| 5 | The Shattered Sky | Planar settings and multiverse exploration | Portal networks, unstable realities, and cross-world consequences |
| 6 | The Crimson Frontier | Mythic journeys, desert expeditions, and heroic trials | Caravan strategy, ancient oaths, and legendary trials |
| 7 | The Moonlit Court | Magical institutions, supernatural bargains, and social mysteries | Academy rivalries, faerie diplomacy, and memory-changing bargains |
| 8 | The Ashen Empire | Gothic horror, cursed lands, and undead threats | Region-wide curses, investigation, and undead political factions |
| 9 | The Eternal Forge | High-level campaigns, strongholds, allies, and legendary crafting | Endgame alliances, a player-supported bastion, and a final mythic forge |

## Data contract

The TypeScript source `server/src/campaign/expansions.ts` exports:
- `CampaignExpansion` — typed expansion definition.
- `CAMPAIGN_EXPANSIONS` — all nine expansion records.
- `EXPANSION_TOTALS` — computed aggregate counts.

Current scope:
- 9 expansions
- 54 expansion acts
- 270 expansion chapters
- 540 expansion quests: 270 main and 270 side

These are campaign design/data definitions. Full quest dialogue, encounter tuning, maps, assets, and expansion-specific loot entries remain follow-on content to implement; the metadata alone should not be represented as nine finished playable expansions.
