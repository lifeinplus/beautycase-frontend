import { useTranslation } from 'react-i18next'

import { GalleryPage } from '../../../components/gallery/GalleryPage'
import { ImageCard } from '../../../components/gallery/ImageCard'
import { useGetAllProductsQuery } from '../productsApi'

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
                <article className="gallery-container">
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
