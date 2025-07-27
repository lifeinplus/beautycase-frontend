import { describe, expect, it } from 'vitest'
import { generatePdfFilename } from './generatePdfFilename'

describe('generatePdfFilename', () => {
    it('replaces spaces in category with dashes and appends client name and .pdf', () => {
        expect(generatePdfFilename('Face Makeup', 'JaneDoe')).toBe(
            'Face-Makeup-JaneDoe.pdf'
        )
    })

    it('handles multiple spaces in category', () => {
        expect(
            generatePdfFilename('Very   Detailed  Category', 'ClientX')
        ).toBe('Very-Detailed-Category-ClientX.pdf')
    })

    it('returns .pdf even if no spaces are present', () => {
        expect(generatePdfFilename('Eyes', 'Anna')).toBe('Eyes-Anna.pdf')
    })

    it('works with empty strings', () => {
        expect(generatePdfFilename('', '')).toBe('-.pdf')
    })

    it('preserves special characters in client name', () => {
        expect(generatePdfFilename('Some Category', 'A&B_Client')).toBe(
            'Some-Category-A&B_Client.pdf'
        )
    })
})
