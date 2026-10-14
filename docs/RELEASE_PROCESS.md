# D20 Dungeon Studio Release Process

## Studio identity

**Endgame Studio** is the credited development-studio identity for D20 Dungeon Studio. Release packages, release notes, and project-facing documentation should identify Endgame Studio as the developer/studio credit and **ArkansasIo** as the GitHub developer/account identity.

## Build identity

Every packaged build should carry three identifiers:

1. **Version** — semantic version such as `1.0.0-alpha.1`.
2. **Build ID** — unique CI/release identifier such as `D20DS-20261014-001`.
3. **Channel** — `alpha`, `beta`, `rc`, or `gold`.

A package should also record its Git commit SHA and build timestamp when produced by CI.

## Release stages

### Alpha
Early integrated builds used for feature, architecture, UI, rules, and regression testing. Breaking changes are allowed.

### Beta
Feature-complete builds used for broader testing, compatibility checks, gameplay balancing, multiplayer testing, and database migration validation.

### Release Candidate
A release candidate is frozen except for release-blocking defects. Build, test, packaging, upgrade/migration, and deployment checks must pass.

### Gold
The final release build. The version is promoted without an `-alpha`, `-beta`, or `-rc` suffix. Gold requires a clean test/build/package result and documented release notes.

## Package targets

The project has two primary distribution targets:

- **Static Web package** — Vite output suitable for GitHub Pages or another static host.
- **Server package** — compiled Express server plus frontend build and required configuration/database migration assets.

Optional future packages may include desktop, container, or dedicated-server distributions.

## Pre-release checklist

- [ ] Update semantic version.
- [ ] Assign unique Build ID.
- [ ] Set release channel.
- [ ] Run `npm test`.
- [ ] Run `npm run build`.
- [ ] Validate database migrations when server package is released.
- [ ] Verify static GitHub Pages build.
- [ ] Record Git commit SHA.
- [ ] Produce release archive/checksums.
- [ ] Update `CHANGELOG.md`.
- [ ] Tag the release in Git.

## Naming convention

Suggested archive names:

- `d20-dungeon-studio-1.0.0-alpha.1-static.zip`
- `d20-dungeon-studio-1.0.0-alpha.1-server.zip`
- `d20-dungeon-studio-1.0.0-gold-static.zip`
- `d20-dungeon-studio-1.0.0-gold-server.zip`

Gold archives omit pre-release identifiers because Gold is the final semantic version.
