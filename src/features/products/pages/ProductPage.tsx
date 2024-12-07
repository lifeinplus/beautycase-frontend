import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid'
import { useNavigate, useParams } from 'react-router-dom'

import { BottomPanel, TopPanel } from '../../../components'
import { useFetchProductByIdQuery } from '../productApiSlice'

export const ProductPage = () => {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const { data: product, isLoading } = useFetchProductByIdQuery(id || '')

    if (isLoading) return <p>Loading...</p>

    if (!product) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p className="text-gray-500">Product not found</p>
            </div>
        )
    }

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            console.log(`Deleting product: ${product._id}`)
            navigate('/product_gallery')
        }
    }

    return (
        <div className="relative">
            <TopPanel title="Продукт" onBack={() => navigate(-1)} />

            <main className="pt-13 flex-grow pb-16">
                <h1 className="mb-2 px-3 text-sm font-bold">{product.name}</h1>
                <img
                    src={product.image}
                    alt={product.name}
                    className="mb-4 h-auto w-full"
                />
                <p className="px-4 text-sm">Купить: {product.buy}</p>
            </main>

            <BottomPanel>
                <button
                    className="bottom-panel__button"
                    onClick={() =>
                        navigate(`/product_gallery/edit/${product._id}`)
                    }
                >
                    <PencilSquareIcon className="h-6 w-6" />
                </button>
                <button className="bottom-panel__button" onClick={handleDelete}>
                    <TrashIcon className="h-6 w-6" />
                </button>
            </BottomPanel>
        </div>
    )
}
