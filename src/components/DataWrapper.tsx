import { getErrorMessage } from '../utils'
import { LoadingOrError } from './LoadingOrError'

interface DataWrapperProps<T> {
    isLoading: boolean
    error: unknown
    data: T | T[] | undefined
    children: JSX.Element
    emptyMessage: string
}

export const DataWrapper = <T,>({
    isLoading,
    error,
    data,
    children,
    emptyMessage,
}: DataWrapperProps<T>) => {
    if (isLoading) {
        return <LoadingOrError message="Загрузка..." />
    }

    if (error) {
        return <LoadingOrError message={getErrorMessage(error)} />
    }

    if (!data || (Array.isArray(data) && data.length === 0)) {
        return <LoadingOrError message={emptyMessage} />
    }

    return children
}
