import {
    ArrowLeftIcon,
    PencilSquareIcon,
    TrashIcon,
} from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import { useAppDispatch } from '../../../app/hooks'
import { AdaptiveNavBar, NavigationButton, TopPanel } from '../../../components'
import { getErrorMessage } from '../../../utils'
import { clearFormData } from '../../form'
import { Modal } from '../../modals'
import {
    useDeleteProductMutation,
    useFetchProductByIdQuery,
} from '../productApiSlice'

export const ProductDetailsPage = () => {
    const { state } = useLocation()
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

    const handleBack = () => {
        if (state?.fromPathname) {
            navigate(state?.fromPathname, {
                replace: true,
                state: { scrollId: id },
            })
            return
        }

        navigate('/products')
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
            <TopPanel title="Продукт" onBack={handleBack} />

            <main className="page-content">
                <section className="w-full max-w-2xl space-y-6">
                    <article className="page-content__container">
                        <section className="page-content__title">
                            <h1 className="page-content__title__headline">
                                {product.name}
                            </h1>
                        </section>

                        <section className="page-content__image">
                            <div className="img-container img-container-rectangle">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="img"
                                />
                            </div>
                        </section>

                        <section className="page-content__description">
                            <p>Купить: {product.buy}</p>
                        </section>
                    </article>
                </section>
            </main>

            <AdaptiveNavBar>
                <NavigationButton
                    icon={<ArrowLeftIcon className="h-6 w-6" />}
                    text="Назад"
                    onClick={handleBack}
                    className="nav-btn-back"
                />
                <NavigationButton
                    icon={<PencilSquareIcon className="h-6 w-6" />}
                    text="Редактировать"
                    onClick={() => navigate(`/products/edit/${id}`)}
                />
                <NavigationButton
                    icon={<TrashIcon className="h-6 w-6" />}
                    text="Удалить"
                    onClick={() => setIsModalOpen(true)}
                />
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
