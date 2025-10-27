import { useTranslation } from 'react-i18next'

import { useGetProductCategoriesWithCountsQuery } from '@/features/categories/api/categoriesApi'
import { useToBackstageGalleryAction } from '@/pages/backstage/gallery/hooks/useToBackstageGalleryAction'
import { Hero } from '@/shared/components/hero/Hero'
import { TopPanel } from '@/shared/components/layout/top-panel/TopPanel'
import { DataWrapper } from '@/shared/components/wrappers/DataWrapper'
import { ProductCategoriesMobileView } from '@/widgets/product/categories/mobile-view/ProductCategoriesMobileView'
import { ProductCategoriesTable } from '@/widgets/product/categories/table/ProductCategoriesTable'

export const ProductGallery = () => {
    const { t } = useTranslation(['product', 'category'])
    const { data, isLoading, error } = useGetProductCategoriesWithCountsQuery()

    const backAction = useToBackstageGalleryAction()

    const title = t('titles.gallery')

    return (
        <article className="pb-13 sm:pb-0">
            <TopPanel title={title} onBack={backAction.onClick} />
            <main className="pb-safe-bottom sm:ms-navbar lg:ms-navbar-open flex flex-col items-center justify-center">
                <article className="mx-auto my-6 w-full pb-6 sm:my-0 sm:max-w-lg sm:pt-6 md:max-w-2xl md:px-4">
                    <Hero title={title} hideOnMobile />
                    <DataWrapper isLoading={isLoading} error={error}>
                        <ProductCategoriesMobileView categories={data} />
                        <ProductCategoriesTable categories={data} />
                    </DataWrapper>
                </article>
            </main>
        </article>
    )
}
