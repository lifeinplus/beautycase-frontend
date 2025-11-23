import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '@/app/hooks/hooks'
import {
    clearFormData,
    selectIsDirty,
    setFormData,
} from '@/features/form/slice/formSlice'
import {
    useGetProductByIdQuery,
    useUpdateProductByIdMutation,
} from '@/features/products/api/productsApi'
import { ProductForm } from '@/features/products/components/form/ProductForm'
import type { Product } from '@/features/products/types'
import { ROUTES } from '@/shared/config/routes'
import { getErrorMessage } from '@/shared/utils/error/getErrorMessage'

export const ProductEdit = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { t } = useTranslation('product')

    const dispatch = useAppDispatch()
    const isDirty = useAppSelector(selectIsDirty)

    const [updateProductById, { isLoading }] = useUpdateProductByIdMutation()
    const { data } = useGetProductByIdQuery(id!)

    useEffect(() => {
        if (data && !isDirty) {
            dispatch(
                setFormData({
                    brandId: data.brand?._id,
                    categoryId: data.category?._id,
                    name: data.name,
                    imageIds: data.imageIds,
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
            navigate(ROUTES.backstage.products.details(id!))
        } catch (error) {
            console.error(error)
            toast.error(getErrorMessage(error))
        }
    }

    return (
        <ProductForm
            title={t('titles.edit')}
            onSubmit={handleEditProduct}
            isSaving={isLoading}
        />
    )
}
