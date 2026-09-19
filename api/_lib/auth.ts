import type { VercelRequest, VercelResponse } from '@vercel/node'
import { SignJWT, jwtVerify } from 'jose'
import { apiError } from './http.js'

const cookieName = 'department_admin_session'
const secret = () => new TextEncoder().encode(process.env.AUTH_SECRET)
function cookies(req: VercelRequest) { return Object.fromEntries((req.headers.cookie ?? '').split(';').map(v => v.trim().split('=').map(decodeURIComponent)).filter(v => v.length === 2)) }
export async function createSession(id: number, username: string) {
  if (!process.env.AUTH_SECRET || process.env.AUTH_SECRET.length < 32) throw new Error('Authentication is not configured')
  return new SignJWT({ username }).setProtectedHeader({ alg: 'HS256' }).setSubject(String(id)).setIssuedAt().setExpirationTime('8h').sign(secret())
}
export async function requireAdmin(req: VercelRequest, res: VercelResponse) {
  const token = cookies(req)[cookieName]
  if (!token || !process.env.AUTH_SECRET) { apiError(res, 401, 'Administrator authentication is required'); return null }
  try { return await jwtVerify(token, secret(), { algorithms: ['HS256'] }) } catch { apiError(res, 401, 'Your session has expired. Please sign in again.'); return null }
}
export function setSessionCookie(res: VercelResponse, token: string) { res.setHeader('Set-Cookie', `${cookieName}=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Strict; Max-Age=28800; ${process.env.VERCEL_ENV === 'production' ? 'Secure; ' : ''}`) }
export function clearSessionCookie(res: VercelResponse) { res.setHeader('Set-Cookie', `${cookieName}=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0; ${process.env.VERCEL_ENV === 'production' ? 'Secure; ' : ''}`) }
