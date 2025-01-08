import {
    ArrowLeftIcon,
    PencilSquareIcon,
    TrashIcon,
} from '@heroicons/react/24/outline'
import { ReactNode, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
    AdaptiveNavBar,
    Modal,
    NavigationButton,
    TopPanel,
} from '../../components'
import { selectRole, selectUsername } from '../../features/auth'
import { clearFormData } from '../../features/form'
import { canAccess, getErrorMessage } from '../../utils'

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

interface DetailsPageProps {
    topPanelTitle: string
    redirectPath: string
    title: string
    subtitle?: string
    description?: string
    deleteMutation: () => any
    mediaContent?: ReactNode
    descriptionContent?: ReactNode
    additionalContent?: ReactNode
}

export const DetailsPage = ({
    topPanelTitle,
    redirectPath,
    title,
    subtitle,
    description,
    deleteMutation,
    mediaContent,
    descriptionContent,
    additionalContent,
}: DetailsPageProps) => {
    const { state } = useLocation()
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()

    const dispatch = useAppDispatch()
    const role = useAppSelector(selectRole)
    const username = useAppSelector(selectUsername)

    const [isModalOpen, setIsModalOpen] = useState(false)

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

    return (
        <article className="page">
            <TopPanel title={topPanelTitle} onBack={actionHandlers.back} />

            <main className="page-content">
                <section className="w-full max-w-2xl space-y-6">
                    <article className="page-content__container">
                        <section className="page-content__title">
                            <h1 className="page-content__title__headline">
                                {title}
                            </h1>
                            <p className="page-content__title__byline">
                                {subtitle}
                            </p>
                        </section>

                        {mediaContent}

                        {descriptionContent
                            ? descriptionContent
                            : description && (
                                  <section className="page-content__description">
                                      <p>{description}</p>
                                  </section>
                              )}

                        {additionalContent}
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
