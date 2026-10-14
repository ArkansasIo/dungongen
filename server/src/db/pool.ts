import mysql from 'mysql2/promise';
import { config } from '../config.js';
export const pool=mysql.createPool({host:config.DB_HOST,port:config.DB_PORT,database:config.DB_NAME,user:config.DB_USER,password:config.DB_PASSWORD,connectionLimit:config.DB_POOL_SIZE,waitForConnections:true,queueLimit:0,charset:'utf8mb4',timezone:'Z',decimalNumbers:true});
