# D20QL Dynamic Static Runtime

## Goal

Make the GitHub Pages edition behave like a small application server without requiring GitHub Pages to execute server code.

### Architecture

Browser
  -> React UI
  -> D20QL services
  -> Dynamic Static API
  -> Dynamic Static Runtime
  -> IndexedDB
  -> BroadcastChannel

The existing full-server mode remains:

Browser
  -> React UI
  -> D20QL services
  -> Express API
  -> MySQL

## Dynamic features

The static runtime supports a live in-browser state machine, event dispatch, REST-like local routes, persistence integration, and multi-tab synchronization.

This means two browser tabs can participate in the same local runtime channel on the same device. Campaign turns, map edits, chat/event messages, and other compatible state patches can be propagated without a server.

## Multiplayer boundary

BroadcastChannel is local to the browser/device. It is not Internet multiplayer.

For Internet multiplayer while keeping the frontend static, the same runtime interface can be connected to WebRTC, a hosted realtime service, or the existing Express/MySQL backend. The game logic and D20QL contracts do not need to be rewritten.

## Security

The dynamic static runtime is not a trusted authority. Users can inspect or alter browser state. Never use it as the authority for payments, competitive rankings, privileged administration, or sensitive authentication.

## Deployment

The runtime is ordinary TypeScript bundled by Vite, so it can be deployed to GitHub Pages with no special server process.
