# D20 Dungeon Studio — Endgame Content

## Activity matrix

| Activity | Floors | Party | Boss cadence |
|---|---:|---:|---:|
| Dungeon | up to 20 | 5 | every 5 |
| Raid | up to 12 | 10 | every 3 |
| Trial | 9 | 5 | every floor |
| Tower | 100 | 5 | every 10 |

## World levels

World levels **1–9** scale enemy level bands, hit points, damage, encounter budgets and minimum loot rarity. The scaling is data-driven so it can be balanced without changing the client.

## Rarity 1–9

1. Common
2. Fine
3. Superior
4. Rare
5. Epic
6. Mythic
7. Ancient
8. Exalted
9. Transcendent

Each item has a slot, rarity, required level, power score and tags. Loot tables use weighted entries rather than hard-coded drops.

## Encounter hierarchy

- Mob
- Elite
- Champion
- Boss
- Raid Boss

Boss encounters can add phases, arena mechanics, environmental hazards and scripted objectives in later encounter modules.

## Map families

The generator supports reusable map families such as crypts, ruins, caverns, temples, vaults, citadels, calderas, sky fortresses, arcane towers, clockwork spires, arenas and labyrinths. Seeds select deterministic layouts and can be expanded with room templates.

## Content policy

The implementation uses original names, descriptions and mechanics. It is designed to support 5e-style attributes, checks, actions, classes and encounter math without copying non-open D&D text, proprietary creature stat blocks, or artwork.

## Next content modules

1. Encounter phase/state machine
2. Procedural room templates
3. Boss phase definitions
4. Affix system
5. Crafting and salvage
6. Party matchmaking
7. Raid lockouts and rewards
8. Tower seasonal leaderboards
9. Map seed/version contracts
10. Server-authoritative loot rolls
