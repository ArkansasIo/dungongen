export type Cell = 'wall' | 'floor' | 'door' | 'start' | 'exit';
export interface Room { id:number; x:number; y:number; width:number; height:number; }
export interface Dungeon { id?:number; name:string; seed:string; width:number; height:number; level:number; theme:string; grid:Cell[][]; rooms:Room[]; corridors:Array<{x:number;y:number}>; createdAt?:string; }
export interface GenerateOptions { name?:string; seed?:string; width:number; height:number; roomCount:number; level:number; theme:string; }
