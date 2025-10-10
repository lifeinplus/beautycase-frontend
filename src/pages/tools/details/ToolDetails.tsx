import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import { useGetToolByIdQuery } from '@/features/tools/api/toolsApi'
import { ImageSection } from '@/shared/components/forms/image-section/ImageSection'
import { TitleSection } from '@/shared/components/forms/title-section/TitleSection'
import { TopPanel } from '@/shared/components/layout/top-panel/TopPanel'
import { DataWrapper } from '@/shared/components/wrappers/DataWrapper'
import { StoreLinks } from '@/widgets/store/store-links/StoreLinks'
import { useToolDetailsActions } from './hooks/useToolDetailsActions'

export const ToolDetails = () => {
    const { id } = useParams()
    const { t } = useTranslation(['tool', 'store'])

    const { data, isLoading, error } = useGetToolByIdQuery(id!)

    const actions = useToolDetailsActions()
    const backAction = actions.find((action) => action.key === 'back')

    const title = data?.brand?.name || t('titles.details')

    return (
        <article className="pb-13 sm:pb-0">
            <TopPanel title={title} onBack={backAction?.onClick} />

            <main className="pb-safe-bottom sm:ms-navbar lg:ms-navbar-open flex flex-col items-center justify-center">
                <article className="mx-auto w-full pb-6 sm:max-w-lg sm:pt-6 md:max-w-2xl md:px-4">
                    <DataWrapper isLoading={isLoading} error={error}>
                        <TitleSection
                            title={title}
                            subtitle={data?.name}
                            hideOnMobile
                        />

                        <section className="mt-2 mb-3 sm:hidden">
                            <h2 className="font-heading px-3 text-center text-lg text-slate-700 dark:text-slate-400">
                                {data?.name}
                            </h2>
                        </section>

                        <ImageSection name={data?.name} url={data?.imageUrl} />

                        {data?.number && (
                            <section className="my-3 px-4 text-base">
                                <p>{`${t('number')}: ${data?.number}`}</p>
                            </section>
                        )}

                        {data?.comment && (
                            <section className="my-3 px-4 text-base">
                                <p>{data?.comment}</p>
                            </section>
                        )}

                        <StoreLinks storeLinks={data?.storeLinks} type="tool" />
                    </DataWrapper>
                </article>
            </main>
        </article>
    )
}
