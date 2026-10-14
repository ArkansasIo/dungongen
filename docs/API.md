# API contract

Base path: `/api`.

- `GET /health`: database-backed health status.
- `POST /dungeons/generate`: generate a map without saving.
- `POST /dungeons`: generate and save, returning HTTP 201 and database ID.
- `GET /dungeons`: newest 100 saved dungeon summaries.
- `GET /dungeons/:id`: load a saved map or return 404.

Bounds: width 21–81, height 21–61, roomCount 4–28, level 1–20. All inputs are validated server-side.
