import type {BackendConfig,BackendResult,BackendUser} from './backendTypes';
import {generateWorld,type WorldState} from '../world/eraModel';
const USERS='d20-static-users';const WORLDS='d20-static-worlds';
const read=<T>(key:string,fallback:T):T=>{try{return JSON.parse(localStorage.getItem(key)??JSON.stringify(fallback)) as T}catch{return fallback}};
const write=(key:string,value:unknown)=>localStorage.setItem(key,JSON.stringify(value));
export const staticBackend={config:{mode:'static'} as BackendConfig,
 register(username:string):BackendResult<BackendUser>{const users=read<BackendUser[]>(USERS,[]);if(users.some(u=>u.username===username))return{ok:false,error:'Username already exists'};const user={id:crypto.randomUUID(),username,role:'player',settings:{theme:'dark'}};users.push(user);write(USERS,users);return{ok:true,data:user}},
 login(username:string):BackendResult<BackendUser>{const user=read<BackendUser[]>(USERS,[]).find(u=>u.username===username);return user?{ok:true,data:user}:{ok:false,error:'Account not found in this static build'}},
 saveWorld(world:WorldState):BackendResult<boolean>{const worlds=read<Record<string,WorldState>>(WORLDS,{});worlds[world.seed]=world;write(WORLDS,worlds);return{ok:true,data:true}},
 loadWorld(seed:string):BackendResult<WorldState|null>{return{ok:true,data:read<Record<string,WorldState>>(WORLDS,{})[seed]??null}},
 generate(seed:string):BackendResult<WorldState>{return{ok:true,data:generateWorld(seed,48,32,'medieval')}}
};
