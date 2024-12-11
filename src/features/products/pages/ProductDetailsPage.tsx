import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'

import { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'

import { AdaptiveNavBar, TopPanel } from '../../../components'
import { isDataMessageError, isFetchBaseQueryError } from '../../../utils'
import { Modal } from '../../modals'
import {
    useDeleteProductMutation,
    useFetchProductByIdQuery,
} from '../productApiSlice'

export const ProductDetailsPage = () => {
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
        <article className="page-container">
            <TopPanel
                title="Продукт"
                onBack={() => navigate('/product_gallery')}
            />

            <main className="page-content">
                <article className="max-w-product mx-auto">
                    <section className="page-content__title">
                        <h1 className="page-content__title__text">
                            {product.name}
                        </h1>
                    </section>

                    <section className="product-details__image">
                        <div className="image-container--rectangle">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="product-image"
                            />
                        </div>
                    </section>

                    <section className="product-details__description">
                        <p>Купить: {product.buy}</p>
                    </section>
                </article>
            </main>

            <AdaptiveNavBar>
                <button
                    className="adaptive-nav-bar__button"
                    onClick={() => navigate(`/product_gallery/edit/${id}`)}
                >
                    <PencilSquareIcon className="h-6 w-6" />
                    <span className="hidden lg:inline">Редактировать</span>
                </button>
                <button
                    className="adaptive-nav-bar__button"
                    onClick={() => setIsModalOpen(true)}
                >
                    <TrashIcon className="h-6 w-6" />
                    <span className="hidden lg:inline">Удалить</span>
                </button>
            </AdaptiveNavBar>

            <Modal
                isOpen={isModalOpen}
                title="Удалить?"
                description="Вы действительно хотите удалить этот продукт?"
                onConfirm={handleDelete}
                onCancel={() => setIsModalOpen(false)}
            />
        </article>
    )
}
