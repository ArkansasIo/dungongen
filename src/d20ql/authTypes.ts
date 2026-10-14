export type D20Role='superadmin'|'admin'|'gamemaster'|'player'|'spectator';
export interface D20Permission{key:string;description:string}
export interface D20User{ id:string;username:string;email:string;role:D20Role;active:boolean;settings:Record<string,string|number|boolean> }
export interface D20Session{ id:string;userId:string;expiresAt:number;revoked:boolean }
export interface CampaignMember{campaignId:string;userId:string;role:'owner'|'gamemaster'|'player'|'spectator'}
export const D20_PERMISSIONS:Record<D20Role,string[]>={
 superadmin:['*'],
 admin:['users.read','users.write','users.disable','roles.write','settings.read','settings.write','campaigns.create','campaigns.manage','campaigns.moderate','server.audit'],
 gamemaster:['campaigns.create','campaigns.manage','campaigns.join','campaigns.play','characters.write','worlds.generate','turns.resolve'],
 player:['campaigns.join','campaigns.play','characters.write'],
 spectator:['campaigns.join']
};
export function hasPermission(role:D20Role,permission:string){const p=D20_PERMISSIONS[role]??[];return p.includes('*')||p.includes(permission)}
