# Architecture

```mermaid
flowchart TD
 Browser[React + TypeScript] --> API[Express REST API]
 API --> Validate[Zod validation]
 Validate --> Gen[Seeded dungeon generator]
 API --> Pool[MySQL pool]
 Pool --> DB[(MySQL 8)]
 Gen --> Browser
 Gen --> Persist[Saved dungeon JSON]
 Persist --> DB
```

The browser is untrusted; request bodies are validated server-side. SQL uses placeholders. Secrets are read from environment variables and `.env` is gitignored. CORS is restricted to `CLIENT_ORIGIN`.
