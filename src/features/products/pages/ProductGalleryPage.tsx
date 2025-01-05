import { GalleryPage } from '../../../components'
import { ProductCard } from '../components/ProductCard'
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
                <article className="page-gallery__container">
                    {products?.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </article>
            }
        />
    )
}
