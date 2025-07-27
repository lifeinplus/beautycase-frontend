import { ReactNode, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import { useAppDispatch } from '@/app/hooks'
import { clearFormData } from '@/features/form/formSlice'
import { DataWrapper } from '@/shared/components/common/DataWrapper'
import { TitleSection } from '@/shared/components/common/TitleSection'
import { TopPanel } from '@/shared/components/layout/TopPanel'
import pageStyles from '@/shared/components/ui/page.module.css'
import { RouteId } from '@/shared/types/router'

export interface DetailsProps {
    isLoading: boolean
    error: unknown
    topPanelTitle: string
    redirectPath: string
    title?: string
    subtitle?: string
    description?: string
    mediaContent?: ReactNode
    descriptionContent?: ReactNode
    additionalContent?: ReactNode
}

export const Details = ({
    isLoading = false,
    error,
    topPanelTitle,
    redirectPath,
    title,
    subtitle,
    description,
    mediaContent,
    descriptionContent,
    additionalContent,
}: DetailsProps) => {
    const { state } = useLocation()
    const navigate = useNavigate()
    const { id } = useParams<RouteId>()
    const { t } = useTranslation('component')

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(clearFormData())
    }, [dispatch])

    const handleBack = () =>
        navigate(state?.fromPathname || redirectPath, {
            replace: true,
            state: { scrollId: id },
        })

    return (
        <article className={pageStyles.page}>
            <TopPanel title={topPanelTitle} onBack={handleBack} />

            <main className={pageStyles.content}>
                <article className={pageStyles.container}>
                    <DataWrapper
                        isLoading={isLoading}
                        error={error}
                        data={title}
                        emptyMessage={t('emptyMessage', {
                            value: topPanelTitle,
                        })}
                    >
                        <>
                            <TitleSection title={title} subtitle={subtitle} />

                            {mediaContent}

                            {descriptionContent
                                ? descriptionContent
                                : description && (
                                      <section
                                          className={pageStyles.description}
                                      >
                                          <p>{description}</p>
                                      </section>
                                  )}

                            {additionalContent}
                        </>
                    </DataWrapper>
                </article>
            </main>
        </article>
    )
}
