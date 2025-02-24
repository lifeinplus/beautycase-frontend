import { describe, expect, it } from 'vitest'

import { appendToFormData, cleanObject } from '../common'

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

describe('cleanObject', () => {
    it('removes null, undefined, and empty string values from objects', () => {
        const obj = {
            name: 'John',
            age: null,
            city: undefined,
            country: '',
            details: { phone: '', email: 'test@example.com' },
        }
        expect(cleanObject(obj)).toEqual({
            name: 'John',
            details: { email: 'test@example.com' },
        })
    })

    it('recursively cleans nested objects', () => {
        const obj = {
            name: 'John',
            address: {
                city: '',
                street: '123 Main St',
                extra: null,
            },
            contacts: {
                phone: '',
                email: undefined,
            },
        }

        expect(cleanObject(obj)).toEqual({
            name: 'John',
            address: { street: '123 Main St' },
            contacts: {},
        })
    })

    it('cleans arrays inside objects', () => {
        const obj = {
            users: [
                { name: 'Alice', email: '' },
                { name: 'Bob', email: 'bob@example.com' },
            ],
        }
        expect(cleanObject(obj)).toEqual({
            users: [
                { name: 'Alice' },
                { name: 'Bob', email: 'bob@example.com' },
            ],
        })
    })

    it('handles empty objects and arrays', () => {
        expect(cleanObject({})).toEqual({})
        expect(cleanObject([])).toEqual([])
    })
})
