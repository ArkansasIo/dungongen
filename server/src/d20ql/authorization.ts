import {hasPermission,type D20Role} from '../../../src/d20ql/authTypes.js';
export interface Principal{userId:string;role:D20Role;sessionId:string}
export function authorize(principal:Principal,permission:string){if(!hasPermission(principal.role,permission))throw new Error('FORBIDDEN: '+permission);return true}
