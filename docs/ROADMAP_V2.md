# D20 Dominion V2 Roadmap

## Playable core
- Full campaign state shared by browser and server.
- Local single-player mode with IndexedDB.
- Server mode with Express/MySQL.
- Turn planning and resolution.
- Character, party and settlement state.
- Original quest generator.
- Tactical combat state and initiative.
- Economy and trade.

## Multiplayer
- Campaign lobby and membership.
- WebSocket or Server-Sent Events transport.
- Versioned state patches.
- Turn lock/resolution protocol.
- Chat.
- Reconnect and conflict handling.
- Server-authoritative validation.

## Client UX
- Title/login/register.
- Campaign browser.
- World map.
- Character sheet.
- Party panel.
- Settlement management.
- Quest journal.
- Combat tracker.
- Diplomacy and trade.
- Notifications and event feed.
- Settings and administration.

## Security
- Secure sessions with expiration and revocation.
- Password reset flow.
- CSRF protection where cookie authentication is used.
- Rate limiting on authentication endpoints.
- Authorization on every privileged server operation.
- Audit logging.

## Content
- Original fantasy setting.
- Original creatures, weapons, armor, NPCs and factions.
- Procedural dungeons and settlements.
- Original campaign arcs and random events.
