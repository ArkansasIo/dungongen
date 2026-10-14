# GitHub Pages deployment

The React/Vite frontend can be hosted at the repository GitHub Pages address. GitHub Pages is static hosting, so the browser UI must not require a local Express/MySQL server for its initial demo.

## Deployment architecture
- GitHub Pages: React/Vite frontend and static generated-map demo.
- Express/TypeScript API: dynamic save/load, accounts and multiplayer services.
- MySQL: durable campaign/world persistence.
- Optional Java service: authoritative multiplayer/turn-resolution service.

## Vite base path
For a repository named `dungongen`, configure Vite with a repository-relative base path when deploying as a project site:
`base: '/dungongen/'`.

If the repository is renamed, update the base path.

## GitHub Pages workflow
A GitHub Actions workflow should run on pushes to `main`, install dependencies, build the frontend, upload `dist` as a Pages artifact, and deploy it to Pages. Configure the repository Pages source as GitHub Actions if the repository settings require manual selection.

## Backend limitation
GitHub Pages cannot run Express, MySQL, or Java server processes. For a complete online game, host those services separately and set the frontend API URL through a build-time environment variable.
