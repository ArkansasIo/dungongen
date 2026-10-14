export interface SpellDefinition {
  id: string;
  name: string;
  level: number;
  school: string;
  castingTime: string;
  range: string;
  description: string;
  damage?: { dice: string; type: string };
}

export interface ItemDefinition {
  id: string;
  name: string;
  category: "weapon" | "armor" | "consumable" | "tool" | "treasure" | "quest";
  weight: number;
  value: number;
  description: string;
}

export interface EncounterTemplate {
  id: string;
  name: string;
  difficulty: "easy" | "medium" | "hard" | "deadly";
  tags: string[];
  enemyRoles: string[];
}

export const tabletopSpells: SpellDefinition[] = [
  { id: "spark", name: "Spark", level: 0, school: "evocation", castingTime: "1 action", range: "30 ft", description: "A small magical bolt that deals minor fire damage.", damage: { dice: "1d4", type: "fire" } },
  { id: "ward", name: "Arcane Ward", level: 1, school: "abjuration", castingTime: "1 reaction", range: "self", description: "A protective ward reduces incoming harm." },
  { id: "healing-light", name: "Healing Light", level: 1, school: "restoration", castingTime: "1 action", range: "30 ft", description: "Restore a small amount of vitality to a willing creature." }
];

export const tabletopItems: ItemDefinition[] = [
  { id: "iron-sword", name: "Iron Sword", category: "weapon", weight: 3, value: 15, description: "A dependable one-handed blade." },
  { id: "leather-armor", name: "Leather Armor", category: "armor", weight: 10, value: 10, description: "Light protective armor." },
  { id: "healing-potion", name: "Healing Potion", category: "consumable", weight: 0.5, value: 50, description: "A restorative draught." },
  { id: "rope", name: "Rope", category: "tool", weight: 10, value: 1, description: "Fifty feet of strong hemp rope." },
  { id: "ancient-key", name: "Ancient Key", category: "quest", weight: 0.1, value: 0, description: "A relic key whose purpose is unknown." }
];

export const encounterTemplates: EncounterTemplate[] = [
  { id: "crypt-patrol", name: "Crypt Patrol", difficulty: "medium", tags: ["undead", "dungeon"], enemyRoles: ["frontline", "controller"] },
  { id: "bandit-ambush", name: "Bandit Ambush", difficulty: "hard", tags: ["humanoid", "road"], enemyRoles: ["frontline", "ranged", "skirmisher"] },
  { id: "guardian-chamber", name: "Guardian Chamber", difficulty: "deadly", tags: ["construct", "boss"], enemyRoles: ["boss", "frontline"] }
];
