# D20 Dungeon Studio: interactive UI and RPG/MMORPG design

## Main navigation
- **Studio**: dungeon, settlement, region and world map workspaces.
- **Generate**: map type, seed, dimensions, layout density, theme, difficulty, room count and advanced controls.
- **Map Layers**: grid, walls, rooms, doors, labels, encounters, treasure, traps, lore and DM-only information.
- **Content**: encounter builder, loot tables, NPC/faction editor, quest builder and boss designer.
- **Campaign**: party, characters, inventory, equipment, crafting, quests, journal and progression.
- **Multiplayer**: parties, guilds, dungeon instances, sessions, player visibility and server status.
- **Library**: saved maps, presets, asset packs, generated names and reusable encounter templates.
- **Settings**: appearance, accessibility, export format, default map dimensions, generation limits, autosave and privacy.

## Menus and submenus
1. Studio
   - Dungeon Floor
   - Medieval Settlement
   - Region / World
   - Random Encounter
2. Edit
   - Undo / Redo
   - Select / Move / Paint / Erase
   - Add Room / Door / Stair / Secret Door / POI
   - Regenerate Selected Area
3. Game Systems
   - Characters and Classes
   - Attributes and Progression
   - Abilities and Cooldowns
   - Monsters and Bosses
   - Loot and Economy
   - Quests and Factions
   - Crafting and Research
4. Export
   - JSON
   - SVG / PNG
   - Print PDF
   - VTT package
5. Settings
   - General
   - Generation
   - Visual Theme
   - Controls
   - Multiplayer
   - Database / Diagnostics

## Interaction requirements
- All controls update local state immediately and have keyboard focus/labels.
- Generate button uses a seed; same seed + options + generator version reproduces a map.
- Clicking a room opens a side inspector with room role, dimensions, encounter list, treasure, traps, notes and edit actions.
- Layer toggles must actually show/hide the corresponding layer.
- Save/load uses the API and MySQL; show explicit saved/failed status.
- Export controls produce actual files, not placeholder buttons.
- Include reset-to-defaults and validation feedback for invalid options.
- Separate GM-only content from player-visible content.

## RPG mechanics foundation
The source module `server/src/rpg/rpgSystems.ts` provides system-neutral character creation, class attribute bonuses, derived stats, level XP progression, deterministic loot rolls and ability eligibility. It is a prototype ruleset, not a licensed D&D implementation.

## MMORPG architecture
- Server-authoritative character state and combat; clients send intents, not final damage values.
- Persist accounts, characters, inventories, quests, parties, guilds and world instances in MySQL.
- Keep dungeon generation deterministic and record generator version + options.
- Instance lifecycle: queued -> creating -> active -> closing -> archived.
- Use transactions for loot claims, currency transfers, crafting consumption and quest rewards.
- Add authentication, authorization, rate limiting, audit logs, backups and operational monitoring before public exposure.
- Avoid using one MySQL process as a high-frequency real-time simulation loop; use a dedicated authoritative game service and MySQL for durable state.
