import mysql from 'mysql2/promise';
type D20Statement = {kind:'world';era:string;name:string;seed:string;width:number;height:number;turnMode:string}|{kind:'faction';name:string;treasury:number;population:number;military:number;research:number}|{kind:'turn';number:number;orders:{action:string;cost:number}[]}|{kind:'save';kindName:'CAMPAIGN';name:string};
type D20Program = {version:string;statements:D20Statement[]};

export async function persistD20QL(connection:mysql.Connection,program:D20Program):Promise<void>{
 await connection.beginTransaction();
 try{
  for(const s of program.statements){
   if(s.kind==='world')await connection.execute('INSERT INTO d20_worlds (name,era,seed,width,height,turn_mode) VALUES (?,?,?,?,?,?)',[s.name,s.era,s.seed,s.width,s.height,s.turnMode]);
   if(s.kind==='faction')await connection.execute('INSERT INTO d20_factions (name,treasury,population,military,research) VALUES (?,?,?,?,?)',[s.name,s.treasury,s.population,s.military,s.research]);
  }
  await connection.commit();
 }catch(error){await connection.rollback();throw error}
}
