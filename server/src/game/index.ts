export {
  createGameState,
  createPlayer,
  addPlayer,
  advanceTurn,
  startQuest,
  completeQuest,
  applyQuestCompletion
} from "./gameEngine.js";
export type { GameState, PlayerState, QuestProgressResult } from "./gameEngine.js";

export { resolveCheck, resolveAttack } from "./d20Engine.js";
export type { Ability, DamageType, D20Check, Combatant, AttackResult } from "./d20Engine.js";


export {
  createResources,
  spendResource,
  recoverResources,
  equipItem,
  unequipItem,
  addItem,
  removeItem,
  createWorldState,
  discoverRegion,
  advanceWorld,
  createCombatState,
  performCombatAttack
} from "./baseSystems.js";
export type {
  ResourceType,
  EquipmentSlot,
  ItemInstance,
  EquipmentState,
  ResourceState,
  WorldState,
  CombatState
} from "./baseSystems.js";


export { createCharacter, grantExperience, unlockAbility, canUseAbility } from "./progressionEngine.js";
export { ABILITIES } from "./progressionEngine.js";
export type { CharacterClass, Attributes, CharacterState, AbilityDefinition } from "./progressionEngine.js";
export { ENEMIES, ENCOUNTERS, createEncounter, performEncounterAttack, encounterRewards } from "./encounterEngine.js";
export type { EnemyRole, EnemyDefinition, EncounterDefinition } from "./encounterEngine.js";
export { createDungeon, enterNextRoom, clearCurrentRoom } from "./dungeonEngine.js";
export type { DungeonRoom, DungeonState } from "./dungeonEngine.js";
