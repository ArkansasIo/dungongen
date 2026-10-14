import { AjaxClient } from "./ajaxClient";
import { DynamicStaticApi } from "./dynamicStaticApi";
import { DynamicStaticRuntime } from "./dynamicStaticRuntime";
import { generateDungeon } from "../dungeon/generator";

export type ApiMode = "static" | "server";

export interface BackendApiOptions {
  mode?: ApiMode;
  baseUrl?: string;
}

export class BackendApi {
  private readonly ajax: AjaxClient;
  private readonly staticApi?: DynamicStaticApi;

  constructor(options: BackendApiOptions = {}) {
    const mode = options.mode ?? ((import.meta.env.VITE_BACKEND_MODE ?? "static") as ApiMode);

    if (mode === "server") {
      this.ajax = new AjaxClient({ baseUrl: options.baseUrl ?? import.meta.env.VITE_API_BASE_URL ?? "" });
      return;
    }

    const runtime = new DynamicStaticRuntime<object>({});
    const api = new DynamicStaticApi(runtime);
    api.register({
      method: "POST",
      path: "/api/dungeons/generate",
      handler: (request: unknown) => generateDungeon(request as Parameters<typeof generateDungeon>[0])
    });
    this.staticApi = api;
    this.ajax = new AjaxClient();
  }

  async health() {
    if (this.staticApi) {
      return { ok: true, status: 200, data: { service: "d20ql-static-runtime", database: "indexeddb" } };
    }
    return this.ajax.get<{ service: string; database: string }>("/api/health");
  }

  async generateDungeon<T>(request: T) {
    if (this.staticApi) {
      return this.staticApi.request("POST", "/api/dungeons/generate", request);
    }
    return this.ajax.post("/api/dungeons/generate", request);
  }
}
