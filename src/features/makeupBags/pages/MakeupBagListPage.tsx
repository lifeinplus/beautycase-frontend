import { PlusIcon } from '@heroicons/react/24/outline'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import {
    AdaptiveNavBar,
    DataWrapper,
    Header,
    Hero,
    NavigationButton,
} from '../../../components'
import { canAccess } from '../../../utils'
import { selectRole, selectUsername } from '../../auth'
import { clearFormData } from '../../form'
import {
    MakeupBagMobileView,
    MakeupBagTable,
    useGetMakeupBagsQuery,
} from '../../makeupBags'

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

export const MakeupBagListPage = () => {
    const navigate = useNavigate()

    const dispatch = useAppDispatch()
    const role = useAppSelector(selectRole)
    const username = useAppSelector(selectUsername)

    const { data, isLoading, error } = useGetMakeupBagsQuery()

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
        label: ACTIONS[id].label,
        onClick: actionHandlers[id],
    }))

    return (
        <article>
            <Header />

            <main className="page-content">
                <article className="content-container">
                    <Hero headline="Косметички" />

                    <DataWrapper
                        isLoading={isLoading}
                        error={error}
                        data={data}
                        emptyMessage="Косметички не найдены"
                    >
                        <>
                            <MakeupBagMobileView makeupBags={data} />
                            <MakeupBagTable makeupBags={data} />
                        </>
                    </DataWrapper>
                </article>
            </main>

            <AdaptiveNavBar>
                {visibleActions.map(({ key, icon, label, onClick }) => (
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
