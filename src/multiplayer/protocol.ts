export type ClientMessage=
 | {type:'join_campaign';campaignId:string}
 | {type:'leave_campaign'}
 | {type:'submit_turn';turn:number;orders:unknown[]}
 | {type:'chat';text:string}
 | {type:'combat_action';combatId:string;action:unknown};
export type ServerMessage=
 | {type:'joined';campaignId:string;stateVersion:number}
 | {type:'state_patch';stateVersion:number;patch:unknown}
 | {type:'turn_locked';turn:number}
 | {type:'turn_resolved';turn:number}
 | {type:'chat';userId:string;text:string;createdAt:string}
 | {type:'error';code:string;message:string};
export interface MultiplayerEnvelope<T>{id:string;sentAt:string;payload:T}
