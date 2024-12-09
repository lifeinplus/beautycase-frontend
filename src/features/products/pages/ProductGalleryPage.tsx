import { PlusIcon } from '@heroicons/react/24/solid'
import { useNavigate } from 'react-router-dom'

import { BottomPanel, TopPanel } from '../../../components'
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
            <main>
                <div className="grid grid-cols-3 gap-1">
                    {products?.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            </main>
            <BottomPanel>
                <button
                    className="panel-bottom__button"
                    onClick={() => navigate('/product_gallery/add')}
                >
                    <PlusIcon className="h-6 w-6" />
                </button>
            </BottomPanel>
        </div>
    )
}
