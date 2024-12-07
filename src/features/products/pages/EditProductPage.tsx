import { useParams, useNavigate } from 'react-router-dom'

import { Product, useFetchProductByIdQuery } from '../productApiSlice'
import ProductForm from '../components/ProductForm'

export const EditProductPage = () => {
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

    const handleEditProduct = (product: Product) => {
        console.log('Editing Product:', product)
        navigate('/product_gallery')
    }

    return (
        <ProductForm
            initialData={product}
            onSubmit={handleEditProduct}
            title={'Редактировать'}
        />
    )
}
