import { useNavigate } from 'react-router-dom'

import ProductForm from '../components/ProductForm'

export const AddProductPage = () => {
    const navigate = useNavigate()

    const handleAddProduct = (product: {
        name: string
        image: string
        buy: string
    }) => {
        console.log('Adding Product:', product)
        navigate('/product_gallery')
    }

    return <ProductForm onSubmit={handleAddProduct} title={'Добавить'} />
}
