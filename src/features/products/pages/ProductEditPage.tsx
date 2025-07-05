import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useParams, useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { getErrorMessage } from '../../../shared/utils/errorUtils'
import { clearFormData, selectIsDirty, setFormData } from '../../form/formSlice'
import { ProductForm } from '../components/ProductForm'
import {
    useUpdateProductByIdMutation,
    useGetProductByIdQuery,
} from '../productsApi'
import type { Product } from '../types'

export const ProductEditPage = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { t } = useTranslation('product')

    const dispatch = useAppDispatch()
    const isDirty = useAppSelector(selectIsDirty)

    const [updateProductById] = useUpdateProductByIdMutation()
    const { data } = useGetProductByIdQuery(id!)

    useEffect(() => {
        if (data && !isDirty) {
            dispatch(
                setFormData({
                    brandId: data.brand?._id,
                    name: data.name,
                    imageUrl: data.imageUrl,
                    shade: data.shade,
                    comment: data.comment,
                    storeLinks: data.storeLinks,
                })
            )
        }
    }, [data, dispatch, isDirty])

    const handleEditProduct = async (product: Product) => {
        try {
            await updateProductById({ id: id!, product }).unwrap()
            dispatch(clearFormData())
            navigate(`/products/${id}`)
        } catch (error) {
            console.error(error)
            toast.error(getErrorMessage(error))
        }
    }

    return <ProductForm title={t('titles.edit')} onSubmit={handleEditProduct} />
}
