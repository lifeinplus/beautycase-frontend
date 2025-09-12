import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { describe, expect, it } from 'vitest'

import { getErrorMessage } from './getErrorMessage'

describe('getErrorMessage', () => {
    it('returns message from DataMessageError', () => {
        const error = {
            data: {
                name: 'ValidationError',
                message: 'Invalid input',
                details: ['Field A is required', 'Field B must be a number'],
            },
            status: 400,
        }
        expect(getErrorMessage(error)).toBe(
            'Field A is required, Field B must be a number'
        )
    })

    it('returns single message from DataMessageError if no details', () => {
        const error = {
            data: {
                name: 'UnauthorizedError',
                message: 'Unauthorized access',
            },
            status: 401,
        }
        expect(getErrorMessage(error)).toBe('Unauthorized access')
    })

    it('returns JSON string from FetchBaseQueryError', () => {
        const error: FetchBaseQueryError = {
            status: 500,
            data: { error: 'Internal Server Error' },
        }
        expect(getErrorMessage(error)).toBe('{"error":"Internal Server Error"}')
    })

    it('returns default message for unknown errors', () => {
        expect(getErrorMessage(null)).toBe('An unknown error occurred')
        expect(getErrorMessage(undefined)).toBe('An unknown error occurred')
        expect(getErrorMessage('Some error')).toBe('An unknown error occurred')
        expect(getErrorMessage(123)).toBe('An unknown error occurred')
    })
})
