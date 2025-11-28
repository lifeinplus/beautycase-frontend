import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import { useGetLessonByIdQuery } from '@/features/lessons/api/lessonsApi'
import { TitleSection } from '@/shared/components/forms/title-section/TitleSection'
import { TopPanel } from '@/shared/components/layout/top-panel/TopPanel'
import { DetailSection } from '@/shared/components/ui/detail-section/DetailSection'
import { DataWrapper } from '@/shared/components/wrappers/DataWrapper'
import { VideoSection } from '@/widgets/lesson/details/ui/VideoSection'
import { ProductImages } from '@/widgets/product/images/ProductImages'

export interface LessonDetailsProps {
    viewMode?: boolean
}

export const LessonDetails = ({ viewMode = false }: LessonDetailsProps) => {
    const { id } = useParams()
    const { t } = useTranslation('lesson')

    const { data, isLoading, error } = useGetLessonByIdQuery(id!)

    const title = data?.title || t('titles.details')

    return (
        <article className="pb-13 md:pb-0">
            <TopPanel title={title} />

            <main className="pb-safe-bottom md:ms-navbar lg:ms-navbar-wide flex flex-col items-center justify-center">
                <article className="mx-auto w-full pb-6 md:max-w-2xl md:px-4 md:pt-6">
                    <DataWrapper isLoading={isLoading} error={error}>
                        <TitleSection
                            title={data?.title}
                            subtitle={data?.shortDescription}
                            hideOnMobile
                        />

                        <section className="mt-2 mb-3 md:hidden">
                            <h2 className="font-heading px-3 text-center text-lg text-slate-700 dark:text-slate-400">
                                {data?.shortDescription}
                            </h2>
                        </section>

                        <VideoSection name={data?.title} url={data?.videoUrl} />

                        <DetailSection value={data?.fullDescription} />

                        <ProductImages
                            products={data?.products}
                            viewMode={viewMode}
                        />
                    </DataWrapper>
                </article>
            </main>
        </article>
    )
}
