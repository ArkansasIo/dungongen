# MySQL schema

Targets MySQL 8.0.16+. Tables cover users, saved dungeons, normalized room coordinates, future encounter records, and reusable generation presets. The initial API stores each complete map in `dungeons.map_json`; normalized room/encounter writes are a follow-up item.
