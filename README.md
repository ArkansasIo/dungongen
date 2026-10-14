# D20 Dungeon Studio

An original TypeScript + MySQL procedural dungeon generator inspired by the general category of fantasy map generators. This project does not copy Donjon source code, branding, or proprietary implementation.

## Stack
- React + TypeScript + Vite frontend
- Express REST API with Zod request validation
- MySQL 8 persistence
- Seeded procedural generation of rooms, corridors, doors, entrance, and exit
- Docker Compose for local MySQL

## Current status
This repository is being initialized with the project architecture and implementation files. See `docs/API.md` and `docs/ARCHITECTURE.md`.

## Quick start
1. Copy `.env.example` to `.env` and change passwords.
2. Start Docker Desktop.
3. Run `docker compose up -d mysql`
4. Run `npm install`
5. Run `npm run db:migrate`
6. Run `npm run dev`
7. Visit `http://localhost:5173`.

Requirements: Node.js 20+, npm 10+, and Docker or MySQL 8.

## Scripts
- `npm run dev` — start frontend and API
- `npm run build` — type-check server and build frontend
- `npm test` — run generation tests
- `npm run db:migrate` — apply initial SQL schema

## Security
Do not commit `.env` or production secrets. The current starter has no account authentication; before public deployment add authentication and owner-scoped saved-dungeon access, rate limiting, TLS, backups, and monitoring.
