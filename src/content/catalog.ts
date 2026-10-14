import {ARMOR,ARCHETYPES,CREATURES,SETTING,WEAPONS} from './index';
export const CONTENT_CATALOG={weapons:WEAPONS,armor:ARMOR,creatures:CREATURES,archetypes:ARCHETYPES,setting:SETTING};
export function findContent(id:string){return [...WEAPONS,...ARMOR,...CREATURES,...ARCHETYPES,...SETTING].find(x=>x.id===id)}
export function searchContent(query:string){const q=query.trim().toLowerCase();if(!q)return [];return Object.values(CONTENT_CATALOG).flat().filter(x=>x.name.toLowerCase().includes(q)||x.description?.toLowerCase().includes(q)||x.lore?.toLowerCase().includes(q))}
