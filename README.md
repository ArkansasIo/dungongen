# D20 Dungeon Studio

An original TypeScript + MySQL procedural fantasy dungeon generator inspired by the general category of tools offered by Donjon. This repository does not copy Donjon source code, branding, or proprietary implementation.

## Stack
- React + TypeScript + Vite frontend
- Express REST API with Zod validation
- MySQL 8 persistence
- Seeded room, corridor, door, entrance, and exit generation
- Docker Compose development database
- API, architecture, ERD documentation and generator unit tests

## Quick start
Requirements: Node.js 20+, npm 10+, and Docker Desktop or MySQL 8.

1. Copy `.env.example` to `.env`.
2. Change `DB_PASSWORD` and configure a secure root password in your local environment.
3. Start Docker Desktop.
4. Run `docker compose up -d mysql`.
5. Run `npm install`.
6. Run `npm run db:migrate`.
7. Run `npm run dev`.
8. Open `http://localhost:5173`. The API defaults to `http://localhost:3001`.

## Commands
- `npm run dev` — run the frontend and API concurrently
- `npm run build` — type-check the server and build the frontend
- `npm test` — run generator tests
- `npm run db:migrate` — create database tables

## API
- `GET /api/health`
- `POST /api/dungeons/generate` — generate without saving
- `POST /api/dungeons` — generate and save a dungeon
- `GET /api/dungeons` — list recent saved dungeons
- `GET /api/dungeons/:id` — load a saved dungeon

Generation limits: width 21–81, height 21–61, 4–28 rooms, level 1–20. Repeat the same seed and options for a repeatable map.

## Data model
MySQL tables: `users`, `dungeons`, `dungeon_rooms`, `dungeon_encounters`, and `generation_presets`. The current saving endpoint stores each generated map as JSON in `dungeons.map_json`; normalized room and encounter population is a planned extension.

## Security and limitations
Never commit `.env` or production credentials. The current starter does not implement authentication or user-scoped access to saved maps. Before internet-facing deployment, add authentication, owner authorization, rate limiting, TLS, backups, and monitoring. CI is configured to run tests and build, but the code has not yet been verified by a completed CI run.
