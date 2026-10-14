export interface CacheEntry<T>{value:T;expiresAt:number;version:number}
export interface GameCache{get<T>(key:string):Promise<T|undefined>;set<T>(key:string,value:T,ttlMs?:number):Promise<void>;delete(key:string):Promise<void>;clear(prefix?:string):Promise<void>}

export class MemoryGameCache implements GameCache{
 private readonly store=new Map<string,CacheEntry<unknown>>();
 async get<T>(key:string){const e=this.store.get(key);if(!e)return undefined;if(e.expiresAt>0&&Date.now()>e.expiresAt){this.store.delete(key);return undefined}return e.value as T}
 async set<T>(key:string,value:T,ttlMs=60000){this.store.set(key,{value,expiresAt:ttlMs>0?Date.now()+ttlMs:0,version:1})}
 async delete(key:string){this.store.delete(key)}
 async clear(prefix?:string){if(!prefix){this.store.clear();return}for(const key of this.store.keys())if(key.startsWith(prefix))this.store.delete(key)}
 size(){return this.store.size}
}

export const cacheKeys={
 profile:(id:string)=>'profile:'+id,
 inventory:(id:string)=>'inventory:'+id,
 equipment:(id:string)=>'equipment:'+id,
 guild:(id:string)=>'guild:'+id,
 alliance:(id:string)=>'alliance:'+id,
 clan:(id:string)=>'clan:'+id,
 encounter:(id:string)=>'encounter:'+id,
 dungeon:(id:string)=>'dungeon:'+id,
 tower:(level:number,floor:number)=>'tower:'+level+':'+floor
};
