import { ENCOUNTERS } from "./encounterEngine.js";

export interface DungeonRoom { id:string; index:number; encounterId?:string; discovered:boolean; cleared:boolean; }
export interface DungeonState { id:string; name:string; depth:number; rooms:DungeonRoom[]; currentRoom:number; completed:boolean; }

export function createDungeon(id:string,name:string,depth:number,seed="default"):DungeonState {
  const safeDepth=Math.max(1,Math.min(20,Math.floor(depth)));
  const rooms:Array<DungeonRoom>=[];
  for(let i=0;i<safeDepth;i++){
    const encounter=ENCOUNTERS[(hash(seed+":"+i)%ENCOUNTERS.length)];
    rooms.push({id:`${id}-room-${i+1}`,index:i+1,encounterId:encounter.id,discovered:i===0,cleared:false});
  }
  return {id,name,depth:safeDepth,rooms,currentRoom:1,completed:false};
}
function hash(value:string):number {
  let h=2166136261;
  for(const c of value){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}
  return h>>>0;
}
export function enterNextRoom(state:DungeonState):DungeonState {
  const current=state.rooms[state.currentRoom-1];
  if(current&&!current.cleared) throw new Error("current room must be cleared first");
  if(state.currentRoom>=state.rooms.length) return {...state,completed:true};
  const next=state.currentRoom+1;
  const rooms=state.rooms.map(room=>room.index===next?{...room,discovered:true}:room);
  return {...state,currentRoom:next,rooms};
}
export function clearCurrentRoom(state:DungeonState):DungeonState {
  const room=state.rooms[state.currentRoom-1];
  if(!room) throw new Error("current room not found");
  return {...state,rooms:state.rooms.map(r=>r.id===room.id?{...r,cleared:true}:r)};
}
