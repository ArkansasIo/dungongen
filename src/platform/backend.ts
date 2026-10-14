import { createStaticBackend, getBackendMode, type StaticBackend } from "./staticBackend";

export type Backend = StaticBackend | {
  readonly kind: "server";
  baseUrl: string;
};

export function createBackend(): Backend {
  if (getBackendMode() === "server") {
    return {
      kind: "server",
      baseUrl: import.meta.env.VITE_API_BASE_URL ?? "/api"
    };
  }
  return createStaticBackend();
}
