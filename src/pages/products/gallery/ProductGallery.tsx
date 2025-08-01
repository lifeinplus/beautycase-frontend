import { useTranslation } from 'react-i18next'

import { useGetAllProductsQuery } from '@/features/products/productsApi'
import { ImageCard } from '@/shared/components/gallery/ImageCard'
import { Gallery } from '@/widgets/view/gallery/Gallery'
import styles from './ProductGallery.module.css'

export const ProductGallery = () => {
    const { t } = useTranslation('product')

    const { data: products, isLoading, error } = useGetAllProductsQuery()

    return (
        <Gallery
            title={t('titles.gallery')}
            subtitle={t('titles.gallerySubtitle')}
            isLoading={isLoading}
            error={error}
            mediaContent={
                <article className={styles.container}>
                    {products?.map((p) => (
                        <ImageCard
                            key={p._id}
                            data={p}
                            path={`/products/${p._id}`}
                        />
                    ))}
                </article>
            }
        />
    )
}
