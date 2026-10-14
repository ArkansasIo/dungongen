# Entity-relationship design

```mermaid
erDiagram
 USERS ||--o{ DUNGEONS : owns
 DUNGEONS ||--o{ DUNGEON_ROOMS : contains
 DUNGEONS ||--o{ DUNGEON_ENCOUNTERS : includes
 DUNGEON_ROOMS o|--o{ DUNGEON_ENCOUNTERS : hosts
```
