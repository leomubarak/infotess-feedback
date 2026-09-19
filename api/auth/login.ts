import type { VercelRequest, VercelResponse } from '@vercel/node'
import bcrypt from 'bcryptjs'
import { sql } from '../_lib/db.js'
import { createSession, setSessionCookie } from '../_lib/auth.js'
import { apiError, method, noStore } from '../_lib/http.js'
import { loginSchema } from '../_lib/validation.js'
export default async function handler(req: VercelRequest, res: VercelResponse) {
  noStore(res); if (!method(req, res, ['POST'])) return
  const parsed = loginSchema.safeParse(req.body); if (!parsed.success) return apiError(res, 400, 'Enter a valid username and password.')
  try { const rows = await sql.query('SELECT id, username, password_hash FROM admins WHERE username = $1 LIMIT 1', [parsed.data.username]); const admin = rows[0]; if (!admin || !await bcrypt.compare(parsed.data.password, admin.password_hash)) return apiError(res, 401, 'Invalid username or password.')
    setSessionCookie(res, await createSession(Number(admin.id), String(admin.username))); return res.status(200).json({ admin: { username: admin.username } })
  } catch { return apiError(res) }
}
