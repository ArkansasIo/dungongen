# D20QL Static Backend

The GitHub Pages edition uses a browser-resident backend adapter.

## Architecture

React UI -> D20QL domain services -> Backend interface -> IndexedDB

The full hosted edition uses:

React UI -> D20QL domain services -> Backend interface -> Express -> MySQL

Both modes share the same campaign-state contracts and D20QL vocabulary.

## Static capabilities

- local accounts/profile records
- campaign saves
- procedural worlds and dungeons
- characters, parties, inventories and quests
- turn state and combat state
- settings and preferences
- offline operation
- import/export of campaign data

## Important security boundary

The static edition is not a secure multiplayer authority. Passwords, permissions, and campaign state stored in a browser can be modified by the user. Do not use browser-only authentication for sensitive or competitive multiplayer.

For authoritative multiplayer, use the Express/MySQL server or another serverless/hosted database with server-side authorization.

## Deployment

Set:

`VITE_BACKEND_MODE=static`

and build normally. No Node server or MySQL instance is required by the Pages build.
