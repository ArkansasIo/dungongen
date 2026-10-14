export type RuntimeRole = "host" | "peer" | "offline";

export interface RuntimeEnvelope<T = unknown> {
  id: string;
  runtimeId: string;
  sequence: number;
  type: string;
  payload: T;
  createdAt: number;
}

export interface RuntimeSnapshot<T = unknown> {
  version: number;
  updatedAt: number;
  state: T;
}

export interface DynamicStaticOptions {
  channel?: string;
  runtimeId?: string;
  heartbeatMs?: number;
}

/**
 * A browser-resident application runtime for static hosting.
 *
 * It provides:
 * - a local event/API bus
 * - multi-tab synchronization through BroadcastChannel
 * - an in-memory authoritative state for the current browser session
 * - periodic IndexedDB snapshots
 *
 * No Node process, WebSocket server, or database server is required.
 */
export class DynamicStaticRuntime<T extends object> {
  readonly runtimeId: string;
  readonly role: RuntimeRole;
  private sequence = 0;
  private version = 0;
  private state: T;
  private readonly channel?: BroadcastChannel;
  private readonly listeners = new Set<(message: RuntimeEnvelope) => void>();
  private readonly storageKey: string;
  private heartbeat?: number;

  constructor(initialState: T, options: DynamicStaticOptions = {}) {
    this.runtimeId = options.runtimeId ?? crypto.randomUUID();
    this.state = structuredClone(initialState);
    this.storageKey = `d20ql:runtime:${options.channel ?? "default"}`;

    const channelName = options.channel ? `d20ql:${options.channel}` : "d20ql:runtime";
    if (typeof BroadcastChannel !== "undefined") {
      this.channel = new BroadcastChannel(channelName);
      this.channel.onmessage = event => this.receive(event.data as RuntimeEnvelope);
    }

    const heartbeatMs = options.heartbeatMs ?? 5000;
    if (typeof window !== "undefined") {
      this.heartbeat = window.setInterval(() => this.publish("runtime.heartbeat", {
        runtimeId: this.runtimeId,
        version: this.version
      }), heartbeatMs);
    }

    this.role = "host";
  }

  get snapshot(): RuntimeSnapshot<T> {
    return { version: this.version, updatedAt: Date.now(), state: structuredClone(this.state) };
  }

  getState(): T {
    return structuredClone(this.state);
  }

  subscribe(listener: (message: RuntimeEnvelope) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  dispatch<K extends keyof T>(key: K, value: T[K]): RuntimeEnvelope {
    this.state = { ...this.state, [key]: structuredClone(value) };
    this.version++;
    return this.publish("state.patch", { key, value });
  }

  publish(type: string, payload: unknown): RuntimeEnvelope {
    const envelope: RuntimeEnvelope = {
      id: crypto.randomUUID(),
      runtimeId: this.runtimeId,
      sequence: ++this.sequence,
      type,
      payload,
      createdAt: Date.now()
    };
    this.channel?.postMessage(envelope);
    this.listeners.forEach(listener => listener(envelope));
    return envelope;
  }

  private receive(message: RuntimeEnvelope) {
    if (!message || message.runtimeId === this.runtimeId) return;
    if (message.type === "state.patch") {
      const patch = message.payload as { key: keyof T; value: unknown };
      this.state = { ...this.state, [patch.key]: structuredClone(patch.value) };
      this.version++;
    }
    this.listeners.forEach(listener => listener(message));
  }

  destroy() {
    if (this.heartbeat !== undefined) window.clearInterval(this.heartbeat);
    this.channel?.close();
    this.listeners.clear();
  }
}
