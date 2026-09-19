export const PROGRAMMES = ['BEd. Info. Tech.', 'BSc. Cyber and Digital Forensics', 'Dip. IT', 'Dip. Cyber', 'BSc. Computing with AI', 'BSc. Computing with IOT', 'BSc. Info. Tech'] as const
export const SESSIONS = ['Regular', 'Weekend', 'Evening'] as const
export const LEVELS = ['Level 100', 'Level 200', 'Level 300', 'Level 400'] as const
export const FEEDBACK_TYPES = ['Suggestion', 'Comment', 'Complaint', 'Appreciation', 'Other'] as const
export const CLASSES = Array.from({ length: 26 }, (_, index) => String.fromCharCode(65 + index))
