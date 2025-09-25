import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { describe, expect, it } from 'vitest'

import { getErrorMessage } from './getErrorMessage'

describe('getErrorMessage', () => {
    it('returns message from ApiErrorResponse', () => {
        const error = {
            data: {
                code: 'PRODUCT_IN_USE',
                name: 'BadRequestException',
                details: {
                    lessons: [{ title: ' Lesson 1 ' }, { title: 'Lesson 2' }],
                    stages: [{ title: ' Stage A ' }],
                },
            },
            status: 400,
        }
        expect(getErrorMessage(error)).toBe(
            'PRODUCT_IN_USE (Lesson 1, Lesson 2, Stage A)'
        )
    })

    it('returns single message from ApiErrorResponse if no details', () => {
        const error = {
            data: {
                code: 'CATEGORY_NOT_FOUND',
                name: 'NotFoundException',
                message: `Category "test-products" not found`,
            },
            status: 404,
        }
        expect(getErrorMessage(error)).toBe('CATEGORY_NOT_FOUND')
    })

    it('returns JSON string from FetchBaseQueryError', () => {
        const error: FetchBaseQueryError = {
            status: 500,
            data: { error: 'Internal Server Error' },
        }
        expect(getErrorMessage(error)).toBe('{"error":"Internal Server Error"}')
    })

    it('returns default message for unknown errors', () => {
        expect(getErrorMessage(null)).toBe('UNKNOWN_ERROR')
        expect(getErrorMessage(undefined)).toBe('UNKNOWN_ERROR')
        expect(getErrorMessage('Some error')).toBe('UNKNOWN_ERROR')
        expect(getErrorMessage(123)).toBe('UNKNOWN_ERROR')
    })
})
