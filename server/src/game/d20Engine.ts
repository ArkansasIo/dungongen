export type Ability = "strength" | "dexterity" | "constitution" | "intelligence" | "wisdom" | "charisma";
export type DamageType = "physical" | "fire" | "frost" | "arcane" | "poison" | "shadow";

export interface D20Check {
  roll: number;
  modifier: number;
  total: number;
  difficulty: number;
  success: boolean;
  critical: boolean;
  fumble: boolean;
}

export interface Combatant {
  id: string;
  hp: number;
  maxHp: number;
  armor: number;
  attackBonus: number;
  damage: number;
}

export interface AttackResult {
  attackerId: string;
  targetId: string;
  attackRoll: D20Check;
  hit: boolean;
  damage: number;
  targetHp: number;
  defeated: boolean;
  damageType: DamageType;
}

export function resolveCheck(roll: number, modifier: number, difficulty: number): D20Check {
  if (!Number.isInteger(roll) || roll < 1 || roll > 20) throw new Error("roll must be an integer from 1 to 20");
  const total = roll + modifier;
  return {
    roll, modifier, total, difficulty,
    success: roll === 20 || (roll !== 1 && total >= difficulty),
    critical: roll === 20,
    fumble: roll === 1
  };
}

export function resolveAttack(attacker: Combatant, target: Combatant, roll: number, damageType: DamageType = "physical"): AttackResult {
  const attackRoll = resolveCheck(roll, attacker.attackBonus, target.armor);
  const hit = attackRoll.success;
  const damage = hit ? Math.max(1, attacker.damage + (attackRoll.critical ? attacker.damage : 0)) : 0;
  const targetHp = Math.max(0, target.hp - damage);
  return {
    attackerId: attacker.id, targetId: target.id, attackRoll, hit, damage, targetHp,
    defeated: targetHp === 0, damageType
  };
}
