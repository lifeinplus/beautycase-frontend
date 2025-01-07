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

    const { data: makeupBags, isLoading, error } = useGetMakeupBagsQuery()

    useEffect(() => {
        dispatch(clearFormData())
    }, [dispatch])

    const actionHandlers = {
        add: () => navigate('add'),
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
        <article>
            <Header />

            <main className="page-content">
                <section className="w-full max-w-2xl space-y-6">
                    <article className="page-content__container page-content__container-sm">
                        <Hero headline="Косметички" />

                        <DataWrapper
                            isLoading={isLoading}
                            error={error}
                            data={makeupBags}
                            emptyMessage="Косметички не найдены"
                        >
                            <>
                                <MakeupBagMobileView makeupBags={makeupBags} />
                                <MakeupBagTable makeupBags={makeupBags} />
                            </>
                        </DataWrapper>
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
