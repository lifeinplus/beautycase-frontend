import { useNavigate } from 'react-router-dom'

import ProductForm from '../components/ProductForm'
import { useCreateProductMutation, type Product } from '../productApiSlice'

export const AddProductPage = () => {
    const navigate = useNavigate()
    const [createProduct] = useCreateProductMutation()

    const handleAddProduct = async (product: Product) => {
        await createProduct(product).unwrap()
        navigate('/product_gallery')
    }

    return (
        <ProductForm onSubmit={handleAddProduct} title={'Добавить продукт'} />
    )
}
