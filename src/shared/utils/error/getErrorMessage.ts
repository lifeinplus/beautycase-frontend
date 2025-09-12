import { isDataMessageError, isFetchBaseQueryError } from './guards'

export function getErrorMessage(err: unknown): string {
    if (isDataMessageError(err)) {
        const { details, message } = err.data
        return details ? details?.join(', ') : message
    } else if (isFetchBaseQueryError(err)) {
        return 'error' in err ? err.error : JSON.stringify(err.data)
    }

    return 'An unknown error occurred'
}
