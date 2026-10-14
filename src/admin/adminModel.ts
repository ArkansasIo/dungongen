import {hasPermission,type D20Role} from '../d20ql/authTypes';
export interface AdminPanelSection{key:string;label:string;permission:string}
export const ADMIN_SECTIONS:AdminPanelSection[]=[
 {key:'dashboard',label:'Dashboard',permission:'settings.read'},
 {key:'users',label:'Users',permission:'users.read'},
 {key:'roles',label:'Roles & Permissions',permission:'roles.write'},
 {key:'campaigns',label:'Campaign Administration',permission:'campaigns.manage'},
 {key:'worlds',label:'Worlds & Maps',permission:'worlds.generate'},
 {key:'server',label:'Server Settings',permission:'settings.write'},
 {key:'audit',label:'Audit Log',permission:'server.audit'}
];
export const DEFAULT_USER_SETTINGS={theme:'dark',language:'en',diceAnimation:true,notifications:true,compactUi:false};
export function canOpenAdmin(role:D20Role,permission:string){return role==='superadmin'||permission.length>0}
