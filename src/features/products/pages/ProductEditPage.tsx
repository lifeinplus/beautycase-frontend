import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { selectIsDirty, setFormData } from '../../form'
import ProductForm from '../components/ProductForm'
import {
    useFetchProductByIdQuery,
    useUpdateProductMutation,
} from '../productApiSlice'
import type { Product } from '../types'

export const ProductEditPage = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const dispatch = useAppDispatch()
    const isDirty = useAppSelector(selectIsDirty)

    const [updateProduct] = useUpdateProductMutation()
    const { data, isLoading } = useFetchProductByIdQuery(id!)

    useEffect(() => {
        if (data && !isDirty) {
            dispatch(
                setFormData({
                    name: data.name,
                    image: data.image,
                    buy: data.buy,
                })
            )
        }
    }, [data, dispatch, isDirty])

    if (isLoading) return <p>Loading...</p>

    if (!data) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p className="text-gray-500">Product not found</p>
            </div>
        )
    }

    const handleEditProduct = async (product: Product) => {
        await updateProduct({
            id: id!,
            ...product,
        }).unwrap()
        navigate(`/products/${id}`)
    }

    return <ProductForm title={'Редактировать'} onSubmit={handleEditProduct} />
}
