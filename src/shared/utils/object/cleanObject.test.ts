import { describe, expect, it } from 'vitest'

import { cleanObject } from './cleanObject'

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
