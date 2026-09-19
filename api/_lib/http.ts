import type { VercelRequest, VercelResponse } from '@vercel/node'

export function method(req: VercelRequest, res: VercelResponse, allowed: string[]) {
  if (!allowed.includes(req.method ?? '')) { res.setHeader('Allow', allowed); res.status(405).json({ error: 'Method not allowed' }); return false }
  return true
}
export function noStore(res: VercelResponse) { res.setHeader('Cache-Control', 'no-store, max-age=0') }
export function apiError(res: VercelResponse, status = 500, message = 'Unable to process this request') { return res.status(status).json({ error: message }) }
