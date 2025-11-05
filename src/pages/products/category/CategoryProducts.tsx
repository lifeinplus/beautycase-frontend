import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import { useGetMineProductsByCategoryQuery } from '@/features/products/api/productsApi'
import { ImageCard } from '@/shared/components/gallery/image-card/ImageCard'
import { Hero } from '@/shared/components/hero/Hero'
import { TopPanel } from '@/shared/components/layout/top-panel/TopPanel'
import { DataWrapper } from '@/shared/components/wrappers/DataWrapper'
import { ROUTES } from '@/shared/config/routes'
import { getTitleWithCount } from '@/shared/utils/ui/getTitleWithCount'
import { useToProductGalleryAction } from '../gallery/hooks/useToProductGalleryAction'

export const CategoryProducts = () => {
    const { category } = useParams()
    const { t } = useTranslation('product')
    const backAction = useToProductGalleryAction()

    const {
        data = [],
        isLoading,
        error,
    } = useGetMineProductsByCategoryQuery(category!)

    const title = getTitleWithCount(t(`categories.${category}`), data.length)

    return (
        <article className="pb-13 md:pb-0">
            <TopPanel title={title} onBack={backAction?.onClick} />
            <main className="pb-safe-bottom md:ms-navbar lg:ms-navbar-open flex flex-col items-center justify-center">
                <article className="mx-auto w-full pb-6 md:max-w-2xl md:px-4 md:pt-6">
                    <Hero title={title} hideOnMobile />
                    <DataWrapper isLoading={isLoading} error={error}>
                        <article className="mx-auto my-4 grid max-w-2xl grid-cols-3 gap-1 md:gap-7">
                            {data.map((d) => (
                                <ImageCard
                                    key={d._id}
                                    data={d}
                                    to={ROUTES.backstage.products.details(
                                        d._id!
                                    )}
                                />
                            ))}
                        </article>
                    </DataWrapper>
                </article>
            </main>
        </article>
    )
}
