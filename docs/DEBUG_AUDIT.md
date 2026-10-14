# Debug Audit

## Audit date

2026-10-14.

## Fixes applied

- Removed an invalid `totalLevelXp` property from the 720-level player progression return value.
- Registered the static `POST /api/dungeons/generate` route in `BackendApi`.
- Added `typecheck:client`, `typecheck:server`, and `check` npm scripts.
- Added regression coverage for the progression profile shape.
- Added source-level release metadata in `src/buildInfo.ts`.
- Updated GitHub Pages CI to run the test suite and full build instead of only the frontend type-check.
- Pages CI uses `npm install` because the repository currently does not contain a lockfile.

## Verification commands

```bash
npm install
npm run check
npm run build
npm test
```

## Verification limitation

The maintenance environment used for this audit cannot resolve `github.com` from its network sandbox, so a local clone and local execution of npm commands could not be performed here. GitHub Actions is therefore the authoritative executable verification path for the pushed repository.

A successful Pages deployment should only be reported after the corresponding GitHub Actions run completes successfully.

## Release identity

- Studio: Endgame Studio
- GitHub account: ArkansasIo
- Version: 1.0.0-alpha.1
- Build ID: D20DS-20261014-001
- Channel: alpha
