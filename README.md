# D20 Dungeon Studio

An original TypeScript + MySQL procedural fantasy map and tabletop RPG studio. It draws feature inspiration from public-facing dungeon, settlement, and world-map generators without copying source code, branding, artwork, or proprietary tables.

## Stack
- React + TypeScript + Vite browser application
- JavaScript frontend interactions; API uses TypeScript/JavaScript on Express
- Express REST API with Zod validation
- MySQL 8 persistence and Docker Compose
- Seeded dungeon layouts, room content, settlement generation, and RPG rules prototypes
- AJAX-style asynchronous API calls for generate/save/load flows
- Optional Java/Spring Boot service is a planned boundary for authoritative multiplayer simulation; it is not wired into the application yet

## Features currently in source
- Seeded dungeon rooms, corridors, doors, entrance and exit
- Deterministic room titles, monsters, traps, treasure, lore and boss-room content
- Seeded medieval settlement layouts with roads, districts, walls and buildings
- RPG prototype: classes, attributes, derived stats, XP/level progression, loot rolls and ability eligibility
- Settings and navigation data models
- Original SVG sigil asset
- Research notes, UI/gameplay specification and implementation roadmap

## Tabletop-first target
The intended UI includes a map canvas with clickable rooms and editable layers, dice roller, character sheets, initiative tracker, party inventory, encounter builder, quest journal, fog-of-war, GM-only notes, player view, and printable/exportable maps. See docs/UI_AND_GAMEPLAY_SPEC.md and docs/IMPLEMENTATION_ROADMAP.md.

## Rules and licensing
Target the revised 2024 fifth-edition rules by default, with an explicit legacy 2014 rules profile where practical. Implement rules and game data only from the applicable open SRD or original content; do not reproduce complete rulebooks, non-SRD stat blocks, copyrighted artwork, or proprietary adventure text. Users can import their own legally obtained campaign notes/content. See docs/REFERENCE_RESEARCH.md.

## Quick start
Requirements: Node.js 20+, npm 10+, and Docker Desktop or MySQL 8.
1. Copy .env.example to .env and replace local passwords.
2. Start Docker Desktop.
3. Run docker compose up -d mysql.
4. Run npm install.
5. Run npm run db:migrate.
6. Run npm run dev.
7. Open http://localhost:5173; the API defaults to http://localhost:3001.

## Commands
- npm run dev — frontend and API concurrently
- npm run build — type-check server and build frontend
- npm test — run tests
- npm run db:migrate — apply database migration

## API
- GET /api/health
- POST /api/dungeons/generate
- POST /api/dungeons
- GET /api/dungeons
- GET /api/dungeons/:id

## Important status
The new generator, RPG and UI specification modules are committed, but the React menus are not yet all wired to these modules. The Java service is a planned component, not a completed service. Do not treat the project as production-ready until build, tests, MySQL integration, authentication, and authorization checks pass.
