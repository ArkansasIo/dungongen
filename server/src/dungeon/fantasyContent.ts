import type { Dungeon, Room } from './generator.js';

export type RoomRole = 'entrance' | 'guardroom' | 'crypt' | 'shrine' | 'library' | 'armory' | 'treasury' | 'boss' | 'cavern' | 'empty';
export type FeatureKind = 'monster' | 'trap' | 'treasure' | 'lore' | 'hazard' | 'boss';
export interface RoomFeature { kind: FeatureKind; name: string; description: string; threat: number; }
export interface PopulatedRoom { roomId: number; title: string; role: RoomRole; features: RoomFeature[]; }

function hashSeed(s: string): number { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
function randomFor(seed: string): () => number {
  let state = hashSeed(seed) || 1;
  return () => { state += 0x6D2B79F5; let t = state; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}
const roles: RoomRole[] = ['guardroom', 'crypt', 'shrine', 'library', 'armory', 'treasury', 'cavern', 'empty'];
const titles: Record<RoomRole, string[]> = {
  entrance: ['The Broken Gate', 'The Descent Hall'], guardroom: ['Watch of the Ashen Oath', 'Sentinel Chamber'],
  crypt: ['The Dust-King Tomb', 'Hall of Quiet Names'], shrine: ['Sanctum of the Last Ember', 'The Veiled Altar'],
  library: ['The Sable Archive', 'Hall of Unwritten Names'], armory: ['The Rusted Arsenal', 'The Warden Cache'],
  treasury: ['Vault of Seven Seals', 'The Gilded Reliquary'], boss: ['Throne of the Hollow Crown', 'The Final Sepulchre'],
  cavern: ['The Root-Cut Grotto', 'The Shattered Deep'], empty: ['A Silent Chamber', 'The Fallen Gallery']
};
const monsters = ['cave scavengers', 'skeletal sentries', 'goblin raiders', 'restless wights', 'cult guardians', 'an oathbound revenant'];
const traps = ['pressure-plate dart launcher', 'rune-triggered binding circle', 'counterweighted ceiling slab', 'poisoned needle lock', 'collapsing flagstones'];
const treasures = ['a pouch of old silver and a map fragment', 'a potion sealed in blue glass', 'a carved ivory token', 'a modest cache of coins and gemstones', 'an antique signet and a coded letter'];
const lore = ['A mural records a forgotten royal succession.', 'Fresh footprints lead toward a sealed door.', 'An inscription warns that the lowest chamber must remain closed.', 'A broken banner bears a crest absent from modern histories.'];

/** Original, deterministic fantasy room content. Rules remain system-neutral. */
export function populateDungeon(dungeon: Dungeon): PopulatedRoom[] {
  const random = randomFor(dungeon.seed + '|content|' + dungeon.theme + '|' + dungeon.level);
  const lastRoomId = dungeon.rooms[dungeon.rooms.length - 1]?.id;
  return dungeon.rooms.map((room: Room, index) => {
    const role: RoomRole = index === 0 ? 'entrance' : room.id === lastRoomId && dungeon.rooms.length >= 5 ? 'boss' : roles[Math.floor(random() * roles.length)];
    const features: RoomFeature[] = [];
    const roll = random();
    if (role === 'boss') features.push({ kind: 'boss', name: ['The Hollow Knight', 'Ash-Wyrm Matriarch', 'The Veiled Hierophant'][Math.floor(random() * 3)], description: 'A major encounter guarding the dungeon deepest secret.', threat: Math.min(20, dungeon.level + 3) });
    else if (roll < 0.55) features.push({ kind: 'monster', name: monsters[Math.floor(random() * Math.min(monsters.length, 2 + dungeon.level / 3))], description: 'A hostile presence occupies this chamber; allow for retreat or negotiation.', threat: Math.max(1, Math.ceil(dungeon.level * (0.35 + random() * 0.4))) });
    if (random() < 0.22) features.push({ kind: 'trap', name: traps[Math.floor(random() * traps.length)], description: 'Investigation or a visible clue can reveal the mechanism before it triggers.', threat: Math.max(1, Math.ceil(dungeon.level * 0.35)) });
    if (role === 'treasury' || random() < 0.38) features.push({ kind: 'treasure', name: treasures[Math.floor(random() * treasures.length)], description: 'Reward value should scale with dungeon level and the game economy.', threat: 0 });
    if (role === 'library' || role === 'shrine' || random() < 0.2) features.push({ kind: 'lore', name: 'Environmental clue', description: lore[Math.floor(random() * lore.length)], threat: 0 });
    return { roomId: room.id, title: titles[role][Math.floor(random() * titles[role].length)], role, features };
  });
}
