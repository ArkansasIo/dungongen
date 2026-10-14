import type {D20Program,D20Statement} from './types';

const tokenise=(source:string)=>source.replace(/[{}]/g,' $& ').split(/\s+/).filter(Boolean);
const quoted=(s:string)=>s.replace(/^"|"$/g,'');
export function parseD20QL(source:string):D20Program{
 const t=tokenise(source);let i=0;const statements:D20Statement[]=[];
 if(t[i]==='D20QL')i+=1;const version='1.0';
 while(i<t.length){
  const k=t[i++];
  if(k==='WORLD'){const era=t[i++],name=quoted(t[i++]);i++;let seed='',width=48,height=32,turnMode='YEARLY';while(i<t.length&&t[i]!=='}'){const x=t[i++];if(x==='SEED')seed=quoted(t[i++]);else if(x==='MAP'){width=Number(t[i++]);i++;height=Number(t[i++]);}else if(x==='TURN')turnMode=t[i++];}if(t[i]==='}')i++;statements.push({kind:'world',era,name,seed,width,height,turnMode});}
  else if(k==='FACTION'){const name=quoted(t[i++]);i++;let treasury=0,population=0,military=0,research=0;while(i<t.length&&t[i]!=='}'){const x=t[i++],v=Number(t[i++]);if(x==='TREASURY')treasury=v;else if(x==='POPULATION')population=v;else if(x==='MILITARY')military=v;else if(x==='RESEARCH')research=v;}if(t[i]==='}')i++;statements.push({kind:'faction',name,treasury,population,military,research});}
  else if(k==='TURN'){const number=Number(t[i++]);i++;const orders:{action:string;cost:number}[]=[];while(i<t.length&&t[i]!=='}'){orders.push({action:t[i++],cost:Number(t[i++])});}if(t[i]==='}')i++;statements.push({kind:'turn',number,orders});}
  else if(k==='SAVE'){const kindName=t[i++];const name=quoted(t[i++]);statements.push({kind:'save',kindName:name? 'CAMPAIGN':'CAMPAIGN',name});}
  else i++;
 }
 return {version,statements};
}
