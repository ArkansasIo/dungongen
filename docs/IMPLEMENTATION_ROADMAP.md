# Procedural medieval-fantasy RPG/MMORPG roadmap
## Dungeon
- [x] Seeded rooms/corridors
- [x] Deterministic monsters, traps, treasure, lore and boss content
- [ ] Room-shape/corridor/dead-end/loop/stair/secret-door controls
- [ ] Connectivity and entrance-to-exit validation
- [ ] SVG/PNG/PDF/HTML/JSON exports
- [ ] Editable rooms/doors and selective regeneration
## Settlements
- [x] Seeded roads, districts, walls and buildings
- [ ] Settlement API and interactive viewport
- [ ] Population, markets, gates, guilds, temples and points of interest
## World
- [ ] Terrain/elevation/biomes/rivers/coasts/cultures/borders/trade routes/settlements
- [ ] JSON/GeoJSON export and map layers
## RPG/MMORPG
- [ ] Character classes, stats, abilities and progression
- [ ] NPC factions, quests, dialogue and reputation
- [ ] Monsters, loot tables, crafting and economy
- [ ] Party/guild systems and dungeon instancing
- [ ] Persistent character/world state in MySQL
- [ ] Server-authoritative combat, matchmaking and session management
## MySQL
- [ ] Normalized room/encounter rows
- [ ] Settlement/building/district/world-map tables
- [ ] Generator version and options
- [ ] Authentication, ownership, rate limiting, backups and observability
## Release gates
- npm ci
- TypeScript + Vite production build
- deterministic/connectivity/content/settlement tests
- MySQL integration tests
- green CI with exact commit/workflow recorded
