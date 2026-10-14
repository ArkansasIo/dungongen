import {Router} from 'express';
import type mysql from 'mysql2/promise';
import {createUser,hashPassword} from './service.js';
export function authRoutes(db:mysql.Connection){const router=Router();
router.post('/register',async(req,res)=>{try{const result=await createUser(db,String(req.body.username),String(req.body.email),String(req.body.password));res.status(201).json(result)}catch(e){res.status(400).json({error:e instanceof Error?e.message:'Registration failed'})}});
router.post('/login',async(req,res)=>{try{const [rows]=await db.execute('SELECT id,username,role,active,password_hash FROM d20_users WHERE username=? LIMIT 1',[String(req.body.username)]);const user=(rows as any[])[0];if(!user||!user.active||user.password_hash!==hashPassword(String(req.body.password)))return res.status(401).json({error:'Invalid credentials'});res.json({id:String(user.id),username:user.username,role:user.role})}catch{res.status(500).json({error:'Login failed'})}});
router.post('/logout',(_req,res)=>res.json(true));return router}
