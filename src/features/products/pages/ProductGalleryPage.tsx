import { PlusIcon } from '@heroicons/react/24/solid'
import { useNavigate } from 'react-router-dom'

import { AdaptiveNavBar, Header, TopPanel } from '../../../components'
import { ProductCard } from '../components/ProductCard'
import { useFetchProductsQuery } from '../productApiSlice'

export const ProductGalleryPage = () => {
    const navigate = useNavigate()
    const { data: products, isLoading, error } = useFetchProductsQuery()

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error loading products</div>

    return (
        <div className="py-16">
            <TopPanel title="Галерея продуктов" onBack={() => navigate('/')} />
            <main className="sm:ms-navbar-left lg:ms-navbar-left-open">
                <div className="mx-auto grid max-w-2xl grid-cols-3 gap-1 sm:gap-7">
                    {products?.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
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
        </div>
    )
}
