import type { Dungeon, GenerateOptions } from './types';
const base = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';
async function request<T>(path:string, init?:RequestInit):Promise<T>{const r=await fetch(base+path,init);if(!r.ok){let body:any={};try{body=await r.json()}catch{}throw new Error(body.error||`Request failed (${r.status})`)}return r.json() as Promise<T>}
const json=(options:GenerateOptions):RequestInit=>({method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(options)});
export const generateDungeon=(options:GenerateOptions)=>request<Dungeon>('/dungeons/generate',json(options));
export const saveDungeon=(options:GenerateOptions)=>request<Dungeon>('/dungeons',json(options));
export const listDungeons=()=>request<Array<Pick<Dungeon,'id'|'name'|'seed'|'level'|'theme'|'createdAt'>>>('/dungeons');
export const loadDungeon=(id:number)=>request<Dungeon>('/dungeons/'+id);
