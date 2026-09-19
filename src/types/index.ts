export type Feedback = { id: number; programme: string; session: string; class: string; level: string; feedbackType: string; feedbackMessage: string; createdAt: string }
export type Filters = { programme: string; session: string; class: string; level: string; feedbackType: string; search: string; startDate: string; endDate: string }
export type Analytics = { stats: Record<string, number>; charts: Record<string, { name: string; value: number; date?: string }[]> }
