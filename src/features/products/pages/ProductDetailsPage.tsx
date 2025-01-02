import {
    ArrowLeftIcon,
    PencilSquareIcon,
    TrashIcon,
} from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import {
    AdaptiveNavBar,
    Modal,
    NavigationButton,
    TopPanel,
} from '../../../components'
import { canAccess, getErrorMessage } from '../../../utils'
import { selectRole, selectUsername } from '../../auth'
import { clearFormData } from '../../form'
import {
    useDeleteProductMutation,
    useFetchProductByIdQuery,
} from '../productApiSlice'

const ACTIONS = {
    back: { icon: <ArrowLeftIcon className="h-6 w-6" />, label: 'Назад' },
    edit: {
        icon: <PencilSquareIcon className="h-6 w-6" />,
        label: 'Редактировать',
    },
    delete: { icon: <TrashIcon className="h-6 w-6" />, label: 'Удалить' },
} as const

type ActionId = keyof typeof ACTIONS

interface ActionItem {
    id: ActionId
    auth?: boolean
    className?: string
    roles?: string[]
}

const ACTION_ITEMS: ActionItem[] = [
    { id: 'back', className: 'nav-btn-back' },
    { id: 'edit', auth: true, roles: ['admin', 'mua'] },
    { id: 'delete', auth: true, roles: ['admin', 'mua'] },
]

const LoadingOrError = ({ message }: { message: string }) => (
    <div className="flex min-h-screen items-center justify-center">
        <p className="text-gray-500">{message}</p>
    </div>
)

export const ProductDetailsPage = () => {
    const { state } = useLocation()
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const role = useAppSelector(selectRole)
    const username = useAppSelector(selectUsername)

    const [isModalOpen, setIsModalOpen] = useState(false)

    const { data: product, isLoading, error } = useFetchProductByIdQuery(id!)
    const [deleteProduct] = useDeleteProductMutation()

    useEffect(() => {
        dispatch(clearFormData())
    }, [dispatch])

    const actionHandlers = {
        back: () =>
            navigate(state?.fromPathname || '/products', {
                replace: true,
                state: { scrollId: id },
            }),
        edit: () => navigate(`/products/edit/${id}`),
        delete: () => setIsModalOpen(true),
    }

    const handleDelete = async () => {
        if (!id) return
        try {
            await deleteProduct(id).unwrap()
            toast.success('Продукт удалён')
            navigate('/products')
        } catch (err) {
            console.error(err)
            toast.error(getErrorMessage(err))
        } finally {
            setIsModalOpen(false)
        }
    }

    const visibleItems = ACTION_ITEMS.filter((item) =>
        canAccess(item, username, role)
    ).map(({ id, className }) => ({
        key: id,
        className,
        icon: ACTIONS[id].icon,
        label: ACTIONS[id].label,
        onClick: actionHandlers[id],
    }))

    if (isLoading) return <LoadingOrError message="Загрузка..." />
    if (error) return <LoadingOrError message="Ошибка загрузки продукта" />
    if (!product) return <LoadingOrError message="Продукт не найден" />

    const { name, image, buy } = product

    return (
        <article className="page">
            <TopPanel title="Продукт" onBack={actionHandlers.back} />

            <main className="page-content">
                <section className="w-full max-w-2xl space-y-6">
                    <article className="page-content__container">
                        <section className="page-content__title">
                            <h1 className="page-content__title__headline">
                                {name}
                            </h1>
                        </section>
                        <section className="page-content__image">
                            <div className="img-container img-container-rectangle">
                                <img src={image} alt={name} className="img" />
                            </div>
                        </section>
                        <section className="page-content__description">
                            <p>Купить: {buy}</p>
                        </section>
                    </article>
                </section>
            </main>

            <AdaptiveNavBar>
                {visibleItems.map(
                    ({ key, className, icon, label, onClick }) => (
                        <NavigationButton
                            key={key}
                            className={className}
                            icon={icon}
                            text={label}
                            onClick={onClick}
                        />
                    )
                )}
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
