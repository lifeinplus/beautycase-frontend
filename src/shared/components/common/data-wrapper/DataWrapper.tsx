import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import { getErrorMessage } from '@/shared/utils/error/getErrorMessage'
import { LoadingOrError } from '../loading-or-error/LoadingOrError'

export interface DataWrapperProps {
    isLoading: boolean
    error: unknown
    children?: ReactNode
}

export const DataWrapper = ({
    isLoading,
    error,
    children,
}: DataWrapperProps) => {
    const { t } = useTranslation('component')

    if (isLoading) {
        return <LoadingOrError message={t('loading')} />
    }

    if (error) {
        return <LoadingOrError message={getErrorMessage(error)} />
    }

    return children
}
