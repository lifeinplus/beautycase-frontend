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

    it('returns PRODUCT_IN_USE without extra details if lessons/stages are empty', () => {
        const error = {
            data: {
                code: 'PRODUCT_IN_USE',
                name: 'BadRequestException',
                details: {},
            },
            status: 400,
        }
        expect(getErrorMessage(error)).toBe('PRODUCT_IN_USE')
    })

    it('returns TOOL_IN_USE with makeupBags names', () => {
        const error = {
            data: {
                code: 'TOOL_IN_USE',
                name: 'BadRequestException',
                details: {
                    makeupBags: [{ name: 'brushes' }, { name: 'lipstick' }],
                },
            },
            status: 400,
        }

        expect(getErrorMessage(error)).toBe(
            'TOOL_IN_USE (categories.brushes.full, categories.lipstick.full)'
        )
    })

    it('returns TOOL_IN_USE without extra details if no makeupBags', () => {
        const error = {
            data: {
                code: 'TOOL_IN_USE',
                name: 'BadRequestException',
                details: {},
            },
            status: 400,
        }

        expect(getErrorMessage(error)).toBe('TOOL_IN_USE')
    })

    it('returns error property when present in FetchBaseQueryError', () => {
        const error: FetchBaseQueryError = {
            status: 'FETCH_ERROR',
            error: 'Something went wrong',
        }
        expect(getErrorMessage(error)).toBe('Something went wrong')
    })
})
