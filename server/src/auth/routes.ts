import {Router} from 'express';
import type mysql from 'mysql2/promise';
import {createUser,hashPassword,verifyPassword} from './service.js';
export function authRoutes(db:mysql.Connection){const router=Router();
router.post('/register',async(req,res)=>{try{const username=String(req.body.username??'').trim();const email=String(req.body.email??'').trim();const password=String(req.body.password??'');if(username.length<3||password.length<12)return res.status(400).json({error:'Username must be at least 3 characters and password at least 12 characters'});await createUser(db,username,email,password);res.status(201).json({username,role:'player'})}catch(e){res.status(400).json({error:e instanceof Error?e.message:'Registration failed'})}});
router.post('/login',async(req,res)=>{try{const [rows]=await db.execute('SELECT id,username,role,active,password_hash FROM d20_users WHERE username=? LIMIT 1',[String(req.body.username??'')]);const user=(rows as any[])[0];if(!user||!user.active||!verifyPassword(String(req.body.password??''),user.password_hash))return res.status(401).json({error:'Invalid credentials'});res.json({id:String(user.id),username:user.username,role:user.role})}catch{res.status(500).json({error:'Login failed'})}});
router.post('/logout',(_req,res)=>res.json(true));return router}
