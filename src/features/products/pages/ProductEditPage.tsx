import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useParams, useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { getErrorMessage } from '../../../utils/errorUtils'
import { clearFormData, selectIsDirty, setFormData } from '../../form/formSlice'
import { ProductForm } from '../components/ProductForm'
import { useUpdateProductMutation, useReadProductQuery } from '../productsApi'
import type { Product } from '../types'

export const ProductEditPage = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const dispatch = useAppDispatch()
    const isDirty = useAppSelector(selectIsDirty)

    const [editProduct] = useUpdateProductMutation()
    const { data } = useReadProductQuery(id!)

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
            await editProduct({ id: id!, body: product }).unwrap()
            dispatch(clearFormData())
            navigate(`/products/${id}`)
        } catch (error) {
            console.error(error)
            toast.error(getErrorMessage(error))
        }
    }

    return (
        <ProductForm
            title={'Редактировать продукт'}
            onSubmit={handleEditProduct}
        />
    )
}
