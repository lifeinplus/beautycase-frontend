import { vi } from 'vitest'

export const formatDate = vi.fn((_, format) => {
    if (format === 'yyyy.MM.dd HH:mm') return '2025.04.10 14:30'
    if (format === 'dd.MM.yyyy HH:mm') return '10.04.2025 14:30'
    if (format === 'yyyy.MM.dd') return '2025.04.10'
    if (format === 'HH:mm') return '14:30'
    return 'formatted-date'
})
