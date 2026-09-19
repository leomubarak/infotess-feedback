import { z } from 'zod'
import { CLASSES, FEEDBACK_TYPES, LEVELS, PROGRAMMES, SESSIONS } from './constants.js'

export const feedbackSchema = z.object({ programme: z.enum(PROGRAMMES), session: z.enum(SESSIONS), class: z.enum(CLASSES as [string, ...string[]]), level: z.enum(LEVELS), feedbackType: z.enum(FEEDBACK_TYPES), feedbackMessage: z.string().trim().min(5, 'Feedback must be at least 5 characters.').max(5000, 'Feedback must be 5,000 characters or less.') })
export const loginSchema = z.object({ username: z.string().trim().min(3).max(100), password: z.string().min(8).max(256) })
export const filtersSchema = z.object({ programme: z.enum(PROGRAMMES).optional(), session: z.enum(SESSIONS).optional(), class: z.enum(CLASSES as [string, ...string[]]).optional(), level: z.enum(LEVELS).optional(), feedbackType: z.enum(FEEDBACK_TYPES).optional(), search: z.string().trim().max(200).optional(), startDate: z.string().date().optional(), endDate: z.string().date().optional() })
export type Filters = z.infer<typeof filtersSchema>
export function parsedFilters(input: unknown) { const values = Object.fromEntries(Object.entries(input as Record<string, unknown>).filter(([, v]) => typeof v === 'string' && v !== '')); return filtersSchema.safeParse(values) }
