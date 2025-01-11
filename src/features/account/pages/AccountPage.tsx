import { ShoppingBagIcon } from '@heroicons/react/24/outline'
import { ReactNode } from 'react'

import { useAppSelector } from '../../../app/hooks'
import { AdaptiveNavBar, DataWrapper, Header, Hero } from '../../../components'
import { selectUserId } from '../../auth'
import { useGetUserByIdQuery, type User, type UserResult } from '../../users'
import { Link } from 'react-router-dom'

interface Field {
    label: string
    sysname: keyof User
    content?: ReactNode
    emptyMessage?: string
}

const renderContent = (data: UserResult | undefined) => {
    if (!data) return

    const { makeupBags, user } = data

    const fields: Field[] = [
        {
            label: 'Имя пользователя',
            sysname: 'username',
        },
        {
            label: 'Роль',
            sysname: 'role',
        },
        {
            label: 'Косметички',
            sysname: 'beautyBags',
            content: makeupBags?.length && (
                <ul
                    role="list"
                    className="divide-y divide-neutral-100 rounded-2xl border border-neutral-200 dark:divide-neutral-800 dark:border-neutral-700"
                >
                    {makeupBags.map((bag) => (
                        <li
                            key={bag._id}
                            className="flex items-center justify-between py-4 pl-4 pr-5 text-sm/6"
                        >
                            <div className="flex w-0 flex-1 items-center">
                                <ShoppingBagIcon
                                    aria-hidden="true"
                                    className="size-5 shrink-0 text-neutral-400"
                                />
                                <div className="ml-4 flex min-w-0 flex-1 gap-2">
                                    <span className="truncate font-medium">
                                        {bag._id}
                                    </span>
                                </div>
                            </div>
                            <div className="ml-4 shrink-0">
                                <Link
                                    className="font-medium text-rose-400 hover:text-rose-600"
                                    to={`/makeup_bags/${bag._id}`}
                                >
                                    Открыть
                                </Link>
                            </div>
                        </li>
                    ))}
                </ul>
            ),
            emptyMessage: 'У вас нет доступных косметичек',
        },
        {
            label: 'Уроки',
            sysname: 'lessons',
            emptyMessage: 'У вас нет доступных уроков',
        },
    ]

    return (
        <div className="dl-container">
            <dl className="dl">
                {fields.map((f) => (
                    <div key={f.sysname} className="dl-grid">
                        <dt className="dt">{f.label}</dt>
                        <dd className="dd">
                            {user[f.sysname] || f.content || f.emptyMessage}
                        </dd>
                    </div>
                ))}
            </dl>
        </div>
    )
}

export const AccountPage = () => {
    const userId = useAppSelector(selectUserId)

    const { data, isLoading, error } = useGetUserByIdQuery(userId || '')

    return (
        <article className="page">
            <Header />

            <main className="page-content">
                <section className="w-full max-w-2xl space-y-6">
                    <article className="page-content__container page-content__container-xl">
                        <Hero
                            headline="Личный кабинет"
                            byline="Сведения о вас и доступный контент"
                        />

                        <DataWrapper
                            isLoading={isLoading}
                            error={error}
                            data={data}
                            emptyMessage="Пользователь не найден"
                        >
                            {renderContent(data)}
                        </DataWrapper>
                    </article>
                </section>
            </main>

            <AdaptiveNavBar />
        </article>
    )
}
