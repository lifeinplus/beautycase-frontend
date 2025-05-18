import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch } from '../../../app/hooks'
import { getErrorMessage } from '../../../utils/errorUtils'
import { clearFormData } from '../../form/formSlice'
import { ProductForm } from '../components/ProductForm'
import { useCreateProductMutation } from '../productsApi'
import type { Product } from '../types'

export const ProductAddPage = () => {
    const navigate = useNavigate()

    const dispatch = useAppDispatch()
    const [addProduct] = useCreateProductMutation()

    const handleAddProduct = async (product: Product) => {
        try {
            const response = await addProduct(product).unwrap()
            dispatch(clearFormData())
            navigate(`/products/${response.id}`)
        } catch (error) {
            console.error(error)
            toast.error(getErrorMessage(error))
        }
    }

    return (
        <ProductForm title={'Добавить продукт'} onSubmit={handleAddProduct} />
    )
}
