import 'dotenv/config'
import bcrypt from 'bcryptjs'
import { neon } from '@neondatabase/serverless'
if (!process.env.DATABASE_URL || !process.env.ADMIN_USERNAME || !process.env.ADMIN_PASSWORD) throw new Error('DATABASE_URL, ADMIN_USERNAME, and ADMIN_PASSWORD are required')
if (process.env.ADMIN_PASSWORD.length < 12) throw new Error('ADMIN_PASSWORD must have at least 12 characters')
const sql = neon(process.env.DATABASE_URL); const passwordHash = await bcrypt.hash(process.env.ADMIN_PASSWORD, 12)
await sql.query('INSERT INTO admins (username, password_hash) VALUES ($1, $2) ON CONFLICT (username) DO UPDATE SET password_hash = EXCLUDED.password_hash', [process.env.ADMIN_USERNAME, passwordHash])
console.log('Administrator account is ready.')
