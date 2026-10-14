export type D20Value=string|number|boolean;
export type D20Statement=
 | {kind:'world';era:string;name:string;seed:string;width:number;height:number;turnMode:string}
 | {kind:'faction';name:string;treasury:number;population:number;military:number;research:number}
 | {kind:'turn';number:number;orders:{action:string;cost:number}[]}
 | {kind:'save';kindName:'CAMPAIGN';name:string};
export interface D20Program{version:string;statements:D20Statement[]}
