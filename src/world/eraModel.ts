export type Era='ancient'|'classical'|'medieval'|'late-medieval';
export type Terrain='ocean'|'plains'|'forest'|'hills'|'mountains'|'desert'|'swamp'|'tundra';
export interface WorldCell{ x:number;y:number;terrain:Terrain;elevation:number;fertility:number;resources:string[];owner?:string;road?:boolean;river?:boolean }
export interface Faction{ id:string;name:string;color:string;capital:{x:number;y:number};population:number;treasury:number;military:number;research:number }
export interface WorldState{ seed:string;width:number;height:number;era:Era;turn:number;year:number;cells:WorldCell[];factions:Faction[] }
const terrain:Terrain[]=['plains','forest','hills','mountains','desert','swamp'];
function hash(s:string){let h=2166136261;for(const c of s){h^=c.charCodeAt(0);h=Math.imul(h,16777619)}return h>>>0}
function rng(seed:string){let s=hash(seed)||1;return()=>{s=(Math.imul(s,1664525)+1013904223)>>>0;return s/4294967296}}
export function generateWorld(seed='medieval-seed',width=48,height=32,era:Era='medieval'):WorldState{
 const r=rng(seed),cells:WorldCell[]=[];for(let y=0;y<height;y++)for(let x=0;x<width;x++){const n=r();let t:Terrain=n<.08?'ocean':terrain[Math.floor(r()*terrain.length)];const elevation=Math.floor(r()*100);if(elevation>90)t='mountains';cells.push({x,y,terrain:t,elevation,fertility:t==='plains'?70: t==='forest'?55:25,resources:t==='mountains'?['iron','stone']:t==='forest'?['timber','herbs']:t==='plains'?['grain','horses']:['stone']})}
 const factions=['Aurelian Kingdom','Ironwood League','Crown of Valen','Free Marches'].map((name,i)=>({id:'f'+i,name,color:['#b9a47a','#6f8fa8','#9b6f8f','#7e9b70'][i],capital:{x:4+i*12,y:5+(i%2)*18},population:10000+i*3500,treasury:5000+i*1000,military:100+i*35,research:20+i*5}));
 return{seed,width,height,era,turn:1,year:era==='ancient'?500:era==='classical'?1200:era==='medieval'?1400:1550,cells,factions}
}
export function advanceTurn(world:WorldState):WorldState{
 const next=structuredClone(world);next.turn++;next.year++;for(const f of next.factions){f.treasury+=Math.floor(f.population*.02);f.research+=Math.max(1,Math.floor(f.population/10000));}return next
}
