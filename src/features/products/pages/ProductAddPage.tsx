import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch } from '../../../app/hooks'
import { getErrorMessage } from '../../../utils/errorUtils'
import { clearFormData } from '../../form/formSlice'
import { ProductForm } from '../components/ProductForm'
import { useCreateProductMutation } from '../productsApi'
import type { Product } from '../types'

export const ProductAddPage = () => {
    const navigate = useNavigate()
    const { t } = useTranslation('product')

    const dispatch = useAppDispatch()
    const [createProduct] = useCreateProductMutation()

    const handleAddProduct = async (product: Product) => {
        try {
            const response = await createProduct(product).unwrap()
            dispatch(clearFormData())
            navigate(`/products/${response.id}`)
        } catch (error) {
            console.error(error)
            toast.error(getErrorMessage(error))
        }
    }

    return <ProductForm title={t('titles.add')} onSubmit={handleAddProduct} />
}
