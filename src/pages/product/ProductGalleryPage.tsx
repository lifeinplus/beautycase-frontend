import { useTranslation } from 'react-i18next'

import { useGetAllProductsQuery } from '@/features/products/productsApi'
import galleryStyles from '@/shared/components/gallery/gallery.module.css'
import { ImageCard } from '@/shared/components/gallery/ImageCard'
import { GalleryPage } from '@/widgets/GalleryPage'

export const ProductGalleryPage = () => {
    const { t } = useTranslation('product')

    const { data: products, isLoading, error } = useGetAllProductsQuery()

    return (
        <GalleryPage
            redirectPath="/products"
            title={t('titles.gallery')}
            subtitle={t('titles.gallerySubtitle')}
            isLoading={isLoading}
            error={error}
            mediaContent={
                <article className={galleryStyles.container}>
                    {products?.map((product) => (
                        <ImageCard
                            key={product._id}
                            data={product}
                            path={`/products/${product._id}`}
                        />
                    ))}
                </article>
            }
        />
    )
}
