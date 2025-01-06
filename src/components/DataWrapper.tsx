import { LoadingOrError } from './LoadingOrError'

interface DataWrapperProps<T> {
    isLoading: boolean
    error: unknown
    data: T[] | undefined
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
        return <LoadingOrError message="Ошибка загрузки" />
    }

    if (!data?.length) {
        return <LoadingOrError message={emptyMessage} />
    }

    return children
}
