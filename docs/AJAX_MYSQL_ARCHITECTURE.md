# AJAX / D20QL / MySQL Architecture

The browser uses one API contract in both deployment modes.

## Static mode

Browser -> Fetch/AJAX -> Dynamic Static API -> D20QL Runtime -> IndexedDB

No external database is required.

## Server mode

Browser -> Fetch/AJAX -> Express REST API -> D20QL services -> MySQL 8

The browser never connects directly to MySQL. This is intentional: MySQL credentials and privileged database operations must remain server-side.

## Example request

POST /api/dungeons/generate

{
  "seed": "winter-001",
  "width": 80,
  "height": 60,
  "theme": "medieval"
}

The response is JSON and uses the same contract in static and server mode.

## MySQL responsibilities

The server-side MySQL layer stores:

- accounts and sessions
- campaign metadata
- campaign membership and permissions
- characters and progression
- inventories and equipment
- settlements and economies
- quests
- dungeons and maps
- combat state
- turn history
- audit events

## AJAX responsibilities

The browser communication layer handles:

- request/response
- JSON serialization
- authentication cookies
- API errors
- dungeon generation requests
- campaign saves/loads
- character updates
- combat actions
- turn submission
- notifications

## Security boundary

Never expose MySQL directly to the browser. The correct architecture is Browser -> HTTPS API -> MySQL.

For Internet multiplayer, the static frontend can remain hosted on GitHub Pages while the API and MySQL are hosted separately.
