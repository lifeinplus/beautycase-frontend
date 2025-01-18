import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useParams, useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { getErrorMessage } from '../../../utils'
import { clearFormData, selectIsDirty, setFormData } from '../../form'
import {
    type Product,
    ProductForm,
    useEditProductMutation,
    useGetProductByIdQuery,
} from '../../products'

export const ProductEditPage = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const dispatch = useAppDispatch()
    const isDirty = useAppSelector(selectIsDirty)

    const [editProduct] = useEditProductMutation()
    const { data } = useGetProductByIdQuery(id!)

    useEffect(() => {
        if (data && !isDirty) {
            dispatch(
                setFormData({
                    name: data.name,
                    brandId: data.brandId?._id,
                    image: data.image,
                    storeLinks: data.storeLinks,
                })
            )
        }
    }, [data, dispatch, isDirty])

    const handleEditProduct = async (product: Product) => {
        try {
            await editProduct({
                id: id!,
                ...product,
            }).unwrap()

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
