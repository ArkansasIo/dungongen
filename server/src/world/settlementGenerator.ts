export type SettlementKind = 'hamlet' | 'village' | 'town' | 'walled-city';
export interface Point { x: number; y: number; }
export interface SettlementBuilding { id: number; kind: string; name: string; x: number; y: number; district: string; }
export interface SettlementRoad { id: number; points: Point[]; kind: 'main' | 'lane'; }
export interface Settlement { name: string; seed: string; kind: SettlementKind; width: number; height: number; walls: boolean; roads: SettlementRoad[]; buildings: SettlementBuilding[]; districts: string[]; }

function hashSeed(s: string): number { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
function rng(seed: string): () => number { let state = hashSeed(seed) || 1; return () => { state = (Math.imul(state, 1664525) + 1013904223) >>> 0; return state / 4294967296; }; }
const districts = ['Market Ward', 'Old Quarter', 'Craftsmen Row', 'Temple Precinct', 'Riverside', 'Noble Enclave'];
const buildingKinds = [
  { kind: 'inn', names: ['The Copper Stag', 'The Lantern and Loom', 'The Sleeping Griffin'] },
  { kind: 'shop', names: ['General Goods', 'The Tallow Merchant', 'Mira Provisions'] },
  { kind: 'smithy', names: ['Ironroot Forge', 'The Red Anvil'] },
  { kind: 'shrine', names: ['Shrine of the Hearth', 'Wayside Chapel'] },
  { kind: 'hall', names: ['Guildhall', 'Town Hall', 'Watch House'] },
  { kind: 'home', names: ['Townhouse', 'Cottage', 'Courtyard House'] }
];

/** Original seeded settlement layout with roads, districts, walls and building points. */
export function generateSettlement(input: { seed?: string; name?: string; kind?: SettlementKind; width?: number; height?: number }): Settlement {
  const seed = (input.seed || 'oak-and-iron').slice(0, 80), random = rng(seed);
  const kind = input.kind || 'town';
  const width = Math.max(40, Math.min(200, Math.floor(input.width || 100)));
  const height = Math.max(40, Math.min(200, Math.floor(input.height || 80)));
  const walls = kind === 'walled-city' || (kind === 'town' && random() < 0.35);
  const roads: SettlementRoad[] = [];
  const margin = walls ? 5 : 2;
  const mainY = Math.floor(height * (0.35 + random() * 0.3));
  const mainX = Math.floor(width * (0.35 + random() * 0.3));
  roads.push({ id: 1, kind: 'main', points: [{ x: margin, y: mainY }, { x: width - margin - 1, y: mainY }] });
  roads.push({ id: 2, kind: 'main', points: [{ x: mainX, y: margin }, { x: mainX, y: height - margin - 1 }] });
  const block = kind === 'hamlet' ? 15 : kind === 'village' ? 11 : 8;
  let roadId = 3;
  for (let x = margin + block; x < width - margin; x += block) roads.push({ id: roadId++, kind: 'lane', points: [{ x, y: margin }, { x, y: height - margin - 1 }] });
  for (let y = margin + block; y < height - margin; y += block) roads.push({ id: roadId++, kind: 'lane', points: [{ x: margin, y }, { x: width - margin - 1, y }] });
  const buildings: SettlementBuilding[] = [];
  let id = 1;
  const districtCount = kind === 'hamlet' ? 2 : kind === 'village' ? 3 : districts.length;
  for (let y = margin + 2; y < height - margin - 2; y += 4) {
    for (let x = margin + 2; x < width - margin - 2; x += 4) {
      if (Math.abs(y - mainY) < 2 || Math.abs(x - mainX) < 2 || random() < (kind === 'hamlet' ? 0.45 : 0.2)) continue;
      const pick = buildingKinds[Math.floor(random() * buildingKinds.length)];
      buildings.push({ id: id++, kind: pick.kind, name: pick.names[Math.floor(random() * pick.names.length)], x: x + Math.floor(random() * 2), y: y + Math.floor(random() * 2), district: districts[Math.floor(random() * districtCount)] });
    }
  }
  return { name: (input.name || 'Ashford').slice(0, 100), seed, kind, width, height, walls, roads, buildings, districts: districts.slice(0, districtCount) };
}
