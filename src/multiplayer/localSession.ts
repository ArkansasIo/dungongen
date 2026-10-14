import type {CampaignState} from '../game/gameState';
export interface LocalSession{campaignId:string;stateVersion:number;state:CampaignState;connected:boolean}
export function createLocalSession(campaignId:string,state:CampaignState):LocalSession{return{campaignId,stateVersion:1,state,connected:false}}
export function applyLocalState(session:LocalSession,next:CampaignState){return{...session,stateVersion:session.stateVersion+1,state:next}}
