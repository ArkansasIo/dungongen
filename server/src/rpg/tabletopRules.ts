export type Ability = "STR" | "DEX" | "CON" | "INT" | "WIS" | "CHA";

export type Skill =
  | "acrobatics" | "animalHandling" | "arcana" | "athletics" | "deception"
  | "history" | "insight" | "intimidation" | "investigation" | "medicine"
  | "nature" | "perception" | "performance" | "persuasion" | "religion"
  | "sleightOfHand" | "stealth" | "survival";

export type DamageType =
  | "bludgeoning" | "piercing" | "slashing" | "fire" | "cold" | "lightning"
  | "thunder" | "acid" | "poison" | "necrotic" | "radiant" | "psychic"
  | "force";

export type Condition =
  | "blinded" | "charmed" | "deafened" | "frightened" | "grappled"
  | "incapacitated" | "invisible" | "paralyzed" | "petrified" | "poisoned"
  | "prone" | "restrained" | "stunned" | "unconscious" | "exhausted";

export interface CharacterStats {
  abilities: Record<Ability, number>;
  proficiencyBonus: number;
  armorClass: number;
  maxHp: number;
  hp: number;
  speed: number;
  initiativeBonus: number;
  conditions: Condition[];
}

export interface CheckResult {
  natural: number;
  modifier: number;
  total: number;
  dc: number;
  success: boolean;
  critical: "critical-success" | "critical-failure" | "none";
}

export interface AttackResult extends CheckResult {
  attackBonus: number;
  targetAc: number;
  damage?: number;
  damageType?: DamageType;
}

export interface TurnState {
  round: number;
  activeCombatantId: string | null;
  initiative: Array<{ combatantId: string; initiative: number }>;
}

export interface EncounterState {
  id: string;
  round: number;
  turn: number;
  combatants: Array<{
    id: string;
    name: string;
    side: "player" | "enemy" | "neutral";
    stats: CharacterStats;
  }>;
  log: string[];
}

export function abilityModifier(score: number): number {
  return Math.floor((score - 10) / 2);
}

export function rollD20(random: () => number = Math.random): number {
  return Math.floor(random() * 20) + 1;
}

export function rollDie(sides: number, random: () => number = Math.random): number {
  if (!Number.isInteger(sides) || sides < 2) throw new Error("Die must have at least 2 sides.");
  return Math.floor(random() * sides) + 1;
}

export function makeCheck(
  modifier: number,
  dc: number,
  random: () => number = Math.random
): CheckResult {
  const natural = rollD20(random);
  const total = natural + modifier;
  return {
    natural,
    modifier,
    total,
    dc,
    success: natural === 20 || (natural !== 1 && total >= dc),
    critical: natural === 20 ? "critical-success" : natural === 1 ? "critical-failure" : "none"
  };
}

export function makeAttack(
  attackBonus: number,
  targetAc: number,
  damageDice = 8,
  damageModifier = 0,
  damageType: DamageType = "slashing",
  random: () => number = Math.random
): AttackResult {
  const check = makeCheck(attackBonus, targetAc, random);
  const hit = check.natural === 20 || (check.natural !== 1 && check.total >= targetAc);
  const damage = hit ? (check.natural === 20 ? rollDie(damageDice, random) + rollDie(damageDice, random) : rollDie(damageDice, random)) + damageModifier : undefined;
  return { ...check, attackBonus, targetAc, damage, damageType: hit ? damageType : undefined };
}

export function applyDamage(
  hp: number,
  damage: number,
  resistance = 1,
  temporaryHp = 0
): { hp: number; temporaryHp: number; damageTaken: number; defeated: boolean } {
  const mitigated = Math.max(0, Math.floor(damage * Math.max(0, resistance)));
  const absorbed = Math.min(temporaryHp, mitigated);
  const remaining = mitigated - absorbed;
  const nextTemporaryHp = temporaryHp - absorbed;
  const nextHp = Math.max(0, hp - remaining);
  return { hp: nextHp, temporaryHp: nextTemporaryHp, damageTaken: mitigated, defeated: nextHp === 0 };
}

export function skillModifier(
  abilityScore: number,
  proficient: boolean,
  proficiencyBonus: number
): number {
  return abilityModifier(abilityScore) + (proficient ? proficiencyBonus : 0);
}

export function advanceTurn(state: TurnState): TurnState {
  if (state.initiative.length === 0) return state;
  const current = state.initiative.findIndex(x => x.combatantId === state.activeCombatantId);
  const next = (current + 1) % state.initiative.length;
  return {
    ...state,
    round: next === 0 ? state.round + 1 : state.round,
    activeCombatantId: state.initiative[next].combatantId
  };
}

export function addCondition(conditions: Condition[], condition: Condition): Condition[] {
  return conditions.includes(condition) ? conditions : [...conditions, condition];
}

export function removeCondition(conditions: Condition[], condition: Condition): Condition[] {
  return conditions.filter(value => value !== condition);
}

export function isDefeated(stats: CharacterStats): boolean {
  return stats.hp <= 0 || stats.conditions.includes("unconscious");
}
