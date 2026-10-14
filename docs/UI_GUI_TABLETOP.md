# Tabletop UI / GUI Specification

## Visual direction

D20 Dungeon Studio uses an original fantasy command-console aesthetic rather than reproducing D&D trade dress or copyrighted UI artwork.

## Screen zones

1. Boot layer — system initialization and loading progress.
2. Command header — project identity, backend state, navigation.
3. Campaign workspace — dungeon/world viewport.
4. Rules HUD — active character, HP/resource bars, encounter state, API status.
5. Control rail — generation, character, encounter, GM and campaign controls.
6. Event log — dice checks, combat results, discoveries, quests and system events.

## API interface

The UI never connects directly to MySQL.

Static:
Browser → D20QL client → Dynamic Static API → IndexedDB

Server:
Browser → Fetch/AJAX → Express → D20QL services → MySQL

The client exposes the same logical request methods in both modes.

## Tabletop panels

Character: attributes, derived statistics, class/subclass, level, XP, HP, resources, equipment and conditions.

Encounter: initiative, combatants, action economy, attacks, checks, damage, conditions, reactions and round log.

Dungeon: grid/rooms, doors, secret areas, traps, lighting, discovery state and encounter markers.

Campaign: quests, journal, party roster, NPC relationships, world state, settlement, economy and progression.

GM: encounter builder, map controls, hidden information, NPC/monster controls, initiative override, encounter templates and campaign snapshots.

## Loading / boot behavior

The boot screen is lightweight and client-side. It does not imply server authentication. Backend authentication and authorization occur separately through the API.
