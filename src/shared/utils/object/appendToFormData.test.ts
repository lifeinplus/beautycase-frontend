import { describe, expect, it } from 'vitest'

import { appendToFormData } from './appendToFormData'

describe('appendToFormData', () => {
    it('converts a simple object to FormData', () => {
        const data = { name: 'John', age: '30' }
        const formData = appendToFormData(data)

        expect(formData.get('name')).toBe('John')
        expect(formData.get('age')).toBe('30')
    })

    it('handles File objects correctly', () => {
        const file = new File(['content'], 'test.txt', { type: 'text/plain' })
        const data = { file }
        const formData = appendToFormData(data)

        expect(formData.get('file')).toBe(file)
    })

    it('handles objects by converting to JSON', () => {
        const data = { user: { name: 'Alice', age: 25 } }
        const formData = appendToFormData(data)

        expect(formData.get('user')).toBe(
            JSON.stringify({ name: 'Alice', age: 25 })
        )
    })

    it('ignores undefined, null, and empty string values', () => {
        const data = { name: 'John', age: null, city: undefined, country: '' }
        const formData = appendToFormData(data)

        expect(formData.get('name')).toBe('John')
        expect(formData.get('age')).toBeNull()
        expect(formData.get('city')).toBeNull()
        expect(formData.get('country')).toBeNull()
    })
})
