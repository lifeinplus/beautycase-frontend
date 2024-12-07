import { useNavigate } from 'react-router-dom'

import { useFetchProductsQuery } from '../productApiSlice'
import TopPanel from '../../../components/common/TopPanel'
import { ProductCard } from '../components/ProductCard'
import { BottomPanel } from '../../../components/common/BottomPanel'

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
            <BottomPanel />
        </div>
    )
}
