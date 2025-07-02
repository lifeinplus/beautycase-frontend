import { PlusIcon } from '@heroicons/react/24/solid'
import { ReactNode, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { selectRole, selectUsername } from '../../features/auth/authSlice'
import { clearFormData } from '../../features/form/formSlice'
import { getErrorMessage } from '../../utils/errorUtils'
import { canAccess } from '../../utils/menu'
import { Header } from '../Header'
import { Hero } from '../Hero'
import { NavBar } from '../navigation/NavBar'
import { NavButton } from '../navigation/NavButton'

const ACTIONS = {
    add: {
        icon: <PlusIcon className="h-6 w-6" />,
        label: 'actions.add',
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

export interface GalleryPageProps {
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
    const { t } = useTranslation('navigation')

    const dispatch = useAppDispatch()
    const role = useAppSelector(selectRole)
    const username = useAppSelector(selectUsername)

    useEffect(() => {
        dispatch(clearFormData())
    }, [dispatch])

    const actionHandlers = {
        add: () => navigate(`${redirectPath}/add`),
    }

    const visibleActions = ACTION_ITEMS.filter((item) =>
        canAccess(item, username, role)
    ).map(({ id }) => ({
        key: id,
        icon: ACTIONS[id].icon,
        label: t(ACTIONS[id].label),
        onClick: actionHandlers[id],
    }))

    return (
        <article className="page">
            <Header />

            <main className="page-content">
                <article className="content-container">
                    <Hero headline={title} byline={subtitle} />

                    {isLoading ? (
                        <div>Loading...</div>
                    ) : error ? (
                        <div>{getErrorMessage(error)}</div>
                    ) : (
                        mediaContent
                    )}
                </article>
            </main>

            <NavBar>
                {visibleActions.map(({ key, icon, label, onClick }) => (
                    <NavButton
                        key={key}
                        icon={icon}
                        label={label}
                        onClick={onClick}
                    />
                ))}
            </NavBar>
        </article>
    )
}
