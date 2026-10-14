# D20QL — D20 Game Query Language

D20QL is the game's portable data language. It provides a small SQL-like syntax for campaign/world data while allowing the same commands to target MySQL or browser storage.

## Design goals
- Human-readable campaign data.
- Deterministic game-state operations.
- MySQL persistence when a backend exists.
- IndexedDB/localStorage fallback for GitHub Pages.
- No proprietary SQL extensions are required underneath.
- Parameterized SQL generation; D20QL must never concatenate untrusted values into SQL.

## Example

```d20ql
WORLD medieval "Aurelian Age" {
  SEED "oak-and-iron"
  MAP 48 x 32
  TURN YEARLY
}

FACTION "Aurelian Kingdom" {
  TREASURY 5000
  POPULATION 10000
  MILITARY 100
  RESEARCH 20
}

TURN 1 {
  RESEARCH 150
  RECRUIT 250
  TRADE 100
}

SAVE CAMPAIGN "aurelian-age"
```

## Data model

D20QL maps to these logical entities:
- WORLD
- CELL
- FACTION
- SETTLEMENT
- CHARACTER
- PARTY
- ARMY
- ITEM
- QUEST
- DUNGEON
- TURN
- EVENT
- CAMPAIGN

## Storage targets

The compiler exposes the same logical operations through adapters:

```
D20QL -> AST -> StorageAdapter
                    ├── BrowserAdapter -> IndexedDB
                    └── MySQLAdapter   -> parameterized SQL
```

GitHub Pages uses BrowserAdapter by default. A deployed backend can switch to MySQLAdapter without changing campaign files.

## Security

D20QL values are parsed into typed parameters. Generated MySQL statements use placeholders such as `?`; user input is never inserted directly into SQL text.

## Versioning

Campaign files should carry a language version:

```
D20QL 1.0
```

Future versions can add multiplayer, server-authoritative turns, replication, and modding without invalidating existing campaign files.
