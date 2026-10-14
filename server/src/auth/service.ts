import crypto from 'node:crypto';
import mysql from 'mysql2/promise';
export function hashPassword(password:string){return crypto.scryptSync(password,crypto.randomBytes(16),64).toString('hex')}
export async function createUser(db:mysql.Connection,username:string,email:string,password:string){const hash=hashPassword(password);const [r]=await db.execute('INSERT INTO d20_users (username,email,password_hash) VALUES (?,?,?)',[username,email,hash]);return r}
