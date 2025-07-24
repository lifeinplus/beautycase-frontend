import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch } from '@/app/hooks'
import { clearFormData } from '@/features/form/formSlice'
import { ProductForm } from '@/features/products/components/ProductForm'
import { useCreateProductMutation } from '@/features/products/productsApi'
import type { Product } from '@/features/products/types'
import { getErrorMessage } from '@/shared/utils/errorUtils'

export const ProductAdd = () => {
    const navigate = useNavigate()
    const { t } = useTranslation('product')

    const dispatch = useAppDispatch()
    const [createProduct, { isLoading }] = useCreateProductMutation()

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

    return (
        <ProductForm
            title={t('titles.add')}
            onSubmit={handleAddProduct}
            isSaving={isLoading}
        />
    )
}
