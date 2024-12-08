import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'

import { BottomPanel, TopPanel } from '../../../components'
import { isDataMessageError, isFetchBaseQueryError } from '../../../utils'
import { Modal } from '../../modals'
import {
    useDeleteProductMutation,
    useFetchProductByIdQuery,
} from '../productApiSlice'

export const ProductPage = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [isModalOpen, setIsModalOpen] = useState(false)

    const {
        data: product,
        isLoading,
        error,
    } = useFetchProductByIdQuery(id || '')

    const [deleteProduct] = useDeleteProductMutation()

    if (!product) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p className="text-gray-500">Product not found</p>
            </div>
        )
    }

    const handleDelete = async () => {
        if (!id) return

        try {
            await deleteProduct(id).unwrap()
            navigate('/product_gallery')
            setIsModalOpen(false)
        } catch (error) {
            if (isDataMessageError(error)) {
                toast.error(error.data.message)
            } else if (isFetchBaseQueryError(error)) {
                const errMsg =
                    'error' in error ? error.error : JSON.stringify(error.data)
                toast.error(errMsg)
            } else {
                console.error(error)
            }
        }
    }

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error loading product</div>

    return (
        <div className="relative">
            <TopPanel
                title="Продукт"
                onBack={() => navigate('/product_gallery')}
            />

            <main className="flex-grow pb-16 pt-13">
                <h1 className="mb-2 px-3 text-sm font-bold">{product.name}</h1>
                <img
                    src={product.image}
                    alt={product.name}
                    className="mb-4 h-auto w-full"
                />
                <p className="px-4 text-sm">Купить: {product.buy}</p>
            </main>

            <BottomPanel>
                <button
                    className="bottom-panel__button"
                    onClick={() => navigate(`/product_gallery/edit/${id}`)}
                >
                    <PencilSquareIcon className="h-6 w-6" />
                </button>
                <button
                    className="bottom-panel__button"
                    onClick={() => setIsModalOpen(true)}
                >
                    <TrashIcon className="h-6 w-6" />
                </button>
            </BottomPanel>

            <Modal
                isOpen={isModalOpen}
                title="Удалить?"
                description="Вы действительно хотите удалить этот продукт?"
                onConfirm={handleDelete}
                onCancel={() => setIsModalOpen(false)}
            />
        </div>
    )
}
