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
