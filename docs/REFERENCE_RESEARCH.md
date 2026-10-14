# Generator research and design references

Research checked on 2026-10-14. These are references for feature analysis, not sources to copy wholesale.

## Dungeon layouts and encounter structure

- Donjon d20 Dungeon Generator: https://donjon.bin.sh/d20/dungeon/
  - Reference features: seed, dungeon level, party size, motif, size, layout, room layout/size, doors, corridors, dead-end handling, stairs, map style/grid, and exports including PDF, HTML, and JSON.
- Donjon's technical note: https://donjon.bin.sh/code/dungeon/
  - Describes a 2D cell matrix and odd-coordinate room/corridor placement.
- Watabou One Page Dungeon: https://watabou.itch.io/one-page-dungeon
  - Useful patterns: compact readable plans, room notes, tags, seeded generation, style options, and JSON/SVG/PNG export.
- Dungeon Scrawl: https://www.dungeonscrawl.com/
  - Useful patterns: editable maps, one-click random dungeon generation, visual styles, and tabletop export.
- Azgaar Fantasy Map Generator: https://azgaar.github.io/Fantasy-Map-Generator/
  - Useful world-scale features: terrain layers, rivers, biomes, cultures, states, routes, settlements, labels, and JSON/GeoJSON export.

## Architecture direction

1. Keep seeded grid generation as the dungeon-layout core.
2. Add a deterministic content pass assigning room roles, encounters, traps, treasure, and lore.
3. Use distinct data models for dungeon floors, settlements, and world/region maps.
4. Separate generation from rendering so maps can render as blueprint, parchment, VTT, or illustrated styles.
5. Store seed, options, generator version, map JSON, and content JSON to reproduce saved maps.
6. Validate entrance-to-exit reachability, room access, and stair/door progression before returning maps.

## Licensing and originality

Implement original algorithms, interface, names, and content. Do not copy source code, artwork, logos, or proprietary encounter tables. Record exact upstream licenses and attribution before integrating third-party code or assets.
