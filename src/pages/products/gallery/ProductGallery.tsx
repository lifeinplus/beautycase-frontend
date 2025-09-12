import { useTranslation } from 'react-i18next'

import { useGetProductCategoriesQuery } from '@/features/categories/api/categoriesApi'
import { useGetProductsWithoutCategoryQuery } from '@/features/products/api/productsApi'
import { DataWrapper } from '@/shared/components/common/data-wrapper/DataWrapper'
import { Hero } from '@/shared/components/common/hero/Hero'
import { ImageCard } from '@/shared/components/gallery/image-card/ImageCard'
import { Header } from '@/shared/components/layout/header/Header'
import pageStyles from '@/shared/components/ui/page/page.module.css'
import { ProductCategoriesMobileView } from '@/widgets/product/categories/mobile-view/ProductCategoriesMobileView'
import { ProductCategoriesTable } from '@/widgets/product/categories/table/ProductCategoriesTable'
import styles from './ProductGallery.module.css'

export const ProductGallery = () => {
    const { t } = useTranslation('product')

    const { data: categories, isLoading: isCategoriesLoading } =
        useGetProductCategoriesQuery()

    const {
        data: products,
        isLoading,
        error,
    } = useGetProductsWithoutCategoryQuery()

    const title = t('titles.gallery')

    return (
        <article className={pageStyles.page}>
            <Header />

            <main className={pageStyles.content}>
                <article className={pageStyles.container}>
                    <Hero headline={title} />

                    <ProductCategoriesMobileView categories={categories} />
                    <ProductCategoriesTable categories={categories} />

                    <DataWrapper
                        isLoading={isLoading || isCategoriesLoading}
                        error={error}
                        data={title}
                        emptyMessage={t('emptyMessageList')}
                    >
                        <article className={styles.container}>
                            {products?.map((p) => (
                                <ImageCard
                                    key={p._id}
                                    data={p}
                                    path={`/products/${p._id}`}
                                />
                            ))}
                        </article>
                    </DataWrapper>
                </article>
            </main>
        </article>
    )
}
