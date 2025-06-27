import { FilmIcon, ShoppingBagIcon } from '@heroicons/react/24/outline'
import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'

import { useAppSelector } from '../../../app/hooks'
import { AdaptiveNavBar } from '../../../components/navigation/AdaptiveNavBar'
import { DataWrapper } from '../../../components/DataWrapper'
import { Header } from '../../../components/Header'
import { Hero } from '../../../components/Hero'
import { selectUserId } from '../../auth/authSlice'
import type { User } from '../../users/types'
import { useGetUserByIdQuery } from '../../users/usersApi'

interface Field {
    label: string
    sysname: keyof User
    content?: ReactNode
    emptyMessage?: string
}

export const AccountPage = () => {
    const { pathname } = useLocation()
    const { t } = useTranslation('account')

    const userId = useAppSelector(selectUserId)

    const { data, isLoading, error } = useGetUserByIdQuery(userId!)
    const { user, makeupBags, lessons } = data || {}

    const fields: Field[] = [
        {
            sysname: 'username',
            label: 'fields.username.label',
        },
        {
            sysname: 'role',
            label: 'fields.role.label',
        },
        {
            sysname: 'makeupBags',
            label: 'fields.makeupBags.label',
            emptyMessage: t('fields.makeupBags.emptyMessage'),
            content: makeupBags?.length && (
                <ul
                    role="list"
                    className="mt-1 divide-y divide-neutral-100 rounded-2xl border border-neutral-200 dark:divide-neutral-800 dark:border-neutral-700 sm:mt-0"
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
                                        {bag.category?.name}
                                    </span>
                                </div>
                            </div>
                            <div className="ml-4 shrink-0">
                                <Link
                                    className="font-medium text-rose-400 hover:text-rose-600"
                                    to={`/makeup_bags/${bag._id}`}
                                    state={{ fromPathname: pathname }}
                                >
                                    {t('fields.makeupBags.link')}
                                </Link>
                            </div>
                        </li>
                    ))}
                </ul>
            ),
        },
        {
            sysname: 'lessons',
            label: 'fields.lessons.label',
            emptyMessage: t('fields.lessons.emptyMessage'),
            content: lessons?.length && (
                <ul
                    role="list"
                    className="mt-1 divide-y divide-neutral-100 rounded-2xl border border-neutral-200 dark:divide-neutral-800 dark:border-neutral-700 sm:mt-0"
                >
                    {lessons.map((lesson) => (
                        <li
                            key={lesson._id}
                            className="flex items-center justify-between py-4 pl-4 pr-5 text-sm/6"
                        >
                            <div className="flex w-0 flex-1 items-center">
                                <FilmIcon
                                    aria-hidden="true"
                                    className="size-5 shrink-0 text-neutral-400"
                                />
                                <div className="ml-4 flex min-w-0 flex-1 gap-2">
                                    <span className="truncate font-medium">
                                        {lesson.title}
                                    </span>
                                </div>
                            </div>
                            <div className="ml-4 shrink-0">
                                <Link
                                    className="font-medium text-rose-400 hover:text-rose-600"
                                    to={`/lessons/${lesson._id}`}
                                    state={{ fromPathname: pathname }}
                                >
                                    {t('fields.lessons.link')}
                                </Link>
                            </div>
                        </li>
                    ))}
                </ul>
            ),
        },
    ]

    return (
        <article className="page">
            <Header />

            <main className="page-content">
                <article className="content-container">
                    <Hero
                        headline={t('hero.headline')}
                        byline={t('hero.byline')}
                    />

                    <DataWrapper
                        isLoading={isLoading}
                        error={error}
                        data={data}
                        emptyMessage={t('emptyMessage')}
                    >
                        {
                            <div className="dl-container">
                                <dl className="dl">
                                    {fields.map((f) => (
                                        <div
                                            key={f.sysname}
                                            className="dl-grid"
                                        >
                                            <dt className="dt">{t(f.label)}</dt>
                                            <dd className="dd">
                                                {(user && user[f.sysname]) ||
                                                    f.content ||
                                                    f.emptyMessage}
                                            </dd>
                                        </div>
                                    ))}
                                </dl>
                            </div>
                        }
                    </DataWrapper>
                </article>
            </main>

            <AdaptiveNavBar />
        </article>
    )
}
