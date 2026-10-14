import type {CombatState} from '../game/gameState';
export function startCombat(combatants:CombatState['combatants']):CombatState{const sorted=[...combatants].sort((a,b)=>b.initiative-a.initiative);return{id:crypto.randomUUID(),round:1,activeIndex:0,status:'active',combatants:sorted}}
export function endTurn(state:CombatState):CombatState{const next={...state,combatants:state.combatants.map(x=>({...x,conditions:[...x.conditions]}))};next.activeIndex=(next.activeIndex+1)%Math.max(1,next.combatants.length);if(next.activeIndex===0)next.round++;return next}
