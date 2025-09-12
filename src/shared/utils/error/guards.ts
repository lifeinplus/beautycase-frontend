import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

import type { DataMessageError } from './types'

export function isDataMessageError(error: unknown): error is DataMessageError {
    return (
        typeof error === 'object' &&
        error !== null &&
        'data' in error &&
        typeof (error.data as any).message === 'string'
    )
}

export function isFetchBaseQueryError(
    error: unknown
): error is FetchBaseQueryError {
    return typeof error === 'object' && error !== null && 'status' in error
}
