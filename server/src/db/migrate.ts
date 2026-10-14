import {readFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import mysql from 'mysql2/promise';
import {config} from '../config.js';
const connection=await mysql.createConnection({host:config.DB_HOST,port:config.DB_PORT,user:config.DB_USER,password:config.DB_PASSWORD,database:config.DB_NAME,multipleStatements:true});
try{const sql=await readFile(resolve(process.cwd(),'database/migrations/001_initial.sql'),'utf8');await connection.query(sql);console.log('Database migration applied.')}finally{await connection.end()}
