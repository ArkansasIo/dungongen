import type {D20Program} from './types';

const DB='d20ql-campaigns';const STORE='campaigns';
export async function saveProgram(name:string,program:D20Program):Promise<void>{
 if(typeof indexedDB==='undefined')throw new Error('IndexedDB is unavailable');
 await new Promise<void>((resolve,reject)=>{const r=indexedDB.open(DB,1);r.onupgradeneeded=()=>r.result.createObjectStore(STORE);r.onerror=()=>reject(r.error);r.onsuccess=()=>{const tx=r.result.transaction(STORE,'readwrite');tx.objectStore(STORE).put(program,name);tx.oncomplete=()=>resolve();tx.onerror=()=>reject(tx.error)}})
}
export async function loadProgram(name:string):Promise<D20Program|null>{
 if(typeof indexedDB==='undefined')return null;
 return new Promise((resolve,reject)=>{const r=indexedDB.open(DB,1);r.onsuccess=()=>{const tx=r.result.transaction(STORE,'readonly');const q=tx.objectStore(STORE).get(name);q.onsuccess=()=>resolve(q.result??null);q.onerror=()=>reject(q.error)};r.onerror=()=>reject(r.error)})
}
