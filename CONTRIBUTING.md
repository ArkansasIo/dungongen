# Contributing to D20 Dungeon Studio

Thank you for contributing to D20 Dungeon Studio.

## Before you start

1. Read the README and relevant documentation under `docs/`.
2. Check existing issues and pull requests before starting duplicate work.
3. Keep contributions original or appropriately licensed.
4. Do not add proprietary game assets, copied source code, copyrighted rulebook text, or material that you do not have permission to redistribute.

## Development

Requirements: Node.js 20+ and npm 10+. MySQL 8 and Docker are required for server/database work.

```bash
npm install
npm test
npm run build
```

For database development:

```bash
npm run db:migrate
```

## Coding guidelines

- Use TypeScript for new application and server logic.
- Prefer small, data-driven modules over large monolithic components.
- Preserve deterministic seeded behavior where procedural generation is involved.
- Validate external/server input with the project's existing validation patterns.
- Keep browser/static and server implementations behind shared contracts where practical.
- Avoid committing secrets, credentials, generated database dumps, or local environment files.

## Pull requests

A good pull request should:

- Explain the problem and the implementation.
- Identify important architectural or gameplay changes.
- Include tests for new deterministic logic where practical.
- Include UI screenshots for significant visual changes when useful.
- Update documentation when behavior or public interfaces change.
- State known limitations or follow-up work.

Before requesting review, run the relevant test and build commands and report the actual results.

## Commit messages

Use concise, descriptive commit messages, for example:

- `Add procedural tower encounters`
- `Fix static runtime persistence`
- `Update command-center HUD`
- `Document release packaging`

## Security

Do not report credentials, private data, or exploitable details in public issues. For security-sensitive problems, use GitHub's private vulnerability reporting when available rather than publishing working exploit instructions.

## License

By contributing, you agree that your contribution is provided under the repository's MIT License unless a different license is explicitly stated for the contributed material.
