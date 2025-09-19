import { useTranslation } from 'react-i18next'

import { useGetProductCategoriesWithCountsQuery } from '@/features/categories/api/categoriesApi'
import { DataWrapper } from '@/shared/components/common/data-wrapper/DataWrapper'
import { Hero } from '@/shared/components/common/hero/Hero'
import { Header } from '@/shared/components/layout/header/Header'
import pageStyles from '@/shared/components/ui/page/page.module.css'
import { ProductCategoriesMobileView } from '@/widgets/product/categories/mobile-view/ProductCategoriesMobileView'
import { ProductCategoriesTable } from '@/widgets/product/categories/table/ProductCategoriesTable'

export const ProductGallery = () => {
    const { t } = useTranslation(['product', 'category'])

    const { data, isLoading, error } = useGetProductCategoriesWithCountsQuery()

    const title = t('titles.gallery')

    return (
        <article className={pageStyles.page}>
            <Header />
            <main className={pageStyles.content}>
                <article className={pageStyles.container}>
                    <Hero headline={title} />
                    <DataWrapper
                        isLoading={isLoading}
                        error={error}
                        data={title}
                        emptyMessage={t('emptyMessageList')}
                    >
                        <ProductCategoriesMobileView categories={data} />
                        <ProductCategoriesTable categories={data} />
                    </DataWrapper>
                </article>
            </main>
        </article>
    )
}
