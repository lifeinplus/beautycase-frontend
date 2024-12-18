import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'

import { useAppDispatch } from '../../../app/hooks'
import { AdaptiveNavBar, TopPanel } from '../../../components'
import { getErrorMessage } from '../../../utils'
import { clearFormData } from '../../form'
import { Modal } from '../../modals'
import {
    useDeleteProductMutation,
    useFetchProductByIdQuery,
} from '../productApiSlice'

export const ProductDetailsPage = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [isModalOpen, setIsModalOpen] = useState(false)

    const dispatch = useAppDispatch()
    const { data: product, isLoading, error } = useFetchProductByIdQuery(id!)
    const [deleteProduct] = useDeleteProductMutation()

    useEffect(() => {
        dispatch(clearFormData())
    }, [])

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error loading product</div>

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
            navigate('/products')
            setIsModalOpen(false)
        } catch (error) {
            console.error(error)
            toast.error(getErrorMessage(error))
        }
    }

    return (
        <article className="page">
            <TopPanel title="Продукт" onBack={() => navigate('/products')} />

            <main className="page-content">
                <article className="page-content__container">
                    <section className="page-content__title">
                        <h1 className="page-content__title__headline">
                            {product.name}
                        </h1>
                    </section>

                    <section className="page-content__image">
                        <div className="makeup-item__image-container--rectangle">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="makeup-item__image"
                            />
                        </div>
                    </section>

                    <section className="page-content__description">
                        <p>Купить: {product.buy}</p>
                    </section>
                </article>
            </main>

            <AdaptiveNavBar>
                <button
                    className="nav-btn"
                    onClick={() => navigate(`/products/edit/${id}`)}
                >
                    <PencilSquareIcon className="h-6 w-6" />
                    <span className="hidden lg:inline">Редактировать</span>
                </button>
                <button
                    className="nav-btn"
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
