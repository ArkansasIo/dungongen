import type { Dungeon, GenerateOptions } from "./types";
import { generateDungeon as generateLocalDungeon } from "./dungeon/generator";
import { createStaticBackend, getBackendMode } from "./platform/staticBackend";

const base = import.meta.env.VITE_API_BASE_URL || "/api";
const staticMode = getBackendMode() === "static";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(base + path, init);
  if (!response.ok) {
    let body: { error?: string } = {};
    try { body = await response.json(); } catch {}
    throw new Error(body.error || `Request failed (${response.status})`);
  }
  return response.json() as Promise<T>;
}

const json = (options: GenerateOptions): RequestInit => ({
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(options)
});

let staticStore: ReturnType<typeof createStaticBackend> | null = null;
const COLLECTION = "dungeons";
function getStaticStore() {
  if (!staticMode) return null;
  return staticStore ??= createStaticBackend();
}

function localId(): number {
  return Date.now() * 1000 + Math.floor(Math.random() * 1000);
}

export async function generateDungeon(options: GenerateOptions): Promise<Dungeon> {
  const store = getStaticStore();
  if (store) return generateLocalDungeon(options);
  return request<Dungeon>("/dungeons/generate", json(options));
}

export async function saveDungeon(options: GenerateOptions): Promise<Dungeon> {
  const store = getStaticStore();
  if (!store) return request<Dungeon>("/dungeons", json(options));
  const dungeon = generateLocalDungeon(options);
  const value: Dungeon = { ...dungeon, id: localId(), createdAt: new Date().toISOString() };
  await store.put(COLLECTION, { ...value, id: String(value.id) });
  return value;
}

export async function listDungeons(): Promise<Array<Pick<Dungeon, "id"|"name"|"seed"|"level"|"theme"|"createdAt">>> {
  const store = getStaticStore();
  if (!store) return request("/dungeons");
  const values = await store.list<Dungeon & { id: string }>(COLLECTION);
  return values.map(value => ({ ...value, id: Number(value.id) }));
}

export async function loadDungeon(id: number): Promise<Dungeon> {
  const store = getStaticStore();
  if (!store) return request<Dungeon>("/dungeons/" + id);
  const value = await store.get<Dungeon & { id: string }>(COLLECTION, String(id));
  if (!value) throw new Error("Dungeon not found");
  return { ...value, id: Number(value.id) };
}
