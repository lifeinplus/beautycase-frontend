import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch } from '../../../app/hooks'
import { appendToFormData, getErrorMessage } from '../../../utils'
import { clearFormData } from '../../form'
import {
    type Product,
    ProductForm,
    useAddProductMutation,
} from '../../products'

export const ProductAddPage = () => {
    const navigate = useNavigate()

    const dispatch = useAppDispatch()
    const [addProduct] = useAddProductMutation()

    const handleAddProduct = async (data: Product) => {
        const formData = appendToFormData(data)

        try {
            const response = await addProduct(formData).unwrap()
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
