import express from "express";
import cors from "cors";
import dungeons from "../routes/dungeons.js";
import { config } from "../config.js";

export function createApp() {
  const app = express();

  app.disable("x-powered-by");
  app.use(cors({
    origin: config.CORS_ORIGIN === "*" ? true : config.CORS_ORIGIN,
    credentials: true,
  }));
  app.use(express.json({ limit: "1mb" }));

  app.get("/api/health", (_req, res) => {
    res.json({ service: "d20-dungeon-studio-api", database: "mysql", status: "ok" });
  });

  app.use("/api/dungeons", dungeons);

  app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    const message = err instanceof Error ? err.message : "Internal server error";
    res.status(500).json({ error: message });
  });

  return app;
}
