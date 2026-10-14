import mysql from 'mysql2/promise';
import type {D20Program} from '../../src/d20ql/types.js';

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
