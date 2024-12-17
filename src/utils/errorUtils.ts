import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

interface DataMessageError {
    data: {
        name: string
        message: string
        details?: string[]
        success?: boolean
    }
    status: number
}

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

export function getErrorMessage(err: unknown): string {
    if (isDataMessageError(err)) {
        const { details, message } = err.data
        return details ? details?.join(', ') : message
    } else if (isFetchBaseQueryError(err)) {
        return 'error' in err ? err.error : JSON.stringify(err.data)
    }

    return 'An unknown error occurred'
}
