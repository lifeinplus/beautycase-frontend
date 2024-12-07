import { useParams, useNavigate } from 'react-router-dom'

import ProductForm from '../components/ProductForm'
import {
    Product,
    useFetchProductByIdQuery,
    useUpdateProductMutation,
} from '../productApiSlice'

export const EditProductPage = () => {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const [updateProduct] = useUpdateProductMutation()

    const { data: initialProduct, isLoading } = useFetchProductByIdQuery(
        id || ''
    )

    if (isLoading) return <p>Loading...</p>

    if (!initialProduct) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p className="text-gray-500">Product not found</p>
            </div>
        )
    }

    const handleEditProduct = async (product: Product) => {
        await updateProduct({ id: initialProduct._id || '', ...product }).unwrap
        navigate(-1)
    }

    return (
        <ProductForm
            initialData={initialProduct}
            onSubmit={handleEditProduct}
            title={'Редактировать'}
        />
    )
}
