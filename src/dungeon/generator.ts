import type {Dungeon,GenerateOptions,Cell,Room} from "../types";
function hash(s:string){let h=2166136261;for(const c of s)h=Math.imul(h^c.charCodeAt(0),16777619);return h>>>0}
export function generateDungeon(o:GenerateOptions):Dungeon{
 const width=Math.max(20,Math.min(100,o.width||48)),height=Math.max(20,Math.min(80,o.height||32)),count=Math.max(3,Math.min(30,o.roomCount||10));
 const grid:Cell[][]=Array.from({length:height},()=>Array<Cell>(width).fill('wall'));const rooms:Room[]=[];
 for(let i=0;i<count;i++){const rw=5+(hash((o.seed||'d20')+':w'+i)%7),rh=5+(hash((o.seed||'d20')+':h'+i)%6);const x=1+(hash((o.seed||'d20')+':x'+i)%Math.max(1,width-rw-2)),y=1+(hash((o.seed||'d20')+':y'+i)%Math.max(1,height-rh-2));rooms.push({id:i,x,y,width:rw,height:rh});for(let yy=y;yy<y+rh;yy++)for(let xx=x;xx<x+rw;xx++)grid[yy][xx]='floor'}
 const corridors:Array<{x:number;y:number}>=[];for(let i=1;i<rooms.length;i++){let x=Math.floor(rooms[i-1].x+rooms[i-1].width/2),y=Math.floor(rooms[i-1].y+rooms[i-1].height/2),tx=Math.floor(rooms[i].x+rooms[i].width/2),ty=Math.floor(rooms[i].y+rooms[i].height/2);while(x!==tx){grid[y][x]='floor';corridors.push({x,y});x+=x<tx?1:-1}while(y!==ty){grid[y][x]='floor';corridors.push({x,y});y+=y<ty?1:-1}}
 if(rooms[0])grid[Math.floor(rooms[0].y+rooms[0].height/2)][Math.floor(rooms[0].x+rooms[0].width/2)]='start';const last=rooms[rooms.length-1];if(last)grid[Math.floor(last.y+last.height/2)][Math.floor(last.x+last.width/2)]='exit';
 return {name:o.name||'Generated Dungeon',seed:o.seed||'d20',width,height,level:o.level||1,theme:o.theme||'classic',grid,rooms,corridors};
}
