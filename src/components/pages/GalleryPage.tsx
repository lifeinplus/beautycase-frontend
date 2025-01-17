import { PlusIcon } from '@heroicons/react/24/solid'
import { ReactNode, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
    AdaptiveNavBar,
    Header,
    Hero,
    NavigationButton,
} from '../../components'
import { selectRole, selectUsername } from '../../features/auth'
import { clearFormData } from '../../features/form'
import { canAccess, getErrorMessage } from '../../utils'

const ACTIONS = {
    add: {
        icon: <PlusIcon className="h-6 w-6" />,
        label: 'Добавить',
    },
} as const

type ActionId = keyof typeof ACTIONS

interface ActionItem {
    id: ActionId
    auth?: boolean
    roles?: string[]
}

const ACTION_ITEMS: ActionItem[] = [
    { id: 'add', auth: true, roles: ['admin', 'mua'] },
]

interface GalleryPageProps {
    redirectPath: string
    title: string
    subtitle?: string
    isLoading: boolean
    error: unknown
    mediaContent?: ReactNode
}

export const GalleryPage = ({
    redirectPath,
    title,
    subtitle,
    isLoading,
    error,
    mediaContent,
}: GalleryPageProps) => {
    const navigate = useNavigate()

    const dispatch = useAppDispatch()
    const role = useAppSelector(selectRole)
    const username = useAppSelector(selectUsername)

    useEffect(() => {
        dispatch(clearFormData())
    }, [dispatch])

    const actionHandlers = {
        add: () => navigate(`${redirectPath}/add`),
    }

    const visibleItems = ACTION_ITEMS.filter((item) =>
        canAccess(item, username, role)
    ).map(({ id }) => ({
        key: id,
        icon: ACTIONS[id].icon,
        label: ACTIONS[id].label,
        onClick: actionHandlers[id],
    }))

    return (
        <article className="page">
            <Header />

            <main className="page-content">
                <section className="w-full max-w-2xl space-y-6">
                    <article className="content-container content-container-xl">
                        <Hero headline={title} byline={subtitle} />

                        {isLoading ? (
                            <div>Loading...</div>
                        ) : error ? (
                            <div>{getErrorMessage(error)}</div>
                        ) : (
                            mediaContent
                        )}
                    </article>
                </section>
            </main>

            <AdaptiveNavBar>
                {visibleItems.map(({ key, icon, label, onClick }) => (
                    <NavigationButton
                        key={key}
                        icon={icon}
                        text={label}
                        onClick={onClick}
                    />
                ))}
            </AdaptiveNavBar>
        </article>
    )
}
