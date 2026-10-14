# Tabletop Feature Completion

The tabletop layer is organized around deterministic, server-compatible rules functions so the browser UI, Express API, static runtime, and future multiplayer transport can share the same mechanics.

## Rules

- Ability modifiers and skill modifiers
- D20 ability/skill checks
- Natural 1 and natural 20 outcomes
- Attack rolls and critical damage
- Damage types and mitigation
- Temporary hit points
- Defeat detection
- Conditions
- Initiative ordering and round advancement

## Game content

- Spell definitions
- Weapon, armor, consumable, tool, treasure, and quest items
- Encounter templates with difficulty and enemy roles
- Existing dungeon and settlement generators remain the world-content layer

## Intended tabletop loop

1. Generate or load a dungeon.
2. Create or load characters.
3. Explore rooms and reveal map state.
4. Trigger checks, traps, social interactions, or encounters.
5. Start initiative when combat begins.
6. Resolve player intents through the rules engine.
7. Apply damage, healing, conditions, inventory changes, XP, and loot.
8. Advance the round/turn state.
9. Persist the campaign through the selected backend.
10. Keep GM-only state separate from player-visible state.

## Architecture

Browser UI -> D20QL/API contract -> rules engine -> persistence

Static:
Browser -> Dynamic Static Runtime -> IndexedDB

Server:
Browser -> HTTPS Fetch/AJAX -> Express -> D20QL services -> MySQL

The browser must not connect directly to MySQL.

## Visual assets

Original, project-owned SVG assets are under `public/assets/tabletop/` and can be used by the map, GM, encounter, and loading screens.

## Scope boundary

The project uses system-neutral/original mechanics and data structures. It should not ship copied proprietary rulebook text, artwork, or other non-permitted content.
