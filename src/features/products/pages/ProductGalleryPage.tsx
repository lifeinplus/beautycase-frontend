import { PlusIcon } from '@heroicons/react/24/solid'
import { useNavigate } from 'react-router-dom'

import { AdaptiveNavBar, TopPanel } from '../../../components'
import { ProductCard } from '../components/ProductCard'
import { useFetchProductsQuery } from '../productApiSlice'

export const ProductGalleryPage = () => {
    const navigate = useNavigate()
    const { data: products, isLoading, error } = useFetchProductsQuery()

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error loading products</div>

    return (
        <article className="page-container">
            <TopPanel title="Галерея продуктов" onBack={() => navigate('/')} />

            <main className="page-content">
                <section className="product-gallery__title">
                    <h1 className="product-gallery__title__text">
                        Галерея продуктов
                    </h1>
                </section>
                <section className="product-gallery__container">
                    {products?.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </section>
            </main>

            <AdaptiveNavBar>
                <button
                    className="adaptive-nav-bar__button"
                    onClick={() => navigate('/product_gallery/add')}
                >
                    <PlusIcon className="h-6 w-6" />
                    <span className="hidden lg:inline">Добавить</span>
                </button>
            </AdaptiveNavBar>
        </article>
    )
}
