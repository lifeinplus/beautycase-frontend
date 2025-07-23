import { ReactNode, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { useAppDispatch } from '@/app/hooks'
import { clearFormData } from '@/features/form/formSlice'
import { DataWrapper } from '@/shared/components/common/DataWrapper'
import { Hero } from '@/shared/components/common/Hero'
import { Header } from '@/shared/components/layout/Header'
import pageStyles from '@/shared/components/ui/page.module.css'

export interface GalleryProps {
    title: string
    subtitle?: string
    isLoading: boolean
    error: unknown
    mediaContent?: ReactNode
}

export const Gallery = ({
    title,
    subtitle,
    isLoading,
    error,
    mediaContent,
}: GalleryProps) => {
    const { t } = useTranslation('component')
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(clearFormData())
    }, [dispatch])

    return (
        <article className={pageStyles.page}>
            <Header />

            <main className={pageStyles.content}>
                <article className={pageStyles.container}>
                    <Hero headline={title} byline={subtitle} />

                    <DataWrapper
                        isLoading={isLoading}
                        error={error}
                        data={title}
                        emptyMessage={t('emptyMessage', {
                            value: title,
                        })}
                    >
                        {mediaContent}
                    </DataWrapper>
                </article>
            </main>
        </article>
    )
}
