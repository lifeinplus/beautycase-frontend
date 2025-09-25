import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'

import { useGetProductsByCategoryQuery } from '@/features/products/api/productsApi'
import { DataWrapper } from '@/shared/components/common/data-wrapper/DataWrapper'
import { Hero } from '@/shared/components/common/hero/Hero'
import { ImageCard } from '@/shared/components/gallery/image-card/ImageCard'
import { TopPanel } from '@/shared/components/layout/top-panel/TopPanel'
import pageStyles from '@/shared/components/ui/page/page.module.css'
import styles from './CategoryProducts.module.css'

export const CategoryProducts = () => {
    const navigate = useNavigate()
    const { category } = useParams()
    const { t } = useTranslation('product')

    const {
        data = [],
        isLoading,
        error,
    } = useGetProductsByCategoryQuery(category!)

    const handleBack = () => {
        navigate('/products')
    }

    const title = [
        t(`categories.${category}`),
        data.length && `(${data.length})`,
    ]
        .filter(Boolean)
        .join(' ')

    return (
        <article className={pageStyles.page}>
            <TopPanel title={title} onBack={handleBack} />
            <main className={pageStyles.content}>
                <article className={pageStyles.container}>
                    <Hero headline={title} hideOnMobile />
                    <DataWrapper isLoading={isLoading} error={error}>
                        <article className={styles.container}>
                            {data.map((p) => (
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
