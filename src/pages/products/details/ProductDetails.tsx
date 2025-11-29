import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import { useGetProductByIdQuery } from '@/features/products/api/productsApi'
import { ImageSection } from '@/shared/components/forms/image/section/ImageSection'
import { TitleSection } from '@/shared/components/forms/title-section/TitleSection'
import { TopPanel } from '@/shared/components/layout/top-panel/TopPanel'
import { DetailSection } from '@/shared/components/ui/detail-section/DetailSection'
import { DataWrapper } from '@/shared/components/wrappers/DataWrapper'
import { StoreLinks } from '@/widgets/store/links/StoreLinks'

export interface ProductDetailsProps {
    viewMode?: boolean
}

export const ProductDetails = ({ viewMode = false }: ProductDetailsProps) => {
    const { id } = useParams()
    const { t } = useTranslation(['product', 'store'])

    const { data, isLoading, error } = useGetProductByIdQuery(id!)
    const title = data?.brand?.name || t('titles.details')

    return (
        <article className="pb-13 md:pb-0">
            <TopPanel title={title} />

            <main className="pb-safe-bottom md:ms-navbar lg:ms-navbar-wide flex flex-col items-center justify-center">
                <article className="mx-auto w-full pb-6 md:max-w-2xl md:px-4 md:pt-6">
                    <DataWrapper isLoading={isLoading} error={error}>
                        <TitleSection
                            title={title}
                            subtitle={data?.name}
                            hideOnMobile
                        />

                        <section className="mt-2 mb-3 md:hidden">
                            <h2 className="font-heading px-3 text-center text-lg text-slate-700 dark:text-slate-400">
                                {data?.name}
                            </h2>
                        </section>

                        <ImageSection imageIds={data?.imageIds} />

                        <DetailSection label={t('shade')} value={data?.shade} />

                        <DetailSection value={data?.comment} />

                        <StoreLinks
                            storeLinks={data?.storeLinks}
                            type="product"
                            viewMode={viewMode}
                        />
                    </DataWrapper>
                </article>
            </main>
        </article>
    )
}
