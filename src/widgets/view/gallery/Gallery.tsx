import { PlusIcon } from '@heroicons/react/24/solid'
import { ReactNode, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { selectRole, selectUsername } from '@/features/auth/authSlice'
import { clearFormData } from '@/features/form/formSlice'
import { DataWrapper } from '@/shared/components/common/DataWrapper'
import { Hero } from '@/shared/components/common/Hero'
import { Header } from '@/shared/components/layout/Header'
import { NavBar } from '@/shared/components/navigation/NavBar'
import { NavButton } from '@/shared/components/navigation/NavButton'
import pageStyles from '@/shared/components/ui/page.module.css'
import { canAccess } from '@/shared/utils/menu'

const ACTIONS = {
    add: {
        icon: PlusIcon,
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

export interface GalleryProps {
    redirectPath: string
    title: string
    subtitle?: string
    isLoading: boolean
    error: unknown
    mediaContent?: ReactNode
}

export const Gallery = ({
    redirectPath,
    title,
    subtitle,
    isLoading,
    error,
    mediaContent,
}: GalleryProps) => {
    const navigate = useNavigate()
    const { t } = useTranslation('component')

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
        label: t(`navigation:${ACTIONS[id].label}`),
        onClick: actionHandlers[id],
    }))

    return (
        <article className={pageStyles.page}>
            <Header />

            <main className={pageStyles.content}>
                <article className={pageStyles.container}>
                    <Hero headline={title} byline={subtitle} />

                    <DataWrapper
                        isLoading={isLoading}
                        error={error}
                        data={title}
                        emptyMessage={t('emptyMessage', {
                            value: title,
                        })}
                    >
                        {mediaContent}
                    </DataWrapper>
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
