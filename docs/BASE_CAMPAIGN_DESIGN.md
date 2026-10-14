# Base Campaign Design: The Chronicle of the Unbound

## Scope

This is an original medieval-fantasy campaign for D20 Dungeon Studio. It studies broad design techniques used by fifth-edition fantasy adventures—exploration, faction politics, survival, mystery, dungeon progression, moral choices, and escalating threats—without adapting their plots, settings, dialogue, characters, maps, or distinctive monsters.

**Base game:** 12 acts × 5 chapters = 60 chapters.  
**Quest target:** 10 main quests and 10 side quests per act = 240 quests.  
**Chapter allocation:** 2 main quests + 2 side quests per chapter. The second main quest in chapter 5 is the chapter boss or major confrontation.

## Inspiration-to-original-design matrix

| Public reference | General design lesson | Original implementation |
|---|---|---|
| Lost Mine of Phandelver | Clear entry point, local stakes, dungeon discovery | Missing caravan and an abandoned road reveal an ancient-engine conspiracy |
| Curse of Strahd | Strong atmosphere, investigation, consequential choices | A memory-haunted border province with an original antagonist and no borrowed setting or characters |
| Storm King's Thunder | Large-scale travel and regional conflicts | Rival frontier houses and displaced communities contest routes and resources |
| Tomb of Annihilation | Exploration pressure, hazards, resource management | An expedition into changing ruins where navigation and supplies affect outcomes |
| Waterdeep: Dragon Heist | Urban intrigue, factions, non-linear approaches | A royal succession crisis involving original guilds, evidence, and competing claimants |
| Waterdeep: Dungeon of the Mad Mage | Multi-layer dungeon progression | A 5-layer-per-act structure for selected major dungeons, with distinct mechanics and rewards |
| Baldur's Gate: Descent into Avernus | Temptation, moral trade-offs, dangerous bargains | Deals with oath-bound powers that change faction trust and later quest options |
| Tyranny of Dragons | Long-form threat escalation and alliances | A conspiracy to break ancient seals, opposed by alliances assembled across the acts |
| Icewind Dale: Rime of the Frostmaiden | Environmental survival and linked mysteries | A harsh northern act with exposure, shelter, and mystery systems |
| Princes of the Apocalypse | Enemy factions and themed regional dungeons | Four original orders competing over the ley-lines that stabilize the ancient engine |

These are inspiration notes, not adaptations. Use only high-level genre and design concepts; all final names, prose, lore, quest scripts, maps, encounter details, and item identities must be original.

## Twelve-act base-game outline

1. **The Ashen Road** — A missing caravan uncovers the first clue to the engine beneath the realm.
2. **Echoes Beneath Stone** — Explore a buried road and learn that the engine was designed to imprison a force.
3. **The Broken Crown** — Investigate forged evidence and keep rival claimants from starting a civil war.
4. **Wardens of the Wild** — Find the source of corrupted ley-lines and negotiate with displaced guardians.
5. **The Drowned Archive** — Recover crystal memories from a flooded repository and expose erased history.
6. **Siege of Blackglass** — Defend a fortress-city and dismantle the construct army's command network.
7. **The Hollow Star** — Race rival scholars to contain a fallen celestial object that distorts magic and dreams.
8. **Kingdoms in Shadow** — Conduct diplomacy and espionage to uncover the alliance manipulating monarchies.
9. **The Veiled Legion** — Trace an army of masked champions to the source of their stolen memories.
10. **The Last Gate** — Secure ancient gates across a hostile frontier and decide which factions may pass.
11. **War of the Unbound** — Coordinate allied forces while the seals begin to fail.
12. **Dawn Beyond the Ruins** — Enter the engine, defeat its surviving will, and determine the realm's future.

## Quest and progression contract

Every quest record should include: stable ID, act/chapter, main-or-side type, title, original narrative summary, quest giver, prerequisites, objective type, target ID, required count, optional branches, failure/recovery state, XP, currency, loot-table ID, faction changes, and completion flags.

Supported objective types: explore, investigate, defeat, collect, escort, defend, dialogue choice, craft, deliver, stealth, and boss encounter.

Quest outcomes should support at least: success, partial success, failed-but-recoverable, abandoned, and locked. Side quests should enrich regions and factions, and should not be mandatory for completing the core campaign.

## Loot-table rules

Each act uses a tier appropriate to its expected player progression. Tables can roll equipment, crafting materials, consumables, currency, cosmetic rewards, lore objects, and rare quest-specific items. Use weighted entries and deterministic seeded rolls so tests and replayable sessions are reproducible. Boss rewards should be guaranteed at least one progression item; random drops must not be required to finish a quest.

Recommended original rarity ladder: Common, Fine, Superior, Rare, Epic, Mythic, Ancient, Exalted, Transcendent. Balance rarity separately from item power so an item's name or color alone never determines its value.

## D20-inspired mechanics

Use a d20 check as a general resolution pattern: d20 + relevant ability modifier + proficiency/skill bonus versus a difficulty target. Keep advantage/disadvantage as a transparent roll modifier. The exact math, character options, content, and item catalogue should be designed for D20 Dungeon Studio rather than copied from non-open D&D books. Check the applicable SRD and license before reproducing any rules text or named content.

## Acceptance checks

- Exactly 12 acts and 5 chapters per act.
- Exactly 10 main quests and 10 side quests per act.
- Exactly 240 quests total: 120 main and 120 side.
- Every quest has a valid loot-table ID and stable unique ID.
- All main-quest prerequisites resolve; no circular prerequisite chains.
- Every act has a chapter-five major confrontation.
- Side quests are optional and cannot soft-lock the main story.
- Loot rolls are seeded, bounded, and testable.
- All story text, factions, NPCs, locations, monsters, and item names are original.
