import { resolveAttack, type Combatant, type DamageType } from "./d20Engine.js";

export type ResourceType = "gold" | "mana" | "stamina" | "renown";
export type EquipmentSlot = "mainHand" | "offHand" | "head" | "chest" | "hands" | "legs" | "feet" | "accessory";

export interface ItemInstance {
  id: string;
  templateId: string;
  name: string;
  rarity: string;
  level: number;
  value: number;
  power: number;
  slot?: EquipmentSlot;
  quantity: number;
}

export interface EquipmentState {
  slots: Partial<Record<EquipmentSlot, string>>;
}

export interface ResourceState {
  gold: number;
  mana: number;
  maxMana: number;
  stamina: number;
  maxStamina: number;
  renown: number;
}

export interface WorldState {
  day: number;
  turn: number;
  regionId: string;
  discoveredRegionIds: string[];
  defeatedBossIds: string[];
  flags: Record<string, boolean>;
}

export interface CombatState {
  round: number;
  activeCombatantId: string;
  combatants: Record<string, Combatant>;
  log: string[];
  finished: boolean;
  winnerId?: string;
}

export function createResources(level = 1): ResourceState {
  const safeLevel = Math.max(1, Math.floor(level));
  return {
    gold: 100,
    mana: 50 + safeLevel * 5,
    maxMana: 50 + safeLevel * 5,
    stamina: 100,
    maxStamina: 100,
    renown: 0
  };
}

export function spendResource(resources: ResourceState, type: ResourceType, amount: number): ResourceState {
  const cost = Math.max(0, Math.floor(amount));
  if (resources[type] < cost) throw new Error(`insufficient ${type}`);
  return { ...resources, [type]: resources[type] - cost };
}

export function recoverResources(resources: ResourceState, mana = resources.maxMana, stamina = resources.maxStamina): ResourceState {
  return { ...resources, mana: Math.min(resources.maxMana, Math.max(0, mana)), stamina: Math.min(resources.maxStamina, Math.max(0, stamina)) };
}

export function equipItem(equipment: EquipmentState, item: ItemInstance): EquipmentState {
  if (!item.slot) throw new Error("item cannot be equipped");
  return { ...equipment, slots: { ...equipment.slots, [item.slot]: item.id } };
}

export function unequipItem(equipment: EquipmentState, slot: EquipmentSlot): EquipmentState {
  const slots = { ...equipment.slots };
  delete slots[slot];
  return { ...equipment, slots };
}

export function addItem(inventory: ItemInstance[], item: ItemInstance): ItemInstance[] {
  const existing = inventory.find((candidate) => candidate.templateId === item.templateId && candidate.rarity === item.rarity);
  if (existing && !item.slot) {
    return inventory.map((candidate) => candidate.id === existing.id
      ? { ...candidate, quantity: candidate.quantity + item.quantity }
      : candidate);
  }
  return [...inventory, { ...item, quantity: Math.max(1, item.quantity) }];
}

export function removeItem(inventory: ItemInstance[], itemId: string, quantity = 1): ItemInstance[] {
  const count = Math.max(1, Math.floor(quantity));
  const item = inventory.find((candidate) => candidate.id === itemId);
  if (!item || item.quantity < count) throw new Error("insufficient item quantity");
  return item.quantity === count
    ? inventory.filter((candidate) => candidate.id !== itemId)
    : inventory.map((candidate) => candidate.id === itemId ? { ...candidate, quantity: candidate.quantity - count } : candidate);
}

export function createWorldState(regionId = "ashen-road"): WorldState {
  return { day: 1, turn: 0, regionId, discoveredRegionIds: [regionId], defeatedBossIds: [], flags: {} };
}

export function discoverRegion(world: WorldState, regionId: string): WorldState {
  if (!regionId.trim()) throw new Error("region id is required");
  return world.discoveredRegionIds.includes(regionId)
    ? world
    : { ...world, discoveredRegionIds: [...world.discoveredRegionIds, regionId] };
}

export function advanceWorld(world: WorldState, turns = 1): WorldState {
  const count = Math.max(1, Math.floor(turns));
  const nextTurn = world.turn + count;
  return { ...world, turn: nextTurn, day: world.day + Math.floor(nextTurn / 24) - Math.floor(world.turn / 24) };
}

export function createCombatState(combatants: Combatant[], activeCombatantId = combatants[0]?.id): CombatState {
  if (combatants.length < 2) throw new Error("combat requires at least two combatants");
  if (!activeCombatantId || !combatants.some((c) => c.id === activeCombatantId)) throw new Error("active combatant not found");
  return {
    round: 1,
    activeCombatantId,
    combatants: Object.fromEntries(combatants.map((combatant) => [combatant.id, { ...combatant }])),
    log: [],
    finished: false
  };
}

export function performCombatAttack(state: CombatState, targetId: string, roll: number, damageType: DamageType = "physical"): CombatState {
  if (state.finished) throw new Error("combat is already finished");
  const attacker = state.combatants[state.activeCombatantId];
  const target = state.combatants[targetId];
  if (!attacker || !target) throw new Error("combatant not found");
  if (attacker.hp <= 0) throw new Error("active combatant is defeated");
  if (target.hp <= 0) throw new Error("target is already defeated");

  const result = resolveAttack(attacker, target, roll, damageType);
  const combatants = { ...state.combatants, [targetId]: { ...target, hp: result.targetHp } };
  const logEntry = result.hit
    ? `${attacker.id} hits ${target.id} for ${result.damage} ${damageType} damage.`
    : `${attacker.id} misses ${target.id}.`;

  if (result.defeated) {
    return { ...state, combatants, log: [...state.log, logEntry, `${target.id} is defeated.`], finished: true, winnerId: attacker.id };
  }

  const nextId = Object.keys(combatants).find((id) => id !== attacker.id && combatants[id].hp > 0) ?? attacker.id;
  return { ...state, combatants, activeCombatantId: nextId, round: nextId === state.activeCombatantId ? state.round + 1 : state.round, log: [...state.log, logEntry] };
}
