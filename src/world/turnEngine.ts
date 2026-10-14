import type {WorldState} from './eraModel';
export type Action='build'|'research'|'recruit'|'trade'|'explore'|'diplomacy';
export interface TurnOrder{playerId:string;action:Action;target?:{x:number;y:number};cost:number}
export function resolveTurn(world:WorldState,orders:TurnOrder[]):WorldState{
 const next=structuredClone(world);
 for(const order of orders){const faction=next.factions.find(f=>f.id===order.playerId);if(!faction||faction.treasury<order.cost)continue;
  faction.treasury-=order.cost;
  if(order.action==='recruit')faction.military+=Math.max(1,Math.floor(order.cost/25));
  if(order.action==='research')faction.research+=Math.max(1,Math.floor(order.cost/50));
  if(order.action==='trade')faction.treasury+=Math.floor(order.cost*1.4);
  if(order.action==='build')faction.population+=Math.max(1,Math.floor(order.cost/100));
 }
 return next
}
