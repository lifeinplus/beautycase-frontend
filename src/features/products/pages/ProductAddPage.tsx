import { useNavigate } from 'react-router-dom'

import ProductForm from '../components/ProductForm'
import { useCreateProductMutation } from '../productApiSlice'
import { Product } from '../types'

export const ProductAddPage = () => {
    const navigate = useNavigate()
    const [createProduct] = useCreateProductMutation()

    const handleAddProduct = async (product: Product) => {
        await createProduct(product).unwrap()
        navigate('/products')
    }

    return (
        <ProductForm onSubmit={handleAddProduct} title={'Добавить продукт'} />
    )
}
