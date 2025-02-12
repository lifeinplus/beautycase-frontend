import { ImageCard, GalleryPage } from '../../../components'
import { useGetProductsQuery } from '../productApiSlice'

export const ProductGalleryPage = () => {
    const { data: products, isLoading, error } = useGetProductsQuery()

    return (
        <GalleryPage
            redirectPath="/products"
            title="Продукты"
            subtitle="Мицеллярная вода, тоники, тональные основы и крема"
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
