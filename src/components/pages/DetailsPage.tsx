import {
    ArrowLeftIcon,
    PencilSquareIcon,
    TrashIcon,
} from '@heroicons/react/24/outline'

import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
    AdaptiveNavBar,
    Modal,
    NavigationButton,
    TopPanel,
} from '../../components'
import { canAccess, getErrorMessage } from '../../utils'
import { clearFormData } from '../../features/form'
import { selectRole, selectUsername } from '../../features/auth'

const ACTIONS = {
    back: {
        icon: <ArrowLeftIcon className="h-6 w-6" />,
        label: 'Назад',
    },
    edit: {
        icon: <PencilSquareIcon className="h-6 w-6" />,
        label: 'Редактировать',
    },
    delete: {
        icon: <TrashIcon className="h-6 w-6" />,
        label: 'Удалить',
    },
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

interface DetailsPageProps {
    title: string
    fetchQuery: (id: string) => any
    deleteMutation: () => any
    contentRenderer: (data: any) => React.ReactNode
    redirectPath: string
}

export const DetailsPage = ({
    title,
    fetchQuery,
    deleteMutation,
    contentRenderer,
    redirectPath,
}: DetailsPageProps) => {
    const { state } = useLocation()
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()

    const dispatch = useAppDispatch()
    const role = useAppSelector(selectRole)
    const username = useAppSelector(selectUsername)

    const [isModalOpen, setIsModalOpen] = useState(false)

    const { data, isLoading, error } = fetchQuery(id!)
    const [deleteItem] = deleteMutation()

    useEffect(() => {
        dispatch(clearFormData())
    }, [dispatch])

    const actionHandlers = {
        back: () =>
            navigate(state?.fromPathname || redirectPath, {
                replace: true,
                state: { scrollId: id },
            }),
        edit: () => navigate(`${redirectPath}/edit/${id}`),
        delete: () => setIsModalOpen(true),
    }

    const handleDelete = async () => {
        if (!id) return
        try {
            await deleteItem(id).unwrap()
            toast.success(`${title} удалён`)
            navigate(redirectPath)
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
    if (error)
        return (
            <LoadingOrError
                message={`Ошибка загрузки ${title.toLowerCase()}`}
            />
        )
    if (!data) return <LoadingOrError message={`${title} не найден`} />

    return (
        <article className="page">
            <TopPanel title={title} onBack={actionHandlers.back} />

            <main className="page-content">
                <section className="w-full max-w-2xl space-y-6">
                    <article className="page-content__container">
                        {contentRenderer(data)}
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
                description={`Вы действительно хотите удалить этот ${title.toLowerCase()}?`}
                onConfirm={handleDelete}
                onCancel={() => setIsModalOpen(false)}
            />
        </article>
    )
}
