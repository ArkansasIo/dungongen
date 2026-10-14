import type { CampaignState } from "../game/campaignState";

export interface StaticBackend {
  readonly kind: "static";
  create<T>(collection: string, value: T): Promise<T>;
  list<T>(collection: string): Promise<T[]>;
  get<T>(collection: string, id: string): Promise<T | null>;
  put<T extends { id: string }>(collection: string, value: T): Promise<T>;
  remove(collection: string, id: string): Promise<void>;
}

const DB_NAME = "d20ql-static-backend";
const DB_VERSION = 1;
const STORE = "records";

type RecordRow = { key: string; collection: string; id: string; value: unknown };

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE)) {
        db.createObjectStore(STORE, { keyPath: "key" });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function key(collection: string, id: string) {
  return collection + ":" + id;
}

export class IndexedDbBackend implements StaticBackend {
  readonly kind = "static" as const;

  private async transaction(mode: IDBTransactionMode, fn: (store: IDBObjectStore) => void) {
    const db = await openDb();
    return new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE, mode);
      fn(tx.objectStore(STORE));
      tx.oncomplete = () => { db.close(); resolve(); };
      tx.onerror = () => { db.close(); reject(tx.error); };
      tx.onabort = () => { db.close(); reject(tx.error); };
    });
  }

  async create<T>(collection: string, value: T): Promise<T> {
    const id = crypto.randomUUID();
    const row: RecordRow = { key: key(collection, id), collection, id, value };
    await this.transaction("readwrite", store => store.put(row));
    return value;
  }

  async list<T>(collection: string): Promise<T[]> {
    const db = await openDb();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE, "readonly");
      const request = tx.objectStore(STORE).getAll();
      request.onsuccess = () => {
        db.close();
        resolve((request.result as RecordRow[])
          .filter(row => row.collection === collection)
          .map(row => row.value as T));
      };
      request.onerror = () => { db.close(); reject(request.error); };
    });
  }

  async get<T>(collection: string, id: string): Promise<T | null> {
    const db = await openDb();
    return new Promise((resolve, reject) => {
      const request = db.transaction(STORE, "readonly").objectStore(STORE).get(key(collection, id));
      request.onsuccess = () => { db.close(); resolve((request.result as RecordRow | undefined)?.value as T ?? null); };
      request.onerror = () => { db.close(); reject(request.error); };
    });
  }

  async put<T extends { id: string }>(collection: string, value: T): Promise<T> {
    await this.transaction("readwrite", store =>
      store.put({ key: key(collection, value.id), collection, id: value.id, value } satisfies RecordRow));
    return value;
  }

  async remove(collection: string, id: string): Promise<void> {
    await this.transaction("readwrite", store => store.delete(key(collection, id)));
  }
}

export type BackendMode = "static" | "server";

export function getBackendMode(): BackendMode {
  return (import.meta.env.VITE_BACKEND_MODE ?? "static") as BackendMode;
}

export function createStaticBackend(): StaticBackend {
  if (typeof indexedDB === "undefined") {
    throw new Error("IndexedDB is unavailable in this browser.");
  }
  return new IndexedDbBackend();
}

// Shared state shape stays compatible with the full Express/MySQL backend.
export type StaticCampaignSnapshot = Pick<CampaignState, "campaignId" | "turn" | "phase">;
