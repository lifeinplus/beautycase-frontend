import { PlusIcon } from '@heroicons/react/24/solid'
import { useNavigate } from 'react-router-dom'

import { BottomPanel, TopPanel } from '../../../components'
import { ProductCard } from '../components/ProductCard'
import { useFetchProductsQuery } from '../productApiSlice'

export const ProductGalleryPage = () => {
    const { data: products, isLoading } = useFetchProductsQuery()
    const navigate = useNavigate()

    if (isLoading) return <p>Loading...</p>

    return (
        <div className="py-16">
            <TopPanel title="Галерея продуктов" onBack={() => navigate(-1)} />
            <main>
                <div className="grid grid-cols-3 gap-1">
                    {products?.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            </main>
            <BottomPanel>
                <button
                    className="bottom-panel__button"
                    onClick={() => navigate('/product_gallery/add')}
                >
                    <PlusIcon className="h-6 w-6" />
                </button>
            </BottomPanel>
        </div>
    )
}
