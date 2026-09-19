import type { Filters } from './validation.js'

export function where(filters: Filters) {
  const clauses: string[] = [], values: unknown[] = []
  const exact: Record<string, string | undefined> = { programme: filters.programme, session: filters.session, class: filters.class, level: filters.level, feedback_type: filters.feedbackType }
  for (const [column, value] of Object.entries(exact)) if (value) { values.push(value); clauses.push(`${column} = $${values.length}`) }
  if (filters.search) { values.push(`%${filters.search}%`); const p = `$${values.length}`; clauses.push(`(feedback_message ILIKE ${p} OR programme ILIKE ${p} OR session ILIKE ${p} OR class ILIKE ${p} OR level ILIKE ${p} OR feedback_type ILIKE ${p})`) }
  if (filters.startDate) { values.push(filters.startDate); clauses.push(`created_at >= $${values.length}::date`) }
  if (filters.endDate) { values.push(filters.endDate); clauses.push(`created_at < ($${values.length}::date + interval '1 day')`) }
  return { text: clauses.length ? ` WHERE ${clauses.join(' AND ')}` : '', values }
}
