import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

import type { ApiErrorResponse } from './types'

export function isApiErrorWithCode(
    error: unknown
): error is { status: number; data: ApiErrorResponse } {
    return (
        typeof error === 'object' &&
        error !== null &&
        'data' in error &&
        typeof (error as any).data?.code === 'string'
    )
}

export function isFetchBaseQueryError(
    error: unknown
): error is FetchBaseQueryError {
    return typeof error === 'object' && error !== null && 'status' in error
}
