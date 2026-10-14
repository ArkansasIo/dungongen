export type BackendMode='static'|'server';
export interface BackendConfig{mode:BackendMode;apiBaseUrl?:string}
export interface BackendUser{id:string;username:string;role:string;settings:Record<string,unknown>}
export interface BackendResult<T>{ok:boolean;data?:T;error?:string}
