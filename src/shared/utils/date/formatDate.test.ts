import { describe, expect, it } from 'vitest'

import { formatDate } from './formatDate'

describe('formatDate', () => {
    it('formats a valid date correctly', () => {
        expect(formatDate('2024-02-25', 'yyyy-MM-dd')).toBe('2024-02-25')
    })

    it('returns "—" for undefined date', () => {
        expect(formatDate(undefined, 'yyyy-MM-dd')).toBe('—')
    })

    it('returns "—" for invalid date string', () => {
        expect(formatDate('invalid-date', 'yyyy-MM-dd')).toBe('—')
    })

    it('handles ISO date strings', () => {
        expect(formatDate('2024-02-25T12:34:56.789Z', 'yyyy-MM-dd')).toBe(
            '2024-02-25'
        )
    })

    it('handles different formats', () => {
        expect(formatDate('2024-02-25', 'dd/MM/yyyy')).toBe('25/02/2024')
        expect(formatDate('2024-02-25', 'MMM do, yyyy')).toBe('Feb 25th, 2024')
    })
})
