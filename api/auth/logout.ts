import type { VercelRequest, VercelResponse } from '@vercel/node'
import { clearSessionCookie } from '../_lib/auth.js'; import { method, noStore } from '../_lib/http.js'
export default function handler(req: VercelRequest, res: VercelResponse) { noStore(res); if (!method(req, res, ['POST'])) return; clearSessionCookie(res); res.status(204).end() }
