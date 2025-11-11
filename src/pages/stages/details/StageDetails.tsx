import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import { useGetStageByIdQuery } from '@/features/stages/api/stagesApi'
import { ImageSection } from '@/shared/components/forms/image-section/ImageSection'
import { TitleSection } from '@/shared/components/forms/title-section/TitleSection'
import { TopPanel } from '@/shared/components/layout/top-panel/TopPanel'
import { DataWrapper } from '@/shared/components/wrappers/DataWrapper'
import { ProductImages } from '@/widgets/product/images/ProductImages'
import { useToStageListAction } from '../list/hooks/useToStageListAction'

export const StageDetails = () => {
    const { id } = useParams()
    const { t } = useTranslation('stage')

    const { data, isLoading, error } = useGetStageByIdQuery(id!)

    const backAction = useToStageListAction()

    const title = data?.title || t('titles.details')

    return (
        <article className="pb-13 md:pb-0">
            <TopPanel title={title} onBack={backAction?.onClick} />

            <main className="pb-safe-bottom md:ms-navbar lg:ms-navbar-open flex flex-col items-center justify-center">
                <article className="mx-auto w-full pb-6 md:max-w-2xl md:px-4 md:pt-6">
                    <DataWrapper isLoading={isLoading} error={error}>
                        <TitleSection
                            title={title}
                            subtitle={data?.subtitle}
                            hideOnMobile
                        />

                        <section className="mt-2 mb-3 md:hidden">
                            <h2 className="font-heading px-3 text-center text-lg text-slate-700 dark:text-slate-400">
                                {data?.subtitle}
                            </h2>
                        </section>

                        <ImageSection name={title} url={data?.imageUrl} />

                        {data?.comment && (
                            <section className="my-3 px-4 text-base">
                                <p>{data?.comment}</p>
                            </section>
                        )}

                        {data?.steps?.length ? (
                            <section className="my-3 px-4 text-base">
                                <p className="my-2 font-bold md:text-left">
                                    {t('steps')}
                                </p>
                                <ul className="ms-5 list-outside list-decimal">
                                    {data.steps.map(
                                        (step: string, index: number) => (
                                            <li key={index}>{step}</li>
                                        )
                                    )}
                                </ul>
                            </section>
                        ) : undefined}

                        <ProductImages products={data?.products} />
                    </DataWrapper>
                </article>
            </main>
        </article>
    )
}
