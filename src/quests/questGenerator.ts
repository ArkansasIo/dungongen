import type {QuestState} from '../game/gameState';
const titles=['The Broken Road','Ashes Beneath the Abbey','The Missing Caravan','The Warden’s Oath','The Bell Beneath Stone'];
export function generateQuest(seed:string,index=0):QuestState{let h=0;for(const c of seed)h=(h*31+c.charCodeAt(0))|0;const title=titles[Math.abs(h+index)%titles.length];return{id:seed+'-'+index,title,description:'An original campaign hook generated from the current world seed.',status:'available',rewardGold:100+Math.abs(h)%400,rewardXp:50+Math.abs(h)%250}}
