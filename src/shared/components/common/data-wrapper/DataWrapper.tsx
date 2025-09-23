import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import { getErrorMessage } from '@/shared/utils/error/getErrorMessage'
import { LoadingOrError } from '../loading-or-error/LoadingOrError'

export interface DataWrapperProps<T> {
    isLoading: boolean
    error: unknown
    data: T | T[] | undefined
    children?: ReactNode
    emptyMessage: string
}

export const DataWrapper = <T,>({
    isLoading,
    error,
    data,
    children,
    emptyMessage,
}: DataWrapperProps<T>) => {
    const { t } = useTranslation('component')

    if (isLoading) {
        return <LoadingOrError message={t('loading')} />
    }

    if (error) {
        return <LoadingOrError message={getErrorMessage(error)} />
    }

    // TODO: remove because of new error structure?
    if (!data || (Array.isArray(data) && data.length === 0)) {
        return <LoadingOrError message={emptyMessage} />
    }

    return children
}
