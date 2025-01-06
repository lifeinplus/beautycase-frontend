import { ChevronRightIcon, PlusIcon } from '@heroicons/react/24/outline'
import { format } from 'date-fns'
import { Link, useNavigate } from 'react-router-dom'

import { useAppSelector } from '../../../app/hooks'
import {
    AdaptiveNavBar,
    Header,
    Hero,
    LoadingOrError,
    NavigationButton,
} from '../../../components'
import { canAccess } from '../../../utils'
import { selectRole, selectUsername } from '../../auth'
import { useGetMakeupBagsQuery } from '../makeupBagsApiSlice'

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

    const role = useAppSelector(selectRole)
    const username = useAppSelector(selectUsername)

    const { data: makeupBags, isLoading, error } = useGetMakeupBagsQuery()

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

                        {isLoading ? (
                            <LoadingOrError message="Загрузка..." />
                        ) : error ? (
                            <LoadingOrError message="Ошибка загрузки" />
                        ) : !makeupBags?.length ? (
                            <LoadingOrError message="Косметички не найдены" />
                        ) : (
                            <div className="space-y-5 sm:hidden">
                                {makeupBags?.map((item, index) => (
                                    <Link
                                        key={index}
                                        className="flex flex-row items-center justify-between pe-5 ps-4"
                                        to={`/makeup_bags/${item._id}`}
                                    >
                                        <div>
                                            <p className="text-black dark:text-white">
                                                {`
                                                    ${item.clientId.username}
                                                    `}
                                            </p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-xs text-neutral-600 dark:text-neutral-400">
                                                {format(
                                                    item.createdAt || '',
                                                    'yyyy.MM.dd HH:mm'
                                                )}
                                            </p>
                                        </div>
                                        <div>
                                            <ChevronRightIcon className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />
                                        </div>
                                    </Link>
                                ))}
                            </div>
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
