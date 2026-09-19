import type { VercelRequest, VercelResponse } from '@vercel/node'
import { requireAdmin } from '../_lib/auth.js'; import { method, noStore } from '../_lib/http.js'
export default async function handler(req: VercelRequest, res: VercelResponse) { noStore(res); if (!method(req, res, ['GET'])) return; const session = await requireAdmin(req, res); if (!session) return; res.status(200).json({ admin: { username: session.payload.username } }) }
