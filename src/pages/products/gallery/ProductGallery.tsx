import { useTranslation } from 'react-i18next'

import { useGetProductCategoriesWithCountsQuery } from '@/features/categories/api/categoriesApi'
import { Hero } from '@/shared/components/hero/Hero'
import { Header } from '@/shared/components/layout/header/Header'
import { DataWrapper } from '@/shared/components/wrappers/DataWrapper'
import { ProductCategoriesMobileView } from '@/widgets/product/categories/mobile-view/ProductCategoriesMobileView'
import { ProductCategoriesTable } from '@/widgets/product/categories/table/ProductCategoriesTable'

export const ProductGallery = () => {
    const { t } = useTranslation(['product', 'category'])

    const { data, isLoading, error } = useGetProductCategoriesWithCountsQuery()

    const title = t('titles.gallery')

    return (
        <article className="pb-13 sm:pb-0">
            <Header />
            <main className="pb-safe-bottom sm:ms-navbar lg:ms-navbar-open flex flex-col items-center justify-center">
                <article className="mx-auto w-full pb-6 sm:max-w-lg sm:pt-6 md:max-w-2xl md:px-4">
                    <Hero headline={title} />
                    <DataWrapper isLoading={isLoading} error={error}>
                        <ProductCategoriesMobileView categories={data} />
                        <ProductCategoriesTable categories={data} />
                    </DataWrapper>
                </article>
            </main>
        </article>
    )
}
