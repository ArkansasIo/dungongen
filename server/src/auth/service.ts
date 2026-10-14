import crypto from 'node:crypto';
import mysql from 'mysql2/promise';
export function hashPassword(password:string){const salt=crypto.randomBytes(16).toString('hex');const hash=crypto.scryptSync(password,salt,64).toString('hex');return salt+':'+hash}
export function verifyPassword(password:string,stored:string){const [salt,expected]=stored.split(':');if(!salt||!expected)return false;const actual=crypto.scryptSync(password,salt,64).toString('hex');return crypto.timingSafeEqual(Buffer.from(actual,'hex'),Buffer.from(expected,'hex'))}
export async function createUser(db:mysql.Connection,username:string,email:string,password:string){const hash=hashPassword(password);const [r]=await db.execute('INSERT INTO d20_users (username,email,password_hash) VALUES (?,?,?)',[username,email,hash]);return r}
