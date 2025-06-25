import { useTranslation } from 'react-i18next'

import { getErrorMessage } from '../utils/errorUtils'
import { LoadingOrError } from './LoadingOrError'

export interface DataWrapperProps<T> {
    isLoading: boolean
    error: unknown
    data: T | T[] | undefined
    children?: JSX.Element
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

    if (!data || (Array.isArray(data) && data.length === 0)) {
        return <LoadingOrError message={emptyMessage} />
    }

    return children
}
