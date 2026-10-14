import 'dotenv/config';
import { z } from 'zod';
const schema=z.object({NODE_ENV:z.enum(['development','test','production']).default('development'),API_PORT:z.coerce.number().int().min(1).max(65535).default(3001),CLIENT_ORIGIN:z.string().url().default('http://localhost:5173'),DB_HOST:z.string().default('127.0.0.1'),DB_PORT:z.coerce.number().int().min(1).max(65535).default(3306),DB_NAME:z.string().regex(/^[a-zA-Z0-9_]+$/).default('d20_dungeon_studio'),DB_USER:z.string().default('dungeon_app'),DB_PASSWORD:z.string().default(''),DB_POOL_SIZE:z.coerce.number().int().min(1).max(100).default(10)});
export const config=schema.parse(process.env);
