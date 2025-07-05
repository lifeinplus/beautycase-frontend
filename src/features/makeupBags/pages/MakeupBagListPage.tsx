import { PlusIcon } from '@heroicons/react/24/outline'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { DataWrapper } from '@/shared/components/common/DataWrapper'
import { Hero } from '@/shared/components/common/Hero'
import { Header } from '@/shared/components/layout/Header'
import { NavBar } from '@/shared/components/navigation/NavBar'
import { NavButton } from '@/shared/components/navigation/NavButton'
import { canAccess } from '@/shared/utils/menu'
import { selectRole, selectUsername } from '@/features/auth/authSlice'
import { clearFormData } from '@/features/form/formSlice'
import { MakeupBagMobileView } from '../components/MakeupBagMobileView'
import { MakeupBagTable } from '../components/MakeupBagTable'
import { useGetAllMakeupBagsQuery } from '../makeupBagsApi'

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

export const MakeupBagListPage = () => {
    const navigate = useNavigate()
    const { t } = useTranslation(['makeupBag'])

    const dispatch = useAppDispatch()
    const role = useAppSelector(selectRole)
    const username = useAppSelector(selectUsername)

    const { data, isLoading, error } = useGetAllMakeupBagsQuery()

    useEffect(() => {
        dispatch(clearFormData())
    }, [dispatch])

    const actionHandlers = {
        add: () => navigate('add'),
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
        <article>
            <Header />

            <main className="page-content">
                <article className="content-container">
                    <Hero headline={t('hero.headline')} />

                    <DataWrapper
                        isLoading={isLoading}
                        error={error}
                        data={data}
                        emptyMessage={t('emptyMessageList')}
                    >
                        <>
                            <MakeupBagMobileView makeupBags={data} />
                            <MakeupBagTable makeupBags={data} />
                        </>
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
