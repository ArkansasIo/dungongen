import type { PersistentPlayerState } from "./campaignGameService.js";

export interface PlayerRepository {
  save(player: PersistentPlayerState): Promise<void>;
  load(playerId: string): Promise<PersistentPlayerState | null>;
}

export class MemoryPlayerRepository implements PlayerRepository {
  private readonly players = new Map<string, PersistentPlayerState>();
  async save(player: PersistentPlayerState): Promise<void> {
    this.players.set(player.character.id, structuredClone(player));
  }
  async load(playerId: string): Promise<PersistentPlayerState | null> {
    const player = this.players.get(playerId);
    return player ? structuredClone(player) : null;
  }
}
