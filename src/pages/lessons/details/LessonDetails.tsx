import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import { useGetLessonByIdQuery } from '@/features/lessons/api/lessonsApi'
import { VideoSection } from '@/pages/lessons/details/ui/VideoSection'
import { TitleSection } from '@/shared/components/forms/title-section/TitleSection'
import { TopPanel } from '@/shared/components/layout/top-panel/TopPanel'
import { DataWrapper } from '@/shared/components/wrappers/DataWrapper'
import { ProductImages } from '@/widgets/product/images/ProductImages'

export interface LessonDetailsProps {
    viewMode?: boolean
    onBack: () => void
}

export const LessonDetails = ({
    viewMode = false,
    onBack,
}: LessonDetailsProps) => {
    const { id } = useParams()
    const { t } = useTranslation('lesson')

    const { data, isLoading, error } = useGetLessonByIdQuery(id!)

    const title = data?.title || t('titles.details')

    return (
        <article className="pb-13 sm:pb-0">
            <TopPanel title={title} onBack={onBack} />

            <main className="pb-safe-bottom sm:ms-navbar lg:ms-navbar-open flex flex-col items-center justify-center">
                <article className="mx-auto w-full pb-6 sm:max-w-lg sm:pt-6 md:max-w-2xl md:px-4">
                    <DataWrapper isLoading={isLoading} error={error}>
                        <TitleSection
                            title={data?.title}
                            subtitle={data?.shortDescription}
                            hideOnMobile
                        />

                        <section className="mt-2 mb-3 sm:hidden">
                            <h2 className="font-heading px-3 text-center text-lg text-slate-700 dark:text-slate-400">
                                {data?.shortDescription}
                            </h2>
                        </section>

                        <VideoSection name={data?.title} url={data?.videoUrl} />

                        <section className="my-3 px-4 text-base">
                            <p>{data?.fullDescription}</p>
                        </section>

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
