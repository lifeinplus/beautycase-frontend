import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch } from '../../../app/hooks'
import { getErrorMessage } from '../../../utils'
import { clearFormData } from '../../form'
import ProductForm from '../components/ProductForm'
import { useCreateProductMutation } from '../productApiSlice'
import { Product } from '../types'

export const ProductAddPage = () => {
    const navigate = useNavigate()

    const dispatch = useAppDispatch()
    const [createProduct] = useCreateProductMutation()

    const handleAddProduct = async (product: Product) => {
        try {
            await createProduct(product).unwrap()
            dispatch(clearFormData())
            navigate('/products')
        } catch (error) {
            console.error(error)
            toast.error(getErrorMessage(error))
        }
    }

    return (
        <ProductForm title={'Добавить продукт'} onSubmit={handleAddProduct} />
    )
}
